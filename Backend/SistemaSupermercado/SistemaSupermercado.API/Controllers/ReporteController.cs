﻿using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SistemaSupermercado.BusinessLogic.Servicios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PdfSharpCore;
using PdfSharpCore.Pdf;
using TheArtOfDev.HtmlRenderer.PdfSharp;
using System.IO;

namespace SistemaSupermercado.API.Controllers
{
    [ApiController]
    [Route("Api/[controller]")]
    public class ReporteController : Controller
    {
        private readonly ReporteServices _reporteServices;
        private readonly IMapper _mapper;

        public ReporteController(ReporteServices reporteServices, IMapper mapper)
        {
            _mapper = mapper;
            _reporteServices = reporteServices;
        }
        [HttpGet("Stock/{Sucur_Id}")]
        public IActionResult reporteStock(int Sucur_Id)
        {
            var list = _reporteServices.reporteStock(Sucur_Id);
            return Ok(list);
        }

        [HttpGet("Generarpdf/{Sucur_Id}/{nombre}")]
        public async Task<IActionResult> Generarpdf(int Sucur_Id, string nombre)
        {
            var documento = new PdfDocument();
            string imagenurl = "https://seeklogo.com/images/S/supermercado-la-colonia-logo-5740E3DAFC-seeklogo.com.png";

            var productos = _reporteServices.reporteStock(Sucur_Id);

            string htmlcontenido = "<div style='width:100%;'>";
            htmlcontenido += "<div style='text-align: center;'>";
            htmlcontenido += "<img style='width: 200px;' src='" + imagenurl + "'/>";
            htmlcontenido += "</div>";

            htmlcontenido += "<table style='width:100%; border:none;'>";
            htmlcontenido += "<tr>";
            htmlcontenido += "<td>";
            //htmlcontenido += "<h2 style='margin: 0; font-weight: bold; color: green;'><b>LA COLONIA</b></h2>";
            htmlcontenido += "<h3 style='margin: 0; color: black; text-align: right;'><br>Reporte de Inventario</br></h3>";
            htmlcontenido += "</td>";
            htmlcontenido += "<td style='width: 30%; text-align: right;'>";
            htmlcontenido += "<p style='margin: 0; font-weight: bold; color: green;'>Fecha: </p>";
            htmlcontenido += "<p style='margin: 0; font-weight: bold; color: black;'> " + DateTime.Now.ToString("dd/MM/yyyy") + "</p>";
            htmlcontenido += "</td>";
            htmlcontenido += "</tr>";
            htmlcontenido += "</table>";
            htmlcontenido += "<hr/>";

            htmlcontenido += "<table style='width:100%; border:1px #000; margin-top:20px'>";
            htmlcontenido += "<thead style='font-weight:bold; color: white;'>";
            htmlcontenido += "<tr>";
            htmlcontenido += "<td style='border:1px #000; padding: 8px; background-color:green;'><b>Codigo Producto</b></td>";
            htmlcontenido += "<td style='border:1px #000; padding: 8px; background-color:green;'><b>Descripcion</b></td>";
            htmlcontenido += "<td style='border:1px #000; padding: 8px; background-color:green;'><b>Existencia</b></td>";
            htmlcontenido += "<td style='border:1px #000; padding: 8px; background-color:green;'><b>Precio Compra</b></td>";
            htmlcontenido += "<td style='border:1px #000; padding: 8px; background-color:green;'><b>Precio Venta</b></td>";
            htmlcontenido += "<td style='border:1px #000; padding: 8px; background-color:green;'><b>Categoria</b></td>";
            htmlcontenido += "<td style='border:1px #000; padding: 8px; background-color:green;'><b>Sub-Categoria</b></td>";
            htmlcontenido += "</tr>";
            htmlcontenido += "</thead>";

            htmlcontenido += "<tbody>";
            foreach (var producto in productos)
            {
                htmlcontenido += "<tr>";
                htmlcontenido += "<td style='border:1px #000; padding: 8px; color: black;'>" + producto.Produ_Id + "</td>";
                htmlcontenido += "<td style='border:1px #000; padding: 8px; color: black;'>" + producto.Produ_Descripcion + "</td>";
                htmlcontenido += "<td style='border:1px #000; padding: 8px; color: black;'>" + producto.Produ_Existencia + "</td>";
                htmlcontenido += "<td style='border:1px #000; padding: 8px; color: black;'>" + producto.Produ_PrecioCompra + "</td>";
                htmlcontenido += "<td style='border:1px #000; padding: 8px; color: black;'>" + producto.Produ_PrecioVenta + "</td>";
                htmlcontenido += "<td style='border:1px #000; padding: 8px; color: black;'>" + producto.Categ_Descripcion + "</td>";
                htmlcontenido += "<td style='border:1px #000; padding: 8px; color: black;'>" + producto.Subca_Descripcion + "</td>";
                htmlcontenido += "</tr>";
            }
            htmlcontenido += "<p style='margin: 0; font-weight: bold;'> Emitido por: " + nombre + " </p>";
            htmlcontenido += "<p style='margin: 0; font-weight: bold;'> En la fecha" + DateTime.Now.ToString("dd/MM/yyyy") + "</p>";
            htmlcontenido += "</tbody>";

            htmlcontenido += "</table>";

            PdfGenerator.AddPdfPages(documento, htmlcontenido, PageSize.A4);
            byte[]? response = null;
            using (MemoryStream ms = new MemoryStream())
            {
                documento.Save(ms);
                response = ms.ToArray();
            }
            string titulo = "Reporte Inventario.pdf";
            return File(response, "application/pdf", titulo);
        }


