import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {AppBComponent} from './app-b.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        AppBComponent
    ],
    bootstrap: [
        AppComponent,
        AppBComponent
    ]
})
export class AppModule {}