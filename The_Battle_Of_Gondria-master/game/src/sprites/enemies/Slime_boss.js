class Slime_boss{
    constructor(scene,data){
        for (let i = 0; i < data.length; i++) {
            if(data[i].name==='Spawn_Slime_Boss'){
                this.boss = scene.physics.add.sprite(data[i].x,data[i].y,'slime_verde');
                this.boss.setScale(5);
            }
        }
    
    }
}
export default Slime_boss;