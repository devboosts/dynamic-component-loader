import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { DynamicComponentLoader } from '../../dynamic-component-loader/dynamic-component-loader.service';

@Component({
  selector: 'app-dialog-component',
  template: '<div #outlet></div>'
})
export class DialogComponent {
  @ViewChild('outlet', { read: ViewContainerRef, static: true }) _outlet:
    | ViewContainerRef
    | undefined;

  constructor(private loader: DynamicComponentLoader) {
    this.loader.getComponentFactory('dialog').subscribe({
      next: factory => {
        if (!this._outlet) {
          return;
        }

        this._outlet.createComponent(factory).changeDetectorRef.detectChanges();
      }
    });
  }
}
