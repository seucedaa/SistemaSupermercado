import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { CategoriaService } from 'src/app/demo/service/categoria.service';
import { Categoria } from 'src/app/demo/models/CategoriaViewModel';
import { SubcategoriaService } from 'src/app/demo/service/subcategoria.service';
import { Subcategoria } from 'src/app/demo/models/SubcategoriaViewModel';
import { ProductoService } from 'src/app/demo/service/producto.service';
import { Producto } from 'src/app/demo/models/ProductoViewModel';
import { SucursalService } from 'src/app/demo/service/sucursal.service';
import { Sucursal } from 'src/app/demo/models/SucursalViewModel';
import * as chroma from 'chroma-js';
import { Router } from '@angular/router';


@Component({
    templateUrl: './estadisticas.component.html'
})
export class EstadisticasComponent implements OnInit, OnDestroy {

    lineData: any;

    barData: any;

    pieData: any;

    siData: any;

    radarData: any;

    lineOptions: any;

    barOptions: any;

    pieOptions: any;


    radarOptions: any;

    subscription: Subscription;

    categorias: Categoria[] = [];
    subcategorias: Subcategoria[] = [];
    productos: Producto[] = [];
    sucursales: any[] = [];

    sucursalid: any;
    prueba:any;
    inicio:any;
    fin:any;
    sucursa: any;
    esadmin:any;

    constructor(private layoutService: LayoutService,
            private sucursalService: SucursalService,
            private categoriaService: CategoriaService,
            private router: Router,

            private subcategoriaService: SubcategoriaService,
            private productoService: ProductoService) {
             this.subscription = this.layoutService.configUpdate$
                .pipe(debounceTime(25))
                .subscribe((config) => {
                     this.initCharts();
                 });
             
             const today = new Date();
             const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
             this.inicio = firstDayOfMonth;
             this.fin = today;
    }

    

    formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    onSucursalChange(sucur_Id: any) {
        this.prueba = sucur_Id.sucur_Id;
        if(this.prueba == 0){
            this.mostrartodas();
        }else{
            this.updateData();
        }
    }
    
    onFechaChange(type: string, event: any) {
        if (type === 'inicio') {
            this.inicio = event;
        } else if (type === 'fin') {
            this.fin = event;
        }
        this.updateData();
    }

    updateData() {
        let formattedInicio = null;
        let formattedFin = null;

        formattedInicio = this.formatDate(this.inicio);
        formattedFin = this.formatDate(this.fin)

        this.chartPieChart();
        this.chartBarChart();
        this.chartDoughnutChart();
        this.chartLineChart();
    
        this.categoriaService.CategoriaTotal(this.prueba, formattedInicio, formattedFin).then(data => {
            this.categorias = data.data;
            this.chartPieChart();
        });
    
        this.subcategoriaService.SubcategoriaTotal(this.prueba, formattedInicio, formattedFin).then(data => {
            this.subcategorias = data.data;
            this.chartBarChart();
        });
    
        this.productoService.Existencia(this.prueba).then(data => {
            this.productos = data.data;
            console.log(this.productos);
            this.chartDoughnutChart();
        });

        this.productoService.Ventas(this.prueba, formattedInicio, formattedFin).then(data => {
            this.productos = data.data;
            this.chartLineChart();
        });
    }

    todas(){
        let iniciofecha = this.formatDate(this.inicio);
        let finfecha = this.formatDate(this.fin)

        this.categoriaService.Todas(iniciofecha, finfecha).then(data => {
            this.categorias = data.data;
            this.chartPieChart();
        });

        this.subcategoriaService.Todas(iniciofecha, finfecha).then(data => {
            this.subcategorias = data.data;
            this.chartBarChart();
        });
        
        this.productoService.ExisTodas().then(data => {
            this.productos = data.data;
            this.chartDoughnutChart();
        });

        this.productoService.Todas(iniciofecha, finfecha).then(data => {
            this.productos = data.data;
            this.chartLineChart();
        });
      
    }

    mostrartodas(){
        this.todas();
    }
    
