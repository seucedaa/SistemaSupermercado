using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaSupermercado.Common.Models
{
    public class PantallaViewModel
    {
        public int Panta_Id { get; set; }
        public string Panta_Descripcion { get; set; }
        public int Panta_Esquema { get; set; }
        public int Panta_UsuarioCreacion { get; set; }
        public DateTime Panta_FechaCreacion { get; set; }
        public int? Panta_UsuarioModificacion { get; set; }
        public DateTime? Panta_FechaModificacion { get; set; }
        public bool? Panta_Estado { get; set; }
    }
}
