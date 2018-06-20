import { NgModule } from '@angular/core'
import { MatDialogModule } from '@angular/material'
import { BrowserModule } from '@angular/platform-browser'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component'
import {
  DynamicComponentLoaderModule,
  DynamicComponentManifest,
} from './dynamic-component-loader/dynamic-component-loader.module'
import { DialogComponent } from './dynamic-modules/dialog/dialog.component'
import { DialogModule } from './dynamic-modules/dialog/dialog.module'

// This array defines which "componentId" maps to which lazy-loaded module.
const manifests: DynamicComponentManifest[] = [
  {
    componentId: 'message',
    path: 'dynamic-message', // some globally-unique identifier, used internally by the router
    loadChildren: './dynamic-modules/message/message.module#MessageModule',
  },
  {
    componentId: 'dialog',
    path: 'dialog',
    loadChildren: './dynamic-modules/dialog/dialog.module#DialogModule',
  },
]

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    DialogModule,

    MatDialogModule,
    NoopAnimationsModule,

    DynamicComponentLoaderModule.forRoot(manifests),
  ],
  providers: [],
  bootstrap: [
    AppComponent,
  ],
  entryComponents: [
    DialogComponent,
  ],
})
export class AppModule {
}
