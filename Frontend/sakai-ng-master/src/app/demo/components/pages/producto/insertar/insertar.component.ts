import { Component, OnInit } from '@angular/core'
import { MessageService } from 'primeng/api'

import { Table } from 'primeng/table'
import { ProductoService } from 'src/app/demo/service/producto.service'
import { Producto } from 'src/app/demo/models/ProductoViewModel'
import { Router } from '@angular/router'
import { Impuesto } from 'src/app/demo/models/ImpuestoViewModel'
import { ImpuestoService } from 'src/app/demo/service/impuesto.service'
import { Subcategoria } from 'src/app/demo/models/SubcategoriaViewModel'
import { SubcategoriaService } from 'src/app/demo/service/subcategoria.service'
import { Proveedor } from 'src/app/demo/models/ProveedorViewModel'
import { ProveedorService } from 'src/app/demo/service/proveedor.service'
import { Categoria } from 'src/app/demo/models/CategoriaViewModel'
import { CategoriaService } from 'src/app/demo/service/categoria.service'

@Component({
  templateUrl: './insertar.component.html',
  providers: [MessageService],
})
export class InsertarComponent implements OnInit {
  productos: Producto[] = []
  producto: Producto = {}

  submitted: boolean = false
  cols: any[] = []
  rowsPerPageOptions = [5, 10, 20]

  impuestos: Impuesto[] = []
  impuestoid: any

  categorias: Categoria[] = []
  categoriaid: any

  subcategoriasFiltro: Subcategoria[] = []
  subcategorias: Subcategoria[] = []
  subcategoriaid: any

  proveedores: Proveedor[] = []
  proveedorid: any

  constructor(
    private productoService: ProductoService,
    private impuestoService: ImpuestoService,
    private subcategoriaService: SubcategoriaService,
    private proveedorService: ProveedorService,
    private categoriaService: CategoriaService,
    private router: Router,
    private messageService: MessageService
  ) {}

  onImpuestoIdChange(value: any) {
    this.producto.impue_Id = value?.impue_Id
  }

  onCategIdChange(value: any) {
    this.producto.categ_Id = value?.categ_Id
    this.onCategIdChangeFilter(value)
  }

  onSubcategoriaIdChange(value: any) {
    this.producto.subca_Id = value?.subca_Id
  }

  onProveedorIdChange(value: any) {
    this.producto.prove_Id = value?.prove_Id
  }

  onCategIdChangeFilter(value: any) {
    this.subcategoriasFiltro = this.subcategorias.filter(
      (item) => item.categ_Id === value?.categ_Id
    )
  }

  ngOnInit() {
    this.impuestoService.getList().then((data) => (this.impuestos = data))

    this.subcategoriaService
      .getList()
      .then((data) => (this.subcategorias = data))

    this.proveedorService.getList().then((data) => (this.proveedores = data))

    this.categoriaService.getList().then((data) => (this.categorias = data))
  }

  guardar() {
    this.submitted = true
    this.producto.produ_UsuarioCreacion = 1

    if (
      this.producto.produ_Descripcion?.trim() &&
      this.producto.produ_Existencia &&
      this.producto.produ_PrecioCompra &&
      this.producto.produ_PrecioVenta &&
      this.producto.impue_Id &&
      this.producto.categ_Id &&
      this.producto.subca_Id &&
      this.producto.prove_Id
    ) {
      this.productoService.Insert(this.producto).then((response) => {
        if (response.success) {
          console.log(response.data.codeStatus)
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'producto creado.',
            life: 3000,
          })
          this.producto = {}
          this.ngOnInit()
          this.router.navigate(['/home/pages/producto'])
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: response.data.messageStatus,
            life: 3000,
          })
        }
      })
    }
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
  }
}
