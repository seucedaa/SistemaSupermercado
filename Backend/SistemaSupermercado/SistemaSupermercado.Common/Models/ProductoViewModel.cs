using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaSupermercado.Common.Models
{
    public class ProductoViewModel
    {
        public int Produ_Id { get; set; }
        public string Produ_Descripcion { get; set; }
        public int Produ_Existencia { get; set; }
        public decimal Produ_PrecioCompra { get; set; }
        public decimal Produ_PrecioVenta { get; set; }
        public int Impue_Id { get; set; }
        [NotMapped]
        public string Impue_Descripcion { get; set; }
        public int Subca_Id { get; set; }
        [NotMapped]
        public string Subca_Descipcion { get; set; }
        public int Prove_Id { get; set; }
        [NotMapped]
        public string Prove_Marca { get; set; }
        public int Produ_UsuarioCreacion { get; set; }
        public DateTime Produ_FechaCreacion { get; set; }
        public int? Produ_UsuarioModificacion { get; set; }
        public DateTime? Produ_FechaModificacion { get; set; }
        public bool? Produ_Estado { get; set; }
    }
}
