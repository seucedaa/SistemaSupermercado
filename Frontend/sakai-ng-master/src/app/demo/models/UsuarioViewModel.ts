
export interface Usuario{
    usuar_Id?:number;
    usuar_Correo?:string;
    usuar_Usuario?:string;
    usuar_Contrasena?:string;
    perso_Id?:number;
    perso_Tipo?:boolean;
    perso_NombreCompleto?:string;
    roles_Id?:number;
    roles_Descripcion?:string;
    usuar_Admin?:Boolean;
    usuar_UltimaSesion?:Date;
}