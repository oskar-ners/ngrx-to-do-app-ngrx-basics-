import { Injectable, inject } from '@angular/core';
import { Task } from '../types/task.interface';
import {
  Firestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  firestore = inject(Firestore);

  getTasks(): Observable<Task[]> {
    const tasksCollection = collection(this.firestore, 'tasks');
    return from(getDocs(tasksCollection)).pipe(
      map((tasksData) => tasksData.docs.map((task) => task.data() as Task))
    );
  }

  addTask(newTask: string): Observable<Task> {
    const tasksCollection = collection(this.firestore, 'tasks');

    const task = {
      title: newTask,
      isCompleted: false,
    };

    return from(
      addDoc(tasksCollection, task).then((docRef) => {
        const taskWithId = {
          ...task,
          id: docRef.id,
        };

        return setDoc(docRef, taskWithId).then(() => taskWithId);
      })
    );
  }

  removeTask(toDoId: string): Observable<void> {
    const taskDocRef = doc(this.firestore, `tasks/${toDoId}`);
    return from(deleteDoc(taskDocRef));
  }

  editTask(taskId: string, updatedTask: Task): Observable<Task> {
    const taskDocRef = doc(this.firestore, `tasks/${taskId}`);

    return from(setDoc(taskDocRef, updatedTask, { merge: true })).pipe(
      map(() => updatedTask)
    );
  }
}
