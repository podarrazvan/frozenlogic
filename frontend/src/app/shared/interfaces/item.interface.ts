export interface IItem {
  _id?: string;
  data: string;
  children: IItem[] |any;
  isChild: boolean;
  childOf: string;
}
