import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule, MatInputModule, MatNativeDateModule, MatSidenavModule, MatToolbarModule, MatListModule,MatTabsModule, MatCardModule,MatSelectModule, MatProgressSpinnerModule, MatDialogModule, MatTableModule, MatSortModule, MatPaginatorModule, MatSnackBarModule } from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSnackBarModule
  ],
  exports:[
     MatButtonModule,
     MatIconModule,
     MatFormFieldModule,
     MatInputModule,
     MatDatepickerModule,
     MatNativeDateModule,
     MatCheckboxModule,
     MatSidenavModule,
     MatToolbarModule,
     MatListModule,
     MatTabsModule,
     MatCardModule,
     MatSelectModule,
     MatProgressSpinnerModule,
     MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSnackBarModule

    ]
})
export class MaterialModule { }
