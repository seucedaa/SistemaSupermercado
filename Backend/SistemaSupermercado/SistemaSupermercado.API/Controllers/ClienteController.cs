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
    public class ClienteController : Controller
    {
        private readonly VentaServicio _ventaServicio;
        private readonly IMapper _mapper;

        public ClienteController(VentaServicio ventaServicio, IMapper mapper)
        {
            _mapper = mapper;
            _ventaServicio = ventaServicio;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost("Registrarse")]
        public IActionResult Registrarse(ClienteViewModel item)
        {
            var model = _mapper.Map<tbClientes>(item);
            var modelo = new tbClientes()
            {
                Clien_DNI = item.Clien_DNI,
                Clien_PrimerNombre = item.Clien_PrimerNombre,
                Clien_SegundoNombre = item.Clien_SegundoNombre,
                Clien_PrimerApellido = item.Clien_PrimerApellido,
                Clien_SegundoApellido = item.Clien_SegundoApellido,
                Clien_Sexo = item.Clien_Sexo,
                Estad_Id = item.Estad_Id,
                Clien_Telefono = item.Clien_Telefono,
                Munic_Id = item.Munic_Id,
                Clien_Direccion = item.Clien_Direccion,
                Usuar_Usuario = item.Usuar_Usuario,
                Usuar_Contrasena = item.Usuar_Contrasena
            };

            var list = _ventaServicio.Registrar(modelo);
            return Ok(list);
        }
    }
}
