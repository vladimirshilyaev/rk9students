import { Component } from '@angular/core';
import { Auth } from '../../services/auth/auth.service';

@Component({
    selector: 'cad',
    template: require('./cad.component.html'),
    styles: [require('./cad.component.scss')],
    providers: [ Auth ]
})

export class CadComponent {
    constructor(private auth: Auth) {
    }
}
