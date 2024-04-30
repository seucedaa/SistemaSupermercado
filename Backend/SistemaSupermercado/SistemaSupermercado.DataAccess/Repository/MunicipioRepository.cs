using Dapper;
using SistemaSupermercados.Entities.Entities;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaSupermercado.DataAccess.Repository
{
    public class MunicipioRepository : IRepository<tbMunicipios>
    {
        public IEnumerable<tbMunicipios> ObtenerID(string id)
        {
            List<tbMunicipios> result = new List<tbMunicipios>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { Munic_Id = id };
                result = db.Query<tbMunicipios>(ScriptsBaseDeDatos.Municipio_Detalles, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public IEnumerable<tbMunicipios> Detalless(string id)
        {
            List<tbMunicipios> result = new List<tbMunicipios>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { Munic_Id = id };
                result = db.Query<tbMunicipios>(ScriptsBaseDeDatos.Municipio_Detalles, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public RequestStatus Actualizar(tbMunicipios item)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Munic_Id", item.Munic_Id);
                parametro.Add("Munic_Descripcion", item.Munic_Descripcion);
                parametro.Add("Depar_Id", item.Depar_Id);
                parametro.Add("Munic_UsuarioModificacion", item.Munic_UsuarioModificacion);
                parametro.Add("Munic_FechaModificacion", DateTime.Now);

                var result = db.Execute(ScriptsBaseDeDatos.Municipio_Actualizar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public RequestStatus Eliminar(string? id)
        {

            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Munic_Id", id);

                var result = db.Execute(ScriptsBaseDeDatos.Municipio_Eliminar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public tbMunicipios find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insertar(tbMunicipios item)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Munic_Id", item.Munic_Id);
                parametro.Add("Munic_Descripcion", item.Munic_Descripcion);
                parametro.Add("Depar_Id", item.Depar_Id);
                parametro.Add("Munic_UsuarioCreacion", item.Munic_UsuarioCreacion);
                parametro.Add("Munic_FechaCreacion", DateTime.Now);

                var result = db.Execute(ScriptsBaseDeDatos.Municipio_Insertar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public IEnumerable<tbMunicipios> List()
        {
            const string sql = "Gral.SP_Municipios_Mostrar";

            List<tbMunicipios> result = new List<tbMunicipios>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                result = db.Query<tbMunicipios>(sql, commandType: CommandType.Text).ToList();
                return result;
            }
        }

        public RequestStatus Eliminar(int? id)
        {
            throw new NotImplementedException();
        }
    }
}
