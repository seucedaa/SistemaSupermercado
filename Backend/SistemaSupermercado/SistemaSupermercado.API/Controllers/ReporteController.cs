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

            var productos = _reporteServices.reporteStock(Sucur_Id);

            string htmlcontenido = "<div style='width:100%; text-align:center'>";
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
