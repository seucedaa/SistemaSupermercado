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
    public class ProductoRepository : IRepository<tbProductos>
    {
        public IEnumerable<tbProductos> ObtenerID(int id)
        {
            List<tbProductos> result = new List<tbProductos>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { Produ_Id = id };
                result = db.Query<tbProductos>(ScriptsBaseDeDatos.Producto_Llenar, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public IEnumerable<tbProductos> Detalless(int id)
        {
            List<tbProductos> result = new List<tbProductos>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { Produ_Id = id };
                result = db.Query<tbProductos>(ScriptsBaseDeDatos.Producto_Detalles, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public RequestStatus Actualizar(tbProductos item)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Produ_Id", item.Produ_Id);
                parametro.Add("Produ_Descripcion", item.Produ_Descripcion);
                parametro.Add("Produ_Existencia", item.Produ_Existencia);
                parametro.Add("Produ_PrecioCompra", item.Produ_PrecioCompra);
                parametro.Add("Produ_PrecioVenta", item.Produ_PrecioVenta);
                parametro.Add("Subca_Id", item.Subca_Id);
                parametro.Add("Categ_Id", item.Categ_Id);
                parametro.Add("Prove_Id", item.Prove_Id);
                parametro.Add("Produ_UsuarioModificacion", item.Produ_UsuarioModificacion);
                parametro.Add("Produ_FechaModificacion", DateTime.Now);

                var result = db.Execute(ScriptsBaseDeDatos.Producto_Actualizar,
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
                parametro.Add("Produ_Id", id);

                var result = db.Execute(ScriptsBaseDeDatos.Producto_Eliminar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public tbProductos find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insertar(tbProductos item)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Produ_Descripcion", item.Produ_Descripcion);
                parametro.Add("Produ_Existencia", item.Produ_Existencia);
                parametro.Add("Produ_PrecioCompra", item.Produ_PrecioCompra);
                parametro.Add("Produ_PrecioVenta", item.Produ_PrecioVenta);
                parametro.Add("Impue_Id", item.Impue_Id);
                parametro.Add("Subca_Id", item.Subca_Id);
                parametro.Add("Prove_Id", item.Prove_Id); 
                parametro.Add("Produ_UsuarioCreacion", item.Produ_UsuarioCreacion);
                parametro.Add("Produ_FechaCreacion", DateTime.Now);

                var result = db.Execute(ScriptsBaseDeDatos.Producto_Insertar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public IEnumerable<tbProductos> List()
        {

            List<tbProductos> result = new List<tbProductos>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                result = db.Query<tbProductos>(ScriptBaseDeDatos.Producto_Mostrar, commandType: CommandType.Text).ToList();
                return result;
            }

        }
    }
}
