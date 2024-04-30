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
    public class VentaEncabezadoRepository : IRepository<tbVentasEncabezado>
    {

        public IEnumerable<tbVentasEncabezado> Buscar(int id)
        {
            List<tbVentasEncabezado> result = new List<tbVentasEncabezado>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { Venen_Id = id };
                result = db.Query<tbVentasEncabezado>(ScriptBaseDeDatos.VentaEncabezado_Buscar, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public RequestStatus Modificar(tbVentasEncabezado item)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Venen_Id", item.Venen_Id);
                parametro.Add("Sucur_Id", item.Sucur_Id);
                parametro.Add("Usuar_Id", item.Usuar_Id);
                parametro.Add("Venen_UsuarioModificacion", item.Venen_UsuarioModificacion);
                parametro.Add("Venen_FechaModificacion", DateTime.Now);

                var result = db.Execute(ScriptBaseDeDatos.VentaEncabezado_Modificar,
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
                parametro.Add("Venen_Id", id);

                var result = db.Execute(ScriptBaseDeDatos.VentaEncabezado_Desactivar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public tbVentasEncabezado find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insertar(tbVentasEncabezado item)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Sucur_Id", item.Sucur_Id);
                parametro.Add("Usuar_Id", item.Usuar_Id); 
                parametro.Add("Venen_UsuarioCreacion", item.Venen_UsuarioCreacion);
                parametro.Add("Venen_FechaCreacion", DateTime.Now);

                var result = db.Execute(ScriptBaseDeDatos.VentaEncabezado_Insertar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public IEnumerable<tbVentasEncabezado> List()
        {

            List<tbVentasEncabezado> result = new List<tbVentasEncabezado>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                result = db.Query<tbVentasEncabezado>(ScriptBaseDeDatos.VentaEncabezado_Lista, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }

        }
    }
}
