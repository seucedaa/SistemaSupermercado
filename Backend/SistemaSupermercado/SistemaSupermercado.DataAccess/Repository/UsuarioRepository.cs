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
    public class UsuarioRepository : IRepository<tbUsuarios>
    {
        public IEnumerable<tbUsuarios> Login(string usuario, string contra)
        {


            List<tbUsuarios> result = new List<tbUsuarios>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { Usuario = usuario, Contraseña = contra };
                result = db.Query<tbUsuarios>(ScriptBaseDeDatos.UsuarioLogin, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public IEnumerable<tbUsuarios> ObtenerID(int id)
        {
            List<tbUsuarios> result = new List<tbUsuarios>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { Usuar_Id = id };
                result = db.Query<tbUsuarios>(ScriptBaseDeDatos.Usuario_Detalles, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public IEnumerable<tbUsuarios> Detalless(int id)
        {
            List<tbUsuarios> result = new List<tbUsuarios>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { Usuar_Id = id };
                result = db.Query<tbUsuarios>(ScriptBaseDeDatos.Usuario_Detalles, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public RequestStatus Actualizar(tbUsuarios item)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Usuar_Id", item.Usuar_Id);
                parametro.Add("Usuar_Correo", item.Usuar_Correo);
                parametro.Add("Usuar_Usuario", item.Usuar_Usuario);
                parametro.Add("Usuar_Admin", item.Usuar_Admin);
                parametro.Add("Roles_Id", item.Roles_Id);
                parametro.Add("Perso_Id", item.Perso_Id);
                parametro.Add("Perso_Tipo", item.Perso_Tipo);
                parametro.Add("Usuar_UltimaSesion", item.Usuar_UltimaSesion);
                parametro.Add("Usuar_SuperPuntos", item.Usuar_SuperPuntos);
                parametro.Add("Usuar_UsuarioModificacion", item.Usuar_UsuarioModificacion);
                parametro.Add("Usuar_FechaModificacion", DateTime.Now);

                var result = db.Execute(ScriptBaseDeDatos.Usuario_Actualizar,
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
                parametro.Add("Usuar_Id", id);

                var result = db.Execute(ScriptBaseDeDatos.Usuario_Eliminar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public RequestStatus Insertar(tbUsuarios item)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Usuar_Correo", item.Usuar_Correo);
                parametro.Add("Usuar_Usuario", item.Usuar_Usuario);
                parametro.Add("Usuar_Contrasena", item.Usuar_Contrasena);
                parametro.Add("Usuar_Admin", item.Usuar_Admin);
                parametro.Add("Roles_Id", item.Roles_Id);
                parametro.Add("Perso_Id", item.Perso_Id);
                parametro.Add("Perso_Tipo", item.Perso_Tipo);
                parametro.Add("Usuar_UltimaSesion", item.Usuar_UltimaSesion);
                parametro.Add("Usuar_SuperPuntos", item.Usuar_SuperPuntos);
                parametro.Add("Usuar_UsuarioCreacion", item.Usuar_UsuarioCreacion);
                parametro.Add("Usuar_FechaCreacion", DateTime.Now);

                var result = db.Execute(ScriptBaseDeDatos.Usuario_Insertar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }




        public RequestStatus InsertarPers(tbPersonas item)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Perso_DNI", item.Perso_DNI);
                parametro.Add("Perso_Nombre", item.Perso_Nombre);
                parametro.Add("Perso_Apellido", item.Perso_Apellido);
                parametro.Add("Perso_Correo", item.Perso_Correo);
                parametro.Add("Perso_FechaNacimiento", item.Perso_FechaNacimiento);
                parametro.Add("Perso_Sexo", item.Perso_Sexo);
                parametro.Add("Perso_Direccion", item.Perso_Direccion);
                parametro.Add("Estc_Id", item.Estc_Id);
                parametro.Add("Ciud_id", item.Ciud_id);
                parametro.Add("Perso_FechaCreacion", DateTime.Now);

                var result = db.Execute(ScriptBaseDeDatos.Persona_Insertar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public int PersNuevoId()
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                string query = "SELECT IDENT_CURRENT('Grl.tbPersonas')";
                return db.ExecuteScalar<int>(query);
            }
        }

        public int UsuaNuevoId()
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                string query = "SELECT IDENT_CURRENT('Acc.tbUsuarios')";
                return db.ExecuteScalar<int>(query);
            }
        }
        public RequestStatus RegistrarUsu(tbUsuarios item)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Usuar_Correo", item.Usuar_Correo);
                parametro.Add("Usuar_Usuario", item.Usuar_Usuario);
                parametro.Add("Usuar_Admin", 0);
                parametro.Add("Roles_Id", 2);
                parametro.Add("Perso_Id", item.Perso_Id);
                parametro.Add("Perso_Tipo", 1);
                parametro.Add("Usuar_UltimaSesion", item.Usuar_UltimaSesion);
                parametro.Add("Usuar_SuperPuntos", item.Usuar_SuperPuntos);
                parametro.Add("Usuar_UsuarioCreacion", null);
                parametro.Add("Usuar_FechaCreacion", DateTime.Now);

                var result = db.Execute(ScriptBaseDeDatos.Usuario_Insertar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }


        public IEnumerable<tbUsuarios> List()
        {

            List<tbUsuarios> result = new List<tbUsuarios>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                result = db.Query<tbUsuarios>(ScriptBaseDeDatos.Usuario_Mostrar, commandType: CommandType.Text).ToList();
                return result;
            }

        }


        tbUsuarios IRepository<tbUsuarios>.find(int? id)
        {
            throw new NotImplementedException();
        }

        public tbUsuarios find(int? id)
        {
            throw new NotImplementedException();
        }
    }
}
}
