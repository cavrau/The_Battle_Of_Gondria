class Slimes {
    constructor(scene,camada1) {
        this.scene = scene;
        const anims = scene.anims;
        let spawns = this.scene.spawns;
        this.array = this.scene.physics.add.group();
        for (let i = 0; i < spawns.length; i++) {
            if (spawns[i].name === "Spawn_Slime_Verde") {
                let slime = this.array.create(spawns[i].x, spawns[i].y, 'slime_verde');
                slime.setScale(1.5);
                slime.lifes = 2;
                slime.cor = "verde";
                slime.isHit = { right: false, left: false };
                slime.isDead = false
            }
            if (spawns[i].name === "Spawn_Slime_Azul") {
                let slime = this.array.create(spawns[i].x, spawns[i].y, 'slime_azul');
                slime.lifes = 3;
                slime.cor = "azul";
                slime.isHit = { right: false, left: false };
                slime.isDead = false
                // slime.setScale(1.7);
            }
            if (spawns[i].name === "Spawn_Slime_Vermelho") {
                let slime = this.array.create(spawns[i].x, spawns[i].y, 'slime_vermelho');
                slime.lifes = 4;
                slime.cor = "vermelho";
                // slime.setScale(2.0);
                slime.isHit = { right: false, left: false };
                slime.isDead = false
            }
        }
       
        //Cria a colisão do slime com a layer 1
        this.scene.physics.add.collider(this.array, camada1);
        this.c_player = this.scene.physics.add.collider(this.array, this.scene.player.sprite, this.slimeHit, null, this.scene);
        this.scene.colisao = false;
    }

    slimeHit(player, slime) {

        if (player.x - slime.x <= 0) {
            slime.setVelocityX(200);
        } else {
            slime.setVelocityX(-200);
        }
        slime.setVelocityY(-200);
        player.setVelocityX(0);
        if (slime.body.velocity.x <= 0) {
            player.setVelocityX(200);
        } else {
            player.setVelocityX(-200);
        }

        player.setVelocityY(-150);
        this.player.lifes -= 1;
        console.log(this.player.lifes + ' - player slime hit');
        this.player.hit.play();
        this.colisao = true;

    }

    update(player) {
        this.player = player;
        for (let i = 0; i < this.array.children.entries.length; i++) {

            let slime = this.array.children.entries[i];

            if (slime.isHit.left && slime.lifes > 0) {
                slime.anims.play("slime_" + slime.cor + "_hit_left", true);
                setTimeout(() => {
                    slime.isHit.left = false;
                }, 466)
            } else if (slime.isHit.right) {
                slime.anims.play("slime_" + slime.cor + "_hit_right", true);
                setTimeout(() => {
                    slime.isHit.right = false;
                }, 466)
            } else if (slime.x - player.x < 150 && slime.x - player.x > 0) {
                if (slime.body.onFloor()) {
                    this.scene.slime_sound.play();
                    slime.anims.play('slime_' + slime.cor + '_jump_left', true);
                    slime.setVelocityX(-80);
                    slime.setVelocityY(-200);
                }
            } else if (slime.x - player.x > -150 && slime.x - player.x < 0) {
                if (slime.body.onFloor()) {
                    this.scene.slime_sound.play();
                    slime.anims.play('slime_' + slime.cor + '_jump_right', true);
                    slime.setVelocityX(80);
                    slime.setVelocityY(-200);
                }
            } else {
                slime.setTexture('slime_' + slime.cor, 0)
                slime.setVelocityX(0);
            }
            if (slime.lifes == 0) {

                if (slime.isHit.left) {
                    slime.anims.play("slime_" + slime.cor + "_hit_left", true);
                } else if (slime.isHit.right) {
                    slime.anims.play("slime_" + slime.cor + "_hit_right", true);
                }   

                slime.isDead = true;
                setTimeout(() => {
                    this.atualizaPontuacao();
                    slime.destroy();
                }, 466)


            }
            if (slime.y > 490) {
                slime.destroy();
            }
        }

        
    }

    atualizaPontuacao(){
        for(let i = 0; i < this.array.children.entries.length; i++){

            let slime = this.array.children.entries[i];

            if(slime.isDead == true){

                if (slime.cor == 'vermelho') {
                    this.scene.player.score += 60;
                } else if (slime.cor == 'azul') {
                    this.scene.player.score += 40;
                } else {
                    this.scene.player.score += 20;
                }
                slime.isDead = false;
            }

        }
    }

}
export default Slimes;