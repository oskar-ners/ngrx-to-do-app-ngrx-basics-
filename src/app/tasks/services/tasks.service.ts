import { Injectable, inject } from '@angular/core';
import { Task } from '../types/task.interface';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
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
}
