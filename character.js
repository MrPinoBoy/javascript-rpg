//Use this script to generate your character
function Person(race,item,name){
    this.race = race;
    this.item = item;
    this.currenthealth = 100;
    this.maxHealth = 100;
    this.name = name;
    this.min = 3;
    this.maxDamage = 20;
    this.maxHealing = 30;

    if (this.race == "Orc") {
        this.currenthealth = 140
        this.maxHealth = 140
    }

    this.heal = function(){
        let heal = Math.floor(Math.random()*this.maxHealing)
        if (heal < 3) {
            heal = 3
        }
        if (this.item == "staff") {
            heal *=2
            if (heal > this.maxHealing){
                this.currenthealth += this.maxHealing
            } else {
                this.currenthealth += heal
            }
            
        } else {
            this.currenthealth += heal
        }
        if (this.currenthealth>100){
            this.currenthealth = 100
        }
    };

    this.damage = function(){
        let damage = Math.floor(Math.random()*this.maxDamage)
        if (damage < 3) {
            damage = 3
        }
        if (this.item == "sword") {
            damage *= 1.3
            if (damage>this.maxDamage){
                damage = this.maxDamage
            }
        }
        return damage
    };

    this.totalDamage = this.damage();

    this.displayChar = function(){
        return console.log(`I am a ${this.race}, I wield a ${this.item}, my total health point are ${this.maxHealth}`);
    };
}
