class Slimes {
constructor(scene){
    this.scene = scene;
    const anims = scene.anims;
    let spawns = this.scene.spawns;
    this.array = this.scene.physics.add.group();
    for (let i = 0; i < spawns.length; i++) {
        if (spawns[i].name === "Spawn_Slime_Verde") {
            let slime = this.array.create(spawns[i].x,spawns[i].y, 'slime_verde');
            slime.setScale(1.5);
            slime.lifes = 2;
        }
        if (spawns[i].name === "Spawn_Slime_Azul") {
            let slime = this.array.create(spawns[i].x, spawns[i].y, 'slime_azul');
            slime.lifes = 3;
            // slime.setScale(1.7);
        }
        if (spawns[i].name === "Spawn_Slime_Vermelho") {
            let slime = this.array.create(spawns[i].x, spawns[i].y, 'slime_vermelho');
            slime.lifes = 4;
            // slime.setScale(2.0);
        }
        
    }
    //animacao pular esquerda
    anims.create({
        key:"slime_jump_left",
        frames: anims.generateFrameNumbers('slime_verde',{start:0, end:19}),
        frameRate:15,
        repeat:-1
    })
    //Cria a colisão do slime com a layer 1
    this.scene.physics.add.collider(this.array, this.scene.layer1);
    this.c_player = this.scene.physics.add.collider(this.array, this.scene.player.sprite,this.slimeHit,null,this.scene);
    this.scene.colisao=false;
}

slimeHit(player,slime){
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
    player.vidas -= 1;
    this.colisao = true;
}

update(player){
    for (let i = 0; i < this.array.children.entries.length; i++) {
        if (this.array.children.entries[i].x - player.x < 150 && this.array.children.entries[i].x - player.x > 0) {
            if (this.array.children.entries[i].body.onFloor()) {
                this.array.children.entries[i].anims.play('slime_jump_left',true);
                this.array.children.entries[i].setVelocityX(-80);
                this.array.children.entries[i].setVelocityY(-200);
            }
        } else if (this.array.children.entries[i].x - player.x > -150 && this.array.children.entries[i].x - player.x < 0) {
            if (this.array.children.entries[i].body.onFloor()) {
                this.array.children.entries[i].setVelocityX(80);
                this.array.children.entries[i].setVelocityY(-200);
            }
        } else {
            this.array.children.entries[i].setTexture('slime_verde',0)
            this.array.children.entries[i].setVelocityX(0);
        }
        if (this.array.children.entries[i].lifes == 0) {
            this.array.children.entries[i].destroy();
        }
        if(this.array.children.entries[i].y>490){
            this.array.children.entries[i].destroy();
        }
    }
}
}
export default Slimes;