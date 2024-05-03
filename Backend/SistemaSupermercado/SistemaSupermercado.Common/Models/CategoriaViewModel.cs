using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaSupermercado.Common.Models
{
    public class CategoriaViewModel
    {
        public int Categ_Id { get; set; }
        [Display(Name = "Categoria")]
        public string Categ_Descripcion { get; set; }
        [NotMapped]
        public string Categoria { get; set; }
        [NotMapped]
        public string TotalVentas { get; set; }
        public int Categ_UsuarioCreacion { get; set; }
        public DateTime Categ_FechaCreacion { get; set; }
        public int? Categ_UsuarioModificacion { get; set; }
        public DateTime? Categ_FechaModificacion { get; set; }
        public bool? Categ_Estado { get; set; }
    }
}
