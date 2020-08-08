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
function drawSnake () {
    for(i = 0; i < snakePos.length; i++){
        if (i == 0) context.fillStyle = "blue";
        else context.fillStyle = "green";
        context.fillRect(snakePos[i].x, snakePos[i].y, box, box);
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
// mas sem permitir a "marcha-ré"
function update(event){
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
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
    /* Modo mais fácil: Se a cobrinha chegar ao final do canvas,
    aparece novamente no lado oposto

    if(snakePos[0].x > 29 * box) snakePos[0].x = 0;
    if(snakePos[0].x < 0) snakePos[0].x = 29 * box;
    if(snakePos[0].y > 29 * box) snakePos[0].y = 0;
    if(snakePos[0].y < 0) snakePos[0].y = 29 * box;

    Modo mais difícil: Se a cobrinha chegar ao final do canvas
    acaba o jogo */

    if ((snakePos[0].x > 29 * box) || (snakePos[0].x < 0) ||
    (snakePos[0].y > 29 * box) || (snakePos[0].y < 0)) {
        gameOver();
    }

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
