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
        this.initTextures();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.enableTextures(true);
        this.setUpdatePeriod(50);

        //Initialize scene objects
        this.plane = new Plane(this, 32);
        this.cubeMap = new MyCubeMap(this);
        this.house = new MyHouse(this);
        this.bird = new MyBird(this);
        this.terrain = new MyTerrain(this);
        this.nest = new MyNest(this);
        this.active = 0;
        this.trees = new MyFlorest(this);

        this.branchs = [];
        this.initBranchs();

        this.axiom = "X";

        this.lSystem = new MyLightning(this);
        this.initLightining();


        // shader code panels references
        this.shadersDiv = document.getElementById("shaders");
        this.vShaderDiv = document.getElementById("vshader");
        this.fShaderDiv = document.getElementById("fshader");


        // set the scene update period 
        // (to invoke the update() method every 50ms or as close as possible to that )
        this.setUpdatePeriod(50);

        this.speedFactor = 1;
        this.scaleFactor1 = 1;

    }

    initBranchs() {

        for (var i = 0; i < 5; i++) {
            this.branchs.push(new MyTreeBranch(this, Math.random() * 10 - 1, Math.random() * 10 - 1, Math.PI / (Math.random() * 10 + 1)));
        }
    }

    initLightining() {

        this.angleLightining = 25.0;
        this.iterationsLighting = 3;
        this.scaleFactor = 0.5;

        this.doGenerateLighting = function () {
            this.lSystem.generate(
                this.axiom,
                {
                    "F": ["FF"],
                    "X": ["F[-X][X]F[-X]+FX", "F[-X][X]X[+X][X]", "F[+X]X[-X]X",
                        "F[X][X]F[X]+X", "F[X][X]X",
                        "XF[X][X]F[X]X"]
                },
                this.angleLightining,
                this.iterationsLighting,
                this.scaleFactor
            );
        }

        // do initial generation
        this.doGenerateLighting();


    }

    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }

    initTextures() {
        //Difuse Material
        this.difuseMaterial = new CGFappearance(this);
        this.difuseMaterial.setAmbient(0.3, 0.3, 0.3, 1);
        this.difuseMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.difuseMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.difuseMaterial.setShininess(10.0);
        this.difuseMaterial.loadTexture('texturas/Fundo3.png');
        this.difuseMaterial.setTextureWrap('MIRRORED_REPEAT', 'MIRRORED_REPEAT');

        //Objects initialization
        this.noite = new CGFtexture(this, 'texturas/Fundo3.png');
        this.telhado = new CGFtexture(this, 'texturas/telhado.jpg');
        this.postes = new CGFtexture(this, 'texturas/postes.jpeg');
        this.paredes = new CGFtexture(this, 'texturas/paredes.jpg');
        this.dia = new CGFtexture(this, 'texturas/Dia.png');
        this.penas = new CGFtexture(this, 'texturas/penas.jpg');
        this.penasPretas = new CGFtexture(this, 'texturas/black_feathers.jpg');
    }

    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(65, 65, 65), vec3.fromValues(0, 0, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
    update(t) {
        this.checkKeys();

        this.bird.updatePosition(t);

        if (this.bird.hasBranch()) {
            if (this.nest.checkCollision(this.bird.branch) == true) {
                this.nest.addBranch(this.bird.removeBranch());
            }
        } else {

            for (var i = 0; i < this.branchs.length; i++) {

                if (this.bird.checkCollision(this.branchs[i])) {
                    this.bird.addBranch(this.branchs[i]);
                    this.branchs.splice(i, 1);
                    return;
                }
            }
        }

        if (this.active == 1) {
            this.lSystem.startAnimation(t);
            this.active = 0;
        }

        this.lSystem.update(t);

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

        //Apply default appearance
        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section
        this.terrain.display();

        this.pushMatrix();

        this.translate(0, 4.5, 0);

        this.pushMatrix();
        this.scale(60, 60, 60);
        this.cubeMap.display();
        this.popMatrix();

        this.pushMatrix();

        this.translate(-7, 0, -2);
        this.scale(3, 3, 3);
        this.house.display();

        this.popMatrix();

        this.bird.display();

        this.nest.display();

        for (var i = 0; i < this.branchs.length; i++) {
            this.branchs[i].display();
        }

        //TREES

        this.pushMatrix();

        this.translate(1, 0, -10)
        this.trees.display();

        this.popMatrix();

        this.pushMatrix();

        this.translate(-14, 0, -10)
        this.trees.display();

        this.popMatrix();


        this.pushMatrix();

        this.translate(10, 24, 0);
        this.rotate(Math.PI, 0, 0, 1);
        this.lSystem.display();

        this.popMatrix();


        // ---- END Primitive drawing section
    }

    checkKeys() {

        // Check for key codes e.g. in ​https://keycode.info/
        if (this.gui.isKeyPressed("KeyW")) {
            this.bird.accelerate(0.2);
        }

        if (this.gui.isKeyPressed("KeyS")) {
            this.bird.accelerate(-0.2);
        }

        if (this.gui.isKeyPressed("KeyR")) {
            this.bird.reset();
        }

        if (this.gui.isKeyPressed("KeyA")) {
            this.bird.turn(Math.PI / 4);
        }

        if (this.gui.isKeyPressed("KeyD")) {
            this.bird.turn(-Math.PI / 4);
        }

        if (this.gui.isKeyPressed("KeyP")) {
            this.bird.startDescend();
        }

        if (this.gui.isKeyPressed("KeyL")) {
            this.active = 1;
        }
    }
}