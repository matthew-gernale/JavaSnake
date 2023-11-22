let blockSize = 25;
let rows = 20; cols = 20;
let board;
let context;

//snake head
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

//snake body
let snakeBody = [];

//food
let foodX;
let foodY;

//motion
let velocityX = 0;
let velocityY = 0;

//game set
let isGameOver;
let alertBox = document.getElementById("alert-box");

window.onload = function(){
    board = document.getElementById("board");
    board.height = rows * blockSize; 
    board.width = cols * blockSize;
    context = board.getContext("2d"); //used for drawing on the board

    document.getElementById("restart-btn").addEventListener("click", retBtn);
    document.addEventListener("keyup", ret);
    placeFood();
    document.addEventListener("keyup", changeDirection);
    //update();
    setInterval(update, 1000/10); //100milliseconds
}

function update(){

    if(isGameOver != true){
        alertBox.style.visibility = "hidden";
    }

    if (isGameOver){
        return;
    }

    context.fillStyle = "#43291f";
    context.fillRect(0, 0, board.width, board.height);
    
    context.fillStyle = "#da2c38";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX, foodY])
        placeFood();
    }

    for (let i = snakeBody.length-1; i > 0; i--){
        snakeBody[i] = snakeBody[i-1];
    }

    if(snakeBody.length){
        snakeBody[0] = [snakeX, snakeY];
    }

    context.strokeStyle = "#080708";
    context.lineWidth = 2;
    context.fillStyle = "#ffe6a7";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    context.strokeRect(snakeX, snakeY, blockSize, blockSize);
    context.stroke();

    for (let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    if(snakeX < 0 || snakeX > cols*blockSize -1 || snakeY < 0 || snakeY > rows*blockSize -1){
        isGameOver = true;
        alertBox.style.visibility = "visible";
    }

    for(let i = 0; i < snakeBody.length; i++){
        if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            isGameOver = true;
            alertBox.style.visibility = "visible";
        }
    }
    
}
function changeDirection(e){
    if (e.code == "ArrowUp" || e.code =="KeyW" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" || e.code =="KeyS" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" || e.code == "KeyA" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" || e.code == "KeyD" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood(){
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

function retBtn(){
    location.reload();
}

function ret(e){
    if(e.code == '' || e.code == 'Space' || e.code == 'Enter'){
        location.reload();
    }
}

