const counterBTC = document.querySelector("#result");
const btn = document.querySelector("#btn");
const btn2 = document.querySelector("#btn2");
const btn3 = document.querySelector("#btn3");
const btn4 = document.querySelector("#btn4");
const min = document.querySelector("#minutes");
const sec = document.querySelector("#seconds");
const curentLvl = document.querySelector("#lvl");

const dataBase = {
  allBTC: 0,
  timer: 0,
  incomingBTC: 1,
  upgradePrice: 5,
  upgradePrice2: 10,
  lvl: 0
};

const upgrade2 = {
    upgradePrice: 20,
    incomingBTC: 1,
};

function maining() {
  dataBase.allBTC += dataBase.incomingBTC;
  counterBTC.innerHTML = `${dataBase.allBTC}`;
}

function mainingTimer() {
  let minutes = Math.floor((dataBase.timer % 3600) / 60);
  let seconds = Math.floor(dataBase.timer % 60);

  let displayMinutes = minutes < 10 ? "0" + minutes : minutes;
  let displaySeconds = seconds < 10 ? "0" + seconds : seconds;

  dataBase.timer++;

  min.innerHTML = `${displayMinutes}`;
  sec.innerHTML = `${displaySeconds}`;
}

function mainingUpdate() {
  if (dataBase.allBTC > dataBase.upgradePrice && dataBase.lvl == 0) {
    dataBase.incomingBTC += 1,
      btn3.style.backgroundColor = "darkorange",
      btn3.innerHTML = "Next UpGrade",
      curentLvl.innerHTML = `${dataBase.lvl += 1}`,
    dataBase.allBTC -= dataBase.upgradePrice;
    return counterBTC.innerHTML = `${dataBase.allBTC}`;
  } else {
    return counterBTC.innerHTML = `${dataBase.allBTC}`;
  }
}

function mainingUpdate2() {
  if (dataBase.allBTC > dataBase.upgradePrice2 && dataBase.lvl == 1) {
    dataBase.incomingBTC += 1,
    btn3.style.backgroundColor = "blue",
    btn3.innerHTML = "Next UpGrade2",
    curentLvl.innerHTML = `${dataBase.lvl += 1}`,
    dataBase.allBTC -= dataBase.upgradePrice2;
    return counterBTC.innerHTML = `${dataBase.allBTC}`;
  } else {
    return counterBTC.innerHTML = `${dataBase.allBTC}`;
  }
}

function mainingUpgrate3 () {

}

btn.addEventListener("click", () => {
  getMaining = setInterval(maining, 2000);
  getTimer = setInterval(mainingTimer, 1000);
  btn.disabled = true;
});

btn2.addEventListener("click", () => {
  clearInterval(getMaining);
  clearInterval(getTimer);

  btn3.disabled = false;
  btn2.disabled = false;
  btn.disabled = false;
});

btn3.addEventListener("click", () => {
  mainingUpdate();
  mainingUpdate2();
});

// btn3.addEventListener ('click', mainingUpdate2);

//                        () => {
//   mainingUpdate ()
//    //   getUpdate = setInterval(mainingUpdate, 1000);
//    //   getTimer = setInterval(mainingTimer, 1000);
//    // btn.disabled = true;
// });

// const promise = new Promise ((resolve, reject) => {
//     setTimeout (() => {
//         resolve('Sucsess');
//     }, 2000)
// })

