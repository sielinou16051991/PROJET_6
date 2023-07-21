import {Component, Inject, OnInit} from '@angular/core';
import {Task} from '../task/task';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent implements OnInit {

  private backUpTask: Partial<Task> = { ...this.data.task };
  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogData
  ) { }

  cancel(): void {
    this.data.task.title = this.backUpTask.title;
    this.data.task.description = this.backUpTask.description;
    this.dialogRef.close(this.data);
  }
  deletTask(): void {
    this.data.task.title = '';
    this.data.task.description = '';
    this.dialogRef.close(this.data);
  }

  ngOnInit(): void {
    console.log('Donnée à l\'ouverture', this.backUpTask);
  }

}


export interface TaskDialogData {
  task: Partial<Task>;
  enableDelete: boolean;
}

export interface TaskDialogResult {
  task: Task;
  delete?: boolean;
}
