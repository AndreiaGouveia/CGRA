// JavaScript source code
/**
 * MyTreeBranch
 * @constructor
 * @param scene - Reference to MyScene object
 */

class MyTreeBranch extends CGFobject {

    constructor(scene, x = 0, z = 0, rotation = 0) {
        super(scene);
        this.init(scene);
        this.x = x;
        this.z = z;
        this.rotation = rotation;

    }
    init(scene) {

        this.cylinder = new MyCylinderWBottow(scene);

        this.y = 0.2;

        this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
        this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
        this.appearance.setSpecular(0.0, 0.0, 0.0, 1);
        this.appearance.setShininess(120);
        this.appearance.loadTexture('texturas/tronco.jpg');

        this.wood = new CGFtexture(this.scene, 'texturas/tronco.jpg')

    }

    display(){

        this.appearance.setTexture(this.wood);
        this.appearance.apply();

        this.scene.pushMatrix();

        this.scene.translate(this.x, this.y, this.z);

        this.scene.rotate(this.rotation, 0, 1, 0);

        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.scale(0.3,0.3,0.3);
        this.scene.scale(0.2, 0.2, 4);

        this.cylinder.display();

        this.scene.popMatrix();

        this.appearance.setTexture(null);
        this.appearance.apply();
    }

    setCoordinates(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }

    getZ(){
        return this.z;
    }

    setRotation(rotation){
        this.rotation = rotation;
    }
}