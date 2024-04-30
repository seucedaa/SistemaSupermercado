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
    public class CategoriaController : Controller
    {
        private readonly GeneralServicios _ServiciosGenerales;
        private readonly IMapper _mapper;

        public CategoriaController(GeneralServicios ServiciosGenerales, IMapper mapper)
        {

            _mapper = mapper;
            _ServiciosGenerales = ServiciosGenerales;


        }

        [HttpGet("List")]
        public IActionResult List()
        {
            var list = _ServiciosGenerales.ListarCate();
            return Ok(list);
        }

        [HttpPost("Insertar")]
        public IActionResult Insertar(CategoriaViewModel item)
        {
            var model = _mapper.Map<tbCategorias>(item);
            var modelo = new tbCategorias()
            {
                Categ_Id = item.Categ_Id,
                Categ_Descripcion = item.Categ_Descripcion,
                Categ_UsuarioCreacion = item.Categ_UsuarioCreacion
            };

            var list = _ServiciosGenerales.CrearCate(modelo);
            return Ok(list);
        }

        [HttpGet("ObtenerCateID/{id}")]
        public IActionResult ObtenerCargID(int id)
        {
            var estado = _ServiciosGenerales.LLenarCate(id);
            var camp = estado.First();
            return Ok(camp);
        }


        [HttpGet("Detalle/{id}")]
        public IActionResult Detalle(int id)
        {
            var details = _ServiciosGenerales.DetallesCate(id);

            var detail = details.First();
            return Ok(detail);

        }


        [HttpPut("Actualizar/{id}")]
        public IActionResult Actualizar(CategoriaViewModel item)
        {
            var model = _mapper.Map<tbCategorias>(item);
            var modelo = new tbCategorias()
            {
                Categ_Id = item.Categ_Id,
                Categ_Descripcion = item.Categ_Descripcion,
                Categ_UsuarioModificacion = item.Categ_UsuarioModificacion
            };

            var list = _ServiciosGenerales.ActualizarCate(modelo);
            return Ok(list);
        }

        [HttpDelete("Eliminar/{id}")]
        public IActionResult Eliminar(int id)
        {
            var result = _ServiciosGenerales.EliCategoria(id);

            return Ok(result);

        }
    }
}
