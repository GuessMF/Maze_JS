let stat;
const UP = 38;
const DOWN = 40;
const LEFT = 37;
const RIGHT = 39;
let x = 0; // исходное положение ГГ
let y = 0;
let stenaX = []; // положение в ряду стены
let stenaY = []; // номер ряда стены
let dlinaS; // длина массива со стенами
let step = 62; //длина шага ГГ
let steps = 0;
let maxSq = 100;
let verhX = []; // положение в ряду потолка
let verhY = []; // номер ряда потолка
let dlinaV; // длина массива с потолками
let divs = document.getElementsByClassName("square"); // количество созданных дивоconsole.log();

document.querySelector(
  ".reserved"
).innerHTML = `© Sergey Pankov. ${new Date().getFullYear()}  All rigths reserved`;

document.addEventListener("keydown", () => {
  if (event.key === "Enter") {
    makeMaze();
  }
});
document.querySelector(".userY").addEventListener("keyup", function () {
  this.value = this.value.replace(/[^\d]/g, "");
}); // проверка инпута на ввод только цифр

document.querySelector(".userX").addEventListener("keyup", function () {
  this.value = this.value.replace(/[^\d]/g, "");
}); // проверка инпута на ввод только цифр

function height() {
  let height = document.createElement("div"); // высота X
  height.className = "string";
  height.innerHTML = "";
  table.append(height);
}

function width() {
  let width = document.createElement("div"); // ширинa Y
  width.className = "square";
  width.innerHTML = "";
  table.append(width);
}

function makeMaze() {
  if (
    userX.value <= maxSq &&
    userY.value <= maxSq &&
    userY.value > 0 &&
    userX.value > 0
  ) {
    makeMazee();
  } else if (stat == true) {
    newGame();
    makeMazee();
  } else if (userY.value <= 0 || userX.value <= 0) {
    alert("Введите размеры лабиринта");
  }
}

