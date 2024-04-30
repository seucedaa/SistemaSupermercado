using Dapper;
using SistemaSupermercado.Entities.Entities;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace SistemaSupermercado.DataAccess.Repository
{
    public class LoteRepository : IRepository<tbLotes>
    {
        public IEnumerable<tbLotes> ObtenerID(int id)
        {
            List<tbLotes> result = new List<tbLotes>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { Lotes_Id = id };
                result = db.Query<tbLotes>(ScriptsBaseDeDatos.Lote_Llenar, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public IEnumerable<tbLotes> Detalless(int id)
        {
            List<tbLotes> result = new List<tbLotes>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { Lotes_Id = id };
                result = db.Query<tbLotes>(ScriptsBaseDeDatos.Lote_Detalles, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public RequestStatus Actualizar(tbLotes item)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Lotes_Id", item.Lotes_Id);
                parametro.Add("Lotes_FechaVencimiento", item.Lotes_FechaVencimiento);
                parametro.Add("Produ_Id", item.Produ_Id);
                parametro.Add("Lotes_Cantidad", item.Lotes_Cantidad);
                parametro.Add("Sucur_Id", item.Sucur_Id);
                parametro.Add("Lotes_UsuarioModificacion", item.Lotes_UsuarioModificacion);
                parametro.Add("Lotes_FechaModificacion", DateTime.Now);

                var result = db.Execute(ScriptsBaseDeDatos.Lote_Actualizar,
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
                parametro.Add("Lotes_Id", id);

                var result = db.Execute(ScriptsBaseDeDatos.Lote_Eliminar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public tbLotes find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insertar(tbLotes item)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Lotes_FechaVencimiento", item.Lotes_FechaVencimiento);
                parametro.Add("Produ_Id", item.Produ_Id);
                parametro.Add("Lotes_Cantidad", item.Lotes_Cantidad);
                parametro.Add("Sucur_Id", item.Sucur_Id);
                parametro.Add("Lotes_UsuarioCreacion", item.Lotes_UsuarioCreacion);
                parametro.Add("Lotes_FechaCreacion", DateTime.Now);

                var result = db.Execute(ScriptsBaseDeDatos.Lote_Insertar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public IEnumerable<tbLotes> List()
        {

            List<tbLotes> result = new List<tbLotes>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                result = db.Query<tbLotes>(ScriptBaseDeDatos.Lote_Mostrar, commandType: CommandType.Text).ToList();
                return result;
            }

        }
    }
}
