import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';

import { Auth } from './services/auth/auth.service';
import { AUTH_PROVIDERS } from 'angular2-jwt';

import { AppComponent } from './components/app/app.component';
import { AppRoutingModule } from './modules/app-routing.module';
import { CadModule } from './modules/cad/cad.module';

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent
    ],
    providers: [
        AUTH_PROVIDERS,
        Auth,
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        AppRoutingModule,
        CadModule
    ]
})

export class AppModule {
}
