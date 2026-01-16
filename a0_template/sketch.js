let lastMinute = -1;

function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 360, 100, 100);
    angleMode(DEGREES);
    noStroke();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    background(230, 20, 10);

    let h = hour();
    let m = minute();
    let s = second();
    let ms = millis();

    if (m !== lastMinute) {
        console.log("Minute: " + m);
        lastMinute = m;
    }

    translate(width / 2, height / 2);
    rotate(-90);
    let hourRadius = min(width, height) * 0.35;
    for (let i = 0; i < 12; i++) {
        push();
        rotate(i * 30);
        translate(hourRadius, 0);
        let h12 = h % 12;
        if (h12 === 0) h12 = 0;

        if (i === h12) {
            drawingContext.shadowBlur = 30;
            drawingContext.shadowColor = color(330, 80, 100);
            fill(330, 80, 100);
            ellipse(0, 0, 40 + sin(ms * 0.1) * 5);
        } else {
            drawingContext.shadowBlur = 0;
            fill(330, 40, 30);
            ellipse(0, 0, 15);
        }
        pop();
    }

    let minRadius = min(width, height) * 0.25;
    noFill();
    strokeWeight(20);
    strokeCap(ROUND);
    stroke(200, 30, 20);
    ellipse(0, 0, minRadius * 2, minRadius * 2);
    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = color(190, 80, 100);
    stroke(190, 80, 100);

    let minAngle = map(m, 0, 60, 0, 360);
    if (minAngle > 0) {
        arc(0, 0, minRadius * 2, minRadius * 2, 0, minAngle);
    }

    push();
    rotate(minAngle);
    translate(minRadius, 0);
    noStroke();
    fill(255);
    drawingContext.shadowBlur = 10;
    drawingContext.shadowColor = color(255);
    ellipse(0, 0, 10);
    pop();

    let secRadius = min(width, height) * 0.15;
    let secAngle = map(s, 0, 60, 0, 360);

    push();
    rotate(secAngle);
    translate(secRadius, 0);
    noStroke();
    drawingContext.shadowBlur = 15;
    drawingContext.shadowColor = color(40, 90, 100);
    fill(40, 90, 100);
    let pulse = map(sin(ms * 0.5), -1, 1, 0.8, 1.2);
    scale(pulse);
    rectMode(CENTER);
    rect(0, 0, 20, 20, 5);
    pop();
    drawingContext.shadowBlur = 0;
}