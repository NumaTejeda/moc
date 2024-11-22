//Vamos a generar las reglas, no vamos a hacer logica

import { LogEntity, LogSeverityLevel } from "../entities/log.entity";



//Abstract impude que se creen instancias de la clase directamnte
//Esta clase abstracta va a definir el comportamiento de cualquier clase que quiera utilizar el LogDataSource
export abstract class LogDataSource {

    abstract savelog( log: LogEntity ): Promise<void>; //Cualquier origind e datos va a tener que impelemntarlo 
    abstract getLogs( severityLevel: LogSeverityLevel ): Promise<LogEntity[]>;

}

