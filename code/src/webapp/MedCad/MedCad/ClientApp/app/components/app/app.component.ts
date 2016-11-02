import { Component } from '@angular/core';
import { Auth } from '../../services/auth/auth.service';

@Component({
    selector: 'app',
    template: require('./app.component.html'),
    providers: [ Auth ],
    styles: [require('./app.component.scss')]
})

export class AppComponent {
    constructor(private auth: Auth) {}
}
