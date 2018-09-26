class Goblins {
    constructor(scene,camada1){
        this.scene = scene;
        let spawns  = this.scene.spawns;
        this.array = this.scene.physics.add.group();
        console.log('hey');
        for(let i =0 ;i<spawns.length;i++){
            if (spawns[i].name === "spawn_Goblin") {
                
                let goblin = this.array.create(spawns[i].x, spawns[i].y, 'goblin');
                goblin.setScale(0.75);
                goblin.lifes = 4;
                goblin.isHit = {
                    right: false,
                    left: false
                };
                goblin.isDead = false;
                goblin.canHit = true;

            }
        }
        this.scene.physics.add.collider(this.array, camada1);
        this.c_player = this.scene.physics.add.collider(this.array, this.scene.player.sprite, this.goblinHit,null,this.scene);
    }
    goblinHit(){
    }
}
export default Goblins;