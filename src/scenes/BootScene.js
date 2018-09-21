class BootScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'BootScene'
        });
    }
    preload() {

        const progress = this.add.graphics();
        this.load.on('progress', (value) => {
            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(0, this.sys.game.config.height / 2, this.sys.game.config.width * value, 60);
        });

        // this.load.on('complete',() =>{
        //     progress.destroy();
        //     this.scene.start('AjudaScene');
        // })
    
        this.load.on('complete', () => {
            progress.destroy();
            this.scene.start('MainMenu');
        })

        // this.load.on('complete',() =>{
        //     progress.destroy();
        //     this.scene.start('Level_1');
        // })
        this.load.bitmapFont('myfont', 'assets/fonts/font.png', 'assets/fonts/font.fnt');
        //main Menu
        this.load.image('btnJogar', 'assets/images/botoes/btnJogar.png');
        this.load.image('btnJogarPress', 'assets/images/botoes/btnJogarPress.png');

        this.load.image('btnAjuda', 'assets/images/botoes/btnAjuda.png');
        this.load.image('btnAjudaPress', 'assets/images/botoes/btnAjudaPress.png');


        //Ajuda menu
        this.load.image('bgAjuda', 'assets/background/scene_menus.png');

        this.load.image('btnVoltar', 'assets/images/botoes/btnVoltar.png');
        this.load.image('btnVoltarPress', 'assets/images/botoes/btnVoltarPress.png');

        this.load.image('pular', 'assets/images/menus/pular.png');
        this.load.image('andarDireita', 'assets/images/menus/andarDireita.png');
        this.load.image('andarEsquerda', 'assets/images/menus/andarEsquerda.png');
        this.load.image('atacar', 'assets/images/menus/atacar.png');
        this.load.image('interagir', 'assets/images/menus/interagir.png');
        this.load.image('pausar', 'assets/images/menus/pausar.png');

        this.load.spritesheet({
            key: 'setas',
            url: 'assets/images/botoes/setas.png',
            frameConfig: {
                frameWidth: 80,
                frameHeight: 80
            }
        });


        //menuFases
        this.load.image('bgFases', 'assets/background/scene_menus.png');

        this.load.image('btnFase1', 'assets/images/botoes/btnFase1.png');
        this.load.image('btnFase1Press', 'assets/images/botoes/btnFase1Press.png');
        this.load.image('btnFase2', 'assets/images/botoes/btnFase2.png');
        this.load.image('btnFase2Press', 'assets/images/botoes/btnFase2Press.png');
        this.load.image('btnFase3', 'assets/images/botoes/btnFase3.png');
        this.load.image('btnFase3Press', 'assets/images/botoes/btnFase3Press.png');
        this.load.image('btnFase4', 'assets/images/botoes/btnFase4.png');
        this.load.image('btnFase4Press', 'assets/images/botoes/btnFase4Press.png');
        this.load.image('btnVoltar', 'assets/images/botoes/btnVoltar.png');
        this.load.image('btnVoltarPress', 'assets/images/botoes/btnVoltarPress.png');

        this.load.image('fase_1_cor', 'assets/images/menus/screenTBOG.png');
        this.load.image('fase_2_cor', 'assets/images/menus/screenTBOG.png');
        this.load.image('fase_2_pb', 'assets/images/menus/screenTBOGpreta.png');
        this.load.image('fase_3_cor', 'assets/images/menus/screenTBOG.png');
        this.load.image('fase_3_pb', 'assets/images/menus/screenTBOGpreta.png');
        this.load.image('fase_4_cor', 'assets/images/menus/screenTBOG.png');
        this.load.image('fase_4_pb', 'assets/images/menus/screenTBOGpreta.png');

        this.load.audio('menusMusic', 'assets/musics/scenesMusics/menuMusic.mp3');





        //fase 1 
        this.load.spritesheet({
            key: 'sprite_hero',
            url: 'assets/images/mobs/heroi.png',
            frameConfig: {
                frameWidth: 60,
                frameHeight: 84
            }
        });


        this.load.spritesheet('bandeira_branca', 'assets/images/itensCenario/bandeira_branca.png', {
            frameWidth: 36,
            frameHeight: 60
        });

        this.load.spritesheet('bandeira_verde', 'assets/images/itensCenario/bandeira_verde.png', {
            frameWidth: 36,
            frameHeight: 60
        });

        this.load.spritesheet('sprite_alavanca', 'assets/images/itensCenario/alavanca.png', {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.spritesheet('sprite_chave', 'assets/images/itensCenario/chave.png', {
            frameWidth: 16,
            frameHeight: 16
        });

        this.load.spritesheet('sprite_moeda', 'assets/images/itensCenario/moeda.png', {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.image('hud_primario', 'assets/images/huds/hud_score_vida.png');
        this.load.image('hud_secundario', 'assets/images/huds/hud_tempo.png');

        this.load.image('coracao_cheio', 'assets/images/huds/coracao_cheio.png');
        this.load.image('coracao_vazio', 'assets/images/huds/coracao_vazio.png');

        this.load.image('btnVoltar', 'assets/images/botoes/btnVoltar.png');
        this.load.image('btnVoltarPress', 'assets/images/botoes/btnVoltarPress.png');


        this.load.image('arvore1', 'assets/images/arvores/arvore1.png');
        this.load.image("fase_1_tileset", "assets/tilesets/fase_1_tileset.png");
        this.load.image('fase_1_sky', 'assets/background/fase_1_sky.png');
        this.load.image('fase_1_montanhas', 'assets/background/fase_1_montanhas.png');
        this.load.image('fase_1_ponte', 'assets/images/itensCenario/ponte.png');
        

        this.load.spritesheet('slime_verde', 'assets/images/mobs/slime_verde_walk.png', {
            frameWidth: 18,
            frameHeight: 21
        });
        
        this.load.spritesheet('slime_azul', 'assets/images/mobs/slime_azul_walk.png', {
            frameWidth: 18,
            frameHeight: 21
        });

        this.load.spritesheet('slime_vermelho', 'assets/images/mobs/slime_vermelho_walk.png', {
            frameWidth: 18,
            frameHeight: 21
        });
        this.load.spritesheet('slime_verde_hit', 'assets/images/mobs/slime_verde_hit.png', {
            frameWidth: 16,
            frameHeight: 12
        });
        
        this.load.spritesheet('slime_azul_hit', 'assets/images/mobs/slime_azul_hit.png', {
            frameWidth: 16,
            frameHeight: 12
        });
        
        this.load.spritesheet('slime_vermelho_hit', 'assets/images/mobs/slime_vermelho_hit.png', {
            frameWidth: 16,
            frameHeight: 12
        });


        this.load.audio("jump","assets/sounds/jump.mp3");
        this.load.audio("espada",'assets/sounds/espada.mp3');
        this.load.audio("morte",'assets/sounds/death.mp3');
        this.load.audio("hit",'assets/sounds/hit.mp3');
        this.load.audio("pegar",'assets/sounds/pegar.mp3');
        
        /*Arquivos que irão criar a casa*/
        this.load.tilemapTiledJSON('map_casa', 'assets/tilemap/map_casa.json');
        this.load.image('fase_casa', 'assets/tilesets/fase_casa.png');
    }
}

export default BootScene;