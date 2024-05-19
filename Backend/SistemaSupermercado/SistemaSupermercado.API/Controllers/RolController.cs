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
using Microsoft.AspNetCore.Mvc.Rendering;
using SistemaSupermercado.API.Clases;
using SistemaSupermercado.BusinessLogic;

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

        //[HttpGet("List")]
        //public IActionResult List()
        //{
        //    var list = _serviciosAcceso.ListarRol();
        //    return Ok(list);
        //}

        //[HttpGet("Detalle/{id}")]
        //public IActionResult Detalle(int id)
        //{
        //    var details = _serviciosAcceso.Detalles(id);

        //    var detail = details.First();
        //    return Ok(detail);

        //}






        //[HttpPut("Actualizar")]
        //public IActionResult Actualizar(RolViewModel item)
        //{

        //    var model = _mapper.Map<tbRoles>(item);
        //    var modelo = new tbRoles()
        //    {
        //        Roles_Id = item.Roles_Id,
        //        Roles_Descripcion = item.Roles_Descripcion
        //    };

        //    DateTime fecha = DateTime.Now;
        //    var list = _serviciosAcceso.EditarRol(item.Roles_Id, item.Roles_Descripcion, item.Pantallas, item.Roles_UsuarioModificacion);

        //    return Json(new { success = true, message = "Rol editadro con exito!" });
        //}

        //[HttpPut("EliminarPantalladelRol")]
        //public IActionResult EliminarPantalladelRol(RolViewModel item)
        //{

        //    var model = _mapper.Map<RolViewModel>(item);
        //    var modelo = new tbRoles()
        //    {
        //        Roles_Id = item.Roles_Id
        //    };


        //    var list = _serviciosAcceso.EliminarPantallaDelRol(item.Roles_Id, item.PantallasD);

        //    return Json(new { success = true, message = "Rol eliminado con exito!" });
        //}


        //[HttpPut("EliminarPantallaRol")]
        //public IActionResult EliminarPantallaRol(RolViewModel item)
        //{

        //    int id = _rolRepository.RolNuevoId();
        //    int rolId = id;


        //    var list = _serviciosAcceso.EliminarPantallaRol(rolId, item.PantallasD);

        //    return Json(new { success = true, message = "Rol enviado" });
        //}

        //[HttpPost("Insertar")]
        //public IActionResult Insertar(RolViewModel item)
        //{
        //    var model = _mapper.Map<tbRoles>(item);
        //    var modelo = new tbRoles()
        //    {
        //        Roles_Descripcion = item.Roles_Descripcion,
        //        Roles_UsuarioCreacion = item.Roles_UsuarioCreacion,
        //    };

        //    var list = _serviciosAcceso.CrearRol(item.Roles_Descripcion, item.Pantallas, item.Roles_UsuarioCreacion);

        //    return Json(new { success = true, message = "Rol creado con exito!" });
        //}

        //[HttpDelete("Eliminar/{id}")]
        //public IActionResult Eliminar(int? id)
        //{
        //    var result = _serviciosAcceso.ElimRon(id);

        //    return Ok(result);

        //}


        #region Y
        [HttpGet("List")]
        public IActionResult Index()
        {
            var result = _serviciosAcceso.ListRoles();
            return Ok(result.Data);
        }

        [HttpGet("DropDown")]
        public IActionResult ListD()
        {
            var list = _serviciosAcceso.ListadoRol();
            var drop = list.Data as List<tbRoles>;
            var rol = drop.Select(x => new SelectListItem
            {
                Text = x.Roles_Descripcion,
                Value = x.Roles_Id.ToString()
            }).ToList();

            rol.Insert(0, new SelectListItem { Text = "-- SELECCIONE --", Value = "0" });
            return Ok(rol.ToList());
        }

        [HttpPost("Create")]

        public IActionResult Insert(FormData formData)
        {
            var msj = new ServiceResult();
            string txtRol = formData.txtRol;
            List<int> pantallasSeleccionadas = formData.pantallasSeleccionadas;

            var modelo = new tbRoles()
            {
                Roles_Descripcion = txtRol,
                Roles_UsuarioCreacion = 1,
                Roles_FechaCreacion = DateTime.Now
            };
            var list = _serviciosAcceso.InsertarRol(modelo);
            int idRol = Int32.Parse(list);

            foreach (var pantalla in pantallasSeleccionadas)
            {
                var modelo2 = new tbPantallasPorRoles()
                {
                    Panta_Id = pantalla,
                    Roles_Id = idRol,
                };

                msj = _serviciosAcceso.InsertarRolesPantalla(modelo2);

            }
            return Ok(new { success = true, message = msj.Message });
        }

        [HttpGet("Fill/{id}")]
        public IActionResult Llenar(int id)
        {
            var list = _serviciosAcceso.obterRolesPantalla(id);
            if (list.Success)
            {
                return Ok(list.Data);
            }
            else
            {
                return BadRequest(list.Message);
            }
        }

        [HttpGet("FillDetalles/{id}")]
        public IActionResult FillDetalles(int id)
        {
            var list = _serviciosAcceso.ObtenerRoles(id);
            if (list.Success)
            {
                return Ok(list.Data);
            }
            else
            {
                return BadRequest(list.Message);
            }
        }

        [HttpPut("Edit")]
        public IActionResult Update(FormData formData)
        {

            var msj = new ServiceResult();
            List<int> pantallasSeleccionadas = formData.pantallasSeleccionadas;


            var modelo = new tbRoles()
            {
                Roles_Id = formData.Roles_Id,
                Roles_Descripcion = formData.txtRol,
                Roles_UsuarioModificacion = 1,
                Roles_FechaModificacion = DateTime.Now

            };
            var list = _serviciosAcceso.EditarRol(modelo);

            var idRol = formData.Roles_Id;

            var res = _serviciosAcceso.EliminarRolesPantalla(idRol.ToString());

            foreach (var pantalla in pantallasSeleccionadas)
            {
                var modelo2 = new tbPantallasPorRoles()
                {
                    Panta_Id = pantalla,
                    Roles_Id = idRol,
                };

                msj = _serviciosAcceso.InsertarRolesPantalla(modelo2);

            }

            return Ok(new { success = true, message = msj.Message });

        }

        [HttpDelete("Delete/{id}")]
        public IActionResult Delete(string id)
        {
            var list = _serviciosAcceso.EliminarRolesPantalla(id);
            var list2 = _serviciosAcceso.EliminarRol(id);

            return Ok(new { success = true, message = list2.Message });
        }
        #endregion
    }
}
