import { Component } from '@angular/core';
import { Auth } from '../../services/auth/auth.service';

@Component({
    selector: 'cad',
    template: require('./cad.component.html'),
    styles: [require('./cad.component.scss')],
    providers: [ Auth ]
})

export class CadComponent {
    public openedFile: any;

    public openedFileChanged(fileInput: any) {
        this.openedFile = fileInput.target.files[0];
    }
    constructor(private auth: Auth) {
    }
}
