interface IForeignkey {
  foreign: string;
  references: string;
  referenciedTable: string;
}

export interface ITableField {
  name: string;
  type: string;
  length: number;
  foreign: IForeignkey[];
}
