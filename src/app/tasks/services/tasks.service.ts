import { Injectable, inject } from '@angular/core';
import { Task } from '../types/task.interface';
import {
  Firestore,
  addDoc,
  collection,
  getDocs,
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

    const task: Task = {
      title: newTask,
      id: Math.random().toString(36).substr(2, 9),
      isCompleted: false,
    };

    return from(
      addDoc(tasksCollection, task).then(() => ({
        ...task,
      }))
    );
  }
}
