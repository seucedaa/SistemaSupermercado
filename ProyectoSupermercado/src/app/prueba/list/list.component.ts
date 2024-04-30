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

  prueba!:Prueba[];
  constructor(private service: ServiceService, private router: Router,) { }

  ngOnInit(): void {
    this.service.getpruebas().subscribe((data: any) => {
      console.log(data);
      this.prueba = data;
    }, error =>{
      console.log(error);
    });
  }

}
