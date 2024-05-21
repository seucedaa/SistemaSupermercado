﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace SistemaSupermercado.Entities.Entities
{
    public partial class tbUsuarios
    {
        public tbUsuarios()
        {
            tbCargosCargo_UsuarioCreacionNavigation = new HashSet<tbCargos>();
            tbCargosCargo_UsuarioModificacionNavigation = new HashSet<tbCargos>();
            tbCategoriasCateg_UsuarioCreacionNavigation = new HashSet<tbCategorias>();
            tbCategoriasCateg_UsuarioModificacionNavigation = new HashSet<tbCategorias>();
            tbClientesClien_UsuarioCreacionNavigation = new HashSet<tbClientes>();
            tbClientesClien_UsuarioModificacionNavigation = new HashSet<tbClientes>();
            tbDepartamentosDepar_UsuarioCreacionNavigation = new HashSet<tbDepartamentos>();
            tbDepartamentosDepar_UsuarioModificacionNavigation = new HashSet<tbDepartamentos>();
            tbEmpleadosEmple_UsuarioCreacionNavigation = new HashSet<tbEmpleados>();
            tbEmpleadosEmple_UsuarioModificacionNavigation = new HashSet<tbEmpleados>();
            tbEstadosCivilesEstad_UsuarioCreacionNavigation = new HashSet<tbEstadosCiviles>();
            tbEstadosCivilesEstad_UsuarioModificacionNavigation = new HashSet<tbEstadosCiviles>();
            tbImpuestosImpue_UsuarioCreacionNavigation = new HashSet<tbImpuestos>();
            tbImpuestosImpue_UsuarioModificacionNavigation = new HashSet<tbImpuestos>();
            tbLotesLotes_UsuarioCreacionNavigation = new HashSet<tbLotes>();
            tbLotesLotes_UsuarioModificacionNavigation = new HashSet<tbLotes>();
            tbMunicipiosMunic_UsuarioCreacionNavigation = new HashSet<tbMunicipios>();
            tbMunicipiosMunic_UsuarioModificacionNavigation = new HashSet<tbMunicipios>();
            tbPantallasPanta_UsuarioCreacionNavigation = new HashSet<tbPantallas>();
            tbPantallasPanta_UsuarioModificacionNavigation = new HashSet<tbPantallas>();
            tbPantallasPorRolesPapro_UsuarioCreacionNavigation = new HashSet<tbPantallasPorRoles>();
            tbPantallasPorRolesPapro_UsuarioModificacionNavigation = new HashSet<tbPantallasPorRoles>();
            tbProductosProdu_UsuarioCreacionNavigation = new HashSet<tbProductos>();
            tbProductosProdu_UsuarioModificacionNavigation = new HashSet<tbProductos>();
            tbPromocionesPromo_UsuarioCreacionNavigation = new HashSet<tbPromociones>();
            tbPromocionesPromo_UsuarioModificacionNavigation = new HashSet<tbPromociones>();
            tbProveedoresProve_UsuarioCreacionNavigation = new HashSet<tbProveedores>();
            tbProveedoresProve_UsuarioModificacionNavigation = new HashSet<tbProveedores>();
            tbRolesRoles_UsuarioCreacionNavigation = new HashSet<tbRoles>();
            tbRolesRoles_UsuarioModificacionNavigation = new HashSet<tbRoles>();
            tbSubcategoriasSubca_UsuarioCreacionNavigation = new HashSet<tbSubcategorias>();
            tbSubcategoriasSubca_UsuarioModificacionNavigation = new HashSet<tbSubcategorias>();
            tbSucursalesSucur_UsuarioCreacionNavigation = new HashSet<tbSucursales>();
            tbSucursalesSucur_UsuarioModificacionNavigation = new HashSet<tbSucursales>();
            tbVentasDetalleVende_UsuarioCreacionNavigation = new HashSet<tbVentasDetalle>();
            tbVentasDetalleVende_UsuarioModificacionNavigation = new HashSet<tbVentasDetalle>();
            tbVentasEncabezadoUsuar = new HashSet<tbVentasEncabezado>();
            tbVentasEncabezadoVenen_UsuarioCreacionNavigation = new HashSet<tbVentasEncabezado>();
            tbVentasEncabezadoVenen_UsuarioModificacionNavigation = new HashSet<tbVentasEncabezado>();
        }

        public int Usuar_Id { get; set; }
        public string Usuar_Correo { get; set; }
        public string Usuar_Usuario { get; set; }
        public string Usuar_Contrasena { get; set; }
        public int Perso_Id { get; set; }
        [NotMapped]
        public string Perso_NombreCompleto { get; set; }
        public bool Perso_Tipo { get; set; }
        public int Roles_Id { get; set; }
        [NotMapped]
        public string Roles_Descripcion { get; set; }
        public bool Usuar_Admin { get; set; }
        [NotMapped]
        public int Sucur_Id { get; set; }
        [NotMapped]
        public string Administrador { get; set; }
        public DateTime? Usuar_UltimaSesion { get; set; }
        public int? Usuar_SuperPuntos { get; set; }
        public int Usuar_UsuarioCreacion { get; set; }
        public DateTime Usuar_FechaCreacion { get; set; }
        public int? Usuar_UsuarioModificacion { get; set; }
        public DateTime? Usuar_FechaModificacion { get; set; }
        public bool? Usuar_Estado { get; set; }
        [NotMapped]
        public string Panta_Descripcion { get; set; }
        [NotMapped]
        public string UsuarioCreacion { get; set; }
        [NotMapped]
        public string UsuarioModificacion { get; set; }

        public virtual ICollection<tbCargos> tbCargosCargo_UsuarioCreacionNavigation { get; set; }
        public virtual ICollection<tbCargos> tbCargosCargo_UsuarioModificacionNavigation { get; set; }
        public virtual ICollection<tbCategorias> tbCategoriasCateg_UsuarioCreacionNavigation { get; set; }
        public virtual ICollection<tbCategorias> tbCategoriasCateg_UsuarioModificacionNavigation { get; set; }
        public virtual ICollection<tbClientes> tbClientesClien_UsuarioCreacionNavigation { get; set; }
        public virtual ICollection<tbClientes> tbClientesClien_UsuarioModificacionNavigation { get; set; }
        public virtual ICollection<tbDepartamentos> tbDepartamentosDepar_UsuarioCreacionNavigation { get; set; }
        public virtual ICollection<tbDepartamentos> tbDepartamentosDepar_UsuarioModificacionNavigation { get; set; }
        public virtual ICollection<tbEmpleados> tbEmpleadosEmple_UsuarioCreacionNavigation { get; set; }
        public virtual ICollection<tbEmpleados> tbEmpleadosEmple_UsuarioModificacionNavigation { get; set; }
        public virtual ICollection<tbEstadosCiviles> tbEstadosCivilesEstad_UsuarioCreacionNavigation { get; set; }
        public virtual ICollection<tbEstadosCiviles> tbEstadosCivilesEstad_UsuarioModificacionNavigation { get; set; }
        public virtual ICollection<tbImpuestos> tbImpuestosImpue_UsuarioCreacionNavigation { get; set; }
        public virtual ICollection<tbImpuestos> tbImpuestosImpue_UsuarioModificacionNavigation { get; set; }
        public virtual ICollection<tbLotes> tbLotesLotes_UsuarioCreacionNavigation { get; set; }
        public virtual ICollection<tbLotes> tbLotesLotes_UsuarioModificacionNavigation { get; set; }
        public virtual ICollection<tbMunicipios> tbMunicipiosMunic_UsuarioCreacionNavigation { get; set; }
        public virtual ICollection<tbMunicipios> tbMunicipiosMunic_UsuarioModificacionNavigation { get; set; }
        public virtual ICollection<tbPantallas> tbPantallasPanta_UsuarioCreacionNavigation { get; set; }
        public virtual ICollection<tbPantallas> tbPantallasPanta_UsuarioModificacionNavigation { get; set; }
        public virtual ICollection<tbPantallasPorRoles> tbPantallasPorRolesPapro_UsuarioCreacionNavigation { get; set; }
        public virtual ICollection<tbPantallasPorRoles> tbPantallasPorRolesPapro_UsuarioModificacionNavigation { get; set; }
        public virtual ICollection<tbProductos> tbProductosProdu_UsuarioCreacionNavigation { get; set; }
        public virtual ICollection<tbProductos> tbProductosProdu_UsuarioModificacionNavigation { get; set; }
        public virtual ICollection<tbPromociones> tbPromocionesPromo_UsuarioCreacionNavigation { get; set; }
        public virtual ICollection<tbPromociones> tbPromocionesPromo_UsuarioModificacionNavigation { get; set; }
        public virtual ICollection<tbProveedores> tbProveedoresProve_UsuarioCreacionNavigation { get; set; }
        public virtual ICollection<tbProveedores> tbProveedoresProve_UsuarioModificacionNavigation { get; set; }
        public virtual ICollection<tbRoles> tbRolesRoles_UsuarioCreacionNavigation { get; set; }
        public virtual ICollection<tbRoles> tbRolesRoles_UsuarioModificacionNavigation { get; set; }
        public virtual ICollection<tbSubcategorias> tbSubcategoriasSubca_UsuarioCreacionNavigation { get; set; }
        public virtual ICollection<tbSubcategorias> tbSubcategoriasSubca_UsuarioModificacionNavigation { get; set; }
        public virtual ICollection<tbSucursales> tbSucursalesSucur_UsuarioCreacionNavigation { get; set; }
        public virtual ICollection<tbSucursales> tbSucursalesSucur_UsuarioModificacionNavigation { get; set; }
        public virtual ICollection<tbVentasDetalle> tbVentasDetalleVende_UsuarioCreacionNavigation { get; set; }
        public virtual ICollection<tbVentasDetalle> tbVentasDetalleVende_UsuarioModificacionNavigation { get; set; }
        public virtual ICollection<tbVentasEncabezado> tbVentasEncabezadoUsuar { get; set; }
        public virtual ICollection<tbVentasEncabezado> tbVentasEncabezadoVenen_UsuarioCreacionNavigation { get; set; }
        public virtual ICollection<tbVentasEncabezado> tbVentasEncabezadoVenen_UsuarioModificacionNavigation { get; set; }
    }
}