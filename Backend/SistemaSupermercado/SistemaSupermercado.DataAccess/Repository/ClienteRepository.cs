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
    public class ClienteRepository : IRepository<tbClientes>
    {
        

        public IEnumerable<tbClientes> Detalless(int id)
        {
            List<tbClientes> result = new List<tbClientes>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { Clien_Id = id };
                result = db.Query<tbClientes>(ScriptBaseDeDatos.Cliente_Detalles, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public RequestStatus Actualizar(tbClientes item)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Clien_Id", item.Clien_Id);
                parametro.Add("Clien_PrimerNombre", item.Clien_PrimerNombre);
                parametro.Add("Clien_SegundoNombre", item.Clien_SegundoNombre);
                parametro.Add("Clien_PrimerApellido", item.Clien_PrimerApellido);
                parametro.Add("Clien_SegundoApellido", item.Clien_SegundoApellido);
                parametro.Add("Clien_Sexo", item.Clien_Sexo);
                parametro.Add("Estad_Id", item.Estad_Id);
                parametro.Add("Clien_Telefono", item.Clien_Telefono);
                parametro.Add("Munic_Id", item.Munic_Id);
                parametro.Add("Clien_Direccion", item.Clien_Direccion);
                parametro.Add("Clien_UsuarioModificacion", item.Clien_UsuarioModificacion);
                parametro.Add("Clien_FechaModificacion", DateTime.Now);

                var result = db.Execute(ScriptBaseDeDatos.Cliente_Actualizar,
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
                parametro.Add("Clien_Id", id);

                var result = db.Execute(ScriptBaseDeDatos.Cliente_Eliminar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public tbClientes find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insertar(tbClientes item)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Clien_Dni", item.Clien_Dni);
                parametro.Add("Clien_PrimerNombre", item.Clien_PrimerNombre);
                parametro.Add("Clien_SegundoNombre", item.Clien_SegundoNombre);
                parametro.Add("Clien_PrimerApellido", item.Clien_PrimerApellido);
                parametro.Add("Clien_SegundoApellido", item.Clien_SegundoApellido);
                parametro.Add("Clien_Sexo", item.Clien_Sexo);
                parametro.Add("Estad_Id", item.Estad_Id);
                parametro.Add("Clien_Telefono", item.Clien_Telefono);
                parametro.Add("Munic_Id", item.Munic_Id);
                parametro.Add("Clien_Direccion", item.Clien_Direccion);
                parametro.Add("Clien_UsuarioCreacion", item.Clien_UsuarioCreacion);
                parametro.Add("Clien_FechaCreacion", DateTime.Now);

                var result = db.Execute(ScriptBaseDeDatos.Cliente_Insertar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public int ClienteNuevoId()
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                string query = "SELECT IDENT_CURRENT('Venta.tbClientes')";
                return db.ExecuteScalar<int>(query);
            }
        }
        public IEnumerable<tbClientes> List()
        {

            List<tbClientes> result = new List<tbClientes>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                result = db.Query<tbClientes>(ScriptBaseDeDatos.Cliente_Mostrar, commandType: CommandType.Text).ToList();
                return result;
            }

        }
    }
}
