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
