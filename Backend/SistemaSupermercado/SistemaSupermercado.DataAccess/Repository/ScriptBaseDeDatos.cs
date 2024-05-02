using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaSupermercado.DataAcceess.Repository
{
    public class ScriptBaseDeDatos
    {
        #region Acceo
        #region Usuarios
        public static string Usuario_Lista = "Acce.SP_Usuario_Lista";
        public static string Usuario_Insertar = "Acce.SP_Usuario_Insertar";
        public static string Usuario_Modificar = "Acce.SP_Usuario_Modificar";
        public static string Usuario_Desactivar = "Acce.SP_Usuario_Desactivar";
        public static string Usuario_Buscar = "Acce.SP_Usuario_Buscar";
        public static string Usuario_Login = "Acce.SP_Usuario_Login";
        public static string Usuario_ReestablecerContrasena = "Acce.SP_Usuario_ReestablecerContrasena";
        public static string Usuario_CambiarContrasena = "Acce.SP_Usuario_CambiarContrasena";
        #endregion

        #region Roles
        public static string Rol_Insertar = "Acce.SP_Rol_Insertar";
        public static string Rol_Modificar = "Acce.SP_Rol_Modificar";
        public static string Rol_Eliminar = "Acce.SP_Rol_Desactivar";
        public static string Rol_Buscar = "Acce.SP_Rol_Buscar";
        public static string Rol_Buscarr = "[Acce].[SP_Rol_Buscarr]";
        public static string Rol_Lista = "Acce.SP_Rol_Lista";

        public static string PantallasRoles_Insertar = "[Acce].[SP_PantallaPorRol_Insertar]";
        public static string PantallasRoles_Eliminar = "[Acce].[SP_PantallaPorRol_Desactivar]";
        public static string PantallasRoles_Lista = "[Acce].[SP_PantallaPorRol_Lista]";
        public static string PantallasRoles_ListaPorRol = "[Acce].[SP_PantallaPorRol_PorRol]";
        #endregion
        #endregion

        #region General
        #region Cargo
        public static string Cargo_Lista = "Gral.SP_Cargo_Lista";
            public static string Cargo_Insertar = "Gral.SP_Cargo_Insertar";
            public static string Cargo_Modificar = "Gral.SP_Cargo_Modificar";
            public static string Cargo_Eliminar = "Gral.SP_Cargo_Eliminar";
            public static string Cargo_Buscar = "Gral.SP_Cargo_Buscar";
        #endregion

        #region Categoria
        public static string Categoria_Lista = "Gral.SP_Categoria_Lista";
        public static string Categoria_Insertar = "Gral.SP_Categoria_Insertar";
        public static string Categoria_Modificar = "Gral.SP_Categoria_Modificar";
        public static string Categoria_Eliminar = "Gral.SP_Categoria_Eliminar";
        public static string Categoria_Buscar = "Gral.SP_Categoria_Buscar";
        #endregion

        #region Subcategoria
        public static string Subcategoria_Lista = "Gral.SP_Subcategoria_Lista";
        public static string Subcategoria_Insertar = "Gral.SP_Subcategoria_Insertar";
        public static string Subcategoria_Modificar = "Gral.SP_Subcategoria_Modificar";
        public static string Subcategoria_Eliminar = "Gral.SP_Subcategoria_Eliminar";
        public static string Subcategoria_Buscar = "Gral.SP_Subcategoria_Buscar";
        public static string Subcategoria_DropDownList = "Gral.SP_Subcategoria_DropDownList";
        #endregion

        #region Departamento
        public static string Departamento_Lista = "Gral.SP_Departamento_Lista";
        public static string Departamento_Insertar = "Gral.SP_Departamento_Insertar";
        public static string Departamento_Modificar = "Gral.SP_Departamento_Modificar";
        public static string Departamento_Eliminar = "Gral.SP_Departamento_Eliminar";
        public static string Departamento_Buscar = "Gral.SP_Departamento_Buscar";
        #endregion

        #region Estado Civil
        public static string EstadoCivil_Lista = "Gral.SP_EstadoCivil_Lista";
        public static string EstadoCivil_Insertar = "Gral.SP_EstadoCivil_Insertar";
        public static string EstadoCivil_Modificar = "Gral.SP_EstadoCivil_Modificar";
        public static string EstadoCivil_Eliminar = "Gral.SP_EstadoCivil_Eliminar";
        public static string EstadoCivil_Buscar = "Gral.SP_EstadoCivil_Buscar";
        #endregion

        #region Impuesto
        public static string Impuesto_Lista = "Gral.SP_Impuesto_Lista";
        public static string Impuesto_Insertar = "Gral.SP_Impuesto_Insertar";
        public static string Impuesto_Modificar = "Gral.SP_Impuesto_Modificar";
        public static string Impuesto_Desactivar = "Gral.SP_Impuesto_Desactivar";
        public static string Impuesto_Buscar = "Gral.SP_Impuesto_Buscar";
        #endregion

        #region Municipio
        public static string Municipio_Lista = "Gral.SP_Municipio_Lista";
        public static string Municipio_Insertar = "Gral.SP_Municipio_Insertar";
        public static string Municipio_Modificar = "Gral.SP_Municipio_Modificar";
        public static string Municipio_Eliminar = "Gral.SP_Municipio_Eliminar";
        public static string Municipio_Buscar = "Gral.SP_Municipio_Buscar";
        public static string Municipio_DropDownList = "Gral.SP_Municipio_DropDownList";
        #endregion
        #endregion

        #region Super
        #region Empleado
        public static string Empleado_Lista = "Supr.SP_Empleado_Lista";
        public static string Empleado_Insertar = "Supr.SP_Empleado_Insertar";
        public static string Empleado_Modificar = "Supr.SP_Empleado_Modificar";
        public static string Empleado_Eliminar = "Supr.SP_Empleado_Desactivar";
        public static string Empleado_Buscar = "Supr.SP_Empleado_Buscar";
        #endregion

        #region Lote
        public static string Lote_Lista = "Supr.SP_Lote_Lista";
        public static string Lote_Insertar = "Supr.SP_Lote_Insertar";
        public static string Lote_Modificar = "Supr.SP_Lote_Modificar";
        public static string Lote_Desactivar = "Supr.SP_Lote_Desactivar";
        public static string Lote_Buscar = "Supr.SP_Lote_Buscar";
        #endregion

        #region Producto
        public static string Producto_Lista = "Supr.SP_Producto_Lista";
        public static string Producto_Insertar = "Supr.SP_Producto_Insertar";
        public static string Producto_Modificar = "Supr.SP_Producto_Modificar";
        public static string Producto_Desactivar = "Supr.SP_Producto_Desactivar";
        public static string Producto_Buscar = "Supr.SP_Producto_Buscar";
        #endregion

        #region Promocion
        public static string Promocion_Lista = "Supr.SP_Promocion_Lista";
        public static string Promocion_Insertar = "Supr.SP_Promocion_Insertar";
        public static string Promocion_Modificar = "Supr.SP_Promocion_Modificar";
        public static string Promocion_Desactivar = "Supr.SP_Promocion_Desactivar";
        public static string Promocion_Buscar = "Supr.SP_Promocion_Buscar";
        #endregion

        #region Proveedor
        public static string Proveedor_Lista = "Supr.SP_Proveedor_Lista";
        public static string Proveedor_Insertar = "Supr.SP_Proveedor_Insertar";
        public static string Proveedor_Modificar = "Supr.SP_Proveedor_Modificar";
        public static string Proveedor_Desactivar = "Supr.SP_Proveedor_Desactivar";
        public static string Proveedor_Buscar = "Supr.SP_Proveedor_Buscar";
        #endregion

        #region Sucursal
        public static string Sucursal_Lista = "Supr.SP_Sucursal_Lista";
        public static string Sucursal_Insertar = "Supr.SP_Sucursal_Insertar";
        public static string Sucursal_Modificar = "Supr.SP_Sucursal_Modificar";
        public static string Sucursal_Desactivar = "Supr.SP_Sucursal_Desactivar";
        public static string Sucursal_Buscar = "Supr.SP_Sucursal_Buscar";
        #endregion
        #endregion

        #region Venta
        #region Cliente
        public static string Cliente_Lista = "Venta.SP_Cliente_Lista";
        public static string Cliente_Insertar = "Venta.SP_Cliente_Insertar";
        public static string Cliente_Modificar = "Venta.SP_Cliente_Modificar";
        public static string Cliente_Desactivar = "Venta.SP_Cliente_Desactivar";
        public static string Cliente_Buscar = "Venta.SP_Cliente_Buscar";
        public static string Cliente_Total = "Venta.SP_Clientes_Total";
        #endregion

        #region VentaEncabezado
        public static string VentaEncabezado_Lista = "Venta.SP_VentaEncabezado_Lista";
        public static string VentaEncabezado_Insertar = "Venta.SP_VentaEncabezado_Insertar";
        public static string VentaEncabezado_Modificar = "Venta.SP_VentaEncabezado_Modificar";
        public static string VentaEncabezado_Desactivar = "Venta.SP_VentaEncabezado_Desactivar";
        public static string VentaEncabezado_Buscar = "Venta.SP_VentaEncabezado_Buscar";
        public static string Venta_totalventas = "[Venta].[SP_Ventas_Total]";
        #endregion

        #region VentaDetalle
        public static string VentaDetalle_Lista = "Venta.SP_VentaDetalle_Lista";
        public static string VentaDetalle_Insertar = "Venta.SP_VentaDetalle_Insertar";
        public static string VentaDetalle_Modificar = "Venta.SP_VentaDetalle_Modificar";
        public static string VentaDetalle_Desactivar = "Venta.SP_VentaDetalle_Desactivar";
        public static string VentaDetalle_Buscar = "Venta.SP_VentaDetalle_Buscar";
        #endregion
        #endregion




















    }
}
