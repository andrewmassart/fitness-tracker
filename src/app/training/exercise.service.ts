import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Exercise } from './exercise.model';
import { UIService } from '../shared/ui.service';

@Injectable()
export class ExerciseService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();

  private availableExercises: Exercise[] = [];
  private currentRunningExercise: Exercise;
  private firebaseSubscriptions: Subscription[] = [];

  constructor(private db: AngularFirestore, private uiService: UIService) {}

  fetchAvailableExercises() {
    this.uiService.loadingStateChanged.next(true);
    this.firebaseSubscriptions.push(
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
        .subscribe(
          (exercises: Exercise[]) => {
            this.uiService.loadingStateChanged.next(false);
            this.availableExercises = exercises;
            this.exercisesChanged.next([...this.availableExercises]);
          },
          (error) => {
            this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackBar(
              'Fetching Exercises failed, please try again later',
              null,
              3000
            );
            this.exercisesChanged.next(null);
          }
        )
    );
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
      state: 'incomplete',
    });
    this.currentRunningExercise = null;
    this.exerciseChanged.next(null);
  }

  getCurrentRunningExercise() {
    return { ...this.currentRunningExercise };
  }

  fetchCompletedOrCanceledExercises() {
    this.firebaseSubscriptions.push(
      this.db
        .collection('finishedExercises')
        .valueChanges()
        .subscribe((exercises: Exercise[]) => {
          this.finishedExercisesChanged.next(exercises);
        })
    );
  }

  cancelSubscriptions() {
    this.firebaseSubscriptions.forEach((sub) => sub.unsubscribe());
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}
