blank = "🔲";

//QoL functions
function get(thingToGet) {
  return document.getElementById(thingToGet);
}

var myBoard = [];

//board creation
for (var x = 0; x < 20; x++) {
  myBoard[x] = [];

  for (var y = 0; y < 20; y++) {
    myBoard[x][y] = blank;
  }
}



function displayBoard() {
  get('output_holder').innerHTML = '';
  var outputString = '';

  for (var y = 0; y < myBoard.length; y++) {
    for (var x = 0; x < myBoard[y].length; x++) {
      outputString = outputString + myBoard[x][y];
    }
    outputString = outputString + "</br>";
  }
  get('output_holder').innerHTML = outputString;
}

//score and lives
score = 0;
lives = 3;
//weird title screen thing
work = 1;
//monkey step count
var stepCount = 10;
//respawn of characters and elements
var respawn = 1;
//characters and elements
var pulseSpeed = 500;
spiderX = 3;
spiderY = 3;
snakeX = 11;
snakeY = 3;
shadowX = 19;
shadowY = 19;
sharkX = 8;
sharkY = 19;
cherryX = 5;
cherryY = 11;
myCharacterX = 7;
myCharacterY = 7;
monkeyX = 12
monkeyY = 5
crocX = 3;
crocY = 9;
croc = "🐊";
moon = "🌚";
energy = "🔆";
player1 = "👾";
frog = "🐸";
shark = "🦈";
monkey = "🐒"
banana = "🍌"
bee = "🐝"
myBoard[crocX][crocY] = croc;
myBoard[myCharacterX][myCharacterY] = player1;
myBoard[spiderX][spiderY] = frog;
myBoard[sharkX][sharkY] = shark;
myBoard[cherryX][cherryY] = energy;
myBoard[shadowX][shadowY] = moon;
myBoard[monkeyX][monkeyY] = monkey;
upKey = 38;
downKey = 40;
leftKey = 37;
rightKey = 39;
wasdCheck = false;

//croc variables (the ones with cherry affect croc on cherry pickup) (i feel like there's a better way to do this tho...)
var dontKnowSetTimeoutLol = 0;
var moveAmtTL = 4;
var moveAmtTR = 4;
var moveAmtBR = 4;
var moveAmtBL = 4;
var cherryTLEY = cherryY - 2;
var cherryTREX = cherryX + 2;
var cherryBREY = cherryY + 2;
var cherryBLEX = cherryX - 2;
var cherryTLXc = cherryX - 2;
var cherryTLXm2 = cherryX - 1;
var cherryTLTRX = cherryX;
var cherryTRXm1 = cherryX + 1;
var cherryTRYc = cherryY - 2;
var cherryTRYm2 = cherryY - 1;
var cherryTRBRY = cherryY;
var cherryBRYm1 = cherryY + 1;
var cherryBRXc = cherryX + 2;
var cherryBRXm2 = cherryX + 1;
var cherryBRBLX = cherryX;
var cherryBLXm1 = cherryX - 1;
var cherryBLYc = cherryY + 2;
var cherryBLYm2 = cherryY + 1;
var cherryBLTLY = cherryY;
var cherryTLYm1 = cherryY - 1;
//shark variables
var disX = Math.abs(myCharacterX - sharkX);
var disY = Math.abs(myCharacterY - sharkY);

//mines(OPTIMIZING because it can and should be)
//well now that im in vscode i COULD make a different file for this... nah
class Mine {
  constructor(xPos, yPos, damage, img) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.damage = damage;
    this.img = img;
  }
}

//ded function lol
function ded() {
  document.body.style.background = "rgb(225,35,0)";
  get("lives").style.display = "none";
  get("game_over").style.display = "block";
  get("ur_dead").style.display = "block";
  get("everything").style.backgroundImage = "url(https://i.imgur.com/knQZJCq.jpg)";
  get("everything").style.backgroundSize = "100% 100%";
  get("everything").style.backgroundRepeat = "no-repeat";
  get("everything").style.backgroundSize = "100% 100%";
  get("everything").style.backgroundAttachment = "fixed";
  get("output_holder").style.opacity = "0";
  get("output_holder").style.fontSize = "98%";
}

