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

       

        public IEnumerable<tbUsuarios> LlenarUsu(int id)
        {
            return _usuarioRepository.ObtenerID(id);
        }

        public IEnumerable<tbUsuarios> DetallesUsu(int id)
        {
            return _usuarioRepository.Buscar(id);
        }


        public ServiceResult ModificarUsua(tbUsuarios item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _usuarioRepository.Modificar(item);

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
            return _rolRepository.Buscar(id);
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
                var lost = _rolRepository.Modificar(item);

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
                    var roleId = rolExistente.Roles_Id;

                    foreach (var pantallaId in pantallas)
                    {
                        var pantallaPorRol = new tbPantallasPorRoles()
                        {
                            Panta_Id = pantallaId,
                            Roles_Id = roleId,
                            Papro_UsuarioCreacion = usuarioId,
                            Papro_FechaCreacion = fechaCreacion
                        };
                        _rolRepository.InserarPaRol(pantallaPorRol);
                    }
                    return result.Ok(new { success = true, message = "Rol actualizado con éxito!" });
                }
                else
                {
                    var nuevoRol = new tbRoles()
                    {
                        Roles_Descripcion = rol,
                        Roles_UsuarioCreacion = usuarioId,
                        Roles_FechaCreacion = fechaCreacion
                    };

                    int rolId = 0;

                    var insertar = Insertar(nuevoRol);
                    if (!insertar.Success)
                    {
                        return insertar.Error();
                    }
                    else
                    {

                        nuevoRol.Roles_Id = _rolRepository.RolNuevoId();
                        rolId = nuevoRol.Roles_Id;
                    }

                    foreach (var pantallaId in pantallas)
                    {
                        var pantallaPorRol = new tbPantallasPorRoles()
                        {
                            Panta_Id = pantallaId,
                            Roles_Id = rolId,
                            Papro_UsuarioCreacion = usuarioId,
                            Papro_FechaCreacion = fechaCreacion
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

        

        public ServiceResult EditarRol(int idrol, string rol, List<int> pantallas, int usuarioId, DateTime fechaCreacion)
        {
            var result = new ServiceResult();
            try
            {


                foreach (var pantallaId in pantallas)
                {
                    var editarrol = new tbRoles()
                    {
                        Roles_Id = idrol,
                        Roles_Descripcion = rol,
                        Roles_UsuarioModificacion = usuarioId,
                        Roles_FechaModificacion = fechaCreacion
                    };


                    Editar(editarrol);

                    var pantallaPorRol = new tbPantallasPorRoles()
                    {
                        Panta_Id = pantallaId,
                        Roles_Id = idrol,
                        Papro_UsuarioCreacion = usuarioId,
                        Papro_FechaCreacion = fechaCreacion
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

       
        public ServiceResult ModificarRol(tbRoles item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _rolRepository.Modificar(item);

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

        #region Pantallas
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
        #endregion

        #region Pantallas por Roles
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

        public ServiceResult EliminarPantallaDelRol(int roleId, List<int> pantallasd)
        {
            var result = new ServiceResult();
            try
            {
                foreach (var pantallaId in pantallasd)
                {
                    var pantallaPorRol = _rolRepository.ListPaRol().FirstOrDefault(p => p.Roles_Id == roleId && p.Panta_Id == pantallaId);
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

        public ServiceResult EliminarPantallaRol(int roleId, List<int> pantallasd)
        {
            var result = new ServiceResult();
            try
            {
                foreach (var pantallaId in pantallasd)
                {
                    var pantallaPorRol = _rolRepository.ListPaRol().FirstOrDefault(p => p.Roles_Id == roleId && p.Panta_Id == pantallaId);
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
        #endregion
    }
}
