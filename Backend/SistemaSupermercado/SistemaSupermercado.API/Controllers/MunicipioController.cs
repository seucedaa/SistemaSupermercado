﻿using AutoMapper;
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
    public class MunicipioController : Controller
    {
        private readonly GeneralServicios _ServiciosGenerales;
        private readonly IMapper _mapper;

        public MunicipioController(GeneralServicios ServiciosGenerales, IMapper mapper)
        {

            _mapper = mapper;
            _ServiciosGenerales = ServiciosGenerales;


        }

        [HttpGet("List")]
        public IActionResult List()
        {
            var list = _ServiciosGenerales.ListarMuni();
            return Ok(list);
        }

        [HttpGet("ListporDept/{id}")]
        public IActionResult ListporDept(string id)
        {
            var list = _ServiciosGenerales.ListporDept(id);
            return Ok(list);
        }

        [HttpPost("Insertar")]
        public IActionResult Insertar(MunicipioViewModel item)
        {
            var modelo = new tbMunicipios()
            {
                Munic_Id = item.Munic_Id,
                Munic_Descripcion = item.Munic_Descripcion,
                Depar_Id = item.Depar_Id,
                Munic_UsuarioCreacion = item.Munic_UsuarioCreacion
            };

            var list = _ServiciosGenerales.CrearMuni(modelo);
            return Ok(list);
        }

        [HttpGet("ObtenerMuniID/{id}")]
        public IActionResult ObtenerMuniID(string id)
        {
            var estado = _ServiciosGenerales.LLenarMuni(id);
            var camp = estado.First();
            return Ok(camp);
        }


        [HttpGet("Detalle/{id}")]
        public IActionResult Detalle(string id)
        {
            var details = _ServiciosGenerales.DetallesMuni(id);

            var detail = details.First();
            return Ok(detail);

        }


        [HttpPut("Actualizar")]
        public IActionResult Actualizar(MunicipioViewModel item)
        {
            var modelo = new tbMunicipios()
            {
                Munic_Id = item.Munic_Id,
                Munic_Descripcion = item.Munic_Descripcion,
                Depar_Id = item.Depar_Id,
                Munic_UsuarioModificacion = item.Munic_UsuarioModificacion
            };

            var list = _ServiciosGenerales.ModificarMuni(modelo);
            return Ok(list);
        }

        [HttpDelete("Eliminar/{id}")]
        public IActionResult Eliminar(string id)
        {
            var result = _ServiciosGenerales.EliMuni(id);

            return Ok(result);

        }
    }
}
