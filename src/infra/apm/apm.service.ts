import { Injectable } from '@nestjs/common';
//import apm from 'elastic-apm-node';
//import 'elastic-apm-node/start';

@Injectable()
export class ApmService {
  captureException(error: Error) {
    //apm.captureError(error);
    console.log(error);
  }
}
