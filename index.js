import { player } from "./player.js"
import { maps, mapInfo } from "./maps.js"
import { weapons } from "./weapons.js"

let currentMap = maps[player.map]
let meleeWeapon = weapons[player.meleeWeapon]
let cols = 5
let rows = 4
console.log(meleeWeapon)




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


          switch (currentMap[i]) {
            case "w":
                square.style.backgroundImage=`url("./Assets/sprites/wall.png")`
                break;
            case "g":
                square.style.backgroundImage=`url("./Assets/sprites/grass.png")`
                break;
            case "k":
                square.style.backgroundImage=`url("./Assets/sprites/knight.png"),url("./Assets/sprites/grass.png")`
                break;
            case "b":
                square.style.backgroundImage=`url("./Assets/sprites/boar.png"),url("./Assets/sprites/grass.png")`
                break;
            case "c":
                square.style.backgroundImage=`url("./Assets/sprites/chest.png"),url("./Assets/sprites/grass.png")`
                break;
            case "e":
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
    let playerPos = currentMap.indexOf("k")
    let nxtPlayerPos = 0
    let remainder = 0
    console.log(playerPos)
    switch(dir){
        case "up":
            nxtPlayerPos = playerPos-5

            if(nxtPlayerPos>0){
                checkObstacle(playerPos,nxtPlayerPos)
            }else{
               
                attackerFun(playerPos)
                render()
            }

        break;
        case "down":
            nxtPlayerPos = playerPos+5

            if(nxtPlayerPos<19){
                checkObstacle(playerPos,nxtPlayerPos)
            }else{
               
                attackerFun(playerPos)
                render()
            }
        break;
        case "left":
            nxtPlayerPos = playerPos-1

             remainder = playerPos%5
          
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

             remainder = (nxtPlayerPos+1)%5
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
    switch(currentMap[nxtPlayerPos]){
        case "g":
            console.log("grass")
            currentMap[playerPos]="g"
            currentMap[nxtPlayerPos]="k"
            render()
        break;
        case "c":
            currentMap[playerPos]="g"
            currentMap[nxtPlayerPos]="k"
            player.inventory.push("key")
            alert(player.inventory)
        break;
        case "b":
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
    if(currentMap.includes("b")){
        let attackerPos = currentMap.indexOf("b")

        let checkAround = [currentMap[attackerPos-5], currentMap[attackerPos+5],currentMap[attackerPos-1],currentMap[attackerPos+1] ]
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
            if(currentMap[posAttPos[i]]==="g"){
            console.log(`grass found ${currentMap[posAttPos[i]]}`)
            currentMap[attackerPos]="g"
            currentMap[posAttPos[i]]="b"
            return;
        }
    }

}