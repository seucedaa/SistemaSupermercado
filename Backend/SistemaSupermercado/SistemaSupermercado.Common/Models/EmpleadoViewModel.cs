using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaSupermercado.Common.Models
{
    public class EmpleadoViewModel
    {
        public int Emple_Id { get; set; }
        public string Emple_Dni { get; set; }
        public string Emple_PrimerNombre { get; set; }
        public string Emple_SegundoNombre { get; set; }
        public string Emple_PrimerApellido { get; set; }
        public string Emple_SegundoApellido { get; set; }
        [NotMapped]
        public string Emple_NombreCompleto { get; set; }
        public string Emple_Sexo { get; set; }
        [NotMapped]
        public string Sexo { get; set; }
        public int Estad_Id { get; set; }

        [NotMapped]
        public string Estad_Descripcion { get; set; }
        public string Emple_Telefono { get; set; }
        public string Emple_Correo { get; set; }
        public string Munic_Id { get; set; }
        [NotMapped]
        public string Munic_Descripcion { get; set; }
        public string Emple_Direccion { get; set; }
        public int Cargo_Id { get; set; }
        [NotMapped]
        public string Cargo_Descripcion { get; set; }
        public int Sucur_Id { get; set; }
        [NotMapped]
        public string Sucur_Descripcion { get; set; }
        public int Emple_UsuarioCreacion { get; set; }
        public DateTime Emple_FechaCreacion { get; set; }
        public int? Emple_UsuarioModificacion { get; set; }
        public DateTime? Emple_FechaModificacion { get; set; }
        public bool? Emple_Estado { get; set; }
    }
}
