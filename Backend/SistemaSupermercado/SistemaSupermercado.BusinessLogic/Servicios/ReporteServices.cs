using SistemaSupermercado.DataAccess.Repository;
using SistemaSupermercado.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaSupermercado.BusinessLogic.Servicios
{
    public class ReporteServices
    {
        private readonly ReporteRepository _reporteRepository;

        public ReporteServices(ReporteRepository reporteRepository)
        {
            _reporteRepository = reporteRepository;
        }

        public IEnumerable<tbProductos> reporteStock(int Sucur_Id)
        {
            try
            {
                var productos = _reporteRepository.reporteStock(Sucur_Id);
                return productos;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al generar el reporte de stock", ex);
            }
        }

        public IEnumerable<tbProductos> TodasStock()
        {
            try
            {
                var productos = _reporteRepository.TodasStock();
                return productos;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al generar el reporte de stock", ex);
            }
        }  
        
        public IEnumerable<tbProductos> PDFProductos(int Sucur_Id, string inicio, string fin)
        {
            try
            {
                var productos = _reporteRepository.PDFProductos(Sucur_Id, inicio, fin);
                return productos;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al generar el reporte de stock", ex);
            }
        }

        public IEnumerable<tbProductos> PDFProductos2(string inicio, string fin)
        {
            try
            {
                var productos = _reporteRepository.PDFProductos2(inicio, fin);
                return productos;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al generar el reporte de stock", ex);
            }
        }

        public IEnumerable<tbClientes> PDFClientes(string inicio, string fin)
        {
            try
            {
                var productos = _reporteRepository.PDFClientes(inicio, fin);
                return productos;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al generar el reporte de stock", ex);
            }
        }

        public IEnumerable<tbVentasEncabezado> PDFVentas(int sucursal, string inicio, string fin)
        {
            try
            {
                var productos = _reporteRepository.PDFVentas(sucursal,inicio, fin);
                return productos;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al generar el reporte de stock", ex);
            }
        } 
        
        public IEnumerable<tbVentasEncabezado> PDFVentas2(string inicio, string fin)
        {
            try
            {
                var productos = _reporteRepository.PDFVentas2(inicio, fin);
                return productos;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al generar el reporte de stock", ex);
            }
        }

    }
}