        [HttpGet("Generarpdf2/{nombre}")]
        public async Task<IActionResult> Generarpdf2(string nombre)
        {
            var documento = new PdfDocument();
            string imagenurl = "https://seeklogo.com/images/S/supermercado-la-colonia-logo-5740E3DAFC-seeklogo.com.png";

            var productos = _reporteServices.TodasStock();

            string htmlcontenido = "<div style='width:100%;'>";
            htmlcontenido += "<div style='text-align: center;'>";
            htmlcontenido += "<img style='width: 200px;' src='" + imagenurl + "'/>";
            htmlcontenido += "</div>";

            htmlcontenido += "<table style='width:100%; border:none;'>";
            htmlcontenido += "<tr>";
            htmlcontenido += "<td>";
            //htmlcontenido += "<h2 style='margin: 0; font-weight: bold; color: green;'><b>LA COLONIA</b></h2>";
            htmlcontenido += "<h3 style='margin: 0; color: black; text-align: right;'><b>REPORTE DE INVENTARIO</b></h3>";
            htmlcontenido += "</td>";
            htmlcontenido += "<td style='width: 30%; text-align: right;'>";
            htmlcontenido += "<p style='margin: 0; font-weight: bold; color: green;'>Fecha: </p>";
            htmlcontenido += "<p style='margin: 0; font-weight: bold; color: black;'> " + DateTime.Now.ToString("dd/MM/yyyy") + "</p>";
            htmlcontenido += "</td>";
            htmlcontenido += "</tr>";
            htmlcontenido += "</table>";
            htmlcontenido += "<hr/>";

            htmlcontenido += "<table style='width:100%; border:1px #000; margin-top:20px'>";
            htmlcontenido += "<thead style='font-weight:bold; color: white;'>";
            htmlcontenido += "<tr>";
            htmlcontenido += "<td style='border:1px #000; padding: 8px; background-color:green;'><b>Codigo Producto</b></td>";
            htmlcontenido += "<td style='border:1px #000; padding: 8px; background-color:green;'><b>Descripcion</b></td>";
            htmlcontenido += "<td style='border:1px #000; padding: 8px; background-color:green;'><b>Existencia</b></td>";
            htmlcontenido += "<td style='border:1px #000; padding: 8px; background-color:green;'><b>Precio Compra</b></td>";
            htmlcontenido += "<td style='border:1px #000; padding: 8px; background-color:green;'><b>Precio Venta</b></td>";
            htmlcontenido += "<td style='border:1px #000; padding: 8px; background-color:green;'><b>Categoria</b></td>";
            htmlcontenido += "<td style='border:1px #000; padding: 8px; background-color:green;'><b>Sub-Categoria</b></td>";
            htmlcontenido += "</tr>";
            htmlcontenido += "</thead>";

            htmlcontenido += "<tbody>";
            foreach (var producto in productos)
            {
                htmlcontenido += "<tr>";
                htmlcontenido += "<td style='border:1px #000; padding: 8px; color: black;'>" + producto.Produ_Id + "</td>";
                htmlcontenido += "<td style='border:1px #000; padding: 8px; color: black;'>" + producto.Produ_Descripcion + "</td>";
                htmlcontenido += "<td style='border:1px #000; padding: 8px; color: black;'>" + producto.Produ_Existencia + "</td>";
                htmlcontenido += "<td style='border:1px #000; padding: 8px; color: black;'>" + producto.Produ_PrecioCompra + "</td>";
                htmlcontenido += "<td style='border:1px #000; padding: 8px; color: black;'>" + producto.Produ_PrecioVenta + "</td>";
                htmlcontenido += "<td style='border:1px #000; padding: 8px; color: black;'>" + producto.Categ_Descripcion + "</td>";
                htmlcontenido += "<td style='border:1px #000; padding: 8px; color: black;'>" + producto.Subca_Descripcion + "</td>";
                htmlcontenido += "</tr>";
            }
            htmlcontenido += "</tbody>";

            htmlcontenido += "</table>";

            PdfGenerator.AddPdfPages(documento, htmlcontenido, PageSize.A4);
            byte[]? response = null;
            using (MemoryStream ms = new MemoryStream())
            {
                documento.Save(ms);
                response = ms.ToArray();
            }
            string titulo = "Reporte Inventario.pdf";
            return File(response, "application/pdf", titulo);
        }

