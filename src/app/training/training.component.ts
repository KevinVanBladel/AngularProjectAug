import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  returnUrl: string

  constructor(private trainingService: trainingService, private avRoute: ActivatedRoute, private router: Router) {
    this.returnUrl = "http://localhost:4200/login";
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]) {
      this.id = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit() {
    if (localStorage.getItem("currentUser") == null){
      this.router.navigate([]);
    }
    this.loadTraining();
  }

  loadTraining() {
    this.training$ = this.trainingService.gettraining(this.id);
  }
}