// JavaScript source code
/**
 * MyHouse
 * @constructor
 * @param scene - Reference to MyScene object
 */

class MyHouse extends CGFobject {

    constructor(scene) {
        super(scene);
        this.init(scene);
    }
    init(scene) {

        this.cube = new MyUnitCubeQuad(scene);
        this.pyramid = new MyPyramid(scene, 4, 1);

        this.prism = new MyPrism(scene, 6, 1);
        this.prism1 = new MyPrism(scene, 6, 1);
        this.prism2 = new MyPrism(scene, 6, 1);
        this.prism3 = new MyPrism(scene, 6, 1);

    }

    display() {

        //===================================
        //PRISM 1
        this.scene.pushMatrix();

        this.scene.difuseMaterial.setTexture(this.scene.postes);
        this.scene.difuseMaterial.apply();

        this.scene.translate(0.75, 0, -0.75);
        this.scene.scale(0.25, 1.15, 0.25);
        this.prism.display();

        this.scene.popMatrix();
        
        //PRISM 2
        this.scene.pushMatrix();

        this.scene.translate(0.75, 0, 0.75);
        this.scene.scale(0.25, 1.15, 0.25);
        this.prism1.display();

        this.scene.popMatrix();

        //PRISM 3
        this.scene.pushMatrix();

        this.scene.translate(-0.75, 0, -0.75);
        this.scene.scale(0.25, 1.15, 0.25);
        this.prism2.display();

        this.scene.popMatrix();

        //PRISM 4
        this.scene.pushMatrix();

        this.scene.translate(-0.75, 0, 0.75);
        this.scene.scale(0.25, 1.15, 0.25);
        this.prism3.display();

        this.scene.popMatrix();

        //===================================
        //PYRAMID
        this.scene.pushMatrix();

        this.scene.translate(0, 1.1, 0);
        this.scene.scale(1.5, 1.5, 1.5);
        this.scene.rotate(Math.PI / 4, 0, 1, 0);

        this.scene.difuseMaterial.setTexture(this.scene.telhado);
        this.scene.difuseMaterial.apply();
        this.pyramid.display();

        this.scene.popMatrix();

        //===================================
        //CUBE
        this.scene.pushMatrix();

        this.scene.difuseMaterial.setTexture(this.scene.paredes);
        this.scene.difuseMaterial.apply();

        this.scene.translate(0, 0.6, -0.6);
        this.scene.scale(1.15, 1.15, 1.15);
        
        this.cube.display();

        this.scene.popMatrix();

        this.scene.difuseMaterial.setTexture(null);
        this.scene.difuseMaterial.apply();


        // ---- END Primitive drawing section
    }

    updateBuffers(complexity) {
        // Reinitialize buffers
        this.initBuffers();
    }
}