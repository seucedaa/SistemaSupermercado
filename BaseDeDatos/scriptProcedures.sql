GO
USE dbSupermercadoLaColonia
GO
CREATE PROCEDURE [Acce].[SP_Usuario_Login]
	@Usuario NVARCHAR(50),
	@Contrasena NVARCHAR(MAX)
AS
BEGIN
		DECLARE @HASHBYTES NVARCHAR(MAX) = CONVERT(NVARCHAR (MAX), HASHBYTES ('SHA2_512', @Contrasena), 2);		
		SELECT	usu.*,
				rol.Roles_Descripcion AS Roles_Descripcion,
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
		ON rol.Roles_Id = usu.Roles_Id LEFT JOIN Supr.tbEmpleados AS emp
		ON emp.Emple_Id = usu.Perso_Id LEFT JOIN venta.tbClientes AS cli
		ON cli.Clien_Id = usu.Perso_Id
		WHERE usu.Usuar_Usuario = @Usuario AND usu.Usuar_Contrasena = @HASHBYTES;
END
GO
CREATE PROCEDURE Acce.SP_Usuario_Lista
AS
BEGIN
	SELECT
			usu.*,
			creacion.Usuar_Usuario AS UsuarioCreacion,
			modificacion.Usuar_Usuario AS UsuarioModificacion,
			roles.Roles_Descripcion,
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
END
GO
CREATE PROCEDURE Acce.SP_Usuario_Buscar
	@Usuar_Id INT
AS
BEGIN
	SELECT
			usu.*,
			creacion.Usuar_Usuario AS UsuarioCreacion,
			modificacion.Usuar_Usuario AS UsuarioModificacion,
			roles.Roles_Descripcion,
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
CREATE PROCEDURE Acce.SP_Usuario_Insertar
    @Usuar_Correo NVARCHAR(100),
    @Usuar_Usuario NVARCHAR(50),
    @Usuar_Contrasena NVARCHAR(MAX),
    @Perso_Id INT,
    @Perso_Tipo BIT,
    @Roles_Id INT,
    @Usuar_Admin BIT,
    @Usuar_UsuarioCreacion INT,
    @Usuar_FechaCreacion DATETIME
AS
BEGIN
	DECLARE @HashedPassword NVARCHAR(MAX);
	SET @HashedPassword = CONVERT(NVARCHAR(MAX), HASHBYTES('SHA2_512', @Usuar_Contrasena),2);
    -- Start of TRY block
    BEGIN TRY
        -- Insert the new record into tbUsuarios
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
            @Perso_Tipo,
            @Roles_Id,
            @Usuar_Admin,
            @Usuar_UsuarioCreacion,
            @Usuar_FechaCreacion
        )

        -- Return 1 if the insert is successful
        SELECT 1
    END TRY

    -- Start of CATCH block
    BEGIN CATCH
        -- Return 0 if an error occurs
        SELECT 0
    END CATCH
END
GO
CREATE PROCEDURE Acce.SP_Usuario_Modificar
    @Usuar_Id INT,
    @Usuar_Correo NVARCHAR(100),
    @Usuar_Usuario NVARCHAR(50),
    @Perso_Id INT,
    @Perso_Tipo BIT,
    @Roles_Id INT,
    @Usuar_Admin BIT,
    @Usuar_UsuarioModificacion INT,
    @Usuar_FechaModificacion DATETIME
AS
BEGIN
    -- Start of TRY block
    BEGIN TRY
        -- Update the record in tbUsuarios
        UPDATE Acce.tbUsuarios
        SET
            Usuar_Correo = @Usuar_Correo,
            Usuar_Usuario = @Usuar_Usuario,
            Perso_Id = @Perso_Id,
            Perso_Tipo = @Perso_Tipo,
            Roles_Id = @Roles_Id,
            Usuar_Admin = @Usuar_Admin,
            Usuar_UsuarioModificacion = @Usuar_UsuarioModificacion,
            Usuar_FechaModificacion = @Usuar_FechaModificacion
        WHERE
            Usuar_Id = @Usuar_Id

        -- Return 1 if the update is successful
        SELECT 1
    END TRY

    -- Start of CATCH block
    BEGIN CATCH
        -- Return 0 if an error occurs
        SELECT 0
    END CATCH
END
GO
CREATE PROCEDURE Acce.SP_Usuario_Desactivar
    @Usuar_Id INT,
    @Usuar_UsuarioModificacion INT,
    @Usuar_FechaModificacion DATETIME
