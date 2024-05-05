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
    public class ImpuestoController : Controller
    {
        private readonly GeneralServicios _ServiciosGenerales;
        private readonly IMapper _mapper;

        public ImpuestoController(GeneralServicios ServiciosGenerales, IMapper mapper)
        {

            _mapper = mapper;
            _ServiciosGenerales = ServiciosGenerales;


        }

        [HttpGet("List")]
        public IActionResult List()
        {
            var list = _ServiciosGenerales.ListarImpue();
            return Ok(list);
        }

        [HttpPost("Insertar")]
        public IActionResult Insertar(ImpuestoViewModel item)
        {
            var modelo = new tbImpuestos()
            {
                Impue_Descripcion = item.Impue_Descripcion,
                Impue_UsuarioCreacion = item.Impue_UsuarioCreacion
            };

            var list = _ServiciosGenerales.CrearImpue(modelo);
            return Ok(list);
        }

        [HttpGet("ObtenerImpueID/{id}")]
        public IActionResult ObtenerImpueID(int id)
        {
            var estado = _ServiciosGenerales.LLenarImpue(id);
            var camp = estado.First();
            return Ok(camp);
        }


        [HttpGet("Detalle/{id}")]
        public IActionResult Detalle(int id)
        {
            var details = _ServiciosGenerales.DetallesImpue(id);

            var detail = details.First();
            return Ok(detail);

        }


        [HttpPut("Actualizar/{id}")]
        public IActionResult Actualizar(ImpuestoViewModel item)
        {
            var modelo = new tbImpuestos()
            {
                Impue_Id = item.Impue_Id,
                Impue_Descripcion = item.Impue_Descripcion,
                Impue_UsuarioModificacion = item.Impue_UsuarioModificacion
            };

            var list = _ServiciosGenerales.ModificarImpue(modelo);
            return Ok(list);
        }

        [HttpDelete("Eliminar/{id}")]
        public IActionResult Eliminar(int id)
        {
            var result = _ServiciosGenerales.EliImpue(id);

            return Ok(result);

        }
    }
}
