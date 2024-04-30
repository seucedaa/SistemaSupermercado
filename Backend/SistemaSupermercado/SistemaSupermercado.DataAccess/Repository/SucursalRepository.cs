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
    public class SucursalRepository : IRepository<tbSucursales>
    {
        public IEnumerable<tbSucursales> ObtenerID(int id)
        {
            List<tbSucursales> result = new List<tbSucursales>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { Sucur_Id = id };
                result = db.Query<tbSucursales>(ScriptBaseDeDatos.Sucursal_Lista, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public IEnumerable<tbSucursales> Buscars(int id)
        {
            List<tbSucursales> result = new List<tbSucursales>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { Sucur_Id = id };
                result = db.Query<tbSucursales>(ScriptBaseDeDatos.Sucursal_Buscar, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public RequestStatus Modificar(tbSucursales item)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Sucur_Id", item.Sucur_Id);
                parametro.Add("Sucur_Descripcion", item.Sucur_Descripcion);
                parametro.Add("Sucur_Direccion", item.Sucur_Direccion);
                parametro.Add("Sucur_Telefono", item.Sucur_Telefono);
                parametro.Add("Munic_Id", item.Munic_Id);
                parametro.Add("Sucur_UsuarioModificacion", item.Sucur_UsuarioModificacion);
                parametro.Add("Sucur_FechaModificacion", DateTime.Now);

                var result = db.Execute(ScriptBaseDeDatos.Sucursal_Modificar,
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
                parametro.Add("Sucur_Id", id);

                var result = db.Execute(ScriptBaseDeDatos.Sucursal_Desactivar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public tbSucursales find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insertar(tbSucursales item)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Sucur_Id", item.Sucur_Id);
                parametro.Add("Sucur_Descripcion", item.Sucur_Descripcion);
                parametro.Add("Sucur_Direccion", item.Sucur_Direccion);
                parametro.Add("Sucur_Telefono", item.Sucur_Telefono);
                parametro.Add("Munic_Id", item.Munic_Id);
                parametro.Add("Sucur_UsuarioCreacion", item.Sucur_UsuarioCreacion);
                parametro.Add("Sucur_FechaCreacion", DateTime.Now);

                var result = db.Execute(ScriptBaseDeDatos.Sucursal_Insertar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public IEnumerable<tbSucursales> List()
        {

            List<tbSucursales> result = new List<tbSucursales>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                result = db.Query<tbSucursales>(ScriptBaseDeDatos.Sucursal_Lista, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }

        }
    }
}
