USE dbSupermercadoLaColonia
GO
CREATE SCHEMA Acce
GO
CREATE TABLE Acce.tbUsuarios(
	Usuar_Id INT IDENTITY(1,1),
	Usuar_Correo NVARCHAR(100) NULL,
	Usuar_Usuario NVARCHAR(50) NOT NULL,
	Usuar_Contrasena NVARCHAR(MAX) NOT NULL,
	Perso_Id INT NOT NULL,
	Perso_Tipo BIT NOT NULL, --0 for Empleado, 1 for Cliente
	Roles_Id INT NOT NULL,
	Usuar_Admin BIT NOT NULL,
	Usuar_UltimaSesion DATETIME NULL,
	Usuar_SuperPuntos INT NOT NULL,
	CONSTRAINT PK_tbUsuarios_Usuar_Id PRIMARY KEY(Usuar_Id),
	CONSTRAINT UQ_tbUsuarios_Usuar_Usuario UNIQUE(Usuar_Usuario),
	CONSTRAINT UQ_tbUsuarios_Usuar_Correo UNIQUE(Usuar_Correo),
	--CONSTRAINT FK_tbUsuarios_tbEmpleados_Emple_Id FOREIGN KEY (Emple_Id) REFERENCES Supr.tbEmpleados(Emple_Id),
	--CONSTRAINT FK_tbUsuarios_tbRoles_Roles_Id FOREIGN KEY (Roles_Id) REFERENCES Acce.tbRoles(Roles_Id),

	[Usuar_UsuarioCreacion] [int] NOT NULL,
	[Usuar_FechaCreacion] [datetime]  NOT NULL,
	[Usuar_UsuarioModificacion] [int] NULL,
	[Usuar_FechaModificacion] [datetime] NULL,
	[Usuar_Estado] [bit] CONSTRAINT DF_tbUsuarios_Usuar_Estado DEFAULT 1,
	--CONSTRAINT FK_tbUsuarios_tbUsuarios_Usuar_UsuarioCreacion FOREIGN KEY(Usuar_UsuarioCreacion) REFERENCES Acce.tbUsuarios(Usuar_Id),
	--CONSTRAINT FK_tbUsuarios_tbUsuarios_Usuar_UsuarioModificacion FOREIGN KEY(Usuar_UsuarioModificacion) REFERENCES Acce.tbUsuarios(Usuar_Id),
)
GO
CREATE TABLE Acce.tbPantallas(
	Panta_Id INT IDENTITY(1,1) NOT NULL,
	Panta_Descripcion NVARCHAR(30) NOT NULL,
	CONSTRAINT PK_tbPantallas_Panta_Id PRIMARY KEY(Panta_Id),
	CONSTRAINT UQ_tbPantallas_Panta_Descripcion UNIQUE(Panta_Descripcion),

	[Panta_UsuarioCreacion] [int] NOT NULL,
	[Panta_FechaCreacion] [datetime] NOT NULL,
	[Panta_UsuarioModificacion] [int] NULL,
	[Panta_FechaModificacion] [datetime] NULL,
	[Panta_Estado] [bit] CONSTRAINT DF_tbPantallas_Panta_Estado DEFAULT 1,
	CONSTRAINT FK_tbPantallas_tbUsuarios_Panta_UsuarioCreacion FOREIGN KEY(Panta_UsuarioCreacion) REFERENCES Acce.tbUsuarios(Usuar_Id),
	CONSTRAINT FK_tbPantallas_tbUsuarios_Panta_UsuarioModificacion FOREIGN KEY(Panta_UsuarioModificacion) REFERENCES Acce.tbUsuarios(Usuar_Id),
)
GO
CREATE TABLE Acce.tbRoles(
	Roles_Id INT IDENTITY(1,1) NOT NULL,
	Roles_Descripcion NVARCHAR(30) NOT NULL,
	CONSTRAINT PK_tbRoles_Roles_Id PRIMARY KEY(Roles_Id),
	CONSTRAINT UQ_tbRoles_Roles_Descripcion UNIQUE(Roles_Descripcion),

	[Roles_UsuarioCreacion] [int] NOT NULL,
	[Roles_FechaCreacion] [datetime] NOT NULL,
	[Roles_UsuarioModificacion] [int] NULL,
	[Roles_FechaModificacion] [datetime] NULL,
	[Roles_Estado] [bit] CONSTRAINT DF_tbRoles_Roles_Estado DEFAULT 1,
	CONSTRAINT FK_tbRoles_tbUsuarios_Roles_UsuarioCreacion FOREIGN KEY(Roles_UsuarioCreacion) REFERENCES Acce.tbUsuarios(Usuar_Id),
	CONSTRAINT FK_tbRoles_tbUsuarios_Roles_UsuarioModificacion FOREIGN KEY(Roles_UsuarioModificacion) REFERENCES Acce.tbUsuarios(Usuar_Id),
)
GO
CREATE TABLE Acce.tbPantallasPorRoles(
	Papro_Id INT IDENTITY(1,1) NOT NULL,
	Panta_Id INT NOT NULL,
	Roles_Id INT NOT NULL,
	CONSTRAINT PK_tbPantallasPorRoles_Papro_Id PRIMARY KEY(Papro_Id),
	CONSTRAINT FK_tbPantallasPorRoles_tbPantallas_Panta_Id FOREIGN KEY(Panta_Id) REFERENCES Acce.tbPantallas(Panta_Id),
	CONSTRAINT FK_tbPantallasPorRoles_tbRoles_Roles_Id FOREIGN KEY(Roles_Id) REFERENCES Acce.tbRoles(Roles_Id),
	CONSTRAINT UQ_tbPantallasPorRoles_Panta_Id_Roles_Id UNIQUE(Panta_Id,Roles_Id),

	[Papro_UsuarioCreacion] [int] NOT NULL,
	[Papro_FechaCreacion] [datetime] NOT NULL,
	[Papro_UsuarioModificacion] [int] NULL,
	[Papro_FechaModificacion] [datetime] NULL,
	[Papro_Estado] [bit] CONSTRAINT DF_tbPantallasPorRoles_Papro_Estado DEFAULT 1,
	CONSTRAINT FK_tbPantallasPorRoles_tbUsuarios_Papro_UsuarioCreacion FOREIGN KEY(Papro_UsuarioCreacion) REFERENCES Acce.tbUsuarios(Usuar_Id),
	CONSTRAINT FK_tbPantallasPorRoles_tbUsuarios_Papro_UsuarioModificacion FOREIGN KEY(Papro_UsuarioModificacion) REFERENCES Acce.tbUsuarios(Usuar_Id),
)
GO
---------------------------------------------------------------------------------------------------------------------------------------------------------
GO
CREATE SCHEMA Gral
GO
CREATE TABLE Gral.tbDepartamentos(
	[Depar_Id] [char](2) NOT NULL,
	[Depar_Descripcion] NVARCHAR(50) NOT NULL,
	CONSTRAINT PK_tbDepartamentos_Depar_Id PRIMARY KEY(Depar_Id),
	CONSTRAINT UQ_tbDepartamentos_Depar_Descripcion UNIQUE(Depar_Descripcion),
	
	[Depar_UsuarioCreacion] [int] NOT NULL,
	[Depar_FechaCreacion] [datetime] NOT NULL,
	[Depar_UsuarioModificacion] [int] NULL,
	[Depar_FechaModificacion] [datetime] NULL,
	[Depar_Estado] [bit] CONSTRAINT DF_tbDepartamentos_Depar_Estado DEFAULT 1,
	CONSTRAINT FK_tbDepartamentos_tbUsuarios_Depar_UsuarioCreacion FOREIGN KEY(Depar_UsuarioCreacion) REFERENCES Acce.tbUsuarios(Usuar_Id),
	CONSTRAINT FK_tbDepartamentos_tbUsuarios_Depar_UsuarioModificacion FOREIGN KEY(Depar_UsuarioModificacion) REFERENCES Acce.tbUsuarios(Usuar_Id),
)
GO
CREATE TABLE Gral.tbMunicipios(
	[Munic_Id] [char](4) NOT NULL,
	[Munic_Descripcion] NVARCHAR(50) NOT NULL,
	[Depar_Id] [char](2) NOT NULL,
	CONSTRAINT PK_tbMunicipios_Munic_Id PRIMARY KEY(Munic_Id),
	CONSTRAINT FK_tbMunicipios_tbDepartamentos_Depar_Id FOREIGN KEY(Depar_Id) REFERENCES Gral.tbDepartamentos(Depar_Id),

	[Munic_UsuarioCreacion] [int] NOT NULL,
	[Munic_FechaCreacion] [datetime] NOT NULL,
	[Munic_UsuarioModificacion] [int] NULL,
	[Munic_FechaModificacion] [datetime] NULL,
	[Munic_Estado] [bit] CONSTRAINT DF_tbMunicipios_Munic_Estado DEFAULT 1,
	CONSTRAINT FK_tbMunicipios_tbUsuarios_Munic_UsuarioCreacion FOREIGN KEY(Munic_UsuarioCreacion) REFERENCES Acce.tbUsuarios(Usuar_Id),
	CONSTRAINT FK_tbMunicipios_tbUsuarios_Munic_UsuarioModificacion FOREIGN KEY(Munic_UsuarioModificacion) REFERENCES Acce.tbUsuarios(Usuar_Id),
)
GO
CREATE TABLE Gral.tbEstadosCiviles(
	[Estad_Id] [int] IDENTITY(1,1),
	[Estad_Descripcion] NVARCHAR(30) NOT NULL,
	CONSTRAINT PK_tbEstadosCiviles_Estad_Id PRIMARY KEY(Estad_Id),
	CONSTRAINT UQ_tbEstadosCiviles_Estad_Descripcion UNIQUE(Estad_Descripcion),

	[Estad_UsuarioCreacion] [int] NOT NULL,
	[Estad_FechaCreacion] [datetime] NOT NULL,
	[Estad_UsuarioModificacion] [int] NULL,
	[Estad_FechaModificacion] [datetime] NULL,
	[Estad_Estado] [bit] CONSTRAINT DF_tbEstadosCiviles_Estad_Estado DEFAULT 1,
	CONSTRAINT FK_tbEstadosCiviles_tbUsuarios_Estad_UsuarioCreacion FOREIGN KEY(Estad_UsuarioCreacion) REFERENCES Acce.tbUsuarios(Usuar_Id),
	CONSTRAINT FK_tbEstadosCiviles_tbUsuarios_Estad_UsuarioModificacion FOREIGN KEY(Estad_UsuarioModificacion) REFERENCES Acce.tbUsuarios(Usuar_Id),
)
GO
CREATE TABLE Gral.tbCategorias(
	Categ_Id INT IDENTITY(1,1),
	Categ_Descripcion NVARCHAR(50) NOT NULL,
	CONSTRAINT PK_tbCategorias_Categ_Id PRIMARY KEY(Categ_Id),
	CONSTRAINT UQ_tbCategorias_Categ_Descripcion UNIQUE(Categ_Descripcion),

	[Categ_UsuarioCreacion] [int] NOT NULL,
	[Categ_FechaCreacion] [datetime] NOT NULL,
	[Categ_UsuarioModificacion] [int] NULL,
	[Categ_FechaModificacion] [datetime] NULL,
	[Categ_Estado] [bit] CONSTRAINT DF_tbCategorias_Categ_Estado DEFAULT 1,
	CONSTRAINT FK_tbCategorias_tbUsuarios_Categ_UsuarioCreacion FOREIGN KEY(Categ_UsuarioCreacion) REFERENCES Acce.tbUsuarios(Usuar_Id),
	CONSTRAINT FK_tbCategorias_tbUsuarios_Categ_UsuarioModificacion FOREIGN KEY(Categ_UsuarioModificacion) REFERENCES Acce.tbUsuarios(Usuar_Id),
)
GO
CREATE TABLE Gral.tbSubcategorias(
	Subca_Id INT IDENTITY(1,1),
	Subca_Descripcion NVARCHAR(50) NOT NULL,
	Categ_Id INT NOT NULL,
	CONSTRAINT PK_tbSubcategorias_Subca_Id PRIMARY KEY(Subca_Id),
	CONSTRAINT UQ_tbSubcategorias_Subca_Descripcion UNIQUE(Subca_Descripcion),
	CONSTRAINT FK_tbSubcategorias_tbCategorias_Categ_Id FOREIGN KEY(Categ_Id) REFERENCES Gral.tbCategorias(Categ_Id),

	[Subca_UsuarioCreacion] [int] NOT NULL,
	[Subca_FechaCreacion] [datetime] NOT NULL,
	[Subca_UsuarioModificacion] [int] NULL,
	[Subca_FechaModificacion] [datetime] NULL,
	[Subca_Estado] [bit] CONSTRAINT DF_tbSubcategorias_Subca_Estado DEFAULT 1,
	CONSTRAINT FK_tbSubcategorias_tbUsuarios_Subca_UsuarioCreacion FOREIGN KEY(Subca_UsuarioCreacion) REFERENCES Acce.tbUsuarios(Usuar_Id),
	CONSTRAINT FK_tbSubcategorias_tbUsuarios_Subca_UsuarioModificacion FOREIGN KEY(Subca_UsuarioModificacion) REFERENCES Acce.tbUsuarios(Usuar_Id),
)
GO
CREATE TABLE Gral.tbImpuestos(
	Impue_Id INT IDENTITY(1,1),
	Impue_Descripcion NUMERIC(4,2) NOT NULL,
	CONSTRAINT PK_tbImpuestos_Impue_Id PRIMARY KEY(Impue_Id),
	CONSTRAINT UQ_tbImpuestos_Impue_Descripcion UNIQUE(Impue_Descripcion),

	[Impue_UsuarioCreacion] [int] NOT NULL,
	[Impue_FechaCreacion] [datetime] NOT NULL,
	[Impue_UsuarioModificacion] [int] NULL,
	[Impue_FechaModificacion] [datetime] NULL,
	[Impue_Estado] [bit] CONSTRAINT DF_tbImpuestos_Impue_Estado DEFAULT 1,
	CONSTRAINT FK_tbImpuestos_tbUsuarios_Impue_UsuarioCreacion FOREIGN KEY(Impue_UsuarioCreacion) REFERENCES Acce.tbUsuarios(Usuar_Id),
	CONSTRAINT FK_tbImpuestos_tbUsuarios_Impue_UsuarioModificacion FOREIGN KEY(Impue_UsuarioModificacion) REFERENCES Acce.tbUsuarios(Usuar_Id),
)
GO
CREATE TABLE Gral.tbCargos(
	Cargo_Id INT IDENTITY(1,1),
	Cargo_Descripcion NVARCHAR(50) NOT NULL,
	CONSTRAINT PK_tbCargos_Cargo_Id PRIMARY KEY(Cargo_Id),
	CONSTRAINT UQ_tbCargos_Cargo_Descripcion UNIQUE(Cargo_Descripcion),
	
	[Cargo_UsuarioCreacion] [int] NOT NULL,
	[Cargo_FechaCreacion] [datetime] NOT NULL,
	[Cargo_UsuarioModificacion] [int] NULL,
	[Cargo_FechaModificacion] [datetime] NULL,
	[Cargo_Estado] [bit] CONSTRAINT DF_tbCargos_Cargo_Estado DEFAULT 1,
	CONSTRAINT FK_tbCargos_tbUsuarios_Cargo_UsuarioCreacion FOREIGN KEY(Cargo_UsuarioCreacion) REFERENCES Acce.tbUsuarios(Usuar_Id),
	CONSTRAINT FK_tbCargos_tbUsuarios_Cargo_UsuarioModificacion FOREIGN KEY(Cargo_UsuarioModificacion) REFERENCES Acce.tbUsuarios(Usuar_Id),
)
GO
---------------------------------------------------------------------------------------------------------------------------------------------------------
GO
CREATE SCHEMA Supr
GO
CREATE TABLE Supr.tbSucursales(
	Sucur_Id INT IDENTITY(1,1),
	Sucur_Descripcion NVARCHAR(50) NOT NULL,	
	Munic_Id CHAR(4) NOT NULL,
	Sucur_Direccion NVARCHAR(MAX) NOT NULL,
	Sucur_Telefono NVARCHAR(20) NOT NULL,
	CONSTRAINT PK_tbSucursales_Sucur_Id PRIMARY KEY(Sucur_Id),
	CONSTRAINT UQ_tbSucurales_Sucur_Descripcion UNIQUE(Sucur_Descripcion),
	CONSTRAINT FK_tbSucursales_tbMunicipios_Munic_Id FOREIGN KEY(Munic_Id) REFERENCES Gral.tbMunicipios(Munic_Id),

	[Sucur_UsuarioCreacion] [int] NOT NULL,
	[Sucur_FechaCreacion] [datetime] NOT NULL,
	[Sucur_UsuarioModificacion] [int] NULL,
	[Sucur_FechaModificacion] [datetime] NULL,
	[Sucur_Estado] [bit] CONSTRAINT DF_tbSucursales_Sucur_Estado DEFAULT 1,
	CONSTRAINT FK_tbSucursales_tbUsuarios_Sucur_UsuarioCreacion FOREIGN KEY(Sucur_UsuarioCreacion) REFERENCES Acce.tbUsuarios(Usuar_Id),
	CONSTRAINT FK_tbSucursales_tbUsuarios_Sucur_UsuarioModificacion FOREIGN KEY(Sucur_UsuarioModificacion) REFERENCES Acce.tbUsuarios(Usuar_Id),
)
GO
CREATE TABLE Supr.tbProveedores(
	Prove_Id INT IDENTITY(1,1),
	Prove_Marca NVARCHAR(50) NOT NULL,
	Prove_ContactoPrimerNombre NVARCHAR(50) NOT NULL,
	Prove_ContactoSegundoNombre NVARCHAR(50),	
	Prove_ContactoPrimerApellido NVARCHAR(50) NOT NULL,
	Prove_ContactoSegundoApellido NVARCHAR(50),	
	Munic_Id CHAR(4) NOT NULL,
	Prove_Direccion NVARCHAR(MAX) NOT NULL,
	Prove_Telefono NVARCHAR(20) NOT NULL,
	Prove_Correo NVARCHAR(MAX),
	Prove_Notas NVARCHAR(MAX),
	CONSTRAINT PK_tbProveedores_Prove_Id PRIMARY KEY(Prove_Id),
	CONSTRAINT UQ_tbProveedores_Marca_Id UNIQUE(Prove_Marca),
	CONSTRAINT FK_tbProveedores_tbMunicipios_Munic_Id FOREIGN KEY(Munic_Id) REFERENCES Gral.tbMunicipios(Munic_Id),

	[Prove_UsuarioCreacion] [int] NOT NULL,
	[Prove_FechaCreacion] [datetime] NOT NULL,
	[Prove_UsuarioModificacion] [int] NULL,
	[Prove_FechaModificacion] [datetime] NULL,
	[Prove_Estado] [bit] CONSTRAINT DF_tbProveedores_Prove_Estado DEFAULT 1,
	CONSTRAINT FK_tbProveedores_tbUsuarios_Prove_UsuarioCreacion FOREIGN KEY(Prove_UsuarioCreacion) REFERENCES Acce.tbUsuarios(Usuar_Id),
	CONSTRAINT FK_tbProveedores_tbUsuarios_Prove_UsuarioModificacion FOREIGN KEY(Prove_UsuarioModificacion) REFERENCES Acce.tbUsuarios(Usuar_Id),
)
GO
CREATE TABLE Supr.tbProductos(
	Produ_Id INT IDENTITY(1,1),
	Produ_Descripcion NVARCHAR(50) NOT NULL,
	Produ_Existencia INT NOT NULL,
	Produ_PrecioCompra NUMERIC(8,2) NOT NULL,
	Produ_PrecioVenta NUMERIC(8,2) NOT NULL,
	Impue_Id INT NOT NULL,
	Subca_Id INT NOT NULL,
	Prove_Id INT NOT NULL,
	CONSTRAINT PK_tbProductos_Produ_Id PRIMARY KEY(Produ_Id),
	CONSTRAINT UQ_tbProductos_Produ_Descripcion UNIQUE(Produ_Descripcion),
	CONSTRAINT FK_tbProductos_tbSubcategorias_Subca_Id FOREIGN KEY(Subca_Id) REFERENCES Gral.tbSubcategorias(Subca_Id),
	CONSTRAINT FK_tbProdcutos_tbProveedores_Prove_Id FOREIGN KEY(Prove_Id) REFERENCES Supr.tbProveedores(Prove_Id),
	CONSTRAINT FK_tbProductos_tbImpuestos_Impue_Id FOREIGN KEY(Impue_Id) REFERENCES Gral.tbImpuestos(Impue_Id),

	[Produ_UsuarioCreacion] [int] NOT NULL,
	[Produ_FechaCreacion] [datetime] NOT NULL,
	[Produ_UsuarioModificacion] [int] NULL,
	[Produ_FechaModificacion] [datetime] NULL,
	[Produ_Estado] [bit] CONSTRAINT DF_tbProductos_Produ_Estado DEFAULT 1,
	CONSTRAINT FK_tbProductos_tbUsuarios_Produ_UsuarioCreacion FOREIGN KEY(Produ_UsuarioCreacion) REFERENCES Acce.tbUsuarios(Usuar_Id),
	CONSTRAINT FK_tbProductos_tbUsuarios_Produ_UsuarioModificacion FOREIGN KEY(Produ_UsuarioModificacion) REFERENCES Acce.tbUsuarios(Usuar_Id),
)
GO
CREATE TABLE Supr.tbLotes(
	Lotes_Id INT IDENTITY(1,1),
	Lotes_FechaVencimiento DATETIME NOT NULL,
	Produ_Id INT NOT NULL,
	Lotes_Cantidad INT NOT NULL,
	Sucur_Id INT NOT NULL,
	CONSTRAINT PK_tbLotes_Lotes_Id PRIMARY KEY(Lotes_Id),
	CONSTRAINT FK_tbLotes_tbProductos_Produ_Id FOREIGN KEY(Produ_Id) REFERENCES Supr.tbProductos(Produ_Id),
	CONSTRAINT FK_tbLotes_tbSucursales_Sucur_Id FOREIGN KEY(Sucur_Id) REFERENCES Supr.tbSucursales(Sucur_Id),

	[Lotes_UsuarioCreacion] [int] NOT NULL,
	[Lotes_FechaCreacion] [datetime] NOT NULL,
	[Lotes_UsuarioModificacion] [int] NULL,
	[Lotes_FechaModificacion] [datetime] NULL,
	[Lotes_Estado] [bit] CONSTRAINT DF_tbLotes_Lotes_Estado DEFAULT 1,
	CONSTRAINT FK_tbLotes_tbUsuarios_Lotes_UsuarioCreacion FOREIGN KEY(Lotes_UsuarioCreacion) REFERENCES Acce.tbUsuarios(Usuar_Id),
	CONSTRAINT FK_tbLotes_tbUsuarios_Lotes_UsuarioModificacion FOREIGN KEY(Lotes_UsuarioModificacion) REFERENCES Acce.tbUsuarios(Usuar_Id),
)
GO
CREATE TABLE Supr.tbEmpleados(
	Emple_Id INT IDENTITY(1,1),
	Emple_PrimerNombre NVARCHAR(50) NOT NULL,
	Emple_SegundoNombre NVARCHAR(50),
	Emple_PrimerApellido NVARCHAR(50) NOT NULL,
	Emple_SegundoApellido NVARCHAR(50),
	Emple_Sexo CHAR(1) NOT NULL,
	Estad_Id INT NOT NULL,
	Emple_Telefono NVARCHAR(20) NOT NULL,
	Emple_Correo NVARCHAR(MAX) NOT NULL,
	Munic_Id CHAR(4) NOT NULL,
	Emple_Direccion NVARCHAR(MAX) NOT NULL,
	Cargo_Id INT NOT NULL,
	Sucur_Id INT NOT NULL,
	CONSTRAINT PK_tbEmpleados_Emple_Id PRIMARY KEY(Emple_Id),
	CONSTRAINT CK_tbEmpleados_Emple_Sexo CHECK (Emple_Sexo IN ('M','F')),
	CONSTRAINT FK_tbEmpleados_tbEstadosCiviles_Estad_Id FOREIGN KEY(Estad_Id) REFERENCES Gral.tbEstadosCiviles(Estad_Id),
	CONSTRAINT FK_tbEmpleados_tbMunicipios_Munic_Id FOREIGN KEY(Munic_Id) REFERENCES Gral.tbMunicipios(Munic_Id),
	CONSTRAINT FK_tbEmpleados_tbCargos_Cargo_Id FOREIGN KEY(Cargo_Id) REFERENCES Gral.tbCargos(Cargo_Id),
	CONSTRAINT FK_tbEmpleados_tbSucursales_Sucur_Id FOREIGN KEY(Sucur_Id) REFERENCES Supr.tbSucursales(Sucur_Id),

	[Emple_UsuarioCreacion] [int] NOT NULL,
	[Emple_FechaCreacion] [datetime] NOT NULL,
	[Emple_UsuarioModificacion] [int] NULL,
	[Emple_FechaModificacion] [datetime] NULL,
	[Emple_Estado] [bit] CONSTRAINT DF_tbEmpleados_Emple_Estado DEFAULT 1,
	CONSTRAINT FK_tbEmpleados_tbUsuarios_Emple_UsuarioCreacion FOREIGN KEY(Emple_UsuarioCreacion) REFERENCES Acce.tbUsuarios(Usuar_Id),
	CONSTRAINT FK_tbEmpleados_tbUsuarios_Emple_UsuarioModificacion FOREIGN KEY(Emple_UsuarioModificacion) REFERENCES Acce.tbUsuarios(Usuar_Id),
)
GO
CREATE TABLE Supr.tbPromociones(
	Promo_Id INT IDENTITY(1,1),
	Prom_Descripcion NVARCHAR(MAX) NOT NULL,
	Produ_Id INT NOT NULL,
	Promo_TipoDisminucion BIT NOT NULL,--0 is for porcentaje, 1 is for valor fijo
	Promo_Disminucion NUMERIC(8,2) NOT NULL,
	Promo_PuntosRequeridos INT NOT NULL,
	CONSTRAINT PK_tbPromociones_Prom_Id PRIMARY KEY(Promo_Id),
	CONSTRAINT FK_tbPromociones_tbProductos_Produ_Id FOREIGN KEY(Produ_Id) REFERENCES Supr.tbProductos(Produ_Id),

	[Promo_UsuarioCreacion] [int] NOT NULL,
	[Promo_FechaCreacion] [datetime] NOT NULL,
	[Promo_UsuarioModificacion] [int] NULL,
	[Promo_FechaModificacion] [datetime] NULL,
	[Promo_Estado] [bit] CONSTRAINT DF_tbPromociones_Promo_Estado DEFAULT 1,
	CONSTRAINT FK_tbPromociones_tbUsuarios_Promo_UsuarioCreacion FOREIGN KEY(Promo_UsuarioCreacion) REFERENCES Acce.tbUsuarios(Usuar_Id),
	CONSTRAINT FK_tbPromociones_tbUsuarios_Promo_UsuarioModificacion FOREIGN KEY(Promo_UsuarioModificacion) REFERENCES Acce.tbUsuarios(Usuar_Id),
)
GO
---------------------------------------------------------------------------------------------------------------------------------------------------------
GO
CREATE SCHEMA Venta
GO
CREATE TABLE Venta.tbClientes(
	Clien_Id INT IDENTITY(1,1),
	Clien_PrimerNombre NVARCHAR(50) NOT NULL,
	Clien_SegundoNombre NVARCHAR(50),
	Clien_PrimerApellido NVARCHAR(50) NOT NULL,
	Clien_SegundoApellido NVARCHAR(50),
	Clien_Sexo CHAR(1) NULL,
	Estad_Id INT NULL,
	Clien_Telefono NVARCHAR(20) NULL,
	Munic_Id CHAR(4) NOT NULL,
	Clien_Direccion NVARCHAR(MAX) NOT NULL,
	CONSTRAINT PK_tbClientes_Clien_Id PRIMARY KEY(Clien_Id),
	CONSTRAINT CK_tbClientes_Clien_Sexo CHECK (Clien_Sexo IN ('M','F')),
	CONSTRAINT FK_tbClientes_tbEstadosCiviles_Estad_Id FOREIGN KEY(Estad_Id) REFERENCES Gral.tbEstadosCiviles(Estad_Id),
	CONSTRAINT FK_tbClientes_tbMunicipios_Munic_Id FOREIGN KEY(Munic_Id) REFERENCES Gral.tbMunicipios(Munic_Id),

	[Clien_UsuarioCreacion] [int] NOT NULL,
	[Clien_FechaCreacion] [datetime] NOT NULL,
	[Clien_UsuarioModificacion] [int] NULL,
	[Clien_FechaModificacion] [datetime] NULL,
	[Clien_Estado] [bit] CONSTRAINT DF_tbClientes_Clien_Estado DEFAULT 1,
	CONSTRAINT FK_tbClientes_tbUsuarios_Clien_UsuarioCreacion FOREIGN KEY(Clien_UsuarioCreacion) REFERENCES Acce.tbUsuarios(Usuar_Id),
	CONSTRAINT FK_tbClientes_tbUsuarios_Clien_UsuarioModificacion FOREIGN KEY(Clien_UsuarioModificacion) REFERENCES Acce.tbUsuarios(Usuar_Id),
)
GO
CREATE TABLE Venta.tbVentasEncabezado(
	Venen_Id INT IDENTITY(1,1),
	Sucur_Id INT NOT NULL,
	Usuar_Id INT NOT NULL,
	CONSTRAINT PK_tbVentasEncabezado_Venen_Id PRIMARY KEY(Venen_Id),
	CONSTRAINT FK_tbVentasEncabezado_tbSucursales_Sucur_Id FOREIGN KEY(Sucur_Id) REFERENCES Supr.tbSucursales(Sucur_Id),
	CONSTRAINT FK_tbVentasEncabezado_tbUsuarios_Usuar_Id FOREIGN KEY(Usuar_Id) REFERENCES Acce.tbUsuarios,

	[Venen_UsuarioCreacion] [int] NOT NULL,
	[Venen_FechaCreacion] [datetime] NOT NULL,
	[Venen_UsuarioModificacion] [int] NULL,
	[Venen_FechaModificacion] [datetime] NULL,
	[Venen_Estado] [bit] CONSTRAINT DF_tbVentasEncabezado_Venen_Estado DEFAULT 1,
	CONSTRAINT FK_tbVentasEncabezado_tbUsuarios_Venen_UsuarioCreacion FOREIGN KEY(Venen_UsuarioCreacion) REFERENCES Acce.tbUsuarios(Usuar_Id),
	CONSTRAINT FK_tbVentasEncabezado_tbUsuarios_Venen_UsuarioModificacion FOREIGN KEY(Venen_UsuarioModificacion) REFERENCES Acce.tbUsuarios(Usuar_Id),
)
GO
CREATE TABLE Venta.tbVentasDetalle(
	Vende_Id INT IDENTITY(1,1),
	Venen_Id INT NOT NULL,
	Lotes_Id INT NOT NULL,
	Vende_Cantidad INT NOT NULL,
	CONSTRAINT PK_tbVentasDetalle_Vende_Id PRIMARY KEY(Vende_Id),
	CONSTRAINT FK_tbVentasDetalle_tbVentasEncabezado_Venen_Id FOREIGN KEY(Venen_Id) REFERENCES Venta.tbVentasEncabezado(Venen_Id),
	CONSTRAINT FK_tbVentasDetalle_tbLotes_Lotes_Id FOREIGN KEY(Lotes_Id) REFERENCES Supr.tbLotes(Lotes_Id),

	[Vende_UsuarioCreacion] [int] NOT NULL,
	[Vende_FechaCreacion] [datetime] NOT NULL,
	[Vende_UsuarioModificacion] [int] NULL,
	[Vende_FechaModificacion] [datetime] NULL,
	[Vende_Estado] [bit] CONSTRAINT DF_tbVentasDetalle_Vende_Estado DEFAULT 1,
	CONSTRAINT FK_tbVentasDetalle_tbUsuarios_Vende_UsuarioCreacion FOREIGN KEY(Vende_UsuarioCreacion) REFERENCES Acce.tbUsuarios(Usuar_Id),
	CONSTRAINT FK_tbVentasDetalle_tbUsuarios_Vende_UsuarioModificacion FOREIGN KEY(Vende_UsuarioModificacion) REFERENCES Acce.tbUsuarios(Usuar_Id),
)
GO
---------------------------------------------------------------------------------------------------------------------------------------------------------