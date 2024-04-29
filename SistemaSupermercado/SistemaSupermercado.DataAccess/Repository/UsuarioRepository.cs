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
    public class UsuarioRepository : IRepositorio<tbUsuarios>
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
                var parameters = new { Usua_Id = id };
                result = db.Query<tbUsuarios>(ScriptBaseDeDatos.Usuario_Detalles, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public IEnumerable<tbUsuarios> Detalless(int id)
        {
            List<tbUsuarios> result = new List<tbUsuarios>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { Usua_Id = id };
                result = db.Query<tbUsuarios>(ScriptBaseDeDatos.Usuario_Detalles, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public RequestStatus Actualizar(tbUsuarios item)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Usua_Id", item.Usua_Id);
                parametro.Add("Usua_Usuario", item.Usua_Usuario);
                parametro.Add("Usua_EsAdmin", item.Usua_EsAdmin);
                parametro.Add("Role_Id", item.Role_Id);
                parametro.Add("Perso_Id", item.Perso_Id);
                parametro.Add("Usua_UsuarioModificacion", item.Usua_UsuarioModificacion);
                parametro.Add("Usua_FechaModificacion", DateTime.Now);

                var result = db.Execute(ScriptBaseDeDatos.Usuario_Actualizar,
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
                parametro.Add("Usua_Contraseña", contraseña);
                parametro.Add("Usua_UsuarioModificacion", 1.ToString());
                parametro.Add("Usua_FechaModificacion", DateTime.Now);

                var result = db.Execute(ScriptBaseDeDatos.Usuario_ReestableceR,
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
                parametro.Add("Usua_Id", id);

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
                parametro.Add("Usua_Usuario", item.Usua_Usuario);
                parametro.Add("Usua_Contraseña", item.Usua_Contraseña);
                parametro.Add("Usua_EsAdmin", item.Usua_EsAdmin);
                parametro.Add("Role_Id", item.Role_Id);
                parametro.Add("Perso_Id", item.Perso_Id);
                parametro.Add("Usua_UsuarioCreacion", item.Usua_UsuarioCreacion);
                parametro.Add("Usua_FechaCreacion", DateTime.Now);

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
                parametro.Add("Usua_Usuario", item.Usua_Usuario);
                parametro.Add("Usua_Contraseña", item.Usua_Contraseña);
                parametro.Add("Usua_EsAdmin", 0);
                parametro.Add("Role_Id", 2);
                parametro.Add("Perso_Id", item.Perso_Id);
                parametro.Add("Usua_UsuarioCreacion", null);
                parametro.Add("Usua_FechaCreacion", DateTime.Now);

                var result = db.Execute(ScriptBaseDeDatos.Usuario_Insertar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public RequestStatus Registro(tbRegistros item)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Perso_Id", item.Perso_Id);
                parametro.Add("Regi_MiCredito", item.Regi_MiCredito);
                parametro.Add("Regi_UsuarioCreacion", item.Regi_UsuarioCreacion);
                parametro.Add("Regi_FechaCreacion", DateTime.Now);

                var result = db.Execute(ScriptBaseDeDatos.Registro_Insertar,
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
                result = db.Query<tbUsuarios>(ScriptBaseDeDatos.Usuario_Seleccionar, commandType: CommandType.Text).ToList();
                return result;
            }

        }

        public IEnumerable<tbUsuarios> obtenerCorreo(string? usuario)
        {
            string sql = ScriptBaseDeDatos.Usuario_ObtenerCorreo;
            List<tbUsuarios> result = new List<tbUsuarios>();

            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { Usua_Usuario = usuario };
                result = db.Query<tbUsuarios>(sql, parameters, commandType: CommandType.StoredProcedure).ToList();

                return result;

            }
        }


        public RequestStatus InsertarCodigo(string usuario, string codigo)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Usua_Usuario", usuario);
                parametro.Add("Usua_ValidarCorreo", codigo);

                var result = db.Execute(ScriptBaseDeDatos.Usuario_InsertarCodigo,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }


        tbUsuarios IRepositorio<tbUsuarios>.find(int? id)
        {
            throw new NotImplementedException();
        }
    }
}
}
