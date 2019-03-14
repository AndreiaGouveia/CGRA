/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */

class MyUnitCubeQuad extends CGFobject {

    constructor(scene) {
        super(scene);
        this.init(scene);
    }
    init(scene) {

        this.quad1 = new MyQuad(scene);
        this.quad2 = new MyQuad(scene);
        this.quad3 = new MyQuad(scene);
        this.quad4 = new MyQuad(scene);
        this.quad5 = new MyQuad(scene);
        this.quad6 = new MyQuad(scene);

    }

    enableNormalViz() {
        this.quad1.enableNormalViz();
        this.quad2.enableNormalViz();
        this.quad3.enableNormalViz();
        this.quad4.enableNormalViz();
        this.quad5.enableNormalViz();
        this.quad6.enableNormalViz();
    }

    display() {
//quad1
        this.scene.pushMatrix();

        this.scene.quadMaterial.setTexture(this.scene.textures[4])
        this.scene.quadMaterial.apply();

        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.rotate(-Math.PI, 1, 0, 0);
        this.quad1.display();

        this.scene.popMatrix();
//quad2
        this.scene.pushMatrix();

        this.scene.quadMaterial.setTexture(this.scene.textures[6])
        this.scene.quadMaterial.apply();

        this.scene.translate(0, -0.5, 0.5);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.quad2.display();

        this.scene.popMatrix();
//quad3
        this.scene.pushMatrix();

        this.scene.quadMaterial.setTexture(this.scene.textures[5])
        this.scene.quadMaterial.apply();
        
        this.scene.translate(0, 0.5, 0.5);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.quad3.display();

        this.scene.popMatrix();
//quad4
        this.scene.pushMatrix();

        this.scene.quadMaterial.setTexture(this.scene.textures[4])
        this.scene.quadMaterial.apply();

        this.scene.translate(0, 0, 1);
        this.quad4.display();

        this.scene.popMatrix();
//quad5
        this.scene.pushMatrix();

        this.scene.quadMaterial.setTexture(this.scene.textures[4])
        this.scene.quadMaterial.apply();

        this.scene.translate(-0.5, 0, 0.5);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.quad5.display();

        this.scene.popMatrix();
//quad6
        this.scene.pushMatrix();

        this.scene.quadMaterial.setTexture(this.scene.textures[4])
        this.scene.quadMaterial.apply();

        this.scene.translate(0.5, 0, 0.5);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.quad6.display();

        this.scene.popMatrix();
        // ---- END Primitive drawing section
    }

    updateBuffers(complexity) {
        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}