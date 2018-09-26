/*INICIO DO JOGO*/
import BootScene from './src/scenes/BootScene.js';
import MainMenu from './src/scenes/MainMenu.js';
import MenuFases from './src/scenes/MenuFases.js';
import AjudaScene from './src/scenes/AjudaScene.js';
import MenuPause from './src/scenes/MenuPause.js';
import Level_casa from './src/scenes/level_casa.js';
import Level_1 from './src/scenes/Level_1.js';
import Level_1_boss from './src/scenes/Level_1_boss.js';
import Level_2 from './src/scenes/Level_2.js';
import CalculaPontuacao from './src/scenes/CalculaPontuacao.js';
const config = {
    type: Phaser.WEBGL,
    parent: 'content',
    width: 864,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 400 },
            debug: false
        }
    },
    scene: [
        BootScene,
        MainMenu,
        MenuFases,
        MenuPause,
        AjudaScene,
        Level_1,
        Level_1_boss,
        Level_2,
        Level_casa,
        CalculaPontuacao
    ]
};

const game = new Phaser.Game(config);