//element removal
function removeElement() {
  var element1 = get("title_screen");
  var element2 = get("info");
  var element3 = get("infobutton");
  var element4 = get("patchNoteButton");
  var element5 = get("patch_notes");
  var element6 = get("wasdbutton");
  var element7 = get("wasdToggle");
  element1.parentNode.removeChild(element1);
  element2.parentNode.removeChild(element2);
  element3.parentNode.removeChild(element3);
  element4.parentNode.removeChild(element4);
  element5.parentNode.removeChild(element5);
  element6.parentNode.removeChild(element6);
  element7.parentNode.removeChild(element7);
}

function wasd() {
  switch (wasdCheck){
    case wasdCheck = true:
    upKey = 38;
    downKey = 40;
    leftKey = 37;
    rightKey = 39;
    get("wasdToggle").innerHTML = "WASD is now OFF.";
    wasdCheck = false;
    console.log("present");
    break;

    case wasdCheck = false:
    upKey = 87;
    downKey = 83;
    leftKey = 65;
    rightKey = 68;
    get("wasdToggle").innerHTML = "WASD is now ON.";
    wasdCheck = true;
    console.log("represent");
    break;
  }
}
//actions on key press
document.addEventListener('keydown', function (event) {

  event.preventDefault();
  if (event.keycode == 13) {
    displayBoard();
  }
  if (event.keyCode == 186) {
    lives = 99999;
    get("lives").style.color = "gold";
    get("godMode").style.display = "block";
    player1 = "🌞";
  }
  if (work == 1) {
    work = 0;
    removeElement();
  }

  //shark 
  try {
    if (lives < 3) {

      if (sharkY == 0) {
        myBoard[sharkX][sharkY] = blank;
        sharkY++;
        myBoard[sharkX][sharkY] = shark;

      } else if (sharkY == 19) {
        myBoard[sharkX][sharkY] = blank;
        sharkY--;
        myBoard[sharkX][sharkY] = shark;
      } else if (sharkX == 0) {
        myBoard[sharkX][sharkY] = blank;
        sharkX++;
        myBoard[sharkX][sharkY] = shark;
      } else if (sharkX == 19) {
        myBoard[sharkX][sharkY] = blank;
        sharkX--;
        myBoard[sharkX][sharkY] = shark;
      } // x movement 
      else {
        if (sharkX < myCharacterX) {
          myBoard[sharkX][sharkY] = blank;
          sharkX++;
          myBoard[sharkX][sharkY] = shark;
        } else if (sharkX == myCharacterX) {
          myBoard[sharkX][sharkY] = blank;
          sharkY--;
          myBoard[sharkX][sharkY] = shark;
        } else {
          myBoard[sharkX][sharkY] = blank;
          sharkX--;
          sharkX--;
          myBoard[sharkX][sharkY] = shark;
        }
      }
    }
  }
  //i have the ability to fix the softlocking and i make it into a mechanic...great game design!
  catch (error) {
    softlock();
  }
  function softlock() {
    document.body.style.backgroundImage = "url(https://ak0.picdn.net/shutterstock/videos/8502370/thumb/10.jpg)";
    get("output_holder").style.opacity = "0";
    get("softlocked").style.display = "block";
    get("beCareful").style.display = "block";
    get("lives").style.display = "none";
    lives = 0;
  }
  //reset
  if (event.keyCode == 82) {
    window.location.reload(true);
  }

  //character and frog movement

  if (lives > 0) {

    if (event.keyCode == upKey && myCharacterY > 0) {

      if (spiderY == 19) {
        myBoard[spiderX][spiderY] = frog;
        if (myCharacterY == 0) {
          myBoard[myCharacterX][myCharacterY] = player1;
        } else {
          myBoard[myCharacterX][myCharacterY] = blank;
          myCharacterY--;
          myBoard[myCharacterX][myCharacterY] = player1;
        }
      } else if (myCharacterY == 0) {
        myBoard[myCharacterX][myCharacterY] = player1;
      }
      if (spiderY != 19 && myCharacterY != 0) {
        myBoard[spiderX][spiderY] = blank;
        spiderY++;
        myBoard[spiderX][spiderY] = frog;
        myBoard[myCharacterX][myCharacterY] = blank;
        myCharacterY--;
        myBoard[myCharacterX][myCharacterY] = player1;
        myBoard[spiderX][spiderY] = frog;

      }

    }
    if (event.keyCode == downKey && myCharacterY < 19) {

      if (spiderY == 0) {
        myBoard[spiderX][spiderY] = frog;
        if (myCharacterY == 19) {
          myBoard[myCharacterX][myCharacterY] = player1;
        } else {
          myBoard[myCharacterX][myCharacterY] = blank;
          myCharacterY++;
          myBoard[myCharacterX][myCharacterY] = player1;
        }
      } else if (myCharacterY == 19) {
        myBoard[myCharacterX][myCharacterY] = player1;
      }
      if (spiderY != 0 && myCharacterY != 19) {
        myBoard[spiderX][spiderY] = blank;
        spiderY--;
        myBoard[spiderX][spiderY] = frog;
        myBoard[myCharacterX][myCharacterY] = blank;
        myCharacterY++;
        myBoard[myCharacterX][myCharacterY] = player1;
        myBoard[spiderX][spiderY] = frog;

      }

    }
    if (event.keyCode == rightKey && myCharacterX < 19) {

      if (spiderX == 0) {
        myBoard[spiderX][spiderY] = frog;
        if (myCharacterX == 19) {
          myBoard[myCharacterX][myCharacterY] = player1;
        } else {
          myBoard[myCharacterX][myCharacterY] = blank;
          myCharacterX++;
          myBoard[myCharacterX][myCharacterY] = player1;
        }
      } else if (myCharacterX == 19) {
        myBoard[myCharacterX][myCharacterY] = player1;
      }
      if (spiderX != 0 && myCharacterX != 19) {
        myBoard[spiderX][spiderY] = blank;
        spiderX--;
        myBoard[spiderX][spiderY] = frog;
        myBoard[myCharacterX][myCharacterY] = blank;
        myCharacterX++;
        myBoard[myCharacterX][myCharacterY] = player1;
        myBoard[spiderX][spiderY] = frog;

      }

    }
    if (event.keyCode == leftKey && myCharacterX > 0) {

      if (spiderX == 19) {
        myBoard[spiderX][spiderY] = frog;
        if (myCharacterX == 0) {
          myBoard[myCharacterX][myCharacterY] = player1;
        } else {
          myBoard[myCharacterX][myCharacterY] = blank;
          myCharacterX--;
          myBoard[myCharacterX][myCharacterY] = player1;
        }
      } else if (myCharacterX == 0) {
        myBoard[myCharacterX][myCharacterY] = player1;
      }
      if (spiderX != 19 && myCharacterX != 0) {
        myBoard[spiderX][spiderY] = blank;
        spiderX++;
        myBoard[spiderX][spiderY] = frog;
        myBoard[myCharacterX][myCharacterY] = blank;
        myCharacterX--;
        myBoard[myCharacterX][myCharacterY] = player1;

      }

    }

    //croc teleport and cherry pickup
    if (myBoard[myCharacterX][myCharacterY] == myBoard[cherryX][cherryY]) {
      score += 250;
      cherryX = Math.floor((Math.random() * 20));
      cherryY = Math.floor((Math.random() * 20));
      if (myBoard[cherryX][cherryY] == myBoard[shadowX][shadowY]) {
        cherryX = Math.floor((Math.random() * 20));
        cherryY = Math.floor((Math.random() * 20));
      }
      if (myBoard[cherryX][cherryY] == myBoard[snakeX][snakeY]) {
        cherryX = Math.floor((Math.random() * 20));
        cherryY = Math.floor((Math.random() * 20));
      }
      if (myBoard[cherryX][cherryY] == myBoard[sharkX][sharkY]) {
        cherryX = Math.floor((Math.random() * 20));
        cherryY = Math.floor((Math.random() * 20));
      }
      if (myBoard[cherryX][cherryY] == myBoard[monkeyX][monkeyY]) {
        cherryX = Math.floor((Math.random() * 20));
        cherryY = Math.floor((Math.random() * 20));
      }
      for (var objectOfMine of minePositions) {
        if (myBoard[cherryX][cherryY] == myBoard[objectOfMine.xPos][objectOfMine.yPos]) {
          cherryX = Math.floor((Math.random() * 20));
          cherryY = Math.floor((Math.random() * 20));
        }
      }
      for (var bananobject of bananaPositions) {
        if (myBoard[cherryX][cherryY] == myBoard[bananobject.xPos][bananobject.yPos]) {
          cherryX = Math.floor((Math.random() * 20));
          cherryY = Math.floor((Math.random() * 20));
        }
      }

      //ew. everything about this is... ew. but it works so
      myBoard[cherryX][cherryY] = energy;
      cherryTLEY = cherryY - 2;
      cherryTREX = cherryX + 2;
      cherryBREY = cherryY + 2;
      cherryBLEX = cherryX - 2;
      cherryTLXc = cherryX - 2;
      cherryTLXm2 = cherryX - 1;
      cherryTLTRX = cherryX;
      cherryTRXm1 = cherryX + 1;
      cherryTRYc = cherryY - 2;
      cherryTRYm2 = cherryY - 1;
      cherryTRBRY = cherryY;
      cherryBRYm1 = cherryY + 1;
      cherryBRXc = cherryX + 2;
      cherryBRXm2 = cherryX + 1;
      cherryBRBLX = cherryX;
      cherryBLXm1 = cherryX - 1;
      cherryBLYc = cherryY + 2;
      cherryBLYm2 = cherryY + 1;
      cherryBLTLY = cherryY;
      cherryTLYm1 = cherryY - 1;

      if (cherryX <= 1 || cherryX >= 18 || cherryY <= 1 || cherryY >= 18) {
        myBoard[crocX][crocY] = croc;
      } else {

        //top left side
        if (moveAmtTL == 4) {
          if (myBoard[crocX][crocY] != myBoard[cherryTLXc][cherryTLEY]) {
            myBoard[crocX][crocY] = blank;
            crocX = cherryTLXc;
            crocY = cherryTLEY;
            myBoard[crocX][crocY] = croc;
          }
        }
        if (moveAmtTL == 3) {
          if (myBoard[crocX][crocY] != myBoard[cherryTLXm2][cherryTLEY]) {
            myBoard[crocX][crocY] = blank;
            crocX = cherryTLXm2;
            crocY = cherryTLEY;
            myBoard[crocX][crocY] = croc;
          }
        }
        if (moveAmtTL == 2) {
          if (myBoard[crocX][crocY] != myBoard[cherryTLTRX][cherryTLEY]) {
            myBoard[crocX][crocY] = blank;
            crocX = cherryTLTRX;
            crocY = cherryTLEY;
            myBoard[crocX][crocY] = croc;
          }
        }
        if (moveAmtTL == 1) {
          if (myBoard[crocX][crocY] != myBoard[cherryTRXm1][cherryTLEY]) {
            myBoard[crocX][crocY] = blank;
            crocX = cherryTRXm1;
            crocY = cherryTLEY;
            myBoard[crocX][crocY] = croc;
          }
        }
        //top right side
        if (moveAmtTL == 0 && moveAmtTR == 4) {
          if (myBoard[crocX][crocY] != myBoard[cherryTREX][cherryTRYc]) {
            myBoard[crocX][crocY] = blank;
            crocX = cherryTREX;
            crocY = cherryTRYc;
            myBoard[crocX][crocY] = croc;
          }
        }
        if (moveAmtTL == 0 && moveAmtTR == 3) {
          if (myBoard[crocX][crocY] != myBoard[cherryTREX][cherryTRYm2]) {
            myBoard[crocX][crocY] = blank;
            crocX = cherryTREX;
            crocY = cherryTRYm2;
            myBoard[crocX][crocY] = croc;
          }
        }
        if (moveAmtTL == 0 && moveAmtTR == 2) {
          if (myBoard[crocX][crocY] != myBoard[cherryTREX][cherryTRBRY]) {
            myBoard[crocX][crocY] = blank;
            crocX = cherryTREX;
            crocY = cherryTRBRY;
            myBoard[crocX][crocY] = croc;
          }
        }
        if (moveAmtTL == 0 && moveAmtTR == 1) {
          if (myBoard[crocX][crocY] != myBoard[cherryTREX][cherryBRYm1]) {
            myBoard[crocX][crocY] = blank;
            crocX = cherryTREX;
            crocY = cherryBRYm1;
            myBoard[crocX][crocY] = croc;
          }
        }
        //bottom right side
        if (moveAmtTL == 0 && moveAmtTR == 0 && moveAmtBR == 4) {
          if (myBoard[crocX][crocY] != myBoard[cherryBRXc][cherryBREY]) {
            myBoard[crocX][crocY] = blank;
            crocX = cherryBRXc;
            crocY = cherryBREY;
            myBoard[crocX][crocY] = croc;
          }
        }
        if (moveAmtTL == 0 && moveAmtTR == 0 && moveAmtBR == 3) {
          if (myBoard[crocX][crocY] != myBoard[cherryBRXm2][cherryBREY]) {
            myBoard[crocX][crocY] = blank;
            crocX = cherryBRXm2;
            crocY = cherryBREY;
            myBoard[crocX][crocY] = croc;
          }
        }
        if (moveAmtTL == 0 && moveAmtTR == 0 && moveAmtBR == 2) {
          if (myBoard[crocX][crocY] != myBoard[cherryBRBLX][cherryBREY]) {
            myBoard[crocX][crocY] = blank;
            crocX = cherryBRBLX;
            crocY = cherryBREY;
            myBoard[crocX][crocY] = croc;
          }
        }
        if (moveAmtTL == 0 && moveAmtTR == 0 && moveAmtBR == 1) {
          if (myBoard[crocX][crocY] != myBoard[cherryBLXm1][cherryBREY]) {
            myBoard[crocX][crocY] = blank;
            crocX = cherryBLXm1;
            crocY = cherryBREY;
            myBoard[crocX][crocY] = croc;
          }
        }
        //bottom left side
        if (moveAmtTL == 0 && moveAmtTR == 0 && moveAmtBR == 0 && moveAmtBL == 4) {
          if (myBoard[crocX][crocY] != myBoard[cherryBLEX][cherryBLYc]) {
            myBoard[crocX][crocY] = blank;
            crocX = cherryBLEX;
            crocY = cherryBLYc;
            myBoard[crocX][crocY] = croc;
          }
        }
        if (moveAmtTL == 0 && moveAmtTR == 0 && moveAmtBR == 0 && moveAmtBL == 3) {
          if (myBoard[crocX][crocY] != myBoard[cherryBLEX][cherryBLYm2]) {
            myBoard[crocX][crocY] = blank;
            crocX = cherryBLEX;
            crocY = cherryBLYm2;
            myBoard[crocX][crocY] = croc;
          }
        }
        if (moveAmtTL == 0 && moveAmtTR == 0 && moveAmtBR == 0 && moveAmtBL == 2) {
          if (myBoard[crocX][crocY] != myBoard[cherryBLEX][cherryBLTLY]) {
            myBoard[crocX][crocY] = blank;
            crocX = cherryBLEX;
            crocY = cherryBLTLY;
            myBoard[crocX][crocY] = croc;
          }
        }
        if (moveAmtTL == 0 && moveAmtTR == 0 && moveAmtBR == 0 && moveAmtBL == 1) {
          if (myBoard[crocX][crocY] != myBoard[cherryBLEX][cherryTLYm1]) {
            myBoard[crocX][crocY] = blank;
            crocX = cherryBLEX;
            crocY = cherryTLYm1;
            myBoard[crocX][crocY] = croc;
          }
        }
      }
    }


    get("score").innerHTML = "Score: " + score;
    get("lives").innerHTML = " Lives: " + lives;
  }


  if (myBoard[spiderX][spiderY] == myBoard[myCharacterX][myCharacterY]) {
    lives--;
    get("lives").innerHTML = " Lives: " + lives;
  }
  if (myBoard[sharkX][sharkY] == myBoard[myCharacterX][myCharacterY]) {
    lives--;
    get("lives").innerHTML = " Lives: " + lives;
  }
  if (myBoard[shadowX][shadowY] == myBoard[myCharacterX][myCharacterY]) {
    lives--;
    get("lives").innerHTML = " Lives: " + lives;
  }
  if (myBoard[snakeX][snakeY] == myBoard[myCharacterX][myCharacterY]) {
    lives--;
    get("lives").innerHTML = " Lives: " + lives;
  }
  if (myBoard[monkeyX][monkeyY] == myBoard[myCharacterX][myCharacterY]) {
    lives--;
    get("lives").innerHTML = " Lives: " + lives;
  }
  for (var mineObj of minePositions) {
    if (myBoard[myCharacterX][myCharacterY] == myBoard[mineObj.xPos][mineObj.yPos]) {
      lives -= mineObj.damage;
      get("lives").innerHTML = " Lives: " + lives;
      break;
    }
  }
  for (var bananaObj of bananaPositions) {
    myBoard[bananaObj.xPos][bananaObj.yPos] = bananaObj.img;
    if (myBoard[myCharacterX][myCharacterY] == myBoard[bananaObj.xPos][bananaObj.yPos]) {
      lives -= bananaObj.damage;
      get("lives").innerHTML = " Lives: " + lives;
      break;
    }
  }
  if (lives == 0) {
    ded();
  }
  stepCount--;
});
displayBoard();

