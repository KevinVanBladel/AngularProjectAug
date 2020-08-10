import { Component, OnInit } from '@angular/core';
import { Gebruiker } from '../models/gebruiker';
import { gebruikerService} from '../services/gebruiker.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
    currentUser: Gebruiker;
  
  
    constructor(private gebruikerService: gebruikerService) {
    }
  ngOnInit(): void {
  }
    isLoggedIn() {
    return this.gebruikerService.isLoggedIn();
    }
    logout() {
    this.gebruikerService.logout();
    }
  }