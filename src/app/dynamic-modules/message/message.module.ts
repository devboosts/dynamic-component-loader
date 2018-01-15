import { NgModule } from '@angular/core';

import { DynamicComponentLoaderModule } from '../../dynamic-component-loader/dynamic-component-loader.module';
import { MessageComponent } from './message.component';

@NgModule({
  declarations: [
    MessageComponent,
  ],
  imports: [
    DynamicComponentLoaderModule.forChild(MessageComponent),
  ],
})
export class MessageModule {}
