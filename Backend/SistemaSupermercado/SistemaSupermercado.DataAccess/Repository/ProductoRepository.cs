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
    public class ProductoRepository : IRepository<tbProductos>
    {
        public IEnumerable<tbProductos> ObtenerID(int id)
        {
            List<tbProductos> result = new List<tbProductos>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { Produ_Id = id };
                result = db.Query<tbProductos>(ScriptBaseDeDatos.Producto_Lista, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public IEnumerable<tbProductos> Buscar(int id)
        {
            List<tbProductos> result = new List<tbProductos>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { Produ_Id = id };
                result = db.Query<tbProductos>(ScriptBaseDeDatos.Producto_Buscar, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public RequestStatus Modificar(tbProductos item)
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
                parametro.Add("Impue_Id", item.Impue_Id);
                parametro.Add("Prove_Id", item.Prove_Id);
                parametro.Add("Produ_UsuarioModificacion", item.Produ_UsuarioModificacion);
                parametro.Add("Produ_FechaModificacion", DateTime.Now);

                var result = db.Execute(ScriptBaseDeDatos.Producto_Modificar,
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

                var result = db.Execute(ScriptBaseDeDatos.Producto_Desactivar,
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

                var result = db.Execute(ScriptBaseDeDatos.Producto_Insertar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public IEnumerable<tbProductos> Existencia(int sucursal)
        {
            List<tbProductos> result = new List<tbProductos>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { Sucur_Id = sucursal, FiltroSucursal = 1};
                result = db.Query<tbProductos>(ScriptBaseDeDatos.Producto_Existencia, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public IEnumerable<tbProductos> ExisTodas()
        {
            List<tbProductos> result = new List<tbProductos>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { FiltroSucursal = 0 };
                result = db.Query<tbProductos>(ScriptBaseDeDatos.Producto_Existencia, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public IEnumerable<tbProductos> Top(int sucursal)
        {
            List<tbProductos> result = new List<tbProductos>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { Sucur_Id = sucursal };
                result = db.Query<tbProductos>(ScriptBaseDeDatos.Producto_Top, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        } 
        
        public IEnumerable<tbProductos> Principal(int sucursal)
        {
            List<tbProductos> result = new List<tbProductos>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { Sucur_Id = sucursal };
                result = db.Query<tbProductos>(ScriptBaseDeDatos.Producto_Principal, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public IEnumerable<tbProductos> Ventas(int sucursal, string inicio, string fin)
        {
            List<tbProductos> result = new List<tbProductos>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { Sucur_Id = sucursal, FechaInicio = inicio, FechaFin = fin };
                result = db.Query<tbProductos>(ScriptBaseDeDatos.Producto_Total, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public IEnumerable<tbProductos> Todas(string inicio, string fin)
        {
            List<tbProductos> result = new List<tbProductos>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { FiltroSucursal = 0, FechaInicio = inicio, FechaFin = fin };
                result = db.Query<tbProductos>(ScriptBaseDeDatos.Producto_Total, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }
        public IEnumerable<tbProductos> List()
        {

            List<tbProductos> result = new List<tbProductos>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                result = db.Query<tbProductos>(ScriptBaseDeDatos.Producto_Lista, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }

        }
    }
}