        [HttpGet("PDFProductos/{Sucur_Id}/{inicio}/{fin}/{nombre}")]
        public async Task<IActionResult> PDFProductos(int Sucur_Id, string inicio, string fin,string nombre)
        {
            var documento = new PdfDocument();
            string imagenurl = "https://seeklogo.com/images/S/supermercado-la-colonia-logo-5740E3DAFC-seeklogo.com.png";

            var productos = _reporteServices.PDFProductos(Sucur_Id,inicio,fin);

            string htmlcontenido = "<div style='width:100%;'>";
            htmlcontenido += "<div style='text-align: center;'>";
            htmlcontenido += "<img style='width: 200px;' src='" + imagenurl + "'/>";
            htmlcontenido += "</div>";

            htmlcontenido += "<table style='width:100%; border:none;'>";
            htmlcontenido += "<tr>";
            htmlcontenido += "<td>";
            //htmlcontenido += "<h2 style='margin: 0; font-weight: bold; color: green;'><b>LA COLONIA</b></h2>";
            htmlcontenido += "<h3 style='margin: 0; color: black; text-align: right;'><b>REPORTE DE PRODUCTOS</b></h3>";
            htmlcontenido += "</td>";
            htmlcontenido += "<td style='width: 30%; text-align: right;'>";
            htmlcontenido += "<p style='margin: 0; font-weight: bold; color: green;'>Fecha: </p>";
            htmlcontenido += "<p style='margin: 0; font-weight: bold; color: black;'> " + DateTime.Now.ToString("dd/MM/yyyy") + "</p>";
            htmlcontenido += "</td>";
            htmlcontenido += "</tr>";
            htmlcontenido += "</table>";
            htmlcontenido += "<hr/>";

            htmlcontenido += "<table style='width:100%; border:1px #000; margin-top:20px'>";
            htmlcontenido += "<thead style='font-weight:bold; color: white;'>";
            htmlcontenido += "<tr>";
            htmlcontenido += "<td style='border:1px #000; padding: 8px; background-color:green;'><b>Codigo Producto</b></td>";
            htmlcontenido += "<td style='border:1px #000; padding: 8px; background-color:green;'><b>Descripcion</b></td>";
            htmlcontenido += "<td style='border:1px #000; padding: 8px; background-color:green;'><b>Proveedor</b></td>";
            htmlcontenido += "<td style='border:1px #000; padding: 8px; background-color:green;'><b>Precio Venta</b></td>";
            htmlcontenido += "<td style='border:1px #000; padding: 8px; background-color:green;'><b>Categoria</b></td>";
            htmlcontenido += "<td style='border:1px #000; padding: 8px; background-color:green;'><b>Sub-Categoria</b></td>";
            htmlcontenido += "<td style='border:1px #000; padding: 8px; background-color:green;'><b>Vendidos</b></td>";
            htmlcontenido += "</tr>";
            htmlcontenido += "</thead>";

            htmlcontenido += "<tbody>";
            foreach (var producto in productos)
            {
                htmlcontenido += "<tr>";
                htmlcontenido += "<td style='border:1px #000; padding: 8px; color: black;'>" + producto.Produ_Id + "</td>";
                htmlcontenido += "<td style='border:1px #000; padding: 8px; color: black;'>" + producto.Produ_Descripcion + "</td>";
                htmlcontenido += "<td style='border:1px #000; padding: 8px; color: black;'>" + producto.Prove_Marca + "</td>";
                htmlcontenido += "<td style='border:1px #000; padding: 8px; color: black;'>" + producto.Produ_PrecioVenta + "</td>";
                htmlcontenido += "<td style='border:1px #000; padding: 8px; color: black;'>" + producto.Categ_Descripcion + "</td>";
                htmlcontenido += "<td style='border:1px #000; padding: 8px; color: black;'>" + producto.Subca_Descripcion + "</td>";
                htmlcontenido += "<td style='border:1px #000; padding: 8px; color: black;'>" + producto.Cantidad + "</td>";
                htmlcontenido += "</tr>";
            }
            htmlcontenido += "</tbody>";

            htmlcontenido += "</table>";

            PdfGenerator.AddPdfPages(documento, htmlcontenido, PageSize.A4);
            byte[]? response = null;
            using (MemoryStream ms = new MemoryStream())
            {
                documento.Save(ms);
                response = ms.ToArray();
            }
            string titulo = "Reporte de Productos.pdf";
            return File(response, "application/pdf", titulo);
        }