AS
BEGIN
    -- Inicio del bloque TRY
    BEGIN TRY
        -- Actualizar el estado del usuario a desactivado
        UPDATE Acce.tbUsuarios
        SET
            Usuar_Estado = 0,
            Usuar_UsuarioModificacion = @Usuar_UsuarioModificacion,
            Usuar_FechaModificacion = @Usuar_FechaModificacion
        WHERE
            Usuar_Id = @Usuar_Id

        -- Retornar 1 si la operación es exitosa
        SELECT 1
    END TRY

    -- Inicio del bloque CATCH
    BEGIN CATCH
        -- Retornar 0 si ocurre un error
        SELECT 0
    END CATCH
END

GO
CREATE PROCEDURE Acce.SP_Usuario_ReestablecerContrasena
	@Usuar_Correo NVARCHAR(100),
	@Usuar_Contrasena NVARCHAR(MAX)
AS
BEGIN
	DECLARE @HashedPassword NVARCHAR(MAX);
	SET @HashedPassword = CONVERT(NVARCHAR(MAX), HASHBYTES('SHA2_512', @Usuar_Contrasena),2);

	BEGIN TRY
		UPDATE Acce.tbUsuarios 
		SET Usuar_Contrasena = @HashedPassword
		WHERE Usuar_Correo = @Usuar_Correo
		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 0
	END CATCH
END
GO
CREATE PROCEDURE Acce.SP_Usuario_CambiarContrasena
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
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
GO
CREATE PROCEDURE Gral.SP_Departamento_Lista
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
CREATE PROCEDURE Gral.SP_Departamento_Buscar
    @Depar_Id CHAR(2)
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
    WHERE
        depar.Depar_Id = @Depar_Id
END
GO
CREATE PROCEDURE Gral.SP_Departamento_Insertar
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
CREATE PROCEDURE Gral.SP_Departamento_Modificar
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
CREATE PROCEDURE Gral.SP_Departamento_Eliminar
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
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
GO
CREATE PROCEDURE Gral.SP_Municipio_Lista
AS
BEGIN
    SELECT
        munic.*,
        depar.Depar_Descripcion AS Departamento,
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
CREATE PROCEDURE Gral.SP_Municipio_Buscar
    @Munic_Id CHAR(4)
AS
BEGIN
    SELECT
        munic.*,
        depar.Depar_Descripcion AS Departamento,
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
    WHERE
        munic.Munic_Id = @Munic_Id
END
GO
CREATE PROCEDURE Gral.SP_Municipio_Insertar
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
CREATE PROCEDURE Gral.SP_Municipio_Modificar
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
CREATE PROCEDURE Gral.SP_Municipio_Eliminar
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
-- Procedimiento para listar todos los estados civiles
CREATE PROCEDURE Gral.SP_EstadoCivil_Lista
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

-- Procedimiento para buscar un estado civil por ID
CREATE PROCEDURE Gral.SP_EstadoCivil_Buscar
    @Estad_Id INT
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
    WHERE
        estad.Estad_Id = @Estad_Id
END
GO

-- Procedimiento para insertar un nuevo estado civil
CREATE PROCEDURE Gral.SP_EstadoCivil_Insertar
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

-- Procedimiento para modificar un estado civil existente
CREATE PROCEDURE Gral.SP_EstadoCivil_Modificar
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

-- Procedimiento para eliminar un estado civil por ID
CREATE PROCEDURE Gral.SP_EstadoCivil_Eliminar
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
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
GO
CREATE PROCEDURE Gral.SP_Categoria_Lista
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
END
GO
CREATE PROCEDURE Gral.SP_Categoria_Buscar
    @Categ_Id INT
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
    WHERE
        categ.Categ_Id = @Categ_Id
END
GO
CREATE PROCEDURE Gral.SP_Categoria_Insertar
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
CREATE PROCEDURE Gral.SP_Categoria_Modificar
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
CREATE PROCEDURE Gral.SP_Categoria_Desactivar
    @Categ_Id INT,
    @Categ_UsuarioModificacion INT,
    @Categ_FechaModificacion DATETIME
AS
BEGIN
    DECLARE @NumeroDeRelaciones INT = 0

    -- Contar las referencias de tbCursos a esta categoría
    SET @NumeroDeRelaciones = (
        SELECT COUNT(*)
        FROM Gral.tbSubcategorias
        WHERE Categ_Id = @Categ_Id
    )

    BEGIN TRY
        IF @NumeroDeRelaciones = 0
        BEGIN
            -- Si no hay referencias, desactivar la categoría
            UPDATE Gral.tbCategorias
            SET
                Categ_Estado = 0,
                Categ_UsuarioModificacion = @Categ_UsuarioModificacion,
                Categ_FechaModificacion = @Categ_FechaModificacion
            WHERE
                Categ_Id = @Categ_Id

            SELECT 1  -- Indicar que la operación fue exitosa
		END
        ELSE
		BEGIN
            -- Si hay referencias, no desactivar y retornar 0
            SELECT 0  -- Indicar que no se puede desactivar debido a referencias
        END
    END TRY
    BEGIN CATCH
        SELECT -1  -- Retornar 0 si ocurre un error inesperado
    END CATCH
