// import { Container, Sprite } from 'pixi.js';
// import * as PIXI from "pixi.js";

export default function moveMario(app) {
    const marioContainer = new PIXI.Container();
    app.stage.addChild(marioContainer);

    const marioStepAssets = ["marioStep1", "marioStep2", "marioStep3", "marioStep4"];

    for (let i=0; i< 4; i++) {
        const marioStepAsset = marioStepAssets[i];
        const marioStep = PIXI.Sprite.from(marioStepAsset);

        marioStep.anchor.set(0.5);
    }
}