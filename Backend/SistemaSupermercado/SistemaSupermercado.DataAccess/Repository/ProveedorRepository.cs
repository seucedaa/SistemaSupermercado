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
    public class ProveedorRepository : IRepository<tbProveedores>
    {

        public IEnumerable<tbProveedores> Buscar(int id)
        {
            List<tbProveedores> result = new List<tbProveedores>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { Prove_Id = id };
                result = db.Query<tbProveedores>(ScriptBaseDeDatos.Proveedor_Buscar, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public RequestStatus Modificar(tbProveedores item)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Prove_Id", item.Prove_Id);
                parametro.Add("Prove_Marca", item.Prove_Marca);
                parametro.Add("Prove_ContactoPrimerNombre", item.Prove_ContactoPrimerNombre);
                parametro.Add("Prove_ContactoSegundoApellido", item.Prove_ContactoSegundoApellido);
                parametro.Add("Prove_ContactoPrimerApellido", item.Prove_ContactoPrimerApellido);
                parametro.Add("Prove_ContactoSegundoApellido", item.Prove_ContactoSegundoApellido);
                parametro.Add("Munic_Id", item.Munic_Id);
                parametro.Add("Prove_Direccion", item.Prove_Direccion);
                parametro.Add("Prove_Telefono", item.Prove_Telefono);
                parametro.Add("Prove_Correo", item.Prove_Correo);
                parametro.Add("Prove_Notas", item.Prove_Notas);
                parametro.Add("Prove_UsuarioModificacion", item.Prove_UsuarioModificacion);
                parametro.Add("Prove_FechaModificacion", DateTime.Now);

                var result = db.Execute(ScriptBaseDeDatos.Proveedor_Modificar,
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
                parametro.Add("Prove_Id", id);

                var result = db.Execute(ScriptBaseDeDatos.Proveedor_Desactivar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public tbProveedores find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insertar(tbProveedores item)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Prove_Marca", item.Prove_Marca);
                parametro.Add("Prove_ContactoPrimerNombre", item.Prove_ContactoPrimerNombre);
                parametro.Add("Prove_ContactoSegundoApellido", item.Prove_ContactoSegundoApellido);
                parametro.Add("Prove_ContactoPrimerApellido", item.Prove_ContactoPrimerApellido);
                parametro.Add("Prove_ContactoSegundoApellido", item.Prove_ContactoSegundoApellido);
                parametro.Add("Munic_Id", item.Munic_Id);
                parametro.Add("Prove_Direccion", item.Prove_Direccion);
                parametro.Add("Prove_Telefono", item.Prove_Telefono);
                parametro.Add("Prove_Correo", item.Prove_Correo);
                parametro.Add("Prove_Notas", item.Prove_Notas);
                parametro.Add("Prove_UsuarioCreacion", item.Prove_UsuarioCreacion);
                parametro.Add("Prove_FechaCreacion", DateTime.Now);

                var result = db.Execute(ScriptBaseDeDatos.Proveedor_Insertar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public IEnumerable<tbProveedores> List()
        {

            List<tbProveedores> result = new List<tbProveedores>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                result = db.Query<tbProveedores>(ScriptBaseDeDatos.Proveedor_Lista, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }

        }
    }
}
