import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { trainingService } from '../services/training.service';
import { activiteitService } from '../services/activiteit.service';
import { gebruikerService } from '../services/gebruiker.service'
import { Training } from '../models/training';
import { Activiteit } from '../models/activiteit'

@Component({
  selector: 'app-trainingen',
  templateUrl: './trainingen.component.html',
  styleUrls: ['./trainingen.component.css']
})
export class TrainingenComponent implements OnInit {
 trainingen$: Observable<Training[]>;
 activiteiten$: Observable<Activiteit[]>;

  constructor(private trainingService: trainingService, private activiteitService: activiteitService, private gebruikerService: gebruikerService ) {
  }

  ngOnInit() {
if(this.gebruikerService.isLoggedIn()){
   this.loadtrainingen();
   this.loadactiviteiten();
}
  }

  loadtrainingen() {
    this.trainingen$ = this.trainingService.gettrainings();
  }
  loadactiviteiten(){
    this.activiteiten$ = this.activiteitService.getactiviteits();
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