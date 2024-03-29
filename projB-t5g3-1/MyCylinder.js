/**
* MyCylinder
* @constructor
*/

class MyCylinder extends CGFobject {
    constructor(scene, slices) {

        super(scene);
        this.slices = slices;
        this.initBuffers();

    }

    initBuffers() {

        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;

        for (var i = 0; i <= this.slices; i++) {

            var ca = Math.cos(ang);
            var sa = Math.sin(ang);

            this.vertices.push(ca, 0, -sa);
            this.vertices.push(ca, 1, -sa);
            this.normals.push(ca, 0, -sa);
            this.normals.push(ca, 0, -sa);

            if (i != this.slices) {
                this.indices.push(2 * i + 1, 2 * i, 2 * i + 2);
                this.indices.push(2 * i + 2, 2 * i + 3, 2 * i + 1);
            }

            this.texCoords.push(i/(this.slices-1),1);
			this.texCoords.push(i/(this.slices-1),0);

            ang += 2 * Math.PI / this.slices;;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    updateBuffers(complexity) {
        this.slices = 3 + Math.round(9 * complexity); //Complexity varies 0-1, so slices varies 3-12

        // Reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}
