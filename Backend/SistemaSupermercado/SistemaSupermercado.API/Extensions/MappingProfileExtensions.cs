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

        }
    }
}
