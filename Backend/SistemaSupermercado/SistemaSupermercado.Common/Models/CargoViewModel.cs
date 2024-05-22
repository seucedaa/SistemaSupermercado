using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SistemaSupermercado.Common.Models
{
    public class CargoViewModel
    {
        public int Cargo_Id { get; set; }
        [Display(Name = "Cargo")]
        public string Cargo_Descripcion { get; set; }
        public int Cargo_UsuarioCreacion { get; set; }
        public DateTime Cargo_FechaCreacion { get; set; }
        public int? Cargo_UsuarioModificacion { get; set; }
        public DateTime? Cargo_FechaModificacion { get; set; }
        public bool? Cargo_Estado { get; set; }
        [NotMapped]
        public string UsuarioCreacion { get; set; }
        [NotMapped]
        public string UsuarioModificacion { get; set; }
    }
}
