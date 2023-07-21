import { Component } from '@angular/core';
import {Task} from './task/task';
import {CdkDragDrop, transferArrayItem} from '@angular/cdk/drag-drop';
import {MatDialog} from '@angular/material/dialog';
import {TaskDialogComponent, TaskDialogResult} from './task-dialog/task-dialog.component';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {BehaviorSubject, Observable} from 'rxjs';

const getObservable = (collection: AngularFirestoreCollection<Task[]>) => {
  const subject = new BehaviorSubject<Task[]>([]);
  // @ts-ignore
  collection.valueChanges({ idField: 'id' }).subscribe((val: Task[]) => {
    subject.next(val);
  });
  return subject;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kanban-fire';
  todo = getObservable(this.store.collection('todo')) as Observable<Task[]>;
  inProgress = getObservable(this.store.collection('inProgress')) as Observable<Task[]>;
  done = getObservable(this.store.collection('done')) as unknown as Observable<Task[]>;


  constructor( private dialog: MatDialog,
               private store: AngularFirestore) {

  }

  editTask(list: 'done' | 'todo' | 'inProgress', task: Task): void {
    console.log(task);
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task,
        enableDelete: true
      },
    });
    // @ts-ignore
    dialogRef.afterClosed().subscribe().unsubscribe((result: TaskDialogResult|undefined) => {
      if (!result) {
        return;
      }

      if (result.delete) {
        this.store.collection(list).doc(task.id).delete();
      } else {
        this.store.collection(list).doc(task.id).update(task);
      }
    });
  }
  drop(event: CdkDragDrop<Task[]|null>): void {
    console.log(event);
    console.log(event.container.element.nativeElement);
    if (event.previousContainer === event.container) {
      return;
    }
    // if (!event.container.data || !event.previousContainer.data) {
    //   return;
    // }
    const item = event.previousContainer.data[event.previousIndex];
    // @ts-ignore
    this.store.firestore.runTransaction(() => {
      const promise =  Promise.all([
        this.store.collection(event.previousContainer.id).doc(item.id).delete(),
        this.store.collection(event.container.id).add(item),
      ]);
      return promise;
    });

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  newTask(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task: {}
      },
    });
    dialogRef.afterClosed().subscribe((result: TaskDialogResult | undefined) => {
      console.log(result);
      if (!result) {
        return;
      }
      // this.todo.push(result.task);
      this.store.collection('todo').add(result.task);
    });
  }

}
