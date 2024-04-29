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
				emp.Emple_Id AS Emple_Id,
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