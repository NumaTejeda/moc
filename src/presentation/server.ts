import { CheckService } from '../domain/use-cases/checks/check-service';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';



const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
    //? new PostsgresDatasourece() 
    //? new MongoDatasource() 
)


export class Server {
    public static Start(){
        console.log('Server arrancando');

        CronService.creatJob(
            '*/5 * * * * *',
            ()=>{
                const date = new Date();
                const url = 'http://localhost:3000'
                console.log( '5 seconds', date)
                new CheckService(
                    fileSystemLogRepository,
                    ()=>console.log(`${ url } is ok`),
                    ( error ) => console.log( error )
                ).execute( url );
            }
        );

    }
}
