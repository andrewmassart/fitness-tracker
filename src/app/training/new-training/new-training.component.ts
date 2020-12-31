import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from '../exercise.model';
import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit {
  exercises: Exercise[] = [];

  constructor(private exerciseService: ExerciseService) {}

  ngOnInit() {
    this.exercises = this.exerciseService.getAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.exerciseService.startExercise(form.value.exerciseSelector);
  }
}
