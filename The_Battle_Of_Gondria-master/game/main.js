/*INICIO DO JOGO*/
import BootScene from './src/scenes/BootScene.js';
import Level_1 from './src/scenes/Level_1.js';
import MainMenu from './src/scenes/MainMenu.js'
import MenuFases from './src/scenes/MenuFases.js'
import AjudaScene from './src/scenes/AjudaScene.js'

const config = {
    type: Phaser.WEBGL,
    parent: 'content',
    width: 864,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 400 },
            debug: true
        }
    },
    scene: [
        MainMenu,
        MenuFases,
        Level_1,
        AjudaScene
    ]
};

const game = new Phaser.Game(config);