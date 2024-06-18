const mazeElement = document.getElementById('maze');
const rows = 40;
const cols = 40;
let maze = [];
let playerPosition = { x: 0, y: 1 };

function createMaze() {
    for (let y = 0; y < rows; y++) {
        maze[y] = [];
        for (let x = 0; x < cols; x++) {
            maze[y][x] = (y % 2 === 1 && x % 2 === 1 && y < rows - 1 && x < cols - 1) ? 'cell' : 'wall';
        }
    }
}

function carvePassagesFrom(cx, cy) {
    const directions = [[0, 2], [0, -2], [2, 0], [-2, 0]];

    shuffleArray(directions);

    directions.forEach(([dx, dy]) => {
        const nx = cx + dx;
        const ny = cy + dy;

        if (ny > 0 && ny < rows && nx > 0 && nx < cols && maze[ny][nx] === 'wall') {
            maze[cy + dy / 2][cx + dx / 2] = 'cell';
            maze[ny][nx] = 'cell';
            carvePassagesFrom(nx, ny);
        }
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function renderMaze() {
    mazeElement.innerHTML = '';
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const div = document.createElement('div');
            div.className = maze[y][x];
            if (x === playerPosition.x && y === playerPosition.y) {
                div.className = 'player';
            }
            mazeElement.appendChild(div);
        }
    }
}

function movePlayer(dx, dy) {
    const newX = playerPosition.x + dx;
    const newY = playerPosition.y + dy;
    if (newX >= 0 && newX < cols && newY >= 0 && newY < rows && maze[newY][newX] === 'cell') {
        playerPosition = { x: newX, y: newY };
        renderMaze();
        if (maze[newY][newX] === 'end') {
            alert('Gratulacje! Ukończyłeś labirynt.');
        }
    }
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            movePlayer(0, -1);
            break;
        case 'ArrowDown':
            movePlayer(0, 1);
            break;
        case 'ArrowLeft':
            movePlayer(-1, 0);
            break;
        case 'ArrowRight':
            movePlayer(1, 0);
            break;
    }
});

function init() {
    createMaze();
    maze[1][0] = 'start';
    maze[rows - 2][cols - 1] = 'end';
    carvePassagesFrom(1, 1);
    renderMaze();
}

init();
