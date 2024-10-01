let gameData = {
    gold: 0,
    goldPerClick: 1,
    goldPerClickCost: 10,
    worker: 0,
    workerCost: 100,
};

function mineGold(number, factor) {
    
    if (number == isNaN) {
        number = gameData.goldPerClick;
        factor = 1
    };
    gameData.gold += number * factor;
    document.getElementById("goldMined").innerHTML = gameData.gold + " Gold Mined";
}

function buyGoldPerClick() {
    if (gameData.gold >= gameData.goldPerClickCost) {
        gameData.gold -= gameData.goldPerClickCost;
        gameData.goldPerClick += 1;
        gameData.goldPerClickCost *= 2;
        document.getElementById("goldMined").innerHTML = gameData.gold + " Gold Mined";
        document.getElementById("perClickUpgrade").innerHTML = "Upgrade Pickaxe (Currently Level " + gameData.goldPerClick + ") Cost: " + gameData.goldPerClickCost + " Gold";
    }
}

function buyWorker() {
    if (gameData.gold >= gameData.workerCost) {
        gameData.gold -= gameData.workerCost;
        gameData.worker += 1
        gameData.workerCost *= 3;
        document.getElementById("goldMined").innerHTML = gameData.gold + " Gold Mined";
        document.getElementById("buyWorker").innerHTML = "Buy new Worker (Current Amount: " + gameData.worker + ") Cost: " + gameData.workerCost + " Gold";
    }
}

let mainGameLoop = window.setInterval(function() {
    if (gameData.worker >= 1) {
        mineGold(gameData.goldPerClick, gameData.worker);
    }
}, 1000)

let saveGameLoop = window.setInterval(function() {
    localStorage.setItem("goldMinerSave",
        JSON.stringify(gameData));
}, 15000);

let savegame = JSON.parse(localStorage.getItem("goldMinerSave"));
if (savegame !== null) {
    gameData = savegame;
    document.getElementById("goldMined").innerHTML = gameData.gold + " Gold Mined";
    document.getElementById("perClickUpgrade").innerHTML = "Upgrade Pickaxe (Currently Level " + gameData.goldPerClick + ") Cost: " + gameData.goldPerClickCost + " Gold";
    document.getElementById("buyWorker").innerHTML = "Buy new Worker (Current Amount: " + gameData.worker + ") Cost: " + gameData.workerCost + " Gold";
}