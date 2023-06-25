import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnInit, Optional, Output, ViewEncapsulation } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Observable, map, startWith } from 'rxjs';
import { RESPONSIVE_TOOLBAR_BREAKPOINT } from './responsive-toolbar-breakpoint';

const DEFAULT_BREAKPOINT = Breakpoints.HandsetPortrait;

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
  set breakpoint(value: string | readonly string[]) {
    this._breakpoint = value;

    this.observeBreakpoint(value);
  }

  @Output() menuClick = new EventEmitter<void>();

  bigToolbar$!: Observable<boolean>;

  private _breakpoint!: string | readonly string[];

  constructor(
    private breakpointObserver: BreakpointObserver,
    @Optional() @Inject(RESPONSIVE_TOOLBAR_BREAKPOINT) private defaultBreakpoint: string | readonly string[] | null,
  ) { }

  ngOnInit() {
    if (!this.breakpoint) {
      this.observeBreakpoint(this.defaultBreakpoint || DEFAULT_BREAKPOINT);
    }
  }

  private observeBreakpoint(value: string | readonly string[]) {
    this.bigToolbar$ = this.breakpointObserver.observe(value).pipe(
      map((state) => state.matches),
      startWith(this.breakpointObserver.isMatched(value)),
    );
  }
}
