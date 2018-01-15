import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { V2ViewComponent } from './v2-view.component';

const routes: Routes = [
  { path: '', component: V2ViewComponent },
];

@NgModule({
  declarations: [
    V2ViewComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
  ],
})
export class V2ViewModule {}
