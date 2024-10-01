let gameData = {
    gold: 0,
    goldPerClick: 1,
    goldPerClickCost: 10,
    worker: 0,
    workerCost: 100,
    manager: 1,
    managerCost: 10,
};

let tickRate = 1010 - gameData.manager * 10

function mineGold(number, factor) {
    
    if (number == isNaN) {
        number = gameData.goldPerClick;
        factor = 1
    };
    gameData.gold += number * factor;
    document.getElementById("goldMined").innerHTML = gameData.gold + " Gold Mined";
}

function buyUpgrade(item, itemCost, itemCostMultiplier, itemDisplayId) {
    if (gameData.gold >= gameData[itemCost]) {
        gameData.gold -= gameData[itemCost];
        gameData[item] += 1;
        gameData[itemCost] *= itemCostMultiplier;
        document.getElementById("goldMined").innerHTML = gameData.gold + " Gold Mined";
        document.getElementById(itemDisplayId).innerHTML = `Buy new ${item} (Current Amount: ` + gameData[item] + `) Cost: ` + gameData[itemCost] + " Gold";
        if (item == "manager") {
            tickRate = 1010 - gameData.manager * 10;
            clearInterval(mainGameLoop);
            mainGameLoop = window.setInterval(function() {
                if (gameData.worker >= 1) {
                    mineGold(gameData.goldPerClick, gameData.worker);
                }
            }, tickRate);
        }
    }
}

let mainGameLoop = window.setInterval(function() {
    if (gameData.worker >= 1) {
        mineGold(gameData.goldPerClick, gameData.worker);
    }
}, tickRate)

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