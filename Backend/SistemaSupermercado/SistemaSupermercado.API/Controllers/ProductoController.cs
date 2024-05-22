using AutoMapper;
using SistemaSupermercado.BusinessLogic.Servicios;
using SistemaSupermercado.Common.Models;
using SistemaSupermercado.Entities.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.IO;

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

        [HttpPost("Subir")]
        public async Task<IActionResult> UploadImage(IFormFile file)
        {
            var allowedExtensions = new HashSet<string> { ".png", ".jpeg", ".svg", ".jpg", ".gif" };
            var fileExtension = Path.GetExtension(file.FileName).ToLower();
            if (!allowedExtensions.Contains(fileExtension))
            {
                return Ok(new { message = "Error", detail = "Extensión de archivo no permitida." });
            }

            var uploadsFolderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");

            if (!Directory.Exists(uploadsFolderPath))
            {
                Directory.CreateDirectory(uploadsFolderPath);
            }



            // Crea la ruta completa del archivo en el servidor
            var filePath = Path.Combine(uploadsFolderPath, file.FileName);

            try
            {
                // Copia el archivo a la carpeta especificada
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                return Ok(new { message = "Exito" });
            }
            catch (Exception e)
            {
                return StatusCode(500, $"General error: {e.ToString()}");
            }
        }

        [HttpGet("Existencia/{sucursal}")]
        public IActionResult Total(int sucursal)
        {
            var estado = _superServicio.Existencia(sucursal);
            return Ok(estado);

        }

        [HttpGet("ExisTodas")]
        public IActionResult ExisTodas()
        {
            var estado = _superServicio.ExisTodas();
            return Ok(estado);

        }

        [HttpGet("Top/{sucursal}")]
        public IActionResult Top(int sucursal)
        {
            var estado = _superServicio.Top(sucursal);
            return Ok(estado);

        }
        
        [HttpGet("Principal/{sucursal}")]
        public IActionResult Principal(int sucursal)
        {
            var estado = _superServicio.Principal(sucursal);
            return Ok(estado);

        }

        [HttpGet("Ventas/{sucursal}/{inicio}/{fin}")]
        public IActionResult Ventas(int sucursal, string inicio, string fin)
        {
            var estado = _superServicio.Ventas(sucursal, inicio, fin);
            return Ok(estado);

        }

        [HttpGet("Todas/{inicio}/{fin}")]
        public IActionResult Todas(string inicio, string fin)
        {
            var estado = _superServicio.Todas(inicio, fin);
            return Ok(estado);

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
                Produ_UsuarioCreacion = item.Produ_UsuarioCreacion,
                img= item.img
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
