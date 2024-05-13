using Dapper;
using SistemaSupermercado.Entities.Entities;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SistemaSupermercado.DataAcceess.Repository;

namespace SistemaSupermercado.DataAccess.Repository
{
    public class VentaDetalleRepository : IRepository<tbVentasDetalle>
    {

        public IEnumerable<tbVentasDetalle> Buscar(int id)
        {
            List<tbVentasDetalle> result = new List<tbVentasDetalle>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { Vende_Id = id };
                result = db.Query<tbVentasDetalle>(ScriptBaseDeDatos.VentaDetalle_Buscar, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public RequestStatus Modificar(tbVentasDetalle item)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Vende_Id", item.Vende_Id);
                parametro.Add("Venen_Id", item.Venen_Id);
                parametro.Add("Lotes_Id", item.Lotes_Id);
                parametro.Add("Vende_Cantidad", item.Vende_Cantidad);
                parametro.Add("Vende_UsuarioModificacion", item.Vende_UsuarioModificacion);
                parametro.Add("Vende_FechaModificacion", DateTime.Now);

                var result = db.Execute(ScriptBaseDeDatos.VentaDetalle_Modificar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public RequestStatus Eliminar(int? id)
        {

            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Vende_Id", id);

                var result = db.Execute(ScriptBaseDeDatos.VentaDetalle_Desactivar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public tbVentasDetalle find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insertar(tbVentasDetalle item)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Venen_Id", item.Venen_Id);
                parametro.Add("Lotes_Id", item.Lotes_Id);
                parametro.Add("Vende_Cantidad", item.Vende_Cantidad);
                parametro.Add("Vende_UsuarioCreacion", item.Vende_UsuarioCreacion);
                parametro.Add("Vende_FechaCreacion", DateTime.Now);

                var result = db.Execute(ScriptBaseDeDatos.VentaDetalle_Insertar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public IEnumerable<tbVentasDetalle> List()
        {

            List<tbVentasDetalle> result = new List<tbVentasDetalle>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                result = db.Query<tbVentasDetalle>(ScriptBaseDeDatos.VentaDetalle_Lista, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }

        }
    }
}
