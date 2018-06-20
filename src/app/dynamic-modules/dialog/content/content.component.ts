import { Component } from '@angular/core'
import { MatDialogRef } from '@angular/material'
import { DialogComponent } from '../dialog.component'

@Component({
  selector: 'app-content-component',
  template: `
    <h1>Dynamic Dialog Content!</h1>
    <button (click)="dialogRef.close()">Close</button>
  `,
})
export class ContentComponent {

  constructor(public dialogRef: MatDialogRef<DialogComponent>) {
  }

}
