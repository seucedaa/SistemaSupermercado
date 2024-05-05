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
    public class LoteController : Controller
    {
        private readonly SuperServicio _superServicio;
        private readonly IMapper _mapper;

        public LoteController(SuperServicio superServicio, IMapper mapper)
        {

            _mapper = mapper;
            _superServicio = superServicio;


        }

        [HttpGet("List")]
        public IActionResult List()
        {
            var list = _superServicio.ListarLote();
            return Ok(list);
        }

        [HttpPost("Insertar")]
        public IActionResult Insertar(LoteViewModel item)
        {
            var model = _mapper.Map<tbLotes>(item);
            var modelo = new tbLotes()
            {
                Lotes_Cantidad = item.Lotes_Cantidad,
                Lotes_FechaVencimiento = item.Lotes_FechaVencimiento,
                Produ_Id = item.Produ_Id,
                Sucur_Id = item.Sucur_Id,
                Lotes_UsuarioCreacion = item.Lotes_UsuarioCreacion
            };

            var list = _superServicio.CrearLote(modelo);
            return Ok(list);
        }

        [HttpGet("ObtenerLoteID/{id}")]
        public IActionResult ObtenerLoteID(int id)
        {
            var estado = _superServicio.LLenarLote(id);
            var camp = estado.First();
            return Ok(camp);
        }


        [HttpGet("Detalle/{id}")]
        public IActionResult Detalle(int id)
        {
            var details = _superServicio.DetallesLote(id);

            var detail = details.First();
            return Ok(detail);

        }


        [HttpPut("Actualizar/{id}")]
        public IActionResult Actualizar(LoteViewModel item)
        {
            var modelo = new tbLotes()
            {
                Lotes_Id = item.Lotes_Id,
                Lotes_Cantidad = item.Lotes_Cantidad,
                Lotes_FechaVencimiento = item.Lotes_FechaVencimiento,
                Produ_Id = item.Produ_Id,
                Sucur_Id = item.Sucur_Id,
                Lotes_UsuarioModificacion = item.Lotes_UsuarioModificacion
            };

            var list = _superServicio.ModificarLote(modelo);
            return Ok(list);
        }

        [HttpDelete("Eliminar/{id}")]
        public IActionResult Eliminar(int id)
        {
            var result = _superServicio.EliLote(id);

            return Ok(result);

        }
    }
}
