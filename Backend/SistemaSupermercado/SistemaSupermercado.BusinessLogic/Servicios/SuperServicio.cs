using SistemaSupermercado.DataAccess.Repository;
using SistemaSupermercado.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaSupermercado.BusinessLogic.Servicios
{
    public class SuperServicio
    {
        private readonly EmpleadoRepository _empleadoRepository;
        private readonly LoteRepository _loteRepository;
        private readonly ProductoRepository _productoRepository;
        private readonly PromocionRepository _promocionRepository;
        private readonly ProveedorRepository _proveedorRepository;
        private readonly SucursalRepository _sucursalRepository;

        public SuperServicio(EmpleadoRepository empleadoRepository, LoteRepository loteRepository, ProductoRepository productoRepository, PromocionRepository promocionRepository, ProveedorRepository proveedorRepository, SucursalRepository sucursalRepository)
        {
            _empleadoRepository = empleadoRepository;
            _loteRepository = loteRepository;
            _productoRepository = productoRepository;
            _promocionRepository = promocionRepository;
            _proveedorRepository = proveedorRepository;
            _sucursalRepository = sucursalRepository;
        }

        #region Empleados
        public ServiceResult ListarEmple()
        {
            var result = new ServiceResult();
            try
            {
                var lost = _empleadoRepository.List();

                return result.Ok(lost);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }


        public ServiceResult InsertarEmple(tbEmpleados item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _empleadoRepository.Insertar(item);

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



        public IEnumerable<tbEmpleados> DetallesEmple(int id)
        {
            return _empleadoRepository.Buscar(id);
        }

        public ServiceResult ModificarEmple(tbEmpleados item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _empleadoRepository.Modificar(item);

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

        public ServiceResult EliminarEmple(int? id)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _empleadoRepository.Eliminar(id);

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

        #region Lotes
        public ServiceResult ListarLote()
        {
            var result = new ServiceResult();
            try
            {
                var lost = _loteRepository.List();


                return result.Ok(lost);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }


        public ServiceResult CrearLote(tbLotes item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _loteRepository.Insertar(item);

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

        public IEnumerable<tbLotes> LLenarLote(int id)
        {
            return _loteRepository.ObtenerID(id);
        }

        public IEnumerable<tbLotes> DetallesLote(int id)
        {
            return _loteRepository.Buscar(id);
        }

        public ServiceResult ModificarLote(tbLotes item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _loteRepository.Modificar(item);

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

        public ServiceResult EliLote(int id)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _loteRepository.Eliminar(id);

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

        #region Productos
        public ServiceResult ListarProdu()
        {
            var result = new ServiceResult();
            try
            {
                var lost = _productoRepository.List();

                return result.Ok(lost);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }


        public ServiceResult InsertarProdu(tbProductos item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _productoRepository.Insertar(item);

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



        public IEnumerable<tbProductos> DetallesProdu(int id)
        {
            return _productoRepository.Buscar(id);
        }

        public ServiceResult ModificarProdu(tbProductos item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _productoRepository.Modificar(item);

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

        public ServiceResult EliminarProdu(int? id)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _productoRepository.Eliminar(id);

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

        #region Promociones
        public ServiceResult ListarProm()
        {
            var result = new ServiceResult();
            try
            {
                var lost = _promocionRepository.List();


                return result.Ok(lost);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }


        public ServiceResult CrearProm(tbPromociones item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _promocionRepository.Insertar(item);

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

        public IEnumerable<tbPromociones> DetallesProm(int id)
        {
            return _promocionRepository.Buscar(id);
        }

        public ServiceResult ModificarProm(tbPromociones item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _promocionRepository.Modificar(item);

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

        public ServiceResult EliProm(int id)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _promocionRepository.Eliminar(id);

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

        #region Proveedores
        public ServiceResult ListarProve()
        {
            var result = new ServiceResult();
            try
            {
                var lost = _proveedorRepository.List();

                return result.Ok(lost);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }


        public ServiceResult InsertarProve(tbProveedores item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _proveedorRepository.Insertar(item);

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



        public IEnumerable<tbProveedores> DetallesProve(int id)
        {
            return _proveedorRepository.Buscar(id);
        }

        public ServiceResult ActualizaProve(tbProveedores item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _proveedorRepository.Modificar(item);

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

        public ServiceResult EliminarProve(int? id)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _proveedorRepository.Eliminar(id);

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

        #region Sucursales
        public ServiceResult ListarSucur()
        {
            var result = new ServiceResult();
            try
            {
                var lost = _sucursalRepository.List();


                return result.Ok(lost);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }


        public ServiceResult CrearSucur(tbSucursales item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _sucursalRepository.Insertar(item);

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

        public IEnumerable<tbSucursales> LLenarSucur(int id)
        {
            return _sucursalRepository.ObtenerID(id);
        }

        public IEnumerable<tbSucursales> Buscarucur(int id)
        {
            return _sucursalRepository.Buscar(id);
        }

        public ServiceResult ModificarSucur(tbSucursales item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _sucursalRepository.Modificar(item);

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

        public ServiceResult EliSucur(int id)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _sucursalRepository.Eliminar(id);

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
