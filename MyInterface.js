/**
* MyInterface
* @constructor
*/
class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();
        
        var obj = this;

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

       /* //Checkbox Diamond
        this.gui.add(this.scene, 'displayDiamond').name('Display Diamond');

        //Checkbox Triangle
        this.gui.add(this.scene, 'displayTriangle').name('Display Triangle');

        //Checkbox Parallelogram
        this.gui.add(this.scene, 'displayParallelogram').name('Display Parallelogram');

        //Checkbox TriangleSmall
        this.gui.add(this.scene, 'displayTriangleSmall').name('Display Small Triangle');

        //Checkbox TriangleSmall2
        this.gui.add(this.scene, 'displayTriangleSmall2').name('Display Small Triangle2');

        //Checkbox TriangleBig
        this.gui.add(this.scene, 'displayTriangleBig').name('Display Big Triangle');

        //Checkbox TriangleBig
        this.gui.add(this.scene, 'displayTriangleBig2').name('Display Big Triangle2');*/

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

        return true;
    }
}