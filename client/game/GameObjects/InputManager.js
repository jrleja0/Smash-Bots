//game = this.game, option = {......}
export default class InputManager{
  constructor(game){
    this.game = game,
    this.player = null;
  }

  init(player){
    this.player = player;
  }

  update(){
    const controls = this.player.controls;
    if (controls.left.keys && this.isDown(controls.left.keys[0])){
      if (controls.attack.keys && this.isDown(controls.attack.keys[0])) {
        this.player.attack(false);
      } else {
        this.player.move('left');
      }
    }
    else if (controls.right.keys && this.isDown(controls.right.keys[0])){
      if (controls.attack.keys && this.isDown(controls.attack.keys[0])) {
        this.player.attack(true);
      } else {
        this.player.move('right');
      }
    }
    else {
      this.player.stop();
    }


    const jumpKey = this.game.input.keyboard.addKey(Phaser.Keyboard.U);
    jumpKey.onDown.add((U) => {
      if (jumpKey.justDown) {
      this.player.jumpCounter -= 1;
      }
      if (this.player.jumpCounter >= 0 ) {
        this.player.jump();
        console.log(this.player.jumpCounter);
      }
    })

    const attackKey = this.game.input.keyboard.addKey(Phaser.Keyboard.L);
    attackKey.onDown.add((L) => {
      const swingRightTrue = this.player.direction.right;
      this.player.attack(swingRightTrue);
    })
    // if (controls.attack.keys && this.isDown(controls.attack.keys[0])){
    //   this.player.attack();
    // }
    // else {
    //   this.player.sprite.animations.play('move')
    // }
    // });
  }

  isDown(keyCode){
    return this.game.input.keyboard.isDown(Phaser.Keyboard[keyCode]);
  }
}
