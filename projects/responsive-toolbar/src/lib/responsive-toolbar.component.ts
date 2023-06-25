import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Observable, map, startWith } from 'rxjs';
import { RESPONSIVE_TOOLBAR_BREAKPOINT } from './responsive-toolbar-breakpoint';

@Component({
  selector: 'dasimple-responsive-toolbar',
  templateUrl: './responsive-toolbar.component.html',
  styleUrls: ['./responsive-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ResponsiveToolbarComponent implements OnInit {
  /* Forward mat-toolbar inputs */
  @Input() color: ThemePalette;
  /* End forward inputs */

  @Input()
  get breakpoint() {
    return this._breakpoint;
  }
  set breakpoint(value: string | readonly string[] | undefined) {
    this._breakpoint = value;

    if (value) {
      this.observeBreakpoint(value);
    }
  }

  @Output() menuClick = new EventEmitter<void>();

  isBigToolbar$!: Observable<boolean>;

  private _breakpoint: string | readonly string[] | undefined;

  constructor(
    private breakpointObserver: BreakpointObserver,
    @Inject(RESPONSIVE_TOOLBAR_BREAKPOINT) private defaultBreakpoint: string | readonly string[],
  ) { }

  ngOnInit() {
    if (!this.breakpoint) {
      this.observeBreakpoint(this.defaultBreakpoint);
    }
  }

  private observeBreakpoint(value: string | readonly string[]) {
    this.isBigToolbar$ = this.breakpointObserver.observe(value).pipe(
      map((state) => state.matches),
      startWith(this.breakpointObserver.isMatched(value)),
    );
  }
}
