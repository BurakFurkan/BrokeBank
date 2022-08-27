class Movement{
    constructor(movementID ,type , amount, date ,fromWho , toWho ,description , read=false ){
        this.movementID = movementID;
        this.type = type;
        this.amount=amount;
        this.date = date;
        this.fromWho = fromWho;
        this.toWho = toWho;
        this.description=description
        this.read=read;
    }

    movementIDgenerator(){
        let movementIDFromGenerator;
        let user = localdb.getUserFromStorage(1111);
         if (user.movements === null ) {
             movementIDFromGenerator = 1 
         }
         else{
            movementIDFromGenerator = (user.movements.length +1);
         }
      
         return movementIDFromGenerator;
     }

     movementTypeChecker(movement){
        if((movement.type==="Deposit") || (movement.type==="Salary")){
            return "income"
        }else if((movement.type==="Remittance") || (movement.type==="Withdraw")){
            return "outcome"
        }else return "exchange"
     }

     incomeMovement(movement){
        let firstDate = new Date(movement.date);

        let day= (firstDate.getDate() <= 9) ? "0" + firstDate.getDate() : firstDate.getDate();
        let month = (firstDate.getMonth() <= 9) ? "0" + (firstDate.getMonth()+1) : firstDate.getMonth();
        let year = firstDate.getFullYear();
        let fullDate = `${day}/${month}/${year}`
        
        let amount;

        switch (movement.toWho) {
            case "My TL Account":
                amount = ui.currencyFormatter("TRY", movement.amount)
                break;
        
            case "My USD Account":
                amount = ui.currencyFormatter("USD", movement.amount)
                break;
            case "My EUR Account":
                amount = ui.currencyFormatter("EUR", movement.amount)
                break;
        }

        let html = `
        <div class="movement incomeMovement">
            <div class="movInfos"><span class="typeSpan incomeType">${movement.type}</span><span class="dateSpan">${fullDate}</span><span class="amountSpan incomeAmount">+${amount}</span></div>
            <div class="from__to"><span class="fromSpan">From: ${movement.fromWho}</span><span class="whoSpan">To: ${movement.toWho}</span></div>
            <div class="desc"><strong>Description:</strong> <span class="descSpan">${movement.description}</span></div>
        </div>
        `

        return html;
     }

     outcomeMovement(movement){
        let firstDate = new Date(movement.date);

        let day= (firstDate.getDate() <= 9) ? "0" + firstDate.getDate() : firstDate.getDate();
        let month = (firstDate.getMonth() <= 9) ? "0" + (firstDate.getMonth()+1) : firstDate.getMonth();
        let year = firstDate.getFullYear();
        let fullDate = `${day}/${month}/${year}`
        
        let amount;

        switch (movement.fromWho) {
            case "My TL Account":
                amount = ui.currencyFormatter("TRY", movement.amount)
                break;
        
            case "My USD Account":
                amount = ui.currencyFormatter("USD", movement.amount)
                break;
            case "My EUR Account":
                amount = ui.currencyFormatter("EUR", movement.amount)
                break;
        }

        let html = `
        <div class="movement outcomeMovement">
            <div class="movInfos"><span class="typeSpan outcomeType">${movement.type}</span><span class="dateSpan">${fullDate}</span><span class="amountSpan outcomeAmount">-${amount}</span></div>
            <div class="from__to"><span class="fromSpan">From: ${movement.fromWho}</span><span class="whoSpan">To: ${movement.toWho}</span></div>
            <div class="desc"><strong>Description:</strong> <span class="descSpan">${movement.description}</span></div>
        </div>
        `

        return html;
     }

     exchangeMovement(movement){
        let firstDate = new Date(movement.date);

        let day= (firstDate.getDate() <= 9) ? "0" + firstDate.getDate() : firstDate.getDate();
        let month = (firstDate.getMonth() <= 9) ? "0" + (firstDate.getMonth()+1) : firstDate.getMonth();
        let year = firstDate.getFullYear();
        let fullDate = `${day}/${month}/${year}`
        
        let amount;

        switch (movement.fromWho) {
            case "My TL Account":
                amount = ui.currencyFormatter("TRY", movement.amount)
                break;
        
            case "My USD Account":
                amount = ui.currencyFormatter("USD", movement.amount)
                break;
            case "My EUR Account":
                amount = ui.currencyFormatter("EUR", movement.amount)
                break;
        }

        let html = `
        <div class="movement exchangeMovement">
            <div class="movInfos"><span class="typeSpan exchangeType">${movement.type}</span><span class="dateSpan">${fullDate}</span><span class="amountSpan exchangeAmount">${amount}</span></div>
            <div class="from__to"><span class="fromSpan">From: ${movement.fromWho}</span><span class="whoSpan">To: ${movement.toWho}</span></div>
            <div class="desc"><strong>Description:</strong> <span class="descSpan">${movement.description}</span></div>
        </div>
        `

        return html;
     }

     

    


}


