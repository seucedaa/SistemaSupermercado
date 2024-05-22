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
    public class UsuarioRepository : IRepository<tbUsuarios>
    {
        public IEnumerable<tbUsuarios> Login(string usuario, string contra)
        {
            List<tbUsuarios> result = new List<tbUsuarios>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { Usuario = usuario, Contra = contra };
                result = db.Query<tbUsuarios>(ScriptBaseDeDatos.Usuario_Login, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public IEnumerable<tbUsuarios> ObtenerID(int id)
        {
            List<tbUsuarios> result = new List<tbUsuarios>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { Usuar_Id = id };
                result = db.Query<tbUsuarios>(ScriptBaseDeDatos.Usuario_Buscar, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public IEnumerable<tbUsuarios> Buscar(int id)
        {
            List<tbUsuarios> result = new List<tbUsuarios>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { Usuar_Id = id };
                result = db.Query<tbUsuarios>(ScriptBaseDeDatos.Usuario_Buscar, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public RequestStatus Modificar(tbUsuarios item)
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
                parametro.Add("Usuar_UsuarioModificacion", item.Usuar_UsuarioModificacion);
                parametro.Add("Usuar_FechaModificacion", DateTime.Now);

                var result = db.Execute(ScriptBaseDeDatos.Usuario_Modificar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public RequestStatus Reestablecer(string codigo, string contraseña)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Usua_VerificarCorreo", codigo);
                parametro.Add("Usuar_Contrasena", contraseña);
                parametro.Add("Usuar_UsuarioModificacion", 1);
                parametro.Add("Usuar_FechaModificacion", DateTime.Now);

                var result = db.Execute(ScriptBaseDeDatos.Usuario_ReestablecerContrasena,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public IEnumerable<tbUsuarios> obtenerCorreo(string? usuario)
        {
            string sql = ScriptBaseDeDatos.Usuario_ObtenerCorreo;
            List<tbUsuarios> result = new List<tbUsuarios>();

            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { Usuar_Usuario = usuario };
                result = db.Query<tbUsuarios>(sql, parameters, commandType: CommandType.StoredProcedure).ToList();

                return result;

            }
        }


        public RequestStatus InsertarCodigo(string usuario, string codigo)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Usuar_Usuario", usuario);
                parametro.Add("Usua_ValidarCorreo", codigo);

                var result = db.Execute(ScriptBaseDeDatos.Usuario_InsertarCodigo,
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

                var result = db.Execute(ScriptBaseDeDatos.Usuario_Desactivar,
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
                parametro.Add("Usuar_UltimaSesion", DateTime.Now);
                parametro.Add("Usuar_SuperPuntos", 0);
                parametro.Add("Usuar_UsuarioCreacion", 1);
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
                result = db.Query<tbUsuarios>(ScriptBaseDeDatos.Usuario_Lista, commandType: CommandType.StoredProcedure).ToList();

               

                return result;
            }

        }


        tbUsuarios IRepository<tbUsuarios>.find(int? id)
        {
            throw new NotImplementedException();
        }

    }
}

