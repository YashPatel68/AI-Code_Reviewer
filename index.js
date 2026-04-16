const canvas = document.getElementById('blackboardCanvas');
const ctx = canvas.getContext('2d');

// Drawing variables
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Event listeners for drawing
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

// Color and thickness changes
document.getElementById('colorPicker').addEventListener('input', (e) => {
    ctx.strokeStyle = e.target.value;
});

document.getElementById('thicknessSlider').addEventListener('input', (e) => {
    ctx.lineWidth = e.target.value;
});

// Eraser and Clear
document.getElementById('eraseBtn').addEventListener('click', () => {
    ctx.globalCompositeOperation = 'destination-out';
});

document.getElementById('clearBtn').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'source-over'; // Reset after clearing
});