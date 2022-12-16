let stat;
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

let divs = document.getElementsByClassName("square"); // количество созданных дивок

document.querySelector(".userY").addEventListener("keyup", function () {
  this.value = this.value.replace(/[^\d]/g, "");
}); // проверка инпута на ввод только цифр

document.querySelector(".userX").addEventListener("keyup", function () {
  this.value = this.value.replace(/[^\d]/g, "");
}); // проверка инпута на ввод только цифр

function height() {
  // высота Х
  let height = document.createElement("div"); // высота
  height.className = "string";
  height.innerHTML = "";
  table.append(height);
}

function width() {
  // ширина У
  let width = document.createElement("div"); // ширины
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
    // console.log(maxSq + " maxSq");
  } else if (stat == true) {
    alert("Вы уже играете");
  } else if (userY.value <= 0 || userX.value <= 0) {
    alert("Введите второе число");
  } else {
    alert("Введите число меньше " + `${maxSq}`);
  }
}

function makeMazee() {
  // основная функция создание лабиринта
  stat = true;
  userX = document.getElementById("userX").value; // высота
  userY = document.getElementById("userY").value; // ширина

  let numX = Number(userX); //числа полученные из инпутов
  let numY = Number(userY);
  let numS; //Рандомное число для стен
  let numV; // Рандомное число для потолков

  if (screen.width <= 420) {
    let keyboard = document.createElement("div"); // создание главного героя
    keyboard.className = "keyboard";
    keyboard.classList.add("keyboard");
    keyboard.innerHTML = "";
    bottom.append(keyboard); // стартовая клетка для главного героя
    // keyboard.classList.add("keyboard");
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
  // console.log(numX + " NumX");
  // console.log(numY + " NumY");

  for (m = 0; m < numX; m++) {
    // создает в tableBody square и string перебираем высоту
    for (i = 0; i < numY; i++) {
      // перебираем ширину
      width(); // запускаем рисовку ширины
    }
    height(); //рисовка высоты
  }

  // let gg = document.createElement("div"); // создание главного героя
  // gg.className = "gg";
  // gg.id = "gg";
  // gg.style.left = "0px";
  // gg.style.top = "0px";
  // gg.innerHTML ='' ;

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
  console.log(shagi + " shagi");

  arr = [];

  for (k = 0; k < maxArrLength; k++) {
    arr.push(k);
  }
  console.log(arr + " arr");

  Array.prototype.diff = function (a) {
    return this.filter(function (i) {
      return a.indexOf(i) < 0;
    });
  };

  let walls = arr.diff(shagi);
  console.log(walls);

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
      console.log(stenaX);
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
  //отслеживает положение последней клетки
  if (x == (userY - 1) * step && y == (userX - 1) * step) {
    console.log("FINISH");
    gg.setAttribute("src", "images/finish.jpg");
    table.classList.add("win");

    setTimeout(() => {
      alert("Победа!");
      location.reload();
    }, 1500);
  }
}

function newGame() {
  location.reload();
}

window.onkeydown = function move() {
  stenaX; //стены
  stenaY;
  verhX; //потолки
  verhY;

  let GG = document.getElementById("gg");
  let maxWidth = (userY - 1) * step;
  let maxHeight = (userX - 1) * step;

  if (event.keyCode == 37 && x !== 0) {
    //идем влево
    window.scrollTo(x - step, y);

    document.body.style.overflow = "auto";
    border37();
    x = x - step;
    GG.style.left = x + "px";
    console.log("x = " + x + " y = " + y);
    finish();
  } else if (event.keyCode == 39 && x !== maxWidth) {
    //идем вправо
    window.scrollTo(x - step, y);

    document.body.style.overflow = "auto";
    border39();
    x = x + step;
    GG.style.left = x + "px";
    console.log("x = " + x + " y = " + y);
    finish();
  } else if (event.keyCode == 40 && y !== maxHeight) {
    // идем вниз
    window.scrollTo(x - step, y);
    // window.scrollTo({
    //   top: x,
    //   behavior: "smooth",
    // });
    document.body.style.overflow = "auto";
    border40();
    y = y + step;
    GG.style.top = y + "px";
    console.log("x = " + x + " y = " + y);
    finish();
    // console.log(y);
  } else if (event.keyCode == 38 && y !== 0) {
    // идем вверх
    window.scrollTo(x - step, y);

    document.body.style.overflow = "auto";
    border38();
    y = y - step;
    GG.style.top = y + "px";
    console.log("x = " + x + " y = " + y);
    finish();
  }

  function border37() {
    //стена для стрелки влево
    for (i = 0; i < dlinaS; i++) {
      if (x == stenaX[i] * step && y == stenaY[i] * step) {
        console.log("Стена слева" + stenaX[i] + " " + stenaY[i]);
        x = x + step;
        document.body.style.overflow = "hidden";
      }
    }
  }

  function border39() {
    //стена для стрелки вправо
    for (i = 0; i < dlinaS; i++) {
      if (x == stenaX[i] * step - step && y == stenaY[i] * step) {
        console.log("Стена справа" + stenaX[i] + " " + stenaY[i]);
        x = x - step;
        document.body.style.overflow = "hidden";
      }
    }
  }

  function border38() {
    // стена для стрелки вверх
    for (i = 0; i < dlinaV; i++) {
      if (x == verhX[i] * step && y == verhY[i] * step) {
        console.log("Потолок наверху" + verhX[i] + " " + verhY[i]);
        y = y + step;
        document.body.style.overflow = "hidden";
      }
    }
  }

  function border40() {
    // стена для стрелки вниз
    for (i = 0; i < dlinaV; i++) {
      if (x == verhX[i] * step && y == verhY[i] * step - step) {
        console.log("Потолок внизу" + verhX[i] + " " + verhY[i]);
        y = y - step;
        document.body.style.overflow = "hidden";
      }
    }
  }
};

bottom.addEventListener("click", () => {
  stenaX; //стены
  stenaY;
  verhX; //потолки
  verhY;

  let GG = document.getElementById("gg");
  let maxWidth = (userY - 1) * step;
  let maxHeight = (userX - 1) * step;
  if (event.target.innerHTML == "←" && x !== 0) {
    //идем влево
    border37();
    x = x - step;
    GG.style.left = x + "px";
    console.log("x = " + x + " y = " + y);
    finish();
  } else if (event.target.innerHTML == "→" && x !== maxWidth) {
    //идем вправо
    border39();
    x = x + step;
    GG.style.left = x + "px";
    console.log("x = " + x + " y = " + y);
    finish();
  } else if (event.target.innerHTML == "↓" && y !== maxHeight) {
    // идем вниз
    border40();
    y = y + step;
    GG.style.top = y + "px";
    console.log("x = " + x + " y = " + y);
    finish();
    // console.log(y);
  } else if (event.target.innerHTML == "↑" && y !== 0) {
    // идем вверх
    border38();
    y = y - step;
    GG.style.top = y + "px";
    console.log("x = " + x + " y = " + y);
    finish();
  }

  function border37() {
    //стена для стрелки влево
    for (i = 0; i < dlinaS; i++) {
      if (x == stenaX[i] * step && y == stenaY[i] * step) {
        console.log("Стена слева" + stenaX[i] + " " + stenaY[i]);
        x = x + step;
      }
    }
  }

  function border39() {
    //стена для стрелки вправо
    for (i = 0; i < dlinaS; i++) {
      if (x == stenaX[i] * step - step && y == stenaY[i] * step) {
        console.log("Стена справа" + stenaX[i] + " " + stenaY[i]);
        x = x - step;
      }
    }
  }

  function border38() {
    // стена для стрелки вверх
    for (i = 0; i < dlinaV; i++) {
      if (x == verhX[i] * step && y == verhY[i] * step) {
        console.log("Потолок наверху" + verhX[i] + " " + verhY[i]);
        y = y + step;
      }
    }
  }

  function border40() {
    // стена для стрелки вниз
    for (i = 0; i < dlinaV; i++) {
      if (x == verhX[i] * step && y == verhY[i] * step - step) {
        console.log("Потолок внизу" + verhX[i] + " " + verhY[i]);
        y = y - step;
        document.body.style.overflow = "hidden";
      }
    }
  }
});

window.onload = () => {
  if (screen.width <= 420) {
    step = 32;
    maxSq = 11;
    userX.placeholder = "Высота лабиринта Max 11";
    userY.placeholder = "Ширина лабиринта Max 11";
    // console.log(userX.value);
  }
};
