﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace SistemaSupermercado.Entities.Entities
{
    public partial class tbProductos
    {
        public tbProductos()
        {
            tbLotes = new HashSet<tbLotes>();
            tbPromociones = new HashSet<tbPromociones>();
        }

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
        public string Subca_Descripcion { get; set; }
        public int Prove_Id { get; set; }
        [NotMapped]
        public string Prove_Marca { get; set; }
        public int Produ_UsuarioCreacion { get; set; }
        public DateTime Produ_FechaCreacion { get; set; }
        public int? Produ_UsuarioModificacion { get; set; }
        public DateTime? Produ_FechaModificacion { get; set; }
        public bool? Produ_Estado { get; set; }

        public virtual tbImpuestos Impue { get; set; }
        public virtual tbUsuarios Produ_UsuarioCreacionNavigation { get; set; }
        public virtual tbUsuarios Produ_UsuarioModificacionNavigation { get; set; }
        public virtual tbProveedores Prove { get; set; }
        public virtual tbSubcategorias Subca { get; set; }
        public virtual ICollection<tbLotes> tbLotes { get; set; }
        public virtual ICollection<tbPromociones> tbPromociones { get; set; }
    }
}