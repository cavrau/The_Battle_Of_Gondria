class MenuFases extends Phaser.Scene{
constructor(){
    super({key:"MenuFases"})
}
preload(){
    this.load.image('btnFase1' , 'assets/images/botoes/btnFase1.png');
    this.load.image('btnFase1Press', 'assets/images/botoes/btnFase1Press.png');
    this.load.image('btnFase2' , 'assets/images/botoes/btnFase2.png');
    this.load.image('btnFase2Press', 'assets/images/botoes/btnFase2Press.png');
    this.load.image('btnFase3' , 'assets/images/botoes/btnFase3.png');
    this.load.image('btnFase3Press', 'assets/images/botoes/btnFase3Press.png');
    this.load.image('btnFase4' , 'assets/images/botoes/btnFase4.png');
    this.load.image('btnFase4Press', 'assets/images/botoes/btnFase4Press.png');
    this.load.image('btnVoltar' , 'assets/images/botoes/btnVoltar.png');
    this.load.image('btnVoltarPress', 'assets/images/botoes/btnVoltarPress.png');
}
create(){
    this.fase1 = this.add.image(432,80,'btnFase1').setInteractive();
    this.fase2 = this.add.image(432,197.5,'btnFase2Press').setInteractive();
    this.fase3 = this.add.image(432,315,'btnFase3Press').setInteractive();
    this.fase4 = this.add.image(432,432.5,'btnFase4Press').setInteractive();
    this.voltar = this.add.image(780,40,'btnVoltar').setInteractive();
    this.voltar.setScale(0.6);

    this.fase1.on('pointerdown',function(){
        let btn = this;
        btn.setTexture("btnFase1Press");
        setTimeout(()=> {
            btn.setTexture("btnFase1");
            this.scene.scene.start('Scene1_level1');
        },150);
    });
    this.voltar.on('pointerdown',function() {
        let btn = this;
        btn.setTexture("btnVoltarPress");
        setTimeout(()=> {
            btn.setTexture("btnVoltar");
            this.scene.scene.start('MainMenu');
        },150);
    })

}
update(){
    
}
}
export default MenuFases;