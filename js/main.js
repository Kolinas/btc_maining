document.addEventListener('DOMContentLoaded', () => {
    const counterBTC = document.querySelector("#result"), startTaimer = document.querySelector("#btn"), stopTaimer = document.querySelector("#btn2"), currentMinutes = document.querySelector("#minutes"), currenSeconds = document.querySelector("#seconds"), incomingState = document.querySelector("#incoming"), modalAbout = document.querySelector('.modal'), btnModal = document.querySelector('#infbtn'), upgradeList = document.querySelector('[updates]'), buyUpgrade = document.querySelector('#buy-upgrade'), curentUpdates = document.querySelector('#upgrades_information');
    let getMaining;
    let getTimer;
    const upgrades = [
        { id: 1, name: 'Улучшить оперативную память', price: 3, incoming: 0.5, textUpd: 'Память улучшена' },
        { id: 2, name: 'Обновить винду', price: 2, incoming: 0.1, textUpd: 'Винда обновлена до 10 версии' },
        { id: 3, name: 'Установить двойное охлаждение', price: 10, incoming: 0.2, textUpd: 'Установлено 2 кулера' },
        { id: 4, name: 'Разогнать процессор', price: 5, incoming: 0.2, textUpd: 'Процессор разогнан на 10%' },
    ];
    const dataBase = {
        allBTC: 0,
        timer: 0,
        incomingBTC: 0.5,
        maining() {
            dataBase.allBTC += dataBase.incomingBTC;
            counterBTC.innerHTML = `${dataBase.allBTC}`;
            incomingState.innerHTML = `${dataBase.incomingBTC}`;
            renderUpgrade(upgrades);
        },
        setMainingTimer() {
            let minutes = Math.floor((dataBase.timer % 3600) / 60);
            let seconds = Math.floor(dataBase.timer % 60);
            let displayMinutes = minutes < 10 ? "0" + minutes : minutes;
            let displaySeconds = seconds < 10 ? "0" + seconds : seconds;
            dataBase.timer++;
            currentMinutes.innerHTML = `${displayMinutes}`;
            currenSeconds.innerHTML = `${displaySeconds}`;
        },
    };
    const toggleBtnEnabled = (btn, param) => btn.disabled = param;
    function renderUpgrade(upgrades) {
        upgradeList.innerHTML = '';
        if (upgrades.length === 0) {
            upgradeList.innerHTML = `<option>Больше нет улучшений...</option>`;
        }
        upgrades.forEach(el => {
            const acsesUpg = dataBase.allBTC >= el.price ? 'Доступно к покупке' : 'Недоступно к покупке';
            upgradeList.innerHTML += `<option>${el.name} - ${el.price} BTC ${acsesUpg}</option>`;
            console.log(dataBase.allBTC);
        });
    }
    startTaimer.addEventListener("click", () => {
        getMaining = setInterval(dataBase.maining, 2000);
        getTimer = setInterval(dataBase.setMainingTimer, 1000);
        toggleBtnEnabled(startTaimer, true);
    });
    stopTaimer.addEventListener("click", () => {
        clearInterval(getMaining);
        clearInterval(getTimer);
        toggleBtnEnabled(startTaimer, false);
    });
    const textMessage = (text, color) => {
        const mesageText = document.createElement('p');
        mesageText.style.color = color;
        mesageText.textContent = text;
        curentUpdates.append(mesageText);
        toggleBtnEnabled(buyUpgrade, true);
        setTimeout(() => {
            mesageText.remove();
            toggleBtnEnabled(buyUpgrade, false);
        }, 2000);
    };
    const createListUpd = (text, parent) => {
        parent.innerHTML += `<p>${text}</p>`;
    };
    const chekUpdate = (upgrades, currentBTC, index) => {
        const currentUpdt = upgrades.find((el, i) => i === index ? el : null);
        if (currentUpdt.price <= currentBTC) {
            const scoreBTC = currentBTC -= currentUpdt.price;
            upgrades.splice(index, 1);
            return { scoreBTC, currentUpdt };
        }
        textMessage('У Вас не хватает денег на покупку', 'red');
    };
    const buyNewUbgrade = () => {
        const index = upgradeList.options.selectedIndex;
        const newBTC = chekUpdate(upgrades, dataBase.allBTC, index);
        const { price, incoming, textUpd } = newBTC.currentUpdt;
        if (newBTC.scoreBTC !== dataBase.allBTC) {
            dataBase.allBTC -= price;
            dataBase.incomingBTC += incoming;
            createListUpd(textUpd, curentUpdates);
            textMessage('Удачная покупка', 'green');
        }
    };
    buyUpgrade.addEventListener('click', () => {
        buyNewUbgrade();
        renderUpgrade(upgrades);
    });
    renderUpgrade(upgrades);
    btnModal.addEventListener('click', () => {
        modalAbout.classList.toggle('actvive');
    });
});
