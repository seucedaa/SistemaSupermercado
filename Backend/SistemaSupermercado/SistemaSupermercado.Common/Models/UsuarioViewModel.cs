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

        public int Usua_Id { get; set; }
        public string Usua_Usuario { get; set; }
        public string Usua_Contraseña { get; set; }
        public int? Role_Id { get; set; }

        [NotMapped]
        public string Role_Descripcion { get; set; }
        public int Usua_UsuarioCreacion { get; set; }
        public DateTime? Usua_FechaCreacion { get; set; }
        public int Usua_UsuarioModificacion { get; set; }
        public DateTime? Usua_FechaModificacion { get; set; }
        public bool? Usua_Estado { get; set; }
        public int? Perso_Id { get; set; }

        [NotMapped]
        public string Usuaa_Id { get; set; }
        [NotMapped]
        public string Pant_Descripcion { get; set; }

        public string Usua_VerificarCorreo { get; set; }

        [NotMapped]
        public string Perso_Nombre { get; set; }

        [Display(Name = "Correo")]
        [NotMapped]
        public string Perso_Correo { get; set; }

        [NotMapped]
        public string Perso_Apellido { get; set; }
        [Display(Name = "Administrador")]
        public bool Usua_EsAdmin { get; set; }

        [NotMapped]
        public int Regi_Id { get; set; }
    }
}
