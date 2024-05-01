import { Component, OnInit } from '@angular/core';
import { Prueba } from 'src/app/Models/pruebaViewModel';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/Services/service.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  prueba: Prueba[] = []; 

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.service.getpruebas().subscribe((response: any) => { 
      console.log(response); 
      this.prueba = response; 
    }, error => {
      console.log(error);
    });
  }
}
