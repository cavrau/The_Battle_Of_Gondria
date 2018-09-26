class Bandeira {
    constructor(scene,x,y,player){
        this.player = player;
        this.scene = scene;
        this.sprite = this.scene.physics.add.sprite(x,y,"bandeira_branca",0);
            // console.log(scene.anims);
            
        this.sprite.anims.play('bandeira_branca_play',true);
        this.c_player = this.scene.physics.add.overlap(this.sprite, this.scene.player.sprite,this.ending,null,this.scene);
    }

    ending(bandeira, player){
        bandeira.anims.play('bandeira_verde_play',true);
        this.player.deletaIntervalo();
        if(!this.ended){
            setTimeout(()=>{
                this.scene.start('Level_1_boss',{player: this.player});
            },
            2000);
        }
        this.ended = true;
    }
}
export default Bandeira