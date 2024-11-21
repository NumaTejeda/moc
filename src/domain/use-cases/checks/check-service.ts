
//Un caso de uso es un codigo que esta especializado en una tarea

interface CheckServiceUseCase {
    execute(url: string):Promise<boolean>;
}

type SuccesCallback = () => void;
type ErrorCallback = ( error: string ) => void;


//Aca vamos a inyectar dependencieas
export class CheckService implements CheckServiceUseCase {

    //inyeccion de dependecias, por el momento dos: que hacer cuando falla? que hacer cuando anda?
    /*Son de solo lectura: Una vez asignado un valor (generalmente en la inicialización), 
    no pueden ser modificadas. Esto es útil para definir propiedades que deben ser accesibles 
    públicamente pero no modificables después de su inicialización, garantizando la inmutabilidad 
    desde fuera de la clase. */
    constructor (
        private readonly successCallback: SuccesCallback,
        private readonly errorCallback: ErrorCallback
    ){}


    public async execute(url: string):Promise<boolean>{

        try {
            const req = await fetch(url);
            if(!req.ok){
                throw new Error(`Error on check service: ${ url }`)
            }
            this.successCallback();
            return true;
        } catch (error) {
            this.errorCallback(`${ error }`);
            return false;
        }

    }
}