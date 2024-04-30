using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaSupermercado.Common.Models
{
    public class EstadoCivilViewModel
    {
        public int Estad_Id { get; set; }
        public string Estad_Descripcion { get; set; }
        public int Estad_UsuarioCreacion { get; set; }
        public DateTime Estad_FechaCreacion { get; set; }
        public int? Estad_UsuarioModificacion { get; set; }
        public DateTime? Estad_FechaModificacion { get; set; }
        public bool? Estad_Estado { get; set; }
    }
}
