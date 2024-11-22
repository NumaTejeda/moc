

import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

//? El log repository es quien me a permitir comunicarme con el DataSource,
export abstract class LogRepository  {

    abstract savelog( log: LogEntity ): Promise<void>; //Cualquier origind e datos va a tener que impelemntarlo 
    abstract getLogs( severityLevel: LogSeverityLevel ): Promise<LogEntity[]>;

}