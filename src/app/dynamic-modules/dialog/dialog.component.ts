import { Component, ViewChild, ViewContainerRef } from '@angular/core'
import { DynamicComponentLoader } from '../../dynamic-component-loader/dynamic-component-loader.service'

@Component({
  selector: 'app-dialog-component',
  template: '<div #outlet></div>',
})
export class DialogComponent {

  @ViewChild('outlet', { read: ViewContainerRef }) _outlet: ViewContainerRef

  constructor(private loader: DynamicComponentLoader) {
    this.loader.getComponentFactory('dialog')
      .subscribe(factory =>
        this._outlet.createComponent(factory)
          .changeDetectorRef.detectChanges(),
      )
  }
}
