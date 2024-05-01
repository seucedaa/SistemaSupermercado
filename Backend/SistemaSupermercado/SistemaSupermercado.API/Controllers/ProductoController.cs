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
    public class ProductoController : Controller
    {
        private readonly SuperServicio _superServicio;
        private readonly IMapper _mapper;

        public ProductoController(SuperServicio superServicio, IMapper mapper)
        {

            _mapper = mapper;
            _superServicio = superServicio;


        }

        [HttpGet("List")]
        public IActionResult List()
        {
            var list = _superServicio.ListarProdu();
            return Ok(list);
        }

        [HttpPost("Insertar")]
        public IActionResult Insertar(ProductoViewModel item)
        {
            var model = _mapper.Map<tbProductos>(item);
            var modelo = new tbProductos()
            {
                Produ_Descripcion = item.Produ_Descripcion,
                Produ_Existencia = item.Produ_Existencia,
                Produ_PrecioCompra = item.Produ_PrecioCompra,
                Produ_PrecioVenta = item.Produ_PrecioVenta,
                Impue_Id = item.Impue_Id,
                Subca_Id = item.Subca_Id,
                Prove_Id = item.Prove_Id,
                Produ_UsuarioCreacion = item.Produ_UsuarioCreacion
            };

            var list = _superServicio.InsertarProdu(modelo);
            return Ok(list);
        }

        [HttpGet("Detalle/{id}")]
        public IActionResult Detalle(int id)
        {
            var details = _superServicio.DetallesProdu(id);

            var detail = details.First();
            return Ok(detail);

        }


        [HttpPut("Actualizar/{id}")]
        public IActionResult Actualizar(ProductoViewModel item)
        {
            var model = _mapper.Map<tbProductos>(item);
            var modelo = new tbProductos()
            {
                Produ_Id = item.Produ_Id,
                Produ_Descripcion = item.Produ_Descripcion,
                Produ_Existencia = item.Produ_Existencia,
                Produ_PrecioCompra = item.Produ_PrecioCompra,
                Produ_PrecioVenta = item.Produ_PrecioVenta,
                Impue_Id = item.Impue_Id,
                Subca_Id = item.Subca_Id,
                Prove_Id = item.Prove_Id,
                Produ_UsuarioModificacion = item.Produ_UsuarioModificacion
            };

            var list = _superServicio.ModificarProdu(modelo);
            return Ok(list);
        }

        [HttpDelete("Eliminar/{id}")]
        public IActionResult Eliminar(int id)
        {
            var result = _superServicio.EliminarProdu(id);

            return Ok(result);

        }
    }
}
