import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Exercise } from '../exercise.model';
import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  exerciseSubscription: Subscription;

  constructor(private exerciseService: ExerciseService) {}

  ngOnDestroy(): void {
    this.exerciseSubscription.unsubscribe();
  }

  ngOnInit() {
    this.exerciseSubscription = this.exerciseService.exercisesChanged.subscribe(
      (exercises) => (this.exercises = exercises)
    );
    this.exerciseService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.exerciseService.startExercise(form.value.exerciseSelector);
  }
}
