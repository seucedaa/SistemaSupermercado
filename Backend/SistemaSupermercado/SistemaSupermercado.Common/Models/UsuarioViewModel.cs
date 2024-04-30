using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaSupermercado.Common.Models
{
    public class UsuarioViewModel
    {

        public int Usuar_Id { get; set; }
        [Display(Name = "Correo")]
        public string Usuar_Correo { get; set; }
        [Display(Name = "Usuario")]
        public string Usuar_Usuario { get; set; }
        [Display(Name = "Contraseña")]
        public string Usuar_Contrasena { get; set; }
        public int Perso_Id { get; set; }
        public bool Perso_Tipo { get; set; }
        public int Roles_Id { get; set; }
        [Display(Name = "Administrador")]
        public bool Usuar_Admin { get; set; }
        public DateTime? Usuar_UltimaSesion { get; set; }
        [Display(Name = "Super puntos")]
        public int? Usuar_SuperPuntos { get; set; }
        public int Usuar_UsuarioCreacion { get; set; }
        public DateTime Usuar_FechaCreacion { get; set; }
        public int? Usuar_UsuarioModificacion { get; set; }
        public DateTime? Usuar_FechaModificacion { get; set; }
        public bool? Usuar_Estado { get; set; }

        [NotMapped]
        public string Usuaa_Id { get; set; }
        [NotMapped]
        public string Panta_Descripcion { get; set; }
    }
}
