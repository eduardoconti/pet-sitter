import * as bcrypt from 'bcrypt';

import { IHash } from '@core/contracts';
export class PasswordHash implements IHash {
  async hash(value: string, salt = 15): Promise<string> {
    return await bcrypt.hash(value, salt);
  }
}
