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
    public class SubCategoriaController : Controller
    {
        private readonly GeneralServicios _ServiciosGenerales;
        private readonly IMapper _mapper;

        public SubCategoriaController(GeneralServicios ServiciosGenerales, IMapper mapper)
        {

            _mapper = mapper;
            _ServiciosGenerales = ServiciosGenerales;


        }

        [HttpGet("TotalSub/{sucursal}/{inicio}/{fin}")]
        public IActionResult TotalSub(int sucursal, string inicio, string fin)
        {
            var estado = _ServiciosGenerales.TotalSub(sucursal, inicio, fin);
            return Ok(estado);

        }
        [HttpGet("Todas/{inicio}/{fin}")]
        public IActionResult Todas(string inicio, string fin)
        {
            var estado = _ServiciosGenerales.TodasSub(inicio, fin);
            return Ok(estado);

        }

        [HttpGet("List")]
        public IActionResult List()
        {
            var list = _ServiciosGenerales.ListarSubCate();
            return Ok(list);
        }

        [HttpGet("DropDownList/{Categ_Id}")]
        public IActionResult DropDownList(int Categ_Id)
        {
            var list = _ServiciosGenerales.DropDownListSubca(Categ_Id);
            return Ok(list);
        }

        [HttpPost("Insertar")]
        public IActionResult Insertar(SubCategoriaViewModel item)
        {
            var model = _mapper.Map<tbSubcategorias>(item);
            var modelo = new tbSubcategorias()
            {
                Subca_Descripcion = item.Subca_Descripcion,
                Categ_Id = item.Categ_Id,
                Subca_UsuarioCreacion = item.Subca_UsuarioCreacion
            };

            var list = _ServiciosGenerales.CrearSubCate(modelo);
            return Ok(list);
        }

        [HttpGet("ObtenerSubCaID/{id}")]
        public IActionResult ObtenerSubCaID(int id)
        {
            var estado = _ServiciosGenerales.LLenarSubCate(id);
            var camp = estado.First();
            return Ok(camp);
        }


        [HttpGet("Detalle/{id}")]
        public IActionResult Detalle(int id)
        {
            var details = _ServiciosGenerales.BuscarubCate(id);

            var detail = details.First();
            return Ok(detail);

        }


        [HttpPut("Actualizar")]
        public IActionResult Actualizar(SubCategoriaViewModel item)
        {
            var modelo = new tbSubcategorias()
            {
                Subca_Id = item.Subca_Id,
                Subca_Descripcion = item.Subca_Descripcion,
                Categ_Id = item.Categ_Id,
                Subca_UsuarioModificacion = item.Subca_UsuarioModificacion
            };

            var list = _ServiciosGenerales.ModificarSubCate(modelo);
            return Ok(list);
        }

        [HttpDelete("Eliminar/{id}")]
        public IActionResult Eliminar(int id)
        {
            var result = _ServiciosGenerales.EliSubCategoria(id);

            return Ok(result);

        }
    }
}
