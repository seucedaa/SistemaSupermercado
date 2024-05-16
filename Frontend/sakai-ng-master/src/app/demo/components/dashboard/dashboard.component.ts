import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ClienteService } from 'src/app/demo/service/cliente.service';
import { Cliente } from 'src/app/demo/models/ClienteViewModel';
import { VentaEncabezadoService } from 'src/app/demo/service/ventaencabezado.service';
import { VentaEncabezado } from 'src/app/demo/models/VentasEncabezadoViewModel';
import { ProductoService } from 'src/app/demo/service/producto.service';
import { Producto } from 'src/app/demo/models/ProductoViewModel';
@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];

    products!: Product[];

    chartData: any;
    lineData: any;

    lineOptions: any;

    subscription!: Subscription;
    clientes: Cliente[] = [];
    ventas: VentaEncabezado[] = [];
    productos: Producto[] = [];
    productoss:Producto[]=[];



    constructor(private productService: ProductService, private productoService: ProductoService,private clienteService: ClienteService,private ventaencabezadoService: VentaEncabezadoService, public layoutService: LayoutService) {
        this.subscription = this.layoutService.configUpdate$
        .pipe(debounceTime(25))
        .subscribe((config) => {
        });
    }

    ngOnInit() {
        this.clienteService.getTotal().then(data => {
            this.clientes = data;
        });

        this.ventaencabezadoService.getTotal().then(data => {
            this.ventas = data;
        });

        const usuarioJson = sessionStorage.getItem('usuario');
          const usuario = JSON.parse(usuarioJson);
          const sucursalid = usuario.sucur_Id;


        this.productoService.Principal(sucursalid).then(data => {
            this.productoss = data.data;
            this.chartLineChart();
        });

        this.productoService.Top(sucursalid).then(data => {
            this.productos = data.data;
            console.log(this.productos);

        });


    }

    chartLineChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        
        if (Array.isArray(this.productoss)) {
            this.lineData = {
                labels: this.productoss.map(producto => producto.semana || 'No hay'),
                datasets: [
                    {
                        label: 'Ventas',
                        data: this.productoss.map(producto => parseInt(producto.totalVentas)),
                        fill: false,
                        backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                        borderColor: documentStyle.getPropertyValue('--primary-500'),
                        tension: .4
                    }]
            };
        
            this.lineOptions = {
                plugins: {
                    legend: {
                        labels: {
                            fontColor: textColor
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder,
                            drawBorder: false
                        }
                    },
                    y: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder,
                            drawBorder: false
                        }
                    },
                }
            };
            
        } else {
            console.error('no funciona');
        }
    }
   
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
