const localdb = new LocalDB();

function IDgenerator(){
   let customerIDFromGenerator;
   let dataIDFromStorage; 
   const bankData = localdb.getBankDataFromStorage();
    if (bankData.length === 0 ) {
        customerIDFromGenerator = 1111 
    }
    else{
        dataIDFromStorage = (bankData[bankData.length-1].id);
        customerIDFromGenerator = dataIDFromStorage + 1
    }
 
    return customerIDFromGenerator;
}

function displayOverlay(ID, name){
    
    let registerUpper = name.toUpperCase();
    
    let overlayHTML = `
    <div id="overlayHTML">
    <div class="overlay__content__wrapper">
      <img id="overlay__close__Btn" src="../public/icons/closeBtn.png" alt="">
    <div class="overlay__body">
      <p>${registerUpper}</p>
      <p>Thank you for register</p>
      <p>You can login with </p>
      <p class="overlay__id" >ID:${ID}</p>
    </div>
    </div>
  </div>
    `
    
    
    $("body")[0].innerHTML += overlayHTML
}




$("#registerForm").submit(function(event){
     const registerCustomerName = $("#nameInput")[0].value.trim();
     const registerCustomerLastName = $("#lastnameInput")[0].value.trim();
     const registerCustomerPassword= $("#passwordInput")[0].value.trim();
     let registerCustomerID = IDgenerator();
     const passwordPattern = /[a-zA-Z0-9].{6}/ ;
     const namePattern = /^[a-z]+$/i

     if ( !(registerCustomerName==="") && 
          !(registerCustomerPassword==="") && 
          (passwordPattern.test(registerCustomerPassword)) && 
          (namePattern.test(registerCustomerName))) 
          {
        const registerCustomer = new Customer(registerCustomerID, registerCustomerName, registerCustomerLastName , registerCustomerPassword);
        localdb.register(registerCustomer);
        

        $("#nameInput")[0].value="";
        $("#lastnameInput")[0].value="";
        $("#passwordInput")[0].value="";


        displayOverlay(registerCustomerID, registerCustomerName)
        
        $("#overlay__close__Btn").on("click", function(){
            window.location.replace("../index.html")
        })


     }
     else{
        const registerErrorHTML = `
        <div class="alert alert-danger" role="alert" style="width: 100%; height:80px; margin-top: 10px;">
          Please provide valid Name and Password 
        </div>
        `
        $(".form-check")[0].innerHTML += registerErrorHTML;
        setTimeout(function(){
            $(".form-check")[0].innerHTML ="";
        },2000);
     }
    
    
    
    
    
    event.preventDefault();
} )







