import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import fs from "fs";


export class FileSystemDatasource implements LogDataSource{

    private readonly logPath = 'logs/';
    private readonly allLogsPath = 'logs/logs-all.log';
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    private readonly highLogsPath = 'logs/logs-high.log';


    constructor(){
        this.createLogFiles();
    }

    private createLogFiles = ()=>{
        if(! fs.existsSync(this.logPath) ){
            fs.mkdirSync(this.logPath); //crear carpeta
        }

        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath
        ].forEach( path => {
            if( fs.existsSync(path) ) return ;
            fs.writeFileSync(path, '', 'utf8');
           
        })
    }

    async savelog(newLog: LogEntity): Promise<void> {
        
        const logAsJSON = `${ JSON.stringify(newLog)}\n`

        fs.appendFileSync(this.allLogsPath, logAsJSON)

        if(newLog.level === LogSeverityLevel.low) return;
        if(newLog.level === LogSeverityLevel.medium){
            fs.appendFileSync(this.mediumLogsPath, logAsJSON);
        } else{
            fs.appendFileSync(this.highLogsPath, logAsJSON);
        }
        return;
    }

    private getLogsFromFile = ( path: string ): LogEntity[] => {
        const content = fs.readFileSync(path, 'utf8');

        // const logs = content.split('\n').map(LogEntity.fromJson) -> es lo mismo que el codigo de abajo.
        const logs = content.split('\n').map( 
            log =>  LogEntity.fromJson(log)
        );

        return logs; 
    }


    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

        switch (severityLevel) {
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.allLogsPath);
            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumLogsPath);;
            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.highLogsPath);;
            default: 
                throw new Error(`${ severityLevel } not implemented`);
        }
    }
    
}