        [HttpGet("PDFProductos2/{inicio}/{fin}/{nombre}")]
        public async Task<IActionResult> PDFProductos2(string inicio, string fin,string nombre)
        {
            var documento = new PdfDocument();
            string imagenurl = "https://seeklogo.com/images/S/supermercado-la-colonia-logo-5740E3DAFC-seeklogo.com.png";

            var productos = _reporteServices.PDFProductos2(inicio, fin);

            string htmlcontenido = "<div style='width:100%;'>";
            htmlcontenido += "<div style='text-align: center;'>";
            htmlcontenido += "<img style='width: 200px;' src='" + imagenurl + "'/>";
            htmlcontenido += "</div>";

            htmlcontenido += "<table style='width:100%; border:none;'>";
            htmlcontenido += "<tr>";
            htmlcontenido += "<td>";
            //htmlcontenido += "<h2 style='margin: 0; font-weight: bold; color: green;'><b>LA COLONIA</b></h2>";
            htmlcontenido += "<h3 style='margin: 0; color: black; text-align: right;'><b>REPORTE DE PRODUCTOS</b></h3>";
            htmlcontenido += "</td>";
            htmlcontenido += "<td style='width: 30%; text-align: right;'>";
            htmlcontenido += "<p style='margin: 0; font-weight: bold; color: green;'>Fecha: </p>";
            htmlcontenido += "<p style='margin: 0; font-weight: bold; color: black;'> " + DateTime.Now.ToString("dd/MM/yyyy") + "</p>";
            htmlcontenido += "</td>";
            htmlcontenido += "</tr>";
            htmlcontenido += "</table>";
            htmlcontenido += "<hr/>";

            htmlcontenido += "<table style='width:100%; border:1px #000; margin-top:20px'>";
            htmlcontenido += "<thead style='font-weight:bold; color: white;'>";
            htmlcontenido += "<tr>";
            htmlcontenido += "<td style='border:1px #000; padding: 8px; background-color:green;'><b>Codigo Producto</b></td>";
            htmlcontenido += "<td style='border:1px #000; padding: 8px; background-color:green;'><b>Descripcion</b></td>";
            htmlcontenido += "<td style='border:1px #000; padding: 8px; background-color:green;'><b>Proveedor</b></td>";
            htmlcontenido += "<td style='border:1px #000; padding: 8px; background-color:green;'><b>Precio Venta</b></td>";
            htmlcontenido += "<td style='border:1px #000; padding: 8px; background-color:green;'><b>Categoria</b></td>";
            htmlcontenido += "<td style='border:1px #000; padding: 8px; background-color:green;'><b>Sub-Categoria</b></td>";
            htmlcontenido += "<td style='border:1px #000; padding: 8px; background-color:green;'><b>Vendidos</b></td>";
            htmlcontenido += "</tr>";
            htmlcontenido += "</thead>";

            htmlcontenido += "<tbody>";
            foreach (var producto in productos)
            {
                htmlcontenido += "<tr>";
                htmlcontenido += "<td style='border:1px #000; padding: 8px; color: black;'>" + producto.Produ_Id + "</td>";
                htmlcontenido += "<td style='border:1px #000; padding: 8px; color: black;'>" + producto.Produ_Descripcion + "</td>";
                htmlcontenido += "<td style='border:1px #000; padding: 8px; color: black;'>" + producto.Prove_Marca + "</td>";
                htmlcontenido += "<td style='border:1px #000; padding: 8px; color: black;'>" + producto.Produ_PrecioVenta + "</td>";
                htmlcontenido += "<td style='border:1px #000; padding: 8px; color: black;'>" + producto.Categ_Descripcion + "</td>";
                htmlcontenido += "<td style='border:1px #000; padding: 8px; color: black;'>" + producto.Subca_Descripcion + "</td>";
                htmlcontenido += "<td style='border:1px #000; padding: 8px; color: black;'>" + producto.Cantidad + "</td>";
                htmlcontenido += "</tr>";
            }
            htmlcontenido += "</tbody>";

            htmlcontenido += "</table>";

            PdfGenerator.AddPdfPages(documento, htmlcontenido, PageSize.A4);
            byte[]? response = null;
            using (MemoryStream ms = new MemoryStream())
            {
                documento.Save(ms);
                response = ms.ToArray();
            }
            string titulo = "Reporte de Productos.pdf";
            return File(response, "application/pdf", titulo);
        }

