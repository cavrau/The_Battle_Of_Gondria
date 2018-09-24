
class Aldeao {
  constructor(scene, x, y) {
    this.scene = scene;

    this.sprite = this.scene.physics.add.sprite(x, y, "sprite_aldeao", 0);

  }

}
export default Aldeao