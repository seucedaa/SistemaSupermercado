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
    public class EstadoCivilController : Controller
    {
        private readonly GeneralServicios _ServiciosGenerales;
        private readonly IMapper _mapper;

        public EstadoCivilController(GeneralServicios ServiciosGenerales, IMapper mapper)
        {

            _mapper = mapper;
            _ServiciosGenerales = ServiciosGenerales;


        }

        [HttpGet("List")]
        public IActionResult List()
        {
            var list = _ServiciosGenerales.ListarCivil();
            return Ok(list);
        }

        [HttpPost("Insertar")]
        public IActionResult Insertar(EstadoCivilViewModel item)
        {
            var model = _mapper.Map<tbEstadosCiviles>(item);
            var modelo = new tbEstadosCiviles()
            {
                Estad_Id = item.Estad_Id,
                Estad_Descripcion = item.Estad_Descripcion,
                Estad_UsuarioCreacion = item.Estad_UsuarioCreacion
            };

            var list = _ServiciosGenerales.CrearCivil(modelo);
            return Ok(list);
        }

        [HttpGet("ObtenerCiviID/{id}")]
        public IActionResult ObtenerCiviID(int id)
        {
            var estado = _ServiciosGenerales.LLenarCivil(id);
            var camp = estado.First();
            return Ok(camp);
        }


        [HttpGet("Detalle/{id}")]
        public IActionResult Detalle(int id)
        {
            var details = _ServiciosGenerales.Detalles(id);

            var detail = details.First();
            return Ok(detail);

        }


        [HttpPut("Actualizar/{id}")]
        public IActionResult Actualizar(EstadoCivilViewModel item)
        {
            var model = _mapper.Map<tbEstadosCiviles>(item);
            var modelo = new tbEstadosCiviles()
            {
                Estad_Id = item.Estad_Id,
                Estad_Descripcion = item.Estad_Descripcion,
                Estad_UsuarioModificacion = item.Estad_UsuarioModificacion
            };

            var list = _ServiciosGenerales.ActualizarCivil(modelo);
            return Ok(list);
        }

        [HttpDelete("Eliminar/{id}")]
        public IActionResult Eliminar(int id)
        {
            var result = _ServiciosGenerales.ElimCivil(id);

            return Ok(result);

        }
    }
}
