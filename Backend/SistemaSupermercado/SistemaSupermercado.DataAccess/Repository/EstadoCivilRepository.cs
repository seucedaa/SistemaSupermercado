﻿using Dapper;
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
    public class EstadoCivilRepository : IRepository<tbEstadosCiviles>
    {
        public IEnumerable<tbEstadosCiviles> ObtenerID(int id)
        {
            List<tbEstadosCiviles> result = new List<tbEstadosCiviles>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { Estad_Id = id };
                result = db.Query<tbEstadosCiviles>(ScriptBaseDeDatos.EstadoCivil_Lista, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public IEnumerable<tbEstadosCiviles> Buscar(int id)
        {
            List<tbEstadosCiviles> result = new List<tbEstadosCiviles>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { Estad_Id = id };
                result = db.Query<tbEstadosCiviles>(ScriptBaseDeDatos.EstadoCivil_Buscar, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public RequestStatus Modificar(tbEstadosCiviles item)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Estad_Id", item.Estad_Id);
                parametro.Add("Estad_Descripcion", item.Estad_Descripcion);
                parametro.Add("Estad_UsuarioModificacion", item.Estad_UsuarioModificacion);
                parametro.Add("Estad_FechaModificacion", DateTime.Now);

                var result = db.Execute(ScriptBaseDeDatos.EstadoCivil_Modificar,
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
                parametro.Add("Estad_Id", id);

                var result = db.Execute(ScriptBaseDeDatos.EstadoCivil_Eliminar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public tbEstadosCiviles find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insertar(tbEstadosCiviles item)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Estad_Descripcion", item.Estad_Descripcion);
                parametro.Add("Estad_UsuarioCreacion", item.Estad_UsuarioCreacion);
                parametro.Add("Estad_FechaCreacion", DateTime.Now);

                var result = db.Execute(ScriptBaseDeDatos.EstadoCivil_Insertar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public IEnumerable<tbEstadosCiviles> List()
        {

            List<tbEstadosCiviles> result = new List<tbEstadosCiviles>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                result = db.Query<tbEstadosCiviles>(ScriptBaseDeDatos.EstadoCivil_Lista, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }

        }
    }
}
