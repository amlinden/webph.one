import { NgModule } from '@angular/core';
import {
  MatTabsModule,
  MatToolbarModule,
  MatButtonModule,
  MatGridListModule,
  MatIconModule,
  MatListModule,
  MatDialogModule,
  MatInputModule,
  MatCardModule

} from '@angular/material';

@NgModule({
  imports: [
    MatTabsModule,
    MatToolbarModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatInputModule,
    MatCardModule
  ],
  exports: [
    MatTabsModule,
    MatToolbarModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatInputModule,
    MatCardModule
  ],
})
export class CustomMaterialModule { }