        [HttpGet("PDFClientes/{inicio}/{fin}/{nombre}")]
        public async Task<IActionResult> PDFClientes(string inicio, string fin,string nombre)
        {
            var documento = new PdfDocument();
            string imagenurl = "https://seeklogo.com/images/S/supermercado-la-colonia-logo-5740E3DAFC-seeklogo.com.png";

            var clientes = _reporteServices.PDFClientes(inicio, fin);

            string htmlcontenido = "<div style='width:100%;'>";
            htmlcontenido += "<div style='text-align: center;'>";
            htmlcontenido += "<img style='width: 200px;' src='" + imagenurl + "'/>";
            htmlcontenido += "</div>";

            htmlcontenido += "<table style='width:100%; border:none;'>";
            htmlcontenido += "<tr>";
            htmlcontenido += "<td>";
            //htmlcontenido += "<h2 style='margin: 0; font-weight: bold; color: green;'><b>LA COLONIA</b></h2>";
            htmlcontenido += "<h3 style='margin: 0; color: black; text-align: right;'><b>REPORTE DE CLIENTES</b></h3>";
            htmlcontenido += "</td>";
            htmlcontenido += "<td style='width: 30%; text-align: right;'>";
            htmlcontenido += "<p style='margin: 0; font-weight: bold; color: green;'>Fecha: </p>";
            htmlcontenido += "<p style='margin: 0; font-weight: bold; color: black;'> " + DateTime.Now.ToString("dd/MM/yyyy") + "</p>";
            htmlcontenido += "<p style='margin: 0; font-weight: bold; color: green;'>Total:  </p>";
            htmlcontenido += "<p style='margin: 0; font-weight: bold; color: black;'> " + clientes.Count() + "</p>";
            htmlcontenido += "</td>";
            htmlcontenido += "</tr>";
            htmlcontenido += "</table>";
            htmlcontenido += "<hr/>";

            htmlcontenido += "<table style='width:100%; border:1px #000; margin-top:20px'>";
            htmlcontenido += "<thead style='font-weight:bold; color: white;'>";
            htmlcontenido += "<tr>";
            htmlcontenido += "<td style='border:1px #000; padding: 8px; background-color:green;'><b>Identidad</b></td>";
            htmlcontenido += "<td style='border:1px #000; padding: 8px; background-color:green;'><b>Nombre</b></td>";
            htmlcontenido += "<td style='border:1px #000; padding: 8px; background-color:green;'><b>Estado Civil</b></td>";
            htmlcontenido += "<td style='border:1px #000; padding: 8px; background-color:green;'><b>Sexo</b></td>";
            htmlcontenido += "<td style='border:1px #000; padding: 8px; background-color:green;'><b>Telefono</b></td>";
            htmlcontenido += "<td style='border:1px #000; padding: 8px; background-color:green;'><b>Direccion</b></td>";
            htmlcontenido += "<td style='border:1px #000; padding: 8px; background-color:green;'><b>Fecha Registro</b></td>";
            htmlcontenido += "</tr>";
            htmlcontenido += "</thead>";

            htmlcontenido += "<tbody>";
            foreach (var cliente in clientes)
            {
                htmlcontenido += "<tr>";
                htmlcontenido += "<td style='border:1px #000; padding: 8px; color: black;'>" + cliente.Clien_Dni + "</td>";
                htmlcontenido += "<td style='border:1px #000; padding: 8px; color: black;'>" + cliente.Clien_NombreCompleto + "</td>";
                htmlcontenido += "<td style='border:1px #000; padding: 8px; color: black;'>" + cliente.Estad_Descripcion + "</td>";
                htmlcontenido += "<td style='border:1px #000; padding: 8px; color: black;'>" + cliente.Clien_Sexo + "</td>";
                htmlcontenido += "<td style='border:1px #000; padding: 8px; color: black;'>" + cliente.Clien_Telefono + "</td>";
                htmlcontenido += "<td style='border:1px #000; padding: 8px; color: black;'>" + cliente.Clien_Direccion + "</td>";
                htmlcontenido += "<td style='border:1px #000; padding: 8px; color: black;'>" + cliente.Clien_FechaCreacion + "</td>";
                htmlcontenido += "</tr>";
            }
            htmlcontenido += "</tbody>";

            htmlcontenido += "</table>";

            PdfGenerator.AddPdfPages(documento, htmlcontenido, PageSize.A4);
            byte[]? response = null;
            using (MemoryStream ms = new MemoryStream())
            {
                documento.Save(ms);
                response = ms.ToArray();
            }
            string titulo = "Reporte de Clientes.pdf";
            return File(response, "application/pdf", titulo);
        }

