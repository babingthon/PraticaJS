//criando a classe Calculator
class Calculator {

    constructor() {
      this.upperValue = document.querySelector('#upper-number');
      this.resultValue = document.querySelector('#result-number');
      this.reset = 0;
    }

    checkLastDigit(input, upperValue, reg) {
      if((
        !reg.test(input) &&
        !reg.test(upperValue.substr(upperValue.length - 1))
      )) {
        return true
      } else {
        return false;
      }
    }

    sum(n1, n2) {
      return parseFloat(n1) + parseFloat(n2);
    };

    subtraction(n1, n2) {
      return parseFloat(n1) - parseFloat(n2);
    };

    multipication(n1, n2) {
      return parseFloat(n1) * parseFloat(n2);
    };

    division(n1, n2) {
      return parseFloat(n1) / parseFloat(n2);
    };

    refreshValues(total) {
      this.upperValue.textContent = total;
      this.resultValue.textContent = total; 
    }

    clearValues() {
      this.upperValue.textContent = 0;
      this.resultValue.textContent = 0;
    }

    resolution() {

      let upperValueArray = (this.upperValue.textContent).split(" ")  ;
      let result = 0;
      
      for(let i = 0; i <= upperValueArray.length; i++) {

        let operation = 0;
        let actualItem = upperValueArray[i];

        if(actualItem == "x") {
          operation = 1;
          result = calc.multipication(upperValueArray[i - 1], upperValueArray[i + 1]);
        } else if(actualItem == "/") {
          operation = 1;
          result = calc.division(upperValueArray[i - 1], upperValueArray[i + 1]);
        } else if(!upperValueArray.includes('x') && !upperValueArray.includes('/')) {

          if(actualItem =="+") {
            operation = 1;
            result = calc.sum(upperValueArray[i - 1], upperValueArray[i + 1]);
          } else if(actualItem == "-") {
            operation = 1;
            result = calc.subtraction(upperValueArray[i - 1], upperValueArray[i + 1]  );
          }

        }

        if(operation) {
          upperValueArray[i - 1] = result;
          upperValueArray.splice(i, 2);
          i = 0;
        }

      }

      if(result) {
        calc.reset = 1;
      }

      calc.refreshValues(result);
      
    }

    btnPress() {
      let input = this.textContent;
      let upperValue = calc.upperValue.textContent;
      
      var reg = new RegExp('^\\d+$');

      if(calc.reset && reg.test(input)) {
        upperValue = '0';
      }

      calc.reset = 0; 

      if(calc.checkLastDigit(input, upperValue, reg)) {
        return false;
      }

      if(this.textContent == "AC") {

        calc.clearValues();

      } else if(input == "=") {

        calc.resolution();
        
      } else {

        if(!reg.test(input)) {
          input = ` ${input} `
        }

        if(upperValue == "0") {
          if(reg.test(input)) {
            calc.upperValue.textContent = input;
          }
        } else {
          calc.upperValue.textContent += input;
        }


      }

      
    }
  
}

//star obj
let calc = new Calculator

let buttons = document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', calc.btnPress)
})
