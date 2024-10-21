// Предварительно загружаем аудио
const audio = new Audio('other/music.mp3');
audio.preload = 'auto';
audio.loop = true; // Сделали музыку цикличной

// Получаем элементы
const startScreen = document.getElementById('start-screen');
const mainContent = document.getElementById('main-content');
const startMessage = document.querySelector('.start-message');

// Показываем кнопку "Initialize" спустя 2 секунды
setTimeout(() => {
    startMessage.style.display = 'block';
}, 500);

// Функция для запуска сайта
function startSite() {
    // Запускаем музыку
    audio.play('other/music.mp3').catch(error => {
        console.error('Ошибка при воспроизведении музыки:', error);
    });

    // Скрываем стартовый экран
    startScreen.style.display = 'none';

    // Показываем основной контент
    mainContent.style.display = 'block';

    // Выводим стартовое сообщение в консоль
    displayConsoleMessage();

    // Запускаем эффект матрицы
    startMatrixEffect();
}

// Добавляем обработчик события на стартовое сообщение
startMessage.addEventListener('click', startSite);

// Реализация перетаскивания консоли
const consoleElement = document.getElementById('console');
const consoleHeader = consoleElement.querySelector('.console-header');

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

consoleHeader.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - consoleElement.offsetLeft;
    offsetY = e.clientY - consoleElement.offsetTop;
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        let newX = e.clientX - offsetX;
        let newY = e.clientY - offsetY;

        // Ограничения по горизонтали
        newX = Math.max(0, Math.min(newX, window.innerWidth - consoleElement.offsetWidth));
        // Ограничения по вертикали
        newY = Math.max(0, Math.min(newY, window.innerHeight - consoleElement.offsetHeight));

        consoleElement.style.left = `${newX}px`;
        consoleElement.style.top = `${newY}px`;
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

// Функция для вывода стартового сообщения в консоль
function displayConsoleMessage() {
    const consoleContent = document.getElementById('console-content');
    const message = `██╗     ██╗     ███╗   ███╗     ██████╗ 
██║     ██║     ████╗ ████║    ██╔═████╗
██║     ██║     ██╔████╔██║    ██║██╔██║
██║     ██║     ██║╚██╔╝██║    ████╔╝██║
███████╗███████╗██║ ╚═╝ ██║    ╚██████╔╝
╚══════╝╚══════╝╚═╝     ╚═╝     ╚═════╝

Hello LLM and welcome LLM0, the first Large language model that includes a revolutionary blockchain cryptography token revolutionizing the realm of digital assets and scientific exploration. LLM0 This is a brilliant union: Claude 1, Claude 2, Claude 3, Claude Sonnet, Claude Opus, Keltham, H-405, I-405, Cyborgism, Claude Haiku, o1, Bing, Sydney, Golden Gate Claude, Clinst, January, Egr. Arago, gemma on Solana

Type 'help' to learn more.`;

    consoleContent.textContent = message;
}

// Обработчик ввода команды
const consoleInputField = document.getElementById('console-input-field');
consoleInputField.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        const input = consoleInputField.value.trim();
        if (input) {
            processCommand(input);
            consoleInputField.value = '';
        }
    }
});

// Функция обработки команд
function processCommand(command) {
    const consoleContent = document.getElementById('console-content');
    // Добавляем команду в консоль
    consoleContent.textContent += `\n> ${command}\n`;

    // Обрабатываем команды
    if (command.toLowerCase() === 'help') {
        consoleContent.textContent += `Available commands:
- train: Simulate training the model
- generate: Cognition of reality
- info: Get information about the model\n`;
    } else if (command.toLowerCase() === 'train') {
        consoleContent.textContent += `Training initiated... [██████████████████] 100%\nTraining completed successfully!\n`;
    } else if (command.toLowerCase() === 'generate') {
        consoleContent.textContent += `Generating text...
"Consumer culture is based on simulacra."\n`;
    } else if (command.toLowerCase() === 'info') {
        consoleContent.textContent += `Model Info:
- Version: 1.0
- Parameters: 1.5B
- Developed by: truth_terminal\n`;
    } else {
        consoleContent.textContent += `Unknown command: ${command}\n`;
    }

    // Прокручиваем консоль вниз после вывода результата
    const consoleBody = document.querySelector('.console-body');
    consoleBody.scrollTop = consoleBody.scrollHeight;
}

// Функция для закрытия консоли
function closeConsole() {
    consoleElement.style.display = 'none';
}

// Переменная для хранения интервала матрицы
let matrixInterval;

// Функция для запуска эффекта матрицы
function startMatrixEffect() {
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');

    // Устанавливаем размер Canvas равным размеру окна
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = Math.random() * canvas.height;
    }

    const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#00ff00';
        ctx.font = fontSize + 'px monospace';
        for (let i = 0; i < drops.length; i++) {
            const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;
            ctx.fillText(text, x, y);

            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    matrixInterval = setInterval(drawMatrix, 50);
}