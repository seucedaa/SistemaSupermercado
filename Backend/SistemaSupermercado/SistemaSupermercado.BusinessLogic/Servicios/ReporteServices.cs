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
                // Manejar la excepción o lanzarla para que sea manejada por el código que llama a este método
                throw new Exception("Error al generar el reporte de stock", ex);
            }
        }

    }
}
