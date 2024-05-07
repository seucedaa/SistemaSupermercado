using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SistemaSupermercado.BusinessLogic.Servicios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
        [HttpGet("Stock")]
        public IActionResult reporteStock()
        {
            var list = _reporteServices.reporteStock();
            return Ok(list);
        }
    }
}
