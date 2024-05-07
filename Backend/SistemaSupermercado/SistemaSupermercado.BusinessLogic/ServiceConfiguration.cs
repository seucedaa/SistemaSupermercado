using SistemaSupermercado.BusinessLogic.Servicios;
using SistemaSupermercado.DataAccess;
using SistemaSupermercado.DataAccess.Repository;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaSupermercado.BusinessLogic
{
    public static class ServiceConfiguration
    {
        public static void DataAcces(this IServiceCollection service, string conn)
        {

            service.AddScoped<CargoRepository>();
            service.AddScoped<CategoriaRepository>();
            service.AddScoped<ClienteRepository>();
            service.AddScoped<DepartamentoRepository>();
            service.AddScoped<EmpleadoRepository>();
            service.AddScoped<EstadoCivilRepository>();
            service.AddScoped<ImpuestoRepository>();
            service.AddScoped<LoteRepository>();
            service.AddScoped<MunicipioRepository>();
            service.AddScoped<ProductoRepository>();
            service.AddScoped<PromocionRepository>();
            service.AddScoped<ProveedorRepository>();
            service.AddScoped<RolRepository>();
            service.AddScoped<SubcategoriaRepository>();
            service.AddScoped<SucursalRepository>();
            service.AddScoped<UsuarioRepository>();
            service.AddScoped<VentaDetalleRepository>();
            service.AddScoped<VentaEncabezadoRepository>();
            service.AddScoped<ReporteRepository>();


            SistemaSupermercadoContext.BuildConnectionString(conn);
        }

        public static void BussinesLogic(this IServiceCollection service)
        {
            service.AddScoped<AccesoServicios>();
            service.AddScoped<GeneralServicios>();
            service.AddScoped<SuperServicio>();
            service.AddScoped<VentaServicio>();
            service.AddScoped<ReporteServices>();

        }
    }
}
