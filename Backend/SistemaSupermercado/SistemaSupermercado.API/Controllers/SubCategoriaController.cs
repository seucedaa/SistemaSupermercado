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
    public class SubCategoriaController : Controller
    {
        private readonly GeneralServicios _ServiciosGenerales;
        private readonly IMapper _mapper;

        public SubCategoriaController(GeneralServicios ServiciosGenerales, IMapper mapper)
        {

            _mapper = mapper;
            _ServiciosGenerales = ServiciosGenerales;


        }

        [HttpGet("List")]
        public IActionResult List()
        {
            var list = _ServiciosGenerales.ListarSubCate();
            return Ok(list);
        }

        [HttpPost("Insertar")]
        public IActionResult Insertar(SubCategoriaViewModel item)
        {
            var model = _mapper.Map<tbSubcategorias>(item);
            var modelo = new tbSubcategorias()
            {
                Subca_Descripcion = item.Subca_Descripcion,
                Categ_Descripcion = item.Categ_Descripcion,
                Subca_UsuarioCreacion = item.Subca_UsuarioCreacion
            };

            var list = _ServiciosGenerales.CrearSubCate(modelo);
            return Ok(list);
        }

        [HttpGet("ObtenerSubCaID/{id}")]
        public IActionResult ObtenerSubCaID(int id)
        {
            var estado = _ServiciosGenerales.LLenarSubCate(id);
            var camp = estado.First();
            return Ok(camp);
        }


        [HttpGet("Detalle/{id}")]
        public IActionResult Detalle(int id)
        {
            var details = _ServiciosGenerales.BuscarubCate(id);

            var detail = details.First();
            return Ok(detail);

        }


        [HttpPut("Actualizar/{id}")]
        public IActionResult Actualizar(SubCategoriaViewModel item)
        {
            var model = _mapper.Map<tbSubcategorias>(item);
            var modelo = new tbSubcategorias()
            {
                Subca_Id = item.Subca_Id,
                Subca_Descripcion = item.Subca_Descripcion,
                Categ_Descripcion = item.Categ_Descripcion,
                Subca_UsuarioModificacion = item.Subca_UsuarioModificacion
            };

            var list = _ServiciosGenerales.ModificarSubCate(modelo);
            return Ok(list);
        }

        [HttpDelete("Eliminar/{id}")]
        public IActionResult Eliminar(int id)
        {
            var result = _ServiciosGenerales.EliSubCategoria(id);

            return Ok(result);

        }
    }
}
