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
    public class ServiceConfiguration
    {
        public static void DataAcces(this IServiceCollection service, string conn)
        {

            //service.AddScoped<UsuarioRepository>();


            SistemaSupermercadoContext.BuildConnectionString(conn);
        }

        public static void BussinesLogic(this IServiceCollection service)
        {
            //service.AddScoped<AccesoServicios>();

        }
    }
}
