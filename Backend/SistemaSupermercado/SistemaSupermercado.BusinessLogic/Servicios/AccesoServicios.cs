using SistemaSupermercado.DataAccess.Repository;
using SistemaSupermercado.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaSupermercado.BusinessLogic.Servicios
{
    public class AccesoServicios
    {
        private readonly UsuarioRepository _usuarioRepository;
        private readonly RolRepository _rolRepository;

        public AccesoServicios(UsuarioRepository usuariosRepositorio, RolRepository rolRepository)
        {
            _usuarioRepository = usuariosRepositorio;
            _rolRepository = rolRepository;
        }


        #region Usuarios
        public ServiceResult ListarUsua()
        {
            var result = new ServiceResult();
            try
            {
                var lost = _usuarioRepository.List();

                return result.Ok(lost);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }


        public ServiceResult CrearUsua(tbUsuarios item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _usuarioRepository.Insertar(item);

                if (lost.CodeStatus > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    lost.MessageStatus = (lost.CodeStatus == 0) ? "401 Error de consulta" : lost.MessageStatus;
                    return result.Error(lost);
                }


            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult LoginUsuario(string usuario, string contraseña)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _usuarioRepository.Login(usuario, contraseña);

                return result.Ok(lost);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }



        public ServiceResult InsertPersona(tbPersonas item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _usuarioRepository.InsertarPers(item);

                if (lost.CodeStatus > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    lost.MessageStatus = (lost.CodeStatus == 0) ? "401 Error de consulta" : lost.MessageStatus;
                    return result.Error(lost);
                }


            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }

        }

        public ServiceResult RegistrarUsu(tbUsuarios item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _usuarioRepository.RegistrarUsu(item);

                if (lost.CodeStatus > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    lost.MessageStatus = (lost.CodeStatus == 0) ? "401 Error de consulta" : lost.MessageStatus;
                    return result.Error(lost);
                }


            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }

        }

        public ServiceResult Registrar(tbPersonas item)
        {
            var result = new ServiceResult();
            try
            {
                var nuevaPersona = new tbPersonas()
                {
                    Perso_DNI = item.Perso_DNI,
                    Perso_Nombre = item.Perso_Nombre,
                    Perso_Apellido = item.Perso_Apellido,
                    Perso_Correo = item.Perso_Correo,
                    Perso_FechaNacimiento = item.Perso_FechaNacimiento,
                    Perso_Sexo = item.Perso_Sexo,
                    Perso_Direccion = item.Perso_Direccion,
                    Estc_Id = item.Estc_Id,
                    Ciud_id = item.Ciud_id
                };

                int persid = 0;

                var insertar = InsertPersona(nuevaPersona);
                if (!insertar.Success)
                {
                    return insertar.Error();
                }
                else
                {

                    nuevaPersona.Perso_Id = _usuarioRepository.PersNuevoId();
                    persid = nuevaPersona.Perso_Id;
                }

                var nuevousuario = new tbUsuarios()
                {
                    Usua_Usuario = item.Usua_Usuario,
                    Usua_Contraseña = item.Usua_Contraseña,
                    Perso_Id = persid,
                };
                int usuarioid = 0;

                var registrar = RegistrarUsu(nuevousuario);
                if (!registrar.Success)
                {
                    return registrar.Error();
                }
                else
                {
                    nuevousuario.Usua_Id = _usuarioRepository.UsuaNuevoId();
                    usuarioid = nuevousuario.Usua_Id;
                }

                var nuevoregistro = new tbRegistros()
                {
                    Regi_MiCredito = item.Regi_MiCredito,
                    Perso_Id = persid,
                    Regi_UsuarioCreacion = usuarioid
                };

                var lost = _usuarioRepository.Registro(nuevoregistro);

                return result.Ok(lost);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public IEnumerable<tbUsuarios> LlenarUsu(int id)
        {
            return _usuarioRepository.ObtenerID(id);
        }

        public IEnumerable<tbUsuarios> DetallesUsu(int id)
        {
            return _usuarioRepository.Detalless(id);
        }


        public IEnumerable<tbUsuarios> obtenerCorreo(string usuario)
        {
            return _usuarioRepository.obtenerCorreo(usuario);
        }

        public ServiceResult ActualizarUsua(tbUsuarios item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _usuarioRepository.Actualizar(item);

                if (lost.CodeStatus > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    lost.MessageStatus = (lost.CodeStatus == 0) ? "401 Error de consulta" : lost.MessageStatus;
                    return result.Error(lost);
                }


            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult Reestablecer(string codigo, string contraseña)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _usuarioRepository.Reestablecer(codigo, contraseña);

                if (lost.CodeStatus > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    lost.MessageStatus = (lost.CodeStatus == 0) ? "401 Error de consulta" : lost.MessageStatus;
                    return result.Error(lost);
                }


            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }


        public ServiceResult InsertarCodigo(string usuario, string codigo)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _usuarioRepository.InsertarCodigo(usuario, codigo);

                if (lost.CodeStatus > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    lost.MessageStatus = (lost.CodeStatus == 0) ? "401 Error de consulta" : lost.MessageStatus;
                    return result.Error(lost);
                }


            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }


        public ServiceResult ElimUsua(int? id)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _usuarioRepository.Eliminar(id);

                if (lost.CodeStatus > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    lost.MessageStatus = (lost.CodeStatus == 0) ? "401 Error de consulta" : lost.MessageStatus;
                    return result.Error(lost);
                }


            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        #endregion

        #region Roles
        public ServiceResult ListarRol()
        {
            var result = new ServiceResult();
            try
            {
                var lost = _rolRepository.List();

                return result.Ok(lost);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public IEnumerable<tbRoles> Detalles(int id)
        {
            return _rolRepository.Detalless(id);
        }


        public ServiceResult ListarPant()
        {
            var result = new ServiceResult();
            try
            {
                var lost = _rolRepository.ListPant();

                return result.Ok(lost);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ListPantdelRol(int id)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _rolRepository.ListPadelRol(id);

                return result.Ok(lost);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }




        public ServiceResult Insertar(tbRoles item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _rolRepository.Insertar(item);

                if (lost.CodeStatus > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    lost.MessageStatus = (lost.CodeStatus == 0) ? "401 Error de consulta" : lost.MessageStatus;
                    return result.Error(lost);
                }


            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }

        }

        public ServiceResult ElimRol(int? id)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _rolRepository.Eliminar(id);

                if (lost.CodeStatus > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    lost.MessageStatus = (lost.CodeStatus == 0) ? "401 Error de consulta" : lost.MessageStatus;
                    return result.Error(lost);
                }


            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        public ServiceResult Editar(tbRoles item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _rolRepository.Actualizar(item);

                if (lost.CodeStatus > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    lost.MessageStatus = (lost.CodeStatus == 0) ? "401 Error de consulta" : lost.MessageStatus;
                    return result.Error(lost);
                }


            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }

        }
        public ServiceResult CrearRol(string rol, List<int> pantallas, int usuarioId, DateTime fechaCreacion)
        {
            var result = new ServiceResult();
            try
            {
                var rolExistente = _rolRepository.ObtenerRol(rol);
                if (rolExistente != null)
                {
                    var roleId = rolExistente.Rol_Id;

                    foreach (var pantallaId in pantallas)
                    {
                        var pantallaPorRol = new tbPantallasPorRoles()
                        {
                            Pant_Id = pantallaId,
                            Rol_Id = roleId,
                            PaRo_UsuarioCreacion = usuarioId,
                            PaRo_FechaCreacion = fechaCreacion
                        };
                        _rolRepository.InserarPaRol(pantallaPorRol);
                    }
                    return result.Ok(new { success = true, message = "Rol actualizado con éxito!" });
                }
                else
                {
                    var nuevoRol = new tbRoles()
                    {
                        Rol_Rol = rol,
                        Rol_UsuarioCreacion = usuarioId.ToString(),
                        Rol_FechaCreacion = fechaCreacion
                    };

                    int rolId = 0;

                    var insertar = Insertar(nuevoRol);
                    if (!insertar.Success)
                    {
                        return insertar.Error();
                    }
                    else
                    {

                        nuevoRol.Rol_Id = _rolRepository.RolNuevoId();
                        rolId = nuevoRol.Rol_Id;
                    }

                    foreach (var pantallaId in pantallas)
                    {
                        var pantallaPorRol = new tbPantallasPorRoles()
                        {
                            Pant_Id = pantallaId,
                            Rol_Id = rolId,
                            PaRo_UsuarioCreacion = usuarioId,
                            PaRo_FechaCreacion = fechaCreacion
                        };
                        _rolRepository.InserarPaRol(pantallaPorRol);
                    }
                    return result.Ok(new { success = true, message = "Rol creado con éxito!" });
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarPantallaDelRol(int roleId, List<int> pantallasd)
        {
            var result = new ServiceResult();
            try
            {
                foreach (var pantallaId in pantallasd)
                {
                    var pantallaPorRol = _rolRepository.ListPaRol().FirstOrDefault(p => p.Rol_Id == roleId && p.Pant_Id == pantallaId);
                    if (pantallaPorRol != null)
                    {
                        var lost = _rolRepository.EliminarPaRol(pantallaPorRol);


                    }
                }
                return result.Ok(new { success = true, message = "Rol creado con éxito!" });
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EditarRol(int idrol, string rol, List<int> pantallas, int usuarioId, DateTime fechaCreacion)
        {
            var result = new ServiceResult();
            try
            {


                foreach (var pantallaId in pantallas)
                {
                    var editarrol = new tbRoles()
                    {
                        Rol_Id = idrol,
                        Rol_Rol = rol,
                        Rol_UsuarioModificacion = usuarioId.ToString(),
                        Rol_FechaModificacion = fechaCreacion
                    };


                    Editar(editarrol);

                    var pantallaPorRol = new tbPantallasPorRoles()
                    {
                        Pant_Id = pantallaId,
                        Rol_Id = idrol,
                        PaRo_UsuarioCreacion = usuarioId,
                        PaRo_FechaCreacion = fechaCreacion
                    };
                    _rolRepository.InserarPaRol(pantallaPorRol);
                }
                return result.Ok(new { success = true, message = "Rol actualizado con éxito!" });
                //solo hay que hacer que del java envie el id del rol a editar, descripcion rol y pantallas
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult EliminarPantallaRol(int roleId, List<int> pantallasd)
        {
            var result = new ServiceResult();
            try
            {
                foreach (var pantallaId in pantallasd)
                {
                    var pantallaPorRol = _rolRepository.ListPaRol().FirstOrDefault(p => p.Rol_Id == roleId && p.Pant_Id == pantallaId);
                    if (pantallaPorRol != null)
                    {
                        var lost = _rolRepository.EliminarPaRol(pantallaPorRol);


                    }
                }
                return result.Ok(new { success = true, message = "Rol creado con éxito!" });
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        public ServiceResult ActualizarRol(tbRoles item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _rolRepository.Actualizar(item);

                if (lost.CodeStatus > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    lost.MessageStatus = (lost.CodeStatus == 0) ? "401 Error de consulta" : lost.MessageStatus;
                    return result.Error(lost);
                }


            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ElimRon(int? id)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _rolRepository.Eliminar(id);

                if (lost.CodeStatus > 0)
                {
                    return result.Ok(lost);
                }
                else
                {
                    lost.MessageStatus = (lost.CodeStatus == 0) ? "401 Error de consulta" : lost.MessageStatus;
                    return result.Error(lost);
                }


            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion
    }
}
