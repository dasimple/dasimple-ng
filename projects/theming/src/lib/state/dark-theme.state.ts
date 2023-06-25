import { MediaMatcher } from '@angular/cdk/layout';
import { Inject, Injectable } from '@angular/core';
import { State, StateContext, Action, StateToken, NgxsOnInit } from '@ngxs/store';
import { THEMING_DARK_CLASSNAME } from '../tokens/theming-dark-classname';
import { SelectTheme } from './dark-theme.actions';

@State({
  name: new StateToken<boolean | null>('darkTheme'),
  defaults: null,
})
@Injectable()
export class DarkThemeState implements NgxsOnInit {
  private darkMediaQuery = this.mediaMatcher.matchMedia('(prefers-color-scheme: dark)');

  constructor(
    private mediaMatcher: MediaMatcher,
    @Inject(THEMING_DARK_CLASSNAME) private darkClassname: string,
  ) { }

  ngxsOnInit(ctx: StateContext<boolean | null>) {
    const current = ctx.getState();

    if (typeof current === 'boolean') {
      this.toggleDarkTheme(current);
    } else {
      this.listenToMediaQuery();
    }
  }

  @Action(SelectTheme)
  selectTheme(ctx: StateContext<boolean | null>, { active }: SelectTheme) {
    ctx.setState(active);

    if (typeof active === 'boolean') {
      this.toggleDarkTheme(active);

      this.darkMediaQuery.removeEventListener('change', this.mediaQueryChanged);
    } else {
      this.listenToMediaQuery();
    }
  }

  private toggleDarkTheme(active: boolean) {
    document.body.classList.toggle(this.darkClassname, active);
  }

  private mediaQueryChanged(e: MediaQueryListEvent) {
    this.toggleDarkTheme(e.matches);
  }

  private listenToMediaQuery() {
    this.toggleDarkTheme(this.darkMediaQuery.matches);

    this.darkMediaQuery.addEventListener('change', this.mediaQueryChanged);
  }
}
