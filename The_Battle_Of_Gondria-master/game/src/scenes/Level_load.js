class Level_load extends Phaser.Scene {
    constructor() {
        super({
            key: 'Level_load'
        })
    }
    init(data) {
        this.name = data.scene;
    }
    preload() {
        this.load.image('load_escudo', 'assets/images/menus/escudo_load.png');
        this.switch();
    }
    create() {
        this.add.image(750, 400, 'load_escudo').setScale(0.05);
        let jogarBtn = this.add.image(432, 240, "btnJogar").setInteractive();
        jogarBtn.setScale(0.65);
        jogarBtn.setScrollFactor(0);
        jogarBtn.on('pointerdown', () => {
            this.scene.moveBelow(this, this.name);
            this.scene.stop(this);
            this.scene.launch(this.name);
        });

    }

    switch () {
        const progress = this.add.graphics();
        this.load.on('progress', (value) => {
            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(0, this.sys.game.config.height / 2, this.sys.game.config.width * value, 60);
        });

        this.load.on('complete', () => {
            progress.destroy();
        });

        switch (this.name) {
            case 'Level_1':
                this.load.tilemapTiledJSON("map_fase_1", "assets/tilemap/map_fase_1.json");
                this.load.audio('music_1_1', 'assets/musics/music_level_1.mp3');
                this.load.audio('music_1_2', 'assets/musics/music_level_1_2.mp3');
                this.load.audio('slime_jump', 'assets/sounds/slime_jump.mp3');
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
                this.load.on('complete',
                    () => {
                        let anims = this.anims;
                        //animacao pular esquerda
                        anims.create({
                            key: "slime_verde_jump_left",
                            frames: anims.generateFrameNumbers('slime_verde', {
                                start: 0,
                                end: 19
                            }),
                            frameRate: 15,
                            repeat: -1
                        });
                        anims.create({
                            key: "slime_azul_jump_left",
                            frames: anims.generateFrameNumbers('slime_azul', {
                                start: 0,
                                end: 19
                            }),
                            frameRate: 15,
                            repeat: -1
                        });
                        anims.create({
                            key: "slime_vermelho_jump_left",
                            frames: anims.generateFrameNumbers('slime_vermelho', {
                                start: 0,
                                end: 19
                            }),
                            frameRate: 15,
                            repeat: -1
                        });
                        //animacoes andar pra direita
                        anims.create({
                            key: "slime_verde_jump_right",
                            frames: anims.generateFrameNumbers('slime_verde', {
                                start: 20,
                                end: 39
                            }),
                            frameRate: 15,
                            repeat: -1
                        });
                        anims.create({
                            key: "slime_azul_jump_right",
                            frames: anims.generateFrameNumbers('slime_azul', {
                                start: 20,
                                end: 39
                            }),
                            frameRate: 15,
                            repeat: -1
                        });
                        anims.create({
                            key: "slime_vermelho_jump_right",
                            frames: anims.generateFrameNumbers('slime_vermelho', {
                                start: 20,
                                end: 39
                            }),
                            frameRate: 15,
                            repeat: -1
                        });
                        //anims hit esquerda
                        anims.create({
                            key: "slime_verde_hit_left",
                            frames: anims.generateFrameNumbers('slime_verde_hit', {
                                start: 0,
                                end: 6
                            }),
                            frameRate: 15,
                            repeat: -1
                        });
                        anims.create({
                            key: "slime_azul_hit_left",
                            frames: anims.generateFrameNumbers('slime_azul_hit', {
                                start: 0,
                                end: 6
                            }),
                            frameRate: 15,
                            repeat: -1
                        });
                        anims.create({
                            key: "slime_vermelho_hit_left",
                            frames: anims.generateFrameNumbers('slime_vermelho_hit', {
                                start: 0,
                                end: 6
                            }),
                            frameRate: 15,
                            repeat: -1
                        });
                        //anims hit direita
                        anims.create({
                            key: "slime_verde_hit_right",
                            frames: anims.generateFrameNumbers('slime_verde_hit', {
                                start: 7,
                                end: 13
                            }),
                            frameRate: 15,
                            repeat: -1
                        });
                        anims.create({
                            key: "slime_azul_hit_right",
                            frames: anims.generateFrameNumbers('slime_azul_hit', {
                                start: 7,
                                end: 13
                            }),
                            frameRate: 15,
                            repeat: -1
                        });
                        anims.create({
                            key: "slime_vermelho_hit_right",
                            frames: anims.generateFrameNumbers('slime_vermelho_hit', {
                                start: 7,
                                end: 13
                            }),
                            frameRate: 15,
                            repeat: -1
                        });

                        anims.create({
                            key: 'dieEffect',
                            frames: anims.generateFrameNumbers('inimigoDie', {
                                start: 0,
                                end: 8
                            }),
                            frameRate: 10,
                        });
                    }
                );
                break;
            case 'Level_2':
                this.load.tilemapTiledJSON("map_2_boss", "assets/tilemap/map_fase_2_boss.json");
                this.load.spritesheet('goblin', 'assets/images/mobs/goblin_spritesheet.png', {
                    frameWidth: 42,
                    frameHeight: 42
                });
                this.load.spritesheet('goblin_hit', 'assets/images/mobs/goblin_hit.png', {
                    frameWidth: 42,
                    frameHeight: 42
                });
                /*Faz load dos arquivos usados na cena Level_2 e outras cenas  */
                this.load.tilemapTiledJSON('map_fase_2', 'assets/tilemap/map_fase_2.json');
                this.load.image('fase_2_tileset', 'assets/tilesets/fase_2_tileset.png');
                this.load.image('fase_2_sky', 'assets/background/fase_2_sky.png');
                this.load.image('fase_2_montanhas', 'assets/background/fase_2_montanhas.png');
                this.load.audio('music_2', 'assets/musics/music_level_2.mp3');
                this.load.audio('music_boss', 'assets/musics/music_level_2_2.mp3');
                this.load.audio('goblin_jump', 'assets/sounds/goblin_jump.wav');
                this.load.on('complete', () => {
                    let anims = this.anims;
                    anims.create({
                        key: 'goblin_hitted_right',
                        frames: anims.generateFrameNumbers('goblin_hit', {
                            start: 0,
                            end: 4
                        }),
                        frameRate: 4,
                        repeat: -1
                    });
                    anims.create({
                        key: 'goblin_hitted_left',
                        frames: anims.generateFrameNumbers('goblin_hit', {
                            start: 5,
                            end: 9
                        }),
                        frameRate: 4,
                        repeat: -1
                    });
                    anims.create({
                        key: 'goblin_standing_right',
                        frames: anims.generateFrameNumbers('goblin', {
                            start: 0,
                            end: 1
                        }),
                        frameRate: 4,
                        repeat: -1
                    });
                    anims.create({
                        key: 'goblin_standing_left',
                        frames: anims.generateFrameNumbers('goblin', {
                            start: 12,
                            end: 13
                        }),
                        frameRate: 4,
                        repeat: -1
                    });
                    anims.create({
                        key: 'goblin_runing_right',
                        frames: anims.generateFrameNumbers('goblin', {
                            start: 7,
                            end: 10
                        }),
                        frameRate: 4,
                        repeat: -1
                    });
                    anims.create({
                        key: 'goblin_runing_left',
                        frames: anims.generateFrameNumbers('goblin', {
                            start: 17,
                            end: 20
                        }),
                        frameRate: 4,
                        repeat: -1,
                        yoyo: true
                    });
                    anims.create({
                        key: 'goblin_hitting_left',
                        frames: anims.generateFrameNumbers('goblin', {
                            start: 25,
                            end: 29
                        }),
                        frameRate: 3,
                        repeat: -1
                    });
                    anims.create({
                        key: 'goblin_hitting_right',
                        frames: anims.generateFrameNumbers('goblin', {
                            start: 30,
                            end: 34
                        }),
                        frameRate: 3,
                        repeat: -1
                    });
                    console.log(anims);
                });
                break;
            case 'Level_3':
                this.load.spritesheet('goblin_caverna', 'assets/images/mobs/goblin_caverna_spritesheet.png', {
                    frameWidth: 42,
                    frameHeight: 42
                });
                this.load.spritesheet('goblin_caverna_hit', 'assets/images/mobs/goblin_caverna_hit.png', {
                    frameWidth: 42,
                    frameHeight: 42
                });
                this.load.spritesheet('fantasma', 'assets/images/mobs/fantasma_spritesheet.png', {
                    frameWidth: 58,
                    frameHeight: 50
                })

                this.load.tilemapTiledJSON("map_fase_3_boss", "assets/tilemap/map_fase_3_boss.json");
                this.load.tilemapTiledJSON("map_fase_3", "assets/tilemap/map_fase_3.json");
                this.load.audio('goblin_jump', 'assets/sounds/goblin_jump.wav');
                this.load.audio('music_3', 'assets/musics/music_level_3.mp3');
                this.load.audio('music_3_2', 'assets/musics/music_level_3_2.mp3');
                this.load.on('complete', () => {
                    let anims = this.anims;
                    anims.create({
                        key: 'goblin_caverna_hitted_right',
                        frames: anims.generateFrameNumbers('goblin_caverna_hit', {
                            start: 0,
                            end: 4
                        }),
                        frameRate: 4,
                        repeat: -1
                    });
                    anims.create({
                        key: 'goblin_caverna_hitted_left',
                        frames: anims.generateFrameNumbers('goblin_caverna_hit', {
                            start: 5,
                            end: 9
                        }),
                        frameRate: 4,
                        repeat: -1
                    });
                    anims.create({
                        key: 'goblin_caverna_standing_right',
                        frames: anims.generateFrameNumbers('goblin_caverna', {
                            start: 0,
                            end: 1
                        }),
                        frameRate: 4,
                        repeat: -1
                    });
                    anims.create({
                        key: 'goblin_caverna_standing_left',
                        frames: anims.generateFrameNumbers('goblin_caverna', {
                            start: 12,
                            end: 13
                        }),
                        frameRate: 4,
                        repeat: -1
                    });
                    anims.create({
                        key: 'goblin_caverna_runing_right',
                        frames: anims.generateFrameNumbers('goblin_caverna', {
                            start: 7,
                            end: 10
                        }),
                        frameRate: 4,
                        repeat: -1
                    });
                    anims.create({
                        key: 'goblin_caverna_runing_left',
                        frames: anims.generateFrameNumbers('goblin_caverna', {
                            start: 17,
                            end: 20
                        }),
                        frameRate: 4,
                        repeat: -1,
                        yoyo: true
                    });
                    anims.create({
                        key: 'goblin_caverna_hitting_left',
                        frames: anims.generateFrameNumbers('goblin_caverna', {
                            start: 25,
                            end: 29
                        }),
                        frameRate: 3,
                        repeat: -1
                    });
                    anims.create({
                        key: 'goblin_caverna_hitting_right',
                        frames: anims.generateFrameNumbers('goblin_caverna', {
                            start: 30,
                            end: 34
                        }),
                        frameRate: 3,
                        repeat: -1
                    });
                    anims.create({
                        key: 'ghost',
                        frames: anims.generateFrameNumbers('fantasma', {
                            start: 0,
                            end: 3
                        }),
                        frameRate: 8,
                        repeat: -1
                    });
                    anims.create({
                        key: 'ghost_back',
                        frames: anims.generateFrameNumbers('fantasma', {
                            start: 4,
                            end: 7
                        }),
                        frameRate: 8,
                        repeat: -1
                    });

                });
                break;
            case "Level_4":

                //Carrega imagens da fase 3 
                this.load.image('fase_4_tileset', 'assets/tilesets/fase_4_tileset.png');
                this.load.audio('music_4', 'assets/musics/music_level_4.mp3');
                this.load.audio('music_4_2', 'assets/musics/music_level_4_2.mp3');
                this.load.spritesheet('soldado','assets/images/mobs/soldado.png',{
                    frameHeight:84,
                    frameWidth:60
                });

            default:
                break;
        }
    }
}
export default Level_load;