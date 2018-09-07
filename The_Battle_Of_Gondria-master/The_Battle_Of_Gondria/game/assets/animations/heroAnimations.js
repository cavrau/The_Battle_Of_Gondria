class heroAnimations extends Phaser.Scene {

  constructor() {
    super({ key: "heroAnimations" });
    let hero;
  }


  preload() {

    this.load.spritesheet({
      key: 'hero',
      url: '../images/heroi.png',
      frameConfig: {
        frameWidth: 60,
        frameHeight: 84
      }
    });

  }


  create() {

    let anims, leftWalk, rightWalk, stoped, atack;


    this.rightWalk = {
      key: 'rightWalk',
      frames: this.anims.generateFrameNumbers('heroi', { start: 0, end: 3 }),
      frameRate: 12,
      repeat: -1
    }

    this.stoped = {
      key: 'stoped',
      frames: this.anims.generateFrameNumbers('heroi', { start: 4, end: 5 }),
      frameRate: 12,
      repeat: -1
    }

    this.leftWalk = {
      key: 'leftWalk',
      frames: this.anims.generateFrameNumbers('heroi', { start: 6, end: 9 }),
      frameRate: 12,
      repeat: -1
    }

    this.atack = {
      key: 'atack',
      frames: this.anims.generateFrameNumbers('heroi', { start: 10, end: 13 }),
      frameRate: 12,
      repeat: -1
    }

    this.hero = this.anims.create(leftWalk);
    this.hero = this.anims.create(rightWalk);
    this.hero = this.anims.create(stoped);
    this.hero = this.anims.create(atack);


  }

  update() {

  }

}
export default heroAnimations;