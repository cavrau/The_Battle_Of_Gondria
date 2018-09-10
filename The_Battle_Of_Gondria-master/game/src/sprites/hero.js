class Hero{
  constructor(conf){
   this.scene = conf.scene;
   this.sprite = this.scene.physics.add.sprite(conf.x,conf.y,conf.texture);
    
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
    anims = this.scene.anims;
    this.config = {
      key: 'right-walk',
      frames:this.scene.anims.generateFrameNumbers('hero', { start: 0, end: 3 }),
      frameRate: 12,
      repeat: -1
    }

    this.config = {
      key: 'stoped',
      frames: this.scene.anims.generateFrameNumbers('hero', { start: 4, end: 5 }),
      frameRate: 12,
      repeat: -1
    }

    this.config = {
      key: 'left-walk',
      frames: this.scene.anims.generateFrameNumbers('hero', { start: 6, end: 9 }),
      frameRate: 12,
      repeat: -1
    }

    this.config = {
      key: 'attack',
      frames: this.scene.anims.generateFrameNumbers('hero', { start: 10, end: 13 }),
      frameRate: 12,
      repeat: -1
    }

    this.scene.anims.create(config);
    console.log(config);

    // this.hero.add.image(300, 400, 'hero');
    // this.hero.anims.play('atack');
  }

  update() {

  }
} export default Hero;