import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'; // Import the environment

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public baseUrl = environment.apiBaseUrl; // Use the base URL from environment

  constructor() {}
}

export class UsuarioEndPoints{
  public api = new ApiService();

  public List():string{
    return `${this.api.baseUrl}/Usuario/List`;
  }

  public Login(usuario: string, contrasena: string):string{
    return `${this.api.baseUrl}/Usuario/Login/${usuario}/${contrasena}`; 
  }
}
export class ReporteEndPoints{
  public api = new ApiService();

  public Generarpdf(Sucur_Id: number,nombre:string):string{
    return `${this.api.baseUrl}/Reporte/Generarpdf/${Sucur_Id}/${nombre}`;
  }
  public Generarpdf2(nombre:string):string{
    return `${this.api.baseUrl}/Reporte/Generarpdf2/${nombre}`;
  }

  public PDFProductos(Sucur_Id: number, inicio:string, fin:string,nombre:string):string{
    return `${this.api.baseUrl}/Reporte/PDFProductos/${Sucur_Id}/${inicio}/${fin}/${nombre}`;
  }
  public PDFProductos2(inicio:string, fin:string,nombre:string):string{
    return `${this.api.baseUrl}/Reporte/PDFProductos2/${inicio}/${fin}/${nombre}`;
  }

  public PDFClientes(inicio:string, fin:string,nombre:string):string{
    return `${this.api.baseUrl}/Reporte/PDFClientes/${inicio}/${fin}/${nombre}`;
  }

  public PDFVentas(Sucur_Id: number, inicio:string, fin:string,nombre:string):string{
    return `${this.api.baseUrl}/Reporte/PDFVentas/${Sucur_Id}/${inicio}/${fin}/${nombre}`;
  }
  public PDFVentas2(inicio:string, fin:string,nombre:string):string{
    return `${this.api.baseUrl}/Reporte/PDFVentas2/${inicio}/${fin}/${nombre}`;
  }
}

export class RolEndPoints{
  public api = new ApiService();

  public List():string{
    return `${this.api.baseUrl}/Rol/List`;
  }

  public Insert():string{
    return `${this.api.baseUrl}/Rol/Insertar`; 
  }

  public Elimparo():string{
    return `${this.api.baseUrl}/Rol/EliminarPantallaRol`; 
  }

  public Elimparol():string{
    return `${this.api.baseUrl}/Rol/EliminarPantalladelRol`; 
  }

  public Update():string{
    return `${this.api.baseUrl}/Rol/Actualizar`; 
  }

  public Details(id: string):string{
    return `${this.api.baseUrl}/Rol/Detalle/${id}`; 
  }

  public Delete(id: string):string{
    return `${this.api.baseUrl}/Rol/Eliminar/${id}`; 
  }
  public PantdelRol(id: string):string{
    return `${this.api.baseUrl}/PantallaporRol/PantdelRol/${id}`;
  }
}

export class PantallaEndPoints{
  public api = new ApiService();

  public List():string{
    return `${this.api.baseUrl}/Pantalla/List`;
  }

 
}

export class PantallaporRolEndPoints{
  public api = new ApiService();

  public List(id:string):string{
    return `${this.api.baseUrl}/PantallaporRol/PantdelRol/${id}`;
  }
 
}

export class CargoEndPoints{
  public api = new ApiService();

  public List():string{
    return `${this.api.baseUrl}/Cargo/List`;
  }

  public Insert():string{
    return `${this.api.baseUrl}/Cargo/Insertar`; 
  }

  public Update():string{
    return `${this.api.baseUrl}/Cargo/Actualizar`; 
  }

  public Delete(id: string):string{
    return `${this.api.baseUrl}/Cargo/Eliminar/${id}`; 
  }
}

export class ClienteEndPoints{
  public api = new ApiService();

  public List():string{
    return `${this.api.baseUrl}/Cliente/List`;
  }

  public Total():string{
    return `${this.api.baseUrl}/Cliente/Total`;
  }

  public Insert():string{
    return `${this.api.baseUrl}/Cliente/Insertar`; 
  }

  public Update():string{
    return `${this.api.baseUrl}/Cliente/Actualizar`; 
  }

  public Details(id: string):string{
    return `${this.api.baseUrl}/Cliente/Detalle/${id}`; 
  }

  public Delete(id: string):string{
    return `${this.api.baseUrl}/Cliente/Eliminar/${id}`; 
  }

  public Genero(sucursal: number):string{
    return `${this.api.baseUrl}/Cliente/Genero/${sucursal}`; 
  }
}

export class CategoriaEndPoints{
  public api = new ApiService();

  public List():string{
    return `${this.api.baseUrl}/Categoria/List`;
  }

  public CategoriaTotal(sucursal: number, inicio: string , fin: string):string{
    return `${this.api.baseUrl}/Categoria/Total/${sucursal}/${inicio}/${fin}`; 
  }

  public Todas(inicio: string , fin: string):string{
    return `${this.api.baseUrl}/Categoria/Todas/${inicio}/${fin}`; 
  }

  public Insert():string{
    return `${this.api.baseUrl}/Categoria/Insertar`; 
  }

  public Update():string{
    return `${this.api.baseUrl}/Categoria/Actualizar`; 
  }

  public Details(id: string):string{
    return `${this.api.baseUrl}/Categoria/Detalle/${id}`; 
  }

  public Delete(id: string):string{
    return `${this.api.baseUrl}/Categoria/Eliminar/${id}`; 
  }
}

