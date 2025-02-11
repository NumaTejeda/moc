

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
    public createdAt: Date;

    constructor( message: string, level: LogSeverityLevel,){

        this.message = message;
        this.level = level;
        this.createdAt = new Date();

    }
    //{ "level": "low", "message": "abc", "createdAt": "2015-10-10T00:00:"}
    static fromJson = ( json: string): LogEntity => {
        const { level, message, createdAt } = JSON.parse(json);
        
        const log = new LogEntity(message, level);
        log.createdAt = new Date(createdAt);
        return log;



        
        // if( !message ) throw new Error('Message is required')
        // if( !level ) throw new Error('Level is required')
        // if( !createdAt ) throw new Error('CreatedAt is required')
    }
}