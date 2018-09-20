class Bandeira {
    constructor(scene,x,y){
        this.scene = scene;
        this.sprite = this.scene.physics.add.sprite(x,y,"bandeira_branca",0);
            // console.log(scene.anims);
        this.sprite.anims.play('bandeira_branca_play',true);
        this.c_player = this.scene.physics.add.overlap(this.sprite, this.scene.player.sprite,this.ending,null,this.scene);
    }
    ending(bandeira, player){
        bandeira.anims.play('bandeira_verde_play',true);
        setTimeout(()=>{
            
        },
        2000);
    }
}
export default Bandeira