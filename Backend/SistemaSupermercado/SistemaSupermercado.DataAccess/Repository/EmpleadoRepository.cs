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
    public class EmpleadoRepository : IRepository<tbEmpleados>
    {

        public IEnumerable<tbEmpleados> Buscars(int id)
        {
            List<tbEmpleados> result = new List<tbEmpleados>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { Emple_Id = id };
                result = db.Query<tbEmpleados>(ScriptBaseDeDatos.Empleado_Buscar, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public RequestStatus Modificar(tbEmpleados item)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Emple_Id", item.Emple_Id);
                parametro.Add("Emple_PrimerNombre", item.Emple_PrimerNombre);
                parametro.Add("Emple_SegundoNombre", item.Emple_SegundoNombre);
                parametro.Add("Emple_PrimerApellido", item.Emple_PrimerApellido);
                parametro.Add("Emple_SegundoApellido", item.Emple_SegundoApellido);
                parametro.Add("Emple_Sexo", item.Emple_Sexo);
                parametro.Add("Estad_Id", item.Estad_Id);
                parametro.Add("Emple_Telefono", item.Emple_Telefono);
                parametro.Add("Emple_Correo", item.Emple_Correo);
                parametro.Add("Munic_Id", item.Munic_Id);
                parametro.Add("Emple_Direccion", item.Emple_Direccion);
                parametro.Add("Cargo_Id", item.Cargo_Id);
                parametro.Add("Sucur_Id", item.Sucur_Id);
                parametro.Add("Emple_UsuarioModificacion", item.Emple_UsuarioModificacion);
                parametro.Add("Emple_FechaModificacion", DateTime.Now);

                var result = db.Execute(ScriptBaseDeDatos.Empleado_Modificar,
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
                parametro.Add("Emple_Id", id);

                var result = db.Execute(ScriptBaseDeDatos.Empleado_Eliminar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public tbEmpleados find(int? id)
        {
            throw new NotImplementedException();
        }

        public RequestStatus Insertar(tbEmpleados item)
        {
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parametro = new DynamicParameters();
                parametro.Add("Emple_PrimerNombre", item.Emple_PrimerNombre);
                parametro.Add("Emple_SegundoNombre", item.Emple_SegundoNombre);
                parametro.Add("Emple_PrimerApellido", item.Emple_PrimerApellido);
                parametro.Add("Emple_SegundoApellido", item.Emple_SegundoApellido);
                parametro.Add("Emple_Sexo", item.Emple_Sexo);
                parametro.Add("Estad_Id", item.Estad_Id);
                parametro.Add("Emple_Telefono", item.Emple_Telefono);
                parametro.Add("Emple_Correo", item.Emple_Correo);
                parametro.Add("Munic_Id", item.Munic_Id);
                parametro.Add("Emple_Direccion", item.Emple_Direccion);
                parametro.Add("Cargo_Id", item.Cargo_Id);
                parametro.Add("Sucur_Id", item.Sucur_Id);
                parametro.Add("Emple_UsuarioCreacion", item.Emple_UsuarioCreacion);
                parametro.Add("Emple_FechaCreacion", DateTime.Now);

                var result = db.Execute(ScriptBaseDeDatos.Empleado_Insertar,
                    parametro,
                     commandType: CommandType.StoredProcedure
                    );

                string mensaje = (result == 1) ? "Exito" : "Error";

                return new RequestStatus { CodeStatus = result, MessageStatus = mensaje };
            }
        }

        public IEnumerable<tbEmpleados> List()
        {

            List<tbEmpleados> result = new List<tbEmpleados>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                result = db.Query<tbEmpleados>(ScriptBaseDeDatos.Empleado_Lista, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }

        }
    }
}
