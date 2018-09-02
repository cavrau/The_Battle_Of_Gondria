class main extends Phaser.Scene{

  constructor() {
    super({key: "MainMenu"});
}

config = {

}

preload(){
  let btnJogar = this.load.image();
}

create() {
    this.add.image(640, 320, "background");
    //var  title = this.add.image(200, 200, "title"); reduce png size
    var jogarBut = this.add.image(960, 120, "jogarBut").setInteractive();
    var opcoesBut = this.add.image(960, 180, "opcoesBut").setInteractive();
    var ajudaBut = this.add.image(960, 240, "ajudaBut").setInteractive();
    var rankingBut = this.add.image(960, 300, "rankingBut").setInteractive();
    var creditosBut = this.add.image(960, 360, "creditosBut").setInteractive();
    var sairBut = this.add.image(960, 420, "sairBut").setInteractive();

    //Click on title easter egg - to do

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