import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { DragDropModule } from '@angular/cdk/drag-drop';



@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule, MatIconModule, MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatTableModule, MatDialogModule,
    MatButtonToggleModule,
  ],
  exports: [
    CommonModule,
    MatSidenavModule, MatIconModule, MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatTableModule, MatDialogModule,
    MatButtonToggleModule,
  ],
  providers: [

  ],
  declarations: []
})
export class CustomMaterialModule {
  static forRoot() {
    return {
      ngModule: CustomMaterialModule,
    };
  }
}
