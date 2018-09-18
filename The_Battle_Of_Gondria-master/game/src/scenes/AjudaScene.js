class AjudaScene extends Phaser.Scene {

  constructor() {
    super({ key: "AjudaScene" });
  }


  preload() {

    

  }

  create() {

    var music = this.sound.add('menusMusic');

    // music.play();

    this.add.image(432, 240, 'bgAjuda');

    this.voltarBtn = this.add.image(785, 35, 'btnVoltar').setInteractive();
    this.voltarBtn.setScale(0.6);

    this.voltarBtn.on("pointerdown", function () {
      let btn = this;
      btn.setTexture("btnVoltarPress");
      setTimeout(() => {
        btn.setTexture("btnVoltar");
        this.scene.scene.start('MainMenu');
      }, 150)
    });
    let botaoUp = this.add.sprite(55, 120, 'setas').setScale(0.750);
    let botaoLeft = this.add.sprite(55, 240, 'setas').setScale(0.750);
    let botaoRight = this.add.sprite(55, 360, 'setas').setScale(0.750);
    let botaoZ = this.add.sprite(440, 120, 'setas').setScale(0.750);
    let botaoC = this.add.sprite(440, 240, 'setas').setScale(0.750);
    let botaoP = this.add.sprite(440, 360, 'setas').setScale(0.750);
    botaoUp.anims.play('up');
    botaoLeft.anims.play('left');
    botaoRight.anims.play('right');
    botaoZ.anims.play('keyZ');
    botaoC.anims.play('keyC');
    botaoP.anims.play('keyP');

    let heroUp = {
      key: 'heroUp',
      frames: this.anims.generateFrameNumbers('sprite_hero', { start: 0, end: 1 }),
      frameRate: 2,
      yoyo: true,
      repeat: -1
    };

    let heroLeft = {
      key: 'heroLeft',
      frames: this.anims.generateFrameNumbers('sprite_hero', { start: 0, end: 3 }),
      frameRate: 2,
      yoyo: true,
      repeat: -1
    };

    let heroRight = {
      key: 'heroRight',
      frames: this.anims.generateFrameNumbers('sprite_hero', { start: 6, end: 9 }),
      frameRate: 2,
      yoyo: true,
      repeat: -1
    };

    let heroZ = {
      key: 'heroZ',
      frames: this.anims.generateFrameNumbers('sprite_hero', { start: 10, end: 13 }),
      frameRate: 5,
      yoyo: true,
      repeat: -1
    };

    let heroC = {
      key: 'heroC',
      frames: this.anims.generateFrameNumbers('sprite_hero', { start: 4, end: 5 }),
      frameRate: 2,
      yoyo: true,
      repeat: -1
    };


    this.anims.create(heroUp);
    this.anims.create(heroLeft);
    this.anims.create(heroRight);
    this.anims.create(heroZ);
    this.anims.create(heroC);
    let heroBotaoUp = this.add.sprite(140, 120, 'sprite_hero');
    let heroBotaoLeft = this.add.sprite(140, 240, 'sprite_hero');
    let heroBotaoRight = this.add.sprite(140, 360, 'sprite_hero');
    let heroBotaoZ = this.add.sprite(510, 120, 'sprite_hero');
    let heroBotaoC = this.add.sprite(510, 240, 'sprite_hero');
    heroBotaoUp.anims.play('heroUp');
    heroBotaoLeft.anims.play('heroLeft');
    heroBotaoRight.anims.play('heroRight');
    heroBotaoZ.anims.play('heroZ');
    heroBotaoC.anims.play('heroC');

    this.add.image(290, 120, 'pular').setScale(0.6);
    this.add.image(290, 240, 'andarDireita').setScale(0.6);
    this.add.image(290, 360, 'andarEsquerda').setScale(0.6);
    this.add.image(680, 120, 'atacar').setScale(0.8);
    this.add.image(680, 250, 'interagir').setScale(0.7);
    this.add.image(600, 370, 'pausar').setScale(0.7);
  }

  update() {

  }

}
export default AjudaScene;
