// Função para criar o canvas e inserir dentro do <div> "snakecanvas"
function newGameArea() {
    let canvas = document.createElement("canvas");
    canvas.width = 480;
    canvas.height = 480;
    document.getElementById("snakecanvas").appendChild(canvas);
    // o 'getContext' vai permitir os comandos de desenho, no canvas
    context = canvas.getContext("2d");
}
newGameArea();

// Tamanho de cada bloco do jogo
let box = 16;

// Array de coordenadas da cobrinha e posição inicial
// se fez a curva e o tipo de curva
let snakePos = [];
snakePos[0] = {
    x: 0,
    y: 14 * box
}

// Valor inicial da direção
let direction = "right";

// Posição inicial da maçã (aleatória)
let applePos = {
    x: Math.floor(Math.random() * 30) * box,
    y: Math.floor(Math.random() * 30) * box
}

// Função para 'desenhar' a cobrinha
// Cria um retângulo em cada coordenada do array
// Na primeira (i=0), desenha a cabeça, na direção definida
function drawSnake () {
    context.fillStyle = "green";
    for(i = 0; i < snakePos.length; i++){
        if (i == 0) {
            let ptX = snakePos[0].x;
            let ptY = snakePos[0].y;

            if (direction == "up") {
                context.moveTo(ptX,ptY+box); // head
                context.beginPath();
                context.bezierCurveTo(ptX,ptY+box,ptX-1,ptY+12,ptX-3,ptY+10);
                context.bezierCurveTo(ptX-5,ptY+8,ptX+2,ptY-8,ptX+8,ptY-8);
                context.bezierCurveTo(ptX+14,ptY-8,ptX+21,ptY+8,ptX+19,ptY+10);
                context.bezierCurveTo(ptX+17,ptY+12,ptX+box,ptY+box,ptX+box,ptY+box);
                context.fill();
                context.fillStyle = "white"; // eyes
                context.beginPath();
                context.arc(ptX+3,ptY+6,4,0.5*Math.PI,1.75*Math.PI);
                context.fill();
                context.beginPath();
                context.arc(ptX+13,ptY+6,4,1.25*Math.PI,0.5*Math.PI);
                context.fill();
                context.fillStyle = "black"; // pupils
                context.beginPath();
                context.arc(ptX+2,ptY+4,2,0,2*Math.PI);
                context.fill();
                context.arc(ptX+14,ptY+4,2,0,2*Math.PI);
                context.fill();
                context.fillStyle = "green";
            }
            if (direction == "down") {
                context.moveTo(ptX,ptY);
                context.beginPath();
                context.bezierCurveTo(ptX,ptY,ptX-1,ptY+4,ptX-3,ptY+6);
                context.bezierCurveTo(ptX-5,ptY+8,ptX+2,ptY+24,ptX+8,ptY+24);
                context.bezierCurveTo(ptX+14,ptY+24,ptX+21,ptY+8,ptX+19,ptY+6);
                context.bezierCurveTo(ptX+17,ptY+4,ptX+box,ptY,ptX+box,ptY);
                context.fill();
                context.fillStyle = "white"; // eyes
                context.beginPath();
                context.arc(ptX+3,ptY+10,4,0.25*Math.PI,1.5*Math.PI);
                context.fill();
                context.beginPath();
                context.arc(ptX+13,ptY+10,4,1.5*Math.PI,0.75*Math.PI);
                context.fill();
                context.fillStyle = "black"; // pupils
                context.beginPath();
                context.arc(ptX+2,ptY+12,2,0,2*Math.PI);
                context.fill();
                context.arc(ptX+14,ptY+12,2,0,2*Math.PI);
                context.fill();
                context.fillStyle = "green";
            }
            if (direction == "right") {
                context.moveTo(ptX,ptY);
                context.beginPath();
                context.bezierCurveTo(ptX,ptY,ptX+4,ptY-1,ptX+6,ptY-3);
                context.bezierCurveTo(ptX+8,ptY-5,ptX+24,ptY+2,ptX+24,ptY+8);
                context.bezierCurveTo(ptX+24,ptY+14,ptX+8,ptY+21,ptX+6,ptY+19);
                context.bezierCurveTo(ptX+4,ptY+17,ptX,ptY+box,ptX,ptY+box);
                context.fill();
                context.fillStyle = "white"; // eyes
                context.beginPath();
                context.arc(ptX+10,ptY+3,4,Math.PI,.25*Math.PI);
                context.fill();
                context.beginPath();
                context.arc(ptX+10,ptY+13,4,1.75*Math.PI,Math.PI);
                context.fill();
                context.fillStyle = "black"; // pupils
                context.beginPath();
                context.arc(ptX+12,ptY+2,2,0,2*Math.PI);
                context.fill();
                context.arc(ptX+12,ptY+14,2,0,2*Math.PI);
                context.fill();
                context.fillStyle = "green";
            }
            if (direction == "left") {
                context.moveTo(ptX+box,ptY);
                context.beginPath();
                context.bezierCurveTo(ptX+box,ptY,ptX+12,ptY-1,ptX+10,ptY-3);
                context.bezierCurveTo(ptX+8,ptY-5,ptX-8,ptY+2,ptX-8,ptY+8);
                context.bezierCurveTo(ptX-8,ptY+14,ptX+8,ptY+21,ptX+10,ptY+19);
                context.bezierCurveTo(ptX+12,ptY+17,ptX+box,ptY+box,ptX+box,ptY+box);
                context.fill();
                context.fillStyle = "white"; // eyes
                context.beginPath();
                context.arc(ptX+6,ptY+3,4,0.75*Math.PI,2*Math.PI);
                context.fill();
                context.beginPath();
                context.arc(ptX+6,ptY+13,4,0,1.25*Math.PI);
                context.fill();
                context.fillStyle = "black"; // pupils
                context.beginPath();
                context.arc(ptX+4,ptY+2,2,0,2*Math.PI);
                context.fill();
                context.arc(ptX+4,ptY+14,2,0,2*Math.PI);
                context.fill();
                context.fillStyle = "green";
            }
        }
        else {
            // condições para a cauda
            if (i == snakePos.length-1) {
                if (snakePos[i].x == snakePos[i-1].x && snakePos[i].y > snakePos[i-1].y) {
                    context.fillRect(snakePos[i].x, snakePos[i].y, box, box/2);
                    context.beginPath();
                    context.arc(snakePos[i].x + 8, snakePos[i].y + 8, 8, 0, 2 * Math.PI);
                    context.fill();
                }
                if (snakePos[i].x == snakePos[i-1].x && snakePos[i].y < snakePos[i-1].y) {
                    context.fillRect(snakePos[i].x, snakePos[i].y + 8, box, box/2);
                    context.beginPath();
                    context.arc(snakePos[i].x + 8, snakePos[i].y + 8, 8, 0, 2 * Math.PI);
                    context.fill();
                }
                if (snakePos[i].x < snakePos[i-1].x && snakePos[i].y == snakePos[i-1].y) {
                    context.fillRect(snakePos[i].x + 8, snakePos[i].y, box/2, box);
                    context.beginPath();
                    context.arc(snakePos[i].x + 8, snakePos[i].y + 8, 8, 0, 2 * Math.PI);
                    context.fill();
                }
                if (snakePos[i].x > snakePos[i-1].x && snakePos[i].y == snakePos[i-1].y) {
                    context.fillRect(snakePos[i].x, snakePos[i].y, box/2, box);
                    context.beginPath();
                    context.arc(snakePos[i].x + 8, snakePos[i].y + 8, 8, 0, 2 * Math.PI);
                    context.fill();
                }
            }
            else {
                let prevX = snakePos[i-1].x;    // Posição x do bloco anterior
                let prevY = snakePos[i-1].y;    // Posição y do bloco anterior
                let thisX = snakePos[i].x;      // Posição x do bloco atual
                let thisY = snakePos[i].y;      // Posição y do bloco atual
                let nextX = snakePos[i+1].x;    // Posição x do próximo bloco
                let nextY = snakePos[i+1].y;    // Posição y do próximo bloco

                if ((thisX > prevX && thisY > nextY) || (thisY > prevY && thisX > nextX)) {
                    context.beginPath();
                    context.moveTo(thisX-3,thisY);
                    context.arc(thisX-3,thisY-3,3,0.5*Math.PI,0,true);
                    context.lineTo(thisX+box,thisY);
                    context.lineTo(thisX+box,thisY+2);
                    context.arc(thisX+2,thisY+2,box-2,0,0.5*Math.PI);
                    context.lineTo(thisX,thisY+box);
                    context.lineTo(thisX-3,thisY);
                    context.fill();
                }
                else if ((thisY > prevY && thisX < nextX) || (thisX < prevX && thisY > nextY)) {
                    context.beginPath();
                    context.moveTo(thisX+box,thisY-3);
                    context.arc(thisX+box+3,thisY-3,3,Math.PI,0.5*Math.PI,true);
                    context.lineTo(thisX+box,thisY+box);
                    context.lineTo(thisX+box-2,thisY+box);
                    context.arc(thisX+box-2,thisY+2,box-2,0.5*Math.PI,Math.PI);
                    context.lineTo(thisX,thisY);
                    context.lineTo(thisX+box,thisY-3);
                    context.fill();
                }
                else if ((thisX < prevX && thisY < nextY) || (thisY < prevY && thisX < nextX)) {
                    context.beginPath();
                    context.moveTo(thisX+box+3,thisY+box);
                    context.arc(thisX+box+3,thisY+box+3,3,1.5*Math.PI,Math.PI,true);
                    context.lineTo(thisX,thisY+box);
                    context.lineTo(thisX,thisY+box-2);
                    context.arc(thisX+box-2,thisY+box-2,box-2,Math.PI,1.5*Math.PI);
                    context.lineTo(thisX+box,thisY);
                    context.lineTo(thisX+box+3,thisY+box);
                    context.fill();
                }
                else if ((thisX > prevX && thisY < nextY) || (thisY < prevY && thisX > nextX)) {
                    context.beginPath();
                    context.moveTo(thisX-3,thisY+box);
                    context.arc(thisX-3,thisY+box+3,3,1.5*Math.PI,2*Math.PI);
                    context.lineTo(thisX+box,thisY+box);
                    context.lineTo(thisX+box,thisY+box-2);
                    context.arc(thisX+2,thisY+box-2,box-2,0,1.5*Math.PI,true);
                    context.lineTo(thisX,thisY);
                    context.lineTo(thisX-3,thisY+box);
                    context.fill();
                }
                else {
                    context.fillRect(thisX, thisY, box, box);
                }
            }            
        }                    
    }
}

