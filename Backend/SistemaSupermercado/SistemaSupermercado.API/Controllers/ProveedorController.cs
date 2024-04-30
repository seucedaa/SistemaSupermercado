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
    public class ProveedorController : Controller
    {
        private readonly SuperServicio _superServicio;
        private readonly IMapper _mapper;

        public ProveedorController(SuperServicio superServicio, IMapper mapper)
        {

            _mapper = mapper;
            _superServicio = superServicio;


        }

        [HttpGet("List")]
        public IActionResult List()
        {
            var list = _superServicio.ListarProve();
            return Ok(list);
        }

        [HttpPost("Insertar")]
        public IActionResult Insertar(ProveedorViewModel item)
        {
            var model = _mapper.Map<tbProveedores>(item);
            var modelo = new tbProveedores()
            {
                Prove_Marca = item.Prove_Marca,
                Prove_ContactoPrimerNombre = item.Prove_ContactoPrimerNombre,
                Prove_ContactoSegundoNombre = item.Prove_ContactoSegundoNombre,
                Prove_ContactoPrimerApellido = item.Prove_ContactoPrimerApellido,
                Prove_ContactoSegundoApellido = item.Prove_ContactoSegundoApellido,
                Munic_Id = item.Munic_Id,
                Prove_Direccion = item.Prove_Direccion,
                Prove_Telefono = item.Prove_Telefono,
                Prove_Correo = item.Prove_Correo,
                Prove_Notas = item.Prove_Notas,
                Prove_UsuarioCreacion = item.Prove_UsuarioCreacion
            };

            var list = _superServicio.InsertarProve(modelo);
            return Ok(list);
        }


        [HttpGet("Detalle/{id}")]
        public IActionResult Detalle(int id)
        {
            var details = _superServicio.DetallesProve(id);

            var detail = details.First();
            return Ok(detail);

        }


        [HttpPut("Actualizar/{id}")]
        public IActionResult Actualizar(ProveedorViewModel item)
        {
            var model = _mapper.Map<tbProveedores>(item);
            var modelo = new tbProveedores()
            {
                Prove_Id = item.Prove_Id,
                Prove_Marca = item.Prove_Marca,
                Prove_ContactoPrimerNombre = item.Prove_ContactoPrimerNombre,
                Prove_ContactoSegundoNombre = item.Prove_ContactoSegundoNombre,
                Prove_ContactoPrimerApellido = item.Prove_ContactoPrimerApellido,
                Prove_ContactoSegundoApellido = item.Prove_ContactoSegundoApellido,
                Munic_Id = item.Munic_Id,
                Prove_Direccion = item.Prove_Direccion,
                Prove_Telefono = item.Prove_Telefono,
                Prove_Correo = item.Prove_Correo,
                Prove_Notas = item.Prove_Notas,
                Prove_UsuarioModificacion = item.Prove_UsuarioModificacion
            };

            var list = _superServicio.ActualizaProve(modelo);
            return Ok(list);
        }

        [HttpDelete("Eliminar/{id}")]
        public IActionResult Eliminar(int id)
        {
            var result = _superServicio.EliminarProve(id);

            return Ok(result);

        }
    }
}
