export interface Pantalla{
    data: any;
    panta_Id?:number;
    panta_Descripcion?:String;
    panta_Esquema?:number;
    panta_UsuarioCreacion?: number;
    panta_FechaCreacion?:string;
    panta_UsuarioModificacion?:number;
    panta_FechaModificacion?:string;
    usuarioCreacion?: string;
    usuarioModificacion?: string;
}