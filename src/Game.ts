/// <reference path="../node_modules/phaser/typescript/phaser.d.ts" />

module GameFromScratch {
    export class TitleScreenState extends Phaser.State {
        game: Phaser.Game;
        constructor() {
            super();
        }
        jetSprite: Phaser.Sprite;

        preload() {
            this.load.image("jet", "assets/images/jet.png");
        }
        create() {
            var image = <Phaser.Image><any>this.game.cache.getImage("jet");

            this.jetSprite = this.game.add.sprite(
                this.game.width / 2 - image.width / 2,
                this.game.height / 2 - image.height / 2,
                "jet");
            //this.jetSprite.anchor.set(0.5,0.5);
            //this.jetSprite.position.x = this.jetSprite.position.y = 0.0;
            this.input.onTap.addOnce(this.titleClicked,this); // <-- that um, this is extremely important
        }
        titleClicked (){
            this.game.state.start("GameRunningState");
        }
    }

    export class GameRunningState extends Phaser.State {
        constructor() {
            super();
        }
        textValue: Phaser.Text;
        updateCount: number;

        create() {
            var style = { font: "65px Arial", fill: "#ff0000", align: "center" };
            this.textValue = this.game.add.text(0, 0, "0", style);
            this.updateCount = 0;
        }

        update() {
            this.textValue.text = (this.updateCount++).toString();
        }

        render() {
            this.game.debug.text("This is drawn in render()", 0, 80);
        }
    }

    export class SimpleGame {
        game: Phaser.Game;

        constructor() {
            this.game = new Phaser.Game(800, 600, Phaser.WEBGL, 'content');

            this.game.state.add("GameRunningState", GameRunningState, false);
            this.game.state.add("TitleScreenState", TitleScreenState, false);
            this.game.state.start("TitleScreenState", true, true);
        }

    }
}

window.onload = () => {
    var game = new GameFromScratch.SimpleGame();
};