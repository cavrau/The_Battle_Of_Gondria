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
      frameRate: 8,
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

    // Criação da sprite na fase aplicando fisíca, vidas e pontuação
    this.sprite = this.scene.physics.add.sprite(x, y, "sprite_hero", 0);
    this.lifes = 4;
    this.sprite.score = 0;
    this.sprite.chave = 0;

    //Criação dos botões que irão fazer a movimentação da sprite
    const { LEFT, RIGHT, UP, Z, C } = Phaser.Input.Keyboard.KeyCodes;
    this.keys = scene.input.keyboard.addKeys({
      left: LEFT,
      right: RIGHT,
      up: UP,
      atack: Z,
      action: C
    });

  }


  //Método que cria os huds de visualização de vida, pontuação e tempo
  createHUD() {

    this.scene.hud_1 = this.scene.add.image(150, 40, 'hud_primario').setScrollFactor(0);

    // this.scoreText = this.scene.add.bitmapText(0, 0, 'myfont', '' + this.scoreText);

    this.scene.scoreLabel = this.scene.add.bitmapText(120, 5, 'myfont', '' + this.sprite.score, 32).setScrollFactor(0);

    this.scene.hud_1 = this.scene.add.image(794, 40, 'hud_secundario').setScrollFactor(0);
  }

  update(enemies, scene, alavanca, ponte, aldeao, casa, moedas) {

    let colisao = scene.colisao;
    const { keys, sprite } = this;
    if(this.vidas==0){
      this.isDead = true;
    }else if(this.sprite.y>540){
      this.isDead = true;
    }
    if(this.isDead==true){
      this.sprite.setVelocityX(0);
      sprite.setTexture("sprite_hero", 5);
      sprite.setTint(0xff0000);
      let jogarBtn = this.scene.add.image(this.scene.cameras.main.midPoint.x, 310, "btnJogar").setInteractive();
      jogarBtn.setScale(0.65);
      jogarBtn.on("pointerdown",()=>{
        this.scene.scene.restart();
      })
      // this.scene.
    }else{
      
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
        }, 200)
      }
      
      if (sprite.body.blocked.down && sprite.body.velocity.y < 1) {
        this.scene.c_layer2.active = false;
      } else {
        this.scene.c_layer2.active = true;
      }
      
      if (colisao == false) {
        /*Ao apertar a seta a esquerda o personagem se move a direção
        e ativa o método de animção coerente com a direção */
        if (keys.left.isDown && sprite.x > 8) {
          sprite.setVelocityX(-120);
          if (this.isAttacking == false) {
            sprite.anims.play("sprite_hero_left", true);
          }
          
          /*Ao apertar a seta a direita o personagem se move a direção
          e ativa o método de animção coerente com a direção */
        } else if (keys.right.isDown && sprite.x < 6040) {
          
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
          }
          
        }
        this.updateHUD();
        
        
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
        }, 500);
      }

      if (keys.action.isDown && colisao == false) {
        this.interaction(alavanca, ponte, aldeao, casa);
        setTimeout(() => {
          sprite.anims.play('sprite_hero_c');
        }, 400);
        
      }
      
    }
    }
  }
  //Método que faz a interação com as alavancas, com as portas e os aldeoes
  interaction(alavanca, ponte, aldeao, casa) {

    /*Pega a diferença da distancia entre o player e a alavanca */
    let alavancaX = alavanca[0].x - this.sprite.body.x;
    let alavancaY = alavanca[0].y - this.sprite.body.y;

    /*Caso a diferença da distância seja Y < 52 e X < 50 e X > 0
    a alavanca é atavida e é feita a construção da ponte */
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
              ponte.putTileAt(11, i, 11);
            }, i * j);
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

  //Método que atualiza a quantidade de vidas do jogador
  updateHUD() {

    /*Atualiza a pontuação do jogador */
    this.scene.scoreLabel.text = this.sprite.score;
    /*Verifica a vida do jogador */
    if (this.lifes == 3) {
      this.scene.life_1 = this.scene.add.image(137, 57, 'coracao_cheio').setScrollFactor(0);
      this.scene.life_2 = this.scene.add.image(173, 57, 'coracao_cheio').setScrollFactor(0);
      this.scene.life_3 = this.scene.add.image(209, 57, 'coracao_cheio').setScrollFactor(0);
      this.scene.life_4 = this.scene.add.image(246, 57, 'coracao_vazio').setScrollFactor(0);
    } else if (this.lifes == 2) {
      this.scene.life_1 = this.scene.add.image(137, 57, 'coracao_cheio').setScrollFactor(0);
      this.scene.life_2 = this.scene.add.image(173, 57, 'coracao_cheio').setScrollFactor(0);
      this.scene.life_3 = this.scene.add.image(209, 57, 'coracao_vazio').setScrollFactor(0);
      this.scene.life_4 = this.scene.add.image(246, 57, 'coracao_vazio').setScrollFactor(0);
    } else if (this.lifes == 1) {
      this.scene.life_1 = this.scene.add.image(137, 57, 'coracao_cheio').setScrollFactor(0);
      this.scene.life_2 = this.scene.add.image(173, 57, 'coracao_vazio').setScrollFactor(0);
      this.scene.life_3 = this.scene.add.image(209, 57, 'coracao_vazio').setScrollFactor(0);
      this.scene.life_4 = this.scene.add.image(246, 57, 'coracao_vazio').setScrollFactor(0);
    } else if (this.lifes == 0) {
      this.scene.life_1 = this.scene.add.image(137, 57, 'coracao_vazio').setScrollFactor(0);
      this.scene.life_2 = this.scene.add.image(173, 57, 'coracao_vazio').setScrollFactor(0);
      this.scene.life_3 = this.scene.add.image(209, 57, 'coracao_vazio').setScrollFactor(0);
      this.scene.life_4 = this.scene.add.image(246, 57, 'coracao_vazio').setScrollFactor(0);
    } else if (this.lifes == 4) {
      this.scene.life_1 = this.scene.add.image(137, 57, 'coracao_cheio').setScrollFactor(0);
      this.scene.life_2 = this.scene.add.image(173, 57, 'coracao_cheio').setScrollFactor(0);
      this.scene.life_3 = this.scene.add.image(209, 57, 'coracao_cheio').setScrollFactor(0);
      this.scene.life_4 = this.scene.add.image(246, 57, 'coracao_cheio').setScrollFactor(0);
    }



  }




}//FIM DA CLASSE PLAYER




