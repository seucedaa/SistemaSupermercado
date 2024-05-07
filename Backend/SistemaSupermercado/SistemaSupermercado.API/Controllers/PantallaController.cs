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
    public class PantallaController : Controller
    {
        private readonly AccesoServicios _accesoServicios;
        private readonly IMapper _mapper;

        public PantallaController(AccesoServicios accesoServicios, IMapper mapper)
        {
            _mapper = mapper;
            _accesoServicios = accesoServicios;
        }

        [HttpGet("List")]
        public IActionResult List()
        {
            var list = _accesoServicios.ListarPant();
            return Ok(list);
        }

        [HttpGet("ListPantallasDelRol")]
        public IActionResult ListPantallasDelRol(int id)
        {
            var pantallasderol = _accesoServicios.ListPantdelRol(id);
            return Ok(pantallasderol.Data);
        }
    }
}
