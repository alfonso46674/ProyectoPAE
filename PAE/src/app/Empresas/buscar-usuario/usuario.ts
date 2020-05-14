export class Usuario{
    uid: number;
    nombre: string;
    apellido: string;
    email: string;
    tipo: string;
    ofertasActuales: number;
    estado: string;
    password: string;
    carrera: string;
    aniosExperiencia: number;
    titulacion: string;
    salarioDeseado: number;
    constructor(uid, nombre, apellido, email, tipo, ofertasActuales, estado, password, carrera, aniosExperiencia, titulacion, salarioDeseado){
       this.uid = uid;
       this.nombre = nombre;
       this.apellido = apellido;
       this.email = email;
       this.tipo = tipo;
       this.ofertasActuales = ofertasActuales;
       this.estado = estado;
       this.password = password;
       this.carrera = carrera;
       this.aniosExperiencia = aniosExperiencia;
       this.titulacion = titulacion;
       this.salarioDeseado = salarioDeseado;
    }
}
