// import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { MessageService } from 'primeng/api';
// import { Producto } from 'src/app/demo/models/ProductoViewModel';
// import { ReporteService } from 'src/app/demo/service/reporte.service';
// import { SucursalService } from 'src/app/demo/service/sucursal.service';
// import { Sucursal } from 'src/app/demo/models/SucursalViewModel';
// import { Subscription } from 'rxjs';
// import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';

// @Component({
//   templateUrl: './stock.component.html',
//   providers: [MessageService]
// })

// export class StockComponent implements OnInit  {
  
//   pdfSrc: SafeResourceUrl | null = null;
//   Reporte_1: boolean = false;
//   Reporte_2: boolean = false;
//   selectedMetodo: string = '2';
//   Producto!:Producto[];

//   sucursales: Sucursal[] = [];
//     sucursalid: any;
    
//   constructor(private sucursalservice:SucursalService,private rservice: ReporteService, private sanitizer: DomSanitizer) { }

//   ngOnInit(): void {
//     const sucursa = parseInt(localStorage.getItem('sucursal'));

//     this.rservice.Stock(sucursa).subscribe((data: any)=>{
//       this.Producto = data;
//       console.log(data);
//       const cuerpo = this.Producto.map(item => [
//         item.categ_Descripcion,
//         item.subca_Descripcion,
//       ]);

//       //const img = "assets/layout/images/lacolonia/manzana.jpeg";
//       const blob = this.rservice.Stock(cuerpo, img);
//       const url = URL.createObjectURL(blob);
//       this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
//   },error=>{
//     console.log(error);
//   });
//   }

  
//   selectMetodoPago(metodo: string) {
//     this.selectedMetodo = metodo;
//     this.service.getControlStock(this.selectedMetodo).subscribe((data: any)=>{
//       this.Stock = data;
//       console.log(data);
//       const cuerpo = this.Stock.map(item => [
//         item.categoria.toString(),
//         item.producto.toString(),
//         item.stock.toString(),
//       ]);

//       const img = "assets/demo/images/galleria/Esmeraldas.png";
//       const blob = this.yService.ReporteStock(cuerpo, img);
//       const url = URL.createObjectURL(blob);
//       this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
//       console.log("Se muestra xd");
//   },error=>{
//     console.log(error);
//   });

   
//     console.log(metodo);
// }
  
// }