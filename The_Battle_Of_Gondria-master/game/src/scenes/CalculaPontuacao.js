import BootScene from './BootScene.js';
class CalculaPontuacao extends Phaser.Scene {
    constructor() {
        super({
            key: 'CalculaPontuacao'
        });
    }
    init(data){
        
        this.pontuacao = data.pontuacao;
        this.segundos = data.secs;
    }

    preload() {
        this.load.image('btnInicio', 'assets/images/botoes/btnInicio.png');
        this.load.image('btnInicioPress', 'assets/images/botoes/btnInicioPress.png');

        this.load.image('pont', 'assets/images/menus/pontuacao.png');
        this.load.image('tempo', 'assets/images/menus/tempo.png');
    }

    create() {

        this.btnInicio = this.add.image(785, 35, 'btnInicio').setInteractive();
        this.btnInicio.setScale(0.6);

        this.btnInicio.on("pointerdown", function () {
            let btn = this;
            btn.setTexture("btnInicioPress");
            setTimeout(() => {
                btn.setTexture("btnInicio");
                this.scene.scene.start('MainMenu');
            }, 150)
        });

        let pontText;
        let timeText;
        let bdTime;

        // Tempo vem em segundos (s)

        this.add.image(432, 240, 'bgMenus');
        this.add.image(200, 200, 'pont');
        this.add.image(200, 300, 'tempo');


        pontText = this.add.text(370, 175, this.pontuacao, { fontSize: '45px', fill: '#000', fontStyle: 'italic' });
        timeText = this.add.text(290, 275, timeCont(this.segundos), { fontSize: '45px', fill: '#000', fontStyle: 'italic' });


    }

    timeCont(segundos) {
        let horas = Math.floor(segundos / 3600);
        console.log(horas);

        let minutos = Math.floor((segundos - (horas * 3600)) / 60);
        console.log(minutos);

        segundos = segundos - (horas * 3600) - (minutos * 60);
        console.log(segundos);

        // round seconds
        segundos = Math.round(segundos * 100) / 100
        console.log(segundos);

        let result = (horas < 10 ? "0" + horas : horas);
        result += ":" + (minutos < 10 ? "0" + minutos : minutos);
        result += ":" + (segundos < 10 ? "0" + segundos : segundos);
        return result;
    }

}

export default CalculaPontuacao;