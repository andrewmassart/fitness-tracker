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
}
