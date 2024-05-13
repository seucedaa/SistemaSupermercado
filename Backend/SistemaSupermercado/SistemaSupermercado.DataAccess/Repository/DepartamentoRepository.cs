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
    public class DepartamentoRepository : IRepository<tbDepartamentos>
    {
        public IEnumerable<tbDepartamentos> ObtenerID(string id)
        {
            List<tbDepartamentos> result = new List<tbDepartamentos>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { Depar_Id = id };
                result = db.Query<tbDepartamentos>(ScriptBaseDeDatos.Departamento_Buscar, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public IEnumerable<tbDepartamentos> Buscar(string id)
        {
            List<tbDepartamentos> result = new List<tbDepartamentos>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { Depar_Id = id };
                result = db.Query<tbDepartamentos>(ScriptBaseDeDatos.Departamento_Buscar, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public RequestStatus Modificar(tbDepartamentos item)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Depar_Id", item.Depar_Id);
                parametro.Add("Depar_Descripcion", item.Depar_Descripcion);
                parametro.Add("Depar_UsuarioModificacion", item.Depar_UsuarioModificacion);
                parametro.Add("Depar_FechaModificacion", DateTime.Now);

                var result = db.Execute(ScriptBaseDeDatos.Departamento_Modificar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public RequestStatus Eliminar(string? id)
        {

            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Depar_Id", id);

                var result = db.Execute(ScriptBaseDeDatos.Departamento_Eliminar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public tbDepartamentos find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insertar(tbDepartamentos item)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Depar_Id", item.Depar_Id);
                parametro.Add("Depar_Descripcion", item.Depar_Descripcion);
                parametro.Add("Depar_UsuarioCreacion", item.Depar_UsuarioCreacion);
                parametro.Add("Depar_FechaCreacion", DateTime.Now);

                var result = db.Execute(ScriptBaseDeDatos.Departamento_Insertar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public IEnumerable<tbDepartamentos> List()
        {
            const string sql = "Gral.SP_Departamentos_Lista";

            List<tbDepartamentos> result = new List<tbDepartamentos>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                result = db.Query<tbDepartamentos>(sql, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }

        }

        public IEnumerable<tbMunicipios> ListaMunicipiosID(string id)
        {
            const string sql = "Gral.SP_MunicipiosListaID";

            List<tbMunicipios> result = new List<tbMunicipios>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { @Depar_Id = id };
                result = db.Query<tbMunicipios>(sql, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }


        RequestStatus IRepository<tbDepartamentos>.Modificar(tbDepartamentos item)
        {
            throw new NotImplementedException();
        }

        RequestStatus IRepository<tbDepartamentos>.Eliminar(int? id)
        {
            throw new NotImplementedException();
        }
    }
}
