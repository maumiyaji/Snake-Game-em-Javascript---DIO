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

// Array de coordenadas das mudanças de direção
let curvePos = [];
curvePos[0] = {
    x: 0,
    y: 14 * box,
    curveType: ""
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
// Na primeira, desenha a cabeça, na direção definida
function drawSnake () {
    context.fillStyle = "green";
    let j = 0;
    for(i = 0; i < snakePos.length; i++){
        if (i == 0) {
            let drawX = snakePos[0].x;
            let drawY = snakePos[0].y;
            let upORdown;
            let rightORleft;
            if (direction == "up" || direction == "down") {
                if (direction == "up") upORdown = 0;
                if (direction == "down") upORdown = 15;
                context.beginPath();
                context.moveTo((drawX+3),(drawY+Math.abs(upORdown-15)));
                context.lineTo((drawX+3),(drawY+Math.abs(upORdown-12)));
                context.lineTo((drawX+0),(drawY+Math.abs(upORdown-9)));
                context.lineTo((drawX+7),(drawY+Math.abs(upORdown-0)));
                context.lineTo((drawX+8),(drawY+Math.abs(upORdown-0)));
                context.lineTo((drawX+15),(drawY+Math.abs(upORdown-9)));
                context.lineTo((drawX+12),(drawY+Math.abs(upORdown-12)));
                context.lineTo((drawX+12),(drawY+Math.abs(upORdown-15)));
                context.fill();
            }
            else {
                if (direction == "left") rightORleft = 0;
                if (direction == "right") rightORleft = 15;
                context.beginPath();
                context.moveTo((drawX+Math.abs(rightORleft-15)),(drawY+3));
                context.lineTo((drawX+Math.abs(rightORleft-12)),(drawY+3));
                context.lineTo((drawX+Math.abs(rightORleft-9)),(drawY+0));
                context.lineTo((drawX+Math.abs(rightORleft-0)),(drawY+7));
                context.lineTo((drawX+Math.abs(rightORleft-0)),(drawY+8));
                context.lineTo((drawX+Math.abs(rightORleft-9)),(drawY+15));
                context.lineTo((drawX+Math.abs(rightORleft-12)),(drawY+12));
                context.lineTo((drawX+Math.abs(rightORleft-15)),(drawY+12));
                context.fill();
            }
        }
        else {
            if (snakePos[i].x == curvePos[j].x && snakePos[i].y == curvePos[j].y) {
                let pointX = snakePos[i].x;
                let pointY = snakePos[i].y;
                if (curvePos[j].curveType == "curveA") {
                    context.beginPath();
                    context.moveTo(pointX+box,pointY);
                    context.lineTo(pointX+2*box,pointY+box);
                    context.arcTo(pointX+box,pointY+box,pointX+box,pointY+2*box,box);
                    context.lineTo(pointX,pointY+box);
                    context.arcTo(pointX,pointY,pointX+box,pointY,box);
                    context.fill(); 
                }
                if (curvePos[j].curveType == "curveB") {
                    context.beginPath();
                    context.moveTo(pointX+box,pointY+box);
                    context.lineTo(pointX,pointY+2*box);
                    context.arcTo(pointX,pointY+box,pointX-box,pointY+box,box);
                    context.lineTo(pointX,pointY);
                    context.arcTo(pointX+box,pointY,pointX+box,pointY+box,box);
                    context.fill();
                }
                if (curvePos[j].curveType == "curveC") {
                    context.beginPath();
                    context.moveTo(pointX,pointY+box);
                    context.lineTo(pointX-box,pointY);
                    context.arcTo(pointX,pointY,pointX,pointY-box,box);
                    context.lineTo(pointX+box,pointY)
                    context.arcTo(pointX+box,pointY+box,pointX,pointY+box,box);
                    context.fill();
                }
                if (curvePos[j].curveType == "curveD") {
                    context.beginPath();
                    context.moveTo(pointX+box,pointY+box);
                    context.lineTo(pointX+2*box,pointY);
                    context.arcTo(pointX+box,pointY,pointX+box,pointY-box,box);
                    context.lineTo(pointX,pointY);
                    context.arcTo(pointX,pointY+box,pointX+box,pointY+box,box);
                    context.fill();
                }
                j++;
            }
            else {
                context.fillRect(snakePos[i].x, snakePos[i].y, box, box);
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
    context.fillRect(applePos.x, applePos.y, box, box);
}

// Quando o jogador pressiona alguma tecla, dispara a função 'update'
document.addEventListener('keydown', update);

// Modifica a direção da cobrinha, dependendo da tecla pressionada,
// mas sem permitir a "marcha-ré" e define se foi 'curva'
function update(event){
    let newCurve = {
        x: snakePos[0].x,
        y: snakePos[0].y,
        curveType: ""
    }

    if (event.keyCode == 37 && direction != 'right') {
        if (direction == "up") {
            direction = "left";
            newCurve.curveType = "curveB";
            curvePos.unshift(newCurve);
        }
        else if (direction == "down") {
            direction = "left";
            newCurve.curveType = "curveC";
            curvePos.unshift(newCurve);
        }
    }
    if (event.keyCode == 38 && direction != 'down') {
        if (direction == "left") {
            direction = "up";
            newCurve.curveType = "curveD";
            curvePos.unshift(newCurve);
        }
        else if (direction == "right") {
            direction = "up";
            newCurve.curveType = "curveC";
            curvePos.unshift(newCurve);
        }
    }
    if (event.keyCode == 39 && direction != 'left') {
        if (direction == "up") {
            direction = "right";
            newCurve.curveType = "curveA";
            curvePos.unshift(newCurve);
        }
        else if (direction == "down") {
            direction = "right";
            newCurve.curveType = "curveD";
            curvePos.unshift(newCurve);
        }
    }
    if (event.keyCode == 40 && direction != 'up') {
        if (direction == "left") {
            direction = "down";
            newCurve.curveType = "curveA";
            curvePos.unshift(newCurve);
        }
        else if (direction == "right") {
            direction = "down";
            newCurve.curveType = "curveB";
            curvePos.unshift(newCurve);
        }
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
    curvePos = [];
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
    //document.addEventListener('keydown', updateGame);
    game = setInterval(updateGame, 100);
}

startGame();
