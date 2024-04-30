using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaSupermercado.Common.Models
{
    public class VentasDetalleViewModel
    {
        public int Vende_Id { get; set; }
        public int Venen_Id { get; set; }
        public int Lotes_Id { get; set; }
        public int Vende_Cantidad { get; set; }
        public int Vende_UsuarioCreacion { get; set; }
        public DateTime Vende_FechaCreacion { get; set; }
        public int? Vende_UsuarioModificacion { get; set; }
        public DateTime? Vende_FechaModificacion { get; set; }
        public bool? Vende_Estado { get; set; }
    }
}
