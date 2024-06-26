﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace SistemaSupermercado.Entities.Entities
{
    public partial class tbEmpleados
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
        [NotMapped]
        public int deparid { get; set; }
        [NotMapped]
        public string depardescrip { get; set; }
        public string Emple_Direccion { get; set; }
        public int Cargo_Id { get; set; }
        [NotMapped]
        public string Cargo_Descripcion { get; set; }
        public int Sucur_Id { get; set; }
        [NotMapped]
        public string Sucur_Descripcion { get; set; }
        [NotMapped]
        public string Nombre { get; set; }
        public int Emple_UsuarioCreacion { get; set; }
        public DateTime Emple_FechaCreacion { get; set; }
        public int? Emple_UsuarioModificacion { get; set; }
        public DateTime? Emple_FechaModificacion { get; set; }
        public bool? Emple_Estado { get; set; }
        [NotMapped]
        public string UsuarioCreacion { get; set; }
        [NotMapped]
        public string UsuarioModificacion { get; set; }

        public virtual tbCargos Cargo { get; set; }
        public virtual tbUsuarios Emple_UsuarioCreacionNavigation { get; set; }
        public virtual tbUsuarios Emple_UsuarioModificacionNavigation { get; set; }
        public virtual tbEstadosCiviles Estad { get; set; }
        public virtual tbMunicipios Munic { get; set; }
        public virtual tbSucursales Sucur { get; set; }
    }
}