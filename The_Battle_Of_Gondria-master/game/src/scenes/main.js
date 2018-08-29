class main extends Phaser.Scene{

  constructor() {
    super({key: "MainMenu"});
}

config = {

}

preload(){
  this.load.image('btnJogar', '../../imagens/botoes/btnJogar.png');
  this.load.image('btnJogarPress', '../../imagens/botoes/btnJogar.png');
  this.load.image('btnAjuda', '../../imagens/botoes/btnJogar.png');
  this.load.image('btnAjudaPress', '../../imagens/botoes/btnJogar.png');
}

create() {

    var jogarBtn = this.add.image(960, 120, "btnJogar").setInteractive();
    var ajudaBtn = this.add.image(960, 180, "btnAjuda").setInteractive();

    menuNumber = -1;

    jogarBut.on("pointerdown", function (ev) {
        menuNumber = 0;
    });

    opcoesBut.on("pointerdown", function (ev) {
        menuNumber = 1;
    });

    ajudaBut.on("pointerdown", function (ev) {
        menuNumber = 2;
    });

    rankingBut.on("pointerdown", function (ev) {
        menuNumber = 3;
    });

    creditosBut.on("pointerdown", function (ev) {
        menuNumber = 4;
    });

    sairBut.on("pointerdown", function (ev) {
        menuNumber = 5;
    });
}

update() {
    if(menuNumber===0){
        this.scene.start("Jogar");
    }
    else if (menuNumber===1){
        this.scene.start("OpcoesMenu");
    }
    else if (menuNumber===2){
        this.scene.start("AjudaMenu");
    }
    else if (menuNumber===3){
        this.scene.start("RankingMenu");
    }
    else if (menuNumber===4){
        this.scene.start("CreditosMenu");
    }
    else if (menuNumber===5){
        this.scene.start("");
    }
}

}