﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace SistemaSupermercado.Entities.Entities
{
    public partial class tbPantallasPorRoles
    {
        public int Papro_Id { get; set; }
        public int Panta_Id { get; set; }
        public int Roles_Id { get; set; }
        public string Papro_UsuarioCreacion { get; set; }
        public DateTime Papro_FechaCreacion { get; set; }
        public string Papro_UsuarioModificacion { get; set; }
        public DateTime? Papro_FechaModificacion { get; set; }
        public bool? Papro_Estado { get; set; }

        public virtual tbPantallas Panta { get; set; }
        public virtual tbUsuarios Papro_UsuarioCreacionNavigation { get; set; }
        public virtual tbUsuarios Papro_UsuarioModificacionNavigation { get; set; }
        public virtual tbRoles Roles { get; set; }
    }
}