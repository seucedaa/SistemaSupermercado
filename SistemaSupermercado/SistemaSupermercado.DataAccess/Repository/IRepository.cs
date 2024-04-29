using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaSupermercado.DataAccess.Repository
{
    interface IRepositorio<T>
    {
        public IEnumerable<T> List();

        public RequestStatus Insertar(T item);

        public RequestStatus Actualizar(T item);

        public RequestStatus Eliminar(int? id);
        public T find(int? id);

    }
}