END
GO
CREATE PROCEDURE Gral.SP_Subcategoria_Lista
AS
BEGIN
    SELECT
        subca.*,
        categ.Categ_Descripcion AS Categoria,
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
CREATE PROCEDURE Gral.SP_Subcategoria_Buscar
    @Subca_Id INT
AS
BEGIN
    SELECT
        subca.*,
        categ.Categ_Descripcion AS Categoria,
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
    WHERE
        subca.Subca_Id = @Subca_Id
END
GO
CREATE PROCEDURE Gral.SP_Subcategoria_Insertar
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

        SELECT 1  -- Indicar que la operación fue exitosa
    END TRY
    BEGIN CATCH
        SELECT 0  -- Indicar que ocurrió un error
    END CATCH
END
GO
CREATE PROCEDURE Gral.SP_Subcategoria_Modificar
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
CREATE PROCEDURE Gral.SP_Subcategoria_Desactivar
    @Subca_Id INT,
    @Subca_UsuarioModificacion INT,
    @Subca_FechaModificacion DATETIME
AS
BEGIN
    DECLARE @NumeroDeRelaciones INT = 0

    -- Contar las referencias en otras tablas usando Subca_Id
    SET @NumeroDeRelaciones = (
        SELECT COUNT(*)
        FROM Supr.tbProductos -- Reemplaza con el nombre de la tabla donde haya referencias
        WHERE Subca_Id = @Subca_Id
    )

    BEGIN TRY
        IF @NumeroDeRelaciones = 0
        BEGIN
            -- Si no hay referencias, desactivar la subcategoría
            UPDATE Gral.tbSubcategorias
            SET
                Subca_Estado = 0,
                Subca_UsuarioModificacion = @Subca_UsuarioModificacion,
                Subca_FechaModificacion = @Subca_FechaModificacion
            WHERE
                Subca_Id = @Subca_Id

            SELECT 1  -- Indicar éxito
        END
        ELSE
        BEGIN
            -- Si hay referencias, no desactivar y retornar 0
            SELECT 0  -- Indicar que no se puede desactivar
        END
    END TRY
    BEGIN CATCH
        SELECT -1  -- Indicar error inesperado
    END CATCH
END
GO
----------------------------------------------------------------------------------------------------------------------------------------------------------------------
GO
CREATE PROCEDURE Gral.SP_Impuesto_Lista
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
END
GO
CREATE PROCEDURE Gral.SP_Impuesto_Buscar
    @Impue_Id INT
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
    WHERE
        impue.Impue_Id = @Impue_Id
END
GO
CREATE PROCEDURE Gral.SP_Impuesto_Insertar
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

        SELECT 1  -- Indicar éxito
    END TRY
    BEGIN CATCH
        SELECT 0  -- Indicar error
    END CATCH
END
GO
CREATE PROCEDURE Gral.SP_Impuesto_Modificar
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

        SELECT 1  -- Indicar éxito
    END TRY
    BEGIN CATCH
        SELECT 0  -- Indicar error
    END CATCH
END
GO
CREATE PROCEDURE Gral.SP_Impuesto_Desactivar
    @Impue_Id INT,
    @Impue_UsuarioModificacion INT,
    @Impue_FechaModificacion DATETIME
AS
BEGIN
    DECLARE @NumeroDeRelaciones INT = 0

    -- Contar referencias para verificar si se puede desactivar
    SET @NumeroDeRelaciones = (
        SELECT COUNT(*)
        FROM Supr.tbProductos -- Reemplazar con el nombre de la tabla donde haya referencias
        WHERE Impue_Id = @Impue_Id
    )

    BEGIN TRY
        IF @NumeroDeRelaciones = 0
        BEGIN
            -- Desactivar el impuesto si no hay referencias
            UPDATE Gral.tbImpuestos
            SET
                Impue_Estado = 0,
                Impue_UsuarioModificacion = @Impue_UsuarioModificacion,
                Impue_FechaModificacion = @Impue_FechaModificacion
            WHERE
                Impue_Id = @Impue_Id

            SELECT 1  -- Indicar éxito
        END
        ELSE
        BEGIN
            -- No desactivar si hay referencias
            SELECT 0  -- Indicar que no se puede desactivar
        END
    END TRY
    BEGIN CATCH
        SELECT -1  -- Indicar error inesperado
    END CATCH