function pulsingLifeColor() {
  if (lives == 2) {
    if (dontKnowSetTimeoutLol == 0) {
      get("lives").style.color = "orange";
      dontKnowSetTimeoutLol = 1;
    }
    else if (dontKnowSetTimeoutLol == 1) {
      get("lives").style.color = "yellow";
      dontKnowSetTimeoutLol = 0;
    }
  }
  if (lives == 1) {
    if (dontKnowSetTimeoutLol == 0) {
      get("lives").style.color = "red";
      dontKnowSetTimeoutLol = 1;
    }
    else if (dontKnowSetTimeoutLol == 1) {
      get("lives").style.color = "white";
      dontKnowSetTimeoutLol = 0;
    }

  }

}

var jeezJustWORK = 0;
//snake
function snakeMovement() {
  if (score >= 1000) {
    var snake1stMove = Math.floor((Math.random() * 4) + 1);
    var snake2ndMove = Math.floor((Math.random() * 4) + 1);
    myBoard[snakeX][snakeY] = bee;
    switch (snake1stMove) {
      case 1:
        if (snakeY == 0 || snakeY == 1) {
          snake1stMove = 2;
          snake2ndMove = 2;
        } else {
          myBoard[snakeX][snakeY] = blank;
          snakeY--;
          myBoard[snakeX][snakeY] = bee;
        }
        break;
      case 2:
        if (snakeY == 19 || snakeY == 18) {
          snake1stMove = 1;
          snake2ndMove = 1;
        } else {
          myBoard[snakeX][snakeY] = blank;
          snakeY++;
          myBoard[snakeX][snakeY] = bee;
        }
        break;
      case 3:
        if (snakeX == 0 || snakeX == 1) {
          snake1stMove = 4;
          snake2ndMove = 4;
        } else {
          myBoard[snakeX][snakeY] = blank;
          snakeX--;
          myBoard[snakeX][snakeY] = bee;
        }
        break;
      case 4:
        if (snakeX == 19 || snakeX == 18) {
          snake1stMove = 3;
          snake2ndMove = 3;
        } else {
          myBoard[snakeX][snakeY] = blank;
          snakeX++;
          myBoard[snakeX][snakeY] = bee;
        }
        break;
    }
    switch (snakeY) {
      case 1:
      case 0:
        snake1stMove = 2;
        snake2ndMove = 2;
        break;
      case 19:
      case 18:
        snake1stMove = 1;
        snake2ndMove = 1;
        break;
    }
    switch (snakeX) {
      case 1:
      case 0:
        snake1stMove = 4;
        snake2ndMove = 4;
        break;
      case 19:
      case 18:
        snake1stMove = 3;
        snake2ndMove = 3;
        break;
    }
    switch (snake2ndMove) {
      case 1:
        myBoard[snakeX][snakeY] = blank;
        snakeY -= 2;
        myBoard[snakeX][snakeY] = bee;
        break;
      case 2:
        myBoard[snakeX][snakeY] = blank;
        snakeY += 2;
        myBoard[snakeX][snakeY] = bee;
        break;
      case 3:
        myBoard[snakeX][snakeY] = blank;
        snakeX -= 2;
        myBoard[snakeX][snakeY] = bee;
        break;
      case 4:
        myBoard[snakeX][snakeY] = blank;
        snakeX += 2;
        myBoard[snakeX][snakeY] = bee;
        break;
    }
  }
}
setInterval(snakeMovement, 750);

