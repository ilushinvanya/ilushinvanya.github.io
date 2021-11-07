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
// const circleCount = window.innerWidth / 9;
var circleCount = 4;
var mouse = { x: null, y: null };
var maxRadius = 200;
// const maxRadius = window.innerWidth;
var Color = {
    vector: ["#25b671", "#652497", "#f7a501"],
    getRandom: function () {
        return Color.vector[Math.floor(Math.random() * Color.vector.length)];
    }
};
var Circle = /** @class */ (function () {
    function Circle(r_min, x, y, dx, dy, color) {
        if (r_min === void 0) { r_min = randomNumber(maxRadius * 0.9, 20); }
        if (x === void 0) { x = randomNumber(canvas.width, r_min); }
        if (y === void 0) { y = randomNumber(canvas.height, r_min); }
        if (dx === void 0) { dx = randomNumber(4, -2, [0]); }
        if (dy === void 0) { dy = randomNumber(4, -1, [0]); }
        if (color === void 0) { color = Color.getRandom(); }
        this.r_min = r_min;
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.color = color;
        this.draw();
        this.r = r_min;
    }
    Circle.prototype.side = function () {
        return {
            right: this.x + this.r,
            left: this.x - this.r,
            bottom: this.y + this.r,
            top: this.y - this.r
        };
    };
    Circle.prototype.draw = function () {
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
    };
    Circle.prototype.run = function () {
        // detect collision
        var sideRight = this.side().right > canvas.width;
        var sideLeft = this.side().left < 0;
        var sideBottom = this.side().bottom > canvas.height;
        var sideTop = this.side().top < 0;
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
    };
    return Circle;
}());
var GreenCircle = /** @class */ (function (_super) {
    __extends(GreenCircle, _super);
    function GreenCircle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GreenCircle.prototype.run = function () {
        var sideRight = this.side().right > canvas.width / 2;
        var sideLeft = this.side().left < 0;
        var sideBottom = this.side().bottom > canvas.height / 2;
        var sideTop = this.side().top < 0;
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
        if (this.dx > 0) {
            this.r += 1;
            maxRadius += 1;
        }
        else {
            this.r -= 1;
            maxRadius -= 1;
        }
        _super.prototype.draw.call(this);
    };
    return GreenCircle;
}(Circle));
var Class = /** @class */ (function (_super) {
    __extends(Class, _super);
    function Class() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Class;
}(Circle));
var circles = [];
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
    circles.push(new GreenCircle(100, 150, 150));
}
function animation() {
    // clear canvas
    c.clearRect(0, 0, canvas.width, canvas.height);
    // animation
    circles.forEach(function (circle) { return circle.run(); });
    // callback
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