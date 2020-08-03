import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { trainingService } from '../services/training.service';
import { Training } from '../models/training';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  training$: Observable<Training>;
  id: number;

  constructor(private trainingService: trainingService, private avRoute: ActivatedRoute) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]) {
      this.id = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit() {
    this.loadTraining();
  }

  loadTraining() {
    this.training$ = this.trainingService.gettraining(this.id);
  }
}