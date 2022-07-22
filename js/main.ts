document.addEventListener('DOMContentLoaded', () => {

    interface Upgrade {
        id: number,
        name: string,
        price: number,
        incoming: number,
        textUpd: string,
    }

    interface BTCState {
        allBTC: number,
        timer: number,
        incomingBTC: number,
        maining: () => void,
        setMainingTimer: () => void
    }

    interface BTCCounter {
        scoreBTC: number,
        currentUpdt: Upgrade
    }


    const counterBTC = document.querySelector("#result") as Element,
        startTaimer = document.querySelector("#btn") as HTMLButtonElement,
        stopTaimer = document.querySelector("#btn2") as HTMLButtonElement,
        currentMinutes = document.querySelector("#minutes") as Element,
        currenSeconds = document.querySelector("#seconds") as Element,
        incomingState = document.querySelector("#incoming") as Element,
        modalAbout = document.querySelector('.modal') as Element,
        btnModal = document.querySelector('#infbtn') as Element,
        upgradeList = document.querySelector('[updates]') as HTMLSelectElement,
        buyUpgrade = document.querySelector('#buy-upgrade') as HTMLButtonElement,
        curentUpdates = document.querySelector('#upgrades_information') as Element;


    let getMaining:number;
    let getTimer:number;

    const upgrades:Upgrade[] = [
        {id: 1, name: 'Улучшить оперативную память', price: 3, incoming: 0.5, textUpd:'Память улучшена'},
        {id: 2, name: 'Обновить винду', price: 2, incoming: 0.1, textUpd:'Винда обновлена до 10 версии'},
        {id: 3, name: 'Установить двойное охлаждение', price: 10, incoming: 0.2, textUpd:'Установлено 2 кулера'},
        {id: 4, name: 'Разогнать процессор', price: 5, incoming: 0.2, textUpd:'Процессор разогнан на 10%'},
      ]

    const dataBase: BTCState = {
        
      allBTC: 0,
      timer: 0,
      incomingBTC: 0.5,

      maining() {
        dataBase.allBTC += dataBase.incomingBTC;
        counterBTC.innerHTML = `${dataBase.allBTC}`;
        incomingState.innerHTML = `${dataBase.incomingBTC}`
        renderUpgrade(upgrades)
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

    const toggleBtnEnabled = (btn:HTMLButtonElement, param:boolean) => btn.disabled = param

    function renderUpgrade (upgrades: Upgrade[]) {

        upgradeList.innerHTML = ''

        if (upgrades.length === 0) {
            upgradeList.innerHTML = `<option>Больше нет улучшений...</option>`
        }
        upgrades.forEach(el => {
            const acsesUpg = dataBase.allBTC >= el.price ? 'Доступно к покупке' : 'Недоступно к покупке'
            upgradeList.innerHTML += `<option>${el.name} - ${el.price} BTC ${acsesUpg}</option>`
            console.log(dataBase.allBTC);
        })
        
    }
  
    startTaimer.addEventListener("click", () => {
       getMaining = setInterval(dataBase.maining, 2000);
       getTimer = setInterval(dataBase.setMainingTimer, 1000);
       toggleBtnEnabled(startTaimer, true)
    });
  
    stopTaimer.addEventListener("click", () => {
        clearInterval(getMaining);
        clearInterval(getTimer);
        toggleBtnEnabled(startTaimer, false)
    });
  

    const textMessage = (text: string, color: string) => {
        const mesageText = document.createElement('p')
        mesageText.style.color = color
        mesageText.textContent = text
        curentUpdates.append(mesageText)
        toggleBtnEnabled(buyUpgrade, true)
        setTimeout(() => {
            mesageText.remove() 
            toggleBtnEnabled(buyUpgrade, false)
        }, 2000);
    }

    const createListUpd = (text:string, parent: Element) => {
        parent.innerHTML += `<p>${text}</p>`
    }
  

    const chekUpdate = (upgrades: Upgrade[], currentBTC: number, index: number):BTCCounter => {

        const currentUpdt = upgrades.find((el, i) => i === index ? el : null)

        if (currentUpdt.price <= currentBTC) {
            const scoreBTC = currentBTC -= currentUpdt.price
            upgrades.splice(index, 1)
            return {scoreBTC, currentUpdt}
        }

        textMessage('У Вас не хватает денег на покупку', 'red')
    }
  
  const buyNewUbgrade = () => {
    const index:number = upgradeList.options.selectedIndex

    const newBTC = chekUpdate(upgrades, dataBase.allBTC, index)

    const {price, incoming, textUpd} = newBTC.currentUpdt

    if (newBTC.scoreBTC !== dataBase.allBTC) {
        dataBase.allBTC -= price
        dataBase.incomingBTC += incoming
        createListUpd(textUpd, curentUpdates)
        textMessage('Удачная покупка', 'green')
    }
  }
  
  buyUpgrade.addEventListener('click', () => {
    buyNewUbgrade()
    renderUpgrade(upgrades)
  })
  
  renderUpgrade(upgrades)

  btnModal.addEventListener('click', () => {
    modalAbout.classList.toggle('actvive')
  })
  
  
  })
  
  