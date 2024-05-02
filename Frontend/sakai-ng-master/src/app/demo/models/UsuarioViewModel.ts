export interface Usuario{
    usuar_Id?:number;
    perso_NombreCompleto?:string;
    administrador?:string;
    usuar_Usuario?:String;
    usuar_Correo?:String;
    perso_Tipo?:boolean;
    perso_Id?:number;
    roles_Id?:number;
    roles_Descripcion?:string;
    usuar_Admin?:string;
    usuar_UltimaSesion?:Date;
    usuar_UsuarioCreacion?: number;
    usuar_FechaCreacion?:string;
    usuar_UsuarioModificacion?:number;
    usuar_FechaModificacion?:string;
}