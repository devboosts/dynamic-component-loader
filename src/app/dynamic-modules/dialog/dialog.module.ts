import { NgModule } from '@angular/core'
import { DynamicComponentLoaderModule } from '../../dynamic-component-loader/dynamic-component-loader.module'
import { DialogComponent } from './dialog.component'

@NgModule({
  declarations: [
    DialogComponent,
  ],
  exports: [
    DialogComponent,
  ],
  imports: [
    DynamicComponentLoaderModule.forModule({
      componentId: 'dialog',
      path: 'dialog',
      loadChildren: './content/content.module#ContentModule',
    }),
  ],
})
export class DialogModule {
}
