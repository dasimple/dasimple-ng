import { Breakpoints } from '@angular/cdk/layout';
import { InjectionToken } from '@angular/core';

export const RESPONSIVE_TOOLBAR_BREAKPOINT = new InjectionToken<string>('Responsive toolbar breakpoint', {
  factory: () => Breakpoints.HandsetPortrait,
});
