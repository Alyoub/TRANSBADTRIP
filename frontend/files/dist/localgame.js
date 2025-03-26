export function localGameHandling() {
    const canvas = document.getElementById("pingPongLocal");
    const ctx = canvas.getContext("2d");
    canvas.width = 1500;
    canvas.height = 700;
    const paddleWidth = 11;
    const paddleHeight = 125;
    const ballSize = 20;
    let leftPaddleY = (canvas.height - paddleHeight) / 2;
    let rightPaddleY = (canvas.height - paddleHeight) / 2;
    let ballX = canvas.width / 2;
    let ballY = canvas.height / 2;
    let ballSpeedX = 8;
    let ballSpeedY = 8;
    const paddleSpeed = 8;
    let lastTime = 0;
    let leftPlayerScore;
    let rightPlayerScore;
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
        restartGame();
        gameOver = false;
    }
    const exitButton = document.getElementById("exitButton");
    function exitGame() {
        gameOver = true;
        alert("Game exited!");
    }
    exitButton.addEventListener("click", exitGame);
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
        ctx.fillText(leftPlayerScore, canvas.width / 4, 50);
        ctx.fillText(rightPlayerScore, (3 * canvas.width) / 4, 50);
    }
    function drawWinMessage(message) {
        ctx.fillStyle = "#fff";
        ctx.font = "60px Arial";
        ctx.textAlign = "center";
        ctx.fillText(message, canvas.width / 2, canvas.height / 2);
    }
    function updateCanvas() {
        // const deltaTime = timestamp - lastTime;
        // lastTime = timestamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawPaddles();
        drawBall();
        drawCenterCircle();
        drawCenterLines();
        drawScores();
        ballX += ballSpeedX;
        ballY += ballSpeedY;
        if (ballY - ballSize / 2 <= 0 || ballY + ballSize / 2 >= canvas.height) {
            ballSpeedY = -ballSpeedY;
        }
        if (ballX - ballSize / 2 <= paddleWidth && ballY >= leftPaddleY && ballY <= leftPaddleY + paddleHeight) {
            ballX = paddleWidth + ballSize / 2;
            const paddleCenterY = leftPaddleY + paddleHeight / 2;
            const relativeIntersectY = paddleCenterY - ballY;
            const normalizedIntersectY = relativeIntersectY / (paddleHeight / 2);
            const bounceAngle = normalizedIntersectY * 0.75;
            const speed = Math.sqrt(ballSpeedX ** 2 + ballSpeedY ** 2);
            ballSpeedX = speed * Math.cos(bounceAngle);
            ballSpeedY = -speed * Math.sin(bounceAngle);
        }
        if (ballX + ballSize / 2 >= canvas.width - paddleWidth && ballY >= rightPaddleY && ballY <= rightPaddleY + paddleHeight) {
            ballX = canvas.width - paddleWidth - ballSize / 2;
            const paddleCenterY = rightPaddleY + paddleHeight / 2;
            const relativeIntersectY = paddleCenterY - ballY;
            const normalizedIntersectY = relativeIntersectY / (paddleHeight / 2);
            const bounceAngle = normalizedIntersectY * 0.75;
            const speed = Math.sqrt(ballSpeedX ** 2 + ballSpeedY ** 2);
            ballSpeedX = -speed * Math.cos(bounceAngle);
            ballSpeedY = -speed * Math.sin(bounceAngle);
        }
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
            drawWinMessage("Player 1 Wins!");
            return;
        }
        if (rightPlayerScore >= 5) {
            gameOver = true;
            drawWinMessage("Player 2 Wins!");
            return;
        }
        if (keys.w && leftPaddleY > 0) {
            leftPaddleY -= paddleSpeed;
        }
        if (keys.s && leftPaddleY < canvas.height - paddleHeight) {
            leftPaddleY += paddleSpeed;
        }
        if (keys.ArrowUp && rightPaddleY > 0) {
            rightPaddleY -= paddleSpeed;
        }
        if (keys.ArrowDown && rightPaddleY < canvas.height - paddleHeight) {
            rightPaddleY += paddleSpeed;
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
        ballSpeedX = 8;
        ballSpeedY = 8;
    }
    function restartGame() {
        leftPlayerScore = 0;
        rightPlayerScore = 0;
        gameOver = false;
        resetBall();
    }
    document.addEventListener("keydown", (event) => {
        if (event.key in keys) {
            // keys[event.key] = true;
        }
    });
    document.addEventListener("keyup", (event) => {
        if (event.key in keys) {
            // keys[event.key] = false;
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
;
