using Dapper;
using Microsoft.Data.SqlClient;
using SistemaSupermercado.DataAcceess.Repository;
using SistemaSupermercado.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaSupermercado.DataAccess.Repository
{
    public class ReporteRepository
    {
        public IEnumerable<tbProductos> reporteStock(int Sucur_Id)
        {
            List<tbProductos> result = new List<tbProductos>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { Sucur_Id = Sucur_Id, FiltroSucursal = 1 };

                result = db.Query<tbProductos>(ScriptBaseDeDatos.Reporte_Stock, parameters, commandType: CommandType.StoredProcedure).ToList();

                return result;
            }
        }

        public IEnumerable<tbProductos> TodasStock()
        {
            List<tbProductos> result = new List<tbProductos>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { FiltroSucursal = 0 };
                result = db.Query<tbProductos>(ScriptBaseDeDatos.Reporte_Stock, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }
    }
}
