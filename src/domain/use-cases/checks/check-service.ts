
//Un caso de uso es un codigo que esta especializado en una tarea

import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
    execute(url: string):Promise<boolean>;
}

type SuccesCallback = (() => void) | undefined;
type ErrorCallback = (( error: string ) => void) | undefined;


//Aca vamos a inyectar dependencieas
export class CheckService implements CheckServiceUseCase {

    //inyeccion de dependecias, por el momento dos: que hacer cuando falla? que hacer cuando anda?
    /*Son de solo lectura: Una vez asignado un valor (generalmente en la inicialización), 
    no pueden ser modificadas. Esto es útil para definir propiedades que deben ser accesibles 
    públicamente pero no modificables después de su inicialización, garantizando la inmutabilidad 
    desde fuera de la clase. */
    constructor (
        private readonly logRepository: LogRepository,
        private readonly successCallback: SuccesCallback,
        private readonly errorCallback: ErrorCallback
    ){}


    public async execute(url: string):Promise<boolean>{

        try {
            const req = await fetch(url);
            if(!req.ok){
                throw new Error(`Error on check service: ${ url }`)
            }
            const log = new LogEntity(`Service  ${ url} working`, LogSeverityLevel.low );
            this.logRepository.savelog( log )
            this.successCallback && this.successCallback();
            return true;
        } catch (error) {
            const errorMessage = `${ url } is not ok.  ${ error }`
            const log = new LogEntity(errorMessage, LogSeverityLevel.high );
            this.logRepository.savelog( log )
            this.errorCallback && this.errorCallback(errorMessage);
            return false;
        }

    }
}