(function () {
    // color choices
    const fills = [ "255, 255, 190", 
                    "255, 255, 250", 
                    "255, 85, 0",
                    "255, 15, 20"
                ];
    const numParticles = 90;
    var header,
        canvas,
        ctx,
        width,
        height,
        particles = [];

    function init() {
        header = document.getElementById("particle-header");
        canvas = document.getElementById("canvas");
        canvas = document.createElement("canvas");
        header.append(canvas);
        ctx = canvas.getContext("2d");

        window.addEventListener("resize", handleResize);
        handleResize();
        addParticles();
        window.requestAnimationFrame(render);
    }

    function addParticles() {
        const size = 3;
        for (let i = 1; i <= numParticles; i++) {
            var color = fills[Math.floor(Math.random() * fills.length)];
            console.log(`rgba(${color}, ${randomNumber(0.01, 0.2)})`);
            particles.push(
                new Particle({
                    startX: Math.random() * width,
                    startY: Math.random() * height,
                    size: randomNumber(0.3, size),
                    vy: randomNumber(-0.6, -0.1),
                    vx: 0,
                    id: i,
                    fillStyle: `rgba(${color}, ${randomNumber(0.08, 0.2)})`,
                })
            );
        }
    }

    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(function (p) {
            p.draw();
        });
        window.requestAnimationFrame(render);
    }

    /**
     *  Particle 'class'
     * @param {object} config object
     */
    function Particle(config) {
        this.x = config.startX;
        this.y = config.startY;
        this.vy = config.vy;
        this.vx = config.vx;
        this.size = config.size;
        this.fillStyle = config.fillStyle || "rgba(255,255,255,.3)";
    }

    /**
     * Draw particle
     */
    Particle.prototype.draw = function () {
        this.vx = clamp(this.vx + randomNumber(-0.1, 0.1), -0.3, 0.3);
        this.y += this.vy;
        this.x += this.vx;

        if (this.y < -this.size) {
            this.y = height + this.size;
        }
        if (this.x < -this.size) {
            this.x = width + this.size;
        }
        if (this.x > width + this.size) {
            this.x = -this.size;
        }

        ctx.fillStyle = this.fillStyle;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    };

    
    function clamp(number, min, max) {
        return Math.max(min, Math.min(number, max));
    }
    function randomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }
    
    function handleResize(e) {
        width = canvas.width = header.clientWidth;
        height = canvas.height = header.clientHeight;
    }
    
    document.addEventListener("DOMContentLoaded", init);

})();
