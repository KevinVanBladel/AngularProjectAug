import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { trainingService } from '../services/training.service';
import { Training } from '../models/training';
import { Gebruiker } from '../models/gebruiker';
import { activiteitService } from '../services/activiteit.service';
import { Observable } from 'rxjs';
import { Activiteit } from '../models/activiteit';

@Component({
  selector: 'app-training-edit',
  templateUrl: './training-edit.component.html',
  styleUrls: ['./training-edit.component.css']
})
export class TrainingEditComponent implements OnInit {
  Trainingform: FormGroup;
  actionType: string;
  formNaam: string;
  formLocatie: string;
  formHoeveelheid: string;
  formActiviteitId: string;
  activiteiten$: Observable<Activiteit[]>;
  gebruiker = Gebruiker;
  id: number;
  errorMessage: any;
  existingTraining: Training;

  constructor(private trainingService: trainingService, private activiteitService: activiteitService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router) {
    const idParam = 'id';
    this.actionType ='toevoegen';
    this.formNaam ='Naam';
    this.formLocatie = 'Locatie';
    this.formHoeveelheid = 'Hoeveelheid';
    this.formActiviteitId = 'ActiviteitId';

    this.Trainingform = this.formBuilder.group(
      {
        Naam: ['', [Validators.required]],
        Locatie: ['', [Validators.required]],
        Hoeveelheid: [, [Validators.required]],
        ActiviteitId: ['', [Validators.required]]
      }
    )
    if (this.avRoute.snapshot.params[idParam]) {
      this.id = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit() {
    if (this.id > 0) {
      this.actionType ='aanpassen';
      this.trainingService.gettraining(this.id)
        .subscribe(data => (
          this.existingTraining = data,
          this.Trainingform.controls[this.formNaam].setValue(data.naam),
          this.Trainingform.controls[this.formLocatie].setValue(data.locatie),
          this.Trainingform.controls[this.formHoeveelheid].setValue(data.hoeveelheid.toString()),
          this.Trainingform.controls[this.formActiviteitId].setValue(data.activiteitId.toString())
        )); }
        this.activiteiten$ = this.activiteitService.getactiviteits();
  }

  save() {
    if (!this.Trainingform.valid) {
      return ;
    }
    if (this.actionType.toString() =='toevoegen') {
      let training: Training = {
        naam: this.Naam.value,
        locatie: this.Locatie.value,
        hoeveelheid: this.Hoeveelheid.value,
        activiteitId: this.ActiviteitId.value,
      };
      this.trainingService.savetraining(training);
      this.router.navigate(['/trainingen']);
    }

    if (this.actionType == 'aanpassen') {
      let training: Training = {
        naam: this.Naam.value,
        locatie: this.Locatie.value,
        hoeveelheid: this.Hoeveelheid.value,
        activiteitId: this.ActiviteitId.value

      };
      this.trainingService.updatetraining(this.id, training);
      this.router.navigate(['/trainingen']);
    }
  }

  cancel() {
    this.router.navigate(['/trainingen']);
  }

  get Naam() { return this.Trainingform.get(this.formNaam); }
  get Locatie() { return this.Trainingform.get(this.formLocatie); }
  get Hoeveelheid() {return this.Trainingform.get(this.formHoeveelheid.toString())}
  get ActiviteitId() {return this.Trainingform.get(this.formActiviteitId.toString())}
}