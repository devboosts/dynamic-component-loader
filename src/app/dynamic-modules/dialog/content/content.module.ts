import { NgModule } from '@angular/core'
import { DynamicComponentLoaderModule } from '../../../dynamic-component-loader/dynamic-component-loader.module'
import { ContentComponent } from './content.component'

@NgModule({
  declarations: [
    ContentComponent,
  ],
  imports: [
    DynamicComponentLoaderModule.forChild(ContentComponent),
  ],
})
export class ContentModule {
}
