/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.diamond = new MyDiamond(this);
        this.triangle = new MyTriangle(this); 
        this.parallelogram = new MyParellelogram(this);
        this.triangleSmall = new MyTriangleSmall(this);
        this.triangleBig = new MyTriangleBig(this);
        this.triangleBig2 = new MyTriangleBig(this);

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displayDiamond = true;
        this.displayTriangle = true;
        this.displayParallelogram = true;
        this.displayTriangleSmall = true;
        this.displayTriangleBig = true;
        this.displayTriangleBig2 = true;
        this.scaleFactor = 1;
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        
        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.setDefaultAppearance();
        
        var sca = [this.scaleFactor, 0.0, 0.0, 0.0,
                    0.0, this.scaleFactor, 0.0, 0.0,
                    0.0, 0.0, this.scaleFactor, 0.0,
                    0.0, 0.0, 0.0, 1.0];
        
        this.multMatrix(sca);
        this.pushMatrix();

        //alteration diamond
        this.translate(2.10,0.70,0);
        this.rotate(Math.PI/4,0,0,1);

        if(this.displayDiamond)
        this.diamond.display();
            
        this.popMatrix();
        
        this.pushMatrix();
        //alteration triangle big
        this.translate(1.40,-1.40,0);
        this.rotate(Math.PI/4,0,0,1);

        if(this.displayTriangleBig)
            this.triangleBig.display();

        this.popMatrix();
        this.pushMatrix();

        this.translate(-1.40,-0.25,0);
        this.rotate(-Math.PI/4,0,0,1);

        if(this.displayTriangleBig2)
            this.triangleBig2.display();

        this.popMatrix();
        this.pushMatrix();

        if(this.displayTriangle)
            this.triangle.display();

        if(this.displayParallelogram)
            this.parallelogram.display();

        if(this.displayTriangleSmall)
            this.triangleSmall.display();
            

        // ---- END Primitive drawing section
    }
}