import { NgModule } from '@angular/core';

import { DYNAMIC_COMPONENT } from '../../dynamic-component-loader/dynamic-component-manifest';
import { MessageComponent } from './message.component';

@NgModule({
  declarations: [
    MessageComponent,
  ],
  imports: [
  ],
  providers: [
    { provide: DYNAMIC_COMPONENT, useValue: MessageComponent },
  ],
  entryComponents: [
    MessageComponent,
  ],
})
export class MessageModule {}
