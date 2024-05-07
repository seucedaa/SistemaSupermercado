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
        public IEnumerable<tbProductos> reporteStock()
        {
            List<tbProductos> result = new List<tbProductos>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                result = db.Query<tbProductos>(ScriptBaseDeDatos.Reporte_Stock, commandType: CommandType.StoredProcedure).ToList();

                return result;
            }
        }
    }
}