END
GO
-----------------------------------------------------------------------------------------------------------------------------------------------------------
GO
CREATE PROCEDURE Gral.SP_Cargo_Lista
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
END
GO
CREATE PROCEDURE Gral.SP_Cargo_Buscar
    @Cargo_Id INT
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
    WHERE
        cargo.Cargo_Id = @Cargo_Id
END
GO
CREATE PROCEDURE Gral.SP_Cargo_Insertar
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

        SELECT 1  -- Indicar éxito
    END TRY
    BEGIN CATCH
        SELECT 0  -- Indicar error
    END CATCH
END
GO
CREATE PROCEDURE Gral.SP_Cargo_Modificar
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

        SELECT 1  -- Indicar éxito
    END TRY
    BEGIN CATCH
        SELECT 0  -- Indicar error
    END CATCH
END
GO
CREATE PROCEDURE Gral.SP_Cargo_Desactivar
    @Cargo_Id INT,
    @Cargo_UsuarioModificacion INT,
    @Cargo_FechaModificacion DATETIME
AS
BEGIN
    DECLARE @NumeroDeRelaciones INT = 0

    -- Contar referencias para determinar si se puede desactivar
    SET @NumeroDeRelaciones = (
        SELECT COUNT(*)
        FROM Supr.tbEmpleados -- Reemplaza con el nombre de la tabla donde haya referencias a Cargo_Id
        WHERE Cargo_Id = @Cargo_Id
    )

    BEGIN TRY
        IF @NumeroDeRelaciones = 0
        BEGIN
            -- Si no hay referencias, desactivar el cargo
            UPDATE Gral.tbCargos
            SET
                Cargo_Estado = 0,
                Cargo_UsuarioModificacion = @Cargo_UsuarioModificacion,
                Cargo_FechaModificacion = @Cargo_FechaModificacion
            WHERE
                Cargo_Id = @Cargo_Id

            SELECT 1  -- Indicar éxito
        END
        ELSE
        BEGIN
            -- Si hay referencias, no desactivar y retornar 0
            SELECT 0  -- Indicar que no se puede desactivar debido a referencias
        END
    END TRY
    BEGIN CATCH
        SELECT -1  -- Indicar error inesperado
    END CATCH
END
GO
----------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- Procedimiento para listar todas las sucursales
CREATE PROCEDURE Supr.SP_Sucursal_Lista
AS
BEGIN
    SELECT
        sucur.*,
        municipio.Munic_Descripcion AS Municipio,
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
END
GO

-- Procedimiento para buscar una sucursal por su ID
CREATE PROCEDURE Supr.SP_Sucursal_Buscar
    @Sucur_Id INT
AS
BEGIN
    SELECT
        sucur.*,
        municipio.Munic_Descripcion AS Municipio,
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
    WHERE
        sucur.Sucur_Id = @Sucur_Id
END
GO

-- Procedimiento para insertar una nueva sucursal
CREATE PROCEDURE Supr.SP_Sucursal_Insertar
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

        SELECT 1  -- Indicar éxito
    END TRY
    BEGIN CATCH
        SELECT 0  -- Indicar error
    END CATCH
END
GO

-- Procedimiento para modificar una sucursal existente
CREATE PROCEDURE Supr.SP_Sucursal_Modificar
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

        SELECT 1  -- Indicar éxito
    END TRY
    BEGIN CATCH
        SELECT 0  -- Indicar error
    END CATCH
END
GO
-- Procedimiento para desactivar una sucursal
CREATE PROCEDURE Supr.SP_Sucursal_Desactivar
    @Sucur_Id INT,
    @Sucur_UsuarioModificacion INT,
    @Sucur_FechaModificacion DATETIME
AS
BEGIN

    BEGIN TRY
       
            -- Si no hay relaciones, desactivar la sucursal
            UPDATE Supr.tbSucursales
            SET
                Sucur_Estado = 0,
                Sucur_UsuarioModificacion = @Sucur_UsuarioModificacion,
                Sucur_FechaModificacion = @Sucur_FechaModificacion
            WHERE
                Sucur_Id = @Sucur_Id

            SELECT 1  -- Indicar éxito
       
    END TRY
    BEGIN CATCH
        SELECT 0  -- Indicar error inesperado
    END CATCH
END
-------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- Procedimiento para listar todos los proveedores
CREATE PROCEDURE Supr.SP_Proveedor_Lista
AS
BEGIN
    SELECT
        prove.*,
        municipio.Munic_Descripcion AS Municipio,
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

-- Procedimiento para buscar un proveedor por su ID
CREATE PROCEDURE Supr.SP_Proveedor_Buscar
    @Prove_Id INT
AS
BEGIN
    SELECT
        prove.*,
        municipio.Munic_Descripcion AS Municipio,
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
    WHERE
        prove.Prove_Id = @Prove_Id
END
GO

