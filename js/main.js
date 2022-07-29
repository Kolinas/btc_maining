document.addEventListener('DOMContentLoaded', function () {
    var counterBTC = document.querySelector("#result"), startTaimer = document.querySelector("#btn"), stopTaimer = document.querySelector("#btn2"), currentMinutes = document.querySelector("#minutes"), currenSeconds = document.querySelector("#seconds"), incomingState = document.querySelector("#incoming"), modalAbout = document.querySelector('.modal'), btnModal = document.querySelector('#infbtn'), upgradeList = document.querySelector('[updates]'), buyUpgrade = document.querySelector('#buy-upgrade'), curentUpdates = document.querySelector('#upgrades_information'), playerBlock = document.querySelector('.player-inform'), playerName = document.querySelector("#player"), setName = document.querySelector('#name'), confirmName = document.querySelector('#confirm');
    var getMaining;
    var getTimer;
    var toggleBtnEnabled = function (btn, param) { return btn.disabled = param; };
    var setPlayerName = function () {
        if (!setName.value) {
            setName.style.color = 'red';
            setName.value = 'Write your name';
            toggleBtnEnabled(confirmName, true);
            setTimeout(function () {
                setName.value = '';
                toggleBtnEnabled(confirmName, false);
            }, 2000);
            return;
        }
        playerName.textContent = setName.value;
        setName.value = '';
        playerBlock.style.justifyContent = 'center';
        confirmName.remove();
        setName.remove();
    };
    confirmName.addEventListener('click', setPlayerName);
    var upgrades = [
        { id: 1, name: 'Улучшить оперативную память', price: 3, incoming: 0.5, textUpd: 'Память улучшена' },
        { id: 2, name: 'Обновить винду', price: 2, incoming: 0.1, textUpd: 'Винда обновлена до 10 версии' },
        { id: 3, name: 'Установить двойное охлаждение', price: 10, incoming: 0.2, textUpd: 'Установлено 2 кулера' },
        { id: 4, name: 'Разогнать процессор', price: 5, incoming: 0.2, textUpd: 'Процессор разогнан на 10%' },
    ];
    var dataBase = {
        allBTC: 0,
        timer: 0,
        incomingBTC: 0.5,
        maining: function () {
            dataBase.allBTC += dataBase.incomingBTC;
            counterBTC.innerHTML = "".concat(dataBase.allBTC.toFixed(1));
            incomingState.innerHTML = "".concat(dataBase.incomingBTC);
            renderUpgrade(upgrades);
        },
        setMainingTimer: function () {
            var minutes = Math.floor((dataBase.timer % 3600) / 60);
            var seconds = Math.floor(dataBase.timer % 60);
            var displayMinutes = minutes < 10 ? "0" + minutes : minutes;
            var displaySeconds = seconds < 10 ? "0" + seconds : seconds;
            dataBase.timer++;
            currentMinutes.innerHTML = "".concat(displayMinutes);
            currenSeconds.innerHTML = "".concat(displaySeconds);
        }
    };
    var textMessage = function (text, color) {
        var mesageText = document.createElement('p');
        mesageText.style.color = color;
        mesageText.textContent = text;
        curentUpdates.append(mesageText);
        toggleBtnEnabled(buyUpgrade, true);
        setTimeout(function () {
            mesageText.remove();
            toggleBtnEnabled(buyUpgrade, false);
        }, 2000);
    };
    function renderUpgrade(upgrades) {
        upgradeList.innerHTML = '';
        if (upgrades.length === 0) {
            upgradeList.innerHTML = "<option>\u0411\u043E\u043B\u044C\u0448\u0435 \u043D\u0435\u0442 \u0443\u043B\u0443\u0447\u0448\u0435\u043D\u0438\u0439...</option>";
        }
        upgrades.forEach(function (el) {
            var acsesUpg = dataBase.allBTC >= el.price ? 'Доступно к покупке' : 'Недоступно к покупке';
            upgradeList.innerHTML += "<option>".concat(el.name, " - ").concat(el.price, " BTC ").concat(acsesUpg, "</option>");
            console.log(dataBase.allBTC);
        });
    }
    startTaimer.addEventListener("click", function () {
        getMaining = setInterval(dataBase.maining, 2000);
        getTimer = setInterval(dataBase.setMainingTimer, 1000);
        toggleBtnEnabled(startTaimer, true);
    });
    stopTaimer.addEventListener("click", function () {
        clearInterval(getMaining);
        clearInterval(getTimer);
        toggleBtnEnabled(startTaimer, false);
    });
    var createListUpd = function (text, parent) {
        parent.innerHTML += "<p>".concat(text, "</p>");
    };
    var chekUpdate = function (upgrades, currentBTC, index) {
        var currentUpdt = upgrades.find(function (el, i) { return i === index ? el : null; });
        if (currentUpdt.price <= currentBTC) {
            var scoreBTC = currentBTC -= currentUpdt.price;
            upgrades.splice(index, 1);
            return { scoreBTC: scoreBTC, currentUpdt: currentUpdt };
        }
        textMessage('У Вас не хватает денег на покупку', 'red');
    };
    var buyNewUbgrade = function () {
        var index = upgradeList.options.selectedIndex;
        var newBTC = chekUpdate(upgrades, dataBase.allBTC, index);
        var _a = newBTC.currentUpdt, price = _a.price, incoming = _a.incoming, textUpd = _a.textUpd;
        if (newBTC.scoreBTC !== dataBase.allBTC) {
            dataBase.allBTC -= price;
            dataBase.incomingBTC += incoming;
            dataBase.maining();
            createListUpd(textUpd, curentUpdates);
            textMessage('Удачная покупка', 'green');
        }
    };
    buyUpgrade.addEventListener('click', function () {
        buyNewUbgrade();
        renderUpgrade(upgrades);
    });
    renderUpgrade(upgrades);
    btnModal.addEventListener('click', function () {
        modalAbout.classList.toggle('actvive');
    });
});
