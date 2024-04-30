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
    public class ImpuestoRepository : IRepository<tbImpuestos>
    {
        public IEnumerable<tbImpuestos> ObtenerID(int id)
        {
            List<tbImpuestos> result = new List<tbImpuestos>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { Impue_Id = id };
                result = db.Query<tbImpuestos>(ScriptBaseDeDatos.Impuesto_Lista, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public IEnumerable<tbImpuestos> Buscar(int id)
        {
            List<tbImpuestos> result = new List<tbImpuestos>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { Impue_Id = id };
                result = db.Query<tbImpuestos>(ScriptBaseDeDatos.Impuesto_Buscar, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public RequestStatus Modificar(tbImpuestos item)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Impue_Id", item.Impue_Id);
                parametro.Add("Impue_Descripcion", item.Impue_Descripcion);
                parametro.Add("Impue_UsuarioModificacion", item.Impue_UsuarioModificacion);
                parametro.Add("Impue_FechaModificacion", DateTime.Now);

                var result = db.Execute(ScriptBaseDeDatos.Impuesto_Modificar,
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
                parametro.Add("Impue_Id", id);

                var result = db.Execute(ScriptBaseDeDatos.Impuesto_Desactivar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public tbImpuestos find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insertar(tbImpuestos item)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Impue_Descripcion", item.Impue_Descripcion);
                parametro.Add("Impue_UsuarioCreacion", item.Impue_UsuarioCreacion);
                parametro.Add("Impue_FechaCreacion", DateTime.Now);

                var result = db.Execute(ScriptBaseDeDatos.Impuesto_Insertar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public IEnumerable<tbImpuestos> List()
        {

            List<tbImpuestos> result = new List<tbImpuestos>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                result = db.Query<tbImpuestos>(ScriptBaseDeDatos.Impuesto_Lista, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }

        }
    }
}
