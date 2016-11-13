import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Auth } from '../../services/auth/auth.service';
import { AUTH_PROVIDERS } from 'angular2-jwt';

import { CadComponent } from '../../components/cad/cad.component';
import { HeaderbarComponent } from '../../components/headerbar/headerbar.component';
import { WorkspaceComponent } from '../../components/workspace/workspace.component';
import { CadRoutingModule } from './cad-routing.module';

import { ModelsService } from '../../services/models/models.service';

@NgModule({
    imports: [
        CommonModule,
        CadRoutingModule
    ],
    declarations: [
        HeaderbarComponent,
        CadComponent,
        WorkspaceComponent
    ],
    providers: [
        ModelsService,
        AUTH_PROVIDERS,
        Auth,
    ]
})

export class CadModule { }