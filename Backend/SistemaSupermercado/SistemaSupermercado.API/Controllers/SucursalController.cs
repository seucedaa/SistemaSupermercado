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
    public class SucursalController : Controller
    {
        private readonly SuperServicio _superServicio;
        private readonly IMapper _mapper;

        public SucursalController(SuperServicio superServicio, IMapper mapper)
        {

            _mapper = mapper;
            _superServicio = superServicio;


        }

        [HttpGet("List")]
        public IActionResult List()
        {
            var list = _superServicio.ListarSucur();
            return Ok(list);
        }

        [HttpPost("Insertar")]
        public IActionResult Insertar(SucursalViewModel item)
        {
            var model = _mapper.Map<tbSucursales>(item);
            var modelo = new tbSucursales()
            {
                Sucur_Descripcion = item.Sucur_Descripcion,
                Munic_Id = item.Munic_Id,
                Sucur_Telefono = item.Sucur_Telefono,
                Sucur_Direccion = item.Sucur_Direccion,
                Sucur_UsuarioCreacion = item.Sucur_UsuarioCreacion
            };

            var list = _superServicio.CrearSucur(modelo);
            return Ok(list);
        }

        [HttpGet("ObtenerSucurID/{id}")]
        public IActionResult ObtenerSucurID(int id)
        {
            var estado = _superServicio.LLenarSucur(id);
            var camp = estado.First();
            return Ok(camp);
        }


        [HttpGet("Detalle/{id}")]
        public IActionResult Detalle(int id)
        {
            var details = _superServicio.DetallesSucur(id);

            var detail = details.First();
            return Ok(detail);

        }


        [HttpPut("Actualizar/{id}")]
        public IActionResult Actualizar(SucursalViewModel item)
        {
            var model = _mapper.Map<tbSucursales>(item);
            var modelo = new tbSucursales()
            {
                Sucur_Id = item.Sucur_Id,
                Sucur_Descripcion = item.Sucur_Descripcion,
                Munic_Id = item.Munic_Id,
                Sucur_Telefono = item.Sucur_Telefono,
                Sucur_Direccion = item.Sucur_Direccion,
                Sucur_UsuarioModificacion = item.Sucur_UsuarioModificacion
            };

            var list = _superServicio.ActualizarSucur(modelo);
            return Ok(list);
        }

        [HttpDelete("Eliminar/{id}")]
        public IActionResult Eliminar(int id)
        {
            var result = _superServicio.EliSucur(id);

            return Ok(result);

        }
    }
}
