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
    public class VentaDetalleController : Controller
    {
        private readonly VentaServicio _ventaServicio;
        private readonly IMapper _mapper;

        public VentaDetalleController(VentaServicio ventaServicio, IMapper mapper)
        {
            _mapper = mapper;
            _ventaServicio = ventaServicio;
        }

        //[HttpGet("List")]
        //public IActionResult List()
        //{
        //    var list = _ventaServicio.ListarVeDe();
        //    return Ok(list);
        //}

        //[HttpGet("Detalle/{id}")]
        //public IActionResult Detalle(int id)
        //{
        //    var details = _ventaServicio.DetallesVeDe(id);

        //    var detail = details.First();
        //    return Ok(detail);

        //}

        //[HttpDelete("Eliminar/{id}")]
        //public IActionResult Eliminar(int id)
        //{
        //    var result = _ventaServicio.EliminarVeDe(id);

        //    return Ok(result);

        //}
    }
}
