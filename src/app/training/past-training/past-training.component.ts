import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../exercise.model';
import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css'],
})
export class PastTrainingComponent implements OnInit {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  // MatTableDataSource always expects an array of type Object
  dataSource = new MatTableDataSource<Exercise>();

  constructor(private exerciseService: ExerciseService) {}

  ngOnInit() {
    this.dataSource.data = this.exerciseService.getCompletedOrCancelledExercises();
  }
}
