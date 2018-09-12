export default class Player {

  constructor(scene, x, y) {
    this.isAttacking=false;
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
      repeat:1
    });

    //Animação - interagir
    anims.create({
      key: 'sprite_hero_c',
      frames: anims.generateFrameNumbers('sprite_hero', { start: 4, end: 5 }),
      frameRate: 1,
      yoyo: true,
      repeat: -1
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
    
    console.log(this.sprite.anims)
  }
  
  
  update(enemies,scene,objectInteraction) {

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
    if (sprite.body.blocked.down&&sprite.body.velocity.y<1) {
      this.scene.c_layer2.active = false;
  } else {
      this.scene.c_layer2.active = true;
  }
  if(colisao == false){
    /*Ao apertar a seta a esquerda o personagem se move a direção
    e ativa o método de animção coerente com a direção */
    if (keys.left.isDown&&sprite.x>8) {
      sprite.setVelocityX(-120);
      if(this.isAttacking==false){
        sprite.anims.play("sprite_hero_left", true);
      }
      
      /*Ao apertar a seta a direita o personagem se move a direção
      e ativa o método de animção coerente com a direção */
    } else if (keys.right.isDown) {

      sprite.setVelocityX(120);
      if(this.isAttacking==false){
        sprite.anims.play("sprite_hero_right", true);
      }

      /*Se nenhum botão for precionado, o personagem fica
      parado e seta uma textura de parado*/
    } else {

      sprite.setVelocityX(0);
      if(this.isAttacking==false){
        sprite.setTexture("sprite_hero", 5);
      }
      
    }
    
  }
    /*Caso a seta para cima seja ativada o personagem é
    deslocado para cima do eixo Y "Pulando" */
    if (sprite.body.onFloor() && (keys.up.isDown)) {
      sprite.setVelocityY(-230);
    }

    /*Caso o botão de Z seja ativado o ataque do heroi é ativado */
    if (keys.atack.isDown&&this.isAttacking==false) {
      sprite.anims.play("sprite_hero_z", true);
      this.checkHit(enemies.array);
      this.isAttacking=true;
      setTimeout(()=>{
        this.isAttacking=false;
      },500)
    }

    if(keys.action.isDown&&colisao==false){
      this.interaction(objectInteraction);
      if(this.isAttacking==false){
        sprite.anims.play("sprite_hero_c", true);
      }
    }
    
  }

  interaction(objectInteraction){

    // if(){

    // }

  }

  // método que checa se o jogabor bateu em algum inimigo
  checkHit(enemies) {
    for (let i = 0; i < enemies.children.entries.length; i++) {

        let enemy = enemies.children.entries[i];
        let xdistance = enemy.x - this.sprite.body.x;
        let ydistance = enemy.y - this.sprite.body.y;

        if ((ydistance < 45)) {
            if (xdistance < 65 && xdistance > 0) {
              enemy.lifes--;
              enemy.setVelocityX(140);
              enemy.setVelocityY(-130);
              enemy.isHit.left = true;
            } else if (xdistance < 0 && xdistance > -65) {
              enemy.lifes--;
              enemy.setVelocityX(-140);
              enemy.setVelocityY(-130);
              enemy.isHit.right = true;
            }
        }
    }
} 

  

}

