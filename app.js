function randomNumber (max, min){
let damage = Math.floor(Math.random() * (max - min) + min)
return damage
}



const app = Vue.createApp({
    data(){
        return{
            playerHealth: 100,
            monsterHealth: 100,
            specialAttackCooldown: 3, 
            gameOver: false,
            winner:null,
            logMessages: []
        }
    },

    watch: {
        playerHealth(value){
            if(this.playerHealth <= 0){
                this.playerHealth = 0
                this.gameOver = true;
            }else if(this.playerHealth >= 100){
                this.playerHealth = 100
            }
        },
        monsterHealth(value){
            if(this.monsterHealth <= 0){
                this.monsterHealth = 0
                this.gameOver = true;
            }
        },
        gameOver(){
            if(this.gameOver == true){
                console.log("Game Over je true ")
                if(this.monsterHealth === 0 && this.playerHealth === 0){
                    this.winner = "Draw"
                }
                else if(this.monsterHealth === 0){
                    this.winner = "Player"
                }
                else if(this.playerHealth === 0){
                    this.winner = "Monster"
                }
            }
        }
    },

    computed: {
        gameOverStyle(){
            return this.gameOver == true ? true : false
        },
        monsterBarStyles() {
            return { 
            width: this.monsterHealth + '%',
            backgroundColor: this.monsterHealthColor
        }   
        },
        playerBarStyles() {
            return { 
                width: this.playerHealth + '%',
                backgroundColor: this.healthColor
        }
        },
        specialAttackStyles(){
        return this.specialAttackCooldown != 4 ? true : false
        },
        healthColor() {
            if (this.playerHealth >= 75) {
                return '#00a876'; 
            } else if (this.playerHealth >= 50) {
                return 'yellow'; 
            } else if (this.playerHealth >= 25) {
                return 'orange'; 
            } else {
                return `red`; 
            }
        },
        monsterHealthColor(){
            if (this.monsterHealth >= 75) {
                return '#00a876'; 
            } else if (this.monsterHealth >= 50) {
                return 'yellow'; 
            } else if (this.monsterHealth >= 25) {
                return 'orange'; 
            } else {
                return `red`; 
            }
        },
    },

    methods: {
        attackMonster(){
            const attackValue = randomNumber(12, 6);
            this.monsterHealth -= attackValue
            this.addBattleLogMessage('player', 'attack', attackValue)
            this.attackPlayer();
            console.log(this.healthColor)
            console.log(this.playerBarStyles)
        },
        attackPlayer(){
            const attackValue = randomNumber(15, 8)
            this.playerHealth -= attackValue
            this.addBattleLogMessage('monster', 'attack', attackValue)
            this.specialAttackCooldown == 4 ? this.specialAttackCooldown = 4 : this.specialAttackCooldown++;
        },
        specialAttack(){
            const attackValue = randomNumber(16, 12);
            this.monsterHealth -= attackValue
            this.addBattleLogMessage('player', 'attack', attackValue)
            this.specialAttackCooldown =  this.specialAttackCooldown - 4
            this.attackPlayer();
        },
        healPlayer(){
            this.healValue = randomNumber(15, 9)
            this.playerHealth += this.healValue
            this.addBattleLogMessage('player', 'heal', this.healValue)
            this.attackPlayer();
        },
        surrender() {
            this.playerHealth = 0
            console.log("As you throw your sword and life away, monster bites off your head. You can do better then this")
        },
        restartGame(){
            this.playerHealth = 100
            this.monsterHealth = 100
            this.specialAttackCooldown = 3
            this.winner = null
            this.logMessages = []
            this.gameOver = false 
        },
        addBattleLogMessage(who, what, value){
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            })
            
        }
    },
})

app.mount('#game')

