// Asynchronous IIFE
(async () => {

    const app = new PIXI.Application();
    await app.init({ background: '#ffffff', width: window.innerWidth - 50, height: 800 });
    app.canvas.style.border = "2px solid #000000";
    app.canvas.style.borderRadius = "16px";
    document.body.appendChild(app.canvas);
    await PIXI.Assets.load([
        "spritesheet/fighterwalk.json",
        "spritesheet/fighterhit.json",
        "spritesheet/fighterdeath.json",
        "spritesheet/time-bomb.png",
        "spritesheet/blast.png",
        "spritesheet/cloud.png"
    ]);
    let obj = new PIXI.Graphics()
        .rect(0, 629, window.innerWidth, 4)
        .fill("#000000");
    app.stage.addChild(obj);
    window.addEventListener('resize', () => { app.renderer.resize(window.innerWidth, window.innerHeight); })

    const animationsWalk = PIXI.Assets.cache.get('spritesheet/fighterwalk.json').data.animations;
    const animationsHit = PIXI.Assets.cache.get('spritesheet/fighterhit.json').data.animations;
    const animationsDeath = PIXI.Assets.cache.get('spritesheet/fighterdeath.json').data.animations;

    const characterWalk = PIXI.AnimatedSprite.fromFrames(animationsWalk["walk"]);
    const characterHit = PIXI.AnimatedSprite.fromFrames(animationsHit["fighter_hit"]);
    const characterDeath = PIXI.AnimatedSprite.fromFrames(animationsDeath["fighter_death"]);

    const bomb = PIXI.Sprite.from("spritesheet/time-bomb.png");
    bomb.width = 100;
    bomb.height = 100;
    const cloud = PIXI.Sprite.from("spritesheet/cloud.png");
    const blast = PIXI.Sprite.from("spritesheet/blast.png");
    blast.width = 150;
    blast.height = 150;
    blast.x = 200;
    blast.y = 400;
    characterWalk.animationSpeed = 1 / 6;                     // 6 fps
    characterHit.animationSpeed = 1 / 6;                     // 6 fps
    characterDeath.animationSpeed = 1 / 30;                     // 6 fps

    characterWalk.anchor.x = 0.5;
    characterWalk.anchor.y = 1;
    characterWalk.x = 200;
    characterWalk.y = 629;

    characterHit.anchor.x = 0.5;
    characterHit.anchor.y = 1;
    characterHit.x = 200;
    characterHit.y = 629;

    characterDeath.anchor.x = 0.5;
    characterDeath.anchor.y = 1;
    characterDeath.x = 200;
    characterDeath.y = 629;

    bomb.anchor.x = 0.5;
    bomb.anchor.y = 1;
    bomb.position.set(window.innerWidth + 10, 629);
    cloud.position.set(window.innerWidth + 10, 10);
    cloud.width = 400;
    cloud.height = 200;
    characterWalk.play();
    characterHit.play();
    characterDeath.play();
    characterHit.loop = false;
    characterDeath.loop = false;

    app.stage.addChild(characterWalk);

    app.stage.addChild(cloud);
    app.stage.addChild(bomb);

    let isJumping = false;
    let jumpForce = 15;
    let gravity = 5;
    let isKeyPressed = false;

    window.addEventListener("keydown", e => {
        if (e.code === "Space") {
            isKeyPressed = true;
        }
    })

    window.addEventListener("keyup", e => {
        if (e.code === "Space") {
            isKeyPressed = false;
        }
    })

    app.ticker.add(ticker => {
        characterWalk.vy = 0;
        let cloudSpeed = 5;
        let bombSpeed = 0.2;
        cloud.x = (cloud.x - cloudSpeed * ticker.deltaTime - 10);
        bomb.x = (bomb.x - bombSpeed * ticker.deltaTime - 10);       

        if (cloud.x < 0 - cloud.width) cloud.x = window.innerWidth + 10;
        if (bomb.x < 0 - bomb.width) bomb.x = window.innerWidth + 10;

        if (!isJumping && !isKeyPressed && characterWalk.y < 629) characterWalk.y += (gravity);

        if (isKeyPressed === true) {
            isJumping = true;
            characterWalk.vy = -jumpForce;
        } else if (isKeyPressed === false) {
            isJumping = false;
        }
        characterWalk.y += characterWalk.vy;
       
        if (characterWalk.y >= 629) {
            characterWalk.y = 629;
            isJumping = false;
            characterWalk.vy = 0;
        }
        const bombLeftEdge = bomb.x - (bomb.width/2);
        const bombTopEdge = bomb.y - bomb.height;
        const characterWalkBottomEdge = characterWalk.y;

        const characterWalkRightEdge = 200 + (characterWalk.width / 2)

        if ((parseInt(bombLeftEdge) < characterWalkRightEdge) && (characterWalkBottomEdge >= bombTopEdge)) {
            app.stage.removeChild(characterWalk);
            app.stage.removeChild(bomb);
            app.stage.addChild(characterDeath);
            app.stage.addChild(blast);
        }
    });
}
)();

