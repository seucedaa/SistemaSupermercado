using SistemaSupermercado.DataAccess.Repository;
using SistemaSupermercado.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaSupermercado.BusinessLogic.Servicios
{
    public class GeneralServicios
    {
        private readonly CargoRepository _cargoRepository;
        private readonly CategoriaRepository _categoriaRepository;
        private readonly DepartamentoRepository _departamentoRepositorio;
        private readonly EstadoCivilRepository _estadocivilRepositorio;
        private readonly ImpuestoRepository _impuestoRepository;
        private readonly MunicipioRepository _municipiosRepositorio;
        private readonly SubCategoriaRepository _subCategoriaRepository;

        public GeneralServicios(CargoRepository cargoRepository, CategoriaRepository categoriaRepository, DepartamentoRepository departamentoRepository, EstadoCivilRepository estadoCivilRepository, MunicipioRepository municipioRepository, ImpuestoRepository impuestoRepository, SubCategoriaRepository subCategoriaRepository)
        {
            _cargoRepository = cargoRepository;
            _categoriaRepository = categoriaRepository;
            _departamentoRepositorio = departamentoRepository;
            _estadocivilRepositorio = estadoCivilRepository;
            _impuestoRepository = impuestoRepository;
            _municipiosRepositorio = municipioRepository;
            _subCategoriaRepository = subCategoriaRepository;
        }

        #region Cargos
        public ServiceResult ListarCargo()
        {
            var result = new ServiceResult();
            try
            {
                var lost = _cargoRepository.List();


                return result.Ok(lost);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }


        public ServiceResult CrearCargo(tbCargos item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _cargoRepository.Insertar(item);

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

        public IEnumerable<tbCargos> LLenarCargo(int id)
        {
            return _cargoRepository.ObtenerID(id);
        }

        public IEnumerable<tbCargos> DetallesCargo(int id)
        {
            return _cargoRepository.Detalless(id);
        }

        public ServiceResult ActualizarCargo(tbCargos item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _cargoRepository.Actualizar(item);

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

        public ServiceResult EliCargo(int id)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _cargoRepository.Eliminar(id);

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

        #region Categorias
        public ServiceResult ListarCate()
        {
            var result = new ServiceResult();
            try
            {
                var lost = _categoriaRepository.List();


                return result.Ok(lost);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }


        public ServiceResult CrearCate(tbCategorias item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _categoriaRepository.Insertar(item);

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

        public IEnumerable<tbCategorias> LLenarCate(int id)
        {
            return _categoriaRepository.ObtenerID(id);
        }

        public IEnumerable<tbCategorias> DetallesCate(int id)
        {
            return _categoriaRepository.Detalless(id);
        }

        public ServiceResult ActualizarCate(tbCategorias item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _categoriaRepository.Actualizar(item);

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

        public ServiceResult EliCategoria(int id)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _categoriaRepository.Eliminar(id);

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

        #region Departamentos

        public ServiceResult ListarDepto()
        {
            var result = new ServiceResult();
            try
            {
                var lost = _departamentoRepositorio.List();

                return result.Ok(lost);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }


        public ServiceResult CrearDepto(tbDepartamentos item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _departamentoRepositorio.Insertar(item);

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

        public IEnumerable<tbDepartamentos> LlenarDepto(int id)
        {
            return _departamentoRepositorio.ObtenerID(id);
        }

        public IEnumerable<tbDepartamentos> DetallesDepto(int id)
        {
            return _departamentoRepositorio.Detalless(id);
        }

        public ServiceResult ActualizarDepto(tbDepartamentos item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _departamentoRepositorio.Actualizar(item);

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

        public ServiceResult ElimDepto(string id)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _departamentoRepositorio.Eliminar(id);

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

        #region EstadosCiviles
        public ServiceResult ListarCivil()
        {
            var result = new ServiceResult();
            try
            {
                var lost = _estadocivilRepositorio.List();

                return result.Ok(lost);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }


        public ServiceResult CrearCivil(tbEstadosCiviles item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _estadocivilRepositorio.Insertar(item);

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

        public IEnumerable<tbEstadosCiviles> LLenarCivil(int id)
        {
            return _estadocivilRepositorio.ObtenerID(id);
        }

        public IEnumerable<tbEstadosCiviles> Detalles(int id)
        {
            return _estadocivilRepositorio.Detalless(id);
        }

        public ServiceResult ActualizarCivil(tbEstadosCiviles item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _estadocivilRepositorio.Actualizar(item);

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

        public ServiceResult ElimCivil(int? id)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _estadocivilRepositorio.Eliminar(id);

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

        #region Categorias
        public ServiceResult ListarImpue()
        {
            var result = new ServiceResult();
            try
            {
                var lost = _impuestoRepository.List();


                return result.Ok(lost);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }


        public ServiceResult CrearImpue(tbImpuestos item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _impuestoRepository.Insertar(item);

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

        public IEnumerable<tbImpuestos> LLenarImpue(int id)
        {
            return _impuestoRepository.ObtenerID(id);
        }

        public IEnumerable<tbImpuestos> DetallesImpue(int id)
        {
            return _impuestoRepository.Detalless(id);
        }

        public ServiceResult ActualizarImpue(tbImpuestos item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _impuestoRepository.Actualizar(item);

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

        public ServiceResult EliImpue(int id)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _impuestoRepository.Eliminar(id);

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

        #region Municipios


        public ServiceResult ListarMuni()
        {
            var result = new ServiceResult();
            try
            {
                var lost = _municipiosRepositorio.List();


                return result.Ok(lost);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ListarMuniporDepa(string id)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _municipiosRepositorio.ListarMuniporDepa(id);

                return result.Ok(lost);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult CrearMuni(tbMunicipios item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _municipiosRepositorio.Insertar(item);

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

        public IEnumerable<tbMunicipios> LLenarMuni(string id)
        {
            return _municipiosRepositorio.ObtenerID(id);
        }

        public IEnumerable<tbMunicipios> DetallesMuni(string id)
        {
            return _municipiosRepositorio.Detalless(id);
        }

        public ServiceResult ActualizarMuni(tbMunicipios item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _municipiosRepositorio.Actualizar(item);

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

        public ServiceResult EliMuni(string? id)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _municipiosRepositorio.Eliminar(id);

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

        #region Categorias
        public ServiceResult ListarSubCate()
        {
            var result = new ServiceResult();
            try
            {
                var lost = _subCategoriaRepository.List();


                return result.Ok(lost);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }

        public ServiceResult ListarSubcateporCate(string id)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _subCategoriaRepository.ListarSubcateporCate(id);

                return result.Ok(lost);
            }
            catch (Exception ex)
            {
                return result.Error(ex.Message);
            }
        }


        public ServiceResult CrearSubCate(tbSubcategorias item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _subCategoriaRepository.Insertar(item);

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

        public IEnumerable<tbSubcategorias> LLenarSubCate(int id)
        {
            return _subCategoriaRepository.ObtenerID(id);
        }

        public IEnumerable<tbSubcategorias> DetallesSubCate(int id)
        {
            return _subCategoriaRepository.Detalless(id);
        }

        public ServiceResult ActualizarSubCate(tbSubcategorias item)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _subCategoriaRepository.Actualizar(item);

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

        public ServiceResult EliSubCategoria(int id)
        {
            var result = new ServiceResult();
            try
            {
                var lost = _subCategoriaRepository.Eliminar(id);

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
