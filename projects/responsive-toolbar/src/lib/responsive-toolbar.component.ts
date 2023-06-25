import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output, ViewEncapsulation } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { map, startWith } from 'rxjs';
import { RESPONSIVE_TOOLBAR_BREAKPOINT } from './responsive-toolbar-breakpoint';

@Component({
  selector: 'dasimple-responsive-toolbar',
  templateUrl: './responsive-toolbar.component.html',
  styleUrls: ['./responsive-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ResponsiveToolbarComponent {
  /* Forward mat-toolbar inputs */
  @Input() color: ThemePalette;
  /* End forward inputs */

  @Output() menuClick = new EventEmitter<void>();

  isBigToolbar$ = this.breakpointObserver.observe(this.breakpoint).pipe(
    map((state) => state.matches),
    startWith(this.breakpointObserver.isMatched(this.breakpoint)),
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    @Inject(RESPONSIVE_TOOLBAR_BREAKPOINT) private breakpoint: string | readonly string[],
  ) { }
}
