using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaSupermercado.Common.Models
{
    public class SubCategoriaViewModel
    {
        public int Subca_Id { get; set; }
        public string Subca_Descripcion { get; set; }
        public int Categ_Id { get; set; }
        [NotMapped]
        public string Categ_Descripcion { get; set; }
        public int Subca_UsuarioCreacion { get; set; }
        public DateTime Subca_FechaCreacion { get; set; }
        public int? Subca_UsuarioModificacion { get; set; }
        public DateTime? Subca_FechaModificacion { get; set; }
        public bool? Subca_Estado { get; set; }
    }
}
