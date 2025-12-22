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
            }

        break;
        case "down":
            nxtPlayerPos = playerPos+5

            if(nxtPlayerPos<19){
                checkObstacle(playerPos,nxtPlayerPos)
            }
        break;
        case "left":
            nxtPlayerPos = playerPos-1

             remainder = playerPos%5
            if(remainder!=0){
                checkObstacle(playerPos,nxtPlayerPos)
            }
        break;
        case "right":
            console.log("right")
            nxtPlayerPos = playerPos+1

             remainder = (nxtPlayerPos+1)%5
                if(remainder!=0){
                    checkObstacle(playerPos,nxtPlayerPos)
            }
        break;        
    }


}

const checkObstacle = (playerPos,nxtPlayerPos)=>{
    //                 currentMap[playerPos]="g"
                // currentMap[nxtPlayerPos]="k"
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
            exit()
        break;       
    }

    render()
              
}