        [HttpGet("PDFVentas/{sucursal}/{inicio}/{fin}/{nombre}")]
        public async Task<IActionResult> PDFVentas(int sucursal,string inicio, string fin, string nombre)
        {
            var documento = new PdfDocument();
            string imagenurl = "https://seeklogo.com/images/S/supermercado-la-colonia-logo-5740E3DAFC-seeklogo.com.png";

            var ventas = _reporteServices.PDFVentas(sucursal,inicio, fin);

            string htmlcontenido = "<div style='width:100%;'>";
            htmlcontenido += "<div style='text-align: center;'>";
            htmlcontenido += "<img style='width: 200px;' src='" + imagenurl + "'/>";
            htmlcontenido += "</div>";

            htmlcontenido += "<table style='width:100%; border:none;'>";
            htmlcontenido += "<tr>";
            htmlcontenido += "<td>";
            //htmlcontenido += "<h2 style='margin: 0; font-weight: bold; color: green;'><b>LA COLONIA</b></h2>";
            htmlcontenido += "<h3 style='margin: 0; color: black; text-align: right;'><b>REPORTE DE VENTAS</b></h3>";
            htmlcontenido += "</td>";
            htmlcontenido += "<td style='width: 30%; text-align: right;'>";
            htmlcontenido += "<p style='margin: 0; font-weight: bold; color: green;'>Fecha: </p>";
            htmlcontenido += "<p style='margin: 0; font-weight: bold; color: black;'> " + DateTime.Now.ToString("dd/MM/yyyy") + "</p>";
            htmlcontenido += "<p style='margin: 0; font-weight: bold; color: green;'>Total:  </p>";
            htmlcontenido += "<p style='margin: 0; font-weight: bold; color: black;'> " + ventas.Count() + "</p>";
            htmlcontenido += "</td>";
            htmlcontenido += "</tr>";
            htmlcontenido += "</table>";
            htmlcontenido += "<hr/>";
            string sucur = "";

            foreach (var venta in ventas)
            {
                sucur = venta.Sucur_Descripcion;
            }
            htmlcontenido += "<p style='color:green;'>Sucursal: </p><p>" + sucur + "</p>";

            htmlcontenido += "<table style='width:100%; border:1px #000; margin-top:20px'>";
            htmlcontenido += "<thead style='font-weight:bold; color: white;'>";
            htmlcontenido += "<tr>";
            htmlcontenido += "<td style='border:1px #000; padding: 8px; background-color:green;'><b>Codigo</b></td>";
            htmlcontenido += "<td style='border:1px #000; padding: 8px; background-color:green;'><b>Fecha Venta</b></td>";
            htmlcontenido += "<td style='border:1px #000; padding: 8px; background-color:green;'><b>Persona</b></td>";
            htmlcontenido += "<td style='border:1px #000; padding: 8px; background-color:green;'><b>Tipo</b></td>";
            htmlcontenido += "<td style='border:1px #000; padding: 8px; background-color:green;'><b>Metodo Pago</b></td>";
            htmlcontenido += "</tr>";
            htmlcontenido += "</thead>";

            htmlcontenido += "<tbody>";
            foreach (var venta in ventas)
            {
                htmlcontenido += "<tr>";
                htmlcontenido += "<td style='border:1px #000; padding: 8px; color: black;'>" + venta.Venen_Id + "</td>";
                htmlcontenido += "<td style='border:1px #000; padding: 8px; color: black;'>" + venta.Venen_FechaCreacion + "</td>";
                htmlcontenido += "<td style='border:1px #000; padding: 8px; color: black;'>" + venta.Persona + "</td>";
                htmlcontenido += "<td style='border:1px #000; padding: 8px; color: black;'>" + venta.Tipo + "</td>";
                htmlcontenido += "<td style='border:1px #000; padding: 8px; color: black;'>" + venta.Tipo_Descripcion + "</td>";
                htmlcontenido += "</tr>";
            }
            htmlcontenido += "</tbody>";

            htmlcontenido += "</table>";

            PdfGenerator.AddPdfPages(documento, htmlcontenido, PageSize.A4);
            byte[]? response = null;
            using (MemoryStream ms = new MemoryStream())
            {
                documento.Save(ms);
                response = ms.ToArray();
            }
            string titulo = "Reporte de Ventas.pdf";
            return File(response, "application/pdf", titulo);
        }


