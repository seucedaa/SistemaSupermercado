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
    public class EmpleadoController : Controller
    {
        private readonly SuperServicio _superServicio;
        private readonly IMapper _mapper;

        public EmpleadoController(SuperServicio superServicio, IMapper mapper)
        {

            _mapper = mapper;
            _superServicio = superServicio;


        }

        [HttpGet("List")]
        public IActionResult List()
        {
            var list = _superServicio.ListarEmple();
            return Ok(list);
        }

        [HttpPost("Insertar")]
        public IActionResult Insertar(EmpleadoViewModel item)
        {
            var model = _mapper.Map<tbEmpleados>(item);
            var modelo = new tbEmpleados()
            {
                Emple_Dni = item.Emple_Dni,
                Emple_PrimerNombre = item.Emple_PrimerNombre,
                Emple_SegundoNombre = item.Emple_SegundoNombre,
                Emple_PrimerApellido = item.Emple_PrimerApellido,
                Emple_SegundoApellido = item.Emple_SegundoApellido,
                Emple_Sexo = item.Emple_Sexo,
                Estad_Id = item.Estad_Id,
                Emple_Telefono = item.Emple_Telefono,
                Emple_Correo = item.Emple_Correo,
                Munic_Id = item.Munic_Id,
                Emple_Direccion = item.Emple_Direccion,
                Cargo_Id = item.Cargo_Id,
                Sucur_Id = item.Sucur_Id,
                Emple_UsuarioCreacion = item.Emple_UsuarioCreacion,
            };

            var list = _superServicio.InsertarEmple(modelo);
            return Ok(list);
        }



        [HttpGet("Detalle/{id}")]
        public IActionResult Detalle(int id)
        {
            var details = _superServicio.DetallesEmple(id);

            var detail = details.First();
            return Ok(detail);

        }


        [HttpPut("Actualizar/{id}")]
        public IActionResult Actualizar(EmpleadoViewModel item)
        {
            var model = _mapper.Map<tbEmpleados>(item);
            var modelo = new tbEmpleados()
            {
                Emple_Dni = item.Emple_Dni,
                Emple_PrimerNombre = item.Emple_PrimerNombre,
                Emple_SegundoNombre = item.Emple_SegundoNombre,
                Emple_PrimerApellido = item.Emple_PrimerApellido,
                Emple_SegundoApellido = item.Emple_SegundoApellido,
                Emple_Sexo = item.Emple_Sexo,
                Estad_Id = item.Estad_Id,
                Emple_Telefono = item.Emple_Telefono,
                Emple_Correo = item.Emple_Correo,
                Munic_Id = item.Munic_Id,
                Emple_Direccion = item.Emple_Direccion,
                Cargo_Id = item.Cargo_Id,
                Sucur_Id = item.Sucur_Id,
                Emple_UsuarioModificacion = item.Emple_UsuarioModificacion
            };

            var list = _superServicio.ActualizarEmple(modelo);
            return Ok(list);
        }

        [HttpDelete("Eliminar/{id}")]
        public IActionResult Eliminar(int id)
        {
            var result = _superServicio.EliminarEmple(id);

            return Ok(result);

        }
    }
}
