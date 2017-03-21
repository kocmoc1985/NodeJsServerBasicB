 import { Component } from '@angular/core';
 
    @Component({
      selector: 'my-app-b',
      template: `
        <h1>{{titleA}}</h1>
        <h2>{{titleB}}</h2>
        `
    })
    
    export class AppBComponent {
      titleA = 'Hello Angular';
      titleB = getAngular();
    }