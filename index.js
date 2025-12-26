import { player } from "./Modules/player.js"
import { maps } from "./Modules/maps.js"
import { mapInfo } from "./Modules/maps.js"
import { weapons } from "./Modules/weapons.js"

let currentMap = maps[player.map]
let currentCell = currentMap[player.cell]
let meleeWeapon = weapons[player.meleeWeapon]
let mapPics = mapInfo[player.map]
let cols = 5
let rows = 4
let cellSwitch = false;


const controlPanel = document.getElementById("controlDiv")
controlPanel.addEventListener("click",(e)=>{
    // console.log(e.target.id)
    // render()

    if(e.target.id !="ok"){
        movementFun(e.target.id)
    }
})


const render = ()=>{
    for(let s=1;s<21;s++){
        const square = document.getElementById(`s`+s)
        let i = s-1

        let c = currentCell[i]
          switch (true) {
            case c[0]=="t":
                square.style.backgroundImage=mapPics.ground
                break;
            case c==="w":
                square.style.backgroundImage=mapPics.wall
                break;
            case c==="g":
                square.style.backgroundImage=mapPics.ground
                break;
            case c==="k":
                square.style.backgroundImage=`url("./Assets/sprites/player.png"),${mapPics.ground}`
                break;
            case c==="a":
                square.style.backgroundImage=`${mapPics.attacker},${mapPics.ground}`
                break;
            case c==="c":
                square.style.backgroundImage=`${mapPics.chest},${mapPics.ground}`
                break;
            case c==="e":
                square.style.backgroundImage=`url("./Assets/sprites/exit.png")`
                break;
            // default:
            //     square.style.backgroundImage=`url("./Assets/sprites/wall.png")`
            //     break;

          }
                
    }
    
}
render()
const movementFun=(dir)=>{
    let playerPos = currentCell.indexOf("k")
    let nxtPlayerPos = 0
    let remainder = 0
    console.log(playerPos)
    switch(dir){
        case "up":
            nxtPlayerPos = playerPos-5

            if(nxtPlayerPos>=0){
                checkObstacle(playerPos,nxtPlayerPos)
            }else{
               
                attackerFun(playerPos)
                render()
            }

        break;
        case "down":
            nxtPlayerPos = playerPos+5

            if(nxtPlayerPos<=19){
                checkObstacle(playerPos,nxtPlayerPos)
            }else{
               
                attackerFun(playerPos)
                render()
            }
        break;
        case "left":
            // if()
            nxtPlayerPos = playerPos-1

             remainder = playerPos%5

             if(currentCell[nxtPlayerPos].includes("tl")){
                console.log("tl")
                cellSwitch=true
             }else{
                cellSwitch=false
             }
          
            
            if(remainder!=0){
                checkObstacle(playerPos,nxtPlayerPos)
            }else{
               
                attackerFun(playerPos)
                render()
            }
           

        break;
        case "right":
            console.log("right")
            nxtPlayerPos = playerPos+1

             remainder = (nxtPlayerPos)%5
             console.log(`rem ${remainder}`)
                if(remainder!=0){
                    checkObstacle(playerPos,nxtPlayerPos)
            }else{
               
                attackerFun(playerPos)
                render()
            }
        break;        
    }


}

const checkObstacle = (playerPos,nxtPlayerPos)=>{

console.log("check")
console.log(nxtPlayerPos)
    switch(currentCell[nxtPlayerPos]){
        case "g":
            console.log("grass")
            currentCell[playerPos]="g"
            currentCell[nxtPlayerPos]="k"
            render()
        break;
        case "c":
            currentCell[playerPos]="g"
            currentCell[nxtPlayerPos]="k"
            player.inventory.push("key")
            alert(player.inventory)
        break;
        case "a":
            // meleeAttack() 
            console.log("attack")  
        break;  
        case "e":
            // exit()
        break; 
        default:
            //  attackerFun(playerPos)
        break;          
    }
    attackerFun(playerPos)
    render()
              
}

const attackerFun = (playerPos)=>{
    console.log("attFun")
    if(currentCell.includes("a")){


        let attackerPos = currentCell.indexOf("a")

        let checkAround = [currentCell[attackerPos-5], currentCell[attackerPos+5],currentCell[attackerPos-1],currentCell[attackerPos+1] ]
        // console.log(checkAround)
        if(checkAround.includes("k")){
            // attack player
        }else{

            if(playerPos>attackerPos){
                playerAhead(playerPos,attackerPos)
            }else{
                playerBehind(playerPos,attackerPos)
            }

        }




    }else{
        return
    }
}

const playerAhead = (playerPos,attackerPos)=>{
    let diff = playerPos-attackerPos
    let posAttPos = []
    console.log(`diff ${diff}`)
    if(diff>=5){
        posAttPos = [attackerPos+5,attackerPos+1, attackerPos-1,attackerPos-5]
    }else{
        posAttPos = [attackerPos+1,attackerPos+5, attackerPos-1,attackerPos-5]
    }

    moveAttacker(posAttPos,attackerPos)

}

const playerBehind = (playerPos,attackerPos)=>{

    let diff = attackerPos-playerPos
    let posAttPos = []
    console.log(`diff ${diff}`)
    if(diff>=5){
        posAttPos = [attackerPos-5,attackerPos-1, attackerPos+1,attackerPos+5]
    }else{
        posAttPos = [attackerPos-1,attackerPos-5, attackerPos+1,attackerPos+5]
    }

    moveAttacker(posAttPos,attackerPos)

}

const moveAttacker = (posAttPos,attackerPos)=>{
    let moveFound = false

    for(let i =0;i<posAttPos.length;i++){
            if(currentCell[posAttPos[i]]==="g"){
            console.log(`grass found ${currentCell[posAttPos[i]]}`)
            currentCell[attackerPos]="g"
            currentCell[posAttPos[i]]="a"
            return;
        }
    }

}