//shadow
var mineCap = 0;
var moveyBoi = setInterval(shadowMovement, 500);
let minePositions = [];

function shadowMovement() {
  var mine = new Mine(shadowX, shadowY, 1, "🌑");
  if (score >= 3000) {
    myBoard[mine.xPos][mine.yPos] = mine.img;
    minePositions.push(mine);
    shadowX = Math.floor((Math.random() * 20));
    shadowY = Math.floor((Math.random() * 20));
    if (myBoard[shadowX][shadowY] == myBoard[cherryX][cherryY]) {
      shadowX = Math.floor((Math.random() * 20));
      shadowY = Math.floor((Math.random() * 20));
    }
    myBoard[shadowX][shadowY] = moon;
    mineCap++;
  }

  if (lives < 0) {
    lives = 0;
    get("lives").innerHTML = " Lives: " + lives;
  }
  if (mineCap == 50) {
    clearInterval(moveyBoi);
  }
}
var theBrokenCounter = 0;

//croc
setInterval(crocMovement, 40);

var initPulse = setInterval(pulsingLifeColor, pulseSpeed);

function crocMovement() {

  if (score >= 2000) {
    if (score >= 10000) {
      if (theBrokenCounter == 0) {
        theBrokenCounter = 1;
        var thisMAYbeBroken = setInterval(shadowMovement, 250);
      }
    }
    if (mineCap == 300) {
      clearInterval(thisMAYbeBroken);
    }

    if (jeezJustWORK == 0) {
      if (lives == 1) {
        clearInterval(initPulse);
        let pulseSpeed = 250;
        setInterval(pulsingLifeColor, pulseSpeed);
        jeezJustWORK = 1;
      }
    }
    if (lives > 0) {
      myBoard[myCharacterX][myCharacterY] = player1;
      if (moveAmtTL == 0 && moveAmtTR == 0 && moveAmtBR == 0 && moveAmtBL == 0) {
        moveAmtTL = 4;
        moveAmtTR = 4;
        moveAmtBR = 4;
        moveAmtBL = 4;
      }

      if (moveAmtTL > 0) {
        myBoard[crocX][crocY] = blank;
        crocX++;
        myBoard[crocX][crocY] = croc;
        moveAmtTL--;

      } else if (moveAmtTR > 0) {
        myBoard[crocX][crocY] = blank;
        crocY++;
        myBoard[crocX][crocY] = croc;
        moveAmtTR--;

      } else if (moveAmtBR > 0) {
        myBoard[crocX][crocY] = blank;
        crocX--;
        myBoard[crocX][crocY] = croc;
        moveAmtBR--;

      } else if (moveAmtBL > 0) {
        myBoard[crocX][crocY] = blank;
        crocY--;
        myBoard[crocX][crocY] = croc;
        moveAmtBL--;
      }

      if (myBoard[crocX][crocY] == myBoard[myCharacterX][myCharacterY]) {
        lives--;
        get("lives").innerHTML = " Lives: " + lives;
      }

    }
    myBoard[crocX][crocY] = croc;
  }
  displayBoard();
}
var blinker = 0;
var bananaPositions = [];
function monkeyMovement() {
  if (score >= 5000) {
    if (stepCount <= 0) {
      var midBanana = new Mine(monkeyX, monkeyY, 1, banana);
      var tlBanana = new Mine(monkeyX - 1, monkeyY - 1, 1, banana);
      var trBanana = new Mine(monkeyX + 1, monkeyY - 1, 1, banana);
      var blBanana = new Mine(monkeyX - 1, monkeyY + 1, 1, banana);
      var brBanana = new Mine(monkeyX + 1, monkeyY + 1, 1, banana);
      bananaPositions.push(midBanana, tlBanana, trBanana, blBanana, brBanana);
      if (blinker == 0) {
        blinker = 1;
        myBoard[tlBanana.xPos][tlBanana.yPos] = tlBanana.img;
        myBoard[trBanana.xPos][trBanana.yPos] = trBanana.img;
        myBoard[blBanana.xPos][blBanana.yPos] = blBanana.img;
        myBoard[brBanana.xPos][brBanana.yPos] = brBanana.img;
      }
      else if (blinker == 1) {
        blinker = 0;
        if (score >= 7500) {
          stepCount = 10;
        }
        else {
          stepCount = 20;
        }

        myBoard[monkeyX][monkeyY] = midBanana.img;
        monkeyX = Math.floor(Math.random() * 18) + 1;
        monkeyY = Math.floor(Math.random() * 18) + 1;
        if (myBoard[monkeyX][monkeyY] == myBoard[cherryX][cherryY]) {
          monkeyX = Math.floor(Math.random() * 18) + 1;
          monkeyY = Math.floor(Math.random() * 18) + 1;
        }
        for (objectOfBanana of bananaPositions) {
          if (myBoard[monkeyX][monkeyY] == myBoard[objectOfBanana.xPos][objectOfBanana.yPos]) {
            monkeyX = Math.floor(Math.random() * 18) + 1;
            monkeyY = Math.floor(Math.random() * 18) + 1;
          }
        }
        for (theMines of minePositions) {
          if (myBoard[monkeyX][monkeyY] == myBoard[theMines.xPos][theMines.yPos]) {
            monkeyX = Math.floor(Math.random() * 18) + 1;
            monkeyY = Math.floor(Math.random() * 18) + 1;
          }
        }
        myBoard[monkeyX][monkeyY] = monkey;
      }
    }
    myBoard[monkeyX][monkeyY] = monkey;
    displayBoard();
  }
}
setInterval(monkeyMovement, 450);

function cooldownsAndRespawns() {
  myBoard[crocX][crocY] = croc;
  myBoard[sharkX][sharkY] = shark;
  myBoard[shadowX][shadowY] = moon;
  myBoard[snakeX][snakeY] = bee;
  myBoard[monkeyX][monkeyY] = monkey;
  for (bahnananaOhBeeJay of bananaPositions) {
    myBoard[bahnananaOhBeeJay.xPos][bahnananaOhBeeJay.yPos] = bahnananaOhBeeJay.img;
  }
  for (meenayOhBeeJay of minePositions) {
    myBoard[meenayOhBeeJay.xPos][meenayOhBeeJay.yPos] = meenayOhBeeJay.img;
  } myBoard[cherryX][cherryY] = energy;
}

setInterval(cooldownsAndRespawns, 1);
