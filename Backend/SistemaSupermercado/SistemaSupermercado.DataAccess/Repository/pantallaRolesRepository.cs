using Dapper;
using Microsoft.Data.SqlClient;
using SistemaSupermercado.DataAcceess.Repository;
using SistemaSupermercado.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaSupermercado.DataAccess.Repository
{
    public class pantallaRolesRepository : IRepository<tbPantallasPorRoles>
    {
        public RequestStatus Insert(tbPantallasPorRoles item)
        {
            const string sql = "[Acce].[sp_PantallasPorRoles_insertar]";



            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("@Rol_Id", item.Roles_Id);
                parametro.Add("@Ptl_Id ", item.Panta_Id);
                var result = db.Execute(sql, parametro, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "Exito" : "Error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public IEnumerable<tbPantallasPorRoles> List()
        {
            const string sql = "Acce.sp_PantallasRoles_listar";

            List<tbPantallasPorRoles> result = new List<tbPantallasPorRoles>();

            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                result = db.Query<tbPantallasPorRoles>(sql, commandType: CommandType.Text).ToList();

                return result;
            }
        }
        public IEnumerable<tbPantallasPorRoles> Fill(int id)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Rol_Id", id);
                return db.Query<tbPantallasPorRoles>(ScriptBaseDeDatos.PantallasRolesllenar, parameter, commandType: CommandType.StoredProcedure);
            }
        }

        public IEnumerable<tbRoles> Fill2(int id)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Rol_Id", id);
                return db.Query<tbRoles>(ScriptBaseDeDatos.PantallasRolesllenar2, parameter, commandType: CommandType.StoredProcedure);
            }
        }
        public RequestStatus Update(tbPantallasPorRoles item)
        {
            string sql = ScriptBaseDeDatos.PantallasRolesActualizar;

            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("@PaR_Id", item.Papro_Id);
                parameter.Add("@Rol_Id", item.Roles_Id);
                parameter.Add("@Ptl_Id", item.Panta_Id);

                var result = db.Execute(sql, parameter, commandType: CommandType.StoredProcedure);
                string mensaje = (result == 1) ? "exito" : "error";
                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };

            }
        }

        public RequestStatus Delete(string Role_Id)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameter = new DynamicParameters();
                parameter.Add("Rol_Id", Role_Id);

                var result = db.QueryFirst(ScriptBaseDeDatos.PantallasRolesEliminar, parameter, commandType: CommandType.StoredProcedure);
                return new RequestStatus { CodeStatus = result.Resultado, MessageStatus = (result.Resultado == 1) ? "Exito" : "Error" };
            }
        }
        public RequestStatus Eliminar(int? id)
        {
            throw new NotImplementedException();
        }

        public tbPantallasPorRoles find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insertar(tbPantallasPorRoles item)
        {
            throw new NotImplementedException();
        }

        //public IEnumerable<tbPantallasPorRoles> List()
        //{
        //    throw new NotImplementedException();
        //}

        public RequestStatus Modificar(tbPantallasPorRoles item)
        {
            throw new NotImplementedException();
        }
    }
}
