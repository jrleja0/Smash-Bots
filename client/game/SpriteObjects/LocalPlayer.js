import Player from './Player';

export default class LocalPlayer extends Player{
  constructor(game, spriteName, xCoord, yCoord){
    super(game, spriteName, xCoord, yCoord);
    this.controls = {
      left: {
        keys: ["LEFT"],
      },
      right: {
        keys: ["RIGHT"],
      },
      attack:{
        keys:["F"],
        timeCount: 0,
      },
      jump:{
        keys:["SPACEBAR"],
      }
    }
  }

  move(direction){
    switch(direction){
      case 'left':
        this.sprite.body.velocity.x = -500;
        this.setDirection('left');
        this.sprite.animations.play('left');
        console.log("^^^^^^^", this.endGame)
        //i think the game is still running
        break;

      case 'right':
        this.sprite.body.velocity.x = 500;
        this.setDirection('right');
        this.sprite.animations.play('right');
        break;

      default:
        this.sprite.body.velocity.x = 0;
        this.sprite.animations.stop();
        break;
    }
  }

  jump(){
    this.sprite.body.velocity.y = -320
  }

}
