window.onload = function() {
    //window.alert("Sa vÃµitsid uue iPhone!");
    /* Tekst vÃ¤lja kommenteeritud */
  };
  
  let counter = 1;
  function myFunction() {
    if(counter == 1){
        document.getElementById("demo").innerHTML = "Proovin sisu asendada";
    } else if(counter == 2){
        document.getElementById("demo").innerHTML = "Asendasin teksti uuesti";
    } else{
        location.reload();
    }
  
    counter++;
  }


  let counter2 = 1;
  function demoFunction(){
    if(counter2 == 1){
        document.getElementById("demo2").innerHTML = "Proovin sisu asendada";
    } else if(counter2 == 2){
        document.getElementById("demo2").innerHTML = "Asendasin teksti uuesti";
    } else{
        location.reload();
    }
  
    counter2++;


  }