class MainMenu extends Phaser.Scene{

  constructor() {
    super({key: "MainMenu"});
}


preload(){
  this.load.image('btnJogar', 'assets/images/botoes/btnJogar.png');
  this.load.image('btnJogarPress', 'assets/images/botoes/btnJogarPress.png');
//   this.load.image('btnAjuda', 'assets/imagens/botoes/btnJogar.png');
//   this.load.image('btnAjudaPress', 'assets/imagens/botoes/btnJogar.png');
}


create() {
    
    this.jogarBtn = this.add.image(432, 160, "btnJogar").setInteractive();
    var ajudaBtn = this.add.image(432, 220, "btnAjuda").setInteractive();


    this.jogarBtn.on("pointerdown", function () {
        let btn = this;
        btn.setTexture("btnJogarPress");
        setTimeout(()=> {
            btn.setTexture("btnJogar");
            this.scene.scene.start('MenuFases');
        },150)
    });
    // opcoesBut.on("pointerdown", function (ev) {
    //     menuNumber = 1;
    // });

    ajudaBtn.on("pointerdown", function (ev) {
        this.menuNumber = 2;
    });

    // rankingBut.on("pointerdown", function (ev) {
    //     menuNumber = 3;
    // });

    // creditosBut.on("pointerdown", function (ev) {
    //     menuNumber = 4;
    // });

    // sairBut.on("pointerdown", function (ev) {
    //     menuNumber = 5;
    // });
}

update() {
   
}

}
export default MainMenu;