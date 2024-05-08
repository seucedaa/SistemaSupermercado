using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using SistemaSupermercado.BusinessLogic.Servicios;
using SistemaSupermercado.Common.Models;
using SistemaSupermercado.DataAccess.Repository;
using SistemaSupermercado.Entities.Entities;

namespace SistemaSupermercado.Controllers
{
    [ApiController]
    [Route("Api/[controller]")]
    public class RolController : Controller
    {
        private readonly RolRepository _rolRepository;
        private readonly AccesoServicios _serviciosAcceso;
        private readonly IMapper _mapper;

        public RolController(RolRepository rolRepositorio, AccesoServicios serviciosAcceso, IMapper mapper)
        {
            _mapper = mapper;
            _serviciosAcceso = serviciosAcceso;
            _rolRepository = rolRepositorio;

        }

        [HttpGet("List")]
        public IActionResult List()
        {
            var list = _serviciosAcceso.ListarRol();
            return Ok(list);
        }

        [HttpGet("Detalle/{id}")]
        public IActionResult Detalle(int id)
        {
            var details = _serviciosAcceso.Detalles(id);

            var detail = details.First();
            return Ok(detail);

        }


       



        [HttpPost("Actualizar")]
        public IActionResult Actualizar(RolViewModel item)
        {

            var model = _mapper.Map<tbRoles>(item);
            var modelo = new tbRoles()
            {
                Roles_Id = item.Roles_Id,
                Roles_Descripcion = item.Roles_Descripcion
            };

            DateTime fecha = DateTime.Now;
            var list = _serviciosAcceso.EditarRol(item.Roles_Id, item.Roles_Descripcion, item.Pantallas, 1, fecha);

            return Json(new { success = true, message = "Rol editadro con exito!" });
        }

        [HttpPost("EliminarPantalladelRol")]
        public IActionResult EliminarPantalladelRol(RolViewModel item)
        {

            var model = _mapper.Map<RolViewModel>(item);
            var modelo = new tbRoles()
            {
                Roles_Id = item.Roles_Id
            };


            var list = _serviciosAcceso.EliminarPantallaDelRol(item.Roles_Id, item.PantallasD);

            return Json(new { success = true, message = "Rol eliminado con exito!" });
        }


        [HttpPost("EliminarPantallaRol")]
        public IActionResult EliminarPantallaRol(RolViewModel item)
        {

            int id = _rolRepository.RolNuevoId();
            int rolId = id;


            var list = _serviciosAcceso.EliminarPantallaRol(rolId, item.PantallasD);

            return Json(new { success = true, message = "Rol enviado" });
        }

        [HttpPost("Insertar")]
        public IActionResult Insertar(RolViewModel item)
        {
            var model = _mapper.Map<tbRoles>(item);
            var modelo = new tbRoles()
            {
                Roles_Descripcion = item.Roles_Descripcion
            };

            DateTime fecha = DateTime.Now;
            var list = _serviciosAcceso.CrearRol(item.Roles_Descripcion, item.Pantallas, item.Roles_UsuarioCreacion);

            return Ok(list);
        }

        [HttpDelete("Eliminar/{id}")]
        public IActionResult Eliminar(int? id)
        {
            var result = _serviciosAcceso.ElimRon(id);

            return Ok(result);

        }
    }
}
