using AutoMapper;
using SistemaSupermercado.BusinessLogic.Servicios;
using SistemaSupermercado.Common.Models;
using SistemaSupermercado.Entities.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SistemaSupermercado.Controllers
{
    [ApiController]
    [Route("Api/[controller]")]
    public class DepartamentoController : Controller
    {
        private readonly GeneralServicios _ServiciosGenerales;
        private readonly IMapper _mapper;

        public DepartamentoController(GeneralServicios ServiciosGenerales, IMapper mapper)
        {

            _mapper = mapper;
            _ServiciosGenerales = ServiciosGenerales;


        }

        [HttpGet("List")]
        public IActionResult List()
        {
            var list = _ServiciosGenerales.ListarDepto();
            return Ok(list);
        }

        [HttpPost("Insertar")]
        public IActionResult Insertar(DepartamentoViewModel item)
        {
            var model = _mapper.Map<tbDepartamentos>(item);
            var modelo = new tbDepartamentos()
            {
                Depar_Descripcion = item.Depar_Descripcion,
                Depar_UsuarioCreacion = item.Depar_UsuarioCreacion
            };

            var list = _ServiciosGenerales.CrearDepto(modelo);
            return Ok(list);
        }

        [HttpGet("ObtenerDepaID/{id}")]
        public IActionResult ObtenerDepaID(int id)
        {
            var estado = _ServiciosGenerales.LlenarDepto(id);
            var camp = estado.First();
            return Ok(camp);
        }


        [HttpGet("Detalle/{id}")]
        public IActionResult Detalle(int id)
        {
            var details = _ServiciosGenerales.DetallesDepto(id);

            var detail = details.First();
            return Ok(detail);

        }


        [HttpPut("Actualizar/{id}")]
        public IActionResult Actualizar(DepartamentoViewModel item)
        {
            var model = _mapper.Map<tbDepartamentos>(item);
            var modelo = new tbDepartamentos()
            {
                Depar_Id = item.Depar_Id,
                Depar_Descripcion = item.Depar_Descripcion,
                Depar_UsuarioModificacion = item.Depar_UsuarioModificacion
            };

            var list = _ServiciosGenerales.ModificarDepto(modelo);
            return Ok(list);
        }

        [HttpDelete("Eliminar/{id}")]
        public IActionResult Eliminar(string? id)
        {
            var result = _ServiciosGenerales.ElimDepto(id);

            return Ok(result);

        }

        [HttpGet("Municipios/{id}")]
        public IActionResult Municipios(string id)
        {
            var list = _ServiciosGenerales.ListarMuniporDepa(id);
            return Ok(list);
        }

    }
}
