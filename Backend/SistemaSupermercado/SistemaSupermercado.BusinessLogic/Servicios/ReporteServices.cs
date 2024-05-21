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

        public ServiceResult Stock(int Sucur_Id)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _reporteRepository.reporteStock(Sucur_Id);


                return result.Ok(lost);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult TodasStock()
        {
            var result = new ServiceResult();
            try
            {
                var lost = _reporteRepository.TodasStock();


                return result.Ok(lost);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult Productos(int Sucur_Id,string inicio,string fin)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _reporteRepository.Productos(Sucur_Id,inicio,fin);


                return result.Ok(lost);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult TodasProductos(string inicio,string fin)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _reporteRepository.TodasProductos(inicio,fin);


                return result.Ok(lost);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult Clientes(string inicio, string fin)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _reporteRepository.Clientes(inicio, fin);


                return result.Ok(lost);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult Ventas(int sucursal, string inicio, string fin)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _reporteRepository.Ventas(sucursal, inicio, fin);


                return result.Ok(lost);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult TodasVentas(string inicio, string fin)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _reporteRepository.TodasVentas(inicio, fin);


                return result.Ok(lost);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }


        public ServiceResult Promocion(int sucursal, string inicio, string fin)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _reporteRepository.Promocion(sucursal, inicio, fin);


                return result.Ok(lost);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult TodasPromocion(string inicio, string fin)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _reporteRepository.TodasPromocion(inicio, fin);


                return result.Ok(lost);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

    }
}
