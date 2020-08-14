import { Component, OnInit } from '@angular/core';
import { gebruikerService } from '../services/gebruiker.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  Registerform: FormGroup;
  constructor(private gebruikerService: gebruikerService, private formBuilder: FormBuilder, private router: Router) { 
 
  }
  

  ngOnInit() {
    this.Registerform = this.formBuilder.group(
      {
        Firstname: [''],
        Lastname:[''],
        Username: ['', [Validators.required]],
        Password: ['', [Validators.required, Validators.minLength(8)]],
      }
    )
  }

  onSubmit() {
    this.gebruikerService.register(this.f.Username.value, this.f.Password.value, this.f.Firstname.value, this.f.Lastname.value)
    this.router.navigate(['/home'])
    };;
  get f() { return this.Registerform.controls; }
}
