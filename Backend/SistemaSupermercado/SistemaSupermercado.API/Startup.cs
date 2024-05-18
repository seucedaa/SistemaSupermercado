using SistemaSupermercado.API.Services;
using SistemaSupermercado.BusinessLogic;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.FileProviders;
using System.IO;

namespace SistemaSupermercado.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.DataAcces(Configuration.GetConnectionString("SupermercadoLaColoniaConn"));
            services.BussinesLogic();
            services.AddAutoMapper(typeof(Startup));
            services.AddHttpContextAccessor();

            services.AddTransient<IMailService, MailService>();

            services.Configure<MailSettings>(Configuration.GetSection("MailSettings"));

            services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigins", builder =>
                {
                    builder
                        .AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                });
            });

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "SistemaSupermercado.API", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseSwagger();
            app.UseSwaggerUI(options =>
            {
                options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
            });

            app.Use(async (context, next) =>
            {
                if (context.Request.Path.StartsWithSegments("/favicon.ico"))
                {
                    context.Response.StatusCode = 200; 
                    return;
                }
                await next.Invoke();
            });
        //    app.UseStaticFiles(new StaticFileOptions
        //    {
        //        FileProvider = new PhysicalFileProvider(
        //Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads")),
        //        RequestPath = "/uploads"
        //    });
            app.UseCors("AllowAllOrigins");

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
