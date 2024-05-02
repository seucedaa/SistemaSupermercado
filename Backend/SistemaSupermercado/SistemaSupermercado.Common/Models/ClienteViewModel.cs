using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaSupermercado.Common.Models
{
    public class ClienteViewModel
    {
        [NotMapped]
        public string Usuar_Usuario { get; set; }

        [NotMapped]
        public string Usuar_Contrasena { get; set; }
        public int Clien_Id { get; set; }
        public string Clien_Dni { get; set; }
        public string Clien_PrimerNombre { get; set; }
        public string Clien_SegundoNombre { get; set; }
        public string Clien_PrimerApellido { get; set; }
        public string Clien_SegundoApellido { get; set; }
        [NotMapped]
        public string Clien_NombreCompleto { get; set; }
        public string Clien_Sexo { get; set; }
        [NotMapped]
        public string Sexo { get; set; }
        public int? Estad_Id { get; set; }
        [NotMapped]
        public string Estad_Descripcion { get; set; }
        public string Clien_Telefono { get; set; }
        public string Munic_Id { get; set; }
        [NotMapped]
        public string Munic_Descripcion { get; set; }
        public string Clien_Direccion { get; set; }
        public int Clien_UsuarioCreacion { get; set; }
        public DateTime Clien_FechaCreacion { get; set; }
        public int? Clien_UsuarioModificacion { get; set; }
        public DateTime? Clien_FechaModificacion { get; set; }
        public bool? Clien_Estado { get; set; }
    }
}
