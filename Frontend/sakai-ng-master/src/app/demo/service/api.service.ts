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

export class ClienteEndPoints{
  public api = new ApiService();

  public List():string{
    return `${this.api.baseUrl}/Cliente/List`;
  }

  public Total():string{
    return `${this.api.baseUrl}/Cliente/Total`;
  }
}

export class CategoriaEndPoints{
  public api = new ApiService();

  public List():string{
    return `${this.api.baseUrl}/Categoria/List`;
  }

  public CategoriaTotal(sucursal: number, inicio: string, fin: string):string{
    return `${this.api.baseUrl}/Categoria/Total/${sucursal}/${inicio}/${fin}`; 
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
}

export class SubCategoriaEndPoints{
  public api = new ApiService();

  public List():string{
    return `${this.api.baseUrl}/SubCategoria/List`;
  }

  public SubCategoriaTotal(sucursal: number, inicio: string, fin: string):string{
    return `${this.api.baseUrl}/SubCategoria/TotalSub/${sucursal}/${inicio}/${fin}`; 
  }
}