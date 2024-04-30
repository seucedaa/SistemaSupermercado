using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaSupermercado.Common.Models
{
    public class ImpuestoViewModel
    {
        public int Impue_Id { get; set; }
        public decimal Impue_Descripcion { get; set; }
        public int Impue_UsuarioCreacion { get; set; }
        public DateTime Impue_FechaCreacion { get; set; }
        public int? Impue_UsuarioModificacion { get; set; }
        public DateTime? Impue_FechaModificacion { get; set; }
        public bool? Impue_Estado { get; set; }
    }
}
