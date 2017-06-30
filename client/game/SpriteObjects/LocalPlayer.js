import Player from './Player';

export class LocalPlayer extends Player(game, spriteName, xCoord, yCoord){
  constructor(){
    super(game, spriteName, xCoord, yCoord);
  }

  move(direction){
    switch(direction){
      case 'left':
        this.sprite.body.moveLeft(500);
        this.setDirection('left');
        this.sprite.animations.play('left');
        break;

      case 'right':
        this.sprite.body.moveRight(500);
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
    this.sprite.body.moveUp(300)
  }

}
