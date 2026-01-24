
export let maps ={
    start:{
        zero: [
    "g","g","g","g","w",
    "g","k","g","g","w",
    "g","g","g","g","w",
    "g","g","g","g","w"
],
    1: [
    "w","g","g","g","g",
    "w","g","g","g","g",
    "w","g","g","g","g",
    "w","g","g","g","g"
],
    2: [
    "g","g","g","g","g",
    "g","g","g","g","g",
    "g","g","g","g","g",
    "w","w","w","w","w"
],
    3: [
    "g","g","g","g","g",
    "g","g","g","g","c",
    "g","g","g","g","c",
    "g","g","g","g","g"
],
    }
}

export let mapInfo={
    start:{
        chest:["key"],
        ground: `url("./Assets/sprites/grass2.png")`,
        wall: `url("./Assets/sprites/trees1.png")`,
        chest: `url("./Assets/sprites/chest2.png")`,
        attacker: `url("./Assets/sprites/boar.png")`,
        swiches: {
            zero:{
                "l": 1,
                "d": 3
            },
            1:{
                "r": "zero",
                "d": 2
            },
            2:{
                "u": 1,
                "r": 3
            },
            3:{
                "u":"zero",
                "l":2
            }
            
        }
    }
}