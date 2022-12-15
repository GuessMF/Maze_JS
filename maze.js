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
  //console.log(divs);

  // ww = 6;
  // shagi = [0];

  // maxArrLength = 36;
  // for (i = 0; shagi[shagi.length - 1] < 35; i++) {
  //   numm = Math.floor(Math.random() * 4) + 1;
  //   if (numm === 1) {
  //     shagi.push(shagi[shagi.length - 1] + 1);
  //   } else if (numm === 2 && shagi[shagi.length - 1] <= 29) {
  //     shagi.push(shagi[shagi.length - 1] + ww);
  //   } else if (numm === 3 && shagi[shagi.length - 1] >= 1) {
  //     shagi.push(shagi[shagi.length - 1] - 1);
  //   }
  //   //  else if (numm === 4 && shagi[shagi.length - 1] >= ww) {
  //   //   shagi.push(shagi[shagi.length - 1] - ww);
  //   // }
  //   //console.log(numm);
  // }
  // console.log(shagi + " shagi");
  // arr = [];
  // let result;
  // for (k = 0; k < 36; k++) {
  //   arr.push(k);
  //   result = arr.filter(function (elem) {
  //     if (elem !== k) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   });
  // }
  // console.log(arr + "arr");

  // console.log(result + "res");

  // arr.push(k);
  // console.log(shagi);
  // shagi.forEach((elem) => {
  //   for (k = 0; k < 35; k++) {
  //     console.log(k + " k");
  //     console.log(elem + " elem");
  //     elem !== k
  //       ? (divs[k].style.borderLeftColor = "black")
  //       : console.log("чет не то");

  shir = Number(userY);
  shagi = [0];

  maxArrLength = Number(userX) * Number(userY);

  for (i = 0; shagi[shagi.length - 1] < maxArrLength - 1; i++) {
    numm = Math.floor(Math.random() * 4) + 1;
    // shagi.push(i);

    if (numm === 1 && shagi[shagi.length - 1] + 1 !== maxArrLength) {
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
    //  else if (numm === 4 && shagi[shagi.length - 1] >= ww) {
    //   shagi.push(shagi[shagi.length - 1] - ww);
    // }
    //console.log(numm);
  }
  console.log(shagi + " shagi");

  arr = [];
  console.log(userY + " shirina?");
  for (k = 0; k < maxArrLength; k++) {
    k % shir !== 0 ? arr.push(k) : console.log("ee");
  }
  console.log(arr + " arr");

  Array.prototype.diff = function (a) {
    return this.filter(function (i) {
      return a.indexOf(i) < 0;
    });
  };

  let walls = arr.diff(shagi);
  console.log(walls);
  //рабочее
  // for (n = 0; n < arr.length; n++) {
  //   divs[walls[n]].style.borderLeftColor = "black";
  //   divs[walls[n]].style.borderTopColor = "black";
  // }
  // добавить рандом слева с краю
  for (n = 0; n < arr.length; n++) {
    rand = Math.floor(Math.random() * 4) + 1;
    console.log(rand + " rand");
    if (rand == 2 || rand == 3 || rand == 4) {
      divs[walls[n]].style.borderLeftColor = "black";
      divs[walls[n]].style.borderTopColor = "black";
    }
  }

  console.log(Math.floor(Math.random() * 4) + 1);
  // добавляет лево стены
  //console.log(numS + " NumS");
  // nomerRyada = Math.floor(numS / userY);
  // nomervRyady = numS - nomerRyada * userY;
  // console.log(k + " k ");
  //console.log(elem + " elem");
  // });
  // }
  // console.log(arr + " весь массив");
  // for(n=1; n=)
  // for (n = 1; n < Math.floor(dl); n++) {
  //   numV = Math.floor(Math.random() * dl); // первое рандомное
  //   // numS = Math.floor(Math.random() * dl); // второе рандомное
  //   // numV = n;
  //   // numS = n;
  //   let nomerRyada;
  //   let nomervRyady;

  //   let nomerRyadaVerh;
  //   let nomerVRyadyVerh;
  // }
  // if (numS % userY !== 0 && numS !== userX * userY - 1 && numS % 2 !== 0) {

  // {
  // чтобы не добавлял лишние левые границы
  // }
  // if (
  //   // numV
  //   userY % 2 !== 0 &&
  //   numV > userY &&
  //   numV !== userX * userY - 1 &&
  //   (userY % 2 == 0) == (numV % 2 == 0)
  // ) {
  //для нечетного лабиринта
  // divs[numV].style.borderTopColor = "black";
  // nomerRyadaVerh = Math.floor(numV / userY);
  // nomerVRyadyVerh = numV - nomerRyadaVerh * userY;
  // }

  // if (userY % 2 == 0) {
  //Для четной ширины
  // for (g = 2; g < Number(userY) + 1; g = g + 2) {
  //отсекаем четные строки
  // if (userY % 2 == 0 && numV > userY * (g - 1) && numV < userY * g - 1) {
  // divs[numV].style.borderTopColor = "black";
  // console.log(numV + " numV ");
  // nomerRyadaVerh = Math.floor(numV / userY);
  // nomerVRyadyVerh = numV - nomerRyadaVerh * userY;
  //  }
  // }
  // }
  // console.log(nomerRyada + " Nomer ryada");
  // console.log(nomervRyady + " Nomer v ryady");

  // stenaX.push(nomervRyady); // добавляем в массив номер стены в ряду
  // stenaX = stenaX.filter((n) => {
  //   return n != undefined;
  // });
  // console.log(stenaX);
  // stenaY.push(nomerRyada); //добавляем номер ряда стены
  // stenaY = stenaY.filter((n) => {
  //   return n != undefined;
  // });

  // dlinaS = stenaX.length; // длина массива

  // verhX.push(nomerVRyadyVerh); // добавляем в массив номер потолка в ряду
  // verhX = verhX.filter((n) => {
  //   return n != undefined;
  // });
  // verhY.push(nomerRyadaVerh); // добавляем номер ряда потолка
  // verhY = verhY.filter((n) => {
  //   return n != undefined;
  // });

  // dlinaV = verhX.length;
  // }
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

// ()=>{
//   if()
//   steps % 2 == 0
//   ? (document.body.style.overflow = "hidden")
//   : console.log("0");
// }

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

// function resizeGame() {
//   if ((x !== 0 || y !== 0) && screen.width <= 1280) {
//     newGame();
//   } else if ((x !== 0 || y !== 0) && screen.width >= 1280) {
//     newGame();
//   }
// }
// resizeGame();

// window.addEventListener("resize", (event) => {
//   resize = true;
//   if (screen.width <= 1370) {
//     step = 47;
//     maxSq = 11;
//     document.querySelector(".parent").style.overflow = "scroll";
//   } else if (screen.width >= 1370) {
//     step = 62;
//     maxSq = 20;
//   }
//   resizeGame();
// });

// window.onload = () => {
//   if (screen.width <= 1280) {
//     step = 47;
//     noScroll();
//   } else {
//     maxSq = 20;
//     noScroll();
//   }
// };

window.onload = () => {
  if (screen.width <= 420) {
    step = 32;
    maxSq = 11;
    userX.placeholder = "Высота лабиринта Max 11";
    userY.placeholder = "Ширина лабиринта Max 11";
    // console.log(userX.value);
  }
};
//console.log(steps);

// let ph = document.createElement("img");
// ph.setAttribute("src", "images/github4x.png");
// ph.class = "gg";

// foo = document.querySelector(".footer");
// foo.append(ph);

// function matrixArr(length, width) {
//   let matrix = [
//     [0, 0, 0],
//     [0, 0, 0],
//   ];
//   for (w = 0; w < width; w++) {
//     console.log(width);
//     // matrix.push(w);
//   }
//   for (l = 0; l < length; l++) {
//     console.log(length);
//     // matrix.push(Array(0));
//   }

//   console.log(matrix);
//   // let matrix = [];
//   // matrix.push(Array(3));
//   //console.log(matrix);
//   // console.log(length);
// }
// matrixArr(4, 4);
// // console.log(matrix);

// chetny(ww);
// console.log(shagi);

// shagi.forEach((elem) => {
//   elem !== 6 ? console.log(elem) : console.log("чет не то");
// });

// ww = 6;
// shagi = [0];

// maxArrLength = 36;
// for (i = 0; shagi[shagi.length - 1] < 35; i++) {
//   numm = Math.floor(Math.random() * 4) + 1;
//   if (numm === 1) {
//     shagi.push(shagi[shagi.length - 1] + 1);
//   } else if (numm === 2 && shagi[shagi.length - 1] <= 29) {
//     shagi.push(shagi[shagi.length - 1] + ww);
//   } else if (numm === 3 && shagi[shagi.length - 1] >= 1) {
//     shagi.push(shagi[shagi.length - 1] - 1);
//   }
//   //  else if (numm === 4 && shagi[shagi.length - 1] >= ww) {
//   //   shagi.push(shagi[shagi.length - 1] - ww);
//   // }
//   //console.log(numm);
// }
// console.log(shagi + " shagi");

// arr = [];

// for (k = 0; k < 36; k++) {
//   arr.push(k);
// }
// console.log(arr + " arr");

// Array.prototype.diff = function (a) {
//   return this.filter(function (i) {
//     return a.indexOf(i) < 0;
//   });
// };

// let walls = arr.diff(shagi);
// console.info(walls); // ["some5"]

console.log(Math.floor(Math.random() * 99) + 1);
