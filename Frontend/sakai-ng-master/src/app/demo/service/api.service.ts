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

  public Insert():string{
    return `${this.api.baseUrl}/Usuario/Insertar`; 
  }

  public Update():string{
    return `${this.api.baseUrl}/Usuario/Actualizar`; 
  }

  public Details(id: string):string{
    return `${this.api.baseUrl}/Usuario/Detalle/${id}`; 
  }

  public Delete(id: string):string{
    return `${this.api.baseUrl}/Usuario/Eliminar/${id}`; 
  }

  public Login(usuario: string, contrasena: string): string{
    return `${this.api.baseUrl}/Usuario/Login/${usuario},${contrasena}`; 
  }

  // public getLoginUrl(usuario: string, contrasena: string): string {
  //   return `${this.api.baseUrl}/Usuario/Login/${usuario}/${contrasena}`;
  // }
  
  public Recuperacion(usuario: string):string{
    return `${this.api.baseUrl}/Usuario/StartRecovery/${usuario}`; 
  }

  public Reestablecer(codigo:string, contrasena:string):string{
    return `${this.api.baseUrl}/Usuario/Reestablecer/${codigo},${contrasena}`; 
  }
}
export class ReporteEndPoints{
  public api = new ApiService();

  public Stock(Sucur_Id: number): string {
    return `${this.api.baseUrl}/Reporte/Stock/${Sucur_Id}`;
}
  

  public TodasStock():string{
    return `${this.api.baseUrl}/Reporte/TodasStock`; 
  }

  public Productos(Sucur_Id: number,inicio:string,fin:string):string{
    return `${this.api.baseUrl}/Reporte/Productos/${Sucur_Id}/${inicio}/${fin}`; 
  }

  public TodasProductos(inicio:string,fin:string):string{
    return `${this.api.baseUrl}/Reporte/TodasProductos/${inicio}/${fin}`; 
  }
  public Clientes(inicio:string,fin:string):string{
    return `${this.api.baseUrl}/Reporte/Clientes/${inicio}/${fin}`; 
  }
  public Ventas(Sucur_Id: number,inicio:string,fin:string):string{
    return `${this.api.baseUrl}/Reporte/Ventas/${Sucur_Id}/${inicio}/${fin}`; 
  }

  public TodasVentas(inicio:string,fin:string):string{
    return `${this.api.baseUrl}/Reporte/TodasVentas/${inicio}/${fin}`; 
  }

  public Promocion(Sucur_Id: number,inicio:string,fin:string):string{
    return `${this.api.baseUrl}/Reporte/Promocion/${Sucur_Id}/${inicio}/${fin}`; 
  }

  public TodasPromocion(inicio:string,fin:string):string{
    return `${this.api.baseUrl}/Reporte/TodasPromocion/${inicio}/${fin}`; 
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

  public Details(id: string):string{
    return `${this.api.baseUrl}/Cargo/Detalle/${id}`; 
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

export class PromocionEndPoints{
  public api = new ApiService();

  public Insert():string{
    return `${this.api.baseUrl}/Promocion/Insertar`; 
  }

  public Update():string{
    return `${this.api.baseUrl}/Promocion/Actualizar`; 
  }

  public Details(id: string):string{
    return `${this.api.baseUrl}/Promocion/Detalle/${id}`; 
  }

  public Delete(id: string):string{
    return `${this.api.baseUrl}/Promocion/Eliminar/${id}`; 
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

  public Insert():string{
    return `${this.api.baseUrl}/Producto/Insertar`; 
  }

  public Update():string{
    return `${this.api.baseUrl}/Producto/Actualizar`; 
  }

  public Details(id: string):string{
    return `${this.api.baseUrl}/Producto/Detalle/${id}`; 
  }

  public Delete(id: string):string{
    return `${this.api.baseUrl}/Producto/Eliminar/${id}`; 
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

  public ListporCat(id: string):string{
    return `${this.api.baseUrl}/SubCategoria/DropDownList/${id}`;
  }

  
  public Insert():string{
    return `${this.api.baseUrl}/SubCategoria/Insertar`; 
  }

  public Update():string{
    return `${this.api.baseUrl}/SubCategoria/Actualizar`; 
  }

  public Details(id: string):string{
    return `${this.api.baseUrl}/SubCategoria/Detalle/${id}`; 
  }

  public Delete(id: string):string{
    return `${this.api.baseUrl}/SubCategoria/Eliminar/${id}`; 
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
