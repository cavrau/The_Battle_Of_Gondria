/*INICIO DO JOGO*/
import BootScene from './src/scenes/BootScene.js';
import Scene1_level1 from './src/scenes/Scene1_level1.js';

const config = {
    type: Phaser.WEBGL,
    parent: 'content',
    width: 6048,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: false
        }
    },
    scene: [
        Scene1_level1
    ]
};

const game = new Phaser.Game(config);