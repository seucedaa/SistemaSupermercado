﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace SistemaSupermercado.Entities.Entities
{
    public partial class tbPromociones
    {
        public int Promo_Id { get; set; }
        public string Prom_Descripcion { get; set; }
        public int Produ_Id { get; set; }
        public bool Promo_TipoDisminucion { get; set; }
        public decimal Promo_Disminucion { get; set; }
        public int Promo_PuntosRequeridos { get; set; }
        public int Promo_UsuarioCreacion { get; set; }
        public DateTime Promo_FechaCreacion { get; set; }
        public int? Promo_UsuarioModificacion { get; set; }
        public DateTime? Promo_FechaModificacion { get; set; }
        public bool? Promo_Estado { get; set; }

        public virtual tbProductos Produ { get; set; }
        public virtual tbUsuarios Promo_UsuarioCreacionNavigation { get; set; }
        public virtual tbUsuarios Promo_UsuarioModificacionNavigation { get; set; }
    }
}