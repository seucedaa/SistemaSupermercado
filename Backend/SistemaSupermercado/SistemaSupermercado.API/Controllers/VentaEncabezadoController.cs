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
    public class VentaEncabezadoController : Controller
    {
        private readonly VentaServicio _ventaServicio;
        private readonly IMapper _mapper;

        public VentaEncabezadoController(VentaServicio ventaServicio, IMapper mapper)
        {
            _mapper = mapper;
            _ventaServicio = ventaServicio;
        }
        [HttpGet("Total")]
        public IActionResult totalventas()
        {
            var list = _ventaServicio.totalventas();
            return Ok(list);
        }

        //[HttpGet("List")]
        //public IActionResult List()
        //{
        //    var list = _ventaServicio.ListarVeEn();
        //    return Ok(list);
        //}

        //[HttpGet("Detalle/{id}")]
        //public IActionResult Detalle(int id)
        //{
        //    var details = _ventaServicio.DetallesVeEn(id);

        //    var detail = details.First();
        //    return Ok(detail);

        //}

        //[HttpDelete("Eliminar/{id}")]
        //public IActionResult Eliminar(int id)
        //{
        //    var result = _ventaServicio.EliminarVeEn(id);

        //    return Ok(result);

        //}
    }
}
