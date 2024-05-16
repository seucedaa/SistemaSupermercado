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
    public class RolRepository : IRepository<tbRoles>
    {
        public IEnumerable<tbRoles> Buscar(int id)
        {
            List<tbRoles> result = new List<tbRoles>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { Roles_Id = id };
                result = db.Query<tbRoles>(ScriptBaseDeDatos.Rol_Buscar, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public RequestStatus Modificar(tbRoles item)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Roles_Id", item.Roles_Id);
                parametro.Add("Roles_Descripcion", item.Roles_Descripcion);
                parametro.Add("Roles_UsuarioModificacion", 1);
                parametro.Add("Roles_FechaModificacion", DateTime.Now);

                var result = db.Execute(ScriptBaseDeDatos.Rol_Modificar,
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
                parametro.Add("Roles_Id", id);

                var result = db.Execute(ScriptBaseDeDatos.Rol_Eliminar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public RequestStatus EliminarPaRol(tbPantallasPorRoles item)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Papro_Id", item.Papro_Id);

                var result = db.Execute(ScriptBaseDeDatos.PantallasRoles_Eliminar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public tbRoles find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insertar(tbRoles item)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Roles_Descripcion", item.Roles_Descripcion);
                parametro.Add("Roles_UsuarioCreacion", 1);
                parametro.Add("Roles_FechaCreacion", DateTime.Now);

                var result = db.Execute(ScriptBaseDeDatos.Rol_Insertar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }




        public IEnumerable<tbRoles> List()
        {
            const string sql = "Acce.SP_Rol_Lista";

            List<tbRoles> result = new List<tbRoles>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                result = db.Query<tbRoles>(sql, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }

        }


        public tbRoles ObtenerRol(string Roles_Descripcion)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                string query = "EXEC Acce.SP_Rol_Buscarr @Roles_Descripcion";
                var parametro = new DynamicParameters();
                parametro.Add("Roles_Descripcion", Roles_Descripcion);

                return db.QueryFirstOrDefault<tbRoles>(query, parametro);
            }
        }


        public int RolNuevoId()
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                string query = "SELECT IDENT_CURRENT('Acce.tbRoles')";
                return db.ExecuteScalar<int>(query);
            }
        }

        public RequestStatus InserarPaRol(tbPantallasPorRoles item)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Roles_Id", item.Roles_Id);
                parametro.Add("Panta_Id", item.Panta_Id);
                parametro.Add("Papro_UsuarioCreacion", item.Papro_UsuarioCreacion);
                parametro.Add("Papro_FechaCreacion", DateTime.Now);

                var result = db.Execute(ScriptBaseDeDatos.PantallasRoles_Insertar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public IEnumerable<tbPantallas> ListPant()
        {

            List<tbPantallas> result = new List<tbPantallas>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                result = db.Query<tbPantallas>(ScriptBaseDeDatos.Pantalla_Lista, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }

        }

        public IEnumerable<tbPantallasPorRoles> ListPaRol()
        {
            const string sql = "Acce.SP_PantallasPorRoles_Lista";

            List<tbPantallasPorRoles> result = new List<tbPantallasPorRoles>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                result = db.Query<tbPantallasPorRoles>(sql, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }

        }

        public IEnumerable<tbPantallasPorRoles> ListPadelRol(int id)
        {

            List<tbPantallasPorRoles> result = new List<tbPantallasPorRoles>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { Roles_Id = id };
                result = db.Query<tbPantallasPorRoles>(ScriptBaseDeDatos.PantallasRoles_ListaPorRol, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }

        }


        //-------------------------------------------------Nuevo
        public int Insert(tbRoles item)
        {
            const string sql = "[Acce].[sp_Roles2_insertar]";



            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Rol_Descripcion", item.Roles_Descripcion);
                parametro.Add("@Rol_Creacion", item.Roles_UsuarioCreacion);
                parametro.Add("@Rol_FechaCreacion", item.Roles_FechaModificacion);
                parametro.Add("@ID", DbType.Int32, direction: ParameterDirection.Output);


                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);
                int id = parametro.Get<int>("@ID");


                return id;
            }
        }

        public IEnumerable<tbRoles> ListR()
        {
            const string sql = "Acce.sp_Roles_listar";

            List<tbRoles> result = new List<tbRoles>();

            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                result = db.Query<tbRoles>(sql, commandType: CommandType.Text).ToList();

                return result;
            }
        }

        public tbRoles Fill(int id)
        {

            tbRoles result = new tbRoles();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Rol_Id", id);
                result = db.QueryFirst<tbRoles>(ScriptBaseDeDatos.Rolesllenar, parameter, commandType: CommandType.StoredProcedure);
                return result;
            }

        }

        public RequestStatus Update(tbRoles item)
        {
            string sql = ScriptBaseDeDatos.RolesActualizar;

            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@Rol_Id", item.Roles_Id);
                parameter.Add("@Rol_Descripcion", item.Roles_Descripcion);
                parameter.Add("@Rol_Modifica", item.Roles_UsuarioModificacion);
                parameter.Add("@Rol_FechaModificacion", item.Roles_FechaModificacion);

                var result = db.Execute(sql, parameter, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "exito" : "error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };

            }
        }

        public RequestStatus Delete(string Role_Id)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Rol_Id", Role_Id);

                var result = db.QueryFirst(ScriptBaseDeDatos.RolesEliminar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Exito" : "Error" };
            }
        }

        public IEnumerable<tbRoles> Listpantallas()
        {
            const string sql = "Acce.sp_Pantallas_listar ";

            List<tbRoles> result = new List<tbRoles>();

            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                result = db.Query<tbRoles>(sql, commandType: CommandType.Text).ToList();

                return result;
            }
        }
    }
}
