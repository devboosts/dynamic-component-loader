import {
  ComponentFactory,
  Inject,
  Injectable,
  Injector,
  NgModuleFactory,
  NgModuleFactoryLoader,
  Compiler
} from '@angular/core';
import { from, Observable, throwError, of,  } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import {
  DynamicComponentManifest,
  DYNAMIC_COMPONENT,
  DYNAMIC_COMPONENT_MANIFESTS,
  DYNAMIC_MODULE
} from './dynamic-component-manifest';

@Injectable()
export class DynamicComponentLoader {
  constructor(
    @Inject(DYNAMIC_COMPONENT_MANIFESTS)
    private manifests: DynamicComponentManifest[],
    private loader: NgModuleFactoryLoader,
    private injector: Injector,
    private compiler: Compiler
  ) {}

  /**
   * Get the value as an observable
   *
   * @template T
   * @param {(T | NgModuleFactory<T> | Promise<T> | Observable<T>)} value
   * @returns
   * @memberof LibConfigService
   */
  private _wrapIntoObservable<T>(value: T | NgModuleFactory<T> | Promise<T> | Observable<T>) {
    if (value instanceof Observable) {
      return value;
    } else if (value instanceof Promise) {
      return from(value);
    } else {
      return of(value);
    }
  }

  /**
   *  Retrieve a ComponentFactory, based on the specified componentId
   *  (defined in the DynamicComponentManifest array).
   *
   * @template T
   * @param {string} componentId
   * @param {Injector} [injector]
   * @returns {Observable<ComponentFactory<T>>}
   * @memberof DynamicComponentLoader
   */
  getComponentFactory<T>(
    componentId: string,
    injector?: Injector
  ): Observable<ComponentFactory<T>> {
    const manifest = this.manifests.find(m => m.componentId === componentId);
    if (!manifest) {
      return throwError(
        `DynamicComponentLoader: Unknown componentId "${componentId}"`
      );
    }

    const path = manifest.loadChildren;

    if (!path) {
      throw new Error(`${componentId} unknown!`);
    }

    // Check the path type
    if (path instanceof Function) {
      return this._wrapIntoObservable(path()).pipe(mergeMap((t: any) => {
        let moduleFactory = null;
        const offlineMode = this.compiler instanceof Compiler;
        //  true means AOT enalbed compiler (Prod build), false means JIT enabled compiler (Dev build)
        moduleFactory = offlineMode ? t : this.compiler.compileModuleSync(t);
        return this.loadFactory<T>(moduleFactory, componentId, injector);
      }));
    } else {
      return from(this.load<T>(path, componentId, injector));
    }
  }

  /**
   * Get the instance of the component factory
   *
   * @template T
   * @param {string} path
   * @param {string} componentId
   * @param {Injector} [injector]
   * @returns {Promise<ComponentFactory<T>>}
   * @memberof DynamicComponentLoader
   */
  async load<T>(
    path: string,
    componentId: string,
    injector?: Injector
  ): Promise<ComponentFactory<T>> {
    const ngModuleFactory = await this.loader.load(path);
    return await this.loadFactory<T>(ngModuleFactory, componentId, injector);
  }

  /**
   * Load the factory object
   *
   * @template T
   * @param {NgModuleFactory<any>} ngModuleFactory
   * @param {string} componentId
   * @param {Injector} [injector]
   * @returns {Promise<ComponentFactory<T>>}
   * @memberof DynamicComponentLoader
   */
  loadFactory<T>(
    ngModuleFactory: NgModuleFactory<any>,
    componentId: string,
    injector?: Injector
  ): Promise<ComponentFactory<T>> {
    const moduleRef = ngModuleFactory.create(injector || this.injector);
    const dynamicComponentType = moduleRef.injector.get(
      DYNAMIC_COMPONENT,
      null
    );
    if (!dynamicComponentType) {
      const dynamicModule: DynamicComponentManifest = moduleRef.injector.get(
        DYNAMIC_MODULE,
        null
      );

      if (!dynamicModule) {
        throw new Error(
          'DynamicComponentLoader: Dynamic module for' +
            ` componentId "${componentId}" does not contain` +
            ' DYNAMIC_COMPONENT or DYNAMIC_MODULE as a provider.'
        );
      }
      if (dynamicModule.componentId !== componentId) {
        throw new Error(
          'DynamicComponentLoader: Dynamic module for' +
            `${componentId} does not match manifest.`
        );
      }

      const path = dynamicModule.loadChildren;

      if (!path) {
        throw new Error(`${componentId} unknown!`);
      }

      if (path instanceof Function) {
        return this._wrapIntoObservable(path()).pipe(mergeMap((t: any) => {
          let moduleFactory = null;
          const offlineMode = this.compiler instanceof Compiler;
          //  true means AOT enalbed compiler (Prod build), false means JIT enabled compiler (Dev build)
          moduleFactory = offlineMode ? t : this.compiler.compileModuleSync(t);
          return this.loadFactory<T>(moduleFactory, componentId, injector);
        })).toPromise();
      } else {
        return this.load<T>(path, componentId, injector);
      }
    }

    return Promise.resolve(
      moduleRef.componentFactoryResolver.resolveComponentFactory<T>(
        dynamicComponentType
      )
    );
  }
}
