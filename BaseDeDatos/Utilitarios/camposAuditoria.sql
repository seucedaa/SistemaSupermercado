--Campos de auditoria

[5letras_UsuarioCreacion] [int] NOT NULL,
	[5letras_FechaCreacion] [datetime] NOT NULL,
	[5letras_UsuarioModificacion] [int] NULL,
	[5letras_FechaModificacion] [datetime] NULL,
	[5letras_Estado] [bit] CONSTRAINT DF_tablaPerteneciente_5letras_Estado DEFAULT 1,
	CONSTRAINT FK_tablaPerteneciente_tbUsuarios_5letras_UsuarioCreacion FOREIGN KEY(5letras_UsuarioCreacion) REFERENCES Acce.tbUsuarios(Usuar_Id),
	CONSTRAINT FK_tablaPerteneciente_tbUsuarios_5letras_UsuarioModificacion FOREIGN KEY(5letras_UsuarioModificacion) REFERENCES Acce.tbUsuarios(Usuar_Id),

--Campos de auditoria	