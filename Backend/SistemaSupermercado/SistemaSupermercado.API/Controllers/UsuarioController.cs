using AutoMapper;
using SistemaSupermercado.API.Services;
using SistemaSupermercado.BusinessLogic.Servicios;
using SistemaSupermercado.Common.Models;
using SistemaSupermercado.Entities.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace SistemaSupermercado.API.Controllers
{

    [ApiController]
    [Route("Api/[controller]")]
    public class UsuarioController : Controller
    {
        private readonly AccesoServicios _accesoservicios;
        private readonly IMapper _mapper;

        private readonly IMailService _mailService;


        public UsuarioController(AccesoServicios accesoservicios, IMapper mapper, IMailService mailService)
        {
            _mapper = mapper;
            _accesoservicios = accesoservicios;
            _mailService = mailService;

        }

        [HttpGet("List")]
        public IActionResult List()
        {
            var list = _accesoservicios.ListarUsua();
            return Ok(list.Data);
        }

        [HttpPost("Insertar")]
        public IActionResult Insertar(UsuarioViewModel item)
        {
            var model = _mapper.Map<tbUsuarios>(item);
            var modelo = new tbUsuarios()
            {
                Usuar_Usuario = item.Usuar_Usuario,
                Usuar_Correo = item.Usuar_Correo,
                Usuar_Contrasena = item.Usuar_Contrasena,
                Usuar_Admin = item.Usuar_Admin,
                Usuar_UltimaSesion = item.Usuar_UltimaSesion,
                Usuar_SuperPuntos = item.Usuar_SuperPuntos,
                Roles_Id = item.Roles_Id,
                Perso_Id = item.Perso_Id,
                Usuar_UsuarioCreacion = item.Usuar_UsuarioCreacion
            };

            var list = _accesoservicios.CrearUsua(modelo);
            return Ok(list);
        }

        [HttpGet("ObtenerUsuaID/{id}")]
        public IActionResult ObtenerUsuaID(int id)
        {
            var estado = _accesoservicios.LlenarUsu(id);
            var camp = estado.First();
            return Ok(camp);
        }

        [HttpGet("Login/{usuario},{contraseña}")]
        public IActionResult loginUsuario(string usuario, string contraseña)
        {
            var estado = _accesoservicios.LoginUsuario(usuario, contraseña);
            return Ok(estado);

        }

        

        [HttpGet("Detalle/{id}")]
        public IActionResult Detalle(int id)
        {
            var details = _accesoservicios.DetallesUsu(id);

            var detail = details.First();
            return Ok(detail);

        }


        [HttpPut("Actualizar/{id}")]
        public IActionResult Actualizar(UsuarioViewModel item)
        {
            var model = _mapper.Map<tbUsuarios>(item);
            var modelo = new tbUsuarios()
            {
                Usuar_Id = item.Usuar_Id,
                Usuar_Usuario = item.Usuar_Usuario,
                Usuar_Correo = item.Usuar_Correo,
                Perso_Id = item.Perso_Id,
                Roles_Id = item.Roles_Id,
                Usuar_Admin = item.Usuar_Admin,
                Usuar_SuperPuntos = item.Usuar_SuperPuntos,
                Usuar_UsuarioModificacion = item.Usuar_UsuarioModificacion
            };

            var list = _accesoservicios.ModificarUsua(modelo);
            return Ok(list);
        }


        [HttpDelete("Eliminar/{id}")]
        public IActionResult Eliminar(int? id)
        {
            var result = _accesoservicios.ElimUsua(id);

            return Ok(result);

        }


        


    }
}
