using SistemaSupermercado.DataAccess.Repository;
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

        public ServiceResult reporteStock()
        {
            var result = new ServiceResult();
            try
            {
                var lost = _reporteRepository.reporteStock();

                if (lost.Any())
                {
                    return result.Ok(lost);
                }
                else
                {
                    return result.Error(lost);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
    }
}
