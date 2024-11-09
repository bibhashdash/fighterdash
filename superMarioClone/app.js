// import { Application, Assets } from 'pixi.js';
// import * as PIXI from 'pixi.js'


// Asynchronous IIFE
(async () => {

    const app = new PIXI.Application();
    await app.init({ background: '#ffffff', width: window.innerWidth - 50, height: 800 });
    app.canvas.style.border = "2px solid #000000";
    app.canvas.style.borderRadius = "16px";
    document.body.appendChild(app.canvas);
    await PIXI.Assets.load([
        "spritesheet/fighter.json",
        "spritesheet/fighterjumpup.json",
        "spritesheet/fighterjumpdown.json",
        "spritesheet/bomb.png",
        "spritesheet/cloud.png"
    ]);
    let obj = new PIXI.Graphics()
        .rect(0, 629, window.innerWidth, 4)
        .fill("#000000");
    app.stage.addChild(obj);
    window.addEventListener('resize', () => { app.renderer.resize(window.innerWidth, window.innerHeight); })

    const animationsWalk = PIXI.Assets.cache.get('spritesheet/fighter.json').data.animations;
    const animationsJumpUp = PIXI.Assets.cache.get('spritesheet/fighterjumpup.json').data.animations;
    const animationsJumpDown = PIXI.Assets.cache.get('spritesheet/fighterjumpdown.json').data.animations;
    const characterWalk = PIXI.AnimatedSprite.fromFrames(animationsWalk["walk"]);
    const characterJumpUp = PIXI.AnimatedSprite.fromFrames(animationsJumpUp["jump"]);
    const characterJumpDown = PIXI.AnimatedSprite.fromFrames(animationsJumpDown["jump"]);
    const bomb = PIXI.Sprite.from("spritesheet/bomb.png");
    const cloud = PIXI.Sprite.from("spritesheet/cloud.png");
    //    characterWalk.height = 50;
    //    characterWalk.width = 50;
    characterWalk.animationSpeed = 1 / 6;                     // 6 fps
    characterJumpUp.animationSpeed = 1 / 12;
    characterJumpDown.animationSpeed = 1 / 12;
    characterWalk.position.set(200, 250);
    characterJumpUp.position.set(200, 250);
    characterJumpDown.position.set(200, 200);
    bomb.position.set(window.innerWidth + 10, 150);
    cloud.position.set(window.innerWidth + 10, 10);
    cloud.width = 400;
    cloud.height = 200;
    characterWalk.play();
    characterJumpUp.play();
    characterJumpDown.play();
    characterJumpUp.loop = false;
    characterJumpDown.loop = false;

    app.stage.addChild(characterWalk);

    app.stage.addChild(cloud);
    // app.stage.addChild(bomb);
    console.log(characterJumpUp.height);


    app.ticker.add(ticker => {
        const speed = 1;
        cloud.x = (cloud.x - speed * ticker.deltaTime - 10);
        // bomb.x = (bomb.x - speed * ticker.deltaTime - 10);
        // if (bomb.y === character.y) console.log("hit the guy!");
        if (cloud.x < 0 - cloud.width) cloud.x = window.innerWidth + 10;
        // if (bomb.x < 0 - bomb.width) bomb.x = window.innerWidth + 10;
        window.addEventListener("keydown", (e) => {
            const characterPosn = characterWalk.y
            if (e.code === "Space") {
                // app.stage.removeChild(characterWalk)
                // app.stage.addChild(characterJumpUp);
                // characterJumpUp.y = characterJumpUp.y - speed * ticker.deltaTime;
                // console.log(characterJumpUp.y);
                // if (characterJumpUp.y < 250) {
                //     app.stage.removeChild(characterJumpUp);
                //     app.stage.addChild(characterJumpDown);
                //     characterJumpDown.y = characterJumpDown.y + speed * ticker.deltaTime;
                // }

                characterWalk.y  = characterWalk.y - speed * ticker.deltaTime;
                
            }
        })

        // window.addEventListener("keyup", e => {
        //     if (e.code === "Space") {
        //         app.stage.removeChild(characterJumpUp);
        //         app.stage.addChild(characterJumpDown);
        //         characterJumpDown.y = characterJumpDown.y + speed * ticker.deltaTime;
        //         if (characterJumpDown.y + characterJumpDown.height === obj.y) app.stage.addChild(characterWalk);
        //     };
        // })
    });

}
)();

