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
    public class CargoRepository : IRepository<tbCargos>
    {
        public IEnumerable<tbCargos> ObtenerID(int id)
        {
            List<tbCargos> result = new List<tbCargos>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { Cargo_Id = id };
                result = db.Query<tbCargos>(ScriptBaseDeDatos.Cargo_Llenar, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public IEnumerable<tbCargos> Detalless(int id)
        {
            List<tbCargos> result = new List<tbCargos>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { Cargo_Id = id };
                result = db.Query<tbCargos>(ScriptBaseDeDatos.Cargo_Detalles, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public RequestStatus Actualizar(tbCargos item)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Cargo_Id", item.Cargo_Id);
                parametro.Add("Cargo_Descripcion", item.Cargo_Descripcion);
                parametro.Add("Cargo_UsuarioModificacion", item.Cargo_UsuarioModificacion);
                parametro.Add("Cargo_FechaModificacion", DateTime.Now);

                var result = db.Execute(ScriptBaseDeDatos.Cargo_Actualizar,
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
                parametro.Add("Cargo_Id", id);

                var result = db.Execute(ScriptBaseDeDatos.Cargo_Eliminar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public tbCargos find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insertar(tbCargos item)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Cargo_Descripcion", item.Cargo_Descripcion);
                parametro.Add("Cargo_UsuarioCreacion", item.Cargo_UsuarioCreacion);
                parametro.Add("Cargo_FechaCreacion", DateTime.Now);

                var result = db.Execute(ScriptBaseDeDatos.Cargo_Insertar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public IEnumerable<tbCargos> List()
        {

            List<tbCargos> result = new List<tbCargos>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                result = db.Query<tbCargos>(ScriptBaseDeDatos.Cargo_Mostrar, commandType: CommandType.Text).ToList();
                return result;
            }

        }
    }
}
