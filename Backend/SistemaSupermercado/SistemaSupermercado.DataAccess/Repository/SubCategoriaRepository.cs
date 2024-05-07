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
    public class SubcategoriaRepository : IRepository<tbSubcategorias>
    {
        public IEnumerable<tbSubcategorias> ObtenerID(int id)
        {
            List<tbSubcategorias> result = new List<tbSubcategorias>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { Subca_Id = id };
                result = db.Query<tbSubcategorias>(ScriptBaseDeDatos.Subcategoria_Lista, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public IEnumerable<tbSubcategorias> Buscar(int id)
        {
            List<tbSubcategorias> result = new List<tbSubcategorias>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { Subca_Id = id };
                result = db.Query<tbSubcategorias>(ScriptBaseDeDatos.Subcategoria_Buscar, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public RequestStatus Modificar(tbSubcategorias item)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Subca_Id", item.Subca_Id);
                parametro.Add("Subca_Descripcion", item.Subca_Descripcion);
                parametro.Add("Categ_Id", item.Categ_Id);
                parametro.Add("Subca_UsuarioModificacion", item.Subca_UsuarioModificacion);
                parametro.Add("Subca_FechaModificacion", DateTime.Now);

                var result = db.Execute(ScriptBaseDeDatos.Subcategoria_Modificar,
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
                parametro.Add("Subca_Id", id);

                var result = db.Execute(ScriptBaseDeDatos.Subcategoria_Eliminar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public tbSubcategorias find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insertar(tbSubcategorias item)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Subca_Descripcion", item.Subca_Descripcion);
                parametro.Add("Categ_Id", item.Categ_Id);
                parametro.Add("Subca_UsuarioCreacion", item.Subca_UsuarioCreacion);
                parametro.Add("Subca_FechaCreacion", DateTime.Now);

                var result = db.Execute(ScriptBaseDeDatos.Subcategoria_Insertar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public IEnumerable<tbSubcategorias> TotalSub(int sucursal, string inicio, string fin)
        {
            List<tbSubcategorias> result = new List<tbSubcategorias>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { Sucur_Id = sucursal, FechaInicio = inicio, FechaFin = fin };
                result = db.Query<tbSubcategorias>(ScriptBaseDeDatos.Subcategoria_Total, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public IEnumerable<tbSubcategorias> List()
        {

            List<tbSubcategorias> result = new List<tbSubcategorias>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                result = db.Query<tbSubcategorias>(ScriptBaseDeDatos.Subcategoria_Lista, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }
        public IEnumerable<tbSubcategorias> DropDownList(int Categ_Id)
        {

            List<tbSubcategorias> result = new List<tbSubcategorias>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { Categ_Id = Categ_Id };

                result = db.Query<tbSubcategorias>(ScriptBaseDeDatos.Subcategoria_DropDownList, parameters,commandType: CommandType.StoredProcedure).ToList();
                
                return result;
            }

        }


        public IEnumerable<tbSubcategorias> ListarSubcateporCate(int id)
        {
            List<tbSubcategorias> result = new List<tbSubcategorias>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { Categ_Id = id };
                result = db.Query<tbSubcategorias>(ScriptBaseDeDatos.Subcategoria_DropDownList, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }
    }
}
