using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SistemaSupermercado.Common.Models
{
    public class RolViewModel
    {
        [NotMapped]
        public string Usua_Id { get; set; }

        [Display(Name = "ID")]
        public int Roles_Id { get; set; }


        [Display(Name = "Rol")]
        public string Roles_Descripcion { get; set; }
        public string Roles_UsuarioCreacion { get; set; }
        public DateTime? Roles_FechaCreacion { get; set; }
        public string Roles_UsuarioModificacion { get; set; }
        public DateTime? Roles_FechaModificacion { get; set; }
        public List<int> Pantallas { get; set; }
        public List<int> PantallasD { get; set; }
    }
}
