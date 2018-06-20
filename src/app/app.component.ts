import { Component, ViewChild, ViewContainerRef } from '@angular/core'
import { MatDialog } from '@angular/material'

import { DynamicComponentLoader } from './dynamic-component-loader/dynamic-component-loader.service'
import { DialogComponent } from './dynamic-modules/dialog/dialog.component'
import { MessageComponent } from './dynamic-modules/message/message.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {

  @ViewChild('testOutlet', { read: ViewContainerRef }) testOutlet: ViewContainerRef

  constructor(
    private dynamicComponentLoader: DynamicComponentLoader,
    private dialog: MatDialog,
  ) {
  }

  loadComponent() {
    this.dynamicComponentLoader
      .getComponentFactory<MessageComponent>('message')
      .subscribe(componentFactory => {
        const ref = this.testOutlet.createComponent(componentFactory)
        ref.changeDetectorRef.detectChanges()
      }, error => {
        console.warn(error)
      })
  }

  showDialog() {
    this.dialog.open(DialogComponent)
  }
}
