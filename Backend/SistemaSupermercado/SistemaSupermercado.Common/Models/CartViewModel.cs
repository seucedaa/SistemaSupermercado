using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaSupermercado.Common.Models
{
    public class CartViewModel
    {
        public int? Sucur_Id { get; set; }
        public string? Sucur_Descripcion { get; set; }
        public int? Lotes_Id { get; set; }
        public int? Lotes_Cantidad { get; set; }
        public int? Produ_Id { get; set; }
        public string? Produ_Descripcion { get; set; }
        public decimal? Produ_PrecioVenta { get; set; }
        public int? Produ_Existencia { get; set; }
        public int? Impue_Id { get; set; }
        public decimal? Impue_Descripcion { get; set; }
        public int? Subca_Id { get; set; }
        public string? Subca_Descripcion { get; set; }
        public int? Categ_Id { get; set; }
        public string? Categ_Descripcion { get; set; }
        public int? Venen_Id { get; set; }
        public int? Vende_Cantidad { get; set; }
        public DateTime? Vende_FechaCreacion { get; set; }

        public int? Clien_Id { get; set; }
        public string? Clien_Dni { get; set; }
        public string? Nombre { get; set; }
        public int? Tipos_Id { get; set; }
    }
}
