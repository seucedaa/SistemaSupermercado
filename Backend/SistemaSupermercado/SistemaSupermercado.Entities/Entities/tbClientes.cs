﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace SistemaSupermercado.Entities.Entities
{
    public partial class tbClientes
    {
        [NotMapped]
        public string Usuar_Usuario { get; set; }

        [NotMapped]
        public string Usuar_Contrasena { get; set; }
        public int Clien_Id { get; set; }
        [NotMapped]
        public int Totalclientes { get; set; }
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
        [NotMapped]
        public string Nombre { get; set; }
        public DateTime? Clien_FechaModificacion { get; set; }
        public bool? Clien_Estado { get; set; }

        public virtual tbUsuarios Clien_UsuarioCreacionNavigation { get; set; }
        public virtual tbUsuarios Clien_UsuarioModificacionNavigation { get; set; }
        public virtual tbEstadosCiviles Estad { get; set; }
        public virtual tbMunicipios Munic { get; set; }
    }
}