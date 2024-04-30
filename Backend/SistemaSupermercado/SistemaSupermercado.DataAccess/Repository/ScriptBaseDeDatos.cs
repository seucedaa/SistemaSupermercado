using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaSupermercado.DataAcceess.Repository
{
    public class ScriptBaseDeDatos
    {
        #region Cargo
        public static string Cargo_Mostrar = "Gral.SP_Cargos_Mostrar";
        public static string Cargo_Insertar = "Gral.SP_Cargos_Insertar";
        public static string Cargo_Actualizar = "Gral.SP_Cargos_Actualizar";
        public static string Cargo_Eliminar = "Gral.SP_Cargos_Eliminar";
        public static string Cargo_Detalles = "Gral.SP_Cargos_Detalles";
        #endregion

        #region Categoria
        public static string Categoria_Mostrar = "Gral.SP_Categorias_Mostrar";
        public static string Categoria_Insertar = "Gral.SP_Categorias_Insertar";
        public static string Categoria_Actualizar = "Gral.SP_Categorias_Actualizar";
        public static string Categoria_Eliminar = "Gral.SP_Categorias_Eliminar";
        public static string Categoria_Detalles = "Gral.SP_Categorias_Detalles";
        #endregion

        #region Cliente
        public static string Clientes_Mostrar = "Venta.SP_Clientes_Mostrar";
        public static string Clientes_Insertar = "Venta.SP_Clientes_Insertar";
        public static string Clientes_Actualizar = "Venta.SP_Clientes_Actualizar";
        public static string Clientes_Eliminar = "Venta.SP_Clientes_Eliminar";
        public static string Clientes_Detalles = "Venta.SP_Clientes_Detalles";
        #endregion

        #region Departamento
        public static string Departamento_Mostrar = "Gral.SP_Departamentos_Mostrar";
        public static string Departamento_Insertar = "Gral.SP_Departamentos_Insertar";
        public static string Departamento_Actualizar = "Gral.SP_Departamentos_Actualizar";
        public static string Departamento_Eliminar = "Gral.SP_Departamentos_Eliminar";
        public static string Departamento_Detalles = "Gral .SP_Departamentos_Detalles";
        #endregion

        #region Empleado
        public static string Empleado_Mostrar = "Supr.SP_Empleados_Mostrar";
        public static string Empleado_Insertar = "Supr.SP_Empleados_Insertar";
        public static string Empleado_Actualizar = "Supr.SP_Empleados_Actualizar";
        public static string Empleado_Eliminar = "Supr.SP_Empleados_Eliminar";
        public static string Empleado_Detalles = "Supr .SP_Empleados_Detalles";
        #endregion

        #region Estado Civil
        public static string EstadoCivil_Mostrar = "Gral.SP_EstadoCivil_Mostrar";
        public static string EstadoCivil_Insertar = "Gral.SP_EstadoCivil_Insertar";
        public static string EstadoCivil_Actualizar = "Gral.SP_EstadoCivil_Actualizar";
        public static string EstadoCivil_Eliminar = "Gral.SP_EstadoCivil_Eliminar";
        public static string EstadoCivil_Detalles = "Gral .SP_EstadoCivil_Detalles";
        #endregion
        
        #region Impuesto
        public static string Impuesto_Mostrar = "Gral.SP_Impuestos_Mostrar";
        public static string Impuesto_Insertar = "Gral.SP_Impuestos_Insertar";
        public static string Impuesto_Actualizar = "Gral.SP_Impuestos_Actualizar";
        public static string Impuesto_Eliminar = "Gral.SP_Impuestos_Eliminar";
        public static string Impuesto_Detalles = "Gral .SP_Impuestos_Detalles";
        #endregion

        #region Lote
        public static string Lote_Mostrar = "Supr.SP_Lotes_Mostrar";
        public static string Lote_Insertar = "Supr.SP_Lotes_Insertar";
        public static string Lote_Actualizar = "Supr.SP_Lotes_Actualizar";
        public static string Lote_Eliminar = "Supr.SP_Lotes_Eliminar";
        public static string Lote_Detalles = "Supr .SP_Lotes_Detalles";
        #endregion

        #region Municipio
        public static string Municipio_Mostrar = "Supr.SP_Lotes_Mostrar";
        public static string Municipio_Insertar = "Supr.SP_Lotes_Insertar";
        public static string Municipio_Actualizar = "Supr.SP_Lotes_Actualizar";
        public static string Municipio_Eliminar = "Supr.SP_Lotes_Eliminar";
        public static string Municipio_Detalles = "Supr .SP_Lotes_Detalles";
        #endregion

        #region Usuarios
        public static string Usuario_Mostrar = "Acce.SP_Usuarios_Mostrar";
        public static string Usuario_Insertar = "Acce.SP_Usuarios_Insertar";
        public static string Usuario_Actualizar = "Acce.SP_Usuarios_Actualizar";
        public static string Usuario_Eliminar = "Acce.SP_Usuarios_Eliminar";
        public static string Usuario_Detalles = "Acce.SP_Usuarios_Detalles";
        public static string UsuarioLogin = "[Acce].[SP_Usuario_Login]";
        #endregion

        #region Roles
        public static string Roles_Insertar = "Acces.SP_Roles_Insertar";
        public static string Roles_Actualizar = "Acces.SP_Roles_Actualizar";
        public static string Roles_Eliminar = "Acces.SP_Roles_Eliminar";
        public static string Roles_Detalles = "Acces.SP_Roles_Detalles";
        public static string Roles_Buscar = "Acces.SP_Roles_Buscar";

        public static string PantallasRoles_Insertar = "[Acces].[SP_PantallasPorRoles_Insertar]";
        public static string PantallasRoles_Eliminar = "[Acces].[SP_PantallasPorRoles_Eliminar]";
        public static string PantallasRoles_Mostrar = "[Acces].[SP_PantallasPorRoles_Mostrar]";
        public static string PantallasRoles_MostrarPorRol = "[Acces].[SP_PantallasPorRoles_PorRol]";
        #endregion
    }
}
