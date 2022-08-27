class PDF{
    constructor(){

    }

    exportPDF(){
        html2pdf().set(opt).from(element).save();
    }

}

var element = document.getElementById('movements__wrapper');
var opt = {
  margin:       1,
  filename:     'BankMovements.pdf',
  image:        { type: 'jpeg', quality: 0.98 },
  html2canvas:  { scale: 1 },
  jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' },
  pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
};

