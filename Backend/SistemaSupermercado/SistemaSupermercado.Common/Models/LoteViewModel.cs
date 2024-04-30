using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaSupermercado.Common.Models
{
    public class LoteViewModel
    {
        public int Lotes_Id { get; set; }
        public DateTime Lotes_FechaVencimiento { get; set; }
        public int Produ_Id { get; set; }
        [NotMapped]
        public string Produ_Descripcion { get; set; }
        public int Lotes_Cantidad { get; set; }
        public int Sucur_Id { get; set; }
        [NotMapped]
        public string Sucur_Descripcion { get; set; }
        public int Lotes_UsuarioCreacion { get; set; }
        public DateTime Lotes_FechaCreacion { get; set; }
        public int? Lotes_UsuarioModificacion { get; set; }
        public DateTime? Lotes_FechaModificacion { get; set; }
        public bool? Lotes_Estado { get; set; }
    }
}
