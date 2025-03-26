// import { REPL_MODE_STRICT } from "repl";
export function GameAi() {
    const canvas = document.getElementById("pingPongCanvasAI");
    const ctx = canvas.getContext("2d");
    canvas.width = 1000;
    canvas.height = 500;
    const paddleWidth = 11;
    const paddleHeight = 125;
    const ballSize = 20;
    let leftPaddleY = (canvas.height - paddleHeight) / 2;
    let rightPaddleY = (canvas.height - paddleHeight) / 2;
    let ballX = canvas.width / 2;
    let ballY = canvas.height / 2;
    let ballSpeedX = 6;
    let ballSpeedY = 6;
    const paddleSpeed = 10;
    const aiSpeed = 10;
    let lastTime = 0;
    let leftPlayerScore = 0;
    let rightPlayerScore = 0;
    let gameOver = false;
    const keys = {
        w: false,
        s: false,
        ArrowUp: false,
        ArrowDown: false,
    };
    const resetButton = document.getElementById("ResetButton");
    resetButton.addEventListener("click", resetgame);
    function resetgame() {
        location.reload();
    }
    // const exitButton = document.getElementById("exitButton") as HTMLButtonElement;
    //     exitButton.addEventListener('click', () => {
    //         loadnhistory('profil');
    //     });
    function exitGame() {
        gameOver = true;
        alert("Game exited!");
    }
    // exitButton.addEventListener("click", exitGame);
    function drawPaddles() {
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
        ctx.fillRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);
    }
    function drawBall() {
        ctx.beginPath();
        ctx.arc(ballX, ballY, ballSize / 2, 0, Math.PI * 2);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.closePath();
    }
    function drawCenterCircle() {
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2);
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
    }
    function drawCenterLines() {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - 50);
        ctx.lineTo(centerX, 0);
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.moveTo(centerX, centerY + 50);
        ctx.lineTo(centerX, canvas.height);
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
    }
    function drawScores() {
        ctx.fillStyle = "#fff";
        ctx.font = "50px Arial";
        ctx.fillText(leftPlayerScore.toString(), canvas.width / 4, 50);
        ctx.fillText(rightPlayerScore.toString(), (3 * canvas.width) / 4, 50);
    }
    function drawWinMessage(message) {
        ctx.fillStyle = "#fff";
        ctx.font = "60px Arial";
        ctx.textAlign = "center";
        ctx.fillText(message, canvas.width / 2, canvas.height / 2);
    }
    async function updateCanvas(timestamp) {
        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawPaddles();
        drawBall();
        drawCenterCircle();
        drawCenterLines();
        drawScores();
        ballX += ballSpeedX;
        ballY += ballSpeedY;
        if (ballY - ballSize <= 0 || ballY + ballSize >= canvas.height) {
            ballSpeedY = -ballSpeedY;
        }
        if (ballX - ballSize <= paddleWidth && ballY >= leftPaddleY && ballY <= leftPaddleY + paddleHeight) {
            ballX = paddleWidth + ballSize;
            const paddleCenterY = leftPaddleY + paddleHeight / 2;
            const relativeIntersectY = paddleCenterY - ballY;
            const normalizedIntersectY = relativeIntersectY / (paddleHeight / 2);
            const bounceAngle = normalizedIntersectY * 0.75;
            const speed = Math.sqrt(ballSpeedX ** 2 + ballSpeedY ** 2);
            ballSpeedX = speed * Math.cos(bounceAngle);
            ballSpeedY = -speed * Math.sin(bounceAngle);
        }
        if (ballX + ballSize >= canvas.width - paddleWidth && ballY >= rightPaddleY && ballY <= rightPaddleY + paddleHeight) {
            ballX = canvas.width - paddleWidth - ballSize;
            const paddleCenterY = rightPaddleY + paddleHeight / 2;
            const relativeIntersectY = paddleCenterY - ballY;
            const normalizedIntersectY = relativeIntersectY / (paddleHeight / 2);
            const bounceAngle = normalizedIntersectY * 0.75;
            const speed = Math.sqrt(ballSpeedX ** 2 + ballSpeedY ** 2);
            ballSpeedX = -speed * Math.cos(bounceAngle);
            ballSpeedY = -speed * Math.sin(bounceAngle);
        }
        const users = document.querySelector('.ress');
        if (ballX <= 0) {
            rightPlayerScore++;
            resetBall();
        }
        if (ballX >= canvas.width) {
            leftPlayerScore++;
            resetBall();
        }
        if (leftPlayerScore >= 5) {
            gameOver = true;
            users.innerHTML = "Player 1 Wins!";
            return;
        }
        if (rightPlayerScore >= 5) {
            gameOver = true;
            users.innerHTML = "Player 2 Wins!";
            return;
        }
        if ((keys.w && leftPaddleY > 0) || (keys.W && leftPaddleY > 0)) {
            leftPaddleY -= paddleSpeed;
        }
        if ((keys.s && leftPaddleY < canvas.height - paddleHeight) || (keys.S && leftPaddleY < canvas.height - paddleHeight)) {
            leftPaddleY += paddleSpeed;
        }
        const aiCenterY = rightPaddleY + paddleHeight / 2;
        const randomChance = Math.random();
        if (randomChance > 0.7) {
            await new Promise(resolve => setTimeout(resolve, 0.001));
            if (ballY < aiCenterY - 35) {
                const ArrowUp = true;
                console.log(ArrowUp);
                rightPaddleY -= aiSpeed;
            }
            else if (ballY > aiCenterY + 35) {
                const ArrowUp = true;
                console.log(ArrowUp);
                rightPaddleY += aiSpeed;
            }
        }
        if (rightPaddleY < 0) {
            rightPaddleY = 0;
        }
        else if (rightPaddleY > canvas.height - paddleHeight) {
            rightPaddleY = canvas.height - paddleHeight;
        }
        requestAnimationFrame(updateCanvas);
    }
    function resetBall() {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        const randomDirectionX = Math.random() < 0.5 ? -1 : -1;
        const randomDirectionY = Math.random() < 0.5 ? -1 : -1;
        ballSpeedX = 6 * randomDirectionX;
        ballSpeedY = 6 * randomDirectionY;
    }
    function restartGame() {
        leftPlayerScore = 0;
        rightPlayerScore = 0;
        gameOver = false;
        resetBall();
    }
    document.addEventListener("keydown", (event) => {
        if (event.key in keys) {
            keys[event.key] = true;
        }
    });
    document.addEventListener("keyup", (event) => {
        if (event.key in keys) {
            keys[event.key] = false;
        }
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "r" || event.key === "R") {
            restartGame();
        }
    });
    requestAnimationFrame(updateCanvas);
    requestAnimationFrame(updateCanvas);
}
