import { CheckService } from '../domain/use-cases/checks/check-service';
import { CronService } from './cron/cron-service';



export class Server {
    

    public static Start(){
        console.log('Server arrancando');

        CronService.creatJob(
            '*/5 * * * * *',
            ()=>{
                const date = new Date();
                const url = 'https://google.com'
                console.log( '5 seconds', date)
                new CheckService(
                    ()=>console.log(`${ url } is ok`),
                    ( error ) => console.log( error )
                ).execute( url );
            }
        );

    }
}
