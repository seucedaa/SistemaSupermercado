using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
                result = db.Query<tbImpuestos>(ScriptsBaseDeDatos.Impuesto_Llenar, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public IEnumerable<tbImpuestos> Detalless(int id)
        {
            List<tbImpuestos> result = new List<tbImpuestos>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { Impue_Id = id };
                result = db.Query<tbImpuestos>(ScriptsBaseDeDatos.Impuesto_Detalles, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public RequestStatus Actualizar(tbImpuestos item)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Impue_Id", item.Impue_Id);
                parametro.Add("Impue_Descripcion", item.Impue_Descripcion);
                parametro.Add("Impue_UsuarioModificacion", item.Impue_UsuarioModificacion);
                parametro.Add("Impue_FechaModificacion", DateTime.Now);

                var result = db.Execute(ScriptsBaseDeDatos.Impuesto_Actualizar,
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

                var result = db.Execute(ScriptsBaseDeDatos.Impuesto_Eliminar,
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

                var result = db.Execute(ScriptsBaseDeDatos.Impuesto_Insertar,
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
                result = db.Query<tbImpuestos>(ScriptBaseDeDatos.Impuesto_Mostrar, commandType: CommandType.Text).ToList();
                return result;
            }

        }
    }
}
