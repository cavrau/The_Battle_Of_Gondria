class Anims {

  constructor(scene) {

    const anims = scene.anims;

    /*INICIO - Animação da moeda */

    anims.create({
      key: 'giraMoeda',
      frames: anims.generateFrameNumbers('sprite_moeda', { start: 0, end: 7 }),
      frameRate: 5,
      repeat: -1,
      yoyo: false
    });    

    /*FIM - Animação da moeda */
  }

}
export default Anims