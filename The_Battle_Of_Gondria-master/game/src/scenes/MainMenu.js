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

    this.jogarBtn = this.add.sprite(432, 160, "btnJogar").setInteractive();
    var ajudaBtn = this.add.image(432, 220, "btnAjuda").setInteractive();

    this. menuNumber = -1;

    this.jogarBtn.on("pointerdown", function () {
        let btn = this;
        btn.setTexture("btnJogarPress");
        setTimeout(()=> {
            btn.setTexture("btnJogar");
        },150)
        this.menuNumber = 0;
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
    if(this.menuNumber===0){
        this.scene.start("Jogar");
    }
    else if (this.menuNumber===1){
        this.scene.start("OpcoesMenu");
    }
    else if (this.menuNumber===2){
        this.scene.start("AjudaMenu");
    }
    else if (this.menuNumber===3){
        this.scene.start("RankingMenu");
    }
    else if (this.menuNumber===4){
        this.scene.start("CreditosMenu");
    }
    else if (this.menuNumber===5){
        this.scene.start("");
    }
}

}
export default MainMenu;