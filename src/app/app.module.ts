import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DynamicComponentLoaderModule, DynamicComponentManifest } from './dynamic-component-loader/dynamic-component-loader.module';

// This array defines which "componentId" maps to which lazy-loaded module.
const manifests: DynamicComponentManifest[] = [
  {
    componentId: 'message',
    path: 'dynamic-message', // some globally-unique identifier, used internally by the router
    loadChildren: './dynamic-modules/message/message.module#MessageModule',
  },
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    DynamicComponentLoaderModule.forRoot(manifests),
  ],
  providers: [],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