function makeMazee() {
  stat = true;
  userX = document.getElementById("userX").value; // высота
  userY = document.getElementById("userY").value; // ширина
  let numX = Number(userX); //числа полученные из инпутов
  let numY = Number(userY);
  let numS; //Рандомное число для стен
  let numV; // Рандомное число для потолков

  document.querySelector(".parent").style.display = "block";

  if (screen.width <= 420) {
    let keyboard = document.createElement("div"); // создание главного героя
    keyboard.className = "keyboard";
    keyboard.classList.add("keyboard");
    keyboard.innerHTML = "";
    bottom.append(keyboard); // стартовая клетка для главного героя

    let left = document.createElement("button");
    left.className = "left";
    left.innerHTML = "←";
    keyboard.append(left);

    let right = document.createElement("button");
    right.className = "right";
    right.innerHTML = "→";
    keyboard.append(right);

    let up = document.createElement("button");
    up.className = "up";
    up.innerHTML = "↑";
    keyboard.append(up);

    let down = document.createElement("button");
    down.className = "down";
    down.innerHTML = "↓";
    keyboard.append(down);
  }

  for (m = 0; m < numX; m++) {
    for (i = 0; i < numY; i++) {
      width(); // запускаем рисовку ширины
    }
    height(); //рисовка высоты
  }

  let gg = document.createElement("img");
  gg.setAttribute("src", "images/avatar2.png");
  gg.className = "gg";
  gg.id = "gg";
  gg.style.left = "0px";
  gg.style.width = 100;
  gg.style.height = 100;
  gg.style.top = "0px";
  gg.innerHTML = "";

  divs[0].append(gg); // стартовая клетка для главного героя
  dl = divs.length; //колличество клеток в лабиринте
  dl2 = dl - 1; // последняя кледка в лабиринте для финиша
  divs[dl2].classList.add("finish");
  divs[dl2].innerHTML = "finish";
  shir = Number(userY);
  shagi = [0];
  maxArrLength = Number(userX) * Number(userY);

  for (i = 0; shagi[shagi.length - 1] < maxArrLength - 1; i++) {
    numm = Math.floor(Math.random() * 4) + 1;

    if (
      numm === 1 &&
      shagi[shagi.length - 1] + 1 !== maxArrLength &&
      (shagi[shagi.length - 1] + 1) % shir !== 0
    ) {
      shagi.push(shagi[shagi.length - 1] + 1);
    } else if (
      numm === 2 &&
      shagi[shagi.length - 1] <= maxArrLength - shir &&
      shagi[shagi.length - 1] + shir !== maxArrLength
    ) {
      shagi.push(shagi[shagi.length - 1] + shir);
    } else if (
      numm === 3 &&
      shagi[shagi.length - 1] >= 1 &&
      shagi[shagi.length - 1] % shir !== 0 &&
      shagi[shagi.length - 1] - 1 !== maxArrLength
    ) {
      shagi.push(shagi[shagi.length - 1] - 1);
    }
  }
  arr = [];
  for (k = 0; k < maxArrLength; k++) {
    arr.push(k);
  }

  Array.prototype.diff = function (a) {
    return this.filter(function (i) {
      return a.indexOf(i) < 0;
    });
  };

  let walls = arr.diff(shagi);
  for (n = 0; n < arr.length; n++) {
    rand = Math.floor(Math.random() * 4) + 1;

    if (rand == 2 || rand == 3 || rand == 4) {
      divs[walls[n]].style.borderLeftColor = "black";
      divs[walls[n]].style.borderTopColor = "black";
      nomerRyada = Math.floor(walls[n] / userY);
      nomervRyady = walls[n] - nomerRyada * userY;
      nomerRyadaVerh = Math.floor(walls[n] / userY);
      nomerVRyadyVerh = walls[n] - nomerRyadaVerh * userY;
      stenaX.push(nomervRyady); // добавляем в массив номер стены в ряду
      stenaX = stenaX.filter((n) => {
        return n != undefined;
      });
      stenaY.push(nomerRyada); //добавляем номер ряда стены
      stenaY = stenaY.filter((n) => {
        return n != undefined;
      });
      dlinaS = stenaX.length; // длина массива
      verhX.push(nomerVRyadyVerh); // добавляем в массив номер потолка в ряду
      verhX = verhX.filter((n) => {
        return n != undefined;
      });
      verhY.push(nomerRyadaVerh); // добавляем номер ряда потолка
      verhY = verhY.filter((n) => {
        return n != undefined;
      });
      dlinaV = verhX.length;
    }
  }
  divs[dl2].innerHTML = "Finish"; // надпись финиш в последнем диве
}

function finish() {
  if (x == (userY - 1) * step && y == (userX - 1) * step) {
    gg.setAttribute("src", "images/finish.jpg");
    table.classList.add("win");
    setTimeout(() => {
      alert("Победа!");
      newGame();
    }, 1500);
  }
}

function newGame() {
  x = 0;
  y = 0;
  stenaX = [];
  stenaY = [];
  dlinaS = undefined;
  step = 62;
  steps = 0;
  maxSq = 100;
  verhX = [];
  verhY = [];
  dlinaV = undefined;
  topWall = undefined;
  table.innerHTML = "";
  document.querySelector(".parent").style.display = "none";
  table.classList.remove("win");
}

function border37() {
  for (i = 0; i < dlinaS; i++) {
    if ((x == stenaX[i] * step && y == stenaY[i] * step) || x == 0) {
      gg.setAttribute("src", "images/avatar3.png");
      х = х - 0;
      document.body.style.overflow = "hidden";
    }
  }
}

function border39() {
  for (i = 0; i < dlinaS; i++) {
    if (x == stenaX[i] * step - step && y == stenaY[i] * step) {
      gg.setAttribute("src", "images/avatar3.png");
      x = x - step;
      document.body.style.overflow = "hidden";
    }
  }
}