-- Procedimiento para insertar un nuevo proveedor
CREATE PROCEDURE Supr.SP_Proveedor_Insertar
    @Prove_Marca NVARCHAR(50),
    @Prove_ContactoPrimerNombre NVARCHAR(50),
    @Prove_ContactoSegundoNombre NVARCHAR(50),
    @Prove_ContactoPrimerApellido NVARCHAR(50),
    @Prove_ContactoSegundoApellido NVARCHAR(50),
    @Munic_Id CHAR(4),
    @Prove_Direccion NVARCHAR(MAX),
    @Prove_Telefono NVARCHAR(20),
    @Prove_Correo NVARCHAR(MAX),
    @Prove_Notas NVARCHAR(MAX),
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
            Prove_Notas,
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
            @Prove_Notas,
            @Prove_UsuarioCreacion,
            @Prove_FechaCreacion
        )

        SELECT 1  -- Indicar éxito
    END TRY
    BEGIN CATCH
        SELECT 0  -- Indicar error
    END CATCH
END
GO

-- Procedimiento para modificar un proveedor existente
CREATE PROCEDURE Supr.SP_Proveedor_Modificar
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
    @Prove_Notas NVARCHAR(MAX),
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
            Prove_Notas = @Prove_Notas,
            Prove_UsuarioModificacion = @Prove_UsuarioModificacion,
            Prove_FechaModificacion = @Prove_FechaModificacion
        WHERE
            Prove_Id = @Prove_Id

        SELECT 1  -- Indicar éxito
    END TRY
    BEGIN CATCH
        SELECT 0  -- Indicar error
    END CATCH
END
GO

-- Procedimiento para desactivar un proveedor
CREATE PROCEDURE Supr.SP_Proveedor_Desactivar
    @Prove_Id INT,
    @Prove_UsuarioModificacion INT,
    @Prove_FechaModificacion DATETIME
AS
BEGIN
    DECLARE @NumeroDeRelaciones INT = 0

    -- Contar referencias para determinar si se puede desactivar
    SET @NumeroDeRelaciones = (
        SELECT COUNT(*)
        FROM Supr.tbProductos  -- Reemplaza con la tabla que tiene referencias a Prove_Id
        WHERE Prove_Id = @Prove_Id
    )

    BEGIN TRY
        IF @NumeroDeRelaciones = 0
        BEGIN
            -- Si no hay relaciones, desactivar el proveedor
            UPDATE Supr.tbProveedores
            SET
                Prove_Estado = 0,
                Prove_UsuarioModificacion = @Prove_UsuarioModificacion,
                Prove_FechaModificacion = @Prove_FechaModificacion
            WHERE
                Prove_Id = @Prove_Id

            SELECT 1  -- Indicar éxito
        END
        ELSE
        BEGIN
            -- Si hay referencias, no desactivar
            SELECT 0  -- Indicar que no se puede desactivar por referencias
        END
    END TRY
    BEGIN CATCH
        SELECT -1  -- Indicar error inesperado
    END CATCH
END
----------------------------------------------------------------------------------------------------------------------------------------------------------
-- Procedimiento para listar todos los productos
CREATE PROCEDURE Supr.SP_Producto_Lista
AS
BEGIN
    SELECT
        produ.*,
        subcat.Subca_Descripcion AS Subcategoria,
        proveedor.Prove_Marca AS Proveedor,
        impuesto.Impue_Descripcion AS Impuesto,
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

-- Procedimiento para buscar un producto por su ID
CREATE PROCEDURE Supr.SP_Producto_Buscar
    @Produ_Id INT
AS
BEGIN
    SELECT
        produ.*,
        subcat.Subca_Descripcion AS Subcategoria,
        proveedor.Prove_Marca AS Proveedor,
        impuesto.Impue_Descripcion AS Impuesto,
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
    WHERE
        produ.Produ_Id = @Produ_Id
END
GO

-- Procedimiento para insertar un nuevo producto
CREATE PROCEDURE Supr.SP_Producto_Insertar
    @Produ_Descripcion NVARCHAR(50),
    @Produ_Existencia INT,
    @Produ_PrecioCompra NUMERIC(8,2),
    @Produ_PrecioVenta NUMERIC(8,2),
    @Impue_Id INT,
    @Subca_Id INT,
    @Prove_Id INT,
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
            @Produ_UsuarioCreacion,
            @Produ_FechaCreacion
        )

        SELECT 1  -- Indicar éxito
    END TRY
    BEGIN CATCH
        SELECT 0  -- Indicar error
    END CATCH
END
GO

