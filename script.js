var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var Pointer = /** @class */ (function (_super) {
    __extends(Pointer, _super);
    function Pointer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Pointer.prototype.draw = function () {
        c.beginPath();
        c.arc(mouse.x, mouse.y, this.r_x, 0, Math.PI * 2);
        c.filter = "blur(0px)";
        c.fillStyle = 'white';
        c.fill();
    };
    return Pointer;
}(Circle));
var circles = [];
function init() {
    // document.body.style.cursor = 'none';
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
    var purpleCircle = new Circle(300, 350, 600, 300, 400, fullY, 600, fullY + 200, 0.2, 0.2, Color.vector[1]);
    var purple2Circle = new Circle(1, 600, 600, 1, 600, 600, fullX, fullY, 1, 1, Color.vector[1]);
    var redCircle = new Circle(700, 800, 1000, 200, 200, 200, fullX, 0, 0.2, 0, Color.vector[2]);
    var redPurpleCircle = new Circle(1200, 1300, 1500, 500, 500, 700, fullX, 0, 0.2, 0.2, Color.vector[1]);
    var pointerCircle = new Pointer(12, 10, 18, 10, 10, 10, 0, 0, 0.1, 0.1, 'white');
    circles.push(purpleCircle);
    circles.push(greenCircle);
    circles.push(purple2Circle);
    circles.push(redPurpleCircle);
    circles.push(redCircle);
    // circles.push(pointerCircle);
    animation();
}
function animation() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    circles.forEach(function (circle) { return circle.run(); });
    requestAnimationFrame(animation);
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
//# sourceMappingURL=script.js.map
