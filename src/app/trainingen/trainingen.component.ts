import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { trainingService } from '../services/training.service';
import { Training } from '../models/training';

@Component({
  selector: 'app-trainingen',
  templateUrl: './trainingen.component.html',
  styleUrls: ['./trainingen.component.css']
})
export class TrainingenComponent implements OnInit {
 trainingen$: Observable<Training[]>;

  constructor(private trainingService: trainingService ) {
  }

  ngOnInit() {
   this.loadtrainingen();
  }

  loadtrainingen() {
    this.trainingen$ = this.trainingService.gettrainings();
  }

  delete(id) {
    const ans = confirm('Wilt u de training met id: ' + id + ' verwijderen?');
    if (ans) {
      this.trainingService.deletetraining(id).subscribe((data) => {
        this.loadtrainingen();
      });
    }
  }
}