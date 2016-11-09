import { Component } from '@angular/core';

@Component({
    selector: 'cad',
    template: require('./cad.component.html'),
    styles: [require('./cad.component.scss')]
})
export class CadComponent {
    public openedFile: any;

    constructor() { }

    public openedFileChanged(fileInput: any) {
        this.openedFile = fileInput.target.files[0];
    }
}
