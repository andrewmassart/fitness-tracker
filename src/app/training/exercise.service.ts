import { Subject } from 'rxjs';

import { Exercise } from './exercise.model';

export class ExerciseService {
  exerciseChanged = new Subject<Exercise>();

  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'toes-touch', name: 'Toe Touches', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 },
  ];

  private currentRunningExercise: Exercise;
  private exercises: Exercise[] = [];

  getAvailableExercises() {
    // .slice() creates a new array that can be edited
    return this.availableExercises.slice();
  }

  startExercise(selectedId: string) {
    this.currentRunningExercise = this.availableExercises.find(
      (ex) => ex.id === selectedId
    );
    this.exerciseChanged.next({ ...this.currentRunningExercise });
  }

  completeExercise() {
    this.exercises.push({
      ...this.currentRunningExercise,
      date: new Date(),
      state: 'completed',
    });
    this.currentRunningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.exercises.push({
      ...this.currentRunningExercise,
      duration: this.currentRunningExercise.duration * (progress / 100),
      calories: this.currentRunningExercise.duration * (progress / 100),
      date: new Date(),
      state: 'cancelled',
    });
    this.currentRunningExercise = null;
    this.exerciseChanged.next(null);
  }

  getCurrentRunningExercise() {
    return { ...this.currentRunningExercise };
  }
}
