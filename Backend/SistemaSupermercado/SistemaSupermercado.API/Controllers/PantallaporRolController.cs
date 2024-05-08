using AutoMapper;
using SistemaSupermercado.BusinessLogic.Servicios;
using SistemaSupermercado.Common.Models;
using SistemaSupermercado.Entities.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SistemaSupermercado.API.Controllers
{
    [ApiController]
    [Route("Api/[controller]")]
    public class PantallaporRolController : Controller
    {
        private readonly AccesoServicios _accesoServicios;
        private readonly IMapper _mapper;

        public PantallaporRolController(AccesoServicios accesoServicios, IMapper mapper)
        {
            _mapper = mapper;
            _accesoServicios = accesoServicios;
        }


        [HttpGet("PantdelRol/{id}")]
        public IActionResult PantdelRol(int id)
        {
            var list = _accesoServicios.ListPantdelRol(id);
            return Ok(list);
        }
    }
}
