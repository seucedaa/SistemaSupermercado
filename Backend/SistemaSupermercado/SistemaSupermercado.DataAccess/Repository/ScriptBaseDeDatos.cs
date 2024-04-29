using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestionGastos.DataAccess.Repository
{
    public class ScriptBaseDeDatos
    {
        #region Usuarios
        public static string Usuario_Insertar = "Acc.SP_Usuarios_Insertar";
        public static string Usuario_Mostrar = "Acc.SP_Usuarios_Seleccionar";

        public static string Usuario_ObtenerCorreo = "Acc.SP_Usuarios_ObtenerCorreo";
        public static string Usuario_InsertarCodigo = "[Acc].[SP_Usuarios_InsertarValidar]";



        public static string Usuario_Actualizar = "Acc.SP_Usuarios_Actualizar";
        public static string Usuario_ReestableceR = "[Acc].[SP_Usuarios_Reestablecer]";
        public static string Usuario_Eliminar = "Acc.SP_Usuarios_Eliminar";
        public static string Usuario_Detalles = "Acc.SP_Usuarios_Detalles";
        public static string UsuarioLogin = "[Acc].[SP_UsuariosValidarInicioSesion]";

        public static string Persona_Insertar = "[Grl].[SP_Personas_Insertar]";

        #endregion

        #region Roles
        public static string Roles_Insertar = "Accs.SP_Roles_Insertar";
        public static string Roles_Actualizar = "Accs.SP_Roles_Actualizar";
        public static string Roles_Eliminar = "Accs.SP_Roles_Eliminar";
        public static string Roles_Detalles = "Accs.SP_Roles_Detalles";
        public static string Roles_Buscar = "Accs.SP_Roles_Buscar";

        public static string PantallasRoles_Insertar = "[Accs].[SP_PantallasPorRoles_Insertar]";
        public static string PantallasRoles_Eliminar = "[Accs].[SP_PantallasPorRoles_Eliminar]";
        public static string PantallasRoles_Mostrar = "[Accs].[SP_PantallasPorRoles_Mostrar]";
        public static string PantallasRoles_MostrarPorRol = "[Accs].[SP_PantallasPorRoles_PorRol]";
        #endregion
    }
}
