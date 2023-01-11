let input = document.querySelector("input");
let div = document.querySelector(".all-buttons");
let previousNumber = "";
let lastNumber = "";
let point = "";
let temp = false;
let chackfirst = false;
div.addEventListener("click", (e) => {
  buttonsHandler(e.target)});
function buttonsHandler(el) {
      if (!isNaN(+el.textContent) || el.textContent == "."){
        setInput();
      } else {
        temp = false;
        switch (el.textContent) {
          case "=":
            temp = true;
            result();
            break;
          case "C":
            reset()
            break;
          case "back":
            back()
            break;
          default:
            
            if(!chackfirst && !isNaN(+el.textContent) && el.textContent != "-"){
              el.textContent == "";
            } else if (!chackfirst && el.textContent === "-"){
              chackfirst = true;
            } else  { point = el.textContent;}
            setInput();
            break;
        }
      }
    
      function reset() {
            previousNumber = ""
            input.value = ""
            lastNumber = ""
            point = ""
      }
      function back () {
        const deleteLastChar = input.value.slice(0, -1);
          const lastChar = input.value
            .split(' ')
            .map(word => word[word.length-1])
            .join('');
            input.value = deleteLastChar;
          if (!isNaN(+lastChar)){
            currentNumber = input.value;
          } else point = ""
      }

      function result() {
        if (previousNumber && lastNumber && point) {
          let result = new Result(previousNumber, lastNumber, point);
          input.value = result.response();
          previousNumber = "";
          lastNumber = "";
          point = "";
        } else throw new Error("don't have any of values");
      }

      function setInput() {
        if (input.value == "0" && !isNaN(el.textContent)) input.value = "";
        if (isNaN(+el.textContent) && !previousNumber && el.textContent != "."){
          previousNumber = input.value;
        } else if(previousNumber && (!isNaN(el.textContent) || el.textContent == ".")){
          lastNumber += el.textContent;
        }
         
        if (!temp){
          input.value += el.textContent;
        } else {
          temp = false;
          input.value = "";
          input.value += el.textContent;
        }
      }
}

  class Result{
    constructor(previousNumber, lastNumber, point){
      this.previousNumber = previousNumber;
      this.lastNumber = lastNumber;
      this.point = point;
    }
    response() {
      let response;
      
      switch (this.point) {
        case "+":
          response = (+this.previousNumber + +this.lastNumber);
          break;
        case "*":
          response = (this.previousNumber * this.lastNumber);
          break;
        case "-":
          response = (this.previousNumber - this.lastNumber);
          break;
        case "/":
          response = (this.previousNumber / this.lastNumber);
          break;
      }
      if (/\./.test(+this.previousNumber) || /\./.test(+this.lastNumber)){
        response = response.toFixed(6); 
      } else if (/\./.test(response)) response = response.toFixed(3); 
      return response;
    }
  }