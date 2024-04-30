﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using SistemaSupermercado.Entities.Entities;

#nullable disable

namespace SistemaSupermercado.DataAccess.Context
{
    public partial class DbsupermercadolacoloniaContext : DbContext
    {
        public DbsupermercadolacoloniaContext()
        {
        }

        public DbsupermercadolacoloniaContext(DbContextOptions<DbsupermercadolacoloniaContext> options)
            : base(options)
        {
        }

        public virtual DbSet<tbCargos> tbCargos { get; set; }
        public virtual DbSet<tbCategorias> tbCategorias { get; set; }
        public virtual DbSet<tbClientes> tbClientes { get; set; }
        public virtual DbSet<tbDepartamentos> tbDepartamentos { get; set; }
        public virtual DbSet<tbEmpleados> tbEmpleados { get; set; }
        public virtual DbSet<tbEstadosCiviles> tbEstadosCiviles { get; set; }
        public virtual DbSet<tbImpuestos> tbImpuestos { get; set; }
        public virtual DbSet<tbLotes> tbLotes { get; set; }
        public virtual DbSet<tbMunicipios> tbMunicipios { get; set; }
        public virtual DbSet<tbPantallas> tbPantallas { get; set; }
        public virtual DbSet<tbPantallasPorRoles> tbPantallasPorRoles { get; set; }
        public virtual DbSet<tbProductos> tbProductos { get; set; }
        public virtual DbSet<tbPromociones> tbPromociones { get; set; }
        public virtual DbSet<tbProveedores> tbProveedores { get; set; }
        public virtual DbSet<tbRoles> tbRoles { get; set; }
        public virtual DbSet<tbSubcategorias> tbSubcategorias { get; set; }
        public virtual DbSet<tbSucursales> tbSucursales { get; set; }
        public virtual DbSet<tbUsuarios> tbUsuarios { get; set; }
        public virtual DbSet<tbVentasDetalle> tbVentasDetalle { get; set; }
        public virtual DbSet<tbVentasEncabezado> tbVentasEncabezado { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<tbCargos>(entity =>
            {
                entity.HasKey(e => e.Cargo_Id)
                    .HasName("PK_tbCargos_Cargo_Id");

                entity.ToTable("tbCargos", "Gral");

                entity.HasIndex(e => e.Cargo_Descripcion, "UQ_tbCargos_Cargo_Descripcion")
                    .IsUnique();

                entity.Property(e => e.Cargo_Descripcion)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Cargo_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.Cargo_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.Cargo_FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.Cargo_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbCargosCargo_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.Cargo_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.Cargo_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbCargosCargo_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.Cargo_UsuarioModificacion);
            });

            modelBuilder.Entity<tbCategorias>(entity =>
            {
                entity.HasKey(e => e.Categ_Id)
                    .HasName("PK_tbCategorias_Categ_Id");

                entity.ToTable("tbCategorias", "Gral");

                entity.HasIndex(e => e.Categ_Descripcion, "UQ_tbCategorias_Categ_Descripcion")
                    .IsUnique();

                entity.Property(e => e.Categ_Descripcion)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Categ_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.Categ_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.Categ_FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.Categ_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbCategoriasCateg_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.Categ_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.Categ_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbCategoriasCateg_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.Categ_UsuarioModificacion);
            });

            modelBuilder.Entity<tbClientes>(entity =>
            {
                entity.HasKey(e => e.Clien_Id)
                    .HasName("PK_tbClientes_Clien_Id");

                entity.ToTable("tbClientes", "Venta");

                entity.Property(e => e.Clien_Direccion).IsRequired();

                entity.Property(e => e.Clien_Dni).HasMaxLength(20);

                entity.Property(e => e.Clien_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.Clien_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.Clien_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.Clien_PrimerApellido)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Clien_PrimerNombre)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Clien_SegundoApellido).HasMaxLength(50);

                entity.Property(e => e.Clien_SegundoNombre).HasMaxLength(50);

