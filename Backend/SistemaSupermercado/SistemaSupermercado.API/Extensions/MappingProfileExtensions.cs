using AutoMapper;
using SistemaSupermercado.Common.Models;
using SistemaSupermercado.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SistemaSupermercado.API.Extensions
{
    public class MappingProfileExtensions : Profile
    {
        public MappingProfileExtensions()
        {
            CreateMap<UsuarioViewModel, tbUsuarios>().ReverseMap();
            CreateMap<CargoViewModel, tbCargos>().ReverseMap();
            CreateMap<RolViewModel, tbRoles>().ReverseMap();
            CreateMap<CategoriaViewModel, tbCargos>().ReverseMap();
            CreateMap<ClienteViewModel, tbClientes>().ReverseMap();
            CreateMap<DepartamentoViewModel, tbDepartamentos>().ReverseMap();
            CreateMap<EmpleadoViewModel, tbEmpleados>().ReverseMap();
            CreateMap<EstadoCivilViewModel, tbEstadosCiviles>().ReverseMap();
            CreateMap<ImpuestoViewModel, tbImpuestos>().ReverseMap();
            CreateMap<LoteViewModel, tbLotes>().ReverseMap();
            CreateMap<MunicipioViewModel, tbMunicipios>().ReverseMap();
            CreateMap<ProductoViewModel, tbProductos>().ReverseMap();
            CreateMap<PromocionViewModel, tbPromociones>().ReverseMap();
            CreateMap<ProveedorViewModel, tbProveedores>().ReverseMap();
            CreateMap<SubCategoriaViewModel, tbSubcategorias>().ReverseMap();
            CreateMap<SucursalViewModel, tbSucursales>().ReverseMap();
            CreateMap<VentasDetalleViewModel, tbVentasDetalle>().ReverseMap();
            CreateMap<tbVentasEncabezado, tbVentasEncabezado>().ReverseMap();
            CreateMap<PantallaporRolViewModel, tbPantallasPorRoles>().ReverseMap();

        }
    }
}
