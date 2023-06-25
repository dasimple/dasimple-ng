import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ResponsiveToolbarComponent } from './responsive-toolbar.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
  ],
  declarations: [
    ResponsiveToolbarComponent,
  ],
  exports: [
    ResponsiveToolbarComponent,
  ]
})
export class ResponsiveToolbarModule { }