                entity.Property(e => e.Clien_Sexo)
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.Clien_Telefono).HasMaxLength(20);

                entity.Property(e => e.Munic_Id)
                    .IsRequired()
                    .HasMaxLength(4)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.HasOne(d => d.Clien_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbClientesClien_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.Clien_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.Clien_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbClientesClien_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.Clien_UsuarioModificacion);

                entity.HasOne(d => d.Estad)
                    .WithMany(p => p.tbClientes)
                    .HasForeignKey(d => d.Estad_Id);

                entity.HasOne(d => d.Munic)
                    .WithMany(p => p.tbClientes)
                    .HasForeignKey(d => d.Munic_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<tbDepartamentos>(entity =>
            {
                entity.HasKey(e => e.Depar_Id)
                    .HasName("PK_tbDepartamentos_Depar_Id");

                entity.ToTable("tbDepartamentos", "Gral");

                entity.HasIndex(e => e.Depar_Descripcion, "UQ_tbDepartamentos_Depar_Descripcion")
                    .IsUnique();

                entity.Property(e => e.Depar_Id)
                    .HasMaxLength(2)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.Depar_Descripcion)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Depar_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.Depar_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.Depar_FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.Depar_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbDepartamentosDepar_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.Depar_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.Depar_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbDepartamentosDepar_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.Depar_UsuarioModificacion);
            });

            modelBuilder.Entity<tbEmpleados>(entity =>
            {
                entity.HasKey(e => e.Emple_Id)
                    .HasName("PK_tbEmpleados_Emple_Id");

                entity.ToTable("tbEmpleados", "Supr");

                entity.Property(e => e.Emple_Correo).IsRequired();

                entity.Property(e => e.Emple_Direccion).IsRequired();

                entity.Property(e => e.Emple_Dni)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.Emple_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.Emple_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.Emple_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.Emple_PrimerApellido)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Emple_PrimerNombre)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Emple_SegundoApellido).HasMaxLength(50);

                entity.Property(e => e.Emple_SegundoNombre).HasMaxLength(50);

                entity.Property(e => e.Emple_Sexo)
                    .IsRequired()
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.Emple_Telefono)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.Munic_Id)
                    .IsRequired()
                    .HasMaxLength(4)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.HasOne(d => d.Cargo)
                    .WithMany(p => p.tbEmpleados)
                    .HasForeignKey(d => d.Cargo_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.Emple_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbEmpleadosEmple_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.Emple_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.Emple_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbEmpleadosEmple_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.Emple_UsuarioModificacion);

                entity.HasOne(d => d.Estad)
                    .WithMany(p => p.tbEmpleados)
                    .HasForeignKey(d => d.Estad_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.Munic)
                    .WithMany(p => p.tbEmpleados)
                    .HasForeignKey(d => d.Munic_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.Sucur)
                    .WithMany(p => p.tbEmpleados)
                    .HasForeignKey(d => d.Sucur_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<tbEstadosCiviles>(entity =>
            {
                entity.HasKey(e => e.Estad_Id)
                    .HasName("PK_tbEstadosCiviles_Estad_Id");

                entity.ToTable("tbEstadosCiviles", "Gral");

                entity.HasIndex(e => e.Estad_Descripcion, "UQ_tbEstadosCiviles_Estad_Descripcion")
                    .IsUnique();

                entity.Property(e => e.Estad_Descripcion)
                    .IsRequired()
                    .HasMaxLength(30);

                entity.Property(e => e.Estad_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.Estad_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.Estad_FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.Estad_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbEstadosCivilesEstad_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.Estad_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.Estad_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbEstadosCivilesEstad_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.Estad_UsuarioModificacion);
            });

            modelBuilder.Entity<tbImpuestos>(entity =>
            {
                entity.HasKey(e => e.Impue_Id)
                    .HasName("PK_tbImpuestos_Impue_Id");

                entity.ToTable("tbImpuestos", "Gral");

                entity.HasIndex(e => e.Impue_Descripcion, "UQ_tbImpuestos_Impue_Descripcion")
                    .IsUnique();

                entity.Property(e => e.Impue_Descripcion).HasColumnType("numeric(4, 2)");

                entity.Property(e => e.Impue_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.Impue_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.Impue_FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.Impue_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbImpuestosImpue_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.Impue_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.Impue_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbImpuestosImpue_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.Impue_UsuarioModificacion);
            });

            modelBuilder.Entity<tbLotes>(entity =>
            {
                entity.HasKey(e => e.Lotes_Id)
                    .HasName("PK_tbLotes_Lotes_Id");

                entity.ToTable("tbLotes", "Supr");

                entity.Property(e => e.Lotes_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.Lotes_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.Lotes_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.Lotes_FechaVencimiento).HasColumnType("datetime");

                entity.HasOne(d => d.Lotes_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbLotesLotes_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.Lotes_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.Lotes_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbLotesLotes_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.Lotes_UsuarioModificacion);

                entity.HasOne(d => d.Produ)
                    .WithMany(p => p.tbLotes)
                    .HasForeignKey(d => d.Produ_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.Sucur)
                    .WithMany(p => p.tbLotes)
                    .HasForeignKey(d => d.Sucur_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<tbMunicipios>(entity =>
            {
                entity.HasKey(e => e.Munic_Id)
                    .HasName("PK_tbMunicipios_Munic_Id");

                entity.ToTable("tbMunicipios", "Gral");

                entity.Property(e => e.Munic_Id)
                    .HasMaxLength(4)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.Depar_Id)
                    .IsRequired()
                    .HasMaxLength(2)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.Munic_Descripcion)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Munic_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.Munic_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.Munic_FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.Depar)
                    .WithMany(p => p.tbMunicipios)
                    .HasForeignKey(d => d.Depar_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.Munic_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbMunicipiosMunic_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.Munic_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.Munic_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbMunicipiosMunic_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.Munic_UsuarioModificacion);
            });

            modelBuilder.Entity<tbPantallas>(entity =>
            {
                entity.HasKey(e => e.Panta_Id)
                    .HasName("PK_tbPantallas_Panta_Id");

                entity.ToTable("tbPantallas", "Acce");

                entity.HasIndex(e => e.Panta_Descripcion, "UQ_tbPantallas_Panta_Descripcion")
                    .IsUnique();

                entity.Property(e => e.Panta_Descripcion)
                    .IsRequired()
                    .HasMaxLength(30);

                entity.Property(e => e.Panta_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.Panta_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.Panta_FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.Panta_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbPantallasPanta_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.Panta_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.Panta_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbPantallasPanta_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.Panta_UsuarioModificacion);
            });

            modelBuilder.Entity<tbPantallasPorRoles>(entity =>
            {
                entity.HasKey(e => e.Papro_Id)
                    .HasName("PK_tbPantallasPorRoles_Papro_Id");

                entity.ToTable("tbPantallasPorRoles", "Acce");

                entity.HasIndex(e => new { e.Panta_Id, e.Roles_Id }, "UQ_tbPantallasPorRoles_Panta_Id_Roles_Id")
                    .IsUnique();

                entity.Property(e => e.Papro_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.Papro_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.Papro_FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.Panta)
                    .WithMany(p => p.tbPantallasPorRoles)
                    .HasForeignKey(d => d.Panta_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.Papro_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbPantallasPorRolesPapro_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.Papro_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.Papro_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbPantallasPorRolesPapro_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.Papro_UsuarioModificacion);

                entity.HasOne(d => d.Roles)
                    .WithMany(p => p.tbPantallasPorRoles)
                    .HasForeignKey(d => d.Roles_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<tbProductos>(entity =>
            {
                entity.HasKey(e => e.Produ_Id)
                    .HasName("PK_tbProductos_Produ_Id");

                entity.ToTable("tbProductos", "Supr");

                entity.HasIndex(e => e.Produ_Descripcion, "UQ_tbProductos_Produ_Descripcion")
                    .IsUnique();

                entity.Property(e => e.Produ_Descripcion)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Produ_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.Produ_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.Produ_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.Produ_PrecioCompra).HasColumnType("numeric(8, 2)");

                entity.Property(e => e.Produ_PrecioVenta).HasColumnType("numeric(8, 2)");

                entity.HasOne(d => d.Impue)
                    .WithMany(p => p.tbProductos)
                    .HasForeignKey(d => d.Impue_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.Produ_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbProductosProdu_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.Produ_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.Produ_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbProductosProdu_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.Produ_UsuarioModificacion);

                entity.HasOne(d => d.Prove)
                    .WithMany(p => p.tbProductos)
                    .HasForeignKey(d => d.Prove_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tbProdcutos_tbProveedores_Prove_Id");

                entity.HasOne(d => d.Subca)
                    .WithMany(p => p.tbProductos)
                    .HasForeignKey(d => d.Subca_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<tbPromociones>(entity =>
            {
                entity.HasKey(e => e.Promo_Id)
                    .HasName("PK_tbPromociones_Prom_Id");

                entity.ToTable("tbPromociones", "Supr");

                entity.Property(e => e.Prom_Descripcion).IsRequired();

                entity.Property(e => e.Promo_Disminucion).HasColumnType("numeric(8, 2)");

                entity.Property(e => e.Promo_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.Promo_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.Promo_FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.Produ)
                    .WithMany(p => p.tbPromociones)
                    .HasForeignKey(d => d.Produ_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.Promo_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbPromocionesPromo_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.Promo_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.Promo_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbPromocionesPromo_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.Promo_UsuarioModificacion);
            });

            modelBuilder.Entity<tbProveedores>(entity =>
            {
                entity.HasKey(e => e.Prove_Id)
                    .HasName("PK_tbProveedores_Prove_Id");

                entity.ToTable("tbProveedores", "Supr");

                entity.HasIndex(e => e.Prove_Marca, "UQ_tbProveedores_Marca_Id")
                    .IsUnique();

                entity.Property(e => e.Munic_Id)
                    .IsRequired()
                    .HasMaxLength(4)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.Prove_ContactoPrimerApellido)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Prove_ContactoPrimerNombre)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Prove_ContactoSegundoApellido).HasMaxLength(50);

                entity.Property(e => e.Prove_ContactoSegundoNombre).HasMaxLength(50);

                entity.Property(e => e.Prove_Direccion).IsRequired();

                entity.Property(e => e.Prove_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.Prove_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.Prove_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.Prove_Marca)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Prove_Telefono)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.HasOne(d => d.Munic)
                    .WithMany(p => p.tbProveedores)
                    .HasForeignKey(d => d.Munic_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.Prove_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbProveedoresProve_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.Prove_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.Prove_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbProveedoresProve_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.Prove_UsuarioModificacion);
            });

            modelBuilder.Entity<tbRoles>(entity =>
            {
                entity.HasKey(e => e.Roles_Id)
                    .HasName("PK_tbRoles_Roles_Id");

                entity.ToTable("tbRoles", "Acce");

                entity.HasIndex(e => e.Roles_Descripcion, "UQ_tbRoles_Roles_Descripcion")
                    .IsUnique();

                entity.Property(e => e.Roles_Descripcion)
                    .IsRequired()
                    .HasMaxLength(30);

                entity.Property(e => e.Roles_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.Roles_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.Roles_FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.Roles_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbRolesRoles_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.Roles_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.Roles_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbRolesRoles_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.Roles_UsuarioModificacion);
            });

            modelBuilder.Entity<tbSubcategorias>(entity =>
            {
                entity.HasKey(e => e.Subca_Id)
                    .HasName("PK_tbSubcategorias_Subca_Id");

                entity.ToTable("tbSubcategorias", "Gral");

                entity.HasIndex(e => e.Subca_Descripcion, "UQ_tbSubcategorias_Subca_Descripcion")
                    .IsUnique();

                entity.Property(e => e.Subca_Descripcion)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Subca_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.Subca_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.Subca_FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.Categ)
                    .WithMany(p => p.tbSubcategorias)
                    .HasForeignKey(d => d.Categ_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.Subca_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbSubcategoriasSubca_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.Subca_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.Subca_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbSubcategoriasSubca_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.Subca_UsuarioModificacion);
            });

            modelBuilder.Entity<tbSucursales>(entity =>
            {
                entity.HasKey(e => e.Sucur_Id)
                    .HasName("PK_tbSucursales_Sucur_Id");

                entity.ToTable("tbSucursales", "Supr");

                entity.HasIndex(e => e.Sucur_Descripcion, "UQ_tbSucurales_Sucur_Descripcion")
                    .IsUnique();

                entity.Property(e => e.Munic_Id)
                    .IsRequired()
                    .HasMaxLength(4)
                    .IsUnicode(false)
                    .IsFixedLength(true);

                entity.Property(e => e.Sucur_Descripcion)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Sucur_Direccion).IsRequired();

                entity.Property(e => e.Sucur_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.Sucur_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.Sucur_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.Sucur_Telefono)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.HasOne(d => d.Munic)
                    .WithMany(p => p.tbSucursales)
                    .HasForeignKey(d => d.Munic_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.Sucur_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbSucursalesSucur_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.Sucur_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.Sucur_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbSucursalesSucur_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.Sucur_UsuarioModificacion);
            });

            modelBuilder.Entity<tbUsuarios>(entity =>
            {
                entity.HasKey(e => e.Usuar_Id)
                    .HasName("PK_tbUsuarios_Usuar_Id");

                entity.ToTable("tbUsuarios", "Acce");

                entity.HasIndex(e => e.Usuar_Correo, "UQ_tbUsuarios_Usuar_Correo")
                    .IsUnique();

                entity.HasIndex(e => e.Usuar_Usuario, "UQ_tbUsuarios_Usuar_Usuario")
                    .IsUnique();

                entity.Property(e => e.Usuar_Contrasena).IsRequired();

                entity.Property(e => e.Usuar_Correo).HasMaxLength(100);

                entity.Property(e => e.Usuar_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.Usuar_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.Usuar_FechaModificacion).HasColumnType("datetime");

                entity.Property(e => e.Usuar_SuperPuntos).HasDefaultValueSql("((0))");

                entity.Property(e => e.Usuar_UltimaSesion).HasColumnType("datetime");

                entity.Property(e => e.Usuar_Usuario)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<tbVentasDetalle>(entity =>
            {
                entity.HasKey(e => e.Vende_Id)
                    .HasName("PK_tbVentasDetalle_Vende_Id");

                entity.ToTable("tbVentasDetalle", "Venta");

                entity.Property(e => e.Vende_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.Vende_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.Vende_FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.Lotes)
                    .WithMany(p => p.tbVentasDetalle)
                    .HasForeignKey(d => d.Lotes_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.Vende_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbVentasDetalleVende_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.Vende_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.Vende_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbVentasDetalleVende_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.Vende_UsuarioModificacion);

                entity.HasOne(d => d.Venen)
                    .WithMany(p => p.tbVentasDetalle)
                    .HasForeignKey(d => d.Venen_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<tbVentasEncabezado>(entity =>
            {
                entity.HasKey(e => e.Venen_Id)
                    .HasName("PK_tbVentasEncabezado_Venen_Id");

                entity.ToTable("tbVentasEncabezado", "Venta");

                entity.Property(e => e.Venen_Estado).HasDefaultValueSql("((1))");

                entity.Property(e => e.Venen_FechaCreacion).HasColumnType("datetime");

                entity.Property(e => e.Venen_FechaModificacion).HasColumnType("datetime");

                entity.HasOne(d => d.Sucur)
                    .WithMany(p => p.tbVentasEncabezado)
                    .HasForeignKey(d => d.Sucur_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.Usuar)
                    .WithMany(p => p.tbVentasEncabezadoUsuar)
                    .HasForeignKey(d => d.Usuar_Id)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.Venen_UsuarioCreacionNavigation)
                    .WithMany(p => p.tbVentasEncabezadoVenen_UsuarioCreacionNavigation)
                    .HasForeignKey(d => d.Venen_UsuarioCreacion)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.Venen_UsuarioModificacionNavigation)
                    .WithMany(p => p.tbVentasEncabezadoVenen_UsuarioModificacionNavigation)
                    .HasForeignKey(d => d.Venen_UsuarioModificacion);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}