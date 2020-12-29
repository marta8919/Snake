const grid = document.querySelector(".grid")
const startButton = document.querySelector("#start")
const scoreDisplay = document.getElementById('score')
let squares = []
let currentSnake = [2,1,0]
let direction = 1
const width = 10
let appleIndex = 0
let score = 0
let intervalTime = 1000
let speed = 0.5
let timerId = 0

function createGrid(){
    //create 100 of elements inside the grid
    for (let i = 0; i < 100; i++){
        //create element
        const square = document.createElement('div')
        // add style
        square.classList.add('square')
        //put the element into the grid
        grid.appendChild(square)
        // push each square to a new array
        squares.push(square)
    }

}

// invoque the function
createGrid();

currentSnake.forEach(index => squares[index].classList.add('snake'))

// function to restart
function startGame() {
    //remove the snake
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    //remove the apple
    squares[appleIndex].classList.remove('apple')
    //reset variables
    clearInterval(timerId)
    currentSnake = [2,1,0]
    score = 0
    // re add new score to browser
    scoreDisplay.textContent = score
    direction = 1
    intervalTime= 1000
    generateApple()
    //re add the class of snake to our new snake
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    // setting interval so the snake moves, the speed goes up ad the number decreases
    timerId = setInterval(move, intervalTime)   
}

function move() {
    //limits in the grid
    if (
        (currentSnake[0] + width >= width*width && direction === width) || // hit bottom
        (currentSnake[0] % width === width-1 && direction === 1) || // hit right wall
        (currentSnake[0] % width === 0 && direction === -1) || // hit left wall
        (currentSnake[0] - width < 0 && direction === -width) ||// hit top
        squares[currentSnake[0] + direction].classList.contains('snake')

    )
    return clearInterval(timerId)

    //remove last element from our currentSnake array
    const tail = currentSnake.pop()
    //remove styling from last element
    squares[tail].classList.remove('snake')
    //add square in direction we are heading
    currentSnake.unshift(currentSnake[0] + direction)

    // deal with snake head getting the apple
    if (squares[currentSnake[0]].classList.contains('apple')){
        //remove the class of apple
        squares[currentSnake[0]].classList.remove('apple')
        // grow our snake by adding class of snake to it
        squares[tail].classList.add('snake')
        // grow our snake array
        currentSnake.push(tail)
        // generate a new apple
        generateApple()
        // add one to the score
        score++
        //display the score
        scoreDisplay.textContent = score
        // speed up our snake
        clearInterval(timerId)
        intervalTime = intervalTime * speed
        timerId = setInterval(move, intervalTime)
        
    }

    //add styling so we can see it
    squares[currentSnake[0]].classList.add('snake')
    
}

// apple
function generateApple(){
    do {
        appleIndex = Math.floor(Math.random() * squares.length) //generate random number

    } while (squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
}

generateApple()

// the 'e' stands for event
function control(e){
    if (e.keyCode === 39){
        //right
        direction = 1
    } else if (e.keyCode === 38){
        //up
        direction = -width 
    } else if (e.keyCode === 37){
        //left
        direction = -1
    } else if (e.keyCode === 40){
        //down
        direction = +width
    }
}

document.addEventListener('keyup', control)

// now the function move only starts when the user clicks the 'start' button
startButton.addEventListener('click', startGame)