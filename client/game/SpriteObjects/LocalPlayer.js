import Player from './Player';
import store from '../../store';
import { setAnimation } from '../../redux/game';
// import GameManager from './GameObjects/GameManager';

export default class LocalPlayer extends Player{
  constructor(game, spriteName, xCoord, yCoord, playerNumber){
    super(game, spriteName, xCoord, yCoord, playerNumber);
    this.animation = '';
    this.controls = {
      left: {
        keys: ["LEFT"],
      },
      right: {
        keys: ["RIGHT"],
      },
      attack:{
        keys:["SPACEBAR"],
        timeCount: 0,
      },
      jump:{
        keys:["W"],
      }
    }

    this.setGravity(1200);

}

  move(direction){
    switch(direction){
      case 'left':
        this.sprite.body.velocity.x = -500;
        this.setDirection('left');
        this.sprite.animations.play('move');
        break;

      case 'right':
        this.sprite.body.velocity.x = 500;
        this.setDirection('right');
        this.sprite.animations.play('move');
        break;

      case 'swing':
        this.sprite.animations.play('swing');
        break;

      default:
        this.sprite.body.velocity.x = 0;
        break;
    }
  }

  //creates hitboxes for swing
  attack(){
    const hitBoxR = this.sprite.children[0];
    const hitBoxL = this.sprite.children[1];
    hitBoxR.reset(50, -25);
    hitBoxL.reset(-40, -25);
    
    this.game.sound._sounds[2].play();
    // this.sprite.children.forEach(function(hitbox) {          
    //   hitbox.kill();
    // })
    // search all the hitboxes
    // for (var i = 0; i < this.sprite.children.length; i++){
    //   // if we find the hitbox with the “name” specified
    //   // if(gameManager.localPlayer.sprite.children[i].name === hitboxName){
    //     // reset it
    //     this.sprite.children[i].reset(150, -50);
    //   // }

    // console.log("=======>", swingRightTrue)
    // if (swingRightTrue){
    //     if (this.game.remote1) {
    //       this.game.physics.arcade.overlap(hitBoxR, this.game.remote1.sprite,
    //         this.overlapCallbackHit);
    //       this.game.physics.arcade.overlap(hitBoxL, this.game.remote1.sprite,
    //         this.overlapCallbackHit);
    // }
        // if (this.game.remote2) {
        // this.game.physics.arcade.overlap(hitBoxR, this.game.remote2.sprite, this.overlapCallbackHit);
        // this.game.physics.arcade.overlap(hitBoxL, this.game.remote2.sprite,
        //   this.overlapCallbackHit);
        // }
    // } else {
    //   // this.game.physics.arcade.collide(hitBoxL, enemy1);
    // }
  }

  jump(){
    this.sprite.body.velocity.y = -700;
    this.game.sound._sounds[1].play();
  }
  overlapCallbackHit(hitBox, enemy){
    // console.log('overlap')
    // enemy.isHit = true;
    // enemy.body.velocity.x = -5000;
  }
  setGravity(num){
    this.sprite.body.gravity.y = num;
  }

  updateAnimationState(){
    const controls = this.controls;
    const attackKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    attackKey.onDown.add((SPACEBAR) => {
      const swingRightTrue = this.direction.right;
      this.attack(swingRightTrue);
    });
    if (controls.left.keys && this.isDown(controls.left.keys[0])){
      // moving = true;
      this.animation = 'left';
      // this.sprite.animations.play('swing')
      // console.log("^^^^^^", attackKey.onDown)
      // if (attackKey.onDown) {
      //   this.sprite.animations.play('swing')
      // }
    }
    //   if (controls.attack.keys && this.isDown(controls.attack.keys[0])) {
    //     this.attack(false);
    //   } else {
    //     this.move('left');
    //   }
    // }
    else if (controls.right.keys && this.isDown(controls.right.keys[0])){
      // moving = true;
      // console.log("********", controls)
      this.animation = 'right';
    }

    //   if (controls.attack.keys && this.isDown(controls.attack.keys[0])) {
    //     this.attack(true);
    //   } else {
    //     this.move('right');
    //   }
    // }
    else {
      // console.log('hi', moving)
      this.animation = 'stop';
      //this.stop();
      // moving = false;
      // console.log('=====>', moving)
    }

    if (controls.attack.keys && this.isDown(controls.attack.keys[0])) {
      this.animation = 'swing'
    }


    const jumpKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    jumpKey.onDown.add((W) => {
      if (jumpKey.justDown) {
      this.jumpCounter -= 1;
      }
      if (this.jumpCounter >= 0 ) {
        this.jump()
      }
    });

  }
    regainControl() {
    const player = this;
    if (player.lives === 0 && player.damage === 0) {
      player.explodePlayer();
    } else {
      player.sprite.body.velocity.setTo(0, 0);
      player.setGravity(1200);
      this.game.input.enabled = true;
    }
  }

  isDown(keyCode){
    return this.game.input.keyboard.isDown(Phaser.Keyboard[keyCode]);
  }

}
