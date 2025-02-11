import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";



export class LogRepositoryImpl implements LogRepository {

    constructor ( 
        private readonly logDataSource: LogDataSource, // <---- la idea es que esto pueda impelmetar cualquier data source, mongo, system, postgres
        //siempr y cuando cumpla con las implementaciones
    ){}

    async savelog(log: LogEntity): Promise<void> {
        this.logDataSource.savelog( log )
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        return this.logDataSource.getLogs( severityLevel )
    }
}
