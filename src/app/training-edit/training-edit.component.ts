import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { trainingService } from '../services/training.service';
import { Training } from '../models/training';
import { Identifiers } from '@angular/compiler';

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
  formHoeveelheid: number;
  formActiviteitId: number;
  formGebruikerId: string;
  id: number;
  errorMessage: any;
  existingTraining: Training;

  constructor(private trainingService: trainingService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router) {

    this.Trainingform = this.formBuilder.group(
      {
        id: ['', [Validators.required]],
        Naam: ['', [Validators.required]],
        Locatie: ['', [Validators.required]],
        Hoeveelheid: ['', [Validators.required]],
        ActiviteitId: ['', [Validators.required]],
        GebruikerId: ['', [Validators.nullValidator]]
      }
    )
  }

  ngOnInit() {

    if (this.id > 0) {
      this.actionType = 'Edit';
      this.trainingService.gettraining(this.id)
        .subscribe(data => (
          this.existingTraining = data,
          this.Trainingform.controls[this.formNaam].setValue(data.naam),
          this.Trainingform.controls[this.formLocatie].setValue(data.Locatie),
          this.Trainingform.controls[this.formHoeveelheid].setValue(data.Hoeveelheid),
          this.Trainingform.controls[this.formActiviteitId].setValue(data.ActiviteitId),
          this.Trainingform.controls[this.formGebruikerId].setValue(data.GebruikerId)
        ));
    }
  }

  save() {
    if (!this.Trainingform.valid) {
      return;
    }

    if (this.actionType === 'Add') {
      let training: Training = {
        naam: this.Trainingform.get(this.formNaam).value,
        Locatie: this.Trainingform.get(this.formLocatie).value,
        Hoeveelheid: this.Trainingform.get(this.formHoeveelheid.toString()).value,
        ActiviteitId:this.Trainingform.get(this.formActiviteitId.toString()).value,
        GebruikerId:this.Trainingform.get(this.formGebruikerId).value


      };

      this.trainingService.savetraining(training)
        .subscribe((data) => {
          this.router.navigate(['/trainingen']);
        });
    }

    if (this.actionType === 'Edit') {
      let training: Training = {
        id: this.existingTraining.id,
        naam: this.existingTraining.naam,
        Locatie: this.existingTraining.Locatie,
        Hoeveelheid: this.Trainingform.get(this.formHoeveelheid.toString()).value,
        ActiviteitId: this.existingTraining.ActiviteitId,
        GebruikerId: this.existingTraining.GebruikerId
      };
      this.trainingService.updatetraining(training.id, training)
        .subscribe((data) => {
          this.router.navigate([this.router.url]);
        });
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }

  get Naam() { return this.Trainingform.get(this.formNaam); }
  get Locatie() { return this.Trainingform.get(this.formLocatie); }
  get Hoeveelheid() {return this.Trainingform.get(this.formHoeveelheid.toString())}
  get ActiviteitId() {return this.Trainingform.get(this.formActiviteitId.toString())}
  get GebruikerId() {return this.Trainingform.get(this.formGebruikerId)}
}