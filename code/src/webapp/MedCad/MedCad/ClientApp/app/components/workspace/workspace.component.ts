import { Component, OnInit, ElementRef, Input, OnChanges, SimpleChanges }        from '@angular/core';
var THREE = require("three-js")();
var STLLoader = require('three-stl-loader')(THREE);

@Component({
    selector: 'workspace',
    template: require('./workspace.component.html'),
    styles: [require('./workspace.component.scss')]
})
export class WorkspaceComponent implements OnInit, OnChanges {

    @Input() file: any;

    private loader: any;

    private scene: any;
    private camera: any;
    private renderer: any;

    constructor(private myElement: ElementRef) {

    }

    ngOnInit() {
        this.loader = new STLLoader();
        let elem = (<HTMLCollection>this.myElement.nativeElement.children).namedItem('workspace');
        let width = elem.scrollWidth;
        let height = elem.scrollHeight;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0x3b3b3b);
        this.renderer.setSize(width, height);
        this.camera.position.x = -30;
        this.camera.position.y = 40;
        this.camera.position.z = 30;
        this.camera.lookAt(this.scene.position);
        document.querySelector('workspace div.workspace').appendChild(this.renderer.domElement);
        this.render(this);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!(<any>changes).file.isFirstChange()) {
            console.log(this.file);

            let reader = new FileReader();
            let _self = this;
            reader.onload = function () {
                console.log(reader);
                var geometry = _self.loader.parse(reader.result);
                geometry.sourceType = "stl";
                geometry.sourceFile = _self.file.name;

                var material = new THREE.MeshStandardMaterial();

                var mesh = new THREE.Mesh(geometry, material);
                mesh.name = _self.file.name;

                console.log(geometry);

                _self.scene.add(mesh)
            };

            if (reader.readAsBinaryString !== undefined) {
                reader.readAsBinaryString(this.file);
            } else {
                reader.readAsArrayBuffer(this.file);
            }
        }
    }

    private render(self: any)
    {
        this.renderer.render(self.scene, self.camera);
        requestAnimationFrame(() => self.render(self));
    }
}
