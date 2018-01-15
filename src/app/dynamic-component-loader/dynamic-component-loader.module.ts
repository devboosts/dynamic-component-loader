import { ModuleWithProviders, NgModule, NgModuleFactoryLoader, SystemJsNgModuleLoader, Type } from '@angular/core';
import { ROUTES } from '@angular/router';

import { DynamicComponentLoader } from './dynamic-component-loader.service';
import { DYNAMIC_COMPONENT, DYNAMIC_COMPONENT_MANIFESTS, DynamicComponentManifest } from './dynamic-component-manifest';

@NgModule()
export class DynamicComponentLoaderModule {
  static forRoot(manifests: DynamicComponentManifest[]): ModuleWithProviders {
    return {
      ngModule: DynamicComponentLoaderModule,
      providers: [
        DynamicComponentLoader,
        { provide: NgModuleFactoryLoader, useClass: SystemJsNgModuleLoader },
        // provider for Angular CLI to analyze
        { provide: ROUTES, useValue: manifests, multi: true },
        // provider for DynamicComponentLoader to analyze
        { provide: DYNAMIC_COMPONENT_MANIFESTS, useValue: manifests },
      ],
    };
  }
  static forChild(component: Type<any>): ModuleWithProviders {
    return {
      ngModule: DynamicComponentLoaderModule,
      providers: [
        // provider for @angular/router to parse
        { provide: ROUTES, useValue: [], multi: true },
        // provider for DynamicComponentLoader to analyze
        { provide: DYNAMIC_COMPONENT, useValue: component },
      ],
    };
  }
}

export { DynamicComponentManifest } from './dynamic-component-manifest';
