import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsModule } from '@ngxs/store';
import { DarkThemeState } from './state/dark-theme.state';
import { ThemePickerComponent } from './components/theme-picker/theme-picker.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    TranslateModule,
    NgxsModule.forFeature([DarkThemeState]),
  ],
  declarations: [
    ThemePickerComponent,
  ],
  exports: [
    ThemePickerComponent,
  ],
})
export class ThemingModule { }
