﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace SistemaSupermercado.Entities.Entities
{
    public partial class tbMunicipios
    {
        public tbMunicipios()
        {
            tbClientes = new HashSet<tbClientes>();
            tbEmpleados = new HashSet<tbEmpleados>();
            tbProveedores = new HashSet<tbProveedores>();
            tbSucursales = new HashSet<tbSucursales>();
        }

        public string Munic_Id { get; set; }
        public string Munic_Descripcion { get; set; }
        public string Depar_Id { get; set; }
        [NotMapped]
        public string Depar_Descripcion { get; set; }
        public int Munic_UsuarioCreacion { get; set; }
        public DateTime Munic_FechaCreacion { get; set; }
        public int? Munic_UsuarioModificacion { get; set; }
        public DateTime? Munic_FechaModificacion { get; set; }
        public bool? Munic_Estado { get; set; }
        [NotMapped]
        public string UsuarioCreacion { get; set; }
        [NotMapped]
        public string UsuarioModificacion { get; set; }

        public virtual tbDepartamentos Depar { get; set; }
        public virtual tbUsuarios Munic_UsuarioCreacionNavigation { get; set; }
        public virtual tbUsuarios Munic_UsuarioModificacionNavigation { get; set; }
        public virtual ICollection<tbClientes> tbClientes { get; set; }
        public virtual ICollection<tbEmpleados> tbEmpleados { get; set; }
        public virtual ICollection<tbProveedores> tbProveedores { get; set; }
        public virtual ICollection<tbSucursales> tbSucursales { get; set; }
    }
}