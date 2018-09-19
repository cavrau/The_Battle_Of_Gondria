export default class Player {

  constructor(scene, x, y) {
    this.isAttacking = false;
    this.isInteracting = false;
    this.hasInteracted = false;
    this.scene = scene;
    this.timermins = 0 ;
    this.timerhours = 0;
    this.timersecs = 0;
    this.menuIsSet = false;
    let data =  new Date();
    this.mins=0;
    this.secs= 0;
    // Criação das animações apartir da spritesheet
    const anims = scene.anims;
    this.morte = this.scene.sound.add('morte');
    this.espada = this.scene.sound.add('espada');
    this.hit  = this.scene.sound.add('hit');
    this.jump = this.scene.sound.add('jump');
    this.pegar = this.scene.sound.add('pegar');
    this.espada.setVolume(0.1);
    this.jump.setVolume(0.3);
    this.pegar.setVolume(0.1);
    this.hit.setVolume(0.1);
    // Criação da sprite na fase aplicando fisíca, vidas e pontuação
    this.sprite = this.scene.physics.add.sprite(x, y, "sprite_hero", 0);
    this.lifes = 4;
    this.sprite.score = 0;
    this.sprite.chave = 1;
    
    //Criação dos botões que irão fazer a movimentação da sprite
    const { LEFT, RIGHT, UP, Z, C,P } = Phaser.Input.Keyboard.KeyCodes;
    this.keys = scene.input.keyboard.addKeys({
      left: LEFT,
      right: RIGHT,
      up: UP,
      atack: Z,
      action: C,
      pause: P
    });
    
    
  }
  criaIntervalo(){
    this.intervalo = setInterval(()=>this.secs++,1000)
  }
  deletaIntervalo(){
    clearInterval(this.intervalo);
  }
  
  //Método que cria os huds de visualização de vida, pontuação e tempo
  createHUD() {
    
    this.scene.hud_1 = this.scene.add.image(150, 40, 'hud_primario').setScrollFactor(0);
    
    
    this.scene.scoreLabel = this.scene.add.bitmapText(120, 5, 'myfont', '' + this.sprite.score, 32).setScrollFactor(0);
    
    this.scene.hud_1 = this.scene.add.image(794, 40, 'hud_secundario').setScrollFactor(0);
    this.timeText = this.scene.add.bitmapText(750, 20, 'myfont', this.rmins+':'+this.timersecs,32).setScrollFactor(0);
  }

  timerFunc(){
    this.timer= this.timer +1;
    console.log(this.timer);
  }
  
  update(enemies, scene, alavanca, ponte, aldeao, casa, moedas) {
    
    let colisao = scene.colisao;
    const { keys, sprite } = this;
    if(keys.pause.isDown&&this.menuIsSet==false){
      this.scene.scene.pause(this.scene);
      this.scene.scene.run('MenuPause',[this,this.scene]);
      this.scene.scene.moveBelow(this.scene,'MenuPause');
      this.menuIsSet = true;
    }
    // else{
      //   console.log(this.keys.pause.isDown);
      //   setInterval(()=>{
        //     if(this.menuIsSet&&this.keys.pause.isDown){
          //       this.menuIsSet = false;
          //       this.scene.scene.stop('')
          //       this.scene.scene.resume('Level_1');
          //     }
          //   },
          //   1000
          //     );
          //   } 
          
          if(this.menuIsSet==false){
            if(this.secs>59){
              this.secs=0;
              this.mins++
              
            }
            if(this.lifes==0){
              this.isDead = true;
            }else if(this.sprite.y>540){
              this.isDead = true;
            }
            if(this.isDead==true){
              this.deletaIntervalo();
              this.sprite.setVelocityX(0);
              sprite.setTexture("sprite_hero", 5);
              sprite.setTint(0xff0000);
              let jogarBtn = this.scene.add.image(this.scene.cameras.main.midPoint.x, 310, "btnJogar").setInteractive();
              jogarBtn.setScale(0.65);
              jogarBtn.on("pointerdown",()=>{
                this.scene.scene.restart();
              })
              this.scene.physics.pause();
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
          this.jump.play();
          sprite.setVelocityY(-230);
        }
        
        /*Caso o botão de Z seja ativado o ataque do heroi é ativado */
        if (keys.atack.isDown && this.isAttacking == false) {
          sprite.anims.play("sprite_hero_z", true);
          this.checkHit(enemies.array);
          this.espada.play();
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
}
  //Método que faz a interação com as alavancas, com as portas e os aldeoes
  interaction(alavanca, ponte, aldeao, casa) {

    // console.log(ponte)
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
        let tileXinicial = ponte.pXi;
        let tileXfinal = ponte.pXf;
        
        for (i = tileXinicial; i <= tileXfinal; i++) {
          j = j + 3;
          (function (i) {
            setTimeout(function () {
              ponte.layer.putTileAt(10, i, ponte.pYcollision);
              ponte.layer.putTileAt(11, i, ponte.pYnCollision);
            }, i * j);
          })(i);

        }
      }
    }//Fim da Criação da ponte

    /*Parte que fará o jogador interagir com a casa*/
    let distanciaCasaX = casa.x - this.sprite.body.x;
    let distanciaCadaY = casa.y - this.sprite.body.y;
    // console.log(this.scene);
    // console.log(this.scene.scene);
    if(distanciaCadaY <= 64){
      // console.log(this);
      if((distanciaCasaX < 20) && (distanciaCasaX > -16) && (this.sprite.chave == 1)){

        alert("olaaaaaaaaaa mocoooo");
        this.scene.scene.start('Level_casa', {level_1_Scene:this.scene, player: this});
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
          // console.log(enemy.lifes);
          enemy.lifes--;
          enemy.setVelocityX(140);
          enemy.setVelocityY(-130);
        } else if (xdistance < 0 && xdistance > -75) {
          enemy.setVelocityX(-140);
          enemy.setVelocityY(-130);
          enemy.lifes--;
        }
      }
    }
  }

  //Método que atualiza a quantidade de vidas do jogador
  updateHUD() {

    /*Atualiza a pontuação do jogador */
    this.scene.scoreLabel.text = this.sprite.score;
    if(this.mins<10&&this.secs<10){
      this.timeText.text = '0'+this.mins+':0'+this.secs;
    }else if(this.mins<10){
      this.timeText.text = '0'+this.mins+':'+this.secs;
    }else{
      this.timeText.text = this.mins+':'+this.secs;
    }
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




