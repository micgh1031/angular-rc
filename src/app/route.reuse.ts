import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';

export class CustomReuseStrategy implements RouteReuseStrategy {
  routesToCache: string[] = ['user/'];
  storedRouteHandles = new Map<string, DetachedRouteHandle>();

  // Decides if the route should be stored
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return this.routesToCache.indexOf(this.getPath(route)) > -1;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    this.storedRouteHandles.set(this.getPath(route), handle);
  }

  // Return true if we have a stored route object for the next route
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return this.storedRouteHandles.has(this.getPath(route));
  }

  // If we returned true in shouldAttach(), now return the actual route data for restoration
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    return this.storedRouteHandles.get(this.getPath(route));
  }

  // Reuse the route if we're going to and from the same route
  shouldReuseRoute(curr: ActivatedRouteSnapshot, future: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig;
  }

  clearCache() {
    this.storedRouteHandles.clear();
  }

  private getPath(route: ActivatedRouteSnapshot) {
    let path = '';
    if (route.parent && route.parent.routeConfig) path += route.parent.routeConfig.path + '/';
    path += route.routeConfig.path;

    return path;
  }
}
