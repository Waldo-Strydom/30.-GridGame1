import { player } from "./Modules/player.js"
import { maps } from "./Modules/maps.js"
import { mapInfo } from "./Modules/maps.js"
import { weapons } from "./Modules/weapons.js"

let currentMap = maps[player.map]
let currentCell = currentMap[player.cell]

let meleeWeapon = weapons[player.meleeWeapon]
let mapPics = mapInfo[player.map]
let swiches = mapInfo[player.map].swiches
let currentCellNumber = swiches[player.cell]
let cols = 5
let rows = 4






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

    switch(dir){
        case "up":
            nxtPlayerPos = playerPos-5

            if(nxtPlayerPos>=0){
                checkObstacle(playerPos,nxtPlayerPos)
            }else{

                if(currentCellNumber.u){
                    let newPlayerPos = playerPos+15
                    let checkObjOnMap = checkNewObj(currentCellNumber.u, newPlayerPos)
                    if(checkObjOnMap){
                        currentCell[playerPos]="g"
                        swichMapFun(currentCellNumber.u, newPlayerPos)
                    }
                    


                }
               
                attackerFun(playerPos)
                render()
            }

        break;
        case "down":
            nxtPlayerPos = playerPos+5

            if(nxtPlayerPos<=19){
                checkObstacle(playerPos,nxtPlayerPos)
            }else{

                if(currentCellNumber.d){
                    currentCell[playerPos]="g"
                // call switchfun here
                let newPlayerPos = playerPos-15
                swichMapFun(currentCellNumber.d, newPlayerPos)
                }
               
                attackerFun(playerPos)
                render()
            }
        break;
        case "left":
            // if()
            nxtPlayerPos = playerPos-1

             remainder = playerPos%5

                
          
            
            if(remainder!=0){
                
                checkObstacle(playerPos,nxtPlayerPos)
            }else{
                
                if(currentCellNumber.l){
                 currentCell[playerPos]="g"   
                // call switchfun here
                let newPlayerPos = playerPos+4
                swichMapFun(currentCellNumber.l, newPlayerPos)
                }


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
                console.log(currentCellNumber.r)
                if(currentCellNumber.r){
       
                    currentCell[playerPos]="g"
                // call switchfun here
                let newPlayerPos = playerPos-4
                swichMapFun(currentCellNumber.r, newPlayerPos)
                }
               
                attackerFun(playerPos)
                render()
            }
        break;        
    }


}

const checkObstacle = (playerPos,nxtPlayerPos)=>{




    switch(true){
        case currentCell[nxtPlayerPos] === "g":
        
            currentCell[playerPos]="g"
            currentCell[nxtPlayerPos]="k"
            render()
        break;
        case currentCell[nxtPlayerPos] === "c":
            currentCell[playerPos]="g"
            currentCell[nxtPlayerPos]="k"
            player.inventory.push("key")
            alert(player.inventory)
        break;
        case currentCell[nxtPlayerPos] === "a":
            // meleeAttack() 
            console.log("attack")  
        break;  
        case currentCell[nxtPlayerPos] === "e":
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

const checkNewObj = (newCell, newPlayerPos)=>{

       currentCell = currentMap[newCell]
       console.log(currentCell)
    if(currentCell[newPlayerPos]="g"){
        console.log(currentCell[newPlayerPos])
        return true
    }else{
        return false
    }
    


}

const swichMapFun = (newCell, newPlayerPos)=>{

    player.cell = newCell
    currentCell = currentMap[player.cell]
    console.log(newPlayerPos)
    currentCell[newPlayerPos]="k"
    
    


mapPics = mapInfo[player.map]
swiches = mapInfo[player.map].swiches
currentCellNumber = swiches[player.cell]

    render()

}