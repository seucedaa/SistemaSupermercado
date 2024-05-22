//export interface Rol {
  //  roles_Id?: number;
    //roles_Descripcion?: string;
    //panta_Id?:number;
    //roles_UsuarioCreacion?: number;
    //roles_FechaCreacion?: string;
    //roles_UsuarioModificacion?: number;
    //roles_FechaModificacion?: string;
    //usuarioCreacion?: string;
    //usuarioModificacion?: string;
    //pantallas?: string[];
    //pantallasD?: string[];
//}

export class Rol{
    roles_Id?:string;
    roles_Descripcion?:String;
}

export class RolEnviar {
    Roles_Id?:String;
    txtRol: string;
    pantallasSeleccionadas: any;
}
export class dropRol{
    value?:String;
    text?:String;
}

export class Fill {
    Roles_Id: string;
    Panta_Id: string;
    Roles_Descripcion: string;
    usuarioCreacion: string;
    usuarioModificacion: string;
    fechaCreacion : string;
    fechaModificacion : string;
}