    ngOnInit() {
        const usuariolog = sessionStorage.getItem('usuario');
        const usuario = JSON.parse(usuariolog);
        this.esadmin = usuario.usuar_Admin;

        const logueado = JSON.parse(usuariolog);
        if(!logueado)
            {
                this.router.navigate(['/login']);

            }

        this.initCharts();
        this.sucursalService.getList().then(data => {
            this.sucursales = data;
        
            this.sucursales = this.sucursales.map((sucursal: any) => ({
                sucur_Id: sucursal.sucur_Id,
                sucur_Descripcion: sucursal.sucur_Descripcion,
                sucursal_Titulo: `${sucursal.sucur_Id} - ${sucursal.sucur_Descripcion}`
            }));
        
            this.sucursales.unshift({ sucur_Id: 0, sucur_Descripcion: 'Mostrar todas' });

            const usuarioJson = sessionStorage.getItem('usuario');
        const usuario = JSON.parse(usuarioJson);
        this.sucursa = usuario.sucur_Id;

        const sucursalUsuario = this.sucursales.find(s => s.sucur_Id === this.sucursa);
        if (sucursalUsuario) {
            this.sucursalid = sucursalUsuario.sucur_Id;
            console.log(sucursalUsuario,this.sucursales,this.sucursalid)
        } 
        });
        

        const usuarioJson = sessionStorage.getItem('usuario');
        if (usuarioJson) {
            const usuario = JSON.parse(usuarioJson);
            const sesionsucursal = usuario.sucur_Id;
            console.log(sesionsucursal);
            let iniciofecha = this.formatDate(this.inicio);
            let finfecha = this.formatDate(this.fin)

            if (sesionsucursal) {
                this.categoriaService.CategoriaTotal(sesionsucursal,iniciofecha, finfecha).then(data => {
                    this.categorias = data.data;
                    this.chartPieChart();
                });
        
                this.subcategoriaService.SubcategoriaTotal(sesionsucursal,iniciofecha, finfecha).then(data => {
                    this.subcategorias = data.data;
                    this.chartBarChart();
                });
                
                this.productoService.Existencia(sesionsucursal).then(data => {
                    this.productos = data.data;
                    this.chartDoughnutChart();
                });
        
                this.productoService.Ventas(sesionsucursal,iniciofecha, finfecha).then(data => {
                    this.productos = data.data;
                    this.chartLineChart();
                });
            } 
        } else {
            console.error('No hay sesion');
        }

        let iniciofecha = this.formatDate(this.inicio);
        let finfecha = this.formatDate(this.fin)

       
    }

    chartLineChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        
        if (Array.isArray(this.productos)) {
            this.lineData = {
                labels: this.productos.map(producto => producto.semana || 'No hay'),
                datasets: [
                    {
                        label: 'Ventas',
                        data: this.productos.map(producto => parseInt(producto.totalVentas)),
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

    chartPieChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    
    if (Array.isArray(this.categorias)) {
        const colors = this.categorias.map((_, index) => `hsl(${index * 40}, 100%, 60%)`); 

        this.pieData = {
            labels: this.categorias.map(categoria => categoria.categoria || 'No hay'),
            datasets: [
                {
                    data: this.categorias.map(categoria => parseInt(categoria.totalVentas)),
                    backgroundColor: colors,
                    hoverBackgroundColor: colors
                }]
        };
    
        this.pieOptions = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true, 
                        color: textColor
                    }
                }
            }
        };
        
    } else {
        console.error('no funciona');
    }
}
chartBarChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
  
    if (Array.isArray(this.subcategorias)) {
      const colors = this.subcategorias.map(() => chroma.random());
  
      this.barData = {
        labels: this.subcategorias.map(subcategoria => subcategoria.subcategoria || 'No hay'),
        datasets: [
          {
            label: 'Total Ventas',
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 2,
            hoverBackgroundColor: colors, 
            hoverBorderColor: colors, 
            data: this.subcategorias.map(subcategoria => parseInt(subcategoria.totalVentas))
          }
        ]
      };
  
      this.barOptions = {
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
                    color: textColor,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColor,
                    callback: function(value, index, values) {
                        return value;
                    }
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

    
    chartDoughnutChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        
        if (Array.isArray(this.productos)) {
            this.siData = {
                labels: this.productos.map(producto => producto.producto || 'No hay'),
                datasets: [
                    {
                        data: this.productos.map(producto => parseInt(producto.cantidad)),
                        backgroundColor: [
                            documentStyle.getPropertyValue('--indigo-500'),
                            documentStyle.getPropertyValue('--purple-500'),
                            documentStyle.getPropertyValue('--teal-500')
                        ],
                        hoverBackgroundColor: [
                            documentStyle.getPropertyValue('--indigo-400'),
                            documentStyle.getPropertyValue('--purple-400'),
                            documentStyle.getPropertyValue('--teal-400')
                        ]
                    }]
            };
        
            this.pieOptions = {
                plugins: {
                    legend: {
                        labels: {
                            usePointStyle: true,
                            color: textColor
                        }
                    }
                }
            };
        } else {
            console.error('no funciona');
        }
    }
    

    initCharts() {
      
      
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    
}