using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaSupermercado.Common.Models
{
    public class VentasEncabezadoViewModel
    {
        public int Venen_Id { get; set; }
        public int Sucur_Id { get; set; }
        [NotMapped]
        public string Sucur_Descripcion { get; set; }
        public int Usuar_Id { get; set; }
        [NotMapped]
        public string Usuar_Usuario { get; set; }
        [NotMapped]
        public int Totalventas { get; set; }
        public int Venen_UsuarioCreacion { get; set; }
        public DateTime Venen_FechaCreacion { get; set; }
        public int? Venen_UsuarioModificacion { get; set; }
        public DateTime? Venen_FechaModificacion { get; set; }
        public bool? Venen_Estado { get; set; }
    }
}
