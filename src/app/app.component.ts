import { Component, ViewChild, ViewContainerRef } from '@angular/core';

import { DynamicComponentLoader } from './dynamic-component-loader/dynamic-component-loader.service';
import { MessageComponent } from './dynamic-modules/message/message.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {

  @ViewChild('testOutlet', {read: ViewContainerRef}) testOutlet: ViewContainerRef;

  constructor(
    private dynamicComponentLoader: DynamicComponentLoader,
  ) { }

  loadComponent() {
    this.dynamicComponentLoader
      .getComponentFactory<MessageComponent>('message')
      .subscribe(componentFactory => {
        this.testOutlet.createComponent(componentFactory);
      }, error => {
        console.warn(error);
      });
  }
}
