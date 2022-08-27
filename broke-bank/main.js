const currency = new Currency();
const localdb = new LocalDB();
const ui = new UI();
const operations = new Operations();
const movements = new Movement();
const notifications = new Notifications();
const validations = new Validations();
const pdf = new PDF();



// -------------Login-------------------
var loggedUserID, loggedUser;


$("#loginIDInput,#loginPasswordInput").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#loginBtn").click();
    }
});


function isValid(userID){
    let user = localdb.getUserFromStorage(userID)
    
    if (!(user === undefined)) {
        return true
    }
    else{
        return false
    }
}


$("#loginBtn").on("click" , function(){
    isValid(parseInt($("#loginIDInput")[0].value)) ? login() : notifications.loginAlert()
});




function login(){
    attempingUserID = (parseInt($("#loginIDInput")[0].value));
    attempingUserPassword =  $("#loginPasswordInput")[0].value;

    if (passWordCheck(attempingUserID , attempingUserPassword) ) {
        $("#visitor__header").removeClass("header__active");
        $("#registeredHeader").addClass("header__active");
        $("#main__wrapper").addClass("main__wrapper__active");

        loggedUserID = attempingUserID;
        loggedUser = localdb.getUserFromStorage(attempingUserID);
        ui.notifCounter(loggedUserID);
        ui.writeAllNotificationToUI(loggedUserID);
        ui.updateDashboard(loggedUserID);
        
    } else {
        notifications.loginAlert()
    }
}

function passWordCheck(userID , password){
    let validUser = localdb.getUserFromStorage(userID);
    
    return (validUser.password == password) ? true : false;    
}



// ---------Single Page App Functionality-------------

$(".sidebar__content").click(function(event){
    
    $(".processes").removeClass("process__active");
    switch (event.target.tabIndex) {
        case 0:
            $("#stt").addClass("process__active");
            ui.updateDashboard(loggedUserID);
            break;
        case 1:
            $("#rmt").addClass("process__active");
            ui.updateRMT(loggedUserID)
            break;
        case 2:
            $("#wthd").addClass("process__active");
            ui.updateWthd(loggedUserID)
            let TLblnc = operations.getTLAccount(loggedUserID)
            $("#wthd__account__information").text(`${TLblnc} TL`)
            ui.updateDashboard(loggedUserID);
            ui.checkSalaryButton(loggedUserID);
            break;
        case 3:
            $("#exc").addClass("process__active");
            ui.updateExc(loggedUserID);
            break;
        case 4:
            $("#mvm").addClass("process__active");
            $("#movements__wrapper").html("");
            let movArray =localdb.getMovementsFromStorage(loggedUserID)
            ui.writeMovementsToUI(movArray)
            break;
    }    
})


//  --------- Dashboard Swipper-----------
const swiper = new Swiper('.swiper', {

    effect: 'cube',
    cubeEffect: {
        slideShadows: true,
      },
    // Optional parameters
    direction: 'vertical',
    loop: true,

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
});


//--------- Campaigns Swiper -----------

const campaignswiper = new Swiper('.myswiper', {

    // Optional parameters
    direction: 'vertical',
    loop: true,

  });

/// --------- Operations ----------
// --- Remittance ------
$("#rmt__button").on("click", function(){
    if (validations.checkRMTInputs()) {
        if (validations.ibanValidation($("#IBAN").val())) {
            if (validations.amountInputController($("#remittance__amount").val())) {
                operations.remittance(loggedUserID);
                $("#recipientName, #IBAN, #remittance__amount, #rmtDescription").val("");
                ui.updateRMT(loggedUserID);
            
            }else {notifications.checkInputAlert()}
        } 
        else {notifications.checkIBANAlert()} 
    }
    else {notifications.checkInputAlert()}

});

// ---- Deposit ----
$("#depositAmount").on("keyup " , function(){
    operations.getNewDpstBalance(loggedUserID);
})

$("#wthd__account__picker ").on("change" , function(){
    operations.getNewDpstBalance(loggedUserID);    
})

$("#deposit__btn").on("click", function(){
    if (validations.checkDpstInputs()) {
        if (validations.amountInputController($("#depositAmount").val())) {
            operations.deposit(loggedUserID);
            $("#depositAmount, #withdrawAmount").val("");
            ui.updateWthd(loggedUserID);
        } 
        else {notifications.checkdpstAlert()}
                
    } 
    else {notifications.checkdpstAlert()}

});

// ---- Withdraw ----

$("#wthd__button").on("click", function(){
    if (validations.checkwthdInputs()) {
        if (validations.amountInputController($("#withdrawAmount").val())) {
            operations.withdraw(loggedUserID);
            $("#depositAmount, #withdrawAmount").val("");
            ui.updateWthd(loggedUserID);
        } 
        else {notifications.checkwthdAlert()}
                
    } 
    else {notifications.checkwthdAlert()}

});

$("#withdrawAmount").on("keyup" , function(){
    operations.getNewthdBalance(loggedUserID);
})

$("#wthd__account__picker ").on("change" , function(){
    operations.getNewthdBalance(loggedUserID);
})

// ---- Salary ----
$("#salary__btn").on("click", function(){
    operations.getSalary(loggedUserID);
    $("#salary__btn").attr('class', 'btn btn-secondary cooldown');
});


var salaryInterval;
function salaryTimer(){
    let message = ui.showSalaryTime(loggedUserID)
    $("#salaryTimer").text(message);
};



$( "#salary__btn" ).hover(
    function() {
        salaryInterval = setInterval(salaryTimer , 1000)
    }, function() {
      clearInterval(salaryInterval)
    }
);

//----------Exchange ---------------------
$("#convert__button").on("click", function(){
    if (validations.checkexcInputs()) {
        if (validations.amountInputController($("#exc__amount__input").val())) {
            operations.exchange(loggedUserID);
            ui.updateExc(loggedUserID);
        } 
        else {notifications.checkExcAlert()}
                
    } 
    else {notifications.checkExcAlert()}

});

$("#exc__amount__input").on("keyup" , function(){
    operations.getNewExcBalance(loggedUserID);
})

$("#exc__first__account__picker , #exc__second__account__picker").on("change" , function(){
    operations.getNewExcBalance(loggedUserID);
})

// --------- Sorting -------------
$("#display__picker , #sorting__selector").on("change" , function(){
    $("#movements__wrapper").html("");

    let displayMovements =operations.sortToDisplay(loggedUserID);
    let sortBy = $("#sorting__selector").val();
    let sortedMovements;
    (sortBy ==="sortByDate") ? sortedMovements=operations.sortByDate(displayMovements) : sortedMovements=operations.sortByAmount(displayMovements);
    ui.writeMovementsToUI(sortedMovements)
})

// ----------Export PDF------------

$("#pdfExportBtn").on("click" , pdf.exportPDF);


function logOut(){
    $("#visitor__header").addClass("header__active");
    $("#registeredHeader").removeClass("header__active");
    $("#main__wrapper").removeClass("main__wrapper__active");
    $("#loginIDInput , #loginPasswordInput").val("");
};

//-------------- Notification-------------

$("#notif__shower").on("click" , function(event){
    event.target.remove();
    let index = parseInt(event.target.dataset.index);
    console.log(index)
    localdb.changeReadProperty(loggedUserID , index);
    ui.writeAllNotificationToUI(loggedUserID);
    
})

$("#logout").on("click" , logOut);




  















