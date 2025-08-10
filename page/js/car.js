const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// 車の状態
const car = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  angle: 0,
  speed: 0,
  maxSpeed: 10,
  acceleration: 0.2,
  friction: 0.05,
  steering: 0.04,
  width: 40,
  height: 20
};

// キー入力管理
const keys = {};
document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

function update() {
  // 前進・ブレーキ
  if (keys["ArrowUp"]) {
    car.speed += car.acceleration;
  } else if (keys["ArrowDown"]) {
    // ブレーキ：後退せず減速のみ
    if (car.speed > 0) {
      car.speed -= car.acceleration * 2; // ブレーキは強めに
      if (car.speed < 0) car.speed = 0;
    }
  } else {
    // 自然減速
    if (car.speed > 0) car.speed -= car.friction;
    if (car.speed < 0) car.speed += car.friction;
    if (Math.abs(car.speed) < car.friction) car.speed = 0;
  }

  // スピード制限
  car.speed = Math.max(0, Math.min(car.maxSpeed, car.speed)); // 後退禁止

  // ステアリング
  if (Math.abs(car.speed) > 0.1) {
    const steeringEffect = car.steering * (Math.abs(car.speed) / car.maxSpeed);
    if (keys["ArrowLeft"]) {
      car.angle -= steeringEffect;
    }
    if (keys["ArrowRight"]) {
      car.angle += steeringEffect;
    }
  }

  // 移動
  car.x += Math.cos(car.angle) * car.speed;
  car.y += Math.sin(car.angle) * car.speed;
}

function drawCar() {
  ctx.save();
  ctx.translate(car.x, car.y);
  ctx.rotate(car.angle);
  ctx.fillStyle = "yellow";
  ctx.fillRect(-car.width / 2, -car.height / 2, car.width, car.height);
  ctx.fillStyle = "red";
  ctx.fillRect(10, -5, 5, 10); // 前方マーカー
  ctx.restore();
}

function gameLoop() {
  update();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCar();
  requestAnimationFrame(gameLoop);
}

gameLoop();