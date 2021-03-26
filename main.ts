//  Variables
let MyList = [[0], [0]]
let MyRecentlyPlacedCoinPos = [0, 0]
//  Forget the values writen above. It gets overriten anyways
let MyCoin = [2, 0]
let MyStates = [0, 1, 2]
// Empty
// Player one
// Player two
let vecX = 0
let vecY = 0
let CurrentPlayer = Math.round(Math.random() + 1)
function draw() {
    // basic.clear_screen()
    for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
            console.log(MyList[r][c])
            led.plotBrightness(r, c, 255 / MyList[r][c])
        }
    }
    led.plotBrightness(MyCoin[0], MyCoin[1], 255 / CurrentPlayer)
}

//  Those parameter name are not "correct". But I don't know what else to call them
//  I'm, regrettably, too lazy to look it up
function myRange(iterator: any, condition: any, modifier: any) {
    while (iterator > condition) {
        iterator += modifier
    }
}

//  ^ unfinished.
//  Setup 
for (let row = 0; row < 5; row++) {
    MyList.push([0])
    for (let col = 0; col < 5; col++) {
        MyList[row][col] = 0
    }
}
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    
    MyCoin[0] -= MyCoin[0] > 0 ? 1 : 0
    draw()
})
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    
    MyCoin[0] += MyCoin[0] < 4 ? 1 : 0
    draw()
})
input.onButtonPressed(Button.AB, function on_button_pressed_ab() {
    //  Placeholder variable
    function placeCoin() {
        
        
        let row = MyCoin[0]
        //  Reversed and range(5,-1,-1) does not work. Guess I got to improvise)
        let col = 5
        while (col > 1) {
            col -= 1
            if (MyList[row][col] == 0) {
                //  yes! place coin and save it's position temporarly. then exit the loop
                MyList[row][col] = CurrentPlayer
                CurrentPlayer = CurrentPlayer == 1 ? 2 : 1
                MyRecentlyPlacedCoinPos = [row, col]
                break
            }
            
        }
    }
    
    function checkForMatches() {
        let vecX: number;
        
        console.logValue("From Phyt: ", MyRecentlyPlacedCoinPos)
        for (let x = -1; x < 2; x += 1) {
            for (let y = -1; y < 2; y += 1) {
                for (let matches = 0; matches < 4; matches++) {
                    //  Fail safe. The absolute value may never go below 0,0 and over 4,4
                    vecX = MyRecentlyPlacedCoinPos[0] + x * matches
                    vecX = MyRecentlyPlacedCoinPos[1] + y * matches
                    if (vecX > 4 || vecX < 0 || vecY > 4 || vecY < 0) {
                        break
                    }
                    
                    console.logValue("From Phyt: ", MyList[vecX][vecY])
                    if (MyList[vecX][vecY] == 1) {
                        console.log("Match!")
                    }
                    
                }
            }
        }
    }
    
    placeCoin()
    checkForMatches()
    draw()
})
draw()
