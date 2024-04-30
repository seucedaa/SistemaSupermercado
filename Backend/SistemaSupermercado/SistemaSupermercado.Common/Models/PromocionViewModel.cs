using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaSupermercado.Common.Models
{
    public class PromocionViewModel
    {
        public int Promo_Id { get; set; }
        public string Prom_Descripcion { get; set; }
        public int Produ_Id { get; set; }
        [NotMapped]
        public string Produ_Descripcion { get; set; }
        public bool Promo_TipoDisminucion { get; set; }
        public decimal Promo_Disminucion { get; set; }
        public int Promo_PuntosRequeridos { get; set; }
        public int Promo_UsuarioCreacion { get; set; }
        public DateTime Promo_FechaCreacion { get; set; }
        public int? Promo_UsuarioModificacion { get; set; }
        public DateTime? Promo_FechaModificacion { get; set; }
        public bool? Promo_Estado { get; set; }
    }
}
