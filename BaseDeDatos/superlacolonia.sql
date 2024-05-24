USE [dbSupermercadoLaColonia]
GO
/****** Object:  Schema [Acce]    Script Date: 24/05/2024 14:46:30 ******/
CREATE SCHEMA [Acce]
GO
/****** Object:  Schema [Gral]    Script Date: 24/05/2024 14:46:30 ******/
CREATE SCHEMA [Gral]
GO
/****** Object:  Schema [Pace_SQLLogin_1]    Script Date: 24/05/2024 14:46:30 ******/
CREATE SCHEMA [Pace_SQLLogin_1]
GO
/****** Object:  Schema [Rptes]    Script Date: 24/05/2024 14:46:30 ******/
CREATE SCHEMA [Rptes]
GO
/****** Object:  Schema [Supr]    Script Date: 24/05/2024 14:46:30 ******/
CREATE SCHEMA [Supr]
GO
/****** Object:  Schema [Venta]    Script Date: 24/05/2024 14:46:30 ******/
CREATE SCHEMA [Venta]
GO
/****** Object:  Table [Acce].[tbPantallas]    Script Date: 24/05/2024 14:46:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Acce].[tbPantallas](
	[Panta_Id] [int] IDENTITY(1,1) NOT NULL,
	[Panta_Descripcion] [nvarchar](30) NOT NULL,
	[Panta_UsuarioCreacion] [int] NOT NULL,
	[Panta_FechaCreacion] [datetime] NOT NULL,
	[Panta_UsuarioModificacion] [int] NULL,
	[Panta_FechaModificacion] [datetime] NULL,
	[Panta_Estado] [bit] NULL,
	[Panta_Esquema] [int] NULL,
 CONSTRAINT [PK_tbPantallas_Panta_Id] PRIMARY KEY CLUSTERED 
(
	[Panta_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_tbPantallas_Panta_Descripcion] UNIQUE NONCLUSTERED 
(
	[Panta_Descripcion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Acce].[tbPantallasPorRoles]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Acce].[tbPantallasPorRoles](
	[Papro_Id] [int] IDENTITY(1,1) NOT NULL,
	[Panta_Id] [int] NULL,
	[Roles_Id] [int] NULL,
	[Papro_UsuarioCreacion] [int] NULL,
	[Papro_FechaCreacion] [datetime] NULL,
	[Papro_UsuarioModificacion] [int] NULL,
	[Papro_FechaModificacion] [datetime] NULL,
	[Papro_Estado] [bit] NULL,
 CONSTRAINT [PK_tbPantallasPorRoles_Papro_Id] PRIMARY KEY CLUSTERED 
(
	[Papro_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_tbPantallasPorRoles_Panta_Id_Roles_Id] UNIQUE NONCLUSTERED 
(
	[Panta_Id] ASC,
	[Roles_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Acce].[tbRoles]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Acce].[tbRoles](
	[Roles_Id] [int] IDENTITY(1,1) NOT NULL,
	[Roles_Descripcion] [nvarchar](30) NULL,
	[Roles_UsuarioCreacion] [int] NULL,
	[Roles_FechaCreacion] [datetime] NULL,
	[Roles_UsuarioModificacion] [int] NULL,
	[Roles_FechaModificacion] [datetime] NULL,
	[Roles_Estado] [bit] NULL,
 CONSTRAINT [PK_tbRoles_Roles_Id] PRIMARY KEY CLUSTERED 
(
	[Roles_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_tbRoles_Roles_Descripcion] UNIQUE NONCLUSTERED 
(
	[Roles_Descripcion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Acce].[tbUsuarios]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Acce].[tbUsuarios](
	[Usuar_Id] [int] IDENTITY(1,1) NOT NULL,
	[Usuar_Correo] [nvarchar](100) NULL,
	[Usuar_Usuario] [nvarchar](50) NOT NULL,
	[Usuar_Contrasena] [nvarchar](max) NOT NULL,
	[Perso_Id] [int] NOT NULL,
	[Perso_Tipo] [bit] NOT NULL,
	[Roles_Id] [int] NOT NULL,
	[Usuar_Admin] [bit] NOT NULL,
	[Usuar_UltimaSesion] [datetime] NULL,
	[Usuar_SuperPuntos] [int] NULL,
	[Usuar_UsuarioCreacion] [int] NOT NULL,
	[Usuar_FechaCreacion] [datetime] NOT NULL,
	[Usuar_UsuarioModificacion] [int] NULL,
	[Usuar_FechaModificacion] [datetime] NULL,
	[Usuar_Estado] [bit] NULL,
	[Usua_VerificarCorreo] [varchar](max) NULL,
 CONSTRAINT [PK_tbUsuarios_Usuar_Id] PRIMARY KEY CLUSTERED 
(
	[Usuar_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_tbUsuarios_Usuar_Correo] UNIQUE NONCLUSTERED 
(
	[Usuar_Correo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_tbUsuarios_Usuar_Usuario] UNIQUE NONCLUSTERED 
(
	[Usuar_Usuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Gral].[tbCargos]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Gral].[tbCargos](
	[Cargo_Id] [int] IDENTITY(1,1) NOT NULL,
	[Cargo_Descripcion] [nvarchar](50) NOT NULL,
	[Cargo_UsuarioCreacion] [int] NOT NULL,
	[Cargo_FechaCreacion] [datetime] NOT NULL,
	[Cargo_UsuarioModificacion] [int] NULL,
	[Cargo_FechaModificacion] [datetime] NULL,
	[Cargo_Estado] [bit] NULL,
 CONSTRAINT [PK_tbCargos_Cargo_Id] PRIMARY KEY CLUSTERED 
(
	[Cargo_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_tbCargos_Cargo_Descripcion] UNIQUE NONCLUSTERED 
(
	[Cargo_Descripcion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Gral].[tbCategorias]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Gral].[tbCategorias](
	[Categ_Id] [int] IDENTITY(1,1) NOT NULL,
	[Categ_Descripcion] [nvarchar](50) NOT NULL,
	[Categ_UsuarioCreacion] [int] NOT NULL,
	[Categ_FechaCreacion] [datetime] NOT NULL,
	[Categ_UsuarioModificacion] [int] NULL,
	[Categ_FechaModificacion] [datetime] NULL,
	[Categ_Estado] [bit] NULL,
 CONSTRAINT [PK_tbCategorias_Categ_Id] PRIMARY KEY CLUSTERED 
(
	[Categ_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_tbCategorias_Categ_Descripcion] UNIQUE NONCLUSTERED 
(
	[Categ_Descripcion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Gral].[tbDepartamentos]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Gral].[tbDepartamentos](
	[Depar_Id] [char](2) NOT NULL,
	[Depar_Descripcion] [nvarchar](50) NOT NULL,
	[Depar_UsuarioCreacion] [int] NOT NULL,
	[Depar_FechaCreacion] [datetime] NOT NULL,
	[Depar_UsuarioModificacion] [int] NULL,
	[Depar_FechaModificacion] [datetime] NULL,
	[Depar_Estado] [bit] NULL,
 CONSTRAINT [PK_tbDepartamentos_Depar_Id] PRIMARY KEY CLUSTERED 
(
	[Depar_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_tbDepartamentos_Depar_Descripcion] UNIQUE NONCLUSTERED 
(
	[Depar_Descripcion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Gral].[tbEstadosCiviles]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Gral].[tbEstadosCiviles](
	[Estad_Id] [int] IDENTITY(1,1) NOT NULL,
	[Estad_Descripcion] [nvarchar](30) NOT NULL,
	[Estad_UsuarioCreacion] [int] NOT NULL,
	[Estad_FechaCreacion] [datetime] NOT NULL,
	[Estad_UsuarioModificacion] [int] NULL,
	[Estad_FechaModificacion] [datetime] NULL,
	[Estad_Estado] [bit] NULL,
 CONSTRAINT [PK_tbEstadosCiviles_Estad_Id] PRIMARY KEY CLUSTERED 
(
	[Estad_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_tbEstadosCiviles_Estad_Descripcion] UNIQUE NONCLUSTERED 
(
	[Estad_Descripcion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Gral].[tbImpuestos]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Gral].[tbImpuestos](
	[Impue_Id] [int] IDENTITY(1,1) NOT NULL,
	[Impue_Descripcion] [numeric](4, 2) NOT NULL,
	[Impue_UsuarioCreacion] [int] NOT NULL,
	[Impue_FechaCreacion] [datetime] NOT NULL,
	[Impue_UsuarioModificacion] [int] NULL,
	[Impue_FechaModificacion] [datetime] NULL,
	[Impue_Estado] [bit] NULL,
 CONSTRAINT [PK_tbImpuestos_Impue_Id] PRIMARY KEY CLUSTERED 
(
	[Impue_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_tbImpuestos_Impue_Descripcion] UNIQUE NONCLUSTERED 
(
	[Impue_Descripcion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Gral].[tbMunicipios]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Gral].[tbMunicipios](
	[Munic_Id] [char](4) NOT NULL,
	[Munic_Descripcion] [nvarchar](50) NOT NULL,
	[Depar_Id] [char](2) NOT NULL,
	[Munic_UsuarioCreacion] [int] NOT NULL,
	[Munic_FechaCreacion] [datetime] NOT NULL,
	[Munic_UsuarioModificacion] [int] NULL,
	[Munic_FechaModificacion] [datetime] NULL,
	[Munic_Estado] [bit] NULL,
 CONSTRAINT [PK_tbMunicipios_Munic_Id] PRIMARY KEY CLUSTERED 
(
	[Munic_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Gral].[tbSubcategorias]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Gral].[tbSubcategorias](
	[Subca_Id] [int] IDENTITY(1,1) NOT NULL,
	[Subca_Descripcion] [nvarchar](50) NOT NULL,
	[Categ_Id] [int] NOT NULL,
	[Subca_UsuarioCreacion] [int] NOT NULL,
	[Subca_FechaCreacion] [datetime] NOT NULL,
	[Subca_UsuarioModificacion] [int] NULL,
	[Subca_FechaModificacion] [datetime] NULL,
	[Subca_Estado] [bit] NULL,
 CONSTRAINT [PK_tbSubcategorias_Subca_Id] PRIMARY KEY CLUSTERED 
(
	[Subca_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_tbSubcategorias_Subca_Descripcion] UNIQUE NONCLUSTERED 
(
	[Subca_Descripcion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Gral].[tbTiposdePagos]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Gral].[tbTiposdePagos](
	[Tipos_Id] [int] IDENTITY(1,1) NOT NULL,
	[Tipos_Descripcion] [nvarchar](50) NOT NULL,
	[Tipos_UsuarioCreacion] [int] NOT NULL,
	[Tipos_FechaCreacion] [datetime] NOT NULL,
	[Tipos_UsuarioModificacion] [int] NULL,
	[Tipos_FechaModificacion] [datetime] NULL,
	[Tipos_Estado] [bit] NULL,
 CONSTRAINT [PK_tbTiposdePagos_Tipos_Id] PRIMARY KEY CLUSTERED 
(
	[Tipos_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_tbTiposdePagos_Tipos_Descripcion] UNIQUE NONCLUSTERED 
(
	[Tipos_Descripcion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Supr].[tbEmpleados]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Supr].[tbEmpleados](
	[Emple_Id] [int] IDENTITY(1,1) NOT NULL,
	[Emple_Dni] [nvarchar](20) NOT NULL,
	[Emple_PrimerNombre] [nvarchar](50) NOT NULL,
	[Emple_SegundoNombre] [nvarchar](50) NULL,
	[Emple_PrimerApellido] [nvarchar](50) NOT NULL,
	[Emple_SegundoApellido] [nvarchar](50) NULL,
	[Emple_Sexo] [char](1) NOT NULL,
	[Estad_Id] [int] NOT NULL,
	[Emple_Telefono] [nvarchar](20) NOT NULL,
	[Emple_Correo] [nvarchar](max) NOT NULL,
	[Munic_Id] [char](4) NOT NULL,
	[Emple_Direccion] [nvarchar](max) NOT NULL,
	[Cargo_Id] [int] NOT NULL,
	[Sucur_Id] [int] NOT NULL,
	[Emple_UsuarioCreacion] [int] NOT NULL,
	[Emple_FechaCreacion] [datetime] NOT NULL,
	[Emple_UsuarioModificacion] [int] NULL,
	[Emple_FechaModificacion] [datetime] NULL,
	[Emple_Estado] [bit] NULL,
 CONSTRAINT [PK_tbEmpleados_Emple_Id] PRIMARY KEY CLUSTERED 
(
	[Emple_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Supr].[tbLotes]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Supr].[tbLotes](
	[Lotes_Id] [int] IDENTITY(1,1) NOT NULL,
	[Lotes_FechaVencimiento] [datetime] NOT NULL,
	[Produ_Id] [int] NOT NULL,
	[Lotes_Cantidad] [int] NOT NULL,
	[Sucur_Id] [int] NOT NULL,
	[Lotes_UsuarioCreacion] [int] NOT NULL,
	[Lotes_FechaCreacion] [datetime] NOT NULL,
	[Lotes_UsuarioModificacion] [int] NULL,
	[Lotes_FechaModificacion] [datetime] NULL,
	[Lotes_Estado] [bit] NULL,
 CONSTRAINT [PK_tbLotes_Lotes_Id] PRIMARY KEY CLUSTERED 
(
	[Lotes_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Supr].[tbProductos]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Supr].[tbProductos](
	[Produ_Id] [int] IDENTITY(1,1) NOT NULL,
	[Produ_Descripcion] [nvarchar](50) NOT NULL,
	[Produ_Existencia] [int] NOT NULL,
	[Produ_PrecioCompra] [numeric](8, 2) NOT NULL,
	[Produ_PrecioVenta] [numeric](8, 2) NOT NULL,
	[Impue_Id] [int] NOT NULL,
	[Subca_Id] [int] NOT NULL,
	[Prove_Id] [int] NOT NULL,
	[Produ_UsuarioCreacion] [int] NOT NULL,
	[Produ_FechaCreacion] [datetime] NOT NULL,
	[Produ_UsuarioModificacion] [int] NULL,
	[Produ_FechaModificacion] [datetime] NULL,
	[Produ_Estado] [bit] NULL,
	[img] [nvarchar](max) NULL,
 CONSTRAINT [PK_tbProductos_Produ_Id] PRIMARY KEY CLUSTERED 
(
	[Produ_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_tbProductos_Produ_Descripcion] UNIQUE NONCLUSTERED 
(
	[Produ_Descripcion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Supr].[tbPromociones]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Supr].[tbPromociones](
	[Promo_Id] [int] IDENTITY(1,1) NOT NULL,
	[Produ_Id] [int] NOT NULL,
	[Promo_Disminucion] [numeric](8, 2) NOT NULL,
	[Promo_PuntosRequeridos] [int] NOT NULL,
	[Promo_UsuarioCreacion] [int] NOT NULL,
	[Promo_FechaCreacion] [datetime] NOT NULL,
	[Promo_UsuarioModificacion] [int] NULL,
	[Promo_FechaModificacion] [datetime] NULL,
	[Promo_Estado] [bit] NULL,
	[Promo_Descripcion] [nvarchar](max) NULL,
	[Promo_Porcentaje] [numeric](8, 2) NULL,
 CONSTRAINT [PK_tbPromociones_Prom_Id] PRIMARY KEY CLUSTERED 
(
	[Promo_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Supr].[tbProveedores]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Supr].[tbProveedores](
	[Prove_Id] [int] IDENTITY(1,1) NOT NULL,
	[Prove_Marca] [nvarchar](50) NOT NULL,
	[Prove_ContactoPrimerNombre] [nvarchar](50) NOT NULL,
	[Prove_ContactoSegundoNombre] [nvarchar](50) NULL,
	[Prove_ContactoPrimerApellido] [nvarchar](50) NOT NULL,
	[Prove_ContactoSegundoApellido] [nvarchar](50) NULL,
	[Munic_Id] [char](4) NOT NULL,
	[Prove_Direccion] [nvarchar](max) NOT NULL,
	[Prove_Telefono] [nvarchar](20) NOT NULL,
	[Prove_Correo] [nvarchar](max) NULL,
	[Prove_Notas] [nvarchar](max) NULL,
	[Prove_UsuarioCreacion] [int] NOT NULL,
	[Prove_FechaCreacion] [datetime] NOT NULL,
	[Prove_UsuarioModificacion] [int] NULL,
	[Prove_FechaModificacion] [datetime] NULL,
	[Prove_Estado] [bit] NULL,
 CONSTRAINT [PK_tbProveedores_Prove_Id] PRIMARY KEY CLUSTERED 
(
	[Prove_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_tbProveedores_Marca_Id] UNIQUE NONCLUSTERED 
(
	[Prove_Marca] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Supr].[tbSucursales]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Supr].[tbSucursales](
	[Sucur_Id] [int] IDENTITY(1,1) NOT NULL,
	[Sucur_Descripcion] [nvarchar](50) NOT NULL,
	[Munic_Id] [char](4) NOT NULL,
	[Sucur_Direccion] [nvarchar](max) NOT NULL,
	[Sucur_Telefono] [nvarchar](20) NOT NULL,
	[Sucur_UsuarioCreacion] [int] NOT NULL,
	[Sucur_FechaCreacion] [datetime] NOT NULL,
	[Sucur_UsuarioModificacion] [int] NULL,
	[Sucur_FechaModificacion] [datetime] NULL,
	[Sucur_Estado] [bit] NULL,
 CONSTRAINT [PK_tbSucursales_Sucur_Id] PRIMARY KEY CLUSTERED 
(
	[Sucur_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_tbSucurales_Sucur_Descripcion] UNIQUE NONCLUSTERED 
(
	[Sucur_Descripcion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Venta].[tbClientes]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Venta].[tbClientes](
	[Clien_Id] [int] IDENTITY(1,1) NOT NULL,
	[Clien_Dni] [nvarchar](20) NULL,
	[Clien_PrimerNombre] [nvarchar](50) NOT NULL,
	[Clien_SegundoNombre] [nvarchar](50) NULL,
	[Clien_PrimerApellido] [nvarchar](50) NOT NULL,
	[Clien_SegundoApellido] [nvarchar](50) NULL,
	[Clien_Sexo] [char](1) NULL,
	[Estad_Id] [int] NULL,
	[Clien_Telefono] [nvarchar](20) NULL,
	[Munic_Id] [char](4) NOT NULL,
	[Clien_Direccion] [nvarchar](max) NOT NULL,
	[Clien_UsuarioCreacion] [int] NOT NULL,
	[Clien_FechaCreacion] [datetime] NOT NULL,
	[Clien_UsuarioModificacion] [int] NULL,
	[Clien_FechaModificacion] [datetime] NULL,
	[Clien_Estado] [bit] NULL,
	[Clien_Puntos] [int] NULL,
 CONSTRAINT [PK_tbClientes_Clien_Id] PRIMARY KEY CLUSTERED 
(
	[Clien_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Venta].[tbVentasDetalle]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Venta].[tbVentasDetalle](
	[Vende_Id] [int] IDENTITY(1,1) NOT NULL,
	[Venen_Id] [int] NOT NULL,
	[Lotes_Id] [int] NOT NULL,
	[Vende_Cantidad] [int] NOT NULL,
	[Vende_UsuarioCreacion] [int] NOT NULL,
	[Vende_FechaCreacion] [datetime] NOT NULL,
	[Vende_UsuarioModificacion] [int] NULL,
	[Vende_FechaModificacion] [datetime] NULL,
	[Vende_Estado] [bit] NULL,
	[Vende_Precio] [decimal](10, 2) NULL,
	[Vende_Impuesto] [decimal](10, 2) NULL,
	[Vende_Descuento] [decimal](10, 2) NULL,
 CONSTRAINT [PK_tbVentasDetalle_Vende_Id] PRIMARY KEY CLUSTERED 
(
	[Vende_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Venta].[tbVentasEncabezado]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Venta].[tbVentasEncabezado](
	[Venen_Id] [int] IDENTITY(1,1) NOT NULL,
	[Sucur_Id] [int] NOT NULL,
	[Usuar_Id] [int] NULL,
	[Tipos_Id] [int] NOT NULL,
	[Venen_UsuarioCreacion] [int] NOT NULL,
	[Venen_FechaCreacion] [datetime] NOT NULL,
	[Venen_UsuarioModificacion] [int] NULL,
	[Venen_FechaModificacion] [datetime] NULL,
	[Venen_Estado] [bit] NULL,
	[Clien_Id] [int] NULL,
 CONSTRAINT [PK_tbVentasEncabezado_Venen_Id] PRIMARY KEY CLUSTERED 
(
	[Venen_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [Acce].[tbPantallas] ADD  CONSTRAINT [DF_tbPantallas_Panta_Estado]  DEFAULT ((1)) FOR [Panta_Estado]
GO
ALTER TABLE [Acce].[tbPantallasPorRoles] ADD  CONSTRAINT [DF_tbPantallasPorRoles_Papro_Estado]  DEFAULT ((1)) FOR [Papro_Estado]
GO
ALTER TABLE [Acce].[tbRoles] ADD  CONSTRAINT [DF_tbRoles_Roles_Estado]  DEFAULT ((1)) FOR [Roles_Estado]
GO
ALTER TABLE [Acce].[tbUsuarios] ADD  CONSTRAINT [DF_tbUsuarios_Usuar_SuperPuntos]  DEFAULT ((0)) FOR [Usuar_SuperPuntos]
GO
ALTER TABLE [Acce].[tbUsuarios] ADD  CONSTRAINT [DF_tbUsuarios_Usuar_Estado]  DEFAULT ((1)) FOR [Usuar_Estado]
GO
ALTER TABLE [Gral].[tbCargos] ADD  CONSTRAINT [DF_tbCargos_Cargo_Estado]  DEFAULT ((1)) FOR [Cargo_Estado]
GO
ALTER TABLE [Gral].[tbCategorias] ADD  CONSTRAINT [DF_tbCategorias_Categ_Estado]  DEFAULT ((1)) FOR [Categ_Estado]
GO
ALTER TABLE [Gral].[tbDepartamentos] ADD  CONSTRAINT [DF_tbDepartamentos_Depar_Estado]  DEFAULT ((1)) FOR [Depar_Estado]
GO
ALTER TABLE [Gral].[tbEstadosCiviles] ADD  CONSTRAINT [DF_tbEstadosCiviles_Estad_Estado]  DEFAULT ((1)) FOR [Estad_Estado]
GO
ALTER TABLE [Gral].[tbImpuestos] ADD  CONSTRAINT [DF_tbImpuestos_Impue_Estado]  DEFAULT ((1)) FOR [Impue_Estado]
GO
ALTER TABLE [Gral].[tbMunicipios] ADD  CONSTRAINT [DF_tbMunicipios_Munic_Estado]  DEFAULT ((1)) FOR [Munic_Estado]
GO
ALTER TABLE [Gral].[tbSubcategorias] ADD  CONSTRAINT [DF_tbSubcategorias_Subca_Estado]  DEFAULT ((1)) FOR [Subca_Estado]
GO
ALTER TABLE [Gral].[tbTiposdePagos] ADD  CONSTRAINT [DF_tbTiposdePagos_Tipos_Estado]  DEFAULT ((1)) FOR [Tipos_Estado]
GO
ALTER TABLE [Supr].[tbEmpleados] ADD  CONSTRAINT [DF_tbEmpleados_Emple_Estado]  DEFAULT ((1)) FOR [Emple_Estado]
GO
ALTER TABLE [Supr].[tbLotes] ADD  CONSTRAINT [DF_tbLotes_Lotes_Estado]  DEFAULT ((1)) FOR [Lotes_Estado]
GO
ALTER TABLE [Supr].[tbProductos] ADD  CONSTRAINT [DF_tbProductos_Produ_Estado]  DEFAULT ((1)) FOR [Produ_Estado]
GO
ALTER TABLE [Supr].[tbPromociones] ADD  CONSTRAINT [DF_tbPromociones_Promo_Estado]  DEFAULT ((1)) FOR [Promo_Estado]
GO
ALTER TABLE [Supr].[tbProveedores] ADD  CONSTRAINT [DF_tbProveedores_Prove_Estado]  DEFAULT ((1)) FOR [Prove_Estado]
GO
ALTER TABLE [Supr].[tbSucursales] ADD  CONSTRAINT [DF_tbSucursales_Sucur_Estado]  DEFAULT ((1)) FOR [Sucur_Estado]
GO
ALTER TABLE [Venta].[tbClientes] ADD  CONSTRAINT [DF_tbClientes_Clien_Estado]  DEFAULT ((1)) FOR [Clien_Estado]
GO
ALTER TABLE [Venta].[tbVentasDetalle] ADD  CONSTRAINT [DF_tbVentasDetalle_Vende_Estado]  DEFAULT ((1)) FOR [Vende_Estado]
GO
ALTER TABLE [Venta].[tbVentasEncabezado] ADD  CONSTRAINT [DF_tbVentasEncabezado_Venen_Estado]  DEFAULT ((1)) FOR [Venen_Estado]
GO
ALTER TABLE [Acce].[tbPantallas]  WITH CHECK ADD  CONSTRAINT [FK_tbPantallas_tbUsuarios_Panta_UsuarioCreacion] FOREIGN KEY([Panta_UsuarioCreacion])
REFERENCES [Acce].[tbUsuarios] ([Usuar_Id])
GO
ALTER TABLE [Acce].[tbPantallas] CHECK CONSTRAINT [FK_tbPantallas_tbUsuarios_Panta_UsuarioCreacion]
GO
ALTER TABLE [Acce].[tbPantallas]  WITH CHECK ADD  CONSTRAINT [FK_tbPantallas_tbUsuarios_Panta_UsuarioModificacion] FOREIGN KEY([Panta_UsuarioModificacion])
REFERENCES [Acce].[tbUsuarios] ([Usuar_Id])
GO
ALTER TABLE [Acce].[tbPantallas] CHECK CONSTRAINT [FK_tbPantallas_tbUsuarios_Panta_UsuarioModificacion]
GO
ALTER TABLE [Acce].[tbPantallasPorRoles]  WITH CHECK ADD  CONSTRAINT [FK_tbPantallasPorRoles_tbPantallas_Panta_Id] FOREIGN KEY([Panta_Id])
REFERENCES [Acce].[tbPantallas] ([Panta_Id])
GO
ALTER TABLE [Acce].[tbPantallasPorRoles] CHECK CONSTRAINT [FK_tbPantallasPorRoles_tbPantallas_Panta_Id]
GO
ALTER TABLE [Acce].[tbPantallasPorRoles]  WITH CHECK ADD  CONSTRAINT [FK_tbPantallasPorRoles_tbRoles_Roles_Id] FOREIGN KEY([Roles_Id])
REFERENCES [Acce].[tbRoles] ([Roles_Id])
GO
ALTER TABLE [Acce].[tbPantallasPorRoles] CHECK CONSTRAINT [FK_tbPantallasPorRoles_tbRoles_Roles_Id]
GO
ALTER TABLE [Acce].[tbPantallasPorRoles]  WITH CHECK ADD  CONSTRAINT [FK_tbPantallasPorRoles_tbUsuarios_Papro_UsuarioCreacion] FOREIGN KEY([Papro_UsuarioCreacion])
REFERENCES [Acce].[tbUsuarios] ([Usuar_Id])
GO
ALTER TABLE [Acce].[tbPantallasPorRoles] CHECK CONSTRAINT [FK_tbPantallasPorRoles_tbUsuarios_Papro_UsuarioCreacion]
GO
ALTER TABLE [Acce].[tbPantallasPorRoles]  WITH CHECK ADD  CONSTRAINT [FK_tbPantallasPorRoles_tbUsuarios_Papro_UsuarioModificacion] FOREIGN KEY([Papro_UsuarioModificacion])
REFERENCES [Acce].[tbUsuarios] ([Usuar_Id])
GO
ALTER TABLE [Acce].[tbPantallasPorRoles] CHECK CONSTRAINT [FK_tbPantallasPorRoles_tbUsuarios_Papro_UsuarioModificacion]
GO
ALTER TABLE [Acce].[tbRoles]  WITH CHECK ADD  CONSTRAINT [FK_tbRoles_tbUsuarios_Roles_UsuarioCreacion] FOREIGN KEY([Roles_UsuarioCreacion])
REFERENCES [Acce].[tbUsuarios] ([Usuar_Id])
GO
ALTER TABLE [Acce].[tbRoles] CHECK CONSTRAINT [FK_tbRoles_tbUsuarios_Roles_UsuarioCreacion]
GO
ALTER TABLE [Acce].[tbRoles]  WITH CHECK ADD  CONSTRAINT [FK_tbRoles_tbUsuarios_Roles_UsuarioModificacion] FOREIGN KEY([Roles_UsuarioModificacion])
REFERENCES [Acce].[tbUsuarios] ([Usuar_Id])
GO
ALTER TABLE [Acce].[tbRoles] CHECK CONSTRAINT [FK_tbRoles_tbUsuarios_Roles_UsuarioModificacion]
GO
ALTER TABLE [Acce].[tbUsuarios]  WITH CHECK ADD  CONSTRAINT [FK_tbUsuarios_tbRoles_Roles_Id] FOREIGN KEY([Roles_Id])
REFERENCES [Acce].[tbRoles] ([Roles_Id])
GO
ALTER TABLE [Acce].[tbUsuarios] CHECK CONSTRAINT [FK_tbUsuarios_tbRoles_Roles_Id]
GO
ALTER TABLE [Acce].[tbUsuarios]  WITH CHECK ADD  CONSTRAINT [FK_tbUsuarios_tbUsuarios_Usuar_UsuarioCreacion] FOREIGN KEY([Usuar_UsuarioCreacion])
REFERENCES [Acce].[tbUsuarios] ([Usuar_Id])
GO
ALTER TABLE [Acce].[tbUsuarios] CHECK CONSTRAINT [FK_tbUsuarios_tbUsuarios_Usuar_UsuarioCreacion]
GO
ALTER TABLE [Acce].[tbUsuarios]  WITH CHECK ADD  CONSTRAINT [FK_tbUsuarios_tbUsuarios_Usuar_UsuarioModificacion] FOREIGN KEY([Usuar_UsuarioModificacion])
REFERENCES [Acce].[tbUsuarios] ([Usuar_Id])
GO
ALTER TABLE [Acce].[tbUsuarios] CHECK CONSTRAINT [FK_tbUsuarios_tbUsuarios_Usuar_UsuarioModificacion]
GO
ALTER TABLE [Gral].[tbCargos]  WITH CHECK ADD  CONSTRAINT [FK_tbCargos_tbUsuarios_Cargo_UsuarioCreacion] FOREIGN KEY([Cargo_UsuarioCreacion])
REFERENCES [Acce].[tbUsuarios] ([Usuar_Id])
GO
ALTER TABLE [Gral].[tbCargos] CHECK CONSTRAINT [FK_tbCargos_tbUsuarios_Cargo_UsuarioCreacion]
GO
ALTER TABLE [Gral].[tbCargos]  WITH CHECK ADD  CONSTRAINT [FK_tbCargos_tbUsuarios_Cargo_UsuarioModificacion] FOREIGN KEY([Cargo_UsuarioModificacion])
REFERENCES [Acce].[tbUsuarios] ([Usuar_Id])
GO
ALTER TABLE [Gral].[tbCargos] CHECK CONSTRAINT [FK_tbCargos_tbUsuarios_Cargo_UsuarioModificacion]
GO
ALTER TABLE [Gral].[tbCategorias]  WITH CHECK ADD  CONSTRAINT [FK_tbCategorias_tbUsuarios_Categ_UsuarioCreacion] FOREIGN KEY([Categ_UsuarioCreacion])
REFERENCES [Acce].[tbUsuarios] ([Usuar_Id])
GO
ALTER TABLE [Gral].[tbCategorias] CHECK CONSTRAINT [FK_tbCategorias_tbUsuarios_Categ_UsuarioCreacion]
GO
ALTER TABLE [Gral].[tbCategorias]  WITH CHECK ADD  CONSTRAINT [FK_tbCategorias_tbUsuarios_Categ_UsuarioModificacion] FOREIGN KEY([Categ_UsuarioModificacion])
REFERENCES [Acce].[tbUsuarios] ([Usuar_Id])
GO
ALTER TABLE [Gral].[tbCategorias] CHECK CONSTRAINT [FK_tbCategorias_tbUsuarios_Categ_UsuarioModificacion]
GO
ALTER TABLE [Gral].[tbDepartamentos]  WITH CHECK ADD  CONSTRAINT [FK_tbDepartamentos_tbUsuarios_Depar_UsuarioCreacion] FOREIGN KEY([Depar_UsuarioCreacion])
REFERENCES [Acce].[tbUsuarios] ([Usuar_Id])
GO
ALTER TABLE [Gral].[tbDepartamentos] CHECK CONSTRAINT [FK_tbDepartamentos_tbUsuarios_Depar_UsuarioCreacion]
GO
ALTER TABLE [Gral].[tbDepartamentos]  WITH CHECK ADD  CONSTRAINT [FK_tbDepartamentos_tbUsuarios_Depar_UsuarioModificacion] FOREIGN KEY([Depar_UsuarioModificacion])
REFERENCES [Acce].[tbUsuarios] ([Usuar_Id])
GO
ALTER TABLE [Gral].[tbDepartamentos] CHECK CONSTRAINT [FK_tbDepartamentos_tbUsuarios_Depar_UsuarioModificacion]
GO
ALTER TABLE [Gral].[tbEstadosCiviles]  WITH CHECK ADD  CONSTRAINT [FK_tbEstadosCiviles_tbUsuarios_Estad_UsuarioCreacion] FOREIGN KEY([Estad_UsuarioCreacion])
REFERENCES [Acce].[tbUsuarios] ([Usuar_Id])
GO
ALTER TABLE [Gral].[tbEstadosCiviles] CHECK CONSTRAINT [FK_tbEstadosCiviles_tbUsuarios_Estad_UsuarioCreacion]
GO
ALTER TABLE [Gral].[tbEstadosCiviles]  WITH CHECK ADD  CONSTRAINT [FK_tbEstadosCiviles_tbUsuarios_Estad_UsuarioModificacion] FOREIGN KEY([Estad_UsuarioModificacion])
REFERENCES [Acce].[tbUsuarios] ([Usuar_Id])
GO
ALTER TABLE [Gral].[tbEstadosCiviles] CHECK CONSTRAINT [FK_tbEstadosCiviles_tbUsuarios_Estad_UsuarioModificacion]
GO
ALTER TABLE [Gral].[tbImpuestos]  WITH CHECK ADD  CONSTRAINT [FK_tbImpuestos_tbUsuarios_Impue_UsuarioCreacion] FOREIGN KEY([Impue_UsuarioCreacion])
REFERENCES [Acce].[tbUsuarios] ([Usuar_Id])
GO
ALTER TABLE [Gral].[tbImpuestos] CHECK CONSTRAINT [FK_tbImpuestos_tbUsuarios_Impue_UsuarioCreacion]
GO
ALTER TABLE [Gral].[tbImpuestos]  WITH CHECK ADD  CONSTRAINT [FK_tbImpuestos_tbUsuarios_Impue_UsuarioModificacion] FOREIGN KEY([Impue_UsuarioModificacion])
REFERENCES [Acce].[tbUsuarios] ([Usuar_Id])
GO
ALTER TABLE [Gral].[tbImpuestos] CHECK CONSTRAINT [FK_tbImpuestos_tbUsuarios_Impue_UsuarioModificacion]
GO
ALTER TABLE [Gral].[tbMunicipios]  WITH CHECK ADD  CONSTRAINT [FK_tbMunicipios_tbDepartamentos_Depar_Id] FOREIGN KEY([Depar_Id])
REFERENCES [Gral].[tbDepartamentos] ([Depar_Id])
GO
ALTER TABLE [Gral].[tbMunicipios] CHECK CONSTRAINT [FK_tbMunicipios_tbDepartamentos_Depar_Id]
GO
ALTER TABLE [Gral].[tbMunicipios]  WITH CHECK ADD  CONSTRAINT [FK_tbMunicipios_tbUsuarios_Munic_UsuarioCreacion] FOREIGN KEY([Munic_UsuarioCreacion])
REFERENCES [Acce].[tbUsuarios] ([Usuar_Id])
GO
ALTER TABLE [Gral].[tbMunicipios] CHECK CONSTRAINT [FK_tbMunicipios_tbUsuarios_Munic_UsuarioCreacion]
GO
ALTER TABLE [Gral].[tbMunicipios]  WITH CHECK ADD  CONSTRAINT [FK_tbMunicipios_tbUsuarios_Munic_UsuarioModificacion] FOREIGN KEY([Munic_UsuarioModificacion])
REFERENCES [Acce].[tbUsuarios] ([Usuar_Id])
GO
ALTER TABLE [Gral].[tbMunicipios] CHECK CONSTRAINT [FK_tbMunicipios_tbUsuarios_Munic_UsuarioModificacion]
GO
ALTER TABLE [Gral].[tbSubcategorias]  WITH CHECK ADD  CONSTRAINT [FK_tbSubcategorias_tbCategorias_Categ_Id] FOREIGN KEY([Categ_Id])
REFERENCES [Gral].[tbCategorias] ([Categ_Id])
GO
ALTER TABLE [Gral].[tbSubcategorias] CHECK CONSTRAINT [FK_tbSubcategorias_tbCategorias_Categ_Id]
GO
ALTER TABLE [Gral].[tbSubcategorias]  WITH CHECK ADD  CONSTRAINT [FK_tbSubcategorias_tbUsuarios_Subca_UsuarioCreacion] FOREIGN KEY([Subca_UsuarioCreacion])
REFERENCES [Acce].[tbUsuarios] ([Usuar_Id])
GO
ALTER TABLE [Gral].[tbSubcategorias] CHECK CONSTRAINT [FK_tbSubcategorias_tbUsuarios_Subca_UsuarioCreacion]
GO
ALTER TABLE [Gral].[tbSubcategorias]  WITH CHECK ADD  CONSTRAINT [FK_tbSubcategorias_tbUsuarios_Subca_UsuarioModificacion] FOREIGN KEY([Subca_UsuarioModificacion])
REFERENCES [Acce].[tbUsuarios] ([Usuar_Id])
GO
ALTER TABLE [Gral].[tbSubcategorias] CHECK CONSTRAINT [FK_tbSubcategorias_tbUsuarios_Subca_UsuarioModificacion]
GO
ALTER TABLE [Gral].[tbTiposdePagos]  WITH CHECK ADD  CONSTRAINT [FK_tbTiposdePagos_tbUsuarios_Tipos_UsuarioCreacion] FOREIGN KEY([Tipos_UsuarioCreacion])
REFERENCES [Acce].[tbUsuarios] ([Usuar_Id])
GO
ALTER TABLE [Gral].[tbTiposdePagos] CHECK CONSTRAINT [FK_tbTiposdePagos_tbUsuarios_Tipos_UsuarioCreacion]
GO
ALTER TABLE [Gral].[tbTiposdePagos]  WITH CHECK ADD  CONSTRAINT [FK_tbTiposdePagos_tbUsuarios_Tipos_UsuarioModificacion] FOREIGN KEY([Tipos_UsuarioModificacion])
REFERENCES [Acce].[tbUsuarios] ([Usuar_Id])
GO
ALTER TABLE [Gral].[tbTiposdePagos] CHECK CONSTRAINT [FK_tbTiposdePagos_tbUsuarios_Tipos_UsuarioModificacion]
GO
ALTER TABLE [Supr].[tbEmpleados]  WITH CHECK ADD  CONSTRAINT [FK_tbEmpleados_tbCargos_Cargo_Id] FOREIGN KEY([Cargo_Id])
REFERENCES [Gral].[tbCargos] ([Cargo_Id])
GO
ALTER TABLE [Supr].[tbEmpleados] CHECK CONSTRAINT [FK_tbEmpleados_tbCargos_Cargo_Id]
GO
ALTER TABLE [Supr].[tbEmpleados]  WITH CHECK ADD  CONSTRAINT [FK_tbEmpleados_tbEstadosCiviles_Estad_Id] FOREIGN KEY([Estad_Id])
REFERENCES [Gral].[tbEstadosCiviles] ([Estad_Id])
GO
ALTER TABLE [Supr].[tbEmpleados] CHECK CONSTRAINT [FK_tbEmpleados_tbEstadosCiviles_Estad_Id]
GO
ALTER TABLE [Supr].[tbEmpleados]  WITH CHECK ADD  CONSTRAINT [FK_tbEmpleados_tbMunicipios_Munic_Id] FOREIGN KEY([Munic_Id])
REFERENCES [Gral].[tbMunicipios] ([Munic_Id])
GO
ALTER TABLE [Supr].[tbEmpleados] CHECK CONSTRAINT [FK_tbEmpleados_tbMunicipios_Munic_Id]
GO
ALTER TABLE [Supr].[tbEmpleados]  WITH CHECK ADD  CONSTRAINT [FK_tbEmpleados_tbSucursales_Sucur_Id] FOREIGN KEY([Sucur_Id])
REFERENCES [Supr].[tbSucursales] ([Sucur_Id])
GO
ALTER TABLE [Supr].[tbEmpleados] CHECK CONSTRAINT [FK_tbEmpleados_tbSucursales_Sucur_Id]
GO
ALTER TABLE [Supr].[tbEmpleados]  WITH CHECK ADD  CONSTRAINT [FK_tbEmpleados_tbUsuarios_Emple_UsuarioCreacion] FOREIGN KEY([Emple_UsuarioCreacion])
REFERENCES [Acce].[tbUsuarios] ([Usuar_Id])
GO
ALTER TABLE [Supr].[tbEmpleados] CHECK CONSTRAINT [FK_tbEmpleados_tbUsuarios_Emple_UsuarioCreacion]
GO
ALTER TABLE [Supr].[tbEmpleados]  WITH CHECK ADD  CONSTRAINT [FK_tbEmpleados_tbUsuarios_Emple_UsuarioModificacion] FOREIGN KEY([Emple_UsuarioModificacion])
REFERENCES [Acce].[tbUsuarios] ([Usuar_Id])
GO
ALTER TABLE [Supr].[tbEmpleados] CHECK CONSTRAINT [FK_tbEmpleados_tbUsuarios_Emple_UsuarioModificacion]
GO
ALTER TABLE [Supr].[tbLotes]  WITH CHECK ADD  CONSTRAINT [FK_tbLotes_tbProductos_Produ_Id] FOREIGN KEY([Produ_Id])
REFERENCES [Supr].[tbProductos] ([Produ_Id])
GO
ALTER TABLE [Supr].[tbLotes] CHECK CONSTRAINT [FK_tbLotes_tbProductos_Produ_Id]
GO
ALTER TABLE [Supr].[tbLotes]  WITH CHECK ADD  CONSTRAINT [FK_tbLotes_tbSucursales_Sucur_Id] FOREIGN KEY([Sucur_Id])
REFERENCES [Supr].[tbSucursales] ([Sucur_Id])
GO
ALTER TABLE [Supr].[tbLotes] CHECK CONSTRAINT [FK_tbLotes_tbSucursales_Sucur_Id]
GO
ALTER TABLE [Supr].[tbLotes]  WITH CHECK ADD  CONSTRAINT [FK_tbLotes_tbUsuarios_Lotes_UsuarioCreacion] FOREIGN KEY([Lotes_UsuarioCreacion])
REFERENCES [Acce].[tbUsuarios] ([Usuar_Id])
GO
ALTER TABLE [Supr].[tbLotes] CHECK CONSTRAINT [FK_tbLotes_tbUsuarios_Lotes_UsuarioCreacion]
GO
ALTER TABLE [Supr].[tbLotes]  WITH CHECK ADD  CONSTRAINT [FK_tbLotes_tbUsuarios_Lotes_UsuarioModificacion] FOREIGN KEY([Lotes_UsuarioModificacion])
REFERENCES [Acce].[tbUsuarios] ([Usuar_Id])
GO
ALTER TABLE [Supr].[tbLotes] CHECK CONSTRAINT [FK_tbLotes_tbUsuarios_Lotes_UsuarioModificacion]
GO
ALTER TABLE [Supr].[tbProductos]  WITH CHECK ADD  CONSTRAINT [FK_tbProdcutos_tbProveedores_Prove_Id] FOREIGN KEY([Prove_Id])
REFERENCES [Supr].[tbProveedores] ([Prove_Id])
GO
ALTER TABLE [Supr].[tbProductos] CHECK CONSTRAINT [FK_tbProdcutos_tbProveedores_Prove_Id]
GO
ALTER TABLE [Supr].[tbProductos]  WITH CHECK ADD  CONSTRAINT [FK_tbProductos_tbImpuestos_Impue_Id] FOREIGN KEY([Impue_Id])
REFERENCES [Gral].[tbImpuestos] ([Impue_Id])
GO
ALTER TABLE [Supr].[tbProductos] CHECK CONSTRAINT [FK_tbProductos_tbImpuestos_Impue_Id]
GO
ALTER TABLE [Supr].[tbProductos]  WITH CHECK ADD  CONSTRAINT [FK_tbProductos_tbSubcategorias_Subca_Id] FOREIGN KEY([Subca_Id])
REFERENCES [Gral].[tbSubcategorias] ([Subca_Id])
GO
ALTER TABLE [Supr].[tbProductos] CHECK CONSTRAINT [FK_tbProductos_tbSubcategorias_Subca_Id]
GO
ALTER TABLE [Supr].[tbProductos]  WITH CHECK ADD  CONSTRAINT [FK_tbProductos_tbUsuarios_Produ_UsuarioCreacion] FOREIGN KEY([Produ_UsuarioCreacion])
REFERENCES [Acce].[tbUsuarios] ([Usuar_Id])
GO
ALTER TABLE [Supr].[tbProductos] CHECK CONSTRAINT [FK_tbProductos_tbUsuarios_Produ_UsuarioCreacion]
GO
ALTER TABLE [Supr].[tbProductos]  WITH CHECK ADD  CONSTRAINT [FK_tbProductos_tbUsuarios_Produ_UsuarioModificacion] FOREIGN KEY([Produ_UsuarioModificacion])
REFERENCES [Acce].[tbUsuarios] ([Usuar_Id])
GO
ALTER TABLE [Supr].[tbProductos] CHECK CONSTRAINT [FK_tbProductos_tbUsuarios_Produ_UsuarioModificacion]
GO
ALTER TABLE [Supr].[tbPromociones]  WITH CHECK ADD  CONSTRAINT [FK_tbPromociones_tbProductos_Produ_Id] FOREIGN KEY([Produ_Id])
REFERENCES [Supr].[tbProductos] ([Produ_Id])
GO
ALTER TABLE [Supr].[tbPromociones] CHECK CONSTRAINT [FK_tbPromociones_tbProductos_Produ_Id]
GO
ALTER TABLE [Supr].[tbPromociones]  WITH CHECK ADD  CONSTRAINT [FK_tbPromociones_tbUsuarios_Promo_UsuarioCreacion] FOREIGN KEY([Promo_UsuarioCreacion])
REFERENCES [Acce].[tbUsuarios] ([Usuar_Id])
GO
ALTER TABLE [Supr].[tbPromociones] CHECK CONSTRAINT [FK_tbPromociones_tbUsuarios_Promo_UsuarioCreacion]
GO
ALTER TABLE [Supr].[tbPromociones]  WITH CHECK ADD  CONSTRAINT [FK_tbPromociones_tbUsuarios_Promo_UsuarioModificacion] FOREIGN KEY([Promo_UsuarioModificacion])
REFERENCES [Acce].[tbUsuarios] ([Usuar_Id])
GO
ALTER TABLE [Supr].[tbPromociones] CHECK CONSTRAINT [FK_tbPromociones_tbUsuarios_Promo_UsuarioModificacion]
GO
ALTER TABLE [Supr].[tbProveedores]  WITH CHECK ADD  CONSTRAINT [FK_tbProveedores_tbMunicipios_Munic_Id] FOREIGN KEY([Munic_Id])
REFERENCES [Gral].[tbMunicipios] ([Munic_Id])
GO
ALTER TABLE [Supr].[tbProveedores] CHECK CONSTRAINT [FK_tbProveedores_tbMunicipios_Munic_Id]
GO
ALTER TABLE [Supr].[tbProveedores]  WITH CHECK ADD  CONSTRAINT [FK_tbProveedores_tbUsuarios_Prove_UsuarioCreacion] FOREIGN KEY([Prove_UsuarioCreacion])
REFERENCES [Acce].[tbUsuarios] ([Usuar_Id])
GO
ALTER TABLE [Supr].[tbProveedores] CHECK CONSTRAINT [FK_tbProveedores_tbUsuarios_Prove_UsuarioCreacion]
GO
ALTER TABLE [Supr].[tbProveedores]  WITH CHECK ADD  CONSTRAINT [FK_tbProveedores_tbUsuarios_Prove_UsuarioModificacion] FOREIGN KEY([Prove_UsuarioModificacion])
REFERENCES [Acce].[tbUsuarios] ([Usuar_Id])
GO
ALTER TABLE [Supr].[tbProveedores] CHECK CONSTRAINT [FK_tbProveedores_tbUsuarios_Prove_UsuarioModificacion]
GO
ALTER TABLE [Supr].[tbSucursales]  WITH CHECK ADD  CONSTRAINT [FK_tbSucursales_tbMunicipios_Munic_Id] FOREIGN KEY([Munic_Id])
REFERENCES [Gral].[tbMunicipios] ([Munic_Id])
GO
ALTER TABLE [Supr].[tbSucursales] CHECK CONSTRAINT [FK_tbSucursales_tbMunicipios_Munic_Id]
GO
ALTER TABLE [Supr].[tbSucursales]  WITH CHECK ADD  CONSTRAINT [FK_tbSucursales_tbUsuarios_Sucur_UsuarioCreacion] FOREIGN KEY([Sucur_UsuarioCreacion])
REFERENCES [Acce].[tbUsuarios] ([Usuar_Id])
GO
ALTER TABLE [Supr].[tbSucursales] CHECK CONSTRAINT [FK_tbSucursales_tbUsuarios_Sucur_UsuarioCreacion]
GO
ALTER TABLE [Supr].[tbSucursales]  WITH CHECK ADD  CONSTRAINT [FK_tbSucursales_tbUsuarios_Sucur_UsuarioModificacion] FOREIGN KEY([Sucur_UsuarioModificacion])
REFERENCES [Acce].[tbUsuarios] ([Usuar_Id])
GO
ALTER TABLE [Supr].[tbSucursales] CHECK CONSTRAINT [FK_tbSucursales_tbUsuarios_Sucur_UsuarioModificacion]
GO
ALTER TABLE [Venta].[tbClientes]  WITH CHECK ADD  CONSTRAINT [FK_tbClientes_tbEstadosCiviles_Estad_Id] FOREIGN KEY([Estad_Id])
REFERENCES [Gral].[tbEstadosCiviles] ([Estad_Id])
GO
ALTER TABLE [Venta].[tbClientes] CHECK CONSTRAINT [FK_tbClientes_tbEstadosCiviles_Estad_Id]
GO
ALTER TABLE [Venta].[tbClientes]  WITH CHECK ADD  CONSTRAINT [FK_tbClientes_tbMunicipios_Munic_Id] FOREIGN KEY([Munic_Id])
REFERENCES [Gral].[tbMunicipios] ([Munic_Id])
GO
ALTER TABLE [Venta].[tbClientes] CHECK CONSTRAINT [FK_tbClientes_tbMunicipios_Munic_Id]
GO
ALTER TABLE [Venta].[tbClientes]  WITH CHECK ADD  CONSTRAINT [FK_tbClientes_tbUsuarios_Clien_UsuarioCreacion] FOREIGN KEY([Clien_UsuarioCreacion])
REFERENCES [Acce].[tbUsuarios] ([Usuar_Id])
GO
ALTER TABLE [Venta].[tbClientes] CHECK CONSTRAINT [FK_tbClientes_tbUsuarios_Clien_UsuarioCreacion]
GO
ALTER TABLE [Venta].[tbClientes]  WITH CHECK ADD  CONSTRAINT [FK_tbClientes_tbUsuarios_Clien_UsuarioModificacion] FOREIGN KEY([Clien_UsuarioModificacion])
REFERENCES [Acce].[tbUsuarios] ([Usuar_Id])
GO
ALTER TABLE [Venta].[tbClientes] CHECK CONSTRAINT [FK_tbClientes_tbUsuarios_Clien_UsuarioModificacion]
GO
ALTER TABLE [Venta].[tbVentasDetalle]  WITH CHECK ADD  CONSTRAINT [FK_tbVentasDetalle_tbLotes_Lotes_Id] FOREIGN KEY([Lotes_Id])
REFERENCES [Supr].[tbLotes] ([Lotes_Id])
GO
ALTER TABLE [Venta].[tbVentasDetalle] CHECK CONSTRAINT [FK_tbVentasDetalle_tbLotes_Lotes_Id]
GO
ALTER TABLE [Venta].[tbVentasDetalle]  WITH CHECK ADD  CONSTRAINT [FK_tbVentasDetalle_tbUsuarios_Vende_UsuarioCreacion] FOREIGN KEY([Vende_UsuarioCreacion])
REFERENCES [Acce].[tbUsuarios] ([Usuar_Id])
GO
ALTER TABLE [Venta].[tbVentasDetalle] CHECK CONSTRAINT [FK_tbVentasDetalle_tbUsuarios_Vende_UsuarioCreacion]
GO
ALTER TABLE [Venta].[tbVentasDetalle]  WITH CHECK ADD  CONSTRAINT [FK_tbVentasDetalle_tbUsuarios_Vende_UsuarioModificacion] FOREIGN KEY([Vende_UsuarioModificacion])
REFERENCES [Acce].[tbUsuarios] ([Usuar_Id])
GO
ALTER TABLE [Venta].[tbVentasDetalle] CHECK CONSTRAINT [FK_tbVentasDetalle_tbUsuarios_Vende_UsuarioModificacion]
GO
ALTER TABLE [Venta].[tbVentasDetalle]  WITH CHECK ADD  CONSTRAINT [FK_tbVentasDetalle_tbVentasEncabezado_Venen_Id] FOREIGN KEY([Venen_Id])
REFERENCES [Venta].[tbVentasEncabezado] ([Venen_Id])
GO
ALTER TABLE [Venta].[tbVentasDetalle] CHECK CONSTRAINT [FK_tbVentasDetalle_tbVentasEncabezado_Venen_Id]
GO
ALTER TABLE [Venta].[tbVentasEncabezado]  WITH CHECK ADD  CONSTRAINT [FK_tbVentasEncabezado_tbClientes_Clien_Id] FOREIGN KEY([Clien_Id])
REFERENCES [Venta].[tbClientes] ([Clien_Id])
GO
ALTER TABLE [Venta].[tbVentasEncabezado] CHECK CONSTRAINT [FK_tbVentasEncabezado_tbClientes_Clien_Id]
GO
ALTER TABLE [Venta].[tbVentasEncabezado]  WITH CHECK ADD  CONSTRAINT [FK_tbVentasEncabezado_tbSucursales_Sucur_Id] FOREIGN KEY([Sucur_Id])
REFERENCES [Supr].[tbSucursales] ([Sucur_Id])
GO
ALTER TABLE [Venta].[tbVentasEncabezado] CHECK CONSTRAINT [FK_tbVentasEncabezado_tbSucursales_Sucur_Id]
GO
ALTER TABLE [Venta].[tbVentasEncabezado]  WITH CHECK ADD  CONSTRAINT [FK_tbVentasEncabezado_tbTiposdePagos_Tipos_Id] FOREIGN KEY([Tipos_Id])
REFERENCES [Gral].[tbTiposdePagos] ([Tipos_Id])
GO
ALTER TABLE [Venta].[tbVentasEncabezado] CHECK CONSTRAINT [FK_tbVentasEncabezado_tbTiposdePagos_Tipos_Id]
GO
ALTER TABLE [Venta].[tbVentasEncabezado]  WITH CHECK ADD  CONSTRAINT [FK_tbVentasEncabezado_tbUsuarios_Usuar_Id] FOREIGN KEY([Usuar_Id])
REFERENCES [Acce].[tbUsuarios] ([Usuar_Id])
GO
ALTER TABLE [Venta].[tbVentasEncabezado] CHECK CONSTRAINT [FK_tbVentasEncabezado_tbUsuarios_Usuar_Id]
GO
ALTER TABLE [Venta].[tbVentasEncabezado]  WITH CHECK ADD  CONSTRAINT [FK_tbVentasEncabezado_tbUsuarios_Venen_UsuarioCreacion] FOREIGN KEY([Venen_UsuarioCreacion])
REFERENCES [Acce].[tbUsuarios] ([Usuar_Id])
GO
ALTER TABLE [Venta].[tbVentasEncabezado] CHECK CONSTRAINT [FK_tbVentasEncabezado_tbUsuarios_Venen_UsuarioCreacion]
GO
ALTER TABLE [Venta].[tbVentasEncabezado]  WITH CHECK ADD  CONSTRAINT [FK_tbVentasEncabezado_tbUsuarios_Venen_UsuarioModificacion] FOREIGN KEY([Venen_UsuarioModificacion])
REFERENCES [Acce].[tbUsuarios] ([Usuar_Id])
GO
ALTER TABLE [Venta].[tbVentasEncabezado] CHECK CONSTRAINT [FK_tbVentasEncabezado_tbUsuarios_Venen_UsuarioModificacion]
GO
ALTER TABLE [Supr].[tbEmpleados]  WITH CHECK ADD  CONSTRAINT [CK_tbEmpleados_Emple_Sexo] CHECK  (([Emple_Sexo]='F' OR [Emple_Sexo]='M'))
GO
ALTER TABLE [Supr].[tbEmpleados] CHECK CONSTRAINT [CK_tbEmpleados_Emple_Sexo]
GO
ALTER TABLE [Venta].[tbClientes]  WITH CHECK ADD  CONSTRAINT [CK_tbClientes_Clien_Sexo] CHECK  (([Clien_Sexo]='F' OR [Clien_Sexo]='M'))
GO
ALTER TABLE [Venta].[tbClientes] CHECK CONSTRAINT [CK_tbClientes_Clien_Sexo]
GO
/****** Object:  StoredProcedure [Acce].[SP_PantallaPorRol_Desactivar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



create PROCEDURE [Acce].[SP_PantallaPorRol_Desactivar]
    @Papro_Id INT
AS
BEGIN
    BEGIN TRY
        DELETE FROM Acce.tbPantallasPorRoles
		WHERE Papro_Id = @Papro_Id;
        SELECT 1 AS Resultado;
    END TRY
    BEGIN CATCH
        SELECT 0 AS Resultado;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [Acce].[SP_PantallaPorRol_Insertar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Acce].[SP_PantallaPorRol_Insertar]
    @Panta_Id INT,
     @Roles_Id INT,
     @Papro_UsuarioCreacion INT,
     @Papro_FechaCreacion DATETIME
AS 
BEGIN
BEGIN TRY

	DECLARE @EXIST INT = (
		SELECT COUNT(Papro_Id) FROM Acce.tbPantallasPorRoles 
		WHERE Panta_Id = @Panta_Id AND Roles_Id = @Roles_Id
	);

	DECLARE @EXIST_INACTIVE INT = (
		SELECT COUNT(Papro_Id) FROM Acce.tbPantallasPorRoles 
		WHERE Panta_Id = @Panta_Id AND Roles_Id = @Roles_Id AND Papro_Estado = 0
	);

   IF (@EXIST = 0)
   BEGIN
		INSERT INTO Acce.tbPantallasPorRoles(
			Panta_Id ,
			Roles_Id ,
			Papro_UsuarioCreacion ,
			Papro_FechaCreacion ,
			Papro_Estado 
		)
		VALUES (
			 @Panta_Id ,
			 @Roles_Id ,
			 @Papro_UsuarioCreacion ,
			 @Papro_FechaCreacion ,
			 1
		)
	END
	ELSE IF (@EXIST_INACTIVE >= 1)
	BEGIN
		UPDATE Acce.tbPantallasPorRoles SET Papro_Estado = 1
		WHERE Panta_Id = @Panta_Id AND Roles_Id = @Roles_Id
	END

	SELECT 1 AS Result,'' as error
    END TRY
    BEGIN CATCH
      
        SELECT 0 AS Result,ERROR_MESSAGE() as error
    END CATCH
END
GO
/****** Object:  StoredProcedure [Acce].[SP_PantallaPorRol_Lista]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE PROCEDURE [Acce].[SP_PantallaPorRol_Lista]
AS
BEGIN
SELECT * FROM Acce.tbPantallas AS PANT
INNER JOIN Acce.tbPantallasPorRoles AS PARO ON PANT.Panta_Id = PARO.Panta_Id
INNER JOIN Acce.tbRoles AS ROL ON PARO.Roles_Id = ROL.Roles_Id
WHERE Papro_Estado = 1
END
GO
/****** Object:  StoredProcedure [Acce].[SP_PantallaPorRol_PorRol]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Acce].[SP_PantallaPorRol_PorRol]
@Roles_Id INT
AS
BEGIN
SELECT * FROM Acce.tbPantallas AS PANT
INNER JOIN Acce.tbPantallasPorRoles AS PARO ON PANT.Panta_Id = PARO.Panta_Id
INNER JOIN Acce.tbRoles AS ROL ON PARO.Roles_Id = ROL.Roles_Id
WHERE PARO.Roles_Id = @Roles_Id AND Papro_Estado = 1
END
GO
/****** Object:  StoredProcedure [Acce].[SP_Pantallas_Lista]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Acce].[SP_Pantallas_Lista]
AS
BEGIN
SELECT [Panta_Id]
      ,[Panta_Descripcion]
      ,[Panta_Esquema] FROM Acce.tbPantallas
WHERE Panta_Estado = 1
END
GO
/****** Object:  StoredProcedure [Acce].[sp_Pantallas_listar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [Acce].[sp_Pantallas_listar] 
AS
BEGIN
  SELECT 
    [Panta_Id], 
    [Panta_Descripcion], 
    [Panta_UsuarioCreacion], 
    [Panta_FechaCreacion], 
    [Panta_UsuarioModificacion], 
    [Panta_FechaModificacion]
  FROM [Acce].[tbPantallas]  
  WHERE [Panta_Estado] = 1; 
END;
GO
/****** Object:  StoredProcedure [Acce].[sp_PantallasPorRol2_buscar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create   PROCEDURE [Acce].[sp_PantallasPorRol2_buscar] 
    @Rol_Id INT
AS
BEGIN
    SELECT 
        Papro_Id,
        Panta_Id,
        paro.Roles_Id,
        Roles_Descripcion,
		'SI' AS Agregado 
    FROM 
         [Acce].[tbPantallasPorRoles] AS paro
        JOIN Acce.tbRoles AS r on paro.Roles_Id = r.Roles_Id
    WHERE
        paro.[Roles_Id] = @Rol_Id ;
END;
GO
/****** Object:  StoredProcedure [Acce].[sp_PantallasPorRoles_actualizar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [Acce].[sp_PantallasPorRoles_actualizar]
    @PaR_Id INT,
    @Rol_Id INT,
    @Ptl_Id INT
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        UPDATE [Acce].[tbPantallasPorRoles]
        SET 
            Roles_Id = @Rol_Id,
             Panta_Id = @Ptl_Id
        WHERE
            Papro_Id = @PaR_Id;

        SELECT 1;

        COMMIT;
    END TRY
    BEGIN CATCH
        SELECT 0;
        ROLLBACK;
    END CATCH;
END;
GO
/****** Object:  StoredProcedure [Acce].[sp_PantallasPorRoles_buscar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [Acce].[sp_PantallasPorRoles_buscar]
    @PaR_Id INT
AS
BEGIN
    SELECT 
        Papro_Id,
        Roles_Id,
        Panta_Id
    FROM 
        tbPantallasPorRoles
    WHERE
        Papro_Id = @PaR_Id;
END;
GO
/****** Object:  StoredProcedure [Acce].[sp_PantallasPorRoles_eliminar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Acce].[sp_PantallasPorRoles_eliminar]
    @Rol_Id INT
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        DELETE FROM [Acce].[tbPantallasPorRoles]
        WHERE Roles_Id = @Rol_Id;

        SELECT 1 AS Resultado;

        COMMIT;
    END TRY
    BEGIN CATCH
        SELECT 0 AS Resultado;
        ROLLBACK;
    END CATCH;
END;
GO
/****** Object:  StoredProcedure [Acce].[sp_PantallasPorRoles_insertar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [Acce].[sp_PantallasPorRoles_insertar]
    @Rol_Id INT,
    @Ptl_Id INT
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        INSERT INTO [Acce].[tbPantallasPorRoles] 
        (
            Roles_Id, 
            Panta_Id
        )
        VALUES 
        (
            @Rol_Id, 
            @Ptl_Id
        );

        SELECT 1;

        COMMIT;
    END TRY
    BEGIN CATCH
        SELECT 0; 
        ROLLBACK;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [Acce].[sp_PantallasRoles_Detalles]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [Acce].[sp_PantallasRoles_Detalles]
    @Rol_Id INT
AS
BEGIN
    SELECT	PanRo.Roles_Id,
			PAN.Panta_Id,
			Panta_Descripcion
	FROM [Acce].[tbPantallasPorRoles] AS PanRo 
	INNER JOIN [Acce].[tbPantallas] AS PAN ON PAN.Panta_Id = PanRo.Panta_Id
	WHERE  Pan.Panta_Id = 1 AND PanRo.Roles_Id = @Rol_Id
END;
GO
/****** Object:  StoredProcedure [Acce].[sp_PantallasRoles_listar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCedure [Acce].[sp_PantallasRoles_listar]
as
begin
SELECT PR.Panta_Id, P.Panta_Descripcion AS Pantalla, R.Roles_Descripcion
FROM [Acce].[tbPantallasPorRoles] PR 
INNER JOIN Acce.tbPantallas P ON PR.Panta_Id =P.Panta_Id 
INNER JOIN[Acce].[tbRoles] R ON PR.Roles_Id= R.Roles_Id
end
GO
/****** Object:  StoredProcedure [Acce].[SP_Rol_Buscar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Acce].[SP_Rol_Buscar] 
    @Roles_Id INT
AS
BEGIN
    SELECT
        rol.*,
        creacion.Usuar_Usuario AS UsuarioCreacion,
		CASE WHEN rol.Roles_UsuarioModificacion = modificacion.Usuar_Id THEN modificacion.Usuar_Usuario  ELSE 'No se ha modificado' END AS UsuarioModificacion
    FROM
        Acce.tbRoles rol
    LEFT JOIN
        Acce.tbUsuarios creacion
        ON rol.Roles_UsuarioCreacion = creacion.Usuar_Id
    LEFT JOIN
        Acce.tbUsuarios modificacion
        ON rol.Roles_UsuarioModificacion = modificacion.Usuar_Id
    WHERE
        rol.Roles_Id = @Roles_Id
END
GO
/****** Object:  StoredProcedure [Acce].[SP_Rol_Buscarr]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Acce].[SP_Rol_Buscarr]
@Roles_Descripcion VARCHAR(50)
AS BEGIN
SELECT * FROM Acce.tbRoles WHERE Roles_Descripcion = @Roles_Descripcion
END
GO
/****** Object:  StoredProcedure [Acce].[SP_Rol_Desactivar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Acce].[SP_Rol_Desactivar]
    @Roles_Id INT
AS
BEGIN
    DECLARE @NumeroDeRelaciones INT = 0

    SET @NumeroDeRelaciones = (
        SELECT COUNT(*)
        FROM Acce.tbUsuarios 
        WHERE Roles_Id = @Roles_Id
    )

    BEGIN TRY
        IF @NumeroDeRelaciones = 0
        BEGIN
            UPDATE Acce.tbRoles
            SET
                Roles_Estado = 0
            WHERE
                Roles_Id = @Roles_Id

            SELECT 1  
        END
        ELSE
        BEGIN
            SELECT 0  
        END
    END TRY
    BEGIN CATCH
        SELECT -1  
    END CATCH
END
GO
/****** Object:  StoredProcedure [Acce].[SP_Rol_Insertar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Acce].[SP_Rol_Insertar]
    @Roles_Descripcion NVARCHAR(50),
    @Roles_UsuarioCreacion INT,
    @Roles_FechaCreacion DATETIME
AS
BEGIN
    BEGIN TRY
        INSERT INTO Acce.tbRoles (
            Roles_Descripcion,
            Roles_UsuarioCreacion,
            Roles_FechaCreacion
        )
        VALUES (
            @Roles_Descripcion,
            @Roles_UsuarioCreacion,
            @Roles_FechaCreacion
        )

        SELECT 1 
    END TRY
    BEGIN CATCH
        SELECT 0  
    END CATCH
END
GO
/****** Object:  StoredProcedure [Acce].[SP_Rol_Lista]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Acce].[SP_Rol_Lista]
AS
BEGIN
    SELECT
        rol.*,
        creacion.Usuar_Usuario AS UsuarioCreacion,
        modificacion.Usuar_Usuario AS UsuarioModificacion
    FROM
        Acce.tbRoles rol
    LEFT JOIN
        Acce.tbUsuarios creacion
        ON rol.Roles_UsuarioCreacion = creacion.Usuar_Id
    LEFT JOIN
        Acce.tbUsuarios modificacion
        ON rol.Roles_UsuarioModificacion = modificacion.Usuar_Id
		Where rol.Roles_Estado = 1
END
GO
/****** Object:  StoredProcedure [Acce].[SP_Rol_Modificar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Acce].[SP_Rol_Modificar]
    @Roles_Id INT,
    @Roles_Descripcion NVARCHAR(50),
    @Roles_UsuarioModificacion INT,
    @Roles_FechaModificacion DATETIME
AS
BEGIN
    BEGIN TRY
        UPDATE Acce.tbRoles
        SET
            Roles_Descripcion = @Roles_Descripcion,
            Roles_UsuarioModificacion = @Roles_UsuarioModificacion,
            Roles_FechaModificacion = @Roles_FechaModificacion
        WHERE
            Roles_Id = @Roles_Id

        SELECT 1  -- Indicar éxito
    END TRY
    BEGIN CATCH
        SELECT 0  -- Indicar error
    END CATCH
END
GO
/****** Object:  StoredProcedure [Acce].[SP_Rol_Mostrar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Acce].[SP_Rol_Mostrar]
AS
BEGIN
    SET NOCOUNT ON;

    SELECT [Roles_Id]
          ,[Roles_Descripcion]
          ,[Roles_UsuarioCreacion]
          ,[Roles_FechaCreacion]
          ,[Roles_UsuarioModificacion]
          ,[Roles_FechaModificacion]
          ,[Roles_Estado]
    FROM [Acce].[tbRoles]
    WHERE [Roles_Estado] = 1  -- Asumiendo que solo quieres listar roles activos
    ORDER BY [Roles_Descripcion];  -- Ordena los resultados por la descripción del rol
END
GO
/****** Object:  StoredProcedure [Acce].[sp_Roles_actualizar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Acce].[sp_Roles_actualizar]
    @Rol_Id INT,
    @Rol_Descripcion NVARCHAR(60),
    @Rol_Modifica INT,
    @Rol_FechaCreacion DATETIME
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        UPDATE [Acce].[tbRoles]
        SET
            [Roles_Descripcion] = @Rol_Descripcion,
            [Roles_UsuarioModificacion] = @Rol_Modifica,
            [Roles_FechaModificacion] = @Rol_FechaCreacion
        WHERE
            [Roles_Id] = @Rol_Id;

        SELECT 1;

        COMMIT;
    END TRY
    BEGIN CATCH
        SELECT 0;
        ROLLBACK;
    END CATCH;
END;
GO
/****** Object:  StoredProcedure [Acce].[sp_Roles_buscar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Acce].[sp_Roles_buscar] 
    @Rol_Id INT
AS
BEGIN
    SELECT 
        c.Roles_Id,
        [Roles_Descripcion],
        [Roles_UsuarioCreacion],
        [Roles_UsuarioModificacion],
		FORMAT([Roles_FechaCreacion], 'yyyy-MM-dd') AS FechaCreacion,
		FORMAT([Roles_FechaModificacion], 'yyyy-MM-dd') AS FechaModificacion,
		ucreacion.Usuar_Usuario AS UsuarioCreacion,
		CASE WHEN c.Roles_UsuarioModificacion = uModificador.Usuar_Id THEN uModificador.Usuar_Usuario  ELSE 'No se ha modificado' END AS UsuarioModificacion,
   
        [Roles_Estado]
    FROM 
        [Acce].[tbRoles] c 
		LEFT JOIN Acce.tbUsuarios uCreacion ON uCreacion.Usuar_Id = c.[Roles_UsuarioCreacion]
		LEFT JOIN Acce.tbUsuarios uModificador ON uModificador.Usuar_Id = c.[Roles_UsuarioModificacion]
    WHERE
        c.[Roles_Id] = @Rol_Id;
END;
GO
/****** Object:  StoredProcedure [Acce].[sp_Roles_Detalles]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Acce].[sp_Roles_Detalles]
    @Rol_Id INT
AS
BEGIN
    SELECT * FROM tbRoles
    WHERE Roles_Id = @Rol_Id;
END;
GO
/****** Object:  StoredProcedure [Acce].[sp_Roles_eliminar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Acce].[sp_Roles_eliminar]
    @Rol_Id INT
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        DELETE FROM [Acce].[tbRoles]
        WHERE Roles_Id = @Rol_Id;

        SELECT 1 AS Resultado;

        COMMIT;
    END TRY
    BEGIN CATCH
        SELECT 0 AS Resultado;
        ROLLBACK;
    END CATCH;
END;
GO
/****** Object:  StoredProcedure [Acce].[sp_Roles_insertar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Acce].[sp_Roles_insertar]
    @Rol_Descripcion VARCHAR(50),
    @Rol_Creacion INT,
    @Rol_FechaCreacion DATETIME
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        INSERT INTO [Acce].[tbRoles] 
        (
            [Roles_Descripcion], 
            [Roles_UsuarioCreacion], 
            [Roles_FechaCreacion]
        )
        VALUES 
        (
            @Rol_Descripcion, 
            @Rol_Creacion, 
            @Rol_FechaCreacion
        );

        SELECT 1;

        COMMIT;
    END TRY
    BEGIN CATCH
        SELECT 0; 
        ROLLBACK;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [Acce].[sp_Roles_listar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [Acce].[sp_Roles_listar]
AS
BEGIN
SELECT * FROM Acce.tbRoles
END
GO
/****** Object:  StoredProcedure [Acce].[sp_Roles2_insertar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [Acce].[sp_Roles2_insertar]
  @Rol_Descripcion NVARCHAR(60),
    @Rol_Creacion INT,
    @Rol_FechaCreacion DATETIME,
    @ID INT OUTPUT
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        INSERT INTO [Acce].[tbRoles] ([Roles_Descripcion], [Roles_UsuarioCreacion],  [Roles_FechaCreacion])
        VALUES (@Rol_Descripcion, @Rol_Creacion, @Rol_FechaCreacion);

        SET @ID = SCOPE_IDENTITY();
        COMMIT;
    END TRY
    BEGIN CATCH
        SELECT @ID = 0;
        ROLLBACK;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [Acce].[SP_Usuario_Buscar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Acce].[SP_Usuario_Buscar] 
	@Usuar_Id INT
AS
BEGIN
	SELECT
			usu.*,
			creacion.Usuar_Usuario AS UsuarioCreacion,
			case when usu.Usuar_Admin = 1 THEN 'Si' ELSE 'No' END AS Esadmin,
		CASE WHEN usu.Usuar_UsuarioModificacion = modificacion.Usuar_Id THEN modificacion.Usuar_Usuario  ELSE 'No se ha modificado' END AS UsuarioModificacion
,			roles.Roles_Descripcion,
FORMAT(usu.Usuar_FechaCreacion, 'yyyy-MM-dd') as Usuar_FechaCreacion,
		FORMAT(usu.Usuar_FechaModificacion, 'yyyy-MM-dd') as Usuar_FechaModificacion,
			CASE usu.Perso_Tipo WHEN 0 THEN emp.Emple_Correo END AS Emple_Correo,
						CASE usu.Perso_Tipo WHEN 0 THEN
							CONCAT(emp.Emple_PrimerNombre,' ',
								CASE WHEN emp.Emple_SegundoNombre IS NULL THEN '' ELSE emp.Emple_SegundoNombre + ' ' END,
								emp.Emple_PrimerApellido, 
								CASE WHEN emp.Emple_SegundoApellido IS NULL THEN '' ELSE ' ' + emp.Emple_SegundoApellido END
							)
						WHEN 1 THEN
							CONCAT(cli.Clien_PrimerNombre,' ',
								CASE WHEN cli.Clien_SegundoNombre IS NULL THEN '' ELSE cli.Clien_SegundoNombre + ' ' END,
								cli.Clien_PrimerApellido, 
								CASE WHEN cli.Clien_SegundoApellido IS NULL THEN '' ELSE ' ' + cli.Clien_SegundoApellido END
							)
						END AS Perso_NombreCompleto
			
	FROM Acce.tbUsuarios usu
	LEFT JOIN Supr.tbEmpleados AS emp ON emp.Emple_Id = usu.Perso_Id 
	LEFT JOIN venta.tbClientes AS cli ON cli.Clien_Id = usu.Perso_Id
	LEFT JOIN Acce.tbRoles roles ON usu.Roles_Id = roles.Roles_Id
	LEFT JOIN Acce.tbUsuarios creacion ON usu.Usuar_UsuarioCreacion = creacion.Usuar_Id
	LEFT JOIN Acce.tbUsuarios modificacion ON usu.Usuar_UsuarioModificacion = modificacion.Usuar_Id
	WHERE usu.Usuar_Id = @Usuar_Id
END
GO
/****** Object:  StoredProcedure [Acce].[SP_Usuario_CambiarContrasena]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Acce].[SP_Usuario_CambiarContrasena]
	@Usuar_Id INT,
	@Usuar_OldContrasena NVARCHAR(MAX),
	@Usuar_NewContrasena NVARCHAR(MAX),
	@Usuar_UsuarioModificacion INT,
	@Usuar_FechaModificacion DATETIME
AS
BEGIN
	DECLARE @HashedPassword NVARCHAR(MAX);
	SET @HashedPassword = CONVERT(NVARCHAR(MAX), HASHBYTES('SHA2_512', @Usuar_OldContrasena),2);

	IF((SELECT Usuar_Contrasena FROM Acce.tbUsuarios WHERE Usuar_Id = @Usuar_Id) = @HashedPassword)
	BEGIN
		BEGIN TRY
			SET @HashedPassword = CONVERT(NVARCHAR(MAX), HASHBYTES('SHA2_512', @Usuar_NewContrasena),2);
			UPDATE Acce.tbUsuarios
			SET Usuar_Contrasena = @HashedPassword,
				Usuar_UsuarioModificacion = @Usuar_UsuarioModificacion,
				Usuar_FechaModificacion = @Usuar_FechaModificacion
			WHERE Usuar_Id = @Usuar_Id

			SELECT 1
		END TRY
		BEGIN CATCH
			SELECT 0
		END CATCH
	END
	ELSE
	BEGIN
		SELECT -1
	END
END
GO
/****** Object:  StoredProcedure [Acce].[SP_Usuario_Desactivar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Acce].[SP_Usuario_Desactivar]
    @Usuar_Id INT
AS
BEGIN
    BEGIN TRY
        UPDATE Acce.tbUsuarios
        SET
            Usuar_Estado = 0
        WHERE
            Usuar_Id = @Usuar_Id

        SELECT 1
    END TRY

    BEGIN CATCH
        SELECT 0
    END CATCH
END

GO
/****** Object:  StoredProcedure [Acce].[SP_Usuario_Insertar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Acce].[SP_Usuario_Insertar]
    @Usuar_Correo NVARCHAR(100),
    @Usuar_Usuario NVARCHAR(50),
    @Usuar_Contrasena NVARCHAR(MAX),
    @Perso_Id INT,
    @Roles_Id INT,
    @Usuar_Admin BIT,
    @Usuar_UsuarioCreacion INT,
    @Usuar_FechaCreacion DATETIME
AS
BEGIN
	DECLARE @HashedPassword NVARCHAR(MAX);
	SET @HashedPassword = CONVERT(NVARCHAR(MAX), HASHBYTES('SHA2_512', @Usuar_Contrasena),2);
    BEGIN TRY
        INSERT INTO Acce.tbUsuarios (
            Usuar_Correo,
            Usuar_Usuario,
            Usuar_Contrasena,
            Perso_Id,
            Perso_Tipo,
            Roles_Id,
            Usuar_Admin,
            Usuar_UsuarioCreacion,
            Usuar_FechaCreacion
        )
        VALUES (
            @Usuar_Correo,
            @Usuar_Usuario,
            @HashedPassword,
            @Perso_Id,
            0,
            @Roles_Id,
            @Usuar_Admin,
            @Usuar_UsuarioCreacion,
            @Usuar_FechaCreacion
        )

        SELECT 1
    END TRY

    BEGIN CATCH
        SELECT 0
    END CATCH
END
GO
/****** Object:  StoredProcedure [Acce].[SP_Usuario_Lista]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Acce].[SP_Usuario_Lista]
AS
BEGIN
	SELECT
			usu.*,
			creacion.Usuar_Usuario AS UsuarioCreacion,
			modificacion.Usuar_Usuario AS UsuarioModificacion,
			roles.Roles_Descripcion,
			CASE usu.Usuar_Admin WHEN 0 THEN 'No' ELSE 'Si' END as Administrador,
			CASE usu.Perso_Tipo WHEN 0 THEN emp.Emple_Correo END AS Emple_Correo,
						CASE usu.Perso_Tipo WHEN 1 THEN
							CONCAT(emp.Emple_PrimerNombre,' ',
								CASE WHEN emp.Emple_SegundoNombre IS NULL THEN '' ELSE emp.Emple_SegundoNombre + ' ' END,
								emp.Emple_PrimerApellido, 
								CASE WHEN emp.Emple_SegundoApellido IS NULL THEN Emple_PrimerApellido ELSE ' ' + emp.Emple_SegundoApellido END
							)
						WHEN 0 THEN
							CONCAT(cli.Clien_PrimerNombre,Emple_PrimerNombre,
								CASE WHEN cli.Clien_SegundoNombre IS NULL THEN Clien_SegundoNombre ELSE cli.Clien_SegundoNombre + ' ' END,
								cli.Clien_PrimerApellido, 
								CASE WHEN cli.Clien_SegundoApellido IS NULL THEN cli.Clien_SegundoApellido ELSE ' ' + cli.Clien_SegundoApellido END
							)
						END AS Perso_NombreCompleto
			
	FROM Acce.tbUsuarios usu
	LEFT JOIN Supr.tbEmpleados AS emp ON emp.Emple_Id = usu.Perso_Id 
	LEFT JOIN venta.tbClientes AS cli ON cli.Clien_Id = usu.Perso_Id
	LEFT JOIN Acce.tbRoles roles ON usu.Roles_Id = roles.Roles_Id
	LEFT JOIN Acce.tbUsuarios creacion ON usu.Usuar_UsuarioCreacion = creacion.Usuar_Id
	LEFT JOIN Acce.tbUsuarios modificacion ON usu.Usuar_UsuarioModificacion = modificacion.Usuar_Id
left join venta.tbVentasEncabezado as venta on venta.Clien_Id = cli.Clien_Id
where usu.Usuar_Estado = 1
END
GO
/****** Object:  StoredProcedure [Acce].[SP_Usuario_Login]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Acce].[SP_Usuario_Login] 
	@Usuario NVARCHAR(50),
	@Contra NVARCHAR(MAX)
AS
BEGIN
		DECLARE @HASHBYTES NVARCHAR(MAX) = CONVERT(NVARCHAR (MAX), HASHBYTES ('SHA2_512', @Contra), 2);		
		SELECT	usu.*,
		suc.Sucur_Id,
		Panta_Descripcion,
		rol.Roles_Descripcion AS Roles_Descripcion,
		CASE 
        WHEN Perso_Tipo = 0 THEN Emple_Id 
        ELSE Clien_Id
    END AS PersoId,
    CASE 
        WHEN Perso_Tipo = 0 THEN 'Empleado' 
        ELSE 'Cliente' 
    END AS Tipo,
				CASE usu.Perso_Tipo WHEN 0 THEN emp.Emple_Correo END AS Emple_Correo,
				CASE usu.Perso_Tipo WHEN 0 THEN
					CONCAT(emp.Emple_PrimerNombre,' ',
						CASE WHEN emp.Emple_SegundoNombre IS NULL THEN '' ELSE emp.Emple_SegundoNombre + ' ' END,
						emp.Emple_PrimerApellido, 
						CASE WHEN emp.Emple_SegundoApellido IS NULL THEN '' ELSE ' ' + emp.Emple_SegundoApellido END
					)
				WHEN 1 THEN
					CONCAT(cli.Clien_PrimerNombre,' ',
						CASE WHEN cli.Clien_SegundoNombre IS NULL THEN '' ELSE cli.Clien_SegundoNombre + ' ' END,
						cli.Clien_PrimerApellido, 
						CASE WHEN cli.Clien_SegundoApellido IS NULL THEN '' ELSE ' ' + cli.Clien_SegundoApellido END
					)
				END AS Perso_NombreCompleto
		FROM Acce.tbUsuarios AS usu INNER JOIN Acce.tbRoles AS rol
		ON rol.Roles_Id = usu.Roles_Id LEFT JOIN Acce.tbPantallasPorRoles as parrol 
		ON parrol.Roles_Id = rol.Roles_Id LEFT JOIN Acce.tbPantallas as panta 
		ON parrol.Panta_Id = panta.Panta_Id 
		LEFT JOIN Supr.tbEmpleados AS emp
		ON emp.Emple_Id = usu.Perso_Id LEFT JOIN venta.tbClientes AS cli
		ON cli.Clien_Id = usu.Perso_Id LEFT JOIN Supr.tbSucursales as suc
		ON suc.Sucur_Id = emp.Sucur_Id
		WHERE usu.Usuar_Usuario = @Usuario AND usu.Usuar_Contrasena = @HASHBYTES;
END
GO
/****** Object:  StoredProcedure [Acce].[SP_Usuario_Modificar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Acce].[SP_Usuario_Modificar]
    @Usuar_Id INT,
    @Usuar_Correo NVARCHAR(100),
    @Usuar_Usuario NVARCHAR(50),
    @Perso_Id INT,
    @Roles_Id INT,
    @Usuar_Admin BIT,
    @Usuar_UsuarioModificacion INT,
    @Usuar_FechaModificacion DATETIME
AS
BEGIN
    BEGIN TRY
        UPDATE Acce.tbUsuarios
        SET
            Usuar_Correo = @Usuar_Correo,
            Usuar_Usuario = @Usuar_Usuario,
            Perso_Id = @Perso_Id,
            Perso_Tipo = 0,
            Roles_Id = @Roles_Id,
            Usuar_Admin = @Usuar_Admin,
            Usuar_UsuarioModificacion = @Usuar_UsuarioModificacion,
            Usuar_FechaModificacion = @Usuar_FechaModificacion
        WHERE
            Usuar_Id = @Usuar_Id

        SELECT 1
    END TRY

    BEGIN CATCH
        SELECT 0
    END CATCH
END
GO
/****** Object:  StoredProcedure [Acce].[SP_Usuario_ObtenerCorreo]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Acce].[SP_Usuario_ObtenerCorreo]
	@Usuar_Usuario VARCHAR(60)
AS
BEGIN
    SELECT Usuar_Usuario, Usuar_Correo
    FROM Acce.tbUsuarios USU

    WHERE Usuar_Usuario = @Usuar_Usuario
END;
GO
/****** Object:  StoredProcedure [Acce].[SP_Usuario_ReestablecerContrasena]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Acce].[SP_Usuario_ReestablecerContrasena]
	 @Usua_VerificarCorreo VARCHAR(MAX),
    @Usuar_Contrasena NVARCHAR(MAX),
    @Usuar_UsuarioModificacion INT, 
    @Usuar_FechaModificacion DATETIME
AS
BEGIN

	DECLARE @contranueva NVARCHAR(MAX);
		SET @contranueva = CONVERT(NVARCHAR(MAX), HASHBYTES('SHA2_512', @Usuar_Contrasena),2);
    BEGIN TRY

	UPDATE Acce.tbUsuarios SET
				Usuar_UsuarioModificacion = @Usuar_UsuarioModificacion,
				Usuar_FechaModificacion = @Usuar_FechaModificacion,
				Usuar_Contrasena = @contranueva
			WHERE Usua_VerificarCorreo = @Usua_VerificarCorreo

        SELECT 1;
    END TRY
    BEGIN CATCH
        SELECT 0;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [Acce].[SP_Usuarios_InsertarValidar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Acce].[SP_Usuarios_InsertarValidar]
    @Usuar_Usuario VARCHAR(60),
    @Usua_ValidarCorreo VARCHAR(MAX)

AS
BEGIN
    BEGIN TRY
        UPDATE Acce.tbUsuarios
        SET Usua_VerificarCorreo = @Usua_ValidarCorreo
        WHERE Usuar_Usuario = @Usuar_Usuario;
        SELECT 1;
    END TRY
    BEGIN CATCH
        SELECT 0;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [Gral].[SP_Cargo_Buscar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Gral].[SP_Cargo_Buscar]
    @Cargo_Id INT
AS
BEGIN
    SELECT
        cargo.*,
        creacion.Usuar_Usuario AS UsuarioCreacion,
		FORMAT(creacion.Usuar_FechaCreacion, 'yyyy-MM-dd') AS Usuar_FechaCreacion,
		FORMAT(modificacion.Usuar_FechaModificacion, 'yyyy-MM-dd') AS Usuar_FechaModificacion,
		CASE WHEN cargo.Cargo_UsuarioModificacion = modificacion.Usuar_Id THEN modificacion.Usuar_Usuario  ELSE 'No se ha modificado' END AS UsuarioModificacion
    FROM
        Gral.tbCargos cargo
    LEFT JOIN
        Acce.tbUsuarios creacion
        ON cargo.Cargo_UsuarioCreacion = creacion.Usuar_Id
    LEFT JOIN
        Acce.tbUsuarios modificacion
        ON cargo.Cargo_UsuarioModificacion = modificacion.Usuar_Id
    WHERE
        cargo.Cargo_Id = @Cargo_Id
END
GO
/****** Object:  StoredProcedure [Gral].[SP_Cargo_Eliminar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Gral].[SP_Cargo_Eliminar]
    @Cargo_Id INT
AS
BEGIN
    DECLARE @NumeroDeRelaciones INT = 0

    SET @NumeroDeRelaciones = (
        SELECT COUNT(*)
        FROM Supr.tbEmpleados
        WHERE Cargo_Id = @Cargo_Id
    )

    BEGIN TRY
        IF @NumeroDeRelaciones = 0
        BEGIN
            UPDATE Gral.tbCargos
            SET
                Cargo_Estado = 0
            WHERE
                Cargo_Id = @Cargo_Id

            SELECT 1 
        END
        ELSE
        BEGIN
            SELECT 0  
        END
    END TRY
    BEGIN CATCH
        SELECT -1 
    END CATCH
END
GO
/****** Object:  StoredProcedure [Gral].[SP_Cargo_Insertar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Gral].[SP_Cargo_Insertar]
    @Cargo_Descripcion NVARCHAR(50),
    @Cargo_UsuarioCreacion INT,
    @Cargo_FechaCreacion DATETIME
AS
BEGIN
    BEGIN TRY
        INSERT INTO Gral.tbCargos (
            Cargo_Descripcion,
            Cargo_UsuarioCreacion,
            Cargo_FechaCreacion
        )
        VALUES (
            @Cargo_Descripcion,
            @Cargo_UsuarioCreacion,
            @Cargo_FechaCreacion
        )

        SELECT 1 
    END TRY
    BEGIN CATCH
        SELECT 0  
    END CATCH
END
GO
/****** Object:  StoredProcedure [Gral].[SP_Cargo_Lista]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Gral].[SP_Cargo_Lista]
AS
BEGIN
    SELECT
        cargo.*,
        creacion.Usuar_Usuario AS UsuarioCreacion,
        modificacion.Usuar_Usuario AS UsuarioModificacion
    FROM
        Gral.tbCargos cargo
    LEFT JOIN
        Acce.tbUsuarios creacion
        ON cargo.Cargo_UsuarioCreacion = creacion.Usuar_Id
    LEFT JOIN
        Acce.tbUsuarios modificacion
        ON cargo.Cargo_UsuarioModificacion = modificacion.Usuar_Id
		WHERE Cargo_Estado = 1
END
GO
/****** Object:  StoredProcedure [Gral].[SP_Cargo_Modificar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Gral].[SP_Cargo_Modificar]
    @Cargo_Id INT,
    @Cargo_Descripcion NVARCHAR(50),
    @Cargo_UsuarioModificacion INT,
    @Cargo_FechaModificacion DATETIME
AS
BEGIN
    BEGIN TRY
        UPDATE Gral.tbCargos
        SET
            Cargo_Descripcion = @Cargo_Descripcion,
            Cargo_UsuarioModificacion = @Cargo_UsuarioModificacion,
            Cargo_FechaModificacion = @Cargo_FechaModificacion
        WHERE
            Cargo_Id = @Cargo_Id

        SELECT 1  
    END TRY
    BEGIN CATCH
        SELECT 0  
    END CATCH
END
GO
/****** Object:  StoredProcedure [Gral].[SP_Categoria_Buscar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Gral].[SP_Categoria_Buscar]
    @Categ_Id INT
AS
BEGIN
    SELECT
        categ.*,
		CASE WHEN categ.Categ_UsuarioModificacion = modificacion.Usuar_Id THEN modificacion.Usuar_Usuario  ELSE 'No se ha modificado' END AS UsuarioModificacion,
        creacion.Usuar_Usuario AS UsuarioCreacion
    FROM
        Gral.tbCategorias categ
    LEFT JOIN
        Acce.tbUsuarios creacion
        ON categ.Categ_UsuarioCreacion = creacion.Usuar_Id
    LEFT JOIN
        Acce.tbUsuarios modificacion
        ON categ.Categ_UsuarioModificacion = modificacion.Usuar_Id
    WHERE
        categ.Categ_Id = @Categ_Id
END
GO
/****** Object:  StoredProcedure [Gral].[SP_Categoria_Eliminar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Gral].[SP_Categoria_Eliminar]
    @Categ_Id INT
AS
BEGIN
    DECLARE @NumeroDeRelaciones INT = 0

    SET @NumeroDeRelaciones = (
        SELECT COUNT(*)
        FROM Gral.tbSubcategorias
        WHERE Categ_Id = @Categ_Id
    )

    BEGIN TRY
        IF @NumeroDeRelaciones = 0
        BEGIN
            UPDATE Gral.tbCategorias
            SET
                Categ_Estado = 0
            WHERE
                Categ_Id = @Categ_Id

            SELECT 1 
		END
        ELSE
		BEGIN
            SELECT 0  
        END
    END TRY
    BEGIN CATCH
        SELECT -1 
    END CATCH
END
GO
/****** Object:  StoredProcedure [Gral].[SP_Categoria_Insertar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Gral].[SP_Categoria_Insertar]
    @Categ_Descripcion NVARCHAR(50),
    @Categ_UsuarioCreacion INT,
    @Categ_FechaCreacion DATETIME
AS
BEGIN
    BEGIN TRY
        INSERT INTO Gral.tbCategorias (
            Categ_Descripcion,
            Categ_UsuarioCreacion,
            Categ_FechaCreacion
        )
        VALUES (
            @Categ_Descripcion,
            @Categ_UsuarioCreacion,
            @Categ_FechaCreacion
        )

        SELECT 1
    END TRY
    BEGIN CATCH
        SELECT 0
    END CATCH
END
GO
/****** Object:  StoredProcedure [Gral].[SP_Categoria_Lista]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Gral].[SP_Categoria_Lista]
AS
BEGIN
    SELECT
        categ.*,
        creacion.Usuar_Usuario AS UsuarioCreacion,
        modificacion.Usuar_Usuario AS UsuarioModificacion
    FROM
        Gral.tbCategorias categ
    LEFT JOIN
        Acce.tbUsuarios creacion
        ON categ.Categ_UsuarioCreacion = creacion.Usuar_Id
    LEFT JOIN
        Acce.tbUsuarios modificacion
        ON categ.Categ_UsuarioModificacion = modificacion.Usuar_Id
	WHERE Categ_Estado = 1
END
GO
/****** Object:  StoredProcedure [Gral].[SP_Categoria_Modificar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Gral].[SP_Categoria_Modificar]
    @Categ_Id INT,
    @Categ_Descripcion NVARCHAR(50),
    @Categ_UsuarioModificacion INT,
    @Categ_FechaModificacion DATETIME
AS
BEGIN
    BEGIN TRY
        UPDATE Gral.tbCategorias
        SET
            Categ_Descripcion = @Categ_Descripcion,
            Categ_UsuarioModificacion = @Categ_UsuarioModificacion,
            Categ_FechaModificacion = @Categ_FechaModificacion
        WHERE
            Categ_Id = @Categ_Id

        SELECT 1
    END TRY
    BEGIN CATCH
        SELECT 0
    END CATCH
END
GO
/****** Object:  StoredProcedure [Gral].[SP_Departamento_Buscar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Gral].[SP_Departamento_Buscar]
    @Depar_Id CHAR(2)
AS
BEGIN
    SELECT
        depar.*,
        creacion.Usuar_Usuario AS UsuarioCreacion,
		CASE WHEN depar.Depar_UsuarioModificacion = modificacion.Usuar_Id THEN modificacion.Usuar_Usuario  ELSE 'No se ha modificado' END AS UsuarioModificacion
    FROM
        Gral.tbDepartamentos depar
    LEFT JOIN
        Acce.tbUsuarios creacion
        ON depar.Depar_UsuarioCreacion = creacion.Usuar_Id
    LEFT JOIN
        Acce.tbUsuarios modificacion
        ON depar.Depar_UsuarioModificacion = modificacion.Usuar_Id
    WHERE
        depar.Depar_Id = @Depar_Id
END
GO
/****** Object:  StoredProcedure [Gral].[SP_Departamento_Eliminar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Gral].[SP_Departamento_Eliminar]
    @Depar_Id CHAR(2)
AS
BEGIN
    BEGIN TRY
        DELETE FROM Gral.tbDepartamentos
        WHERE
            Depar_Id = @Depar_Id

        SELECT 1
    END TRY
    BEGIN CATCH
        SELECT 0
    END CATCH
END
GO
/****** Object:  StoredProcedure [Gral].[SP_Departamento_Insertar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Gral].[SP_Departamento_Insertar]
    @Depar_Id CHAR(2),
    @Depar_Descripcion NVARCHAR(50),
    @Depar_UsuarioCreacion INT,
    @Depar_FechaCreacion DATETIME
AS
BEGIN
    BEGIN TRY
        INSERT INTO Gral.tbDepartamentos (
            Depar_Id,
            Depar_Descripcion,
            Depar_UsuarioCreacion,
            Depar_FechaCreacion
        )
        VALUES (
            @Depar_Id,
            @Depar_Descripcion,
            @Depar_UsuarioCreacion,
            @Depar_FechaCreacion
        )

        SELECT 1
    END TRY
    BEGIN CATCH
        SELECT 0
    END CATCH
END
GO
/****** Object:  StoredProcedure [Gral].[SP_Departamento_Modificar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Gral].[SP_Departamento_Modificar]
    @Depar_Id CHAR(2),
    @Depar_Descripcion NVARCHAR(50),
    @Depar_UsuarioModificacion INT,
    @Depar_FechaModificacion DATETIME
AS
BEGIN
    BEGIN TRY
        UPDATE Gral.tbDepartamentos
        SET
            Depar_Descripcion = @Depar_Descripcion,
            Depar_UsuarioModificacion = @Depar_UsuarioModificacion,
            Depar_FechaModificacion = @Depar_FechaModificacion
        WHERE
            Depar_Id = @Depar_Id

        SELECT 1
    END TRY
    BEGIN CATCH
        SELECT 0
    END CATCH
END
GO
/****** Object:  StoredProcedure [Gral].[SP_Departamentos_Lista]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Gral].[SP_Departamentos_Lista]
AS
BEGIN
    SELECT
        depar.*,
        creacion.Usuar_Usuario AS UsuarioCreacion,
        modificacion.Usuar_Usuario AS UsuarioModificacion
    FROM
        Gral.tbDepartamentos depar
    LEFT JOIN
        Acce.tbUsuarios creacion
        ON depar.Depar_UsuarioCreacion = creacion.Usuar_Id
    LEFT JOIN
        Acce.tbUsuarios modificacion
        ON depar.Depar_UsuarioModificacion = modificacion.Usuar_Id
END
GO
/****** Object:  StoredProcedure [Gral].[SP_EstadoCivil_Buscar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Gral].[SP_EstadoCivil_Buscar]
    @Estad_Id INT
AS
BEGIN
    SELECT
        estad.*,
        creacion.Usuar_Usuario AS UsuarioCreacion,
		CASE WHEN estad.Estad_UsuarioModificacion = modificacion.Usuar_Id THEN modificacion.Usuar_Usuario  ELSE 'No se ha modificado' END AS UsuarioModificacion
    FROM
        Gral.tbEstadosCiviles estad
    LEFT JOIN
        Acce.tbUsuarios creacion
        ON estad.Estad_UsuarioCreacion = creacion.Usuar_Id
    LEFT JOIN
        Acce.tbUsuarios modificacion
        ON estad.Estad_UsuarioModificacion = modificacion.Usuar_Id
    WHERE
        estad.Estad_Id = @Estad_Id
END
GO
/****** Object:  StoredProcedure [Gral].[SP_EstadoCivil_Eliminar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Gral].[SP_EstadoCivil_Eliminar]
    @Estad_Id INT
AS
BEGIN
    BEGIN TRY
        DELETE FROM Gral.tbEstadosCiviles
        WHERE
            Estad_Id = @Estad_Id

        SELECT 1
    END TRY
    BEGIN CATCH
        SELECT 0
    END CATCH
END
GO
/****** Object:  StoredProcedure [Gral].[SP_EstadoCivil_Insertar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Gral].[SP_EstadoCivil_Insertar]
    @Estad_Descripcion NVARCHAR(30),
    @Estad_UsuarioCreacion INT,
    @Estad_FechaCreacion DATETIME
AS
BEGIN
    BEGIN TRY
        INSERT INTO Gral.tbEstadosCiviles (
            Estad_Descripcion,
            Estad_UsuarioCreacion,
            Estad_FechaCreacion
        )
        VALUES (
            @Estad_Descripcion,
            @Estad_UsuarioCreacion,
            @Estad_FechaCreacion
        )

        SELECT 1
    END TRY
    BEGIN CATCH
        SELECT 0
    END CATCH
END
GO
/****** Object:  StoredProcedure [Gral].[SP_EstadoCivil_Lista]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Gral].[SP_EstadoCivil_Lista]
AS
BEGIN
    SELECT
        estad.*,
        creacion.Usuar_Usuario AS UsuarioCreacion,
        modificacion.Usuar_Usuario AS UsuarioModificacion
    FROM
        Gral.tbEstadosCiviles estad
    LEFT JOIN
        Acce.tbUsuarios creacion
        ON estad.Estad_UsuarioCreacion = creacion.Usuar_Id
    LEFT JOIN
        Acce.tbUsuarios modificacion
        ON estad.Estad_UsuarioModificacion = modificacion.Usuar_Id
END
GO
/****** Object:  StoredProcedure [Gral].[SP_EstadoCivil_Modificar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Gral].[SP_EstadoCivil_Modificar]
    @Estad_Id INT,
    @Estad_Descripcion NVARCHAR(30),
    @Estad_UsuarioModificacion INT,
    @Estad_FechaModificacion DATETIME
AS
BEGIN
    BEGIN TRY
        UPDATE Gral.tbEstadosCiviles
        SET
            Estad_Descripcion = @Estad_Descripcion,
            Estad_UsuarioModificacion = @Estad_UsuarioModificacion,
            Estad_FechaModificacion = @Estad_FechaModificacion
        WHERE
            Estad_Id = @Estad_Id

        SELECT 1
    END TRY
    BEGIN CATCH
        SELECT 0
    END CATCH
END
GO
/****** Object:  StoredProcedure [Gral].[SP_Impuesto_Buscar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Gral].[SP_Impuesto_Buscar]
    @Impue_Id INT
AS
BEGIN
    SELECT
        impue.*,
        creacion.Usuar_Usuario AS UsuarioCreacion,
		CASE WHEN impue.Impue_UsuarioModificacion = modificacion.Usuar_Id THEN modificacion.Usuar_Usuario  ELSE 'No se ha modificado' END AS UsuarioModificacion
    FROM
        Gral.tbImpuestos impue
    LEFT JOIN
        Acce.tbUsuarios creacion
        ON impue.Impue_UsuarioCreacion = creacion.Usuar_Id
    LEFT JOIN
        Acce.tbUsuarios modificacion
        ON impue.Impue_UsuarioModificacion = modificacion.Usuar_Id
    WHERE
        impue.Impue_Id = @Impue_Id
END
GO
/****** Object:  StoredProcedure [Gral].[SP_Impuesto_Desactivar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Gral].[SP_Impuesto_Desactivar]
    @Impue_Id INT
AS
BEGIN
    DECLARE @NumeroDeRelaciones INT = 0

    SET @NumeroDeRelaciones = (
        SELECT COUNT(*)
        FROM Supr.tbProductos 
        WHERE Impue_Id = @Impue_Id
    )

    BEGIN TRY
        IF @NumeroDeRelaciones = 0
        BEGIN
            UPDATE Gral.tbImpuestos
            SET
                Impue_Estado = 0
            WHERE
                Impue_Id = @Impue_Id

            SELECT 1 
        END
        ELSE
        BEGIN
            SELECT 0 
        END
    END TRY
    BEGIN CATCH
        SELECT -1 
    END CATCH
END
GO
/****** Object:  StoredProcedure [Gral].[SP_Impuesto_Insertar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Gral].[SP_Impuesto_Insertar]
    @Impue_Descripcion NUMERIC(4,2),
    @Impue_UsuarioCreacion INT,
    @Impue_FechaCreacion DATETIME
AS
BEGIN
    BEGIN TRY
        INSERT INTO Gral.tbImpuestos (
            Impue_Descripcion,
            Impue_UsuarioCreacion,
            Impue_FechaCreacion
        )
        VALUES (
            @Impue_Descripcion,
            @Impue_UsuarioCreacion,
            @Impue_FechaCreacion
        )

        SELECT 1 
    END TRY
    BEGIN CATCH
        SELECT 0  
    END CATCH
END
GO
/****** Object:  StoredProcedure [Gral].[SP_Impuesto_Lista]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Gral].[SP_Impuesto_Lista]
AS
BEGIN
    SELECT
        impue.*,
        creacion.Usuar_Usuario AS UsuarioCreacion,
        modificacion.Usuar_Usuario AS UsuarioModificacion
    FROM
        Gral.tbImpuestos impue
    LEFT JOIN
        Acce.tbUsuarios creacion
        ON impue.Impue_UsuarioCreacion = creacion.Usuar_Id
    LEFT JOIN
        Acce.tbUsuarios modificacion
        ON impue.Impue_UsuarioModificacion = modificacion.Usuar_Id
		WHERE Impue_Estado = 1
END
GO
/****** Object:  StoredProcedure [Gral].[SP_Impuesto_Modificar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Gral].[SP_Impuesto_Modificar]
    @Impue_Id INT,
    @Impue_Descripcion NUMERIC(4,2),
    @Impue_UsuarioModificacion INT,
    @Impue_FechaModificacion DATETIME
AS
BEGIN
    BEGIN TRY
        UPDATE Gral.tbImpuestos
        SET
            Impue_Descripcion = @Impue_Descripcion,
            Impue_UsuarioModificacion = @Impue_UsuarioModificacion,
            Impue_FechaModificacion = @Impue_FechaModificacion
        WHERE
            Impue_Id = @Impue_Id

        SELECT 1 
    END TRY
    BEGIN CATCH
        SELECT 0 
    END CATCH
END
GO
/****** Object:  StoredProcedure [Gral].[SP_Municipio_Buscar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Gral].[SP_Municipio_Buscar]
    @Munic_Id CHAR(4)
AS
BEGIN
    SELECT
        munic.*,
        depar.Depar_Descripcion,
        creacion.Usuar_Usuario AS UsuarioCreacion,
		CASE WHEN munic.Munic_UsuarioModificacion = modificacion.Usuar_Id THEN modificacion.Usuar_Usuario  ELSE 'No se ha modificado' END AS UsuarioModificacion
    FROM
        Gral.tbMunicipios munic
    LEFT JOIN
        Gral.tbDepartamentos depar
        ON munic.Depar_Id = depar.Depar_Id
    LEFT JOIN
        Acce.tbUsuarios creacion
        ON munic.Munic_UsuarioCreacion = creacion.Usuar_Id
    LEFT JOIN
        Acce.tbUsuarios modificacion
        ON munic.Munic_UsuarioModificacion = modificacion.Usuar_Id
    WHERE
        munic.Munic_Id = @Munic_Id
END
GO
/****** Object:  StoredProcedure [Gral].[SP_Municipio_DropDownList]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Gral].[SP_Municipio_DropDownList]
    @Depar_Id CHAR(2)
AS
BEGIN
    SELECT
        munic.*,
        depar.Depar_Descripcion AS Departamento
    FROM
        Gral.tbMunicipios munic
    LEFT JOIN
        Gral.tbDepartamentos depar
        ON munic.Depar_Id = depar.Depar_Id
    WHERE
        munic.Depar_Id = @Depar_Id
END
GO
/****** Object:  StoredProcedure [Gral].[SP_Municipio_Eliminar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Gral].[SP_Municipio_Eliminar]
    @Munic_Id CHAR(4)
AS
BEGIN
    BEGIN TRY
        DELETE FROM Gral.tbMunicipios
        WHERE
            Munic_Id = @Munic_Id

        SELECT 1
    END TRY
    BEGIN CATCH
        SELECT 0
    END CATCH
END
GO
/****** Object:  StoredProcedure [Gral].[SP_Municipio_Insertar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Gral].[SP_Municipio_Insertar]
    @Munic_Id CHAR(4),
    @Munic_Descripcion NVARCHAR(50),
    @Depar_Id CHAR(2),
    @Munic_UsuarioCreacion INT,
    @Munic_FechaCreacion DATETIME
AS
BEGIN
    BEGIN TRY
        INSERT INTO Gral.tbMunicipios (
            Munic_Id,
            Munic_Descripcion,
            Depar_Id,
            Munic_UsuarioCreacion,
            Munic_FechaCreacion
        )
        VALUES (
            @Munic_Id,
            @Munic_Descripcion,
            @Depar_Id,
            @Munic_UsuarioCreacion,
            @Munic_FechaCreacion
        )

        SELECT 1
    END TRY
    BEGIN CATCH
        SELECT 0
    END CATCH
END
GO
/****** Object:  StoredProcedure [Gral].[SP_Municipio_Modificar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Gral].[SP_Municipio_Modificar]
    @Munic_Id CHAR(4),
    @Munic_Descripcion NVARCHAR(50),
    @Depar_Id CHAR(2),
    @Munic_UsuarioModificacion INT,
    @Munic_FechaModificacion DATETIME
AS
BEGIN
    BEGIN TRY
        UPDATE Gral.tbMunicipios
        SET
            Munic_Descripcion = @Munic_Descripcion,
            Depar_Id = @Depar_Id,
            Munic_UsuarioModificacion = @Munic_UsuarioModificacion,
            Munic_FechaModificacion = @Munic_FechaModificacion
        WHERE
            Munic_Id = @Munic_Id

        SELECT 1
    END TRY
    BEGIN CATCH
        SELECT 0
    END CATCH
END
GO
/****** Object:  StoredProcedure [Gral].[SP_Municipios_Lista]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Gral].[SP_Municipios_Lista]
AS
BEGIN
    SELECT
        munic.*,
        depar.Depar_Descripcion,
        creacion.Usuar_Usuario AS UsuarioCreacion,
        modificacion.Usuar_Usuario AS UsuarioModificacion
    FROM
        Gral.tbMunicipios munic
    LEFT JOIN
        Gral.tbDepartamentos depar
        ON munic.Depar_Id = depar.Depar_Id
    LEFT JOIN
        Acce.tbUsuarios creacion
        ON munic.Munic_UsuarioCreacion = creacion.Usuar_Id
    LEFT JOIN
        Acce.tbUsuarios modificacion
        ON munic.Munic_UsuarioModificacion = modificacion.Usuar_Id
END
GO
/****** Object:  StoredProcedure [Gral].[SP_Subcategoria_Buscar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Gral].[SP_Subcategoria_Buscar]
    @Subca_Id INT
AS
BEGIN
    SELECT
        subca.*,
        categ.Categ_Descripcion,
        creacion.Usuar_Usuario AS UsuarioCreacion,
		CASE WHEN subca.Subca_UsuarioModificacion = modificacion.Usuar_Id THEN modificacion.Usuar_Usuario  ELSE 'No se ha modificado' END AS UsuarioModificacion
    FROM
        Gral.tbSubcategorias subca
    LEFT JOIN
        Gral.tbCategorias categ
        ON subca.Categ_Id = categ.Categ_Id
    LEFT JOIN
        Acce.tbUsuarios creacion
        ON subca.Subca_UsuarioCreacion = creacion.Usuar_Id
    LEFT JOIN
        Acce.tbUsuarios modificacion
        ON subca.Subca_UsuarioModificacion = modificacion.Usuar_Id
    WHERE
        subca.Subca_Id = @Subca_Id
END
GO
/****** Object:  StoredProcedure [Gral].[SP_Subcategoria_DropDownList]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Gral].[SP_Subcategoria_DropDownList]
    @Categ_Id INT
AS
BEGIN
    SELECT
        subca.*,
        categ.Categ_Descripcion AS Categoria
    FROM
        Gral.tbSubcategorias subca
    LEFT JOIN
        Gral.tbCategorias categ
        ON subca.Categ_Id = categ.Categ_Id
    WHERE
        subca.Categ_Id = @Categ_Id
END
GO
/****** Object:  StoredProcedure [Gral].[SP_Subcategoria_Eliminar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Gral].[SP_Subcategoria_Eliminar]
    @Subca_Id INT
AS
BEGIN
    DECLARE @NumeroDeRelaciones INT = 0

     SET @NumeroDeRelaciones = (
        SELECT COUNT(*)
        FROM Supr.tbProductos
        WHERE Subca_Id = @Subca_Id
    )

    BEGIN TRY
        IF @NumeroDeRelaciones = 0
        BEGIN
            UPDATE Gral.tbSubcategorias
            SET
                Subca_Estado = 0
            WHERE
                Subca_Id = @Subca_Id

            SELECT 1 
        END
        ELSE
        BEGIN
            SELECT 0  
        END
    END TRY
    BEGIN CATCH
        SELECT -1 
    END CATCH
END
GO
/****** Object:  StoredProcedure [Gral].[SP_Subcategoria_Insertar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Gral].[SP_Subcategoria_Insertar]
    @Subca_Descripcion NVARCHAR(50),
    @Categ_Id INT,
    @Subca_UsuarioCreacion INT,
    @Subca_FechaCreacion DATETIME
AS
BEGIN
    BEGIN TRY
        INSERT INTO Gral.tbSubcategorias (
            Subca_Descripcion,
            Categ_Id,
            Subca_UsuarioCreacion,
            Subca_FechaCreacion
        )
        VALUES (
            @Subca_Descripcion,
            @Categ_Id,
            @Subca_UsuarioCreacion,
            @Subca_FechaCreacion
        )

        SELECT 1  
    END TRY
    BEGIN CATCH
        SELECT 0 
    END CATCH
END
GO
/****** Object:  StoredProcedure [Gral].[SP_Subcategoria_Lista]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Gral].[SP_Subcategoria_Lista]
AS
BEGIN
    SELECT
        subca.*,
        categ.Categ_Descripcion AS Categ_Descripcion,
        creacion.Usuar_Usuario AS UsuarioCreacion,
        modificacion.Usuar_Usuario AS UsuarioModificacion
    FROM
        Gral.tbSubcategorias subca
    LEFT JOIN
        Gral.tbCategorias categ
        ON subca.Categ_Id = categ.Categ_Id
    LEFT JOIN
        Acce.tbUsuarios creacion
        ON subca.Subca_UsuarioCreacion = creacion.Usuar_Id
    LEFT JOIN
        Acce.tbUsuarios modificacion
        ON subca.Subca_UsuarioModificacion = modificacion.Usuar_Id
END
GO
/****** Object:  StoredProcedure [Gral].[SP_Subcategoria_Modificar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Gral].[SP_Subcategoria_Modificar]
    @Subca_Id INT,
    @Subca_Descripcion NVARCHAR(50),
    @Categ_Id INT,
    @Subca_UsuarioModificacion INT,
    @Subca_FechaModificacion DATETIME
AS
BEGIN
    BEGIN TRY
        UPDATE Gral.tbSubcategorias
        SET
            Subca_Descripcion = @Subca_Descripcion,
            Categ_Id = @Categ_Id,
            Subca_UsuarioModificacion = @Subca_UsuarioModificacion,
            Subca_FechaModificacion = @Subca_FechaModificacion
        WHERE
            Subca_Id = @Subca_Id

        SELECT 1  -- Indicar que la operación fue exitosa
    END TRY
    BEGIN CATCH
        SELECT 0  -- Indicar que ocurrió un error
    END CATCH
END
GO
/****** Object:  StoredProcedure [Rptes].[SP_Reportes_Clientes]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [Rptes].[SP_Reportes_Clientes] 
    @FechaInicio DATE,
    @FechaFin DATE
AS 
BEGIN
    DECLARE @TotalClientes INT;
    SELECT @TotalClientes = COUNT(Clien_Id)
    FROM Venta.tbClientes
    WHERE Clien_FechaCreacion >= @FechaInicio
        AND Clien_FechaCreacion <= @FechaFin;

    SELECT 
        Clien_DNI,
        CONCAT(clien_primernombre, ' ', clien_segundonombre, ' ', clien_primerapellido, ' ', clien_segundoapellido) AS Clien_NombreCompleto,
        Estad_Descripcion,
        CASE WHEN Clien_Sexo = 'f' THEN 'Femenino' ELSE 'Masculino' END AS Clien_Sexo,
        Clien_Telefono,
        Clien_Direccion,
        CONVERT(DATE, DATEADD(WEEK, DATEDIFF(WEEK, 0, Clien_FechaCreacion), 0)) AS Clien_FechaCreacion,
        @TotalClientes AS TotalClientesMesActual
    FROM Venta.tbClientes AS c 
    LEFT JOIN Gral.tbEstadosCiviles AS e ON c.Estad_Id = e.Estad_Id
    WHERE Clien_FechaCreacion >= @FechaInicio
        AND Clien_FechaCreacion <= @FechaFin;
END
GO
/****** Object:  StoredProcedure [Rptes].[SP_Reportes_ClientesconProm]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Rptes].[SP_Reportes_ClientesconProm] 
 @Sucur_Id INT = NULL,
 @FiltroSucursal BIT = 0,
 @FechaInicio DATE,
 @FechaFin DATE
AS BEGIN
SET @Sucur_Id = ISNULL(@Sucur_Id, 0)


 SELECT 
    ve.Venen_Id,
	FORMAT(Venen_FechaCreacion, 'yyyy-MM-dd') as Venen_FechaCreacion,
	c.clien_id,
	Vende_Descuento,
    CONCAT(c.Clien_PrimerNombre, ' ', c.Clien_SegundoNombre, ' ', c.Clien_PrimerApellido, ' ', c.Clien_SegundoApellido) as Persona,
    Sucur_Descripcion,
    Tipos_Descripcion as Tipo
 FROM Venta.tbVentasEncabezado as ve 
 LEFT JOIN Venta.tbVentasDetalle AS de on de.Venen_Id = ve.Venen_Id
 LEFT JOIN Supr.tbSucursales as s on ve.Sucur_Id = s.Sucur_Id
 LEFT JOIN Acce.tbUsuarios as u on u.Usuar_Id = ve.Usuar_Id 
 LEFT JOIN Venta.tbClientes as c on c.Clien_Id = ve.Clien_Id
 LEFT JOIN Gral.tbTiposdePagos as t on t.Tipos_Id = ve.Tipos_Id
 WHERE (@FiltroSucursal = 0 OR s.Sucur_Id = @Sucur_Id)
        AND ve.Venen_FechaCreacion >= @FechaInicio
        AND ve.Venen_FechaCreacion <= @FechaFin
		AND Vende_Descuento > 0;
END
GO
/****** Object:  StoredProcedure [Rptes].[SP_Reportes_Productos]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Rptes].[SP_Reportes_Productos] 
    @Sucur_Id INT = NULL,
    @FiltroSucursal BIT = 0,
    @FechaInicio DATE,
    @FechaFin DATE
AS
BEGIN
    SET @Sucur_Id = ISNULL(@Sucur_Id, 0)

    DECLARE @MesActual INT = MONTH(GETDATE());
    DECLARE @AnioActual INT = YEAR(GETDATE());
    DECLARE @MesAnterior INT = @MesActual - 1;
    DECLARE @AnioAnterior INT = @AnioActual;

    SELECT
        p.Produ_Id,
        p.Produ_Descripcion,
        Prove_Marca,
        Produ_PrecioVenta,
        Categ_Descripcion,
        Subca_Descripcion,
        SUM(CASE WHEN MONTH(v.Vende_FechaCreacion) = @MesActual AND YEAR(v.Vende_FechaCreacion) = @AnioActual THEN v.Vende_Cantidad ELSE 0 END) AS Cantidad
    FROM [dbSupermercadoLaColonia].[Supr].[tbProductos] AS p
    LEFT JOIN Supr.tbLotes AS l ON p.Produ_Id = l.Produ_Id
    LEFT JOIN [dbSupermercadoLaColonia].[Venta].[tbVentasDetalle] AS v ON l.Lotes_Id = v.Lotes_Id
    LEFT JOIN Supr.tbSucursales AS s ON s.Sucur_Id = l.Sucur_Id
    LEFT JOIN Gral.tbSubcategorias AS sc ON sc.Subca_Id = p.Subca_Id
    LEFT JOIN gral.tbCategorias AS c ON c.Categ_Id = sc.Categ_Id
    LEFT JOIN Supr.tbProveedores AS prov ON p.Prove_Id = prov.Prove_Id
    WHERE (@FiltroSucursal = 0 OR s.Sucur_Id = @Sucur_Id) 
        AND Produ_FechaCreacion >= @FechaInicio
        AND Produ_FechaCreacion <= @FechaFin 
    GROUP BY p.Produ_Id, categ_descripcion, produ_descripcion, prove_marca, Produ_PrecioVenta, subca_descripcion
    HAVING SUM(CASE WHEN MONTH(v.Vende_FechaCreacion) = @MesActual AND YEAR(v.Vende_FechaCreacion) = @AnioActual THEN v.Vende_Cantidad ELSE 0 END) > 0
    ORDER BY Cantidad DESC;
END
GO
/****** Object:  StoredProcedure [Rptes].[SP_Reportes_StockTotal]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Rptes].[SP_Reportes_StockTotal]
	@Sucur_Id INT = NULL,
	@FiltroSucursal BIT = 0
AS
BEGIN
SET @Sucur_Id = ISNULL(@Sucur_Id, 0)

	SELECT	prd.Produ_Id,
			prd.Produ_Descripcion,
			SUM(lot.Lotes_Cantidad) AS Produ_Existencia,
			prd.Produ_PrecioCompra,
			prd.Produ_PrecioVenta,
			cat.Categ_Id,
			cat.Categ_Descripcion,
			sub.Subca_Id,
			sub.Subca_Descripcion,
			imp.Impue_Descripcion,
			prv.Prove_Marca
	FROM Supr.tbLotes AS lot
	LEFT JOIN Supr.tbProductos AS prd ON lot.Produ_Id = prd.Produ_Id
	LEFT JOIN Gral.tbSubcategorias AS sub ON prd.Subca_Id = sub.Subca_Id
	LEFT JOIN Gral.tbCategorias AS cat ON sub.Categ_Id = cat.Categ_Id
	LEFT JOIN Gral.tbImpuestos AS imp ON prd.Impue_Id = imp.Impue_Id
	LEFT JOIN Supr.tbProveedores AS prv ON prd.Prove_Id = prv.Prove_Id
	WHERE (@FiltroSucursal = 0 OR lot.Sucur_Id = @Sucur_Id)
        AND lot.Lotes_Estado = 1
	GROUP BY prd.Produ_Id,
			prd.Produ_Descripcion,
			prd.Produ_PrecioCompra,
			prd.Produ_PrecioVenta,
			cat.Categ_Id,
			cat.Categ_Descripcion,
			sub.Subca_Id,
			sub.Subca_Descripcion,
			imp.Impue_Descripcion,
			prv.Prove_Marca
END
GO
/****** Object:  StoredProcedure [Rptes].[SP_Reportes_Ventas]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Rptes].[SP_Reportes_Ventas] 
 @Sucur_Id INT = NULL,
 @FiltroSucursal BIT = 0,
 @FechaInicio DATE,
 @FechaFin DATE
AS BEGIN
SET @Sucur_Id = ISNULL(@Sucur_Id, 0)

 DECLARE @TotalVentas INT;
 SELECT @TotalVentas = COUNT(Venen_Id)
 FROM Venta.tbVentasEncabezado
 WHERE venen_FechaCreacion >= @FechaInicio
     AND venen_FechaCreacion <= @FechaFin;

 SELECT 
    @TotalVentas AS TotalVentasMesActual,
    Venen_Id,
	FORMAT(Venen_FechaCreacion, 'yyyy-MM-dd') as Venen_FechaCreacion,
	c.clien_id,
	e.emple_id,
	Perso_Id,
   CASE 
    WHEN Perso_Tipo = 0  THEN 
        COALESCE(CONCAT(e.Emple_Primernombre, ' ', e.Emple_Segundonombre, ' ', e.Emple_PrimerApellido, ' ', e.Emple_SegundoApellido), 'Consumidor Final') 
    WHEN c.Clien_Id is not null THEN
        COALESCE(CONCAT(c.Clien_PrimerNombre, ' ', c.Clien_SegundoNombre, ' ', c.Clien_PrimerApellido, ' ', c.Clien_SegundoApellido), 'Consumidor Final')
		ELSE 'Consumidor Final'
END AS Persona,

    CASE 
        WHEN Perso_Tipo = 0 THEN 'Empleado' 
        ELSE 'Cliente' 
    END AS Tipo,
    Sucur_Descripcion,
    Tipos_Descripcion
 FROM Venta.tbVentasEncabezado as ve 
 LEFT JOIN Supr.tbSucursales as s on ve.Sucur_Id = s.Sucur_Id
 LEFT JOIN Acce.tbUsuarios as u on u.Usuar_Id = ve.Usuar_Id 
 LEFT JOIN Supr.tbEmpleados as e on e.Emple_Id = u.Perso_Id
 LEFT JOIN Venta.tbClientes as c on c.Clien_Id = ve.Clien_Id
 LEFT JOIN Gral.tbTiposdePagos as t on t.Tipos_Id = ve.Tipos_Id
 WHERE (@FiltroSucursal = 0 OR s.Sucur_Id = @Sucur_Id)
        AND ve.Venen_FechaCreacion >= @FechaInicio
        AND ve.Venen_FechaCreacion <= @FechaFin
END
GO
/****** Object:  StoredProcedure [Supr].[SP_Empleado_Buscar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Procedimiento para buscar un empleado por su ID
CREATE PROCEDURE [Supr].[SP_Empleado_Buscar] 
    @Emple_Id INT
AS
BEGIN
    SELECT
        emple.*,
		CASE Emple_Sexo WHEN 'f' THEN 'Femenino' ELSE 'Masculino' END AS Sexo,
		concat(Emple_PrimerNombre, ' ', Emple_SegundoNombre, ' ', Emple_PrimerApellido, ' ', Emple_SegundoApellido) as Emple_NombreCompleto,
        estad.Estad_Descripcion,
        municipios.Munic_Descripcion,
		departamentos.Depar_Id as deparid,
		departamentos.Depar_Descripcion as depardescrip,
        cargos.Cargo_Descripcion,
        sucursales.Sucur_Descripcion,
        creacion.Usuar_Usuario AS UsuarioCreacion,
		CASE WHEN emple.Emple_UsuarioModificacion = modificacion.Usuar_Id THEN modificacion.Usuar_Usuario  ELSE 'No se ha modificado' END AS UsuarioModificacion
    FROM
        Supr.tbEmpleados emple
    LEFT JOIN
        Gral.tbEstadosCiviles estad
        ON emple.Estad_Id = estad.Estad_Id
    LEFT JOIN
        Gral.tbMunicipios municipios
        ON emple.Munic_Id = municipios.Munic_Id
    LEFT JOIN
	    Gral.tbDepartamentos departamentos
		ON municipios.Depar_Id = departamentos.Depar_Id
	LEFT JOIN
        Gral.tbCargos cargos
        ON emple.Cargo_Id = cargos.Cargo_Id
    LEFT JOIN
        Supr.tbSucursales sucursales
        ON emple.Sucur_Id = sucursales.Sucur_Id
    LEFT JOIN
        Acce.tbUsuarios creacion
        ON emple.Emple_UsuarioCreacion = creacion.Usuar_Id
    LEFT JOIN
        Acce.tbUsuarios modificacion
        ON emple.Emple_UsuarioModificacion = modificacion.Usuar_Id
    WHERE
        emple.Emple_Id = @Emple_Id
END
GO
/****** Object:  StoredProcedure [Supr].[SP_Empleado_Desactivar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Supr].[SP_Empleado_Desactivar]
    @Emple_Id INT
AS
BEGIN

    BEGIN TRY
       
            UPDATE Supr.tbEmpleados
            SET
                Emple_Estado = 0
            WHERE
                Emple_Id = @Emple_Id

            SELECT 1 
        
    END TRY
    BEGIN CATCH
        SELECT 0 
    END CATCH
END
GO
/****** Object:  StoredProcedure [Supr].[SP_Empleado_Insertar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Supr].[SP_Empleado_Insertar]
    @Emple_Dni NVARCHAR(20),
    @Emple_PrimerNombre NVARCHAR(50),
    @Emple_SegundoNombre NVARCHAR(50),
    @Emple_PrimerApellido NVARCHAR(50),
    @Emple_SegundoApellido NVARCHAR(50),
    @Emple_Sexo CHAR(1),
    @Estad_Id INT,
    @Emple_Telefono NVARCHAR(20),
    @Emple_Correo NVARCHAR(MAX),
    @Munic_Id CHAR(4),
    @Emple_Direccion NVARCHAR(MAX),
    @Cargo_Id INT,
    @Sucur_Id INT,
    @Emple_UsuarioCreacion INT,
    @Emple_FechaCreacion DATETIME
AS
BEGIN
    BEGIN TRY
        INSERT INTO Supr.tbEmpleados (
		Emple_Dni,
            Emple_PrimerNombre,
            Emple_SegundoNombre,
            Emple_PrimerApellido,
            Emple_SegundoApellido,
            Emple_Sexo,
            Estad_Id,
            Emple_Telefono,
            Emple_Correo,
            Munic_Id,
            Emple_Direccion,
            Cargo_Id,
            Sucur_Id,
            Emple_UsuarioCreacion,
            Emple_FechaCreacion
        )
        VALUES (
		@Emple_Dni,
            @Emple_PrimerNombre,
            @Emple_SegundoNombre,
            @Emple_PrimerApellido,
            @Emple_SegundoApellido,
            @Emple_Sexo,
            @Estad_Id,
            @Emple_Telefono,
            @Emple_Correo,
            @Munic_Id,
            @Emple_Direccion,
            @Cargo_Id,
            @Sucur_Id,
            @Emple_UsuarioCreacion,
            @Emple_FechaCreacion
        )

        SELECT 1 
    END TRY
    BEGIN CATCH
        SELECT 0  
    END CATCH
END
GO
/****** Object:  StoredProcedure [Supr].[SP_Empleado_Lista]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Supr].[SP_Empleado_Lista]
AS
BEGIN
    SELECT
        emple.*,
		CONCAT(emple.Emple_PrimerNombre,' ',
								CASE WHEN emple.Emple_SegundoNombre IS NULL THEN '' ELSE emple.Emple_SegundoNombre + ' ' END,
								emple.Emple_PrimerApellido, 
								CASE WHEN emple.Emple_SegundoApellido IS NULL THEN '' ELSE ' ' + emple.Emple_SegundoApellido END
							) AS Emple_NombreCompleto,
        estad.Estad_Descripcion,
		CASE WHEN Emple_Sexo = 'f' THEN 'Femenino' ELSE 'Masculino' END AS Sexo,
        municipios.Munic_Descripcion,
        cargos.Cargo_Descripcion,
        sucursales.Sucur_Descripcion,
        creacion.Usuar_Usuario AS UsuarioCreacion,
        modificacion.Usuar_Usuario AS UsuarioModificacion
    FROM
        Supr.tbEmpleados emple
    LEFT JOIN
        Gral.tbEstadosCiviles estad
        ON emple.Estad_Id = estad.Estad_Id
    LEFT JOIN
        Gral.tbMunicipios municipios
        ON emple.Munic_Id = municipios.Munic_Id
    LEFT JOIN
        Gral.tbCargos cargos
        ON emple.Cargo_Id = cargos.Cargo_Id
    LEFT JOIN
        Supr.tbSucursales sucursales
        ON emple.Sucur_Id = sucursales.Sucur_Id
    LEFT JOIN
        Acce.tbUsuarios creacion
        ON emple.Emple_UsuarioCreacion = creacion.Usuar_Id
    LEFT JOIN
        Acce.tbUsuarios modificacion
        ON emple.Emple_UsuarioModificacion = modificacion.Usuar_Id
		WHERE Emple_Estado = 1
END
GO
/****** Object:  StoredProcedure [Supr].[SP_Empleado_Modificar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Supr].[SP_Empleado_Modificar]
    @Emple_Id INT,
    @Emple_PrimerNombre NVARCHAR(50),
    @Emple_SegundoNombre NVARCHAR(50),
    @Emple_PrimerApellido NVARCHAR(50),
    @Emple_SegundoApellido NVARCHAR(50),
    @Emple_Sexo CHAR(1),
    @Estad_Id INT,
    @Emple_Telefono NVARCHAR(20),
    @Emple_Correo NVARCHAR(MAX),
    @Munic_Id CHAR(4),
    @Emple_Direccion NVARCHAR(MAX),
    @Cargo_Id INT,
    @Sucur_Id INT,
    @Emple_UsuarioModificacion INT,
    @Emple_FechaModificacion DATETIME
AS
BEGIN
    BEGIN TRY
        UPDATE Supr.tbEmpleados
        SET
            Emple_PrimerNombre = @Emple_PrimerNombre,
            Emple_SegundoNombre = @Emple_SegundoNombre,
            Emple_PrimerApellido = @Emple_PrimerApellido,
            Emple_SegundoApellido = @Emple_SegundoApellido,
            Emple_Sexo = @Emple_Sexo,
            Estad_Id = @Estad_Id,
            Emple_Telefono = @Emple_Telefono,
            Emple_Correo = @Emple_Correo,
            Munic_Id = @Munic_Id,
            Emple_Direccion = @Emple_Direccion,
            Cargo_Id = @Cargo_Id,
            Sucur_Id = @Sucur_Id,
            Emple_UsuarioModificacion = @Emple_UsuarioModificacion,
            Emple_FechaModificacion = @Emple_FechaModificacion
        WHERE
            Emple_Id = @Emple_Id

        SELECT 1  
    END TRY
    BEGIN CATCH
        SELECT 0  
    END CATCH
END
GO
/****** Object:  StoredProcedure [Supr].[SP_Lote_Buscar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Supr].[SP_Lote_Buscar] 
    @Lotes_Id INT
AS
BEGIN
    SELECT
        lotes.*,
        productos.Produ_Descripcion,
        sucursales.Sucur_Descripcion,
        creacion.Usuar_Usuario AS UsuarioCreacion,
		CASE WHEN lotes.Lotes_UsuarioModificacion = modificacion.Usuar_Id THEN modificacion.Usuar_Usuario  ELSE 'No se ha modificado' END AS UsuarioModificacion
    FROM
        Supr.tbLotes lotes
    LEFT JOIN
        Supr.tbProductos productos
        ON lotes.Produ_Id = productos.Produ_Id
    LEFT JOIN
        Supr.tbSucursales sucursales
        ON lotes.Sucur_Id = sucursales.Sucur_Id
    LEFT JOIN
        Acce.tbUsuarios creacion
        ON lotes.Lotes_UsuarioCreacion = creacion.Usuar_Id
    LEFT JOIN
        Acce.tbUsuarios modificacion
        ON lotes.Lotes_UsuarioModificacion = modificacion.Usuar_Id
    WHERE
        lotes.Lotes_Id = @Lotes_Id
END
GO
/****** Object:  StoredProcedure [Supr].[SP_Lote_Desactivar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Supr].[SP_Lote_Desactivar]
    @Lotes_Id INT
AS
BEGIN


    BEGIN TRY
      
            UPDATE Supr.tbLotes
            SET
                Lotes_Estado = 0
            WHERE
                Lotes_Id = @Lotes_Id

            SELECT 1  
        
    END TRY
    BEGIN CATCH
        SELECT 0 
    END CATCH
END

GO
/****** Object:  StoredProcedure [Supr].[SP_Lote_Insertar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Supr].[SP_Lote_Insertar]
    @Lotes_FechaVencimiento DATETIME,
    @Produ_Id INT,
    @Lotes_Cantidad INT,
    @Sucur_Id INT,
    @Lotes_UsuarioCreacion INT,
    @Lotes_FechaCreacion DATETIME
AS
BEGIN
    BEGIN TRY
        INSERT INTO Supr.tbLotes (
            Lotes_FechaVencimiento,
            Produ_Id,
            Lotes_Cantidad,
            Sucur_Id,
            Lotes_UsuarioCreacion,
            Lotes_FechaCreacion
        )
        VALUES (
            @Lotes_FechaVencimiento,
            @Produ_Id,
            @Lotes_Cantidad,
            @Sucur_Id,
            @Lotes_UsuarioCreacion,
            @Lotes_FechaCreacion
        )

        SELECT 1 
    END TRY
    BEGIN CATCH
        SELECT 0  
    END CATCH
END
GO
/****** Object:  StoredProcedure [Supr].[SP_Lote_Lista]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Supr].[SP_Lote_Lista]
AS
BEGIN
    SELECT
        lotes.Lotes_Id,
		FORMAT(Lotes_FechaVencimiento, 'yyyy-MM-dd') as Lotes_FechaVencimiento,
		lotes.Produ_Id, Lotes_Cantidad,lotes.Sucur_Id,
        productos.Produ_Descripcion,
        sucursales.Sucur_Descripcion,
        creacion.Usuar_Usuario AS UsuarioCreacion,
        modificacion.Usuar_Usuario AS UsuarioModificacion
    FROM
        Supr.tbLotes lotes
    LEFT JOIN
        Supr.tbProductos productos
        ON lotes.Produ_Id = productos.Produ_Id
    LEFT JOIN
        Supr.tbSucursales sucursales
        ON lotes.Sucur_Id = sucursales.Sucur_Id
    LEFT JOIN
        Acce.tbUsuarios creacion
        ON lotes.Lotes_UsuarioCreacion = creacion.Usuar_Id
    LEFT JOIN
        Acce.tbUsuarios modificacion
        ON lotes.Lotes_UsuarioModificacion = modificacion.Usuar_Id
		where Lotes_Estado = 1
END
GO
/****** Object:  StoredProcedure [Supr].[SP_Lote_Modificar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Supr].[SP_Lote_Modificar]
    @Lotes_Id INT,
    @Lotes_FechaVencimiento DATETIME,
    @Produ_Id INT,
    @Lotes_Cantidad INT,
    @Sucur_Id INT,
    @Lotes_UsuarioModificacion INT,
    @Lotes_FechaModificacion DATETIME
AS
BEGIN
    BEGIN TRY
        UPDATE Supr.tbLotes
        SET
            Lotes_FechaVencimiento = @Lotes_FechaVencimiento,
            Produ_Id = @Produ_Id,
            Lotes_Cantidad = @Lotes_Cantidad,
            Sucur_Id = @Sucur_Id,
            Lotes_UsuarioModificacion = @Lotes_UsuarioModificacion,
            Lotes_FechaModificacion = @Lotes_FechaModificacion
        WHERE
            Lotes_Id = @Lotes_Id

        SELECT 1  
    END TRY
    BEGIN CATCH
        SELECT 0 
    END CATCH
END
GO
/****** Object:  StoredProcedure [Supr].[SP_Producto_Buscar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Supr].[SP_Producto_Buscar] 
    @Produ_Id INT
AS
BEGIN
    SELECT
        produ.*,
        subcat.Subca_Descripcion,
        proveedor.Prove_Marca,
        impuesto.Impue_Descripcion,
		img, 
        creacion.Usuar_Usuario AS UsuarioCreacion,
		CASE WHEN produ.Produ_UsuarioModificacion = modificacion.Usuar_Id THEN modificacion.Usuar_Usuario  ELSE 'No se ha modificado' END AS UsuarioModificacion
    FROM
        Supr.tbProductos produ
    LEFT JOIN
        Gral.tbSubcategorias subcat
        ON produ.Subca_Id = subcat.Subca_Id
    LEFT JOIN
        Supr.tbProveedores proveedor
        ON produ.Prove_Id = proveedor.Prove_Id
    LEFT JOIN
        Gral.tbImpuestos impuesto
        ON produ.Impue_Id = impuesto.Impue_Id
    LEFT JOIN
        Acce.tbUsuarios creacion
        ON produ.Produ_UsuarioCreacion = creacion.Usuar_Id
    LEFT JOIN
        Acce.tbUsuarios modificacion
        ON produ.Produ_UsuarioModificacion = modificacion.Usuar_Id
    WHERE
        produ.Produ_Id = @Produ_Id
END
GO
/****** Object:  StoredProcedure [Supr].[SP_Producto_Desactivar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Supr].[SP_Producto_Desactivar]
    @Produ_Id INT
AS
BEGIN
    DECLARE @NumeroDeRelaciones INT = 0

    SET @NumeroDeRelaciones = (
        SELECT COUNT(*)
        FROM Supr.tbLotes
        WHERE Produ_Id = @Produ_Id
    )

    BEGIN TRY
        IF @NumeroDeRelaciones = 0
        BEGIN
            UPDATE Supr.tbProductos
            SET
                Produ_Estado = 0
            WHERE
                Produ_Id = @Produ_Id

            SELECT 1 
        END
        ELSE
        BEGIN
            SELECT 0   
        END
    END TRY
    BEGIN CATCH
        SELECT -1   
    END CATCH
END 
GO
/****** Object:  StoredProcedure [Supr].[SP_Producto_Insertar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Supr].[SP_Producto_Insertar]
    @Produ_Descripcion NVARCHAR(50),
    @Produ_Existencia INT,
    @Produ_PrecioCompra NUMERIC(8,2),
    @Produ_PrecioVenta NUMERIC(8,2),
    @Impue_Id INT,
    @Subca_Id INT,
    @Prove_Id INT,
	@img nvarchar(max),
    @Produ_UsuarioCreacion INT,
    @Produ_FechaCreacion DATETIME
AS
BEGIN
    BEGIN TRY
        INSERT INTO Supr.tbProductos (
            Produ_Descripcion,
            Produ_Existencia,
            Produ_PrecioCompra,
            Produ_PrecioVenta,
            Impue_Id,
            Subca_Id,
            Prove_Id,
			img,
            Produ_UsuarioCreacion,
            Produ_FechaCreacion
        )
        VALUES (
            @Produ_Descripcion,
            @Produ_Existencia,
            @Produ_PrecioCompra,
            @Produ_PrecioVenta,
            @Impue_Id,
            @Subca_Id,
            @Prove_Id,
			@img,
            @Produ_UsuarioCreacion,
            @Produ_FechaCreacion
        )

        SELECT 1   
    END TRY
    BEGIN CATCH
        SELECT 0  
    END CATCH
END
GO
/****** Object:  StoredProcedure [Supr].[SP_Producto_Lista]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Supr].[SP_Producto_Lista]
AS
BEGIN
    SELECT
        produ.*,
        subcat.Subca_Descripcion,
        proveedor.Prove_Marca,
        impuesto.Impue_Descripcion,
		img,
        creacion.Usuar_Usuario AS UsuarioCreacion,
        modificacion.Usuar_Usuario AS UsuarioModificacion
    FROM
        Supr.tbProductos produ
    LEFT JOIN
        Gral.tbSubcategorias subcat
        ON produ.Subca_Id = subcat.Subca_Id
    LEFT JOIN
        Supr.tbProveedores proveedor
        ON produ.Prove_Id = proveedor.Prove_Id
    LEFT JOIN
        Gral.tbImpuestos impuesto
        ON produ.Impue_Id = impuesto.Impue_Id
    LEFT JOIN
        Acce.tbUsuarios creacion
        ON produ.Produ_UsuarioCreacion = creacion.Usuar_Id
    LEFT JOIN
        Acce.tbUsuarios modificacion
        ON produ.Produ_UsuarioModificacion = modificacion.Usuar_Id
END
GO
/****** Object:  StoredProcedure [Supr].[SP_Producto_Modificar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Supr].[SP_Producto_Modificar]
    @Produ_Id INT,
    @Produ_Descripcion NVARCHAR(50),
    @Produ_Existencia INT,
    @Produ_PrecioCompra NUMERIC(8,2),
    @Produ_PrecioVenta NUMERIC(8,2),
    @Impue_Id INT,
    @Subca_Id INT,
    @Prove_Id INT,
	@img nvarchar(max),
    @Produ_UsuarioModificacion INT,
    @Produ_FechaModificacion DATETIME
AS
BEGIN
    BEGIN TRY
        UPDATE Supr.tbProductos
        SET
            Produ_Descripcion = @Produ_Descripcion,
            Produ_Existencia = @Produ_Existencia,
            Produ_PrecioCompra = @Produ_PrecioCompra,
            Produ_PrecioVenta = @Produ_PrecioVenta,
            Impue_Id = @Impue_Id,
            Subca_Id = @Subca_Id,
            Prove_Id = @Prove_Id,
			img = @img,
            Produ_UsuarioModificacion = @Produ_UsuarioModificacion,
            Produ_FechaModificacion = @Produ_FechaModificacion
        WHERE
            Produ_Id = @Produ_Id

        SELECT 1 
    END TRY
    BEGIN CATCH
        SELECT 0 
    END CATCH
END
GO
/****** Object:  StoredProcedure [Supr].[SP_Producto_Top]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [Supr].[SP_Producto_Top] 
AS BEGIN
  DECLARE @MesActual INT = MONTH(GETDATE())
  DECLARE @AnioActual INT = YEAR(GETDATE())
  DECLARE @MesPasado INT = @MesActual - 1
  DECLARE @AnioPasado INT = @AnioActual

  IF @MesPasado = 0
    SET @MesPasado = 12
    SET @AnioPasado = @AnioActual - 1

  SELECT TOP 5
    [Produ_Descripcion] as Producto,
    COUNT(Vende_Cantidad) AS Total,
    (COUNT(Vende_Cantidad) - 
      (SELECT COUNT(Vende_Cantidad) 
       FROM Venta.tbVentasDetalle
       WHERE MONTH(Vende_FechaCreacion) = @MesPasado AND YEAR(Vende_FechaCreacion) = @AnioPasado)
    ) AS DiferenciaVentasMesPasado
  FROM Venta.tbVentasDetalle as vd INNER JOIN Supr.tbLotes as l on vd.Lotes_Id = l.Lotes_Id
  INNER JOIN Supr.tbProductos as p on p.produ_Id = l.produ_Id
  WHERE MONTH(Vende_FechaCreacion) = @MesActual AND YEAR(Vende_FechaCreacion) = @AnioActual
  group by Produ_Descripcion
END
GO
/****** Object:  StoredProcedure [Supr].[SP_Productos_Existencia]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Supr].[SP_Productos_Existencia]
    @Sucur_Id INT = NULL,
    @FiltroSucursal BIT = 0
AS
BEGIN
SET @Sucur_Id = ISNULL(@Sucur_Id, 0)

    SELECT 
        p.Produ_Descripcion AS Producto,
        l.Lotes_Cantidad AS Cantidad
    FROM 
        Supr.tbLotes l
        INNER JOIN Supr.tbProductos p ON l.Produ_Id = p.Produ_Id
    WHERE 
(@FiltroSucursal = 0 OR l.Sucur_Id = @Sucur_Id)
AND l.Lotes_Estado = 1
        AND p.Produ_Estado = 1
    ORDER BY 
        p.Produ_Descripcion;
END;
GO
/****** Object:  StoredProcedure [Supr].[SP_Promocion_Buscar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Procedimiento para buscar una promoción por su ID
CREATE PROCEDURE [Supr].[SP_Promocion_Buscar]
    @Promo_Id INT
AS
BEGIN
    SELECT
        promo.*,
        producto.Produ_Descripcion,
        creacion.Usuar_Usuario AS UsuarioCreacion,
		CASE WHEN promo.Promo_UsuarioModificacion = modificacion.Usuar_Id THEN modificacion.Usuar_Usuario  ELSE 'No se ha modificado' END AS UsuarioModificacion
    FROM
        Supr.tbPromociones promo
    LEFT JOIN
        Supr.tbProductos producto
        ON promo.Produ_Id = producto.Produ_Id
    LEFT JOIN
        Acce.tbUsuarios creacion
        ON promo.Promo_UsuarioCreacion = creacion.Usuar_Id
    LEFT JOIN
        Acce.tbUsuarios modificacion
        ON promo.Promo_UsuarioModificacion = modificacion.Usuar_Id
    WHERE
        promo.Promo_Id = @Promo_Id
END
GO
/****** Object:  StoredProcedure [Supr].[SP_Promocion_Desactivar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Supr].[SP_Promocion_Desactivar]
    @Promo_Id INT
AS
BEGIN

    BEGIN TRY
        
            UPDATE Supr.tbPromociones
            SET
                Promo_Estado = 0
            WHERE
                Promo_Id = @Promo_Id

            SELECT 1 
       
    END TRY
    BEGIN CATCH
        SELECT 0 
    END CATCH
END
GO
/****** Object:  StoredProcedure [Supr].[SP_Promocion_Insertar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Supr].[SP_Promocion_Insertar]
    @Promo_Descripcion nvarchar(max),
    @Promo_Porcentaje DECIMAL(5,2),
    @Produ_Id INT,
    @Promo_UsuarioCreacion int,
	@Promo_FechaCreacion datetime
AS
BEGIN
	BEGIN TRY
    DECLARE @Produ_PrecioVenta DECIMAL(10, 2);
    DECLARE @Promo_Disminucion DECIMAL(10, 2);
    DECLARE @Promo_PuntosRequeridos INT;

	--precio producto
    SELECT @Produ_PrecioVenta = Produ_PrecioVenta
    FROM tbProductos
    WHERE Produ_Id = @Produ_Id;

	--descuento en dinero
    SET @Promo_Disminucion = @Produ_PrecioVenta * @Promo_Porcentaje;

	--puntos
    SET @Promo_PuntosRequeridos = CEILING(@Promo_Disminucion / 10);

    INSERT INTO tbPromociones (
        Promo_Descripcion,
        Produ_Id,
        Promo_Disminucion,
        Promo_PuntosRequeridos,
        Promo_UsuarioCreacion,
        Promo_FechaCreacion,
        Promo_Porcentaje,
        Promo_Estado
    )
    VALUES (
        @Promo_Descripcion,
        @Produ_Id,
        @Promo_Disminucion,
        @Promo_PuntosRequeridos,
        @Promo_UsuarioCreacion,
        @Promo_FechaCreacion,
        @Promo_Porcentaje,
        1
    );
        SELECT 1 
    END TRY
    BEGIN CATCH
        SELECT 0 
    END CATCH
END
GO
/****** Object:  StoredProcedure [Supr].[SP_Promocion_Lista]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Supr].[SP_Promocion_Lista]
AS
BEGIN
    SELECT
        promo.*,
        producto.Produ_Descripcion,
        creacion.Usuar_Usuario AS UsuarioCreacion,
        modificacion.Usuar_Usuario AS UsuarioModificacion
    FROM
        Supr.tbPromociones promo
    LEFT JOIN
        Supr.tbProductos producto
        ON promo.Produ_Id = producto.Produ_Id
    LEFT JOIN
        Acce.tbUsuarios creacion
        ON promo.Promo_UsuarioCreacion = creacion.Usuar_Id
    LEFT JOIN
        Acce.tbUsuarios modificacion
        ON promo.Promo_UsuarioModificacion = modificacion.Usuar_Id
		where Promo_Estado = 1
END
GO
/****** Object:  StoredProcedure [Supr].[SP_Promocion_Modificar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Supr].[SP_Promocion_Modificar]
    @Promo_Id INT,
    @Promo_Descripcion nvarchar(max),
    @Promo_Porcentaje DECIMAL(5,2),
    @Produ_Id INT,
    @Promo_UsuarioModificacion INT,
    @Promo_FechaModificacion DATETIME
AS
BEGIN
    BEGIN TRY
        DECLARE @Produ_PrecioVenta DECIMAL(10, 2);
        DECLARE @Promo_Disminucion DECIMAL(10, 2);
        DECLARE @Promo_PuntosRequeridos INT;

        SELECT @Produ_PrecioVenta = Produ_PrecioVenta
        FROM tbProductos
        WHERE Produ_Id = @Produ_Id;

        SET @Promo_Disminucion = @Produ_PrecioVenta * @Promo_Porcentaje;

        SET @Promo_PuntosRequeridos = CEILING(@Promo_Disminucion / 10);

        UPDATE tbPromociones
        SET
            Promo_Descripcion = @Promo_Descripcion,
            Produ_Id = @Produ_Id,
            Promo_Disminucion = @Promo_Disminucion,
            Promo_PuntosRequeridos = @Promo_PuntosRequeridos,
            Promo_UsuarioModificacion = @Promo_UsuarioModificacion,
            Promo_FechaModificacion = @Promo_FechaModificacion,
            Promo_Porcentaje = @Promo_Porcentaje
        WHERE Promo_Id = @Promo_Id;

        SELECT 1;
    END TRY
    BEGIN CATCH
        SELECT 0;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [Supr].[SP_Proveedor_Buscar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Supr].[SP_Proveedor_Buscar] 
    @Prove_Id INT
AS
BEGIN
    SELECT
        prove.*,
		concat(prove_contactoprimernombre, ' ',prove_contactosegundonombre,' ',prove_contactoprimerapellido,' ',prove_contactosegundoapellido) as Contacto,

        municipio.Munic_Descripcion,
        creacion.Usuar_Usuario AS UsuarioCreacion,
		CASE WHEN  prove.Prove_UsuarioModificacion = modificacion.Usuar_Id THEN modificacion.Usuar_Usuario  ELSE 'No se ha modificado' END AS UsuarioModificacion
    FROM
        Supr.tbProveedores prove
    LEFT JOIN
        Gral.tbMunicipios municipio
        ON prove.Munic_Id = municipio.Munic_Id
    LEFT JOIN
        Acce.tbUsuarios creacion
        ON prove.Prove_UsuarioCreacion = creacion.Usuar_Id
    LEFT JOIN
        Acce.tbUsuarios modificacion
        ON prove.Prove_UsuarioModificacion = modificacion.Usuar_Id
    WHERE
        prove.Prove_Id = @Prove_Id
END
GO
/****** Object:  StoredProcedure [Supr].[SP_Proveedor_Desactivar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Supr].[SP_Proveedor_Desactivar]
    @Prove_Id INT
AS
BEGIN
    DECLARE @NumeroDeRelaciones INT = 0

    SET @NumeroDeRelaciones = (
        SELECT COUNT(*)
        FROM Supr.tbProductos  
        WHERE Prove_Id = @Prove_Id
    )

    BEGIN TRY
        IF @NumeroDeRelaciones = 0
        BEGIN
            UPDATE Supr.tbProveedores
            SET
                Prove_Estado = 0
            WHERE
                Prove_Id = @Prove_Id

            SELECT 1 
        END
        ELSE
        BEGIN
            SELECT 0 
        END
    END TRY
    BEGIN CATCH
        SELECT -1  
    END CATCH
END
GO
/****** Object:  StoredProcedure [Supr].[SP_Proveedor_Insertar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Supr].[SP_Proveedor_Insertar]
    @Prove_Marca NVARCHAR(50),
    @Prove_ContactoPrimerNombre NVARCHAR(50),
    @Prove_ContactoSegundoNombre NVARCHAR(50),
    @Prove_ContactoPrimerApellido NVARCHAR(50),
    @Prove_ContactoSegundoApellido NVARCHAR(50),
    @Munic_Id CHAR(4),
    @Prove_Direccion NVARCHAR(MAX),
    @Prove_Telefono NVARCHAR(20),
    @Prove_Correo NVARCHAR(MAX),
    @Prove_UsuarioCreacion INT,
    @Prove_FechaCreacion DATETIME
AS
BEGIN
    BEGIN TRY
        INSERT INTO Supr.tbProveedores (
            Prove_Marca,
            Prove_ContactoPrimerNombre,
            Prove_ContactoSegundoNombre,
            Prove_ContactoPrimerApellido,
            Prove_ContactoSegundoApellido,
            Munic_Id,
            Prove_Direccion,
            Prove_Telefono,
            Prove_Correo,
            Prove_UsuarioCreacion,
            Prove_FechaCreacion
        )
        VALUES (
            @Prove_Marca,
            @Prove_ContactoPrimerNombre,
            @Prove_ContactoSegundoNombre,
            @Prove_ContactoPrimerApellido,
            @Prove_ContactoSegundoApellido,
            @Munic_Id,
            @Prove_Direccion,
            @Prove_Telefono,
            @Prove_Correo,
            @Prove_UsuarioCreacion,
            @Prove_FechaCreacion
        )

        SELECT 1 
    END TRY
    BEGIN CATCH
        SELECT 0  
    END CATCH
END
GO
/****** Object:  StoredProcedure [Supr].[SP_Proveedor_Lista]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Supr].[SP_Proveedor_Lista]
AS
BEGIN
    SELECT
        prove.*,
        municipio.Munic_Descripcion,
		CONCAT(prove.Prove_ContactoPrimerNombre,' ',
								CASE WHEN prove.Prove_ContactoSegundoNombre IS NULL THEN '' ELSE prove.Prove_ContactoSegundoNombre + ' ' END,
								prove.Prove_ContactoPrimerApellido, 
								CASE WHEN prove.Prove_ContactoSegundoApellido IS NULL THEN '' ELSE ' ' + prove.Prove_ContactoSegundoApellido END
							) AS Contacto,
        creacion.Usuar_Usuario AS UsuarioCreacion,
        modificacion.Usuar_Usuario AS UsuarioModificacion
    FROM
        Supr.tbProveedores prove
    LEFT JOIN
        Gral.tbMunicipios municipio
        ON prove.Munic_Id = municipio.Munic_Id
    LEFT JOIN
        Acce.tbUsuarios creacion
        ON prove.Prove_UsuarioCreacion = creacion.Usuar_Id
    LEFT JOIN
        Acce.tbUsuarios modificacion
        ON prove.Prove_UsuarioModificacion = modificacion.Usuar_Id
END
GO
/****** Object:  StoredProcedure [Supr].[SP_Proveedor_Modificar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Supr].[SP_Proveedor_Modificar]
    @Prove_Id INT,
    @Prove_Marca NVARCHAR(50),
    @Prove_ContactoPrimerNombre NVARCHAR(50),
    @Prove_ContactoSegundoNombre NVARCHAR(50),
    @Prove_ContactoPrimerApellido NVARCHAR(50),
    @Prove_ContactoSegundoApellido NVARCHAR(50),
    @Munic_Id CHAR(4),
    @Prove_Direccion NVARCHAR(MAX),
    @Prove_Telefono NVARCHAR(20),
    @Prove_Correo NVARCHAR(MAX),
    @Prove_UsuarioModificacion INT,
    @Prove_FechaModificacion DATETIME
AS
BEGIN
    BEGIN TRY
        UPDATE Supr.tbProveedores
        SET
            Prove_Marca = @Prove_Marca,
            Prove_ContactoPrimerNombre = @Prove_ContactoPrimerNombre,
            Prove_ContactoSegundoNombre = @Prove_ContactoSegundoNombre,
            Prove_ContactoPrimerApellido = @Prove_ContactoPrimerApellido,
            Prove_ContactoSegundoApellido = @Prove_ContactoSegundoApellido,
            Munic_Id = @Munic_Id,
            Prove_Direccion = @Prove_Direccion,
            Prove_Telefono = @Prove_Telefono,
            Prove_Correo = @Prove_Correo,
            Prove_UsuarioModificacion = @Prove_UsuarioModificacion,
            Prove_FechaModificacion = @Prove_FechaModificacion
        WHERE
            Prove_Id = @Prove_Id

        SELECT 1   
    END TRY
    BEGIN CATCH
        SELECT 0 
    END CATCH
END
GO
/****** Object:  StoredProcedure [Supr].[SP_Sucursal_Buscar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Supr].[SP_Sucursal_Buscar]
    @Sucur_Id INT
AS
BEGIN
    SELECT
        sucur.*,
        municipio.Munic_Descripcion,
        creacion.Usuar_Usuario AS UsuarioCreacion,
		CASE WHEN sucur.Sucur_UsuarioModificacion = modificacion.Usuar_Id THEN modificacion.Usuar_Usuario  ELSE 'No se ha modificado' END AS UsuarioModificacion
    FROM
        Supr.tbSucursales sucur
    LEFT JOIN
        Gral.tbMunicipios municipio
        ON sucur.Munic_Id = municipio.Munic_Id
    LEFT JOIN
        Acce.tbUsuarios creacion
        ON sucur.Sucur_UsuarioCreacion = creacion.Usuar_Id
    LEFT JOIN
        Acce.tbUsuarios modificacion
        ON sucur.Sucur_UsuarioModificacion = modificacion.Usuar_Id
    WHERE
        sucur.Sucur_Id = @Sucur_Id
END
GO
/****** Object:  StoredProcedure [Supr].[SP_Sucursal_Desactivar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Supr].[SP_Sucursal_Desactivar]
    @Sucur_Id INT,
    @Sucur_UsuarioModificacion INT,
    @Sucur_FechaModificacion DATETIME
AS
BEGIN

    BEGIN TRY
       
            UPDATE Supr.tbSucursales
            SET
                Sucur_Estado = 0,
                Sucur_UsuarioModificacion = @Sucur_UsuarioModificacion,
                Sucur_FechaModificacion = @Sucur_FechaModificacion
            WHERE
                Sucur_Id = @Sucur_Id

            SELECT 1   
       
    END TRY
    BEGIN CATCH
        SELECT 0   
    END CATCH
END 
GO
/****** Object:  StoredProcedure [Supr].[SP_Sucursal_Insertar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Supr].[SP_Sucursal_Insertar]
    @Sucur_Descripcion NVARCHAR(50),
    @Munic_Id CHAR(4),
    @Sucur_Direccion NVARCHAR(MAX),
    @Sucur_Telefono NVARCHAR(20),
    @Sucur_UsuarioCreacion INT,
    @Sucur_FechaCreacion DATETIME
AS
BEGIN
    BEGIN TRY
        INSERT INTO Supr.tbSucursales (
            Sucur_Descripcion,
            Munic_Id,
            Sucur_Direccion,
            Sucur_Telefono,
            Sucur_UsuarioCreacion,
            Sucur_FechaCreacion
        )
        VALUES (
            @Sucur_Descripcion,
            @Munic_Id,
            @Sucur_Direccion,
            @Sucur_Telefono,
            @Sucur_UsuarioCreacion,
            @Sucur_FechaCreacion
        )

        SELECT 1  
    END TRY
    BEGIN CATCH
        SELECT 0   
    END CATCH
END
GO
/****** Object:  StoredProcedure [Supr].[SP_Sucursal_Lista]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Supr].[SP_Sucursal_Lista]
AS
BEGIN
    SELECT
        sucur.*,
        municipio.Munic_Descripcion,
        creacion.Usuar_Usuario AS UsuarioCreacion,
        modificacion.Usuar_Usuario AS UsuarioModificacion
    FROM
        Supr.tbSucursales sucur
    LEFT JOIN
        Gral.tbMunicipios municipio
        ON sucur.Munic_Id = municipio.Munic_Id
    LEFT JOIN
        Acce.tbUsuarios creacion
        ON sucur.Sucur_UsuarioCreacion = creacion.Usuar_Id
    LEFT JOIN
        Acce.tbUsuarios modificacion
        ON sucur.Sucur_UsuarioModificacion = modificacion.Usuar_Id
		where Sucur_Estado = 1
END
GO
/****** Object:  StoredProcedure [Supr].[SP_Sucursal_Modificar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Supr].[SP_Sucursal_Modificar]
    @Sucur_Id INT,
    @Sucur_Descripcion NVARCHAR(50),
    @Munic_Id CHAR(4),
    @Sucur_Direccion NVARCHAR(MAX),
    @Sucur_Telefono NVARCHAR(20),
    @Sucur_UsuarioModificacion INT,
    @Sucur_FechaModificacion DATETIME
AS
BEGIN
    BEGIN TRY
        UPDATE Supr.tbSucursales
        SET
            Sucur_Descripcion = @Sucur_Descripcion,
            Munic_Id = @Munic_Id,
            Sucur_Direccion = @Sucur_Direccion,
            Sucur_Telefono = @Sucur_Telefono,
            Sucur_UsuarioModificacion = @Sucur_UsuarioModificacion,
            Sucur_FechaModificacion = @Sucur_FechaModificacion
        WHERE
            Sucur_Id = @Sucur_Id

        SELECT 1   
    END TRY
    BEGIN CATCH
        SELECT 0  
    END CATCH
END
GO
/****** Object:  StoredProcedure [Venta].[SP_Categoria_Total]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Venta].[SP_Categoria_Total] 
--si es todas null,0 y fechas si es por sucursal sucur,1,fechas
    @Sucur_Id INT = NULL,
    @FiltroSucursal BIT = 0,
    @FechaInicio DATE,
    @FechaFin DATE
AS
BEGIN
SET @Sucur_Id = ISNULL(@Sucur_Id, 0)

    SELECT TOP 5
        c.Categ_Descripcion AS Categoria,
        SUM(v.Vende_Cantidad) AS TotalVentas
    FROM
        Venta.tbVentasDetalle v
        INNER JOIN Supr.tbLotes l ON v.Lotes_Id = l.Lotes_Id
        INNER JOIN Supr.tbProductos p ON l.Produ_Id = p.Produ_Id
        INNER JOIN Gral.tbSubcategorias s ON p.Subca_Id = s.Subca_Id
        INNER JOIN Gral.tbCategorias c ON s.Categ_Id = c.Categ_Id
        INNER JOIN Supr.tbSucursales su ON su.Sucur_Id = l.Sucur_Id
        INNER JOIN Venta.tbVentasEncabezado ve ON v.Venen_Id = ve.Venen_Id
    WHERE 
        (@FiltroSucursal = 0 OR su.Sucur_Id = @Sucur_Id)
        AND ve.Venen_FechaCreacion >= @FechaInicio
        AND ve.Venen_FechaCreacion <= @FechaFin
    GROUP BY 
        c.Categ_Descripcion
    ORDER BY 
        TotalVentas DESC;
END;
GO
/****** Object:  StoredProcedure [Venta].[SP_Cliente_Buscar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Venta].[SP_Cliente_Buscar] 
    @Clien_Id INT
AS
BEGIN
    SELECT
        cliente.*,
	    CASE Clien_Sexo WHEN 'f' THEN 'Femenino' ELSE 'Masculino' END AS Sexo,
		concat(Clien_PrimerNombre, ' ', Clien_SegundoNombre, ' ', Clien_PrimerApellido, ' ', Clien_SegundoApellido) as Clien_NombreCompleto,
        estad.Estad_Descripcion,
        municipio.Munic_Descripcion,
		departamento.Depar_Id as deparid,
		departamento.Depar_Descripcion as depardescrip,
        creacion.Usuar_Usuario AS UsuarioCreacion,
		CASE WHEN cliente.Clien_UsuarioModificacion = modificacion.Usuar_Id THEN modificacion.Usuar_Usuario  ELSE 'No se ha modificado' END AS UsuarioModificacion
    FROM
        Venta.tbClientes cliente
    LEFT JOIN
        Gral.tbEstadosCiviles estad
        ON cliente.Estad_Id = estad.Estad_Id
    LEFT JOIN
        Gral.tbMunicipios municipio
        ON cliente.Munic_Id = municipio.Munic_Id
    LEFT JOIN
	    Gral.tbDepartamentos departamento
		ON municipio.Depar_Id = departamento.Depar_Id
	LEFT JOIN
        Acce.tbUsuarios creacion
        ON cliente.Clien_UsuarioCreacion = creacion.Usuar_Id
    LEFT JOIN
        Acce.tbUsuarios modificacion
        ON cliente.Clien_UsuarioModificacion = modificacion.Usuar_Id
    WHERE
        cliente.Clien_Id = @Clien_Id
END
GO
/****** Object:  StoredProcedure [Venta].[SP_Cliente_Desactivar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Venta].[SP_Cliente_Desactivar]
    @Clien_Id INT
AS
BEGIN
 
    BEGIN TRY
     
            UPDATE Venta.tbClientes
            SET
                Clien_Estado = 0
            WHERE
                Clien_Id = @Clien_Id

            SELECT 1  
       
    END TRY
    BEGIN CATCH
        SELECT 0  
    END CATCH
END
GO
/****** Object:  StoredProcedure [Venta].[SP_Cliente_Insertar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Venta].[SP_Cliente_Insertar]
@Clien_Dni VARCHAR(20),
    @Clien_PrimerNombre NVARCHAR(50),
    @Clien_SegundoNombre NVARCHAR(50),
    @Clien_PrimerApellido NVARCHAR(50),
    @Clien_SegundoApellido NVARCHAR(50),
    @Clien_Sexo CHAR(1),
    @Estad_Id INT,
    @Clien_Telefono NVARCHAR(20),
    @Munic_Id CHAR(4),
    @Clien_Direccion NVARCHAR(MAX),
    @Clien_UsuarioCreacion INT,
    @Clien_FechaCreacion DATETIME
AS
BEGIN
    BEGIN TRY
        INSERT INTO Venta.tbClientes (
		Clien_Dni,
            Clien_PrimerNombre,
            Clien_SegundoNombre,
            Clien_PrimerApellido,
            Clien_SegundoApellido,
            Clien_Sexo,
            Estad_Id,
            Clien_Telefono,
            Munic_Id,
            Clien_Direccion,
            Clien_UsuarioCreacion,
            Clien_FechaCreacion
        )
        VALUES (
		@Clien_Dni,
            @Clien_PrimerNombre,
            @Clien_SegundoNombre,
            @Clien_PrimerApellido,
            @Clien_SegundoApellido,
            @Clien_Sexo,
            @Estad_Id,
            @Clien_Telefono,
            @Munic_Id,
            @Clien_Direccion,
            @Clien_UsuarioCreacion,
            @Clien_FechaCreacion
        )

        SELECT 1  
    END TRY
    BEGIN CATCH
        SELECT 0 
    END CATCH
END
GO
/****** Object:  StoredProcedure [Venta].[SP_Cliente_Lista]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Venta].[SP_Cliente_Lista] 
AS
BEGIN
    SELECT
        cliente.*,
	    CASE Clien_Sexo WHEN 'f' THEN 'Femenino' ELSE 'Masculino' END AS Sexo,
		concat(Clien_PrimerNombre, ' ', Clien_SegundoNombre, ' ', Clien_PrimerApellido, ' ', Clien_SegundoApellido) as Clien_NombreCompleto,
        estad.Estad_Descripcion,
        municipio.Munic_Descripcion,
        creacion.Usuar_Usuario AS UsuarioCreacion,
        modificacion.Usuar_Usuario AS UsuarioModificacion
    FROM
        Venta.tbClientes cliente
    LEFT JOIN
        Gral.tbEstadosCiviles estad
        ON cliente.Estad_Id = estad.Estad_Id
    LEFT JOIN
        Gral.tbMunicipios municipio
        ON cliente.Munic_Id = municipio.Munic_Id
    LEFT JOIN
        Acce.tbUsuarios creacion
        ON cliente.Clien_UsuarioCreacion = creacion.Usuar_Id
    LEFT JOIN
        Acce.tbUsuarios modificacion
        ON cliente.Clien_UsuarioModificacion = modificacion.Usuar_Id
		Where Clien_Estado = 1
END
GO
/****** Object:  StoredProcedure [Venta].[SP_Cliente_Modificar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Venta].[SP_Cliente_Modificar]
    @Clien_Id INT,
    @Clien_PrimerNombre NVARCHAR(50),
    @Clien_SegundoNombre NVARCHAR(50),
    @Clien_PrimerApellido NVARCHAR(50),
    @Clien_SegundoApellido NVARCHAR(50),
    @Clien_Sexo CHAR(1),
    @Estad_Id INT,
    @Clien_Telefono NVARCHAR(20),
    @Munic_Id CHAR(4),
    @Clien_Direccion NVARCHAR(MAX),
    @Clien_UsuarioModificacion INT,
    @Clien_FechaModificacion DATETIME
AS
BEGIN
    BEGIN TRY
        UPDATE Venta.tbClientes
        SET
            Clien_PrimerNombre = @Clien_PrimerNombre,
            Clien_SegundoNombre = @Clien_SegundoNombre,
            Clien_PrimerApellido = @Clien_PrimerApellido,
            Clien_SegundoApellido = @Clien_SegundoApellido,
            Clien_Sexo = @Clien_Sexo,
            Estad_Id = @Estad_Id,
            Clien_Telefono = @Clien_Telefono,
            Munic_Id = @Munic_Id,
            Clien_Direccion = @Clien_Direccion,
            Clien_UsuarioModificacion = @Clien_UsuarioModificacion,
            Clien_FechaModificacion = @Clien_FechaModificacion
        WHERE
            Clien_Id = @Clien_Id

        SELECT 1 
    END TRY
    BEGIN CATCH
        SELECT 0   
    END CATCH
END
GO
/****** Object:  StoredProcedure [Venta].[SP_Cliente_Total]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Venta].[SP_Cliente_Total]
AS BEGIN
  DECLARE @MesActual INT = MONTH(GETDATE())
  DECLARE @AnioActual INT = YEAR(GETDATE())
  DECLARE @MesPasado INT = @MesActual - 1
  DECLARE @AnioPasado INT = @AnioActual

  IF @MesPasado = 0
    SET @MesPasado = 12
    SET @AnioPasado = @AnioActual - 1

  SELECT 
    COUNT(Clien_Id) AS TotalClientesMesActual,
    (COUNT(Clien_Id) - 
      (SELECT COUNT(Clien_Id) 
       FROM Venta.tbClientes 
       WHERE MONTH(Clien_FechaCreacion) = @MesPasado AND YEAR(Clien_FechaCreacion) = @AnioPasado)
    ) AS DiferenciaClientesMesPasado
  FROM Venta.tbClientes
  WHERE MONTH(Clien_FechaCreacion) = @MesActual AND YEAR(Clien_FechaCreacion) = @AnioActual
END
GO
/****** Object:  StoredProcedure [Venta].[sp_Factura_buscar]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [Venta].[sp_Factura_buscar]
@Venen_Id int
AS
BEGIN
SELECT 
    V.Venen_Id,
    V.Venen_FechaCreacion,
    Cli.Clien_Id,
    CASE 
        WHEN Cli.Clien_Id IS NULL THEN 'N/A'
        ELSE CONCAT(Cli.Clien_PrimerNombre, ' ', Cli.Clien_SegundoApellido) 
    END AS Nombre,
	Cli.Clien_Puntos,
    S.Sucur_Id,
    S.Sucur_Descripcion,
    TP.Tipos_Descripcion,
    D.Lotes_Id,
    D.Vende_Cantidad,
    D.Vende_Precio,
    D.Vende_Impuesto,
    D.Vende_Descuento,
    P.Produ_Id,
    P.Produ_Descripcion,
    SC.Subca_Id,
    SC.Subca_Descripcion,
    C.Categ_Id,
    C.Categ_Descripcion,
    M.Munic_Id,
    M.Munic_Descripcion,
    Dep.Depar_Id,
    Dep.Depar_Descripcion,
    Total.Subtotal AS Subtotal,
    Total.Impuesto_Total AS Impuesto_Total,
    Total.Descuento_Total AS Descuento_Total,
    Total.Total AS Total
FROM Venta.tbVentasEncabezado V
LEFT JOIN Venta.tbClientes Cli ON V.Clien_Id = Cli.Clien_Id
JOIN Venta.tbVentasDetalle D ON V.Venen_Id = D.Venen_Id
JOIN Supr.tbLotes L ON D.Lotes_Id = L.Lotes_Id
JOIN Supr.tbProductos P ON L.Produ_Id = P.Produ_Id
JOIN Gral.tbSubcategorias SC ON P.Subca_Id = SC.Subca_Id
JOIN Gral.tbCategorias C ON SC.Categ_Id = C.Categ_Id
JOIN Supr.tbSucursales S ON V.Sucur_Id = S.Sucur_Id
JOIN Gral.tbTiposdePagos TP ON V.Tipos_Id = TP.Tipos_Id
JOIN Gral.tbMunicipios M ON M.Munic_Id = S.Munic_Id
JOIN Gral.tbDepartamentos Dep ON Dep.Depar_Id = M.Depar_Id
CROSS APPLY (
SELECT 
    SUM(Detalle.Vende_Precio * Detalle.Vende_Cantidad + (Detalle.Vende_Precio * Detalle.Vende_Impuesto * Detalle.Vende_Cantidad) - Detalle.Vende_Descuento) AS Total,
    SUM(Detalle.Vende_Precio * Detalle.Vende_Impuesto * Detalle.Vende_Cantidad) AS Impuesto_Total,
    SUM(Detalle.Vende_Descuento) AS Descuento_Total,
    SUM(Detalle.Vende_Precio * Detalle.Vende_Cantidad) AS Subtotal
FROM Venta.tbVentasDetalle Detalle
WHERE Detalle.Venen_Id = V.Venen_Id
) AS Total
WHERE V.Venen_Id = @Venen_Id;

END;
GO
/****** Object:  StoredProcedure [Venta].[sp_FacturaDetalle_crear]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Venta].[sp_FacturaDetalle_crear]
    @Venen_Id INT,
    @Lotes_Id INT,
    @Vende_Cantidad INT,
    @Vende_FechaCreacion DATETIME
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        DECLARE @Produ_Id INT;
        DECLARE @Produ_PrecioVenta DECIMAL(10, 2);
        DECLARE @Produ_Impuesto DECIMAL(5, 2);
        DECLARE @Promo_Disminucion DECIMAL(10, 2);
        DECLARE @Precio_Final DECIMAL(10, 2);
        DECLARE @Promo_PuntosRequeridos INT;
        DECLARE @Clien_Id INT;
        DECLARE @Clien_Puntos INT;
        DECLARE @Cantidad_Con_Descuento INT;
        DECLARE @Cantidad_Sin_Descuento INT;
        DECLARE @TotalGastado DECIMAL(10, 2);
        DECLARE @PuntosAAgregar INT;

        SET @Produ_Id = (
            SELECT TOP 1 lote.Produ_Id 
            FROM Supr.tbLotes lote
            LEFT JOIN Supr.tbProductos prod ON lote.Produ_Id = prod.Produ_Id
            WHERE lote.Lotes_Id = @Lotes_Id
        );

        SET @Clien_Id = (
            SELECT Venen.Clien_Id
            FROM Venta.tbVentasEncabezado Venen
            WHERE Venen.Venen_Id = @Venen_Id
        );

        SELECT @Produ_PrecioVenta = Produ_PrecioVenta, @Produ_Impuesto = Impue_Descripcion
        FROM Supr.tbProductos prod
        LEFT JOIN Gral.tbImpuestos imp ON prod.Impue_Id = imp.Impue_Id
        WHERE prod.Produ_Id = @Produ_Id;

        SELECT @Clien_Puntos = Clien_Puntos
        FROM Venta.tbClientes
        WHERE Clien_Id = @Clien_Id;

        SELECT @Promo_Disminucion = ISNULL(Promo_Disminucion, 0), @Promo_PuntosRequeridos = Promo_PuntosRequeridos
        FROM Supr.tbPromociones promo
        WHERE promo.Produ_Id = @Produ_Id AND promo.Promo_Estado = 1;

        IF @Promo_PuntosRequeridos > 0 AND @Clien_Puntos >= @Promo_PuntosRequeridos
        BEGIN
            SET @Cantidad_Con_Descuento = @Clien_Puntos / @Promo_PuntosRequeridos;
            IF @Cantidad_Con_Descuento > @Vende_Cantidad
                SET @Cantidad_Con_Descuento = @Vende_Cantidad;
            SET @Cantidad_Sin_Descuento = @Vende_Cantidad - @Cantidad_Con_Descuento;
        END
        ELSE
        BEGIN
            SET @Cantidad_Con_Descuento = 0;
            SET @Cantidad_Sin_Descuento = @Vende_Cantidad;
        END

        IF @Cantidad_Con_Descuento > 0
        BEGIN
            INSERT INTO Venta.tbVentasDetalle (
                Venen_Id, Lotes_Id, Vende_Cantidad, Vende_Precio, Vende_Impuesto, Vende_Descuento, Vende_UsuarioCreacion, Vende_FechaCreacion, Vende_Estado
            )
            VALUES (
                @Venen_Id, @Lotes_Id, @Cantidad_Con_Descuento, @Produ_PrecioVenta, @Produ_Impuesto, @Promo_Disminucion, 1, @Vende_FechaCreacion, 1
            );

            UPDATE Venta.tbClientes
            SET Clien_Puntos = (Clien_Puntos - (@Cantidad_Con_Descuento * @Promo_PuntosRequeridos)),
                Clien_UsuarioModificacion = 1,
                Clien_FechaModificacion = @Vende_FechaCreacion
            WHERE Clien_Id = @Clien_Id;
        END

        IF @Cantidad_Sin_Descuento > 0
        BEGIN
            INSERT INTO Venta.tbVentasDetalle (
                Venen_Id, Lotes_Id, Vende_Cantidad, Vende_Precio, Vende_Impuesto, Vende_Descuento, Vende_UsuarioCreacion, Vende_FechaCreacion, Vende_Estado
            )
            VALUES (
                @Venen_Id, @Lotes_Id, @Cantidad_Sin_Descuento, @Produ_PrecioVenta, @Produ_Impuesto, 0, 1, @Vende_FechaCreacion, 1
            );
        END

        UPDATE Supr.tbLotes
        SET Lotes_Cantidad = (Lotes_Cantidad - @Vende_Cantidad),
            Lotes_usuarioModificacion = 1,
            Lotes_FechaModificacion = @Vende_FechaCreacion
        WHERE Lotes_Id = @Lotes_Id;

        UPDATE Supr.tbProductos
        SET Produ_Existencia = (Produ_Existencia - @Vende_Cantidad),
            Produ_usuarioModificacion = 1,
            Produ_FechaModificacion = @Vende_FechaCreacion
        WHERE Produ_Id = @Produ_Id;

		--sumar puntos
		SET @TotalGastado = @Produ_PrecioVenta * @Vende_Cantidad;

        SET @PuntosAAgregar = FLOOR(@TotalGastado / 100) * 5;

        UPDATE Venta.tbClientes
        SET Clien_Puntos = (ISNULL(@Clien_Puntos, 0) + @PuntosAAgregar),
            Clien_UsuarioModificacion = 1,
            Clien_FechaModificacion = @Vende_FechaCreacion
        WHERE Clien_Id = @Clien_Id;

        COMMIT;
        SELECT 1 AS Resultado;
    END TRY
    BEGIN CATCH
        ROLLBACK;
        SELECT -1 AS Resultado;
    END CATCH
END;

GO
/****** Object:  StoredProcedure [Venta].[sp_FacturaEncabezado_crear]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [Venta].[sp_FacturaEncabezado_crear]
@Sucur_Id int,
@Tipos_Id int,
@Venen_FechaCreacion datetime,
@Clien_Id int,
@ID int output
AS
BEGIN
 BEGIN TRY
        BEGIN TRANSACTION;
insert into Venta.tbVentasEncabezado (Sucur_Id, Tipos_Id, Venen_Estado, Venen_UsuarioCreacion, Venen_FechaCreacion, Clien_Id)
values (@Sucur_Id, @Tipos_Id, 1, 1, @Venen_FechaCreacion, @Clien_Id)
   COMMIT;
SET @ID = SCOPE_IDENTITY();
SELECT @ID AS Resultado;

    END TRY
    BEGIN CATCH
        ROLLBACK;
        SELECT -1 AS Resultado;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [Venta].[sp_Lotes_list]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [Venta].[sp_Lotes_list]
AS
BEGIN
SELECT
sucur.Sucur_Id,
sucur.Sucur_Descripcion,
lote.Lotes_Id,
lote.Lotes_Cantidad,
lote.Produ_Id,
prod.Produ_Descripcion,
prod.Produ_PrecioVenta,
prod.Produ_Existencia,
prod.Impue_Id,
impu.Impue_Descripcion,
prod.Subca_Id,
Subca_Descripcion,
sub.Categ_Id,
Categ_Descripcion,
prod.img
FROM Supr.tbSucursales sucur 
LEFT JOIN Supr.tbLotes lote ON sucur.Sucur_Id = lote.Sucur_Id
LEFT JOIN Supr.tbProductos prod ON prod.Produ_Id = lote.Produ_Id
LEFT JOIN (
    SELECT * FROM Supr.tbPromociones WHERE Promo_Estado = 1
) prom ON prom.Produ_Id = prod.Produ_Id
LEFT JOIN Gral.tbImpuestos impu ON impu.Impue_Id = prod.Impue_Id
LEFT JOIN Gral.tbSubcategorias sub ON sub.Subca_Id = prod.Subca_Id
LEFT JOIN Gral.tbCategorias cat ON cat.Categ_Id = sub.Categ_Id
WHERE 
    sucur.Sucur_Estado = 1 AND 
    lote.Lotes_Estado = 1 AND 
    prod.Produ_Estado = 1 AND 
    impu.Impue_Estado = 1 AND 
    sub.Subca_Estado = 1 AND 
    cat.Categ_Estado = 1 
END;
GO
/****** Object:  StoredProcedure [Venta].[SP_Productos_Top]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Venta].[SP_Productos_Top] 
    @Sucur_Id INT
AS
BEGIN
    DECLARE @MesActual INT = MONTH(GETDATE());
    DECLARE @AnioActual INT = YEAR(GETDATE());
    DECLARE @MesAnterior INT = @MesActual - 1;
    DECLARE @AnioAnterior INT = @AnioActual;

    IF @MesActual = 1
        SET @MesAnterior = 12;
    ELSE
        SET @MesAnterior = @MesActual - 1;

    SELECT TOP 5
        p.Produ_Descripcion as Producto,
        categ_descripcion as Categoriaa,
        SUM(CASE WHEN MONTH(v.Vende_FechaCreacion) = @MesActual AND YEAR(v.Vende_FechaCreacion) = @AnioActual THEN v.Vende_Cantidad ELSE 0 END) AS TotalVendidoActual,
        SUM(CASE WHEN MONTH(v.Vende_FechaCreacion) = @MesAnterior AND YEAR(v.Vende_FechaCreacion) = @AnioAnterior THEN v.Vende_Cantidad ELSE 0 END) AS TotalVendidoAnterior,
        CAST((SUM(CASE WHEN MONTH(v.Vende_FechaCreacion) = @MesActual AND YEAR(v.Vende_FechaCreacion) = @AnioActual THEN v.Vende_Cantidad ELSE 0 END) - SUM(CASE WHEN MONTH(v.Vende_FechaCreacion) = @MesAnterior AND YEAR(v.Vende_FechaCreacion) = @AnioAnterior THEN v.Vende_Cantidad ELSE 0 END)) * 100.0 / NULLIF(SUM(CASE WHEN MONTH(v.Vende_FechaCreacion) = @MesAnterior AND YEAR(v.Vende_FechaCreacion) = @AnioAnterior THEN v.Vende_Cantidad ELSE 0 END), 0) AS INT) AS PorcentajeCambio

    FROM [dbSupermercadoLaColonia].[Supr].[tbProductos] AS p
    LEFT JOIN Supr.tbLotes as l on p.Produ_Id = l.Produ_Id
    LEFT JOIN [dbSupermercadoLaColonia].[Venta].[tbVentasDetalle] AS v ON l.Lotes_Id = v.Lotes_Id
    LEFT JOIN Supr.tbSucursales as s on s.Sucur_Id = l.Sucur_Id
    LEFT JOIN Gral.tbSubcategorias as sc on sc.Subca_Id = p.Subca_Id
    LEFT JOIN gral.tbCategorias as c on c.Categ_Id = sc.Categ_Id
    WHERE s.Sucur_Id = @Sucur_Id
    GROUP BY p.Produ_Descripcion, categ_descripcion
    ORDER BY TotalVendidoActual DESC;
END
GO
/****** Object:  StoredProcedure [Venta].[SP_Subcategoria_Total]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Venta].[SP_Subcategoria_Total] 
    @Sucur_Id INT = NULL,
    @FiltroSucursal BIT = 0,
    @FechaInicio DATE,
    @FechaFin DATE
AS
BEGIN
SET @Sucur_Id = ISNULL(@Sucur_Id, 0)

    SELECT TOP 5
        s.Subca_Descripcion AS Subcategoria,
        SUM(v.Vende_Cantidad) AS TotalVentas
    FROM
        Venta.tbVentasDetalle v
        INNER JOIN Supr.tbLotes l ON v.Lotes_Id = l.Lotes_Id
        INNER JOIN Supr.tbProductos p ON l.Produ_Id = p.Produ_Id
        INNER JOIN Gral.tbSubcategorias s ON p.Subca_Id = s.Subca_Id
        INNER JOIN Supr.tbSucursales su ON su.Sucur_Id = l.Sucur_Id
        INNER JOIN Venta.tbVentasEncabezado ve ON v.Venen_Id = ve.Venen_Id
    WHERE 
        (@FiltroSucursal = 0 OR su.Sucur_Id = @Sucur_Id)
        AND ve.Venen_FechaCreacion >= @FechaInicio
        AND ve.Venen_FechaCreacion <= @FechaFin
    GROUP BY 
        s.Subca_Descripcion
    ORDER BY 
        TotalVentas DESC;
END;
GO
/****** Object:  StoredProcedure [Venta].[SP_Ventas_Genero]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Venta].[SP_Ventas_Genero] 
@Sucur_Id INT,
@FechaInicio DATE,
    @FechaFin DATE
AS
BEGIN

    SELECT
        C.Clien_Sexo AS Genero,
        COUNT(VE.Venen_Id) AS CantidadVentas
    FROM
        [dbSupermercadoLaColonia].[Venta].[tbVentasEncabezado] VE
    INNER JOIN
        [dbSupermercadoLaColonia].[Acce].[tbUsuarios] U ON VE.Usuar_Id = U.Usuar_Id
    INNER JOIN
        [dbSupermercadoLaColonia].[Venta].[tbClientes] C ON U.Perso_Id = C.Clien_Id
		left join Supr.tbSucursales s on s.Sucur_Id = ve.Sucur_Id
    WHERE
        U.Perso_Tipo = 1
       AND ve.Venen_FechaCreacion >= @FechaInicio
        AND ve.Venen_FechaCreacion <= @FechaFin
		AND VE.Sucur_Id = @Sucur_Id
    GROUP BY
        C.Clien_Sexo;
END;
GO
/****** Object:  StoredProcedure [Venta].[SP_Ventas_Principal]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Venta].[SP_Ventas_Principal] 
    @Sucur_Id INT
AS
BEGIN
    SELECT 
        CONVERT(DATE, DATEADD(WEEK, DATEDIFF(WEEK, 0, v.Venen_FechaCreacion), 0)) AS Semana,
        COUNT(v.Venen_Id) AS TotalVentas
    FROM 
        [dbSupermercadoLaColonia].[Venta].[tbVentasEncabezado] AS v
    JOIN 
        [dbSupermercadoLaColonia].[Supr].[tbSucursales] AS s ON v.Sucur_Id = s.Sucur_Id
    WHERE 
        s.Sucur_Id = @Sucur_Id
        AND v.Venen_FechaCreacion BETWEEN DATEADD(MONTH, -1, GETDATE()) AND GETDATE()
        AND MONTH(v.Venen_FechaCreacion) = MONTH(GETDATE())
    GROUP BY 
        DATEADD(WEEK, DATEDIFF(WEEK, 0, v.Venen_FechaCreacion), 0)
    ORDER BY 
        Semana ASC;
END
GO
/****** Object:  StoredProcedure [Venta].[SP_Ventas_Total]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Venta].[SP_Ventas_Total]
AS BEGIN
  DECLARE @MesActual INT = MONTH(GETDATE())
  DECLARE @AnioActual INT = YEAR(GETDATE())
  DECLARE @MesPasado INT = @MesActual - 1
  DECLARE @AnioPasado INT = @AnioActual

  IF @MesPasado = 0
    SET @MesPasado = 12
    SET @AnioPasado = @AnioActual - 1

  SELECT 
    COUNT(Venen_Id) AS TotalVentasMesActual,
    (COUNT(Venen_Id) - 
      (SELECT COUNT(Venen_Id) 
       FROM Venta.tbVentasEncabezado 
       WHERE MONTH(Venen_FechaCreacion) = @MesPasado AND YEAR(Venen_FechaCreacion) = @AnioPasado)
    ) AS DiferenciaVentasMesPasado
  FROM Venta.tbVentasEncabezado
  WHERE MONTH(Venen_FechaCreacion) = @MesActual AND YEAR(Venen_FechaCreacion) = @AnioActual
END
GO
/****** Object:  StoredProcedure [Venta].[SP_Ventas_Totall]    Script Date: 24/05/2024 14:46:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Venta].[SP_Ventas_Totall] 
@Sucur_Id INT = NULL,
 @FiltroSucursal BIT = 0,
    @FechaInicio DATE,
    @FechaFin DATE
AS
BEGIN
    SELECT 
        CONVERT(DATE, DATEADD(WEEK, DATEDIFF(WEEK, 0, v.Venen_FechaCreacion), 0)) AS Semana,
        COUNT(v.Venen_Id) AS TotalVentas
    FROM 
        [dbSupermercadoLaColonia].[Venta].[tbVentasEncabezado] AS v
    JOIN 
        [dbSupermercadoLaColonia].[Supr].[tbSucursales] AS s ON v.Sucur_Id = s.Sucur_Id
    WHERE 
            (@FiltroSucursal = 0 OR s.Sucur_Id = @Sucur_Id)
        AND v.Venen_FechaCreacion >= @FechaInicio
        AND v.Venen_FechaCreacion <= @FechaFin
    GROUP BY 
        DATEADD(WEEK, DATEDIFF(WEEK, 0, v.Venen_FechaCreacion), 0)
    ORDER BY 
        Semana ASC;
END
GO
