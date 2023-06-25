import { InjectionToken } from '@angular/core';

export const THEMING_TRANSLATE_NAMESPACE = new InjectionToken<string>('Theming translate namespace', {
  factory: () => 'theming.',
});
