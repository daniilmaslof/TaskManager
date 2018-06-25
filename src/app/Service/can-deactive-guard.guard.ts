// import {Component, Inject, Injectable} from '@angular/core';
// import {Observable} from "rxjs/Observable";
// import {ActivatedRouteSnapshot, CanDeactivate, Router, RouterStateSnapshot} from "@angular/router";
// import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material";
// export interface CanComponentDeactivate {
//   canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
// }
// @Injectable()
// export class CanDeactiveGuardService implements CanDeactivate<CanComponentDeactivate> {
//
//   constructor(public dialog: MatDialog, private router: Router) {
//   }
//   openDialog(companent, nextState ): Observable<boolean> {
//     let answer;
//     let dialogRef = this.dialog.open(DialogOverviewExampleDialog,  {
//       width: '400px',
//       height: '350px',
//       data: companent.model
//     } as MatDialogConfig<any>);
//     return dialogRef.afterClosed();
// }
//   canDeactivate(component,
//                 route: ActivatedRouteSnapshot,
//                 state: RouterStateSnapshot,
//                 nextState: RouterStateSnapshot) {
//
//     let url: string = state.url;
//     console.log('Url: ' + url);
//     if (component.canDeactivate()) {
//       return true;
//     } else {
//       this.openDialog(component, nextState).subscribe(
//         data => {
//           if (data === true) {
//             this.router.navigateByUrl(nextState.url);
//             component.sendData = true;
//             console.log(component.model);
//           } else if (data === false) {
//             this.router.navigateByUrl(nextState.url);
//             component.sendData = true;
//           }
//         });
//     }
//     // return component.canDeactivate ? component.canDeactivate() : true;
//   }
// }
// @Component({
//   selector: 'app-dialog-overview-example-dialog',
//   template: `<h1 mat-dialog-title>Сохранить данные и закрыть</h1>
//   <div mat-dialog-content>
//   </div>
//   <div mat-dialog-actions>
//     <button mat-button (click)="onNoClick()">Назад</button>
//     <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Send</button>
//     <button mat-button [mat-dialog-close]="false" cdkFocusInitial>Не сохранять</button>
//   </div>
//   `})
// export class DialogOverviewExampleDialog {
//   isSpeaker: boolean = false;
//   isLecture: boolean = false;
//   constructor(
//     public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
//     @Inject(MAT_DIALOG_DATA) public data: any) {
//     console.log(data);
//   }
//
//   onNoClick(): void {
//     this.dialogRef.close();
//   }
// }
