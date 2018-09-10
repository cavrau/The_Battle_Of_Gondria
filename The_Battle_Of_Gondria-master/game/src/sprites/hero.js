class Hero extends Phaser.GameObjects.Sprite {
  constructor(){
    super({key: 'hero'});
    
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

    let anims, config;

    this.config = {
      key: 'rightWalk',
      frames: this.anims.generateFrameNumbers('heroi', { start: 0, end: 3 }),
      frameRate: 12,
      repeat: -1
    }

    this.config = {
      key: 'stoped',
      frames: this.anims.generateFrameNumbers('heroi', { start: 4, end: 5 }),
      frameRate: 12,
      repeat: -1
    }

    this.config = {
      key: 'leftWalk',
      frames: this.anims.generateFrameNumbers('heroi', { start: 6, end: 9 }),
      frameRate: 12,
      repeat: -1
    }

    this.config = {
      key: 'atack',
      frames: this.anims.generateFrameNumbers('heroi', { start: 10, end: 13 }),
      frameRate: 12,
      repeat: -1
    }

    this.anims.create(config);
    console.log(config);

    // this.hero.add.image(300, 400, 'hero');
    // this.hero.anims.play('atack');
  }

  update() {

  }
} export default Hero;