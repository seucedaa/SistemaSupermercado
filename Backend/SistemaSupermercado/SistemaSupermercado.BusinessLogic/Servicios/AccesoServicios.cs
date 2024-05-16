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
        private readonly pantallaRolesRepository _pantallaRolesRepository;

        public AccesoServicios(UsuarioRepository usuariosRepositorio, RolRepository rolRepository, pantallaRolesRepository pantallaRolesRepository)
        {
            _usuarioRepository = usuariosRepositorio;
            _rolRepository = rolRepository;
            _pantallaRolesRepository = pantallaRolesRepository;
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
        public IEnumerable<tbUsuarios> obtenerCorreo(string usuario)
        {
            return _usuarioRepository.obtenerCorreo(usuario);
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
        public ServiceResult CrearRol(string rol, List<int> pantallas, int usuarioId)
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
                            Papro_UsuarioCreacion = usuarioId
                        };
                         var list = _rolRepository.InserarPaRol(pantallaPorRol);
                    }
                    return result.Ok(new { success = true, message = "Rol actualizado con éxito!" });
                }
                else
                {
                    var nuevoRol = new tbRoles()
                    {
                        Roles_Descripcion = rol,
                        Roles_UsuarioCreacion = usuarioId,
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
                            Papro_UsuarioCreacion = usuarioId
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

        

        public ServiceResult EditarRol(int idrol, string rol, List<int> pantallas, int usuarioId)
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
                    };


                    Editar(editarrol);

                    var pantallaPorRol = new tbPantallasPorRoles()
                    {
                        Panta_Id = pantallaId,
                        Roles_Id = idrol,
                        Papro_UsuarioCreacion = usuarioId,
                    };
                    _rolRepository.InserarPaRol(pantallaPorRol);
                }
                return result.Ok(new { success = true, message = "Rol actualizado con éxito!" });
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
                return result.Ok();
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
                return result.Ok();
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        #endregion
        #region yRoles
        public ServiceResult ListRoles()
        {
            var result = new ServiceResult();
            try
            {
                var roles = _rolRepository.ListR();
                return result.Ok(roles);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ListadoRol()
        {
            var result = new ServiceResult();
            try
            {
                var list = _rolRepository.ListR();
                return result.Ok(list);
            }

            catch (Exception ex)
            {

                return result.Error(ex.Message);
            }
        }




        public ServiceResult EditarRol(tbRoles item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _rolRepository.Update(item);
                if (list.CodeStatus > 0)
                {
                    return result.Ok("okis", list);
                }
                else
                {
                    return result.Error("Y existe un registro con ese nombre");
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex);
            }
        }
        public ServiceResult EliminarRol(string Role_Id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _rolRepository.Delete(Role_Id);
                if (list.CodeStatus > 0)
                {
                    return result.Ok($"La accion ha sido existosa", list);
                }
                else
                {
                    return result.Error("No se pudo realizar la accion");
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex);
            }
        }

        public string InsertarRol(tbRoles item)
        {
            string error = "";
            try
            {
                int result = _rolRepository.Insert(item);
                if (result == 0)
                    error = "el codigo no es valido";
                else error = result.ToString();
            }
            catch (Exception ex)
            {
                error = ex.Message;
            }
            return error;
        }

        public ServiceResult obterRol(int id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _rolRepository.Fill(id);

                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex);
            }
        }

        public ServiceResult ListadoPantallas()
        {
            var result = new ServiceResult();
            try
            {
                var list = _rolRepository.Listpantallas();
                return result.Ok(list);
            }

            catch (Exception ex)
            {

                return result.Error(ex.Message);
            }
        }
        #endregion

        #region yRolesPantalla
        public ServiceResult ListadoPantallaRoles()
        {
            var result = new ServiceResult();
            try
            {
                var list = _pantallaRolesRepository.List();
                return result.Ok(list);
            }

            catch (Exception ex)
            {

                return result.Error(ex.Message);
            }
        }

        public ServiceResult EditarRolesPantalla(tbPantallasPorRoles item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _pantallaRolesRepository.Update(item);
                if (list.CodeStatus > 0)
                {
                    return result.Ok("okis", list);
                }
                else
                {
                    return result.Error("Y existe un registro con ese nombre");
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex);
            }
        }
        public ServiceResult EliminarRolesPantalla(string Role_Id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _pantallaRolesRepository.Delete(Role_Id);
                if (list.CodeStatus > 0)
                {
                    return result.Ok($"La accion ha sido existosa", list);
                }
                else
                {
                    return result.Error("No se pudo realizar la accion");
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex);
            }
        }
        public ServiceResult InsertarRolesPantalla(tbPantallasPorRoles item)
        {
            var result = new ServiceResult();
            try
            {
                var list = _pantallaRolesRepository.Insert(item);
                if (list.CodeStatus > 0)
                {
                    return result.Ok(list);
                }
                else
                {
                    return result.Error(list);
                }
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }
        public ServiceResult obterRolesPantalla(int id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _pantallaRolesRepository.Fill(id);

                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex);
            }
        }

        public ServiceResult ObtenerRoles(int id)
        {
            var result = new ServiceResult();
            try
            {
                var list = _pantallaRolesRepository.Fill2(id);

                return result.Ok(list);
            }
            catch (Exception ex)
            {
                return result.Error(ex);
            }
        }
        #endregion
    }
}
