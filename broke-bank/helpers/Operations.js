class Operations {
    constructor(){

    }

    createMovement(loggedUserID ,type,amount,fromWho,toWho,description){
        let movementID = movements.movementIDgenerator();
        let date = new Date();
        let movement = new Movement( movementID, type , amount , date  , fromWho , toWho , description );
        localdb.addMovement(loggedUserID ,movement);

     }

    remittance(customerID){


        let user = localdb.getUserFromStorage(customerID);
        let amount = parseInt($("#remittance__amount").val());
        let fromWho;
        let recipientName = $("#recipientName").val() ;
        let IBAN = $("#IBAN").val();
        let toWho= `Name : ${recipientName} // IBAN: ${IBAN}`;
        let description = $("#rmtDescription").val();
        
        var pickedAccValue ;
        switch ($("#rmt__account__picker").val()) {
            case "pickaccount":
                pickedAccValue = "nothing";
                break;

            case "tlAccount":
                pickedAccValue = user.tlAccount;
                fromWho = "My TL Account";
                break;
                
            case "usdAccount":
                pickedAccValue = user.usdAccount;
                fromWho = "My USD Account";
                break;
            
            case "eurAccount":
                pickedAccValue = user.eurAccount;
                fromWho = "My EUR Account";
                break;

        };

               
        if (pickedAccValue === "nothing") {
            notifications.pickAccountAlert();
            
        } 
        else {
            let accountName = $("#rmt__account__picker").val();
            if (pickedAccValue >= amount) {
                let newValue = pickedAccValue - amount;
                localdb.changeAccountValue(customerID ,accountName, newValue )
                this.createMovement(customerID,"Remittance" , amount , fromWho, toWho  , description);
                ui.writeAllNotificationToUI(customerID);
            } else {
                notifications.wrongAmount();
                
            }
        }


        
        
    }
    

    deposit( customerID ){
        let user = localdb.getUserFromStorage(customerID);
        let amount = parseInt($("#depositAmount").val());
        let fromWho = "Me";
        let toWho;
        
        
        var pickedAccValue ;
        switch ($("#wthd__account__picker").val()) {
            case ("pickaccount" && undefined):
                pickedAccValue = "nothing";
                break;

            case "tlAccount":
                pickedAccValue = user.tlAccount;
                toWho = "My TL Account";
                break;
                
            case "usdAccount":
                pickedAccValue = user.usdAccount;
                toWho = "My USD Account";
                break;
            
            case "eurAccount":
                pickedAccValue = user.eurAccount;
                toWho = "My EUR Account";
                break;

        };

        let description = `I deposit to ${toWho}`;

               
        if ((pickedAccValue === "nothing") || (pickedAccValue === undefined) ) {
            notifications.pickAccountAlertDpst();
            
        } 
        else {
            let accountName = $("#wthd__account__picker").val();
            if (500000 >= amount) {
                let newValue = pickedAccValue + amount;
                localdb.changeAccountValue(customerID ,accountName, newValue )
                this.createMovement(customerID,"Deposit" , amount , fromWho, toWho  , description);
                ui.writeAllNotificationToUI(customerID);
            } else {
                notifications.wrongAmountDpst();
                
            }
        }

       
    }

    getTLAccount(loggedUserID){
        let user = localdb.getUserFromStorage(loggedUserID);
        return user.tlAccount;
    }

    getNewDpstBalance(loggedUserID){
        let user = localdb.getUserFromStorage(loggedUserID);
        let amount = (parseInt($("#depositAmount").val())) ? parseInt($("#depositAmount").val()) : 0;

        var pickedAccValue ;
        switch ($("#wthd__account__picker").val()) {
            case "pickaccount":
                pickedAccValue = "nothing";
                break;

            case "tlAccount":
                pickedAccValue = user.tlAccount + amount;
                $("#deposit__account__information").text(`New Balance: ${pickedAccValue} TL`)
                break;
                
            case "usdAccount":
                pickedAccValue = user.usdAccount + amount;
                $("#deposit__account__information").text(`New Balance: ${pickedAccValue} $`)
                break;
            
            case "eurAccount":
                pickedAccValue = user.eurAccount + amount;
                $("#deposit__account__information").text(`New Balance: ${pickedAccValue} €`)
                break;

        };

        
    }
    
    withdraw( customerID ){
        let user = localdb.getUserFromStorage(customerID);
        let amount = (parseInt($("#withdrawAmount").val())) ? parseInt($("#withdrawAmount").val()) : 0;
        let fromWho; 
        let toWho= "Me";
        
        
        var pickedAccValue ;
        switch ($("#wthd__account__picker").val()) {
            case "pickaccount":
                pickedAccValue = "nothing";
                break;

            case "tlAccount":
                pickedAccValue = user.tlAccount;
                fromWho = "My TL Account";
                break;
                
            case "usdAccount":
                pickedAccValue = user.usdAccount;
                fromWho = "My USD Account";
                break;
            
            case "eurAccount":
                pickedAccValue = user.eurAccount;
                fromWho = "My EUR Account";
                break;

        };

        let description = `I withdraw from ${fromWho}`;

               
        if ((pickedAccValue === "nothing") || (pickedAccValue === undefined) ) {
            notifications.pickAccountAlertwthd();
            
        } 
        else {
            let accountName = $("#wthd__account__picker").val();
            if ((500000 >= amount) && (pickedAccValue >= amount)) {
                let newValue = pickedAccValue - amount;
                localdb.changeAccountValue(customerID ,accountName, newValue )
                this.createMovement(customerID,"Withdraw" , amount , fromWho, toWho  , description);
                ui.writeAllNotificationToUI(customerID);

            } else {
                notifications.checkwthdAlert();
                
            }
        }



        
    }

    getNewthdBalance(loggedUserID){
        let user = localdb.getUserFromStorage(loggedUserID);
        let amount = (parseInt($("#withdrawAmount").val())) ? parseInt($("#withdrawAmount").val()) : 0;

        var pickedAccValue ;
        switch ($("#wthd__account__picker").val()) {
            case "pickaccount":
                pickedAccValue = "nothing";
                break;

            case "tlAccount":
                pickedAccValue = user.tlAccount - amount;
                $("#wthd__main__account__information").text(`New Balance: ${pickedAccValue} TL`)
                break;
                
            case "usdAccount":
                pickedAccValue = user.usdAccount - amount;
                $("#wthd__main__account__information").text(`New Balance: ${pickedAccValue} $`)
                break;
            
            case "eurAccount":
                pickedAccValue = user.eurAccount - amount;
                $("#wthd__main__account__information").text(`New Balance: ${pickedAccValue} €`)
                break;

        };

        
    }

    getSalary(customerID){
        let user = localdb.getUserFromStorage(customerID);
        let amount = 3000;
        let fromWho = "My Company";
        let toWho = "My TL Account";
        
        
        let pickedAccValue = user.tlAccount;
        let accountName = "tlAccount"
        

        let description = "Monthly Salary";

        let newValue = pickedAccValue + amount;
        localdb.changeAccountValue(customerID ,accountName, newValue )
        this.createMovement(customerID,"Salary" , amount , fromWho, toWho  , description);
        ui.writeAllNotificationToUI(customerID);

               
        
    }

    sortToDisplay(loggedUserID){
        let allMovements = localdb.getMovementsFromStorage(loggedUserID);
        let sortValue = $("#display__picker").val();
        let sortedMovements;

        switch (sortValue) {
            case "displayAll":
                sortedMovements = allMovements;
                break;
            case "displayIncome":
                sortedMovements = allMovements.filter(movement => (movement.type==="Deposit" || movement.type==="Salary"));
                break;
            case "displayOutcome":
                sortedMovements = allMovements.filter(movement => (movement.type==="Withdraw" || movement.type==="Remittance"));
                
                break;
            case "displayExchange":
                sortedMovements = allMovements.filter(movement => (movement.type==="Exchange"));
                break;
        };

        return sortedMovements;
    } 

    sortByDate(movement){
        let sorted = movement.sort(function(a,b){
            return new Date(b.date) - new Date(a.date)
        });

        return sorted;        
    }

    sortByAmount(movement){
        let sorted = movement.sort(function(a,b){
            return (b.amount-a.amount)
        });

        return sorted;        
    }



    //------------ Exchange----------------
    async exchange( loggedUserID ){
        let user = localdb.getUserFromStorage(loggedUserID);
        let firstAmount = (parseInt($("#exc__amount__input").val())) ? parseInt($("#exc__amount__input").val()) : 0;
        let fromWho;
        let toWho;
        let firstCurrency;
        let secondCurrency;
        let secondNewValue;
        
        
        let firstpickedAccValue ;
        switch ($("#exc__first__account__picker").val()) {
            case "pickaccount":
                firstpickedAccValue = "nothing";
                break;

            case "tlAccount":
                firstCurrency="TRY";
                firstpickedAccValue = user.tlAccount;
                fromWho = "My TL Account";
                break;
                
            case "usdAccount":
                firstCurrency="USD";
                firstpickedAccValue = user.usdAccount;
                fromWho = "My USD Account";
                break;
            
            case "eurAccount":
                firstCurrency="EUR";
                firstpickedAccValue = user.eurAccount;
                fromWho = "My EUR Account";
                break;

        };

        let secondpickedAccValue ;
        switch ($("#exc__second__account__picker").val()) {
            case "pickaccount":
                secondpickedAccValue = "nothing";
                break;

            case "tlAccount":
                secondCurrency="TRY";
                secondpickedAccValue = user.tlAccount;
                toWho = "My TL Account";
                break;
                
            case "usdAccount":
                secondCurrency="USD";
                secondpickedAccValue = user.usdAccount;
                toWho = "My USD Account";
                break;
            
            case "eurAccount":
                secondCurrency="EUR";
                secondpickedAccValue = user.eurAccount;
                toWho = "My EUR Account";
                break;

        };



        let description = `I withdraw from ${fromWho} and deposit the converted amount to ${toWho} `;

        let secondAmount;
        
               
        if (!(validations.checkexcAccountInputs(firstpickedAccValue , secondpickedAccValue))) {
            notifications.pickAccountAlertexc();        
        } 
        else {
            let firstAccountName = $("#exc__first__account__picker").val();
            let secondAccountName = $("#exc__second__account__picker").val();
            if ((500000 >= firstAmount) && (firstpickedAccValue >= firstAmount)) {
                let firstNewValue = firstpickedAccValue - firstAmount;
                secondAmount = await currency.convert(firstCurrency,secondCurrency,firstAmount)
                .then(response => secondAmount = response)
                .catch(err => console.log(err))
                secondNewValue = secondpickedAccValue +  secondAmount;
                
                localdb.changeAccountValue(loggedUserID ,firstAccountName, firstNewValue )
                localdb.changeAccountValue(loggedUserID ,secondAccountName, secondNewValue )
                this.createMovement(loggedUserID,"Exchange" , firstAmount , fromWho, toWho  , description);
                ui.writeAllNotificationToUI(loggedUserID);
                $("#exc__amount__input").val("");

            } else {
                notifications.checkExcAlert();
                
            }
        }

        

        
    };

    async getNewExcBalance(loggedUserID){
        let user = localdb.getUserFromStorage(loggedUserID);
        let firstAmount = (parseInt($("#exc__amount__input").val())) ? parseInt($("#exc__amount__input").val()) : 0;
        let firstCurrency;
        let secondCurrency;
        
        let firstFormattedValue;
        let secondFormattedValue;

        let secondAmount;
        let secondAmountFormatted;

        
        

        let firstpickedAccValue ;
        switch ($("#exc__first__account__picker").val()) {
            case "pickaccount":
                firstpickedAccValue = "nothing";
                break;

            case "tlAccount":
                firstpickedAccValue = user.tlAccount - firstAmount;
                firstFormattedValue = ui.currencyFormatter("TRY" , firstpickedAccValue);
                firstCurrency="TRY";
                $("#exc__information__first").text(`TL`);
                $("#first__account__information").text(`${firstFormattedValue}`);
                break;
                
            case "usdAccount":
                firstpickedAccValue = user.usdAccount - firstAmount;
                firstFormattedValue = ui.currencyFormatter("USD" , firstpickedAccValue);
                firstCurrency="USD";
                $("#exc__information__first").text(`USD`);
                $("#first__account__information").text(`${firstFormattedValue}`)
                break;
            
            case "eurAccount":
                firstpickedAccValue = user.eurAccount - firstAmount;
                firstFormattedValue = ui.currencyFormatter("EUR" , firstpickedAccValue);
                firstCurrency="EUR";
                $("#exc__information__first").text(`EUR`);
                $("#first__account__information").text(`${firstFormattedValue}`)
                break;

        };

        let secondpickedAccValue ;
        switch ($("#exc__second__account__picker").val()) {
            case "pickaccount":
                secondpickedAccValue = "nothing";
                break;

            case "tlAccount":
                secondCurrency="TRY";
                secondAmount = await currency.convert(firstCurrency, secondCurrency , firstAmount)
                .then(response => secondAmount = response)
                .catch(err => console.log(err));
                secondpickedAccValue = user.tlAccount + secondAmount;
                secondFormattedValue = ui.currencyFormatter("TRY" , secondpickedAccValue);
                secondAmountFormatted = ui.currencyFormatter("TRY" , secondAmount)
                $("#second__currency__span").text(`${secondAmountFormatted}`);
                $("#exc__information__second").text(`TL`);
                $("#second__account__information").text(`${secondFormattedValue}`);
                break;
                
            case "usdAccount":
                secondCurrency="USD";
                secondAmount = await currency.convert(firstCurrency, secondCurrency , firstAmount)
                .then(response => secondAmount = response)
                .catch(err => console.log(err));
                secondpickedAccValue = user.usdAccount + secondAmount;
                secondFormattedValue = ui.currencyFormatter("USD" , secondpickedAccValue);
                secondAmountFormatted = ui.currencyFormatter("USD" , secondAmount);
                $("#second__currency__span").text(`${secondAmountFormatted}`);
                $("#exc__information__second").text(`USD`);
                $("#second__account__information").text(`${secondFormattedValue}`)
                break;
            
            case "eurAccount":
                secondCurrency="EUR";
                secondAmount = await currency.convert(firstCurrency, secondCurrency , firstAmount)
                .then(response => secondAmount = response)
                .catch(err => console.log(err));
                secondpickedAccValue = user.eurAccount + secondAmount;
                secondFormattedValue = ui.currencyFormatter("EUR" , secondpickedAccValue);
                secondAmountFormatted = ui.currencyFormatter("EUR" , secondAmount)
                $("#second__currency__span").text(`${secondAmountFormatted}`);
                $("#exc__information__second").text(`EUR`);
                $("#second__account__information").text(`${secondFormattedValue}`)
                break;

        };


    };

    

    
        
}