-- Procedimiento para modificar un producto existente
CREATE PROCEDURE Supr.SP_Producto_Modificar
    @Produ_Id INT,
    @Produ_Descripcion NVARCHAR(50),
    @Produ_Existencia INT,
    @Produ_PrecioCompra NUMERIC(8,2),
    @Produ_PrecioVenta NUMERIC(8,2),
    @Impue_Id INT,
    @Subca_Id INT,
    @Prove_Id INT,
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
            Produ_UsuarioModificacion = @Produ_UsuarioModificacion,
            Produ_FechaModificacion = @Produ_FechaModificacion
        WHERE
            Produ_Id = @Produ_Id

        SELECT 1  -- Indicar éxito
    END TRY
    BEGIN CATCH
        SELECT 0  -- Indicar error
    END CATCH
END
GO

-- Procedimiento para desactivar un producto
CREATE PROCEDURE Supr.SP_Producto_Desactivar
    @Produ_Id INT,
    @Produ_UsuarioModificacion INT,
    @Produ_FechaModificacion DATETIME
AS
BEGIN
    DECLARE @NumeroDeRelaciones INT = 0

    -- Contar referencias para determinar si se puede desactivar
    SET @NumeroDeRelaciones = (
        SELECT COUNT(*)
        FROM Supr.tbLotes -- Cambiar con la tabla que tiene referencias a Produ_Id
        WHERE Produ_Id = @Produ_Id
    )

    BEGIN TRY
        IF @NumeroDeRelaciones = 0
        BEGIN
            -- Si no hay relaciones, desactivar el producto
            UPDATE Supr.tbProductos
            SET
                Produ_Estado = 0,
                Produ_UsuarioModificacion = @Produ_UsuarioModificacion,
                Produ_FechaModificacion = @Produ_FechaModificacion
            WHERE
                Produ_Id = @Produ_Id

            SELECT 1  -- Indicar éxito
        END
        ELSE
        BEGIN
            -- Si hay referencias, no desactivar
            SELECT 0  -- Indicar que no se puede desactivar
        END
    END TRY
    BEGIN CATCH
        SELECT -1  -- Indicar error inesperado
    END CATCH
END
----------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- Procedimiento para listar todos los lotes
CREATE PROCEDURE Supr.SP_Lote_Lista
AS
BEGIN
    SELECT
        lotes.*,
        productos.Produ_Descripcion AS Producto,
        sucursales.Sucur_Descripcion AS Sucursal,
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
END
GO

-- Procedimiento para buscar un lote por su ID
CREATE PROCEDURE Supr.SP_Lote_Buscar
    @Lotes_Id INT
AS
BEGIN
    SELECT
        lotes.*,
        productos.Produ_Descripcion AS Producto,
        sucursales.Sucur_Descripcion AS Sucursal,
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
    WHERE
        lotes.Lotes_Id = @Lotes_Id
END
GO

-- Procedimiento para insertar un nuevo lote
CREATE PROCEDURE Supr.SP_Lote_Insertar
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

        SELECT 1  -- Indicar éxito
    END TRY
    BEGIN CATCH
        SELECT 0  -- Indicar error
    END CATCH
END
GO

-- Procedimiento para modificar un lote existente
CREATE PROCEDURE Supr.SP_Lote_Modificar
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

        SELECT 1  -- Indicar éxito
    END TRY
    BEGIN CATCH
        SELECT 0  -- Indicar error
    END CATCH
END
GO

-- Procedimiento para desactivar un lote
CREATE PROCEDURE Supr.SP_Lote_Desactivar
    @Lotes_Id INT,
    @Lotes_UsuarioModificacion INT,
    @Lotes_FechaModificacion DATETIME
AS
BEGIN


    BEGIN TRY
      
            -- Si no hay relaciones, desactivar el lote
            UPDATE Supr.tbLotes
            SET
                Lotes_Estado = 0,
                Lotes_UsuarioModificacion = @Lotes_UsuarioModificacion,
                Lotes_FechaModificacion = @Lotes_FechaModificacion
            WHERE
                Lotes_Id = @Lotes_Id

            SELECT 1  -- Indicar éxito
        
    END TRY
    BEGIN CATCH
        SELECT 0  -- Indicar error inesperado
    END CATCH
END
-------------------------------------------------------------------------------------------------------------------------------------------------------------
-- Procedimiento para listar todos los empleados
CREATE PROCEDURE Supr.SP_Empleado_Lista
AS
BEGIN
    SELECT
        emple.*,
        estad.Estad_Descripcion AS EstadoCivil,
        municipios.Munic_Descripcion AS Municipio,
        cargos.Cargo_Descripcion AS Cargo,
        sucursales.Sucur_Descripcion AS Sucursal,
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
END
GO

-- Procedimiento para buscar un empleado por su ID
CREATE PROCEDURE Supr.SP_Empleado_Buscar
    @Emple_Id INT
