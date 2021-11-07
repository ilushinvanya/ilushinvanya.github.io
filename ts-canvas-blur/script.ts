let canvas: HTMLCanvasElement;
let c: CanvasRenderingContext2D;
// const circleCount = window.innerWidth / 9;
const circleCount = 4;
const mouse = { x: null, y: null };
let maxRadius = 200;
// const maxRadius = window.innerWidth;

const Color = {
    vector: ["#25b671", "#652497", "#f7a501"],
    getRandom: () => {
        return Color.vector[Math.floor(Math.random() * Color.vector.length)];
    }
};

class Circle {
    r;

    constructor(
        public r_min = randomNumber(maxRadius * 0.9, 20),
        public x = randomNumber(canvas.width, r_min),
        public y = randomNumber(canvas.height, r_min),
        public dx = randomNumber(4, -2, [0]),
        public dy = randomNumber(4, -1, [0]),
        public color = Color.getRandom()
    ) {
        this.draw();
        this.r = r_min;
    }

    side() {
        return {
            right: this.x + this.r,
            left: this.x - this.r,
            bottom: this.y + this.r,
            top: this.y - this.r
        };
    }

    draw() {
        // const innerRadius = 100, outerRadius = 200;
        // const gradient = c.createRadialGradient(this.x, this.y, innerRadius, this.x, this.y, outerRadius);
        // gradient.addColorStop(0, this.color);
        // gradient.addColorStop(1, '#454698');
        c.beginPath();
        // c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        c.ellipse(this.x, this.y, this.r, maxRadius, Math.PI, 0, Math.PI * 2);
        c.fillStyle = this.color;
        // c.fillStyle = gradient;
        // c.filter = 'blur(60px)';
        c.fill();
    }

    run() {
        // detect collision
        const sideRight = this.side().right > canvas.width;
        const sideLeft = this.side().left < 0;
        const sideBottom = this.side().bottom > canvas.height;
        const sideTop =  this.side().top < 0;

        if (sideRight || sideLeft)
            this.dx *= -1;
        if (sideBottom || sideTop)
            this.dy *= -1;


        // increase size
        // if (
        //     // (mouse.x != mouse.y) != 0 &&
        //     this.side().left - mouse.x < 50 &&
        //     mouse.x - this.side().right < 50 &&
        //     this.side().top - mouse.y < 50 &&
        //     mouse.y - this.side().bottom < 50 &&
        //     this.r < maxRadius
        // )
        //     this.r += 3;
        // else if (this.r > this.r_min) this.r -= 1;

        // change position
        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }
}

class GreenCircle extends Circle {
    run() {

        const sideRight = this.side().right > canvas.width / 2;
        const sideLeft = this.side().left < 0;
        const sideBottom = this.side().bottom > canvas.height / 2;
        const sideTop =  this.side().top < 0;

        if (sideRight || sideLeft)
            this.dx *= -1;
        if (sideBottom || sideTop)
            this.dy *= -1;


        // increase size
        // if (
        //     // (mouse.x != mouse.y) != 0 &&
        //     this.side().left - mouse.x < 50 &&
        //     mouse.x - this.side().right < 50 &&
        //     this.side().top - mouse.y < 50 &&
        //     mouse.y - this.side().bottom < 50 &&
        //     this.r < maxRadius
        // )
        //     this.r += 3;
        // else if (this.r > this.r_min) this.r -= 1;

        // change position

        this.color = Color.vector[0];
        // this.x += this.dx;
        // this.y += this.dy;
        if(this.dx > 0) {
            this.r += 1
            maxRadius += 1
        } else {
            this.r -= 1
            maxRadius -= 1
        }


        super.draw();
    }
}

class Class extends Circle {

}


let circles: Circle[] = [];

function init() {
    // setting up canvas
    // document.body.innerHTML = "<canvas id='canvas'></canvas>";
    canvas = this.document.getElementById("canvas");
    c = canvas.getContext("2d");
    this.resetCanvas();
    animation();

    // adding circles
    // for (let i = circleCount; i > 0; i--) {
    //     circles.push(new Circle(200));
    // }
    circles.push(new GreenCircle(100,150,150));
}

function animation() {
    // clear canvas
    c.clearRect(0, 0, canvas.width, canvas.height);

    // animation
    circles.forEach((circle) => circle.run());

    // callback
    requestAnimationFrame(animation);
}

// ## utility functions
function resetCanvas() {
    c.canvas.width = window.innerWidth;
    c.canvas.height = window.innerHeight;
}

function randomNumber(max = 1, min = 0, forbidden: number[] = []): number {
    let res;

    do {
        res = Math.floor(min + Math.random() * (max - min));
    } while (forbidden.some((num) => num == res));

    return res;
}

// ## event handlers
window.addEventListener("load", init);
window.addEventListener("resize", resetCanvas);
window.addEventListener("mousemove", function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    //   console.log(mouse);
});
