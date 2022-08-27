class Currency{
    constructor(){
        
    }

    async getExchangeRate(currency1 , currency2){
        this.currency1=currency1;
        this.currency2 = currency2
        this.url = `https://api.exchangerate.host/convert?from=${currency1}&to=${currency2}`
        
        const excResponse = await fetch(this.url)
        const excResponseJSON = await excResponse.json()
        return excResponseJSON.result 
    }

   async convert(currency1 , currency2 ,amount){
    this.amount = amount;
    let value1 = await this.getExchangeRate(currency1 , currency2)
    
    return value1 * amount;
   }

    
}



