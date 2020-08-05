import { Component, OnInit } from '@angular/core';
import { gebruikerService } from '../services/gebruiker.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Username = new FormControl('')
  Password = new FormControl('')
  Loginform: FormGroup;
  formEmail: string;
  formPassword: string;
  returnUrl: string;
  constructor(private gebruikerService: gebruikerService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router) {
    this.returnUrl = this.avRoute.snapshot.queryParams['returnUrl'] || '/';
    this.Loginform = this.formBuilder.group(
      {
        Email: ['', [Validators.required]],
        Password: ['', [Validators.required]],

      }
    )
  }
  

  ngOnInit(): void {
  }

  login() {
    this.gebruikerService.login(this.Username.value, this.Password.value).pipe(first())
    .subscribe(
        data => {
            this.router.navigate([this.returnUrl]);
        });;
  }
}
