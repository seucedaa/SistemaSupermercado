﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace SistemaSupermercado.Entities.Entities
{
    public partial class tbVentasEncabezado
    {
        public tbVentasEncabezado()
        {
            tbVentasDetalle = new HashSet<tbVentasDetalle>();
        }

        public int Venen_Id { get; set; }
        public int Sucur_Id { get; set; }
        [NotMapped]
        public string Sucur_Descripcion { get; set; }
        public int Usuar_Id { get; set; }
        [NotMapped]
        public string Usuar_Usuario { get; set; }
        public int Venen_UsuarioCreacion { get; set; }
        public DateTime Venen_FechaCreacion { get; set; }
        public int? Venen_UsuarioModificacion { get; set; }
        public DateTime? Venen_FechaModificacion { get; set; }
        public bool? Venen_Estado { get; set; }

        public virtual tbSucursales Sucur { get; set; }
        public virtual tbUsuarios Usuar { get; set; }
        public virtual tbUsuarios Venen_UsuarioCreacionNavigation { get; set; }
        public virtual tbUsuarios Venen_UsuarioModificacionNavigation { get; set; }
        public virtual ICollection<tbVentasDetalle> tbVentasDetalle { get; set; }
    }
}