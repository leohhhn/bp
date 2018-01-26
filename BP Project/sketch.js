var cols = 5;
var rows = 3;
const BOX_WIDTH = 100;
const BOX_HEIGHT = 120;
var x = BOX_WIDTH;
var y = 0;
var n = 0;
var boxes;
var base = 10;
var rNums;
var brojevi;
var znak;

function setup() {
  // prebuilt function that executes once

  var cnv = createCanvas((cols + 1) * BOX_WIDTH + 10, rows * BOX_HEIGHT + 10);
  cnv.position(screen.width / 5, 200);
  boxes = [];
  for (let i = 0; i < rows; i++) {
    boxes[i] = [];
    for (let j = 0; j < cols; j++) {
      if (i < rows - 1) {
        boxes[i][j] = new Box(x + 2 + j * BOX_WIDTH, y + 2 + i * BOX_HEIGHT, n, true);
      } else {
        boxes[i][j] = new Box(x + 2 + j * BOX_WIDTH, y + 2 + i * BOX_HEIGHT, n);
        //    boxes[i][j] = new Box(x + 2 + j * BOX_WIDTH, y + 2 + i * BOX_HEIGHT, n);
      }
    }
  }
  setNumbers();
  strokeWeight(3);
  znak = new Box(x + 2 - BOX_WIDTH, y + 2 + BOX_HEIGHT * (rows - 2), "+", false);
  znak.show();

}

function draw() {
  // prebuilt function that loops while the window is open
  //  background(0, 102, 153);
  //  image(img, 0, 0);
  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      strokeWeight(3);
      boxes[i][j].show();
    }
  }
  znak.show();
  underline();
}

function underline() {
  strokeWeight(6);
  line(boxes[rows - 1][0].x + 2,
    boxes[rows - 1][0].y + 2,
    boxes[rows - 1][cols - 1].x + BOX_WIDTH - 1,
    boxes[rows - 1][cols - 1].y + 2);
  stroke(0, 0, 0);
  strokeWeight(3);
}

function resetN() {
  // resets all user input back to the starting values
  boxes[rows - 1].forEach(function(b) {
    b.n = 0;
    b.show();
  });
  document.getElementById('Base').value = "10";
  base = 10;
  setNumbers();
  underline();
}

function flashBG(rorw) {
  // flashing background when correct or wrong, rorw - right or wrong
  if (rorw) {
    document.body.style.background = color(0, 255, 0);
    setTimeout(function() {
      document.body.style.background = color(0, 102, 153);
    }, 600);
  } else {
    document.body.style.background = color(204, 0, 0);
    setTimeout(function() {
      document.body.style.background = color(0, 102, 153);
    }, 600);
  }
}

function calculate() {
  // calculates the result depending on the operation requesed
  let z = 0;
  let takenNum = 0;
  let rez = 0;
  let rorw = false;

  if (znak.n === "+") {
    for (let i = 0; i < brojevi.length; i++) {
      rez += brojevi[i];
    }
  }

  if (znak.n === "-") {
    rez = brojevi[0];
    for (let i = 1; i < brojevi.length; i++) {
      rez -= brojevi[i];
    }
  }

  for (let i = cols - 1; i >= 0; i--) {
    takenNum += boxes[rows - 1][i].n * Math.pow(base, z);
    z++;
  }

  if (rez == takenNum) {
    //  alert("Good job! Wanna try again?");
    setNumbers();
    rorw = true;
    flashBG(rorw);
  } else {
    //  alert("Try again!");
    rorw = false;
    flashBG(rorw);
  }
}

function setNumbers() {
  // generates random numbers and draws them into boxes
  brojevi = [];
  if (base <= 10) {
    boxes.forEach(function(row, i) {
      if (i === rows - 1) {
        return;
      }
      let broj = 0;
      while (broj === 0) {
        broj = Math.floor(Math.random() * Math.pow(base, cols - 1));
      }
      brojevi.push(broj);
    });
    brojevi.sort((a, b) => b - a);
    brojevi.forEach(function(broj, i) {
      const rNum = broj.toString(base).padStart(cols, 0).split('').map(c => Number(c));
      boxes[i].forEach(function(box, j) {
        box.n = rNum[j];
        box.show();
      });
    });

    boxes[rows - 1].forEach(function(b) {
      b.n = 0;
      b.show();
    });
  } else {
    alert("oops not supported yet");
    base = 10;
    document.getElementById('Base').value = "10";
  }
}

function setBase() {
  // changes the base in which the numbers are calculated, set etc.
  if (document.getElementById('Base').value != '') {
    base = document.getElementById('Base').value;
    if (base == 1) {
      alert("Base can't be 1!");
      base = 10;
      document.getElementById('Base').value = "";
    } else {
      boxes[rows - 1].forEach(function(b) {
        b.n = 0;
        b.show();
      });
    }
    setNumbers();
  } else {
    document.getElementById('Base').value = "10";
  }
}

function mousePressed() {
  // prebuilt mouse event function
  // checks if the user clicked a box and changes
  // the number depending on the current value
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (!boxes[i][j].notype) {
        if (mouseX > boxes[i][j].x && mouseX < boxes[i][j].x + BOX_WIDTH &&
          mouseY > boxes[i][j].y && mouseY < boxes[i][j].y + BOX_HEIGHT) {
          if (boxes[i][j].n == base - 1)
            boxes[i][j].n = 0;
          else
            boxes[i][j].n++;
        }
      }
    }
  }

  // changing the operation
  if (mouseX > znak.x && mouseX < znak.x + BOX_WIDTH &&
    mouseY > znak.y && mouseY < znak.y + BOX_HEIGHT) {
    if (znak.n == "+")
      znak.n = "-";
    else
      znak.n = "+";
  }
}

function onload() {
  document.getElementById('Reset').addEventListener('click', resetN);
  document.getElementById('Check').addEventListener('click', calculate);
  document.getElementById('SetBase').addEventListener('click', setBase);
  document.getElementById('nrn').addEventListener('click', setNumbers);
}

window.addEventListener('load', onload);


// function make2DArray(r, c) {
//   var arr = new Array(r);
//   for (let i = 0; i < r; i++)
//     for (let j = 0; j < c; j++)
//       arr[i] = new Array(c);
//   return arr;
//
// POHVALE ZA OVO DOLE
// function setNumbers() {
//
//   rNums = [];
//   for (let i = 0; i < rows - 1; i++) {
//     var r = Math.floor(Math.random() * Math.pow(10, cols));
//     rNums.push(r);
//   }
//
//   for (let i = 0; i < rows - 1; i++) {
//     for (let j = 0; j < rNums.length; j++) {
//       var fnum = [];
//       while (rNums[j] > 0) {
//         let temp;
//         temp = rNums[j] % 10;
//         fnum.unshift(temp);
//         rNums[j] / 10;
//       }
//       for (let k = 0; k < cols; k++) {
//         boxes[i][j].n = fnum[k];
//         boxes[i][j].show();
//       }
//     }
//   }
// }
