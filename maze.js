let stat;
let x = 0; // исходное положение ГГ
let y = 0;
let stenaX = []; // положение в ряду стены
let stenaY = []; // номер ряда стены
let dlinaS; // длина массива со стенами
let step = 62; //длина шага ГГ

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
    userX.value <= 20 &&
    userY.value <= 20 &&
    userY.value > 0 &&
    userX.value > 0
  ) {
    makeMazee();
  } else if (stat == true) {
    alert("Вы уже играете");
  } else if (userY.value <= 0 || userX.value <= 0) {
    alert("Введите второе число");
  } else {
    alert("Введите число меньше 20");
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

  console.log(numX);
  console.log(numY);

  for (m = 0; m < numX; m++) {
    // создает в tableBody square и string перебираем высоту
    for (i = 0; i < numY; i++) {
      // перебираем ширину
      width(); // запускаем рисовку ширины
    }
    height(); //рисовка высоты
  }

  let gg = document.createElement("div"); // создание главного героя
  gg.className = "gg";
  gg.id = "gg";
  gg.style.left = "0px";
  gg.style.top = "0px";
  gg.innerHTML = "";
  divs[0].append(gg); // стартовая клетка для главного героя
  dl = divs.length; //колличество клеток в лабиринте
  dl2 = dl - 1; // последняя кледка в лабиринте для финиша
  divs[dl2].classList.add("finish");
  divs[dl2].innerHTML = "finish";

  for (n = 1; n < Math.floor(dl); n++) {
    numV = Math.floor(Math.random() * dl); // первое рандомное
    numS = Math.floor(Math.random() * dl); // второе рандомное

    let nomerRyada;
    let nomervRyady;

    let nomerRyadaVerh;
    let nomerVRyadyVerh;

    if (numS % userY !== 0 && numS !== userX * userY - 1 && numS % 2 !== 0) {
      // чтобы не добавлял лишние левые границы
      divs[numS].style.borderLeftColor = "black"; // добавляет лево стены
      nomerRyada = Math.floor(numS / userY);
      nomervRyady = numS - nomerRyada * userY;
    }
    if (
      userY % 2 !== 0 &&
      numV > userY &&
      numV !== userX * userY - 1 &&
      (userY % 2 == 0) == (numV % 2 == 0)
    ) {
      //для нечетного лабиринта
      divs[numV].style.borderTopColor = "black";
      nomerRyadaVerh = Math.floor(numV / userY);
      nomerVRyadyVerh = numV - nomerRyadaVerh * userY;
    }

    if (userY % 2 == 0) {
      //Для четной ширины
      for (g = 2; g < Number(userY) + 1; g = g + 2) {
        //отсекаем четные строки
        if (userY % 2 == 0 && numV > userY * (g - 1) && numV < userY * g - 1) {
          divs[numV].style.borderTopColor = "black";
          nomerRyadaVerh = Math.floor(numV / userY);
          nomerVRyadyVerh = numV - nomerRyadaVerh * userY;
        }
      }
    }

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
  divs[dl2].innerHTML = "Finish"; // надпись финиш в последнем диве
}

function finish() {
  //отслеживает положение последней клетки
  if (x == (userY - 1) * step && y == (userX - 1) * step) {
    console.log("FINISH");
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
    border37();
    x = x - step;
    GG.style.left = x + "px";
    console.log("x = " + x + " y = " + y);
    finish();
  } else if (event.keyCode == 39 && x !== maxWidth) {
    //идем вправо
    border39();
    x = x + step;
    GG.style.left = x + "px";
    console.log("x = " + x + " y = " + y);
    finish();
  } else if (event.keyCode == 40 && y !== maxHeight) {
    // идем вниз
    border40();
    y = y + step;
    GG.style.top = y + "px";
    console.log("x = " + x + " y = " + y);
    finish();
    // console.log(y);
  } else if (event.keyCode == 38 && y !== 0) {
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
      }
    }
  }
};

function resizeGame() {
  if ((x !== 0 || y !== 0) && screen.width <= 1280) {
    newGame();
  } else if ((x !== 0 || y !== 0) && screen.width >= 1280) {
    newGame();
  }
}
resizeGame();

window.addEventListener("resize", (event) => {
  resize = true;
  if (screen.width <= 1280) {
    step = 47;
  } else if (screen.width >= 1280) {
    step = 62;
  }
  resizeGame();
});

window.onload = () => {
  if (screen.width <= 1280) {
    step = 47;
  }
};
//отследить положение х и у и при изменении разрешения менять их значения согласно изменению
//проверять значение х и у сет интервалом или при именении разрешения
