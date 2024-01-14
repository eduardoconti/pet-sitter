export interface IHash {
  hash(value: string, salt?: number): Promise<string>;
}

export interface ICompareHash {
  compare(value: string, hash: string): Promise<boolean>;
}
