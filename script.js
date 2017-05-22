$(document).ready(function() {
  var disp1 = $("#disp1");
  var disp2 = $("#disp2");
  var mem1 = ""; //short term memory for disp1 top display
  var mem2 = []; //long term memory for disp2 lower display
  var i = 0;
  var decimal = false; // got to make sure only one decimal per number!
  var operator = false; // keeping track of how many operators in a row.
  var equals = false; // keeping track of whether equals has just been pressed

  $("button").click(function() {
    var input = $(this).attr("value");

    switch (input) {
      case ".":
        if (!decimal) {
          decimal = true;
          mem1 += input;
        }
        break;

      case "ac": // make clear function
        mem1 = "";
        mem2 = [];
        i = 0;
        decimal = false;
        break;

      case "ce":
        if (i > 0) {
          mem1 = "";
          decimal = false;
        }
        mem1 = "";
        break;

      case "+":
      case "-":
      case "*":
      case "/":
        if (!operator) {
          mem2[i] = mem1;
          mem2[i + 1] = input;
          mem1 = "";
          i += 2;
          decimal = false;
          operator = true;
        }
        break;

      case "=":
        if (!operator) {
          mem2[i] = mem1;
          mem1 = Math.round(eval(mem2.join("")).toString() * 10000 ) / 10000;
          mem2 = [];
          i = 0;
          decimal = false;
          equals = true;
        }
        break;

      default:
        // if input is number or decimal
        if (equals) {
          mem1 = input;
          operator = false;
          equals = false;
        } else {
          mem1 += input;
          operator = false;
        }
    }

    console.log("mem1 length is: " + mem1.length);
    console.log(mem1);
    console.log("mem2 length is: " + mem2.join("").length);
    console.log(mem2);
    
    if (mem1.toString().length > 10 || mem2.join("").length > 18) {
      disp1.html("Too long!");
      disp2.html("That's what she said!");
    } else {
      disp1.html(mem1);
      disp2.html(mem2.join(""));
    }
    
    
  });
});
