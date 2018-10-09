class Soldados {
    constructor(scene, camada1) {
        this.scene = scene;
        let spawns = this.scene.spawns;
        this.array = this.scene.physics.add.group();
        for (let i = 0; i < spawns.length; i++) {
            if (spawns[i].name === "spawn_soldado") {

                let soldado = this.array.create(spawns[i].x, spawns[i].y, 'soldado');
                soldado.setScale(0.75);
                soldado.lifes = 3;
                soldado.jump = 0;
                soldado.isHit = {
                    right: false,
                    left: false
                };
                soldado.isDead = false;
                soldado.canHit = true;
                soldado.canMove = true;
            } 
        }
        this.scene.physics.add.collider(this.array, camada1);
        
        this.c_player = this.scene.physics.add.collider(this.array, this.scene.player.sprite, this.goblinHit, null, this.scene);
    }
}
export default Soldados;