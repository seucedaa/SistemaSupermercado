using Dapper;
using Microsoft.Data.SqlClient;
using SistemaSupermercado.Common.Models;
using SistemaSupermercado.DataAcceess.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaSupermercado.DataAccess.Repository
{
    public class CartRepository
    {
        public IEnumerable<CartViewModel> List()
        {

            List<CartViewModel> result = new List<CartViewModel>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                result = db.Query<CartViewModel>(ScriptBaseDeDatos.listarLotes, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }

        }

        public RequestStatus CrearFacturaEncabezado(CartViewModel item)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Sucur_Id", item.Sucur_Id);
                parametro.Add("Tipos_Id", item.Tipos_Id);
                parametro.Add("Venen_FechaCreacion", DateTime.Now);
                parametro.Add("Clien_Id", item.Clien_Id);
                parametro.Add("@ID", dbType: DbType.Int32, direction: ParameterDirection.Output);

                var result = db.Execute(ScriptBaseDeDatos.CrearFacturaEncabezado,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result > 1) ? "Exito" : "Error";
                int idInsertado = parametro.Get<int>("@ID");

                return new RequestStatus { CodeStatus = result == 1 ? idInsertado : result, MessageStatus = mensaje };
            }
        }

        public RequestStatus CrearFacturaDetalle(CartViewModel item)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Venen_Id", item.Venen_Id);
                parametro.Add("Lotes_Id", item.Lotes_Id);
                parametro.Add("Vende_Cantidad", item.Vende_Cantidad);
                parametro.Add("Vende_FechaCreacion", DateTime.Now);

                var result = db.Execute(ScriptBaseDeDatos.CrearFacturaDetalle,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result > 0) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public List<CartViewModel> BuscarFactura(int id)
        {
            List<CartViewModel> result = new List<CartViewModel>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { Venen_Id = id };
                result = db.Query<CartViewModel>(ScriptBaseDeDatos.FacturaBuscar, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }
    }
}
