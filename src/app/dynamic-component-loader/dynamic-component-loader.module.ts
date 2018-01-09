import { ModuleWithProviders, NgModule, NgModuleFactoryLoader, SystemJsNgModuleLoader } from '@angular/core';
import { ROUTES } from '@angular/router';

import { DynamicComponentLoader } from './dynamic-component-loader.service';
import { DYNAMIC_COMPONENT_MANIFESTS, DynamicComponentManifest } from './dynamic-component-manifest';

@NgModule({
  providers: [
    DynamicComponentLoader,
    { provide: NgModuleFactoryLoader, useClass: SystemJsNgModuleLoader },
  ],
})
export class DynamicComponentLoaderModule {
  static forRoot(manifests: DynamicComponentManifest[]): ModuleWithProviders {
    return {
      ngModule: DynamicComponentLoaderModule,
      providers: [
        // provider for Angular CLI to analyze
        { provide: ROUTES, useValue: manifests, multi: true },
        // provider for DynamicComponentLoader to analyze
        { provide: DYNAMIC_COMPONENT_MANIFESTS, useValue: manifests },
      ],
    };
  }
}

export { DynamicComponentManifest } from './dynamic-component-manifest';
