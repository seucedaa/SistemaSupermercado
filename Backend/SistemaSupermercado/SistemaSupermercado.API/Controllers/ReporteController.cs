using AutoMapper;
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


        [HttpGet("Generarpdf/{Sucur_Id}")]
        public async Task<IActionResult> Generarpdf(int Sucur_Id)
        {
            var documento = new PdfDocument();
            string imagenurl = "https://seeklogo.com/images/S/supermercado-la-colonia-logo-5740E3DAFC-seeklogo.com.png";

            var productos = _reporteServices.reporteStock(Sucur_Id);

            string htmlcontenido = "<div style='width:100%; text-align:center'>";
            htmlcontenido += "<img style='witdh:250px;' src='" + imagenurl + "'/>";
            htmlcontenido += "<h2>La colonia</h2>";
            htmlcontenido += "<h3>Reporte de Inventario</h3>";
            htmlcontenido += "<p>Fecha: " + DateTime.Now.ToString("dd/MM/yyyy") + "</p>";
            htmlcontenido += "</div>";

            htmlcontenido += "<table style='width:100%; border:1px solid #000'>";
            htmlcontenido += "<thead style='font-weight:bold'>";
            htmlcontenido += "<tr>";
            htmlcontenido += "<td style='border:1px solid #000'>Codigo producto</td>";
            htmlcontenido += "<td style='border:1px solid #000'>Descripcion</td>";
            htmlcontenido += "<td style='border:1px solid #000'>Existencia</td>";
            htmlcontenido += "<td style='border:1px solid #000'>Precio compra</td>";
            htmlcontenido += "<td style='border:1px solid #000'>Precio venta</td>";
            htmlcontenido += "<td style='border:1px solid #000'>Categoria</td>";
            htmlcontenido += "<td style='border:1px solid #000'>Subcategoria</td>";
            htmlcontenido += "</tr>";
            htmlcontenido += "</thead>";

            htmlcontenido += "<tbody>";
            foreach (var producto in productos)
            {
                htmlcontenido += "<tr>";
                htmlcontenido += "<td>" + producto.Produ_Id + "</td>";
                htmlcontenido += "<td>" + producto.Produ_Descripcion + "</td>";
                htmlcontenido += "<td>" + producto.Produ_Existencia + "</td>";
                htmlcontenido += "<td>" + producto.Produ_PrecioCompra + "</td>";
                htmlcontenido += "<td>" + producto.Produ_PrecioVenta + "</td>";
                htmlcontenido += "<td>" + producto.Categ_Descripcion + "</td>";
                htmlcontenido += "<td>" + producto.Subca_Descripcion + "</td>";
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
        [HttpGet("Generarpdf2")]
        public async Task<IActionResult> Generarpdf2()
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
            htmlcontenido += "<td style='border:1px #000; padding: 8px; background-color:green;'><b>Precio Centa</b></td>";
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

        [HttpGet("PDFVentas")]
        public async Task<IActionResult> PDFVentas(int Sucur_Id, string inicio, string fin)
        {
            var documento = new PdfDocument();
            string imagenurl = "https://seeklogo.com/images/S/supermercado-la-colonia-logo-5740E3DAFC-seeklogo.com.png";


            var productos = _reporteServices.PDFVentas(Sucur_Id, inicio, fin);

            string htmlcontenido = "<div style='width:100%; text-align:center'>";
            htmlcontenido += "<img style='witdh:250px;' src='" + imagenurl + "'/>";
            htmlcontenido += "<h2>La colonia</h2>";
            htmlcontenido += "<h3>Reporte de Inventario</h3>";
            htmlcontenido += "<p>Fecha: " + DateTime.Now.ToString("dd/MM/yyyy") + "</p>";
            htmlcontenido += "</div>";
            
            htmlcontenido += "<table style='width:100%; border:1px solid #000'>";
            htmlcontenido += "<thead style='font-weight:bold'>";
            htmlcontenido += "<tr>";
            htmlcontenido += "<td style='border:1px solid #000'>Codigo producto</td>";
            htmlcontenido += "<td style='border:1px solid #000'>Descripcion</td>";
            htmlcontenido += "<td style='border:1px solid #000'>Existencia</td>";
            htmlcontenido += "<td style='border:1px solid #000'>Precio compra</td>";
            htmlcontenido += "<td style='border:1px solid #000'>Precio venta</td>";
            htmlcontenido += "<td style='border:1px solid #000'>Categoria</td>";
            htmlcontenido += "<td style='border:1px solid #000'>Subcategoria</td>";
            htmlcontenido += "</tr>";
            htmlcontenido += "</thead>";

            htmlcontenido += "<tbody>";
            foreach (var producto in productos)
            {
                htmlcontenido += "<tr>";
                htmlcontenido += "<td>" + producto.Produ_Id + "</td>";
                htmlcontenido += "<td>" + producto.Produ_Descripcion + "</td>";
                htmlcontenido += "<td>" + producto.Produ_Existencia + "</td>";
                htmlcontenido += "<td>" + producto.Produ_PrecioCompra + "</td>";
                htmlcontenido += "<td>" + producto.Produ_PrecioVenta + "</td>";
                htmlcontenido += "<td>" + producto.Categ_Descripcion + "</td>";
                htmlcontenido += "<td>" + producto.Subca_Descripcion + "</td>";
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


    }
}
