using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SistemaSupermercado.BusinessLogic.Servicios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PdfSharpCore;
using PdfSharpCore.Pdf;
using TheArtOfDev.HtmlRenderer.PdfSharp;
using System.IO;

namespace SistemaSupermercado.API.Controllers
{
    [ApiController]
    [Route("Api/[controller]")]
    public class ReporteController : Controller
    {
        private readonly ReporteServices _reporteServices;
        private readonly IMapper _mapper;

        public ReporteController(ReporteServices reporteServices, IMapper mapper)
        {
            _mapper = mapper;
            _reporteServices = reporteServices;
        }
        [HttpGet("Stock/{Sucur_Id}")]
        public IActionResult Stock(int Sucur_Id)
        {
            var list = _reporteServices.Stock(Sucur_Id);
            return Ok(list);
        }

        [HttpGet("TodasStock")]
        public IActionResult TodasStock()
        {
            var list = _reporteServices.TodasStock();
            return Ok(list);
        }

        [HttpGet("Productos/{Sucur_Id}/{inicio}/{fin}")]
        public IActionResult Productos(int Sucur_Id, string inicio,string fin)
        {
            var list = _reporteServices.Productos(Sucur_Id,inicio,fin);
            return Ok(list);
        }

        [HttpGet("TodasProductos/{inicio}/{fin}")]
        public IActionResult TodasProductos(string inicio, string fin)
        {
            var list = _reporteServices.TodasProductos(inicio, fin);
            return Ok(list);
        }

        [HttpGet("Clientes/{inicio}/{fin}")]
        public IActionResult Clientes(string inicio,string fin)
        {
            var list = _reporteServices.Clientes(inicio, fin);
            return Ok(list);
        }


        [HttpGet("Ventas/{sucursal}/{inicio}/{fin}")]
        public IActionResult Ventas(int sucursal, string inicio, string fin)
        {
            var list = _reporteServices.Ventas(sucursal, inicio, fin);
            return Ok(list);
        }

        [HttpGet("TodasVentas/{inicio}/{fin}")]
        public IActionResult TodasVentas(string inicio, string fin)
        {
            var list = _reporteServices.TodasVentas(inicio, fin);
            return Ok(list);
        }


    }
}
