class Bandeira {
    constructor(scene,x,y){
        this.scene = scene;
        this.sprite = this.scene.physics.add.sprite(x,y,"bandeira_branca",0);
        const anims  =  scene.anims;
        anims.create({
            key: 'bandeira_branca_play',
            frames: anims.generateFrameNumbers('bandeira_branca', { start: 0, end: 3 }),
            frameRate: 5,
            repeat:-1,
            yoyo:false
        });
        anims.create({
            key: 'bandeira_verde_play',
            frames: anims.generateFrameNumbers('bandeira_verde', { start: 0, end: 3 }),
            frameRate: 5,
            repeat:-1,
            yoyo:true
        });
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