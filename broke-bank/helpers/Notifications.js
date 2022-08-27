class Notifications {
    

    // ----------- Login Alert ----------------

    loginAlert(){
        $("<div class='alert alert-danger'>Please check your ID and Password</div>" ).insertBefore( "#loginBtn" );
        setTimeout(function(){$("div").remove(".alert")}, 2000)
    }

    // ------- Account Pick Alert --------------
    
    pickAccountAlert(){
        $("<div class='alert alert-danger'>Please pick an account</div>" ).insertBefore( "#rmt__button" );
        setTimeout(function(){$("div").remove(".alert")}, 2000)
    }

    pickAccountAlertDpst(){
        $("<div class='alert alert-danger'>Please pick an account</div>" ).insertBefore( "#deposit__account__information" );
        setTimeout(function(){$("div").remove(".alert")}, 2000)
    }

    pickAccountAlertwthd(){
        $("<div class='alert alert-danger'>Please pick an account</div>" ).insertBefore( "#wthd__main__account__information" );
        setTimeout(function(){$("div").remove(".alert")}, 2000)
    }
    pickAccountAlertexc(){
        $("<div class='alert alert-danger'>Please pick an account</div>" ).insertBefore( "#exc__first__account__information, #exc__second__account__information" );
        setTimeout(function(){$("div").remove(".alert")}, 2000)
    }

    // ------------ Insufficient Credit -------------

    wrongAmount(){
        $("<div class='alert alert-danger'>Insufficient Credit</div>" ).insertBefore( "#rmt__button" );
        setTimeout(function(){$("div").remove(".alert")}, 2000)
    }
    wrongAmountDpst(){
        $("<div class='alert alert-danger'>Amount is bigger than 500.000 Limit</div>" ).insertBefore( "#deposit__account__information" );
        setTimeout(function(){$("div").remove(".alert")}, 2000)
    }
    wrongAmountwthd(){
        $("<div class='alert alert-danger'>Amount is bigger than 500.000 Limit</div>" ).insertBefore( "#wthd__main__account__information" );
        setTimeout(function(){$("div").remove(".alert")}, 2000)
    }


    // ----------------- Check IBAN ---------------
    checkIBANAlert(){
        $("<div class='alert alert-danger'>Please check IBAN</div>" ).insertBefore( "#rmt__button" );
        setTimeout(function(){$("div").remove(".alert")}, 2000)
    }

    // -------------- Check Input -------------------
    checkInputAlert(){
        $("<div class='alert alert-danger'>Please check Inputs</div>" ).insertBefore( "#rmt__button" );
        setTimeout(function(){$("div").remove(".alert")}, 2000)
    };

    checkdpstAlert(){
        $("<div class='alert alert-danger'>Please check Amount</div>" ).insertBefore( "#deposit__account__information" );
        setTimeout(function(){$("div").remove(".alert")}, 2000)
    }
    checkwthdAlert(){
        $("<div class='alert alert-danger'>Please check Amount</div>" ).insertBefore( "#wthd__main__account__information" );
        setTimeout(function(){$("div").remove(".alert")}, 2000)
    }

    checkExcAlert(){
        $("<div class='alert alert-danger'>Please check Amount</div>" ).insertBefore( "#convert__button" );
        setTimeout(function(){$("div").remove(".alert")}, 2000)
    }

    // Confirmation Overlays


}


