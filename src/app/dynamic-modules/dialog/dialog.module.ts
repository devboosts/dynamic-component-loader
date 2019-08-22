import { NgModule } from '@angular/core';
import { DynamicComponentLoaderModule } from '../../dynamic-component-loader/dynamic-component-loader.module';
import { DialogComponent } from './dialog.component';

@NgModule({
  declarations: [DialogComponent],
  exports: [DialogComponent],
  imports: [
    DynamicComponentLoaderModule.forModule({
      componentId: 'dialog',
      path: 'dialog',
      loadChildren: () => import('./content/content.module').then(m => m.ContentModule)
    })
  ]
})
export class DialogModule {}
