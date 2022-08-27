class LocalDB{
    constructor(){

    }
    
    getBankDataFromStorage(){
        
        let bankData = JSON.parse(localStorage.getItem("bankData")) || [];

        return bankData;
    }

    


    
    register(customer){
        let bankData = this.getBankDataFromStorage();

        bankData.push(customer)

        localStorage.setItem("bankData" , JSON.stringify(bankData))
        
    }

    getUserFromStorage(ID){
        
        let bankData = localdb.getBankDataFromStorage();
        let currentUser = bankData.find(e => e.id === ID);

        return currentUser;
    }

    getMovementsFromStorage(loggedUserID){
        let user = this.getUserFromStorage(loggedUserID)
        return user.movements;
    }



    addMovement(customerID , movement){
        let bankData = this.getBankDataFromStorage();
        let currentUserIndex = bankData.findIndex(e => e.id === customerID);

        if (bankData[currentUserIndex].movements === null) {
            bankData[currentUserIndex].movements = [];
            bankData[currentUserIndex].movements.push(movement);
        }
        else{
            bankData[currentUserIndex].movements.push(movement);
        }

        localStorage.setItem("bankData" , JSON.stringify(bankData));

    }

    changeAccountValue(customerID , accountName , newValue){
        this.accountName = accountName;
        let bankData = this.getBankDataFromStorage();
        let currentUserIndex = bankData.findIndex(e => e.id === customerID);
        
        switch (accountName) {
            case "tlAccount":
                bankData[currentUserIndex].tlAccount = newValue;
                break;
        
            case "usdAccount":
                bankData[currentUserIndex].usdAccount = newValue;
                break;
            case "eurAccount":
                bankData[currentUserIndex].eurAccount = newValue;
                break;
        }

        localStorage.setItem("bankData" , JSON.stringify(bankData));
        
    }

    changeReadProperty(loggedUserID , index){
        let bankData = this.getBankDataFromStorage();
        let currentUserIndex = bankData.findIndex(e => e.id === loggedUserID);

        let allmovements = bankData[currentUserIndex].movements;
        if (allmovements[index]) {
            allmovements[index].read = true;
        }
        else{
            
        }

        localStorage.setItem("bankData" , JSON.stringify(bankData));


    }

} 

