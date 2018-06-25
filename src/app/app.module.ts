import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatStepperModule,
  MatToolbarModule
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {ListTaskComponent} from './Components/list-task/list-task.component';
import {TaskComponent} from './Components/list-task/task/task.component';
import {NewTaskComponent} from './Components/list-task/task/new-task/new-task.component';
import {EditTaskComponent} from './Components/list-task/task/edit-task/edit-task.component';
import {TimeInputComponent} from './Components/time-input/time-input.component';
import {AmazingTimePickerModule} from 'amazing-time-picker';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {HighlightTaskDirective} from './Directives/highlight-task.directive';
import {DragSortableDirective} from './Directives/drag-sortable.directive';
import {DragService} from "./Service/drag.service";
import {StoreTaskService} from "./Store/store-task.service";
import {UploadTaskService} from "./Service/upload-task.service";

export const firebaseConfig = {
  apiKey: 'AIzaSyCRWULVGOHkCwtpWh0Mmj2aVDHkmJRS8KI',
  authDomain: 'taskmanager-639ed.firebaseapp.com',
  databaseURL: 'https://taskmanager-639ed.firebaseio.com',
  projectId: 'taskmanager-639ed',
  storageBucket: 'taskmanager-639ed.appspot.com',
  messagingSenderId: '725666041139'
};

@NgModule({
  declarations: [
    AppComponent,
    ListTaskComponent,
    TaskComponent,
    NewTaskComponent,
    EditTaskComponent,
    TimeInputComponent,
    HighlightTaskDirective,
    DragSortableDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    HttpClientModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatDialogModule,
    MatIconModule,
    AmazingTimePickerModule,
    MatStepperModule,
    MatDatepickerModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [DragService, {provide: StoreTaskService, useClass: StoreTaskService}, UploadTaskService],
  entryComponents: [EditTaskComponent, NewTaskComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
