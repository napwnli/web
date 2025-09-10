document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const scoreElement = document.getElementById('score');
    const instructionsElement = document.getElementById('instructions');

    const gridSize = 20;
    let snake = [{ x: 10, y: 10 }];
    let food = {};
    let direction = 'right';
    let score = 0;
    let gameLoop;
    let gameStarted = false;

    const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-color').trim();
    const promptColor = getComputedStyle(document.documentElement).getPropertyValue('--prompt-color').trim();

    function generateFood() {
        food = {
            x: Math.floor(Math.random() * (canvas.width / gridSize)),
            y: Math.floor(Math.random() * (canvas.height / gridSize))
        };
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw snake
        snake.forEach(segment => {
            ctx.fillStyle = textColor;
            ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
        });

        // Draw food
        ctx.fillStyle = promptColor;
        ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
    }

    function update() {
        const head = { ...snake[0] };

        switch (direction) {
            case 'up': head.y--; break;
            case 'down': head.y++; break;
            case 'left': head.x--; break;
            case 'right': head.x++; break;
        }

        // Check for wall collision
        if (head.x < 0 || head.x >= canvas.width / gridSize || head.y < 0 || head.y >= canvas.height / gridSize) {
            return gameOver();
        }

        // Check for self collision
        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                return gameOver();
            }
        }

        snake.unshift(head);

        // Check for food collision
        if (head.x === food.x && head.y === food.y) {
            score++;
            scoreElement.textContent = `SCORE: ${score}`;
            generateFood();
        } else {
            snake.pop();
        }

        draw();
    }

    function changeDirection(event) {
        if (!gameStarted) {
            startGame();
            return;
        }

        const keyPressed = event.key;
        const goingUp = direction === 'up';
        const goingDown = direction === 'down';
        const goingLeft = direction === 'left';
        const goingRight = direction === 'right';

        if (keyPressed === 'ArrowUp' && !goingDown) direction = 'up';
        if (keyPressed === 'ArrowDown' && !goingUp) direction = 'down';
        if (keyPressed === 'ArrowLeft' && !goingRight) direction = 'left';
        if (keyPressed === 'ArrowRight' && !goingLeft) direction = 'right';
    }
    
    function startGame() {
        if (gameStarted) return;
        gameStarted = true;
        instructionsElement.style.display = 'none';
        score = 0;
        scoreElement.textContent = `SCORE: ${score}`;
        snake = [{ x: 10, y: 10 }];
        direction = 'right';
        generateFood();
        gameLoop = setInterval(update, 100);
    }

    function gameOver() {
        clearInterval(gameLoop);
        gameStarted = false;
        instructionsElement.textContent = `GAME OVER! Final Score: ${score}. Press any key to Restart.`;
        instructionsElement.style.display = 'block';
    }
    
    document.addEventListener('keydown', changeDirection);
    
    // Initial setup
    generateFood();
    draw();
});