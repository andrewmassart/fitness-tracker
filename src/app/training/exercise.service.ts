import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Exercise } from './exercise.model';

@Injectable()
export class ExerciseService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();

  private availableExercises: Exercise[] = [];
  private currentRunningExercise: Exercise;

  constructor(private db: AngularFirestore) {}

  fetchAvailableExercises() {
    this.db
      .collection('availableExercises')
      .snapshotChanges()
      .pipe(
        map((docArray) => {
          return docArray.map((doc) => {
            return {
              id: doc.payload.doc.id,
              ...(doc.payload.doc.data() as Exercise),
            };
          });
        })
      )
      .subscribe((exercises: Exercise[]) => {
        this.availableExercises = exercises;
        this.exercisesChanged.next([...this.availableExercises]);
      });
  }

  startExercise(selectedId: string) {
    this.currentRunningExercise = this.availableExercises.find(
      (ex) => ex.id === selectedId
    );
    this.exerciseChanged.next({ ...this.currentRunningExercise });
  }

  completeExercise() {
    this.addDataToDatabase({
      ...this.currentRunningExercise,
      date: new Date(),
      state: 'completed',
    });
    this.currentRunningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.currentRunningExercise,
      duration: this.currentRunningExercise.duration * (progress / 100),
      calories: this.currentRunningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled',
    });
    this.currentRunningExercise = null;
    this.exerciseChanged.next(null);
  }

  getCurrentRunningExercise() {
    return { ...this.currentRunningExercise };
  }

  fetchCompletedOrCancelledExercises() {
    this.db
      .collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises: Exercise[]) => {
        this.finishedExercisesChanged.next(exercises);
      });
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}
