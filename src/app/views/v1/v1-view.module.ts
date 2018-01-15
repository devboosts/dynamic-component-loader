import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { V1ViewComponent } from './v1-view.component';

const routes: Routes = [
  { path: '', component: V1ViewComponent },
];

@NgModule({
  declarations: [
    V1ViewComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
  ],
})
export class V1ViewModule {}