export class DepartamentoEndPoints{
  public api = new ApiService();

  public List():string{
    return `${this.api.baseUrl}/Departamento/List`;
  }

  public Insert():string{
    return `${this.api.baseUrl}/Departamento/Insertar`; 
  }

  public Update():string{
    return `${this.api.baseUrl}/Departamento/Actualizar`; 
  }

  public Details(id: string):string{
    return `${this.api.baseUrl}/Departamento/Detalle/${id}`; 
  }

  public Delete(id: string):string{
    return `${this.api.baseUrl}/Departamento/Eliminar/${id}`; 
  }
}

export class EmpleadoEndPoints{
  public api = new ApiService();

  public List():string{
    return `${this.api.baseUrl}/Empleado/List`;
  }

  public Insert():string{
    return `${this.api.baseUrl}/Empleado/Insertar`; 
  }

  public Update():string{
    return `${this.api.baseUrl}/Empleado/Actualizar`; 
  }

  public Details(id: string):string{
    return `${this.api.baseUrl}/Empleado/Detalle/${id}`; 
  }

  public Delete(id: string):string{
    return `${this.api.baseUrl}/Empleado/Eliminar/${id}`; 
  }
}

export class EstadoCivilEndPoints{
  public api = new ApiService();

  public List():string{
    return `${this.api.baseUrl}/EstadoCivil/List`;
  }

  public Insert():string{
    return `${this.api.baseUrl}/EstadoCivil/Insertar`; 
  }

  public Update():string{
    return `${this.api.baseUrl}/EstadoCivil/Actualizar`; 
  }

  public Details(id: string):string{
    return `${this.api.baseUrl}/EstadoCivil/Detalle/${id}`; 
  }

  public Delete(id: string):string{
    return `${this.api.baseUrl}/EstadoCivil/Eliminar/${id}`; 
  }
}

export class ImpuestoEndPoints{
  public api = new ApiService();

  public List():string{
    return `${this.api.baseUrl}/Impuesto/List`;
  }

  public Insert():string{
    return `${this.api.baseUrl}/Impuesto/Insertar`; 
  }

  public Update():string{
    return `${this.api.baseUrl}/Impuesto/Actualizar`; 
  }

  public Details(id: string):string{
    return `${this.api.baseUrl}/Impuesto/Detalle/${id}`; 
  }

  public Delete(id: string):string{
    return `${this.api.baseUrl}/Impuesto/Eliminar/${id}`; 
  }
}

export class LoteEndPoints{
  public api = new ApiService();

  public List():string{
    return `${this.api.baseUrl}/Lote/List`;
  }

  public Insert():string{
    return `${this.api.baseUrl}/Lote/Insertar`; 
  }

  public Update():string{
    return `${this.api.baseUrl}/Lote/Actualizar`; 
  }

  public Details(id: string):string{
    return `${this.api.baseUrl}/Lote/Detalle/${id}`; 
  }

  public Delete(id: string):string{
    return `${this.api.baseUrl}/Lote/Eliminar/${id}`; 
  }
}

export class MunicipioEndPoints{
  public api = new ApiService();

  public List():string{
    return `${this.api.baseUrl}/Municipio/List`;
  }

  public ListporDept(id: string):string{
    return `${this.api.baseUrl}/Municipio/ListporDept/${id}`;
  }

  public Insert():string{
    return `${this.api.baseUrl}/Municipio/Insertar`; 
  }

  public Update():string{
    return `${this.api.baseUrl}/Municipio/Actualizar`; 
  }

  public Details(id: string):string{
    return `${this.api.baseUrl}/Municipio/Detalle/${id}`; 
  }

  public Delete(id: string):string{
    return `${this.api.baseUrl}/Municipio/Eliminar/${id}`; 
  }
}

export class ProductoEndPoints{
  public api = new ApiService();

  public List():string{
    return `${this.api.baseUrl}/Producto/List`;
  }

  public Existencia(sucursal: number):string{
    return `${this.api.baseUrl}/Producto/Existencia/${sucursal}`; 
  }
  public ExisTodas():string{
    return `${this.api.baseUrl}/Producto/ExisTodas`; 
  }
  public Top(sucursal: number):string{
    return `${this.api.baseUrl}/Producto/Top/${sucursal}`; 
  }
  public Ventas(sucursal: number, inicio: string, fin: string):string{
    return `${this.api.baseUrl}/Producto/Ventas/${sucursal}/${inicio}/${fin}`; 
  }
  public Todas(inicio: string , fin: string):string{
    return `${this.api.baseUrl}/Producto/Todas/${inicio}/${fin}`; 
  }
  public Principal(sucursal: number):string{
    return `${this.api.baseUrl}/Producto/Principal/${sucursal}`; 
  }
}

export class SubCategoriaEndPoints{
  public api = new ApiService();

  public List():string{
    return `${this.api.baseUrl}/SubCategoria/List`;
  }

  public SubCategoriaTotal(sucursal: number, inicio: string, fin: string):string{
    return `${this.api.baseUrl}/SubCategoria/TotalSub/${sucursal}/${inicio}/${fin}`; 
  }
  public Todas(inicio: string , fin: string):string{
    return `${this.api.baseUrl}/SubCategoria/Todas/${inicio}/${fin}`; 
  }
}

export class VentaEncabezadoEndPoints{
  public api = new ApiService();

  public List():string{
    return `${this.api.baseUrl}/Cliente/List`;
  }

  public Total():string{
    return `${this.api.baseUrl}/VentaEncabezado/Total`;
  }
}
