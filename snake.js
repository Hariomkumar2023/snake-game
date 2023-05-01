//board
var blocksize=25;
var rows=20;
var cols=20;
var board;
var context;

//snake head
var snakeX=rows*5;
var snakeY=cols*5;

var velocityX=0;
var velocityY=0;

var snakebody=[];

//food
var foodX;
var foodY;

var gameover=false;



window.onload=function(){
    board=document.getElementById("board");
    board.height=rows*blocksize;
    board.width=cols*blocksize;
    context=board.getContext("2d");
    placefood();
    document.addEventListener("keyup",changeDirection);
    //update used in every frame to show movement;
    setInterval(update,1300/10);//every 200ms refreshed;

}
function update(){
    if(gameover){
        return;
    }
    context.fillStyle="black";
    context.fillRect(0,0,board.width,board.height);

    context.fillStyle="red";
    context.fillRect(foodX,foodY,blocksize,blocksize);

    if(snakeX == foodX && snakeY == foodY){
        snakebody.push([foodX,foodY])
        placefood();
    }

    for(let i=snakebody.length-1;i>0;i--){
        snakebody[i]=snakebody[i-1];
    }
    if(snakebody.length){
        snakebody[0]=[snakeX,snakeY];
    }


    context.fillStyle="green";
    snakeX+=velocityX*blocksize;
    snakeY+=velocityY*blocksize;
    context.fillRect(snakeX,snakeY,blocksize,blocksize);
    for(let i=0; i<snakebody.length;i++){
        context.fillRect(snakebody[i][0],snakebody[i][1],blocksize,blocksize);
    }
   
    if(snakeX<0 || snakeX>cols*blocksize || snakeY<0 || snakeY>rows.blocksize){
        gameover=true;
        alert("oops! game over");
    }
    for(let i=0;i<snakebody.length;i++){
        if(snakeX==snakebody[i][0] && snakeY==snakebody[i][1]){
            gameover=true;
            alert("oops! game over");
        }
    }

}
function changeDirection(e){

    if(e.code=="ArrowUp" && velocityY!=1){
        velocityX=0;
        velocityY=-1;
    }
    else if(e.code=="ArrowDown" && velocityY!=-1){
        velocityX=0;
        velocityY=1;
    }
    else if(e.code=="ArrowRight" && velocityX !=-1){
        velocityX=1;
        velocityY=0;
    }
    else if(e.code=="ArrowLeft" && velocityX !=1){
        velocityX=-1;
        velocityY=0;
    }

}

function placefood(){
    //math.random gives value from 0-1
    //after multiplying with cols,rows gives from 0-20;
    foodX=Math.floor(Math.random()*cols)*blocksize;
    foodY=Math.floor(Math.random()*rows)*blocksize;

}