AS
BEGIN
    SELECT
        emple.*,
        estad.Estad_Descripcion AS EstadoCivil,
        municipios.Munic_Descripcion AS Municipio,
        cargos.Cargo_Descripcion AS Cargo,
        sucursales.Sucur_Descripcion AS Sucursal,
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
    WHERE
        emple.Emple_Id = @Emple_Id
END
GO

-- Procedimiento para insertar un nuevo empleado
CREATE PROCEDURE Supr.SP_Empleado_Insertar
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

        SELECT 1  -- Indicar éxito
    END TRY
    BEGIN CATCH
        SELECT 0  -- Indicar error
    END CATCH
END
GO

-- Procedimiento para modificar un empleado existente
CREATE PROCEDURE Supr.SP_Empleado_Modificar
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

        SELECT 1  -- Indicar éxito
    END TRY
    BEGIN CATCH
        SELECT 0  -- Indicar error
    END CATCH
END
GO

-- Procedimiento para desactivar un empleado
CREATE PROCEDURE Supr.SP_Empleado_Desactivar
    @Emple_Id INT,
    @Emple_UsuarioModificacion INT,
    @Emple_FechaModificacion DATETIME
AS
BEGIN
    DECLARE @NumeroDeRelaciones INT = 0

    -- Contar relaciones para determinar si se puede desactivar
    SET @NumeroDeRelaciones = (
        SELECT COUNT(*)
        FROM OtraTabla -- Cambiar por la tabla que tiene referencias a Emple_Id
        WHERE Emple_Id = @Emple_Id
    )

    BEGIN TRY
        IF @NumeroDeRelaciones = 0
        BEGIN
            -- Si no hay relaciones, desactivar el empleado
            UPDATE Supr.tbEmpleados
            SET
                Emple_Estado = 0,
                Emple_UsuarioModificacion = @Emple_UsuarioModificacion,
                Emple_FechaModificacion = @Emple_FechaModificacion
            WHERE
                Emple_Id = @Emple_Id

            SELECT 1  -- Indicar éxito
        END
        ELSE
        BEGIN
            -- Si hay relaciones, no desactivar
            SELECT 0  -- Indicar que no se puede desactivar
        END
    END TRY
    BEGIN CATCH
        SELECT -1  -- Indicar error inesperado
    END CATCH
END
-------------------------------------------------------------------------------------------------------------------------------------------------------------
-- Procedimiento para listar todas las promociones
CREATE PROCEDURE Supr.SP_Promocion_Lista
AS
BEGIN
    SELECT
        promo.*,
        producto.Produ_Descripcion AS Producto,
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
END
GO

-- Procedimiento para buscar una promoción por su ID
CREATE PROCEDURE Supr.SP_Promocion_Buscar
    @Promo_Id INT
AS
BEGIN
    SELECT
        promo.*,
        producto.Produ_Descripcion AS Producto,
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
    WHERE
        promo.Promo_Id = @Promo_Id
END
GO

-- Procedimiento para insertar una nueva promoción
CREATE PROCEDURE Supr.SP_Promocion_Insertar
    @Prom_Descripcion NVARCHAR(MAX),
    @Produ_Id INT,
    @Promo_TipoDisminucion BIT,
    @Promo_Disminucion NUMERIC(8,2),
    @Promo_PuntosRequeridos INT,
    @Promo_UsuarioCreacion INT,
    @Promo_FechaCreacion DATETIME
AS
BEGIN
    BEGIN TRY
        INSERT INTO Supr.tbPromociones (
            Prom_Descripcion,
            Produ_Id,
            Promo_TipoDisminucion,
            Promo_Disminucion,
            Promo_PuntosRequeridos,
            Promo_UsuarioCreacion,
            Promo_FechaCreacion
        )
        VALUES (
            @Prom_Descripcion,
            @Produ_Id,
            @Promo_TipoDisminucion,
            @Promo_Disminucion,
            @Promo_PuntosRequeridos,
            @Promo_UsuarioCreacion,
            @Promo_FechaCreacion
        )

        SELECT 1  -- Indicar éxito
    END TRY
    BEGIN CATCH
        SELECT 0  -- Indicar error
    END CATCH
END
GO

-- Procedimiento para modificar una promoción existente
CREATE PROCEDURE Supr.SP_Promocion_Modificar
    @Promo_Id INT,
    @Prom_Descripcion NVARCHAR(MAX),
    @Produ_Id INT,
    @Promo_TipoDisminucion BIT,
    @Promo_Disminucion NUMERIC(8,2),
    @Promo_PuntosRequeridos INT,
    @Promo_UsuarioModificacion INT,
    @Promo_FechaModificacion DATETIME
