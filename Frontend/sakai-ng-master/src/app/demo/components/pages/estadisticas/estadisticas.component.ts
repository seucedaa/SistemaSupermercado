import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { CategoriaService } from 'src/app/demo/service/categoria.service';
import { Categoria } from 'src/app/demo/models/CategoriaViewModel';
import { SubcategoriaService } from 'src/app/demo/service/subcategoria.service';
import { Subcategoria } from 'src/app/demo/models/SubcategoriaViewModel';
import { ProductoService } from 'src/app/demo/service/producto.service';
import { Producto } from 'src/app/demo/models/ProductoViewModel';

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

    constructor(private layoutService: LayoutService,private categoriaService: CategoriaService,private subcategoriaService: SubcategoriaService,private productoService: ProductoService,) {
        this.subscription = this.layoutService.configUpdate$
            .pipe(debounceTime(25))
            .subscribe((config) => {
                this.initCharts();
            });
    }

    ngOnInit() {
        this.initCharts();
    
        this.categoriaService.CategoriaTotal(2, '2023-01-01', '2024-12-12').then(data => {
            this.categorias = data.data;
            this.updatePieChart();
        });
    
        this.subcategoriaService.SubcategoriaTotal(2,'2023-01-01', '2024-12-12').then(data => {
            this.subcategorias = data.data;
            this.updateBarChart();
        });
    
        this.productoService.Existencia(2).then(data => {
            this.productos = data.data;
            console.log(this.productos);
            this.updateDoughnutChart();
        });
    }
    
    updatePieChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    
    if (Array.isArray(this.categorias)) {
        const colors = this.categorias.map((_, index) => `hsl(${index * 90}, 60%, 70%)`); 

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
    updateBarChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        
        if (Array.isArray(this.subcategorias)) {
            const colors = this.productos.map((_, index) => `hsl(${index * 90}, 60%, 70%)`); 
            this.barData = {
                labels: this.subcategorias.map(subcategoria => subcategoria.subcategoria),
                datasets: [
                    {
                        label: 'Total Ventas',
                        backgroundColor: colors,
                        borderColor: colors,
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
                            color: textColor 
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
    
    updateDoughnutChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        
        if (Array.isArray(this.productos)) {
            const colors = this.productos.map((_, index) => `hsl(${index * 90}, 60%, 70%)`); 
    
            this.siData = {
                labels: this.productos.map(producto => producto.producto || 'No hay'),
                datasets: [
                    {
                        data: this.productos.map(producto => parseInt(producto.cantidad)),
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
    

    initCharts() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        
       
        this.lineData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                    borderColor: documentStyle.getPropertyValue('--primary-500'),
                    tension: .4
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--primary-200'),
                    borderColor: documentStyle.getPropertyValue('--primary-200'),
                    tension: .4
                }
            ]
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

        

        this.radarData = {
            labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
            datasets: [
                {
                    label: 'My First dataset',
                    borderColor: documentStyle.getPropertyValue('--indigo-400'),
                    pointBackgroundColor: documentStyle.getPropertyValue('--indigo-400'),
                    pointBorderColor: documentStyle.getPropertyValue('--indigo-400'),
                    pointHoverBackgroundColor: textColor,
                    pointHoverBorderColor: documentStyle.getPropertyValue('--indigo-400'),
                    data: [65, 59, 90, 81, 56, 55, 40]
                },
                {
                    label: 'My Second dataset',
                    borderColor: documentStyle.getPropertyValue('--purple-400'),
                    pointBackgroundColor: documentStyle.getPropertyValue('--purple-400'),
                    pointBorderColor: documentStyle.getPropertyValue('--purple-400'),
                    pointHoverBackgroundColor: textColor,
                    pointHoverBorderColor: documentStyle.getPropertyValue('--purple-400'),
                    data: [28, 48, 40, 19, 96, 27, 100]
                }
            ]
        };

        this.radarOptions = {
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                r: {
                    grid: {
                        color: textColorSecondary
                    }
                }
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    
}