function randomNumber (min, max){
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
            winner:null
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
            if(this.gameOver = true){
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
            console.log("player health is " + this.playerHealth)
            console.log("monster health is " + this.monsterHealth)
            console.log("game is " + this.winner)
        }
    },

    computed: {
        monsterBarStyles() {
            return { width: this.monsterHealth + '%'}
        },
        playerBarStyles() {
            return { width: this.playerHealth + '%'}
        },
        specialAttackStyles(){
        return this.specialAttackCooldown != 4 ? true : false
        },
    },

    methods: {
        attackMonster(){
            this.monsterHealth -= randomNumber(12, 6);
            this.attackPlayer();
        },
        attackPlayer(){
            this.playerHealth -= randomNumber(15, 8)
            this.specialAttackCooldown == 4 ? this.specialAttackCooldown = 4 : this.specialAttackCooldown++;
        },
        specialAttack(){
            this.monsterHealth -= randomNumber(16, 12);
            this.specialAttackCooldown =  this.specialAttackCooldown - 4
            this.attackPlayer();
        },
        healPlayer(){
            this.healValue = randomNumber(15, 9)
            this.playerHealth += this.healValue
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
            this.gameOver = false
            this.winner = null
            //battlelog = ""
        },
        battleLog(){
            
        }
    },
})

app.mount('#game')

