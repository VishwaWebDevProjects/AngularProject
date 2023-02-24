import { Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-more-info-dialog',
  templateUrl: './more-info-dialog.component.html',
  styleUrls: ['./more-info-dialog.component.css']
})

export class MoreInfoDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data, private dialog: MatDialogRef<MoreInfoDialogComponent>) {}

  onNoClick(): void {
    this.dialog.close();
  }
}
