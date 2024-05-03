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
   public class CategoriaRepository : IRepository<tbCategorias>
    {
        public IEnumerable<tbCategorias> ObtenerID(int id)
        {
            List<tbCategorias> result = new List<tbCategorias>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { Categ_Id = id };
                result = db.Query<tbCategorias>(ScriptBaseDeDatos.Categoria_Lista, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public IEnumerable<tbCategorias> Buscar(int id)
        {
            List<tbCategorias> result = new List<tbCategorias>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { Categ_Id = id };
                result = db.Query<tbCategorias>(ScriptBaseDeDatos.Categoria_Buscar, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public RequestStatus Modificar(tbCategorias item)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Categ_Id", item.Categ_Id);
                parametro.Add("Categ_Descripcion", item.Categ_Descripcion);
                parametro.Add("Categ_UsuarioModificacion", item.Categ_UsuarioModificacion);
                parametro.Add("Categ_FechaModificacion", DateTime.Now);

                var result = db.Execute(ScriptBaseDeDatos.Categoria_Modificar,
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
                parametro.Add("Categ_Id", id);

                var result = db.Execute(ScriptBaseDeDatos.Categoria_Eliminar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public tbCategorias find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insertar(tbCategorias item)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Categ_Descripcion", item.Categ_Descripcion);
                parametro.Add("Categ_UsuarioCreacion", item.Categ_UsuarioCreacion);
                parametro.Add("Categ_FechaCreacion", DateTime.Now);

                var result = db.Execute(ScriptBaseDeDatos.Categoria_Insertar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public IEnumerable<tbCategorias> Total(int sucursal, string inicio, string fin)
        {
            List<tbCategorias> result = new List<tbCategorias>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { Sucur_Id = sucursal, FechaInicio = inicio, FechaFin = fin };
                result = db.Query<tbCategorias>(ScriptBaseDeDatos.Categoria_Total, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public IEnumerable<tbCategorias> List()
        {

            List<tbCategorias> result = new List<tbCategorias>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                result = db.Query<tbCategorias>(ScriptBaseDeDatos.Categoria_Lista, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }

        }
    }
}
