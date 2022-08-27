class Validations{
    checkRMTInputs(){
        if ($("#recipientName").val() ==="" || $("#IBAN").val()==="" || $("#remittance__amount").val()==="" || $("#rmtDescription").val()==="") {
            return false;
        } else {
            return true;
        }
    }

    ibanValidation(value){
        const ibanRegex = /TR[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){1}([0-9]{1})([a-zA-Z0-9]{3}\s?)([a-zA-Z0-9]{4}\s?){3}([a-zA-Z0-9]{2})\s?/;

        if (ibanRegex.test(value)) {
            return true;
        } else {
            return false;
        }
    }

    checkDpstInputs(){
        if ($("#depositAmount").val() ==="") {
            return false;
        } else {
            return true;
        }
    }

    amountInputController(value){
        let valueTrim = value.trim();
        let valueToNumber = parseInt(valueTrim);
        let lastValue= false;
        if (valueToNumber >= 0) {
            lastValue = valueToNumber;
 
        }
        else{
            false

        }

        return lastValue;
    }

    checkwthdInputs(){
        if ($("#withdrawAmount").val() ==="") {
            return false;
        } else {
            return true;
        }
    }

    checkexcInputs(){
        if (($("#exc__amount__input").val() ==="") ) {
            return false;
        } else {
            return true;
        }
    }

    checkexcAccountInputs(firstpickedAccValue , secondpickedAccValue){
        if ((firstpickedAccValue === "nothing") || (firstpickedAccValue === undefined) || (firstpickedAccValue === null) || (secondpickedAccValue === "nothing") || (secondpickedAccValue === undefined) || (secondpickedAccValue === null)) {
            return false
        } else {
            return true
        }
    }

}