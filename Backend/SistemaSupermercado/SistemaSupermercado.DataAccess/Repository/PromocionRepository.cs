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
    public class PromocionRepository : IRepository<tbPromociones>
    {
        public IEnumerable<tbPromociones> ObtenerID(int id)
        {
            List<tbPromociones> result = new List<tbPromociones>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { Promo_Id = id };
                result = db.Query<tbPromociones>(ScriptBaseDeDatos.Promocion_Lista, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public IEnumerable<tbPromociones> Buscar(int id)
        {
            List<tbPromociones> result = new List<tbPromociones>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { Promo_Id = id };
                result = db.Query<tbPromociones>(ScriptBaseDeDatos.Promocion_Buscar, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public RequestStatus Modificar(tbPromociones item)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Promo_Id", item.Promo_Id);
                parametro.Add("Promo_Descripcion", item.Promo_Descripcion);
                parametro.Add("Promo_Porcentaje", item.Promo_Porcentaje);
                parametro.Add("Produ_Id", item.Produ_Id);
                parametro.Add("Promo_UsuarioModificacion", item.Promo_UsuarioModificacion);
                parametro.Add("Promo_FechaModificacion", DateTime.Now);

                var result = db.Execute(ScriptBaseDeDatos.Promocion_Modificar,
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
                parametro.Add("Promo_Id", id);

                var result = db.Execute(ScriptBaseDeDatos.Promocion_Desactivar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public tbPromociones find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insertar(tbPromociones item)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Promo_Descripcion", item.Promo_Descripcion);
                parametro.Add("Produ_Id", item.Produ_Id);
                parametro.Add("Promo_Porcentaje", item.Promo_Porcentaje);
                parametro.Add("Promo_UsuarioCreacion", item.Promo_UsuarioCreacion);
                parametro.Add("Promo_FechaCreacion", DateTime.Now);

                var result = db.Execute(ScriptBaseDeDatos.Promocion_Insertar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public IEnumerable<tbPromociones> List()
        {

            List<tbPromociones> result = new List<tbPromociones>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                result = db.Query<tbPromociones>(ScriptBaseDeDatos.Promocion_Lista, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }

        }
    }
}
