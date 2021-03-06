import Sprite from './Sprite';
// import Weapon from './Weapon';

export default class Player extends Sprite{
  constructor(game, spriteName, xCoord, yCoord, playerNumber){
    super(game, spriteName, xCoord, yCoord);
    this.playerNumber = playerNumber;
    this.game = game;

    // ------ Animations -------
    this.setAnimation(
      'move',
      [6, 7, 8, 9],
      10, true
    );
    this.setAnimation(
      'swing',
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 27, 27, 27, 27, 27, 27, 6],
      60, false
    );
    this.setAnimation(
      'fly',
      [18], 60, true
    );

    // default controls
    this.controls = {
      left: {
        keys: null,
      },
      right: {
        keys: null
      },
      attack: {
        keys: null,
        timeCount: 0,
      },
      jump: {
        keys: null,
      }
    };

    this.direction = {
      up: false,
      down: false,
      left: false,
      right: true,
    };

    this.lives = 3;
    this.jumpCounter = 2;

    this.setPhysics(true);
    this.setDefault();

    switch(spriteName){
      case 'smashbotSword':
        this.setAnchor(0.31, 0.5);
        this.sprite.body.setSize(68, 166, 70, 127);
      break;

      case 'smashbotLightsaber':
        this.setAnchor(0.34, 0.5);
        this.sprite.body.setSize(68, 166, 70, 144);
      break;
      //(sprite.body.offset.x + sprite.body.width) / 2

      case 'smashbotFlyswatter':
        this.setAnchor(0.34, 0.5);
        this.sprite.body.setSize(68, 166, 70, 126);
      break;

      default:  // for 'smashbotHammer':
      this.setAnchor(0.27, 0.5);
      this.sprite.body.setSize(68, 166, 44, 94); // hitBox ( widthOfHitbox, heightOfHitbox ,topLeftXOfRobotWithinImage, topLeftYOfRobotWithinImage )
      break;
    }

    this.sprite.scale.setTo(0.5);

    this.sprite.events.onOutOfBounds.add(function(){
      this.finalPosition = this.getPosition();
    }, this);

  }

  // default move
  move(direction){
    switch(direction){
      case 'left':
        this.setDirection('left');
        this.sprite.animations.play('move');
        break;

      case 'right':
        this.setDirection('right');
        this.sprite.animations.play('move');
        break;

      case 'swing':
        this.sprite.animations.play('swing');
        break;

      default:
        this.sprite.body.velocity.x = 0;
        // this.sprite.animations.stop();
        break;
    }
  }

  // attack(){
  //   this.sprite.animations.play('swing');
  // }

  setColor(color) {
    if (color === 'hit') {
      this.sprite.tint = 14683454;
    } else {
    const playerColors = [16777215, 877024, 14731021, 769044];  //  brown, blue, yellow, green
    this.sprite.tint = playerColors[this.playerNumber - 1];
    }
  }

  setGravity(num){
    this.sprite.body.gravity.y = num;
  }

  setDirection(direction){
    switch (direction){
      case 'left':
        this.direction.left = true;
        this.direction.right = false;
        this.sprite.scale.x = -0.5;
        // if (this.sprite.children[0].name === 'hitBoxes') this.sprite.children[0].scale.x = -1;
        break;

      case 'right':
        this.direction.right = true;
        this.direction.left = false;
        this.sprite.scale.x = 0.5;
        // if (this.sprite.children[0].name === 'hitBoxes') this.sprite.children[0].scale.x = 1;
        break;
    }
  }


  getDirection(){
    for ( var key in this.direction){
      if (this.direction[key]){
        return key;
      }
    }
    return null;
  }

  stop(){
    this.sprite.body.velocity.x = 0;
  }


  getPosition(){
    return {x: this.sprite.x, y: this.sprite.y};
  }

  resetJumps(){
    this.jumpCounter = 2;
  }

  explodePlayer() {
    const position = this.getPosition();
    this.sprite.kill();
    const explodingSmashbot = this.game.add.sprite(position.x - 300, position.y - 300, 'explodingSmashbot');
    explodingSmashbot.animations.add('explode', [0, 1, 2, 3]);
    explodingSmashbot.animations.play('explode', 5, false, true);
  }

  updateAnimationState(){
  }

}
