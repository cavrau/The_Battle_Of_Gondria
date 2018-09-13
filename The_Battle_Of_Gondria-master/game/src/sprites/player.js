export default class Player {

  constructor(scene, x, y) {
    this.isAttacking = false;
    this.isInteracting = false;
    this.hasInteracted = false;
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
      frameRate: 6,
      repeat: 1
    });

    //Animação - interagir
    anims.create({
      key: 'sprite_hero_c',
      frames: anims.generateFrameNumbers('sprite_hero', { start: 4, end: 5 }),
      frameRate: 1,
      yoyo: true,
      repeat: -1
    });

    /*Animações de interação */
    anims.create({
      key: 'alavanca_ativa',
      frames: anims.generateFrameNumbers('sprite_alavanca', { start: 0, end: 4 }),
      frameRate: 4
    });

    // Criação da física que a sprite terá na fase
    this.sprite = scene.physics.add.sprite(x, y, "sprite_hero", 0);

    //Criação dos botões que irão fazer a movimentação da sprite
    const { LEFT, RIGHT, UP, Z, C } = Phaser.Input.Keyboard.KeyCodes;
    this.keys = scene.input.keyboard.addKeys({
      left: LEFT,
      right: RIGHT,
      up: UP,
      atack: Z,
      action: C
    });

    // console.log(this.sprite.anims);
  }


  update(enemies, scene, alavanca, ponte, aldeao, casa) {

    // console.log(objectInteraction);

    let colisao = scene.colisao;
    const { keys, sprite } = this;

    // Checa a colisão com a layer 2 de blocos
    if (colisao == true) {
      enemies.c_player.active = false;
    } else {
      enemies.c_player.active = true;
    }

    if (colisao == true) {
      setTimeout(() => {
        if (sprite.body.onFloor()) {
          scene.colisao = false;
        }
      }, 500)
    }

    if (sprite.body.blocked.down && sprite.body.velocity.y < 1) {
      this.scene.c_layer2.active = false;
    } else {
      this.scene.c_layer2.active = true;
    }

    if (colisao == false) {
      /*Ao apertar a seta a esquerda o personagem se move a direção
      e ativa o método de animção coerente com a direção */
      if (keys.left.isDown) {

        sprite.setVelocityX(-120);
        if (this.isAttacking == false) {
          sprite.anims.play("sprite_hero_left", true);
        }

        /*Ao apertar a seta a direita o personagem se move a direção
        e ativa o método de animção coerente com a direção */
      } else if (keys.right.isDown) {

        sprite.setVelocityX(120);
        if (this.isAttacking == false) {
          sprite.anims.play("sprite_hero_right", true);
        }

        /*Se nenhum botão for precionado, o personagem fica
        parado e seta uma textura de parado*/
      } else {

        sprite.setVelocityX(0);
        if (this.isAttacking == false) {
          sprite.setTexture("sprite_hero", 5);
          setTimeout(() => {
            this.isAttacking = false;
            this.isInteracting = false;
          }, 400)
        }

      }

    }
    /*Caso a seta para cima seja ativada o personagem é
    deslocado para cima do eixo Y "Pulando" */
    if (sprite.body.onFloor() && (keys.up.isDown)) {
      sprite.setVelocityY(-230);
    }

    /*Caso o botão de Z seja ativado o ataque do heroi é ativado */
    if (keys.atack.isDown && this.isAttacking == false) {
      sprite.anims.play("sprite_hero_z", true);
      this.checkHit(enemies.array);
      this.isAttacking = true;
      setTimeout(() => {
        this.isAttacking = false;
      }, 400)
    }

    if (keys.action.isDown) {
      setTimeout(() => {
        sprite.anims.play("sprite_hero_c", true);
      }, 400);
      setTimeout(() => {
        this.interaction(alavanca,ponte, aldeao, casa);
      }, 400);

    }

  }

  interaction(alavanca, ponte, aldeao, casa) {

    let alavancaX = alavanca[0].x - this.sprite.body.x;
    let alavancaY = alavanca[0].y - this.sprite.body.y;

    console.log(alavancaX);
    console.log(alavancaY);
    if ((alavancaY < 72)) {
      if ((alavancaX < 50 && alavancaX > 0) && this.hasInteracted == false) {
        this.hasInteracted = true;
        alavanca[0].anims.play('alavanca_ativa');
        
        let i;
        let j = 2;
        for (i = 145; i <= 151; i++) {
          j = j + 3;
          (function (i) {
            setTimeout(function () {
              ponte.putTileAt(10, i, 12);
              ponte.putTileAt(11,i,11);
            },i*j);
          })(i);

        }
      }
    }

  }

  // método que checa se o jogabor bateu em algum inimigo
  checkHit(enemies) {
    for (let i = 0; i < enemies.children.entries.length; i++) {

      let enemy = enemies.children.entries[i];
      let xdistance = enemy.x - this.sprite.body.x;
      let ydistance = enemy.y - this.sprite.body.y;

      if ((ydistance < 72)) {
        if (xdistance < 75 && xdistance > 0) {
          console.log(enemy.lifes);
          enemy.lifes--;
          enemy.setVelocityX(140);
          enemy.setVelocityY(-130);
        } else if (xdistance < 0 && xdistance > -75) {
          enemy.setVelocityX(-140);
          enemy.setVelocityY(-130);
        }
      }
    }
  }



}

