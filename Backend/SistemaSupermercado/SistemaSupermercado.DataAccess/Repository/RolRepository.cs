﻿using Dapper;
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
    public class RolRepository : IRepositorio<tbRoles>
    {
        public IEnumerable<tbRoles> Detalless(int id)
        {
            List<tbRoles> result = new List<tbRoles>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { Roles_Id = id };
                result = db.Query<tbRoles>(ScriptBaseDeDatos.Roles_Detalles, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public RequestStatus Actualizar(tbRoles item)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Roles_Id", item.Roles_Id);
                parametro.Add("Roles_Descripcion", item.Roles_Descripcion);
                parametro.Add("Roles_UsuarioModificacion", 1);
                parametro.Add("Roles_FechaModificacion", DateTime.Now);

                var result = db.Execute(ScriptBaseDeDatos.Roles_Actualizar,
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
                parametro.Add("Roles_Id", id);

                var result = db.Execute(ScriptBaseDeDatos.Roles_Eliminar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public RequestStatus EliminarPaRol(tbPantallasPorRoles item)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Papro_Id", item.Papro_Id);

                var result = db.Execute(ScriptBaseDeDatos.PantallasRoles_Eliminar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public tbRoles find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insertar(tbRoles item)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Roles_Descripcion", item.Roles_Descripcion);
                parametro.Add("Roles_UsuarioCreacion", 1);
                parametro.Add("Roles_FechaCreacion", DateTime.Now);

                var result = db.Execute(ScriptBaseDeDatos.Roles_Insertar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }




        public IEnumerable<tbRoles> List()
        {
            const string sql = "Acce.SP_Roles_Mostrar";

            List<tbRoles> result = new List<tbRoles>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                result = db.Query<tbRoles>(sql, commandType: CommandType.Text).ToList();
                return result;
            }

        }


        public tbRoles ObtenerRol(string Roles_Descripcion)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                string query = "EXEC Acce.SP_Roles_Buscar @Roles_Descripcion";
                var parametro = new DynamicParameters();
                parametro.Add("Roles_Descripcion", Roles_Descripcion);

                return db.QueryFirstOrDefault<tbRoles>(query, parametro);
            }
        }


        public int RolNuevoId()
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                string query = "SELECT IDENT_CURRENT('Acce.tbRoles')";
                return db.ExecuteScalar<int>(query);
            }
        }

        public RequestStatus InserarPaRol(tbPantallasPorRoles item)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Roles_Id", item.Roles_Id);
                parametro.Add("Panta_Id", item.Panta_Id);
                parametro.Add("Papro_UsuarioCreacion", item.Papro_UsuarioCreacion);
                parametro.Add("Papro_FechaCreacion", item.Papro_FechaCreacion);

                var result = db.Execute(ScriptBaseDeDatos.PantallasRoles_Insertar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public IEnumerable<tbPantallas> ListPant()
        {
            const string sql = "[Acce].[SP_Pantallas_Mostrar]";

            List<tbPantallas> result = new List<tbPantallas>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                result = db.Query<tbPantallas>(sql, commandType: CommandType.Text).ToList();
                return result;
            }

        }

        public IEnumerable<tbPantallasPorRoles> ListPaRol()
        {
            const string sql = "Acce.SP_PantallasPorRoles_Mostrar";

            List<tbPantallasPorRoles> result = new List<tbPantallasPorRoles>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                result = db.Query<tbPantallasPorRoles>(sql, commandType: CommandType.Text).ToList();
                return result;
            }

        }

        public IEnumerable<tbPantallasPorRoles> ListPadelRol(int id)
        {

            List<tbPantallasPorRoles> result = new List<tbPantallasPorRoles>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { Roles_Id = id };
                result = db.Query<tbPantallasPorRoles>(ScriptBaseDeDatos.PantallasRoles_MostrarPorRol, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }

        }
    }
}