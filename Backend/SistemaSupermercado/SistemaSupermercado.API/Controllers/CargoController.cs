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
    public class CargoController : Controller
    {
        private readonly GeneralServicios _ServiciosGenerales;
        private readonly IMapper _mapper;

        public CargoController(GeneralServicios ServiciosGenerales, IMapper mapper)
        {

            _mapper = mapper;
            _ServiciosGenerales = ServiciosGenerales;


        }

        [HttpGet("List")]
        public IActionResult List()
        {
            var list = _ServiciosGenerales.ListarCargo();
            return Ok(list);
        }

        [HttpPost("Insertar")]
        public IActionResult Insertar(CargoViewModel item)
        {
            var model = _mapper.Map<tbCargos>(item);
            var modelo = new tbCargos()
            {
                Cargo_Descripcion = item.Cargo_Descripcion,
                Cargo_UsuarioCreacion = 1,
            };

            var list = _ServiciosGenerales.CrearCargo(modelo);
            return Ok(list);
        }

        [HttpGet("ObtenerCargID/{id}")]
        public IActionResult ObtenerCargID(int id)
        {
            var estado = _ServiciosGenerales.LLenarCargo(id);
            var camp = estado.First();
            return Ok(camp);
        }


        [HttpGet("Detalle/{id}")]
        public IActionResult Detalle(int id)
        {
            var details = _ServiciosGenerales.DetallesCargo(id);

            var detail = details.First();
            return Ok(detail);

        }


        [HttpPut("Actualizar/{id}")]
        public IActionResult Actualizar(CargoViewModel item)
        {
            var model = _mapper.Map<tbCargos>(item);
            var modelo = new tbCargos()
            {
                Cargo_Id = item.Cargo_Id,
                Cargo_Descripcion = item.Cargo_Descripcion,
                Cargo_UsuarioModificacion = item.Cargo_UsuarioModificacion
            };

            var list = _ServiciosGenerales.ModificarCargo(modelo);
            return Ok(list);
        }

        [HttpDelete("Eliminar/{id}")]
        public IActionResult Eliminar(int id)
        {
            var result = _ServiciosGenerales.EliCargo(id);

            return Ok(result);

        }

    }
}
