using SistemaSupermercado.DataAccess.Repository;
using SistemaSupermercado.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaSupermercado.BusinessLogic.Servicios
{
    public class VentaServicio
    {
        private readonly ClienteRepository _clienteRepository;
        private readonly VentaEncabezadoRepository _ventaEncabezadoRepository;
        //private readonly VentaDetalleRepository _ventaDetalleRepository;
        private readonly UsuarioRepository _usuarioRepository;
        private readonly AccesoServicios _accesoServicios;

        public VentaServicio(UsuarioRepository usuarioRepository, AccesoServicios accesoServicios,ClienteRepository clienteRepository, VentaEncabezadoRepository ventaEncabezadoRepository/*, VentaDetalleRepository ventaDetalleRepository*/)
        {
            _clienteRepository = clienteRepository;
            _ventaEncabezadoRepository = ventaEncabezadoRepository;
            //_ventaDetalleRepository = ventaDetalleRepository;
            _usuarioRepository = usuarioRepository;
            _accesoServicios = accesoServicios;
        }

        #region Clientes
        public ServiceResult ListarClien()
        {
            var result = new ServiceResult();
            try
            {
                var lost = _clienteRepository.List();

                return result.Ok(lost);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult Totalclientes()
        {
            var result = new ServiceResult();
            try
            {
                var lost = _clienteRepository.Totalclientes();

                return result.Ok(lost);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }


        public ServiceResult InsertarClien(tbClientes item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _clienteRepository.Insertar(item);

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


        public ServiceResult Registrar(tbClientes item)
        {
            var result = new ServiceResult();
            try
            {
                var nuevocliente = new tbClientes()
                {
                    Clien_Dni = item.Clien_Dni,
                    Clien_PrimerNombre = item.Clien_PrimerNombre,
                    Clien_SegundoNombre = item.Clien_SegundoNombre,
                    Clien_PrimerApellido = item.Clien_PrimerApellido,
                    Clien_SegundoApellido = item.Clien_SegundoApellido,
                    Clien_Sexo = item.Clien_Sexo,
                    Estad_Id = item.Estad_Id,
                    Clien_Telefono = item.Clien_Telefono,
                    Munic_Id = item.Munic_Id,
                    Clien_Direccion = item.Clien_Direccion
                };

                int clienteid = 0;

                var insertar = InsertarClien(nuevocliente);
                if (!insertar.Success)
                {
                    return insertar.Error();
                }
                else
                {

                    nuevocliente.Clien_Id = _clienteRepository.ClienteNuevoId();
                    clienteid = nuevocliente.Clien_Id;
                }

                var nuevousuario = new tbUsuarios()
                {
                    Usuar_Usuario = item.Usuar_Usuario,
                    Usuar_Contrasena = item.Usuar_Contrasena,
                    Perso_Id = clienteid,
                };

                var registrar = _accesoServicios.RegistrarUsu(nuevousuario);


                return result.Ok(registrar);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }


        public IEnumerable<tbClientes> DetallesClien(int id)
        {
            return _clienteRepository.Buscar(id);
        }

        public ServiceResult ModificarClien(tbClientes item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _clienteRepository.Modificar(item);

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

        public ServiceResult EliminarClien(int? id)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _clienteRepository.Eliminar(id);

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

        //#region Venta Detalle
        //public ServiceResult ListarVeDe()
        //{
        //    var result = new ServiceResult();
        //    try
        //    {
        //        var lost = _ventaDetalleRepository.List();

        //        return result.Ok(lost);
        //    }
        //    catch (Exception ex)
        //    {
        //        return result.Error(ex.Message);
        //    }
        //}

        //public IEnumerable<tbVentasDetalle> DetallesVeDe(int id)
        //{
        //    return _ventaDetalleRepository.Buscar(id);
        //}

        //public ServiceResult EliminarVeDe(int? id)
        //{
        //    var result = new ServiceResult();
        //    try
        //    {
        //        var lost = _ventaDetalleRepository.Eliminar(id);

        //        if (lost.CodeStatus > 0)
        //        {
        //            return result.Ok(lost);
        //        }
        //        else
        //        {
        //            lost.MessageStatus = (lost.CodeStatus == 0) ? "401 Error de consulta" : lost.MessageStatus;
        //            return result.Error(lost);
        //        }


        //    }
        //    catch (Exception ex)
        //    {
        //        return result.Error(ex.Message);
        //    }
        //}
        //#endregion

        //#region Venta Encabezado
        //public ServiceResult ListarVeEn()
        //{
        //    var result = new ServiceResult();
        //    try
        //    {
        //        var lost = _ventaEncabezadoRepository.List();

        //        return result.Ok(lost);
        //    }
        //    catch (Exception ex)
        //    {
        //        return result.Error(ex.Message);
        //    }
        //}

        public ServiceResult totalventas()
        {
            var result = new ServiceResult();
            try
            {
                var lost = _ventaEncabezadoRepository.totalventas();

                return result.Ok(lost);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        //public IEnumerable<tbVentasEncabezado> DetallesVeEn(int id)
        //{
        //    return _ventaEncabezadoRepository.Buscar(id);
        //}

        //public ServiceResult EliminarVeEn(int? id)
        //{
        //    var result = new ServiceResult();
        //    try
        //    {
        //        var lost = _ventaEncabezadoRepository.Eliminar(id);

        //        if (lost.CodeStatus > 0)
        //        {
        //            return result.Ok(lost);
        //        }
        //        else
        //        {
        //            lost.MessageStatus = (lost.CodeStatus == 0) ? "401 Error de consulta" : lost.MessageStatus;
        //            return result.Error(lost);
        //        }


        //    }
        //    catch (Exception ex)
        //    {
        //        return result.Error(ex.Message);
        //    }
        //}
        //#endregion
    }
}
