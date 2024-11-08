import kaplay from "https://unpkg.com/kaplay@3001/dist/kaplay.mjs";

console.log('Hello world');
const PLAYER_SPEED = 1000;

kaplay({
  width: 720,
  height: 1280,
  letterbox: true,
});


scene('game', () => {
  loadSprite("bunny", "assets/Players/bunny1_stand.png");
  loadSprite("bunny_jump", "assets/Players/bunny1_jump.png");

  setGravity(1700);
  
  const bunny = add([sprite("bunny"), pos(center()), area(), body(), { speed: PLAYER_SPEED }]);
  
  add([
    rect(width(), 48),
    pos(0, height() - 48),
    outline(4),
    area(),
    body({ isStatic: true }),
    color(127, 200, 255),
    'platform'
  ]);
  
  bunny.onCollide("platform", () => {
    bunny.jump(1400);
  });
  
  bunny.onCollideEnd("platform", () => {
    bunny.use(sprite("bunny_jump"));
    wait(0.5, () => {
      bunny.use(sprite("bunny"));
    });
  });
  
  // optimize it
  onUpdate(() => {
    if (bunny.pos.x > width()) {
      bunny.pos.x = 0;
    } else if (bunny.pos.x < 0) {
      bunny.pos.x = width();
    }
  })
  
  onKeyDown("right", () => {
    bunny.move(bunny.speed, 0);
  })
  
  onKeyDown("left", () => {
    bunny.move(-bunny.speed, 0);
  })
})  

go('game');


