let canvas: HTMLCanvasElement;
let c: CanvasRenderingContext2D;
const circleCount = 1;
const mouse = { x: null, y: null };
let maxRadius = 200;

const Color = {
    vector: ["#25b671", "#652497", "#f7a501"],
    getRandom: () => {
        return Color.vector[Math.floor(Math.random() * Color.vector.length)];
    }
};

class Circle {
    r;

    constructor(
        public r_x_min = randomNumber(maxRadius * 0.9, 20),
        public r_x = randomNumber(maxRadius * 0.9, 20),
        public r_x_max = randomNumber(maxRadius * 0.9, 20),
        public r_y_min = randomNumber(maxRadius * 0.9, 20),
        public r_y = randomNumber(maxRadius * 0.9, 20),
        public r_y_max = randomNumber(maxRadius * 0.9, 20),
        public x = randomNumber(canvas.width, r_x),
        public y = randomNumber(canvas.height, r_x),
        public dx = randomNumber(4, -2, [0]),
        public dy = randomNumber(4, -1, [0]),
        public color = Color.getRandom()
    ) {
        this.draw();
    }

    draw() {
        c.beginPath();
        c.ellipse(this.x, this.y, this.r_x, this.r_y, Math.PI, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.fill();
    }

    run() {
        if(this.dx > 0 && this.r_x >= this.r_x_max) this.dx *= -1;
        if(this.dx < 0 && this.r_x <= this.r_x_min) this.dx *= -1;

        if(this.dy > 0 && this.r_y >= this.r_y_max) this.dy *= -1;
        if(this.dy < 0 && this.r_y <= this.r_y_min) this.dy *= -1;

        this.r_y += this.dy;
        this.r_x += this.dx;

        // change position
        // this.x += this.dx;
        // this.y += this.dy;

        this.draw();
    }
}

class Pointer extends Circle {
    draw() {
        c.beginPath();
        c.arc(mouse.x, mouse.y, this.r_x, 0, Math.PI * 2);
        c.fillStyle = 'white';
        c.fill();
    }
}

let circles: Circle[] = [];

function init() {
    // document.body.style.cursor = 'none';
    canvas = this.document.getElementById("canvas");
    c = canvas.getContext("2d");
    this.resetCanvas();
    const fullX = canvas.width;
    const fullY = canvas.height;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const greenParams = {
        r_x_min: fullX / 8,
        r_x: fullX / 7,
        r_x_max: fullX / 6,

        r_y_min: fullY / 2,
        r_y: fullY,
        r_y_max: fullY,
    }

    const redParams = {
        r_x_min: fullX / 2,
        r_x: fullX / 3,
        r_x_max: fullX / 3,

        r_y_min: fullY / 4,
        r_y: fullY / 4,
        r_y_max: fullY / 4,
    }

    const deltaRedPurple = 400;
    const redPurpleParams = {
        r_x_min: redParams.r_x_min + deltaRedPurple,
        r_x: redParams.r_x + deltaRedPurple,
        r_x_max: redParams.r_x_max + deltaRedPurple,

        r_y_min: redParams.r_y_min + deltaRedPurple,
        r_y: redParams.r_y + deltaRedPurple,
        r_y_max: redParams.r_y_max + deltaRedPurple,
    }

    const greenCircle = new Circle(
        greenParams.r_x_min,
        greenParams.r_x,
        greenParams.r_x_max,
        greenParams.r_y_min,
        greenParams.r_y,
        greenParams.r_y_max,
        0,
        fullY,
        0.3,
        0.3,
        Color.vector[0]
    );
    const purpleCircle = new Circle(400, 500, 600, 400, 500, fullY, centerX, fullY + 200, 0.2, 0.2, Color.vector[1])
    const purple2Circle =   new Circle(100, 600, 600, 100, 600, 600, fullX, fullY, 1, 1, Color.vector[1])

    const redCircle = new Circle(
        redParams.r_x_min,
        redParams.r_x,
        redParams.r_x_max,
        redParams.r_y_min,
        redParams.r_y,
        redParams.r_y_max,
        fullX,
        0,
        0.3,
        0.3,
        Color.vector[2]
    )
    const redPurpleCircle = new Circle(
        redPurpleParams.r_x_min,
        redPurpleParams.r_x,
        redPurpleParams.r_x_max,
        redPurpleParams.r_y_min,
        redPurpleParams.r_y,
        redPurpleParams.r_y_max,
        fullX,
        0,
        0.3,
        0.3,
        Color.vector[1]
    )

    const pointerCircle = new Pointer(12, 10, 18, 10, 10, 10, 0, 0, 0.1, 0.1, 'white')

    circles.push(purpleCircle);
    circles.push(greenCircle);
    circles.push(purple2Circle);
    circles.push(redPurpleCircle);
    circles.push(redCircle);
    circles.push(pointerCircle);
    animation();
}

function animation() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    circles.forEach((circle) => circle.run());
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
    mouse.x = e.pageX;
    mouse.y = e.pageY;
    // console.log(e);
});

// const metaTag = document.querySelector('meta[name="theme-color"]');
// let hue = 0;
// function animate() {
//     hue++;
//     if (hue === 361) {
//         hue = 0;
//     }
//     metaTag.setAttribute('content', 'hsl(' + hue + ',100%,50%)');
// }
// setInterval(animate, 16);
