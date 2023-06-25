import { ChangeDetectionStrategy, Component, Inject, Input, ViewEncapsulation, booleanAttribute } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MAT_MENU_DEFAULT_OPTIONS, MatMenuDefaultOptions, MenuPositionX, MenuPositionY } from '@angular/material/menu';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { THEMING_TRANSLATE_NAMESPACE } from '../../tokens/theming-translate-namespace';
import { DarkThemeState } from '../../state/dark-theme.state';
import { SelectTheme } from '../../state/dark-theme.actions';

@Component({
  selector: 'gtrade-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ThemePickerComponent {
  @Select(DarkThemeState) current$!: Observable<boolean | null>;

  /* Forward inputs to mat-menu */

  @Input() menuXPosition: MenuPositionX = 'after';
  @Input() menuYPosition: MenuPositionY = 'below';
  @Input({ transform: booleanAttribute }) menuOverlapTrigger = false;
  @Input({ transform: booleanAttribute }) menuTriggerRestoreFocus = true;

  /* End forwards */

  @Input() checkedColor: ThemePalette = 'accent';
  @Input() iconLight = 'light_mode';
  @Input() iconDark = 'dark_mode';
  @Input() iconAuto = 'invert_colors';
  @Input() iconChecked = 'radio_button_checked';
  @Input() iconUnchecked = 'radio_button_unchecked';

  constructor(
    @Inject(MAT_MENU_DEFAULT_OPTIONS) menuDefaultOptions: MatMenuDefaultOptions,
    private store: Store,
    @Inject(THEMING_TRANSLATE_NAMESPACE) public translateNamespace: string,
  ) {
    this.menuXPosition = menuDefaultOptions.xPosition;
    this.menuYPosition = menuDefaultOptions.yPosition;
    this.menuOverlapTrigger = menuDefaultOptions.overlapTrigger;
  }

  selectWithTimeout(active: boolean | null) {
    // Prevent instant color change, wait for menu to close
    setTimeout(() => this.store.dispatch(
      new SelectTheme(active),
    ), 150);
  }
}