AS
BEGIN
    BEGIN TRY
        UPDATE Supr.tbPromociones
        SET
            Prom_Descripcion = @Prom_Descripcion,
            Produ_Id = @Produ_Id,
            Promo_TipoDisminucion = @Promo_TipoDisminucion,
            Promo_Disminucion = @Promo_Disminucion,
            Promo_PuntosRequeridos = @Promo_PuntosRequeridos,
            Promo_UsuarioModificacion = @Promo_UsuarioModificacion,
            Promo_FechaModificacion = @Promo_FechaModificacion
        WHERE
            Promo_Id = @Promo_Id

        SELECT 1  -- Indicar éxito
    END TRY
    BEGIN CATCH
        SELECT 0  -- Indicar error
    END CATCH
END
GO

-- Procedimiento para desactivar una promoción
CREATE PROCEDURE Supr.SP_Promocion_Desactivar
    @Promo_Id INT,
    @Promo_UsuarioModificacion INT,
    @Promo_FechaModificacion DATETIME
AS
BEGIN
    DECLARE @NumeroDeRelaciones INT = 0

    -- Contar relaciones para determinar si se puede desactivar
    SET @NumeroDeRelaciones = (
        SELECT COUNT(*)
        FROM OtraTabla -- Reemplazar con la tabla que tiene referencias a Promo_Id
        WHERE Promo_Id = @Promo_Id
    )

    BEGIN TRY
        IF @NumeroDeRelaciones = 0
        BEGIN
            -- Si no hay relaciones, desactivar la promoción
            UPDATE Supr.tbPromociones
            SET
                Promo_Estado = 0,
                Promo_UsuarioModificacion = @Promo_UsuarioModificacion,
                Promo_FechaModificacion = @Promo_FechaModificacion
            WHERE
                Promo_Id = @Promo_Id

            SELECT 1  -- Indicar éxito
        END
        ELSE
        BEGIN
            -- Si hay relaciones, no desactivar
            SELECT 0  -- Indicar que no se puede desactivar
        END
    END TRY
    BEGIN CATCH
        SELECT -1  -- Indicar error inesperado
    END CATCH
END
--------------------------------------------------------------------------------------------------------------------------------------------------------------
-- Procedimiento para listar todos los clientes
CREATE PROCEDURE Venta.SP_Cliente_Lista
AS
BEGIN
    SELECT
        cliente.*,
        estad.Estad_Descripcion AS EstadoCivil,
        municipio.Munic_Descripcion AS Municipio,
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
END
GO

-- Procedimiento para buscar un cliente por su ID
CREATE PROCEDURE Venta.SP_Cliente_Buscar
    @Clien_Id INT
AS
BEGIN
    SELECT
        cliente.*,
        estad.Estad_Descripcion AS EstadoCivil,
        municipio.Munic_Descripcion AS Municipio,
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
    WHERE
        cliente.Clien_Id = @Clien_Id
END
GO

-- Procedimiento para insertar un nuevo cliente
CREATE PROCEDURE Venta.SP_Cliente_Insertar
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

        SELECT 1  -- Indicar éxito
    END TRY
    BEGIN CATCH
        SELECT 0  -- Indicar error
    END CATCH
END
GO

-- Procedimiento para modificar un cliente existente
CREATE PROCEDURE Venta.SP_Cliente_Modificar
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

        SELECT 1  -- Indicar éxito
    END TRY
    BEGIN CATCH
        SELECT 0  -- Indicar error
    END CATCH
END
GO

-- Procedimiento para desactivar un cliente
CREATE PROCEDURE Venta.SP_Cliente_Desactivar
    @Clien_Id INT,
    @Clien_UsuarioModificacion INT,
    @Clien_FechaModificacion DATETIME
AS
BEGIN
    DECLARE @NumeroDeRelaciones INT = 0

    -- Contar referencias para determinar si se puede desactivar
    SET @NumeroDeRelaciones = (
        SELECT COUNT(*)
        FROM OtraTabla -- Cambiar por la tabla que tiene referencias a Clien_Id
        WHERE Clien_Id = @Clien_Id
    )

    BEGIN TRY
        IF @NumeroDeRelaciones = 0
        BEGIN
            -- Si no hay relaciones, desactivar al cliente
            UPDATE Venta.tbClientes
            SET
                Clien_Estado = 0,
                Clien_UsuarioModificacion = @Clien_UsuarioModificacion,
                Clien_FechaModificacion = @Clien_FechaModificacion
            WHERE
                Clien_Id = @Clien_Id

            SELECT 1  -- Indicar éxito
        END
        ELSE
        BEGIN
            -- Si hay relaciones, no desactivar
            SELECT 0  -- Indicar que no se puede desactivar por referencias
        END
    END TRY
    BEGIN CATCH
        SELECT -1  -- Indicar error inesperado
    END CATCH
END
