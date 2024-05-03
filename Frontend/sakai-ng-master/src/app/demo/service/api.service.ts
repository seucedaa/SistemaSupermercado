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


export class CargoEndPoints{
  public api = new ApiService();

  public List():string{
    return `${this.api.baseUrl}/Cargo/List`;
  }

  public Insert():string{
    return `${this.api.baseUrl}/Cargo/Insertar`; 
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
