export default class Player {

  constructor(scene, x, y) {
    this.scene = scene;

    // Criação das animações apartir da spritesheet
    const anims = scene.anims;

    //Animação - andar para esquerda
    anims.create({
      key: 'sprite_hero_left',
      frames: anims.generateFrameNumbers('sprite_hero', { start: 6, end: 9 }),
      frameRate: 4,
      yoyo: true,
      repeat: -1
    });

    //Animação - andar para direita
    anims.create({
      key: 'sprite_hero_right',
      frames: anims.generateFrameNumbers('sprite_hero', { start: 0, end: 3 }),
      frameRate: 4,
      yoyo: true,
      repeat: -1
    });

    //Animação - atacar
    anims.create({
      key: 'sprite_hero_z',
      frames: anims.generateFrameNumbers('sprite_hero', { start: 10, end: 13 }),
      frameRate: 1,
    });

    //Animação - interagir
    anims.create({
      key: 'sprite_hero_c',
      frames: anims.generateFrameNumbers('sprite_hero', { start: 4, end: 5 }),
      frameRate: 2,
      yoyo: true,
      repeat: -1
    });

    // Criação da física que a sprite terá na fase
    this.sprite = scene.physics.add.sprite(x, y, "sprite_hero", 0);

    //Criação dos botões que irão fazer a movimentação da sprite
    const { LEFT, RIGHT, UP, Z } = Phaser.Input.Keyboard.KeyCodes;
    this.keys = scene.input.keyboard.addKeys({
      left: LEFT,
      right: RIGHT,
      up: UP,
      atack: Z
    });

  }


  update() {
    const { keys, sprite } = this;

    /*Ao apertar a seta a esquerda o personagem se move a direção
    e ativa o método de animção coerente com a direção */
    if (keys.left.isDown) {

      sprite.setVelocityX(-120);
      sprite.anims.play("sprite_hero_left", true);

      /*Ao apertar a seta a direita o personagem se move a direção
    e ativa o método de animção coerente com a direção */
    } else if (keys.right.isDown) {

      sprite.setVelocityX(120);
      sprite.anims.play("sprite_hero_right", true);

      /*Se nenhum botão for precionado, o personagem fica
      parado e seta uma textura de parado*/
    } else {

      sprite.setVelocityX(0);
      // sprite.setTexture("sprite_hero", 5);
      sprite.anims.play("sprite_hero_z", true);

    }

    /*Caso a seta para cima seja ativada o personagem é
    deslocado para cima do eixo Y "Pulando" */
    if (this.sprite.body.onFloor() && (keys.up.isDown)) {
      sprite.setVelocityY(-230);
    }

    /*Caso o botão de Z seja ativado o ataque do heroi é ativado */
    if (keys.atack.isDown) {
      //
    }

  }

}