function border38() {
  for (i = 0; i < dlinaV; i++) {
    if (x == verhX[i] * step && y == verhY[i] * step) {
      gg.setAttribute("src", "images/avatar3.png");
      y = у - 0;
      document.body.style.overflow = "hidden";
    }
  }
}

function border40() {
  for (i = 0; i < dlinaV; i++) {
    if (x == verhX[i] * step && y == verhY[i] * step - step) {
      gg.setAttribute("src", "images/avatar3.png");
      y = y - step;
      document.body.style.overflow = "hidden";
    }
  }
}

window.onkeydown = function move() {
  let GG = document.getElementById("gg");
  let maxWidth = (userY - 1) * step;
  let maxHeight = (userX - 1) * step;

  if (event.keyCode == LEFT && x !== 0) {
    window.scrollTo(x - step, y);
    document.body.style.overflow = "auto";
    gg.setAttribute("src", "images/avatar2.png");
    border37();
    x = x - step;
    GG.style.left = x + "px";
    finish();
  } else if (event.keyCode == RIGHT && x !== maxWidth) {
    window.scrollTo(x - step, y);
    document.body.style.overflow = "auto";
    gg.setAttribute("src", "images/avatar2.png");
    border39();
    x = x + step;
    GG.style.left = x + "px";
    finish();
  } else if (event.keyCode == DOWN && y !== maxHeight) {
    window.scrollTo(x - step, y);
    document.body.style.overflow = "auto";
    gg.setAttribute("src", "images/avatar2.png");
    border40();
    y = y + step;
    GG.style.top = y + "px";
    finish();
  } else if (event.keyCode == UP && y !== 0) {
    window.scrollTo(x - step, y);
    document.body.style.overflow = "auto";
    gg.setAttribute("src", "images/avatar2.png");
    border38();
    y = y - step;
    GG.style.top = y + "px";
    finish();
  } else if (event.keyCode == LEFT && x == 0) {
    gg.setAttribute("src", "images/avatar3.png");
  } else if (event.keyCode == RIGHT && x == maxWidth) {
    gg.setAttribute("src", "images/avatar3.png");
  } else if (event.keyCode == DOWN && y == maxHeight) {
    gg.setAttribute("src", "images/avatar3.png");
  } else if (event.keyCode == UP && y == 0) {
    gg.setAttribute("src", "images/avatar3.png");
  }
};

bottom.addEventListener("click", () => {
  let GG = document.getElementById("gg");
  let maxWidth = (userY - 1) * step;
  let maxHeight = (userX - 1) * step;
  if (event.target.innerHTML == "←" && x !== 0) {
    window.scrollTo(x - step, y);
    document.body.style.overflow = "auto";
    gg.setAttribute("src", "images/avatar2.png");
    border37();
    x = x - step;
    GG.style.left = x + "px";
    finish();
  } else if (event.target.innerHTML == "→" && x !== maxWidth) {
    window.scrollTo(x - step, y);
    document.body.style.overflow = "auto";
    gg.setAttribute("src", "images/avatar2.png");
    border39();
    x = x + step;
    GG.style.left = x + "px";
    finish();
  } else if (event.target.innerHTML == "↓" && y !== maxHeight) {
    window.scrollTo(x - step, y);
    document.body.style.overflow = "auto";
    gg.setAttribute("src", "images/avatar2.png");
    border40();
    y = y + step;
    GG.style.top = y + "px";
    finish();
  } else if (event.target.innerHTML == "↑" && y !== 0) {
    window.scrollTo(x - step, y);
    document.body.style.overflow = "auto";
    gg.setAttribute("src", "images/avatar2.png");
    border38();
    y = y - step;
    GG.style.top = y + "px";
    finish();
  }
});

window.onload = () => {
  if (screen.width <= 420) {
    step = 32;
    maxSq = 50;
    userX.placeholder = "Высота лабиринта Max 50 ";
    userY.placeholder = "Ширина лабиринта Max 50 ";
  }
};
