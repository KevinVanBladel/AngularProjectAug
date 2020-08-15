import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Gebruiker } from '../models/gebruiker';
import { Observable } from 'rxjs';
import { gebruikerService } from '../services/gebruiker.service';
import { stringify } from '@angular/compiler/src/util';
import { GenerateBaseOptions } from 'rxjs/internal/observable/generate';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit {
  gebruiker$: Observable<Gebruiker>;
  gebruiker: Gebruiker;

  constructor(private gebruikerService: gebruikerService) {

  }

  ngOnInit() {
    this.gebruiker$ = this.gebruikerService.GetUser()
    this.gebruiker$.subscribe(
      geb =>( this.gebruiker = geb
        ))
        this.Download();
  }
  Download(){
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
          var data = this.gebruiker;
          var docDefinition = {
              content: [{
                columns: [
                  { text: "Voornaam: " + data.voornaam },
                  { text: "Achternaam: " + data.achternaam },
                  { text: "Gebruikernaam: " + data.userName },
                  { text: "Wachtwoord: " + data.passwordHash }     
            ]}]
          };
          pdfMake.createPdf(docDefinition).download("accountgegevens.pdf");
        }
      }
