import { InjectionToken } from '@angular/core';

export const THEMING_DARK_CLASSNAME = new InjectionToken<string>('Theming dark class name', {
  factory: () => 'dark-theme',
});
