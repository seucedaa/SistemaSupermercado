using SistemaSupermercado.API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SistemaSupermercado.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class MailController : ControllerBase
    {
        private readonly IMailService _mailService;
        public MailController(IMailService mailService)
        {
            _mailService = mailService;
        }

        [HttpPost]
        [Route("EnviarCorreo")]
        public bool sendMail(MailData mailData)
        {
            return _mailService.SendMail(mailData);
        }

    }
}
