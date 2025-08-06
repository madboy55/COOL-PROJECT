const fan = document.getElementById("fan");
let rotationSpeed = 0;
let rotateDegree = 0;
let interval = null;

function rotateFan() {
  rotateDegree += rotationSpeed;
  fan.style.transform = `rotate(${rotateDegree}deg)`;
}

function turnOn() {
  if (!interval) {
    interval = setInterval(rotateFan, 20);
  }
}

function turnOff() {
  clearInterval(interval);
  interval = null;
}

function setSpeed(level) {
  switch (level) {
    case 1:
      rotationSpeed = 3;
      break;
    case 2:
      rotationSpeed = 6;
      break;
    case 3:
      rotationSpeed = 12;
      break;
    case 4:
      rotationSpeed = 30;
  }
}
