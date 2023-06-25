export class SelectTheme {
  static readonly type = '[Theme] Select dark theme or system default';
  constructor(public active: boolean | null) {}
}
