import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'v1', loadChildren: './views/v1/v1-view.module#V1ViewModule' },
  { path: 'v2', loadChildren: './views/v2/v2-view.module#V2ViewModule' },
  { path: '**', redirectTo: '/v1' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    preloadingStrategy: PreloadAllModules,
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
