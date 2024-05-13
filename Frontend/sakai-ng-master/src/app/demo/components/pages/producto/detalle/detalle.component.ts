import { Component, OnInit } from '@angular/core'
import { MessageService } from 'primeng/api'

import { Table } from 'primeng/table'
import { ProductoService } from 'src/app/demo/service/producto.service'
import { Producto } from 'src/app/demo/models/ProductoViewModel'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  templateUrl: './detalle.component.html',
  providers: [MessageService],
})
export class DetalleComponent implements OnInit {
  productos: Producto[] = []

  producto: Producto

  selectedProductos: Producto[] = []

  submitted: boolean = false

  cols: any[] = []

  rowsPerPageOptions = [5, 10, 20]

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private router: Router
  ) {}

  volver() {
    this.router.navigate(['home/pages/producto'])
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    this.productoService.Details(Number(id)).then((data) => {
      this.producto = data
      this.productos.push(data)
      console.log(this.producto)
    })
    this.cols = [
      { field: 'UsuarioCreacion', header: 'Creador' },
      { field: 'UsuarioModificacion', header: 'Modificador' },
      { field: 'prod_FechaCreacion', header: 'FechaC' },
      { field: 'prod_FechaModificacion', header: 'FechaM' },
    ]
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
  }
}