// Função para 'limpar' o canvas
// Se isso não for feito, os blocos da cobrinha
// que já foram desenhados vão continuar aparecendo
function drawBG () {
    context.clearRect(0, 0, 480, 480);
}

// Função para criar a maçã
function drawApple () {
    context.fillStyle = "red";
    context.beginPath();
    context.arc(applePos.x+8,applePos.y+8,5,0,Math.PI);
    context.arc(applePos.x+5,applePos.y+8,5,0,2*Math.PI);
    context.arc(applePos.x+11,applePos.y+8,5,0,2*Math.PI);
    context.fill();
    context.fillStyle = "darkgreen"; // Folha
    context.beginPath();
    context.arc(applePos.x+9,applePos.y+1,2,0,Math.PI);
    context.fillRect(applePos.x+7,applePos.y+1,2,2);
    context.fillRect(applePos.x+9,applePos.y-1,2,2);;
    context.fill();
}

// Quando o jogador pressiona alguma tecla, dispara a função 'update'
document.addEventListener('keydown', update);

// Modifica a direção da cobrinha, dependendo da tecla pressionada,
// mas sem permitir a "marcha-ré" e define se foi 'curva'
function update(event){

    if (event.keyCode == 37 && direction != 'right') {
            direction = "left";
    }
    if (event.keyCode == 38 && direction != 'down') {
            direction = "up";
    }
    if (event.keyCode == 39 && direction != 'left') {
            direction = "right";
    }
    if (event.keyCode == 40 && direction != 'up') {
            direction = "down";
    }
}

