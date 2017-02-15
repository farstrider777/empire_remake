//0 = water
//1 = land
//2 = neutral city
//3 = player one's city
//4 = player two's city
//5 = player three's city
// etc..


/// maybe add where you have the option to add the * with a click then you move that pieces
// could use it to set paths for your troops
// make pieces be able to be moved in any order... will it work with * on each piece?
// what about pieces that are next to each other... why does doulbe * happens sometimes
// add proper production based on when city is taken
// add diagonals
// break up some functions and move them to make more accurate names and more efficient code
// implent fog of war
// implent mulitiple players
//make one or two types of units that can move around on the board and fight

var board = [];
var height = 7
var width = 10

while(board.push(generateBoard(width)) < height){
};

function generateBoard(width){
  var boardRow = [];
  for(var count = 0; count < width; count++){
    boardRow.push(chooseWaterCityOrLand())
  }
  return boardRow
}

function chooseWaterCityOrLand(){
  var waterLandOrCity = Math.random();
  if(waterLandOrCity < .035){
    return 2;
  } else if (waterLandOrCity < .35){
    return 1;
  } else return 0;
}

var currentHtml;

function drawRow(rowNumber){
  for(var count = 0; count < board[rowNumber].length; count++){
    currentHtml = $(".boardHtml").html();
    currentHtml += `<div class="${rowNumber}r${[count]}c b${board[rowNumber][count]}">
    </div>`
    $(".boardHtml").html(currentHtml);
  }
  currentHtml += '<br>'
  $(".boardHtml").html(currentHtml)
}

chooseYourCity();
drawBoard();

function chooseYourCity(){
    board[Math.floor(Math.random() * height)][Math.floor(Math.random() * width)] = 3;
  }

function drawBoard(){
  for(var count = 0; count < board.length; count++){
    drawRow(count);
  }
}

var turnBut = document.getElementById("turnBut");
turnNumber = Number(turnBut.innerHTML);
elementList = document.querySelectorAll("div");

function findCityRow(rowNumber){
  for(var count = 0; count < board[rowNumber].length; count++){
    if(board[rowNumber][count] === 3){
      if(turnNumber % 6 === 0){
        //console.log(`made a army at ${rowNumber}r${count}c`)
        var where = `${rowNumber}r${count}c`;
        //console.log(where);
        where = (rowNumber * width) + count;
        //turnBut.innerHTML = "99";
        elementList[where].innerHTML = "A";

      }
    }
  }
}

function produce(){
  for(var count = 0; count < board.length; count++){
    findCityRow(count);
  }
}

function findEachRow(rowNumber){
  for(var count = 0; count < board[rowNumber].length; count++){
    where = (rowNumber * width) + count;
    if(elementList[where].innerHTML === "A" || elementList[where].innerHTML === "A*" ){
      elementList[where].innerHTML = "A*"
      return where + 1;
    }
  }
  return false;
}

function findEach(){
  for(var count = 0; count < board.length; count++){
    var test = findEachRow(count)
    if(test){
      return where;
    }
  }
}

function removeMinusRow(rowNumber){
  for(var count = 0; count < board[rowNumber].length; count++){
    where = (rowNumber * width) + count;
    if(elementList[where].innerHTML === "A-"){
      elementList[where].innerHTML = "A"
    }
  }
}

function removeMinus(){
  for(var count = 0; count < board.length; count++){
    var test = removeMinusRow(count)
  }
}

function whereToArray(where_value){
  var rowNumber = Math.floor(where_value/width);
  var colNumber = where_value % width;

}

