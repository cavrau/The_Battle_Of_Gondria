/*INICIO DO JOGO*/
import BootScene from './src/scenes/BootScene.js';
import Scene1_level1 from './src/scenes/Scene1_level1.js';
import MainMenu from './src/scenes/MainMenu.js'
import MenuFases from './src/scenes/MenuFases.js'

const config = {
    type: Phaser.WEBGL,
    parent: 'content',
    width: 864,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 400 },
            debug:false
        }
    },
    scene: [
        MainMenu,
        MenuFases,
        Scene1_level1
    ]
};

const game = new Phaser.Game(config);