import { Component, OnInit } from '@angular/core'
import { Product } from 'src/app/demo/api/product'
import { MessageService } from 'primeng/api'
import { Table } from 'primeng/table'
import { ProductService } from 'src/app/demo/service/product.service'
import { ProductoService } from 'src/app/demo/service/producto.service'
import { Producto } from 'src/app/demo/models/ProductoViewModel'

@Component({
  templateUrl: './producto.component.html',
  providers: [MessageService],
})
export class ProductoComponent implements OnInit {
  productDialog: boolean = false

  deleteProductDialog: boolean = false

  deleteProductsDialog: boolean = false

  productos: Producto[] = []

  producto: Producto = {}

  selectedProductos: Producto[] = []

  submitted: boolean = false

  cols: any[] = []

  statuses: any[] = []

  rowsPerPageOptions = [5, 10, 20]

  constructor(
    private productoService: ProductoService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.productoService.getList().then((data) => (this.productos = data))

    this.cols = [
      { field: 'produ_Descripcion', header: 'Producto' },
      { field: 'produ_Existencia', header: 'Existencia' },
      { field: 'produ_PrecioCompra', header: 'Precio compra' },
      { field: 'produ_PrecioVenta', header: 'Precio venta' },
      { field: 'subca_Descripcion', header: 'Subcategoria' },
      { field: 'prove_Marca', header: 'Proveedor' },
      { field: 'impue_Descripcion', header: 'Impuesto' },
    ]
  }

  deleteProducto(producto: Producto) {
    this.deleteProductDialog = true
    this.producto = { ...producto }
  }

  confirmDeleteSelected() {
    this.deleteProductsDialog = false
    this.productos = this.productos.filter(
      (val) => !this.selectedProductos.includes(val)
    )
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Productos eliminados.',
      life: 3000,
    })
    this.selectedProductos = []
  }

  confirmDelete() {
    this.deleteProductDialog = false

    this.productoService
      .Delete(this.producto.produ_Id)
      .then((response) => {
        console.log(response)
        if (response.success) {
          this.productos = this.productos.filter(
            (val) => val.produ_Id !== this.producto.produ_Id
          )
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Producto eliminado.',
            life: 3000,
          })
          this.producto = {}
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'El producto esta siendo utilizado.',
            life: 3000,
          })
        }
      })
      .catch((error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el producto.',
          life: 3000,
        })
      })
  }

  findIndexById(id: number): number {
    let index = -1
    for (let i = 0; i < this.productos.length; i++) {
      if (this.productos[i].produ_Id === id) {
        index = i
        break
      }
    }

    return index
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
  }
}
