var canvas;
var c;
var circleCount = 1;
var mouse = { x: null, y: null };
var maxRadius = 200;
var Color = {
    vector: ["#25b671", "#652497", "#f7a501"],
    getRandom: function () {
        return Color.vector[Math.floor(Math.random() * Color.vector.length)];
    }
};
var Circle = /** @class */ (function () {
    function Circle(r_x_min, r_x, r_x_max, r_y_min, r_y, r_y_max, x, y, dx, dy, color) {
        if (r_x_min === void 0) { r_x_min = randomNumber(maxRadius * 0.9, 20); }
        if (r_x === void 0) { r_x = randomNumber(maxRadius * 0.9, 20); }
        if (r_x_max === void 0) { r_x_max = randomNumber(maxRadius * 0.9, 20); }
        if (r_y_min === void 0) { r_y_min = randomNumber(maxRadius * 0.9, 20); }
        if (r_y === void 0) { r_y = randomNumber(maxRadius * 0.9, 20); }
        if (r_y_max === void 0) { r_y_max = randomNumber(maxRadius * 0.9, 20); }
        if (x === void 0) { x = randomNumber(canvas.width, r_x); }
        if (y === void 0) { y = randomNumber(canvas.height, r_x); }
        if (dx === void 0) { dx = randomNumber(4, -2, [0]); }
        if (dy === void 0) { dy = randomNumber(4, -1, [0]); }
        if (color === void 0) { color = Color.getRandom(); }
        this.r_x_min = r_x_min;
        this.r_x = r_x;
        this.r_x_max = r_x_max;
        this.r_y_min = r_y_min;
        this.r_y = r_y;
        this.r_y_max = r_y_max;
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.color = color;
        this.draw();
    }
    Circle.prototype.draw = function () {
        c.beginPath();
        c.ellipse(this.x, this.y, this.r_x, this.r_y, Math.PI, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.filter = "blur(110px)";
        c.fill();
    };
    Circle.prototype.run = function () {
        if (this.dx > 0 && this.r_x >= this.r_x_max)
            this.dx *= -1;
        if (this.dx < 0 && this.r_x <= this.r_x_min)
            this.dx *= -1;
        if (this.dy > 0 && this.r_y >= this.r_y_max)
            this.dy *= -1;
        if (this.dy < 0 && this.r_y <= this.r_y_min)
            this.dy *= -1;
        this.r_y += this.dy;
        this.r_x += this.dx;
        // change position
        // this.x += this.dx;
        // this.y += this.dy;
        this.draw();
    };
    return Circle;
}());
var circles = [];
var be = Date.now(), fps = 0;
function init() {
    canvas = this.document.getElementById("canvas");
    c = canvas.getContext("2d");
    this.resetCanvas();
    var fullX = canvas.width;
    var fullY = canvas.height;
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;
    var greenParams = {
        r_x_min: fullX / 8,
        r_x: fullX / 7,
        r_x_max: fullX / 6,
        r_y_min: fullY / 2,
        r_y: fullY,
        r_y_max: fullY,
    };
    var greenCircle = new Circle(greenParams.r_x_min, greenParams.r_x, greenParams.r_x_max, greenParams.r_y_min, greenParams.r_y, greenParams.r_y_max, 0, fullY, 0.2, 0.2, Color.vector[0]);
    var purpleCircle = new Circle(300, 350, 600, 300, 400, fullY, 800, fullY + 200, 0.2, 0.2, Color.vector[1]);
    var purple2Circle = new Circle(1, 600, 600, 1, 600, 600, fullX, fullY, 1, 1, Color.vector[1]);
    var redCircle = new Circle(700, 800, 900, 200, 200, 400, fullX, 0, 0.2, 0.2, Color.vector[2]);
    var redPurpleCircle = new Circle(1000, 1100, 1200, 500, 500, 700, fullX, 0, 0.2, 0.2, Color.vector[1]);
    circles.push(greenCircle);
    circles.push(purpleCircle);
    circles.push(purple2Circle);
    circles.push(redPurpleCircle);
    circles.push(redCircle);
    animation();
}
function animation() {
    // clear canvas
    c.clearRect(0, 0, canvas.width, canvas.height);
    // animation
    circles.forEach(function (circle) { return circle.run(); });
    var now = Date.now();
    fps = Math.round(1000 / (now - be));
    be = now;
    var kFps = this.document.getElementById("kFps");
    var kpFps = this.document.getElementById("kpFps");
    // callback
    requestAnimationFrame(animation);
    if (fps < 35) {
        kFps.style.color = "red";
        kFps.textContent = fps;
    }
    if (fps >= 35 && fps <= 41) {
        kFps.style.color = "deepskyblue";
        kFps.textContent = fps + " FPS";
    }
    else {
        kFps.style.color = "black";
        kFps.textContent = fps + " FPS";
    }
    kpFps.value = fps;
}
// ## utility functions
function resetCanvas() {
    c.canvas.width = window.innerWidth;
    c.canvas.height = window.innerHeight;
}
function randomNumber(max, min, forbidden) {
    if (max === void 0) { max = 1; }
    if (min === void 0) { min = 0; }
    if (forbidden === void 0) { forbidden = []; }
    var res;
    do {
        res = Math.floor(min + Math.random() * (max - min));
    } while (forbidden.some(function (num) { return num == res; }));
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
// run()
// detect collision
// const sideRight = this.side().right > canvas.width;
// const sideLeft = this.side().left < 0;
// const sideBottom = this.side().bottom > canvas.height;
// const sideTop =  this.side().top < 0;
//
// if (sideRight || sideLeft)
//     this.dx *= -1;
// if (sideBottom || sideTop)
//     this.dy *= -1;
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
// side() {
//     return {
//         right: this.x + this.r,
//         left: this.x - this.r,
//         bottom: this.y + this.r,
//         top: this.y - this.r
//     };
// }
//# sourceMappingURL=script.js.map