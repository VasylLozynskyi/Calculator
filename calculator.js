let input = document.querySelector("input");
let div = document.querySelector(".all-buttons");
let previousNumber = "";
let lastNumber = "";
let point = "";
div.addEventListener("click", (e) => {
  buttonsHandler(e.target)});
function buttonsHandler(el) {
      if (!isNaN(+el.textContent)){
        setInput();
      } else {
        switch (el.textContent) {
          case "=":
            result();
            break;
          case "+":
            setInput();
            point = "+";
            break;
          case "*":
            setInput();
            point = "*";
            break;
          case "-":
            setInput();
            point = "-";
            break;
          case "/":
            setInput();
            point = "/";
            break;
          case "C":
            reset()
            break;
          case "back":
            back()
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
        let temp = new Result(previousNumber, lastNumber, point);
        input.value = temp.response();
        previousNumber = ""
        lastNumber = ""
        point = ""
        } else throw new Error("don't have any of values")
      }

      function setInput() {
        if (input.value == "0" && !isNaN(el.textContent)) input.value = "";
        if (isNaN(el.textContent) && !previousNumber){
          previousNumber = input.value;
        }
        if(previousNumber && !isNaN(el.textContent)){
          lastNumber += el.textContent;
        }
          input.value += el.textContent;
        }
}

  class Result{
    constructor(previousNumber, lastNumber, point){
      this.previousNumber = previousNumber;
      this.lastNumber = lastNumber;
      this.point = point;
    }
    response() {
      switch (this.point) {
        case "+":
          return +this.previousNumber + +this.lastNumber;
        case "*":
          return +this.previousNumber * +this.lastNumber;
        case "-":
          return +this.previousNumber - +this.lastNumber;
        case "/":
          return +this.previousNumber / +this.lastNumber;
      }
    }
  }