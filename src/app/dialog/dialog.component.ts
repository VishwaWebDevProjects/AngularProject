import { Component } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  password = '';

  constructor(private dialog: MatDialogRef<DialogComponent>){}

  onNoClick(): void {
    this.dialog.close();
  }
}