function makeMove(this_where){
  //move right
  if((this_where + 1)% width){
    $(elementList[this_where + 1]).click(function(){
      if(board[Math.floor((this_where + 1)/width)][(this_where + 1) % width] === 1){
        elementList[this_where + 1].innerHTML = "A-";
      }
      if(board[Math.floor((this_where + 1)/width)][(this_where + 1) % width] === 2){
        if(Math.random() > .5){
          console.log("your army was victorious the city is yours!")
          elementList[this_where + 1].innerHTML = "A-";
          //change board array
          board[Math.floor((this_where + 1)/width)][(this_where + 1) % width] = 3;
          //change background-color of new city
          var changeHtml = elementList[this_where + 1];
          changeHtml = $(changeHtml);
          changeHtml.removeClass("b2").addClass("b3");
        }else {
          console.log("your army has been defeated and destroyed!")
        }
      }
      elementList[this_where].innerHTML = "";
      $("div").off();
      findEach();
      makeMove(where);
    });
  }
  //move left
  if(this_where % width){
    $(elementList[this_where - 1]).click(function(){
      if(board[Math.floor((this_where - 1)/width)][(this_where - 1) % width] === 1){
        elementList[this_where - 1].innerHTML = "A-";
      }
      if(board[Math.floor((this_where - 1)/width)][(this_where - 1) % width] === 2){
        if(Math.random() > .5){
          console.log("your army was victorious the city is yours!")
          elementList[this_where - 1].innerHTML = "A-";
          //change board array
          board[Math.floor((this_where - 1)/width)][(this_where - 1) % width] = 3;
          //change background-color of new city
          var changeHtml = elementList[this_where - 1];
          changeHtml = $(changeHtml);
          changeHtml.removeClass("b2").addClass("b3");
        }else {
          console.log("your army has been defeated and destroyed!")
        }
      }
      elementList[this_where].innerHTML = "";
      $("div").off();
      findEach();
      makeMove(where);
    });
  }
  //move up
  if(this_where > (width - 1)){
    $(elementList[this_where - width]).click(function(){
      if(board[Math.floor((this_where - width)/width)][(this_where - width) % width] === 1){
        elementList[this_where - width].innerHTML = "A-";
      }
      if(board[Math.floor((this_where - width)/width)][(this_where - width) % width] === 2){
        if(Math.random() > .5){
          console.log("your army was victorious the city is yours!")
          elementList[this_where - width].innerHTML = "A-";
          //change board array
          board[Math.floor((this_where - width)/width)][(this_where - width) % width] = 3;
          //change background-color of new city
          var changeHtml = elementList[this_where - width];
          changeHtml = $(changeHtml);
          changeHtml.removeClass("b2").addClass("b3");
        }else {
          console.log("your army has been defeated and destroyed!")
        }
      }
      elementList[this_where].innerHTML = "";
      $("div").off();
      findEach();
      makeMove(where);
    });
  }

  //move down
  if(this_where < (height * width - width)){
    $(elementList[this_where + width]).click(function(){
      if(board[Math.floor((this_where + width)/width)][(this_where + width) % width] === 1){
        elementList[this_where + width].innerHTML = "A-";
      }
      if(board[Math.floor((this_where + width)/width)][(this_where + width) % width] === 2){
        if(Math.random() > .5){
          console.log("your army was victorious the city is yours!")
          elementList[this_where + width].innerHTML = "A-";
          //change board array
          board[Math.floor((this_where + width)/width)][(this_where + width) % width] = 3;
          //change background-color of new city
          var changeHtml = elementList[this_where + width];
          changeHtml = $(changeHtml);
          changeHtml.removeClass("b2").addClass("b3");
        }else {
          console.log("your army has been defeated and destroyed!")
        }
      }
      elementList[this_where].innerHTML = "";
      $("div").off();
      findEach();
      makeMove(where);
    });
  }

  //stay in place
  if(true){
    $(elementList[this_where]).click(function(){
        elementList[this_where].innerHTML = "A-";
      $("div").off();
      findEach();
      makeMove(where);
    });
  }
}






function takeTurn(){
  turnNumber++;
  turnBut.innerHTML = turnNumber
  removeMinus();

  produce();
  var where = findEach();
  makeMove(where);
  //every unit that can be moved is moved
  //turn counter is moved up one
}

$("button").click(takeTurn)


// add other moves that can take cities beside right
// add diagonals
// break up some functions and move them to make more accurate names and more efficient code
//make one or two types of units that can move around on the board and fight