        [HttpGet("PDFVentas2/{inicio}/{fin}/{nombre}")]
        public async Task<IActionResult> PDFVentas2(string inicio, string fin, string nombre)
        {
            var documento = new PdfDocument();
            string imagenurl = "https://seeklogo.com/images/S/supermercado-la-colonia-logo-5740E3DAFC-seeklogo.com.png";

            var ventas = _reporteServices.PDFVentas2(inicio, fin);

            string htmlcontenido = "<div style='width:100%;'>";
            htmlcontenido += "<div style='text-align: center;'>";
            htmlcontenido += "<img style='width: 200px;' src='" + imagenurl + "'/>";
            htmlcontenido += "</div>";

            htmlcontenido += "<table style='width:100%; border:none;'>";
            htmlcontenido += "<tr>";
            htmlcontenido += "<td>";
            //htmlcontenido += "<h2 style='margin: 0; font-weight: bold; color: green;'><b>LA COLONIA</b></h2>";
            htmlcontenido += "<h3 style='margin: 0; color: black; text-align: right;'><b>REPORTE DE VENTAS</b></h3>";
            htmlcontenido += "</td>";
            htmlcontenido += "<td style='width: 30%; text-align: right;'>";
            htmlcontenido += "<p style='margin: 0; font-weight: bold; color: green;'>Fecha: </p>";
            htmlcontenido += "<p style='margin: 0; font-weight: bold; color: black;'> " + DateTime.Now.ToString("dd/MM/yyyy") + "</p>";
            htmlcontenido += "<p style='margin: 0; font-weight: bold; color: green;'>Total:  </p>";
            htmlcontenido += "<p style='margin: 0; font-weight: bold; color: black;'> " + ventas.Count() + "</p>";
            htmlcontenido += "</td>";
            htmlcontenido += "</tr>";
            htmlcontenido += "</table>";
            htmlcontenido += "<hr/>";

            htmlcontenido += "<table style='width:100%; border:1px #000; margin-top:20px'>";
            htmlcontenido += "<thead style='font-weight:bold; color: white;'>";
            htmlcontenido += "<tr>";
            htmlcontenido += "<td style='border:1px #000; padding: 8px; background-color:green;'><b>Codigo</b></td>";
            htmlcontenido += "<td style='border:1px #000; padding: 8px; background-color:green;'><b>Fecha Venta</b></td>";
            htmlcontenido += "<td style='border:1px #000; padding: 8px; background-color:green;'><b>Sucursal</b></td>";
            htmlcontenido += "<td style='border:1px #000; padding: 8px; background-color:green;'><b>Persona</b></td>";
            htmlcontenido += "<td style='border:1px #000; padding: 8px; background-color:green;'><b>Tipo</b></td>";
            htmlcontenido += "<td style='border:1px #000; padding: 8px; background-color:green;'><b>Metodo Pago</b></td>";
            htmlcontenido += "</tr>";
            htmlcontenido += "</thead>";

            htmlcontenido += "<tbody>";
            foreach (var venta in ventas)
            {
                htmlcontenido += "<tr>";
                htmlcontenido += "<td style='border:1px #000; padding: 8px; color: black;'>" + venta.Venen_Id + "</td>";
                htmlcontenido += "<td style='border:1px #000; padding: 8px; color: black;'>" + venta.Venen_FechaCreacion + "</td>";
                htmlcontenido += "<td style='border:1px #000; padding: 8px; color: black;'>" + venta.Sucur_Descripcion + "</td>";
                htmlcontenido += "<td style='border:1px #000; padding: 8px; color: black;'>" + venta.Persona + "</td>";
                htmlcontenido += "<td style='border:1px #000; padding: 8px; color: black;'>" + venta.Tipo + "</td>";
                htmlcontenido += "<td style='border:1px #000; padding: 8px; color: black;'>" + venta.Tipo_Descripcion + "</td>";
                htmlcontenido += "</tr>";
            }
            htmlcontenido += "</tbody>";

            htmlcontenido += "</table>";

            PdfGenerator.AddPdfPages(documento, htmlcontenido, PageSize.A4);
            byte[]? response = null;
            using (MemoryStream ms = new MemoryStream())
            {
                documento.Save(ms);
                response = ms.ToArray();
            }
            string titulo = "Reporte de Ventas.pdf";
            return File(response, "application/pdf", titulo);
        }

    }
}