// Função para reiniciar o jogo, 'limpando' variáveis e componentes
// e definindo novamente as posições e direções iniciais
function restartGame() {
    document.getElementById("gameover").style.display = "none";
    document.getElementById("restartbutton").style.display = "none";
    document.getElementById("snakecanvas").innerHTML = "";
    snakePos = [];
    snakePos[0] = {
        x: 0,
        y: 14 * box
    }
    direction = "right";
    applePos = {
        x: Math.floor(Math.random() * 30) * box,
        y: Math.floor(Math.random() * 30) * box
    }
    newGameArea();
    drawSnake();
    drawApple();
    startGame();
}

function gameOver() {
    document.getElementById("gameover").style.display = "block";
    document.getElementById("restartbutton").style.display = "block";
    clearInterval(game);
}

function updateGame() {
    // Modo mais fácil: Se a cobrinha chegar ao final do canvas,
    // aparece novamente no lado oposto

    if(snakePos[0].x > 29 * box) snakePos[0].x = 0;
    if(snakePos[0].x < 0) snakePos[0].x = 29 * box;
    if(snakePos[0].y > 29 * box) snakePos[0].y = 0;
    if(snakePos[0].y < 0) snakePos[0].y = 29 * box;

    // Modo mais difícil: Se a cobrinha chegar ao final do canvas
    // acaba o jogo
    /*
    if ((snakePos[0].x > 29 * box) || (snakePos[0].x < 0) ||
    (snakePos[0].y > 29 * box) || (snakePos[0].y < 0)) {
        gameOver();
    }
    */

    // Se a cobrinha 'bater' nela mesma, acaba o jogo
    for(i = 1; i < snakePos.length; i++){
        if(snakePos[0].x == snakePos[i].x && snakePos[0].y == snakePos[i].y){
            gameOver();
        }
    }

    drawBG();
    drawSnake();
    drawApple();

    let snakeX = snakePos[0].x;
    let snakeY = snakePos[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != applePos.x || snakeY != applePos.y){
        snakePos.pop(); //pop tira o último elemento da lista
    }else{
        applePos.x = Math.floor(Math.random() * 30) * box;
        applePos.y = Math.floor(Math.random() * 30) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    // Adiciona a nova posição
    snakePos.unshift(newHead);
    
}

// Função para iniciar o jogo
function startGame() {
    game = setInterval(updateGame, 100);
}

startGame();
