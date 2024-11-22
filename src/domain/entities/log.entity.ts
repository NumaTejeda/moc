

//Que queremos tener en log entity? Lo que nostros queremos registrar en
//nuestra applicacion

export enum LogSeverityLevel { //exportamos para que luego hacer codigo segundo nivle de severidad
    low = 'low',
    medium = 'medium',
    high = 'high',
}

export class LogEntity{


    public level: LogSeverityLevel; // enum
    public message: string;
    public creatAt: Date;

    constructor( message: string, level: LogSeverityLevel,){

        this.message = message;
        this.level = level;
        this.creatAt = new Date();

    }


}