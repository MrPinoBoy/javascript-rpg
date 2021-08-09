(function(){
    let name1 = document.getElementById("name1")
    let name2 = document.getElementById("name2")
    let race1 = document.getElementById("race1")
    let race2 = document.getElementById("race2")
    let item1 = document.getElementById("item1")
    let item2 = document.getElementById("item2")
    name1.value = ""
    name2.value = ""
    race1.value = "Human"
    race2.value = "Human"
    item1.value = "Boots"
    item2.value = "Boots"
    let turn = 0
    let logs = document.querySelectorAll(".logs")
    let log = 1
    let turnCount = () => {
        turn += 1
        document.getElementById("turnNumber").innerHTML = `Turn ${turn}: ` 
    }

    let defeat = function(){
        if (player1.currenthealth <= 0) {
            document.querySelector(".action-log").style.backgroundColor = "red"
            document.getElementById("health-bar1").style.width = `0%`
            document.getElementById("button-1").style.opacity = "0"
            document.getElementById("button-1").style.pointerEvents = "none"
            document.getElementById("log1").innerHTML = `${player1.name} lost !`
            document.getElementById("restart").style.display = "inline-block"
        }
        if (player2.currenthealth <= 0 ) {
            document.querySelector(".action-log").style.backgroundColor = "red"
            document.getElementById("health-bar2").style.width = `0%`
            document.getElementById("button-2").style.opacity = "0"
            document.getElementById("button-2").style.pointerEvents = "none"
            document.getElementById("log1").innerHTML = `${player2.name} lost !`
            document.getElementById("restart").style.display = "inline-block"
        }
    }

    let vampirePassive = (nextPlayer, currentPlayer) =>  {
        if (nextPlayer.race == "Vampire") {
        let lifesteal = Math.round(currentPlayer.currenthealth/10)
        nextPlayer.currenthealth += lifesteal
        currentPlayer.currenthealth -= lifesteal
        if (nextPlayer.currenthealth > nextPlayer.maxHealth) {
            nextPlayer.currenthealth = nextPlayer.maxHealth
        }
        document.getElementById("log4").innerHTML = (`${nextPlayer.name} sucks the blood out of ${currentPlayer.name}, dealing ${lifesteal} damage and healing for the same amount !`)
    }
    }
    let bootsPassive = (currentPlayer,targetPlayer) => {
        if (targetPlayer.item == "Boots") {
            let dodge = Math.floor(Math.random()*10)+1
            if (dodge < 4) {
                document.getElementById(`log1`).innerHTML = `${targetPlayer.name} dodged the attack !`
            } else {
                targetPlayer.currenthealth -= currentPlayer.damage()
                document.getElementById("log1").innerHTML = (`${currentPlayer.name} dealt ${damage} damage !`)
            }
        } else {
            targetPlayer.currenthealth -= currentPlayer.damage()
            document.getElementById("log1").innerHTML = (`${currentPlayer.name} dealt ${damage} damage !`)
        }
    }

    let elfPassive = (currentPlayer, targetPlayer) => {
        let reflect = Math.floor(Math.random()*10)+1
        if (targetPlayer.race == "Elf" && reflect < 4){
            let reflectDamage = Math.round(damage/2)
                currentPlayer.currenthealth -= reflectDamage
                document.getElementById("log1").innerHTML = (`${targetPlayer.name} reflected the attack ! He dealt ${reflectDamage} damage !`)
            }
    }

    let humanPassive = (targetPlayer) => {
        if (targetPlayer.race == "Human"){
            console.log(damage)
            damage = Math.floor(damage*0.8)
            console.log(damage)
        }
    }

    let bowPassive = (currentPlayer, nextPlayer) => {
        if (currentPlayer.item == "Bow") {
            let bowDoubleAttack = 2//Math.floor(Math.random()*10)+1
            if (bowDoubleAttack < 4){
                document.getElementById("log2").innerHTML = (`${currentPlayer.name} shoots again with his bow !`)
                let currentHP = nextPlayer.currenthealth
                console.log(currentHP)
                humanPassive(nextPlayer)
                bootsPassive(currentPlayer, nextPlayer)
                elfPassive(currentPlayer, nextPlayer, log)
                console.log(currentPlayer.currenthealth+"wow")
                document.getElementById(`log3`).innerHTML = (`${currentPlayer.name} dealt ${currentHP-nextPlayer.currenthealth} damage !`)
            }
        }
    }

    let endOfTurn = (currentPlayer) => {
        turnCount()
        document.getElementById("health-bar2").style.width = `${player2.currenthealth/player2.maxHealth*100}%`
        document.getElementById("health-bar1").style.width = `${player1.currenthealth/player1.maxHealth*100}%`
        document.getElementById("charactername1").innerHTML = `${player1.name}: ${player1.currenthealth} HP`
        document.getElementById("charactername2").innerHTML = `${player2.name}: ${player2.currenthealth} HP`
        if (currentPlayer == player1) {
            document.getElementById("button-1").style.opacity = "0"
            document.getElementById("button-1").style.pointerEvents = "none"
            document.getElementById("button-2").style.opacity = "100%"
            document.getElementById("button-2").style.pointerEvents = "auto"
        } else {
            document.getElementById("button-2").style.opacity = "0"
            document.getElementById("button-2").style.pointerEvents = "none"
            document.getElementById("button-1").style.opacity = "100%"
            document.getElementById("button-1").style.pointerEvents = "auto"
        }
    }

    document.getElementById("submit1").addEventListener("click",function(){
        if (name1.value == ""){
            document.getElementById("name1").placeholder = "Please choose a name"
            document.getElementById("name1").style.borderColor = "red"
        } else {
            let name = name1.value
            let race = race1.value
            let item = item1.value
            document.getElementById("charactername1").innerHTML = name
            player1 = new Person(race,item,name)
            player1.displayChar()
            document.getElementById("creation-screen1").style.display = "none"
            document.getElementById("creation-screen2").style.display = "block"
        }
    })

    document.getElementById("submit2").addEventListener("click",function(){
        if (name2.value == ""){
            document.getElementById("name2").placeholder = "Please choose a name"
            document.getElementById("name2").style.borderColor = "red"
        } else {
            let name = name2.value
            let race = race2.value
            let item = item2.value
            document.getElementById("charactername2").innerHTML = name
            player2 = new Person(race,item,name)
            player2.displayChar()
            document.getElementById("creation-screen2").style.display = "none"
            document.getElementById("fight-screen").style.display = "flex"
            document.querySelector(".action-log").style.display = "flex"
        }
        turnCount()
    })

    document.getElementById("attack1").addEventListener("click", function(){
        logs.forEach(element => element.innerHTML = "")
        damage = player1.damage()
        bootsPassive(player1,player2)
        humanPassive(player2)
        elfPassive(player1,player2)
        bowPassive(player1,player2)
        vampirePassive(player2,player1)
        endOfTurn(player1)
        defeat()
    })

    document.getElementById("heal1").addEventListener("click", function(){
        logs.forEach(element => element.innerHTML = "")
        let healthBefore = player1.currenthealth
        player1.heal()
        document.getElementById("log1").innerHTML = `${player1.name} heals for ${player1.currenthealth-healthBefore} HP !`
        vampirePassive(player2, player1)
        endOfTurn(player1)
        defeat()
    })

    document.getElementById("yield1").addEventListener("click", function(){
        player1.currenthealth = 0
        defeat()
    })

    document.getElementById("attack2").addEventListener("click", function(){
        logs.forEach(element => element.innerHTML = "")
        damage = player2.damage()
        let log = "log1"
        bootsPassive(player2,player1)
        humanPassive(player1)
        elfPassive(player2,player1)
        bowPassive(player2,player1)
        vampirePassive(player1,player2)
        endOfTurn(player2)
        defeat()
    })

    document.getElementById("heal2").addEventListener("click", function(){
        logs.forEach(element => element.innerHTML = "")
        let healthBefore = player2.currenthealth
        player2.heal()
        document.getElementById("log1").innerHTML = `${player2.name} heals for ${player2.currenthealth-healthBefore} HP !`
        vampirePassive(player1,player2)
        endOfTurn(player2)
        defeat()
    })
    
    document.getElementById("yield2").addEventListener("click", function(){
        player2.currenthealth = 0
        defeat()
    })

    document.getElementById("restart").addEventListener("click", function(){
        window.location.reload()
    })
})()