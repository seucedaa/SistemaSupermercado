using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaSupermercado.Common.Models
{
    public class ProveedorViewModel
    {
        public int Prove_Id { get; set; }
        public string Prove_Marca { get; set; }
        public string Prove_ContactoPrimerNombre { get; set; }
        public string Prove_ContactoSegundoNombre { get; set; }
        public string Prove_ContactoPrimerApellido { get; set; }
        public string Prove_ContactoSegundoApellido { get; set; }
        public string Munic_Id { get; set; }
        [NotMapped]
        public string Munic_Descripcion { get; set; }
        public string Prove_Direccion { get; set; }
        public string Prove_Telefono { get; set; }
        public string Prove_Correo { get; set; }
        public string Prove_Notas { get; set; }
        public int Prove_UsuarioCreacion { get; set; }
        public DateTime Prove_FechaCreacion { get; set; }
        public int? Prove_UsuarioModificacion { get; set; }
        public DateTime? Prove_FechaModificacion { get; set; }
        public bool? Prove_Estado { get; set; }
    }
}
