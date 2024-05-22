using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SistemaSupermercado.BusinessLogic.Servicios;
using SistemaSupermercado.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SistemaSupermercado.API.Controllers
{
    [ApiController]
    [Route("Api/[controller]")]
    public class CartController : Controller
    {
        private readonly VentaServicio _ventaServicio;
        private readonly IMapper _mapper;

        public CartController(VentaServicio ventaServicio, IMapper mapper)
        {

            _mapper = mapper;
            _ventaServicio = ventaServicio;


        }
        [HttpGet("ListarLotes")]
        public IActionResult List()
        {
            var list = _ventaServicio.ListarLotes();
            return Ok(list);
        }

        [HttpGet("BuscarFactura")]
        public IActionResult BuscarFactura(int id)
        {
            var list = _ventaServicio.BuscarFactura(id);
            return Ok(list);
        }

        [HttpPost("CrearFacturaEncabezado")]
        public IActionResult CrearFacturaEncabezado(CartViewModel item)
        {
            var list = _ventaServicio.CrearFacturaEncabezado(item);
            return Ok(list);
        }

        [HttpPost("CrearFacturaDetalle")]
        public IActionResult CrearFacturaDetalle(CartViewModel item)
        {
            var list = _ventaServicio.CrearFacturaDetalle(item);
            return Ok(list);
        }
    }
}
