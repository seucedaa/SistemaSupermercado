﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SistemaSupermercado.Entities.Entities;

namespace SistemaSupermercado.Common.Models
{
    public class RolViewModel
    {
        [NotMapped]
        public string Usua_Id { get; set; }

        [Display(Name = "ID")]
        public int Roles_Id { get; set; }


        [Display(Name = "Rol")]
        public string Roles_Descripcion { get; set; }
        [NotMapped]
        public int Panta_Id { get; set; }
        [NotMapped]
        public string Panta_Descripcion { get; set; }
       
        public int Roles_UsuarioCreacion { get; set; }
        public DateTime? Roles_FechaCreacion { get; set; }
        public int Roles_UsuarioModificacion { get; set; }
        public DateTime? Roles_FechaModificacion { get; set; }
        public List<int> Pantallas { get; set; }
        public List<int> PantallasD { get; set; }

        [NotMapped]
        public string UsuarioCreacion { get; set; }

        [NotMapped]
        public string UsuarioModificacion { get; set; }

        [NotMapped]
        public List<tbPantallas> pantallas { get; set; }

        [NotMapped]
        public List<int> PantallasID { get; set; }
    }
}
