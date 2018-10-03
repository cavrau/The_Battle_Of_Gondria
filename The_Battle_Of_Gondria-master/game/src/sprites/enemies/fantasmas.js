class Fantasmas {
    constructor(cena){
        this.scene = cena;
        let spawns = this.scene.spawns;
        this.array = this.scene.physics.add.group();
        for (let i = 0; i < spawns.length; i++) {
            if (spawns[i].name === "spawn_fantasma") {
                let fantasma = this.array.create(spawns[i].x, spawns[i].y, 'fantasma');
                fantasma.body.allowGravity = true;
                console.log(fantasma)
                // goblin.setScale(2);

            }
        }
    }
}
export default Fantasmas;