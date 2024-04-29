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
                Usua_Usuario = item.Usua_Usuario,
                Usua_Contraseña = item.Usua_Contraseña,
                Usua_EsAdmin = item.Usua_EsAdmin,
                Role_Id = item.Role_Id,
                Perso_Id = item.Perso_Id,
                Usua_UsuarioCreacion = item.Usua_UsuarioCreacion.ToString()
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

        [HttpPost("Registrarse")]
        public IActionResult Registrarse(PersonaViewModel item)
        {
            var model = _mapper.Map<tbPersonas>(item);
            var modelo = new tbPersonas()
            {
                Perso_DNI = item.Perso_DNI,
                Perso_Nombre = item.Perso_Nombre,
                Perso_Apellido = item.Perso_Apellido,
                Perso_Correo = item.Perso_Correo,
                Perso_FechaNacimiento = item.Perso_FechaNacimiento,
                Perso_Sexo = item.Perso_Sexo,
                Perso_Direccion = item.Perso_Direccion,
                Estc_Id = item.Estc_Id,
                Ciud_id = item.Ciud_id,
                Usua_Usuario = item.Usua_Usuario,
                Usua_Contraseña = item.Usua_Contraseña,
                Regi_MiCredito = item.Regi_MiCredito,
            };

            var list = _accesoservicios.Registrar(modelo);
            return Ok(list);
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
                Usua_Id = item.Usua_Id,
                Usua_Usuario = item.Usua_Usuario,
                Usua_EsAdmin = item.Usua_EsAdmin,
                Role_Id = item.Role_Id,
                Perso_Id = item.Perso_Id,
                Usua_UsuarioModificacion = item.Usua_UsuarioModificacion.ToString()
            };

            var list = _accesoservicios.ActualizarUsua(modelo);
            return Ok(list);
        }

        [HttpPut("Reestablecer/{codigo},{contrasena}")]
        public IActionResult Reestablecer(string codigo, string contrasena)
        {

            var list = _accesoservicios.Reestablecer(codigo, contrasena);
            return Ok(list);
        }

        [HttpDelete("Eliminar/{id}")]
        public IActionResult Eliminar(int? id)
        {
            var result = _accesoservicios.ElimUsua(id);

            return Ok(result);

        }




        [HttpGet("StartRecovery/{usuario}")]
        public IActionResult StartRecovery(string usuario)
        {
            Random random = new Random();

            string codigo = random.Next(10000, 100000).ToString();

            //Obtener correo
            var details = _accesoservicios.obtenerCorreo(usuario);

            var detail = details.First();

            string correo = detail.Perso_Correo;

            if (!string.IsNullOrEmpty(correo))
            {
                _accesoservicios.InsertarCodigo(usuario, codigo);
                MailData mailData = new MailData();
                mailData.EmailToId = correo;
                mailData.EmailToName = "Correo de Reestablecimiento";
                mailData.EmailSubject = "Codigo para reestablecer contraseña";
                mailData.EmailBody = "Codigo " + codigo;
                _mailService.SendMail(mailData);
            }

            return Ok(detail);
        }


    }
}
