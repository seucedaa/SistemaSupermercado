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
    public class PromocionController : Controller
    {
        private readonly SuperServicio _superServicio;
        private readonly IMapper _mapper;

        public PromocionController(SuperServicio superServicio, IMapper mapper)
        {

            _mapper = mapper;
            _superServicio = superServicio;


        }

        [HttpGet("List")]
        public IActionResult List()
        {
            var list = _superServicio.ListarProm();
            return Ok(list);
        }

        [HttpPost("Insertar")]
        public IActionResult Insertar(PromocionViewModel item)
        {
            var model = _mapper.Map<tbPromociones>(item);
            var modelo = new tbPromociones()
            {
                Produ_Descripcion = item.Produ_Descripcion,
                Produ_Id = item.Produ_Id,
                Promo_Porcentaje = item.Promo_Porcentaje,
                Promo_UsuarioCreacion = item.Promo_UsuarioCreacion
            };

            var list = _superServicio.CrearProm(modelo);
            return Ok(list);
        }


        [HttpGet("Detalle/{id}")]
        public IActionResult Detalle(int id)
        {
            var details = _superServicio.DetallesProm(id);

            var detail = details.First();
            return Ok(detail);

        }


        [HttpPut("Actualizar")]
        public IActionResult Actualizar(PromocionViewModel item)
        {
            var model = _mapper.Map<tbPromociones>(item);
            var modelo = new tbPromociones()
            {
                Promo_Id = item.Promo_Id,
                Produ_Descripcion = item.Produ_Descripcion,
                Produ_Id = item.Produ_Id,
                Promo_Porcentaje = item.Promo_Porcentaje,
                Promo_UsuarioModificacion = item.Promo_UsuarioModificacion
            };

            var list = _superServicio.ModificarProm(modelo);
            return Ok(list);
        }

        [HttpDelete("Eliminar/{id}")]
        public IActionResult Eliminar(int id)
        {
            var result = _superServicio.EliProm(id);

            return Ok(result);

        }
    }
}
