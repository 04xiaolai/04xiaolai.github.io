// script.js
// 五彩纸屑动画
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const confettiPieces = [];
const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeead'];

class Confetti {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.size = Math.random() * 10 + 5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speed = Math.random() * 3 + 2;
        this.angle = Math.random() * 360;
    }

    update() {
        this.y += this.speed;
        this.angle += 5;
        if (this.y > canvas.height) this.y = -10;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle * Math.PI / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
        ctx.restore();
    }
}

function initConfetti() {
    for (let i = 0; i < 80; i++) {
        confettiPieces.push(new Confetti());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettiPieces.forEach(confetto => {
        confetto.update();
        confetto.draw();
    });
    requestAnimationFrame(animate);
}

// 滚动动画触发
function checkScroll() {
    document.querySelectorAll('.content-block').forEach(block => {
        const blockTop = block.getBoundingClientRect().top;
        if (blockTop < window.innerHeight * 0.8) {
            block.classList.add('reveal');
        }
    });
}

// 初始化
window.addEventListener('load', () => {
    initConfetti();
    animate();
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // 初始检查
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});