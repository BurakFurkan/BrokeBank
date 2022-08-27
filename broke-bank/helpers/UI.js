class UI {

    consructor(){
        
        
    }
      // --------------- Dashboard Update --------------
    currencyFormatter (currency , account){
      return new Intl.NumberFormat('de-DE', { style: 'currency', currency: `${currency}` }).format(account)
    }

    updateDashboard(loggedUserID){
        let uiUser = localdb.getUserFromStorage(loggedUserID);
        let convertedUSDacc , convertedEURacc , allProperty;
        
        const calcAllProperty = async function(){
             convertedUSDacc  = await currency.convert("USD", "TRY", uiUser.usdAccount);
             convertedEURacc = await currency.convert("EUR", "TRY",uiUser.eurAccount);
             allProperty = convertedUSDacc + convertedEURacc + uiUser.tlAccount;

             let allPropertyFormatted = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'TRY' }).format(allProperty)
             let tryFormatted = ui.currencyFormatter("TRY" , uiUser.tlAccount)
             let usdFormatted = ui.currencyFormatter("USD" , uiUser.usdAccount)
             let eurFormatted = ui.currencyFormatter("EUR" , uiUser.eurAccount)


             $(".main__swipper__content").eq(0).html(`USD Account: ${usdFormatted} `);
             $(".main__swipper__content").eq(1).html(`All Property: ${allPropertyFormatted} `);
             $(".main__swipper__content").eq(2).html(`TRY Account: ${tryFormatted} `);
             $(".main__swipper__content").eq(3).html(`EUR Account: ${eurFormatted} `);

             
             

             const labels = [
              'TRY',
              'USD',
              'EUR',
            ];
          
            const data = {
              labels: labels,
              datasets: [{
                label: 'My First dataset',
                backgroundColor: [
                  'rgb(255, 99, 132)',
                  'rgb(54, 162, 235)',
                  'rgb(255, 206, 86)'
                ],
                borderColor: [
                  'rgb(255, 99, 132, 1)',
                  'rgb(54, 162, 235)',
                  'rgb(255, 206, 86)'
                ],
                data: [uiUser.tlAccount , convertedUSDacc , convertedEURacc]
              }]
            };
          
          
            const config = {
              type: 'pie',
              data: data,
              options: {
                plugins: {
                  title: {
                    display: true,
                    text: 'All Property in TRY',
                    color: "rgb(33, 37, 41)",
                    padding: {
                        top: 10,
                        bottom: 30
                    },
                    font:{
                      size: 16,
                    }
                },
                    legend: {
                      labels: {
                        color: "rgb(33, 37, 41)",
                          font: {
                              size: 16,
                              weight:500
                          }
                      }
                  }
                }
            },
            };
          
          
          
          const myChart = new Chart(
              document.getElementById('myChart'),
              config);

              

              $(".sidebar__content").click(function(){
                myChart.destroy();
              })
              
                          
        }

        
        calcAllProperty();

        $("#welcomeUser").text(`WELCOME BACK ${uiUser.name.toUpperCase()} ${uiUser.lastname.toUpperCase()}`);
        $(".credit__username").text(`${uiUser.name.toUpperCase()} ${uiUser.lastname.toUpperCase()}`);
        

    };

    //--------- Remittance Update-----------
    updateRMT(loggedUserID){
      let uiUser = localdb.getUserFromStorage(loggedUserID);
      let a = this.currencyFormatter("TRY" , uiUser.tlAccount);
      let b = this.currencyFormatter("USD" , uiUser.usdAccount);
      let c = this.currencyFormatter("EUR" , uiUser.eurAccount);

      $("#rmt__account__picker").val("pickaccount");
      $("#rmt__account__information").text(`Pick Account`);
      $("#rmt__account__picker").on("change" , function(event){

        switch (event.target.value) {
          case "pickaccount":
            $("#rmt__account__information").text(`Pick Account`)
            break;
          case "tlAccount":
            $("#rmt__account__information").text(a)
            break;
          case "usdAccount":
            $("#rmt__account__information").text(b)
            break;
          case "eurAccount":
            $("#rmt__account__information").text(c)
          break;
        }
      });

      
     
    }


    // ---------Withdraw-----------------

    checkNextSalaryTime(loggedUserID){
      let uiUser = localdb.getUserFromStorage(loggedUserID);

      $("#wthd__account__picker").val("pickaccount");
      $("#wthd__account__information").text(`Pick Account`);

      function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
      } 

      let allmovements = uiUser.movements;
      let salaryIndex;
      if (allmovements==null) {
        salaryIndex=-1;
        
      } else {
        salaryIndex = allmovements.findIndex(e => e.type === "Salary");
        
      }
      let dateNumber;
      if ((salaryIndex===-1) || (salaryIndex===undefined) ) {
        dateNumber = 0;
        return dateNumber;
      } else {
        let salary= allmovements[salaryIndex];
        let salaryDate = salary.date;
        let nextSalaryDate = addDays(salaryDate , 30)
        let dateNow = new Date();
        dateNumber = nextSalaryDate - dateNow;
        return dateNumber
        
      }
      
    }

    showSalaryTime(loggedUserID){
      function dhm (ms) {
        let days = Math.floor(ms / (24*60*60*1000));
        let daysms = ms % (24*60*60*1000);
        let hours = Math.floor(daysms / (60*60*1000));
        let hoursms = ms % (60*60*1000);
        let minutes = Math.floor(hoursms / (60*1000));
        let minutesms = ms % (60*1000);
        let sec = Math.floor(minutesms / 1000);
        return `${days} Day  ${hours}h ${minutes}m ${sec}s`
      }

      let timer= this.checkNextSalaryTime(loggedUserID);

      if (timer === 0) {
        let message = "Salary Available";
        return message;
      } else {
        let nextSalaryDate = dhm(timer);
        let message = `Next salary will be available ${nextSalaryDate} later.`
        return message;
      }
    }

    checkSalaryButton(loggedUserID){
      let timer = this.checkNextSalaryTime(loggedUserID);

      if (0 >= timer) {
        return true; 
      } else {
        $("#salary__btn").attr('class', 'btn btn-secondary cooldown');
      }
 
    }

    // ---------Withdraw Update-----------------

    updateWthd(loggedUserID){
      let uiUser = localdb.getUserFromStorage(loggedUserID);
      let a = this.currencyFormatter("TRY" , uiUser.tlAccount);
      let b = this.currencyFormatter("USD" , uiUser.usdAccount);
      let c = this.currencyFormatter("EUR" , uiUser.eurAccount);

      $("wthd__account__picker").val("pickaccount");
      $("#wthd__account__information").text(`Pick Account`);
      $("#wthd__account__picker").on("change" , function(event){

        switch (event.target.value) {
          case "pickaccount":
            $("#wthd__account__information").text(`Pick Account`)
            break;
          case "tlAccount":
            $("#wthd__account__information").text(a)
            break;
          case "usdAccount":
            $("#wthd__account__information").text(b)
            break;
          case "eurAccount":
            $("#wthd__account__information").text(c)
          break;
        }
      })
    }

    
    // ---------Exchange Update-----------------

    updateExc(loggedUserID){
      let uiUser = localdb.getUserFromStorage(loggedUserID);
      let a = this.currencyFormatter("TRY" , uiUser.tlAccount);
      let b = this.currencyFormatter("USD" , uiUser.usdAccount);
      let c = this.currencyFormatter("EUR" , uiUser.eurAccount);

      $("#exc__first__account__picker").val("pickaccount");
      $("#exc__first__account__information").text(`Pick Account`);
      $("#exc__first__account__picker").on("change" , function(event){

        switch (event.target.value) {
          case "pickaccount":
            $("#exc__first__account__information").text(`Pick Account`)
            break;
          case "tlAccount":
            $("#first__currency__span").text("TRY Amount to Convert")
            $("#exc__first__account__information").text(a)
            break;
          case "usdAccount":
            $("#first__currency__span").text("USD Amount to Convert")
            $("#exc__first__account__information").text(b)
            break;
          case "eurAccount":
            $("#first__currency__span").text("EUR Amount to Convert")
            $("#exc__first__account__information").text(c)
          break;
        }
      })



      $("#exc__second__account__picker").val("pickaccount");
      $("#exc__second__account__information").text(`Pick Account`);
      $("#exc__second__account__picker").on("change" , function(event){

        switch (event.target.value) {
          case "pickaccount":
            $("#exc__second__account__information").text(`Pick Account`)
            break;
          case "tlAccount":
            $("#exc__second__account__information").text(a)
            break;
          case "usdAccount":
            $("#exc__second__account__information").text(b)
            break;
          case "eurAccount":
            $("#exc__second__account__information").text(c)
          break;
        }
      })
     
    }

    //--------------Transactions -------------------

    writeMovementsToUI(movementArray){
      if (movementArray===null) {
        
      } else {
        movementArray.forEach(element => {
          if (movements.movementTypeChecker(element) ==="income") {
            $("#movements__wrapper").append(movements.incomeMovement(element))
          } else if (movements.movementTypeChecker(element) ==="outcome") {
            $("#movements__wrapper").append(movements.outcomeMovement(element))
          } else{
            $("#movements__wrapper").append(movements.exchangeMovement(element))
          }
        });
      }
    };


    //------------- Notifications-----------------------

    writeNotificationToUI( process ,description , index){
      let html=`
      <div data-index=${index} class="notification">
      <p>Process: ${process}</p>
      <p>Description: ${description}</p>
      </div>
      `
      $("#notif__shower").append(html);
      
      
   }

   writeAllNotificationToUI(loggedUserID){
    $("#notif__shower").html("")
    $("#notif__badge").text("");
    let allmovements = localdb.getMovementsFromStorage(loggedUserID);
    if (allmovements === null) {
      
    } else {
      allmovements.forEach((element, index) => {
        if (element.read === false) {
          this.writeNotificationToUI( element.type , element.description , index);
        }
      });
    }
      this.notifCounter(loggedUserID);

   };

   notifCounter(loggedUserID){
    let allmovements = localdb.getMovementsFromStorage(loggedUserID);
    let counter=0;
    if (allmovements===null) {
      counter=0;
    } else {
      allmovements.forEach(element => {
        if (element.read ===false) {
          counter++;
        }
      });
    }
    let counterString = counter.toString();
    $("#notif__badge").text(counterString);


   };

    
}


$('input[type=number]').on('wheel', function(e){
    return false;
});

