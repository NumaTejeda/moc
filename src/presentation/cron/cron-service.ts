//Adaptador cron

import { CronJob } from 'cron'

type CronTime = string | Date;
type OnTick = ()=>void;

export class CronService {

    public static creatJob( cronTime: CronTime, onTick: OnTick): CronJob{
        /* examples https://github.com/kelektiv/node-cron */

        const job = new CronJob( cronTime, onTick );

        job.start();
        return job;
    }
}