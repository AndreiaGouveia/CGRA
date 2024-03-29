/**
* MyInterface
* @constructor
*/
class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // Call CGFinterface init
        super.init(application);
        // Init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();

        //CheckBox Display Textures
        this.gui.add(this.scene, 'enableTexturesBool').name("Enable Textures");

        //CheckBox Scale
        this.gui.add(this.scene, 'scaleFactor', 0.5, 4.0).name('Scale');

        //Dropdown menu
        this.gui.add(this.scene, 'enableLights', this.scene.objectIDs).name('Day');

        return true;
    }
}