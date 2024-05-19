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
    public class ReporteRepository
    {
        public IEnumerable<tbProductos> reporteStock(int Sucur_Id)
        {
            List<tbProductos> result = new List<tbProductos>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { Sucur_Id = Sucur_Id, FiltroSucursal = 1 };

                result = db.Query<tbProductos>(ScriptBaseDeDatos.Reporte_Stock, parameters, commandType: CommandType.StoredProcedure).ToList();

                return result;
            }
        }

        public IEnumerable<tbProductos> TodasStock()
        {
            List<tbProductos> result = new List<tbProductos>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { FiltroSucursal = 0 };
                result = db.Query<tbProductos>(ScriptBaseDeDatos.Reporte_Stock, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public IEnumerable<tbProductos> Productos(int Sucur_Id, string inicio, string fin)
        {
            List<tbProductos> result = new List<tbProductos>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { Sucur_Id = Sucur_Id, FiltroSucursal = 1, FechaInicio = inicio, FechaFin = fin };
                result = db.Query<tbProductos>(ScriptBaseDeDatos.Reporte_Productos, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }
        
        public IEnumerable<tbProductos> TodasProductos(string inicio, string fin)
        {
            List<tbProductos> result = new List<tbProductos>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { FiltroSucursal = 0, FechaInicio = inicio, FechaFin = fin };
                result = db.Query<tbProductos>(ScriptBaseDeDatos.Reporte_Productos, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }
        
        public IEnumerable<tbClientes> Clientes(string inicio, string fin)
        {
            List<tbClientes> result = new List<tbClientes>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new { FechaInicio = inicio, FechaFin = fin };
                result = db.Query<tbClientes>(ScriptBaseDeDatos.Reporte_Cliente, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public IEnumerable<tbVentasEncabezado> Ventas(int sucursal, string inicio, string fin)
        {
            List<tbVentasEncabezado> result = new List<tbVentasEncabezado>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new {Sucur_Id = sucursal, FiltroSucursal = 1, FechaInicio = inicio, FechaFin = fin };
                result = db.Query<tbVentasEncabezado>(ScriptBaseDeDatos.Reporte_Ventas, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        } 
        
        public IEnumerable<tbVentasEncabezado> TodasVentas(string inicio, string fin)
        {
            List<tbVentasEncabezado> result = new List<tbVentasEncabezado>();
            using (var db = new SqlConnection(SistemaSupermercadoContext.ConnectionString))
            {
                var parameters = new {FiltroSucursal = 0, FechaInicio = inicio, FechaFin = fin };
                result = db.Query<tbVentasEncabezado>(ScriptBaseDeDatos.Reporte_Ventas, parameters, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }
    }
}
