import * as bcrypt from 'bcryptjs';

import { ICompareHash, IHash } from '@core/contracts';
export class PasswordService implements IHash, ICompareHash {
  async hash(value: string, salt = 15): Promise<string> {
    const genSalt = bcrypt.genSaltSync(salt);
    return await bcrypt.hash(value, genSalt);
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(value, hash);
  }
}
