using AutoMapper;
using SistemaSupermercado.BussinesLogic.Servicios;
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
        private readonly ServiciosGenerales _ServiciosGenerales;
        private readonly IMapper _mapper;

        public DepartamentoController(ServiciosGenerales ServiciosGenerales, IMapper mapper)
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
                Dept_Id = item.Dept_Id,
                Dept_Departamento = item.Dept_Departamento,
                Dept_UsuarioCreacion = item.Usua_Id
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
                Dept_Id = item.Dept_Id,
                Dept_Departamento = item.Dept_Departamento,
                Dept_UsuarioModificacion = item.Usua_Id
            };

            var list = _ServiciosGenerales.ActualizarDepto(modelo);
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
            var list = _ServiciosGenerales.ListaMunicipiosID(id);
            return Ok(list);
        }

        [HttpGet("Colonias/{id}")]
        public IActionResult Colonias(string id)
        {
            var list = _ServiciosGenerales.ListaColoniasID(id);
            return Ok(list);
        }
    }
}
