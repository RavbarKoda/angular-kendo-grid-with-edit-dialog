export class ListItemAction {
  constructor(public Action: string = 'None') {}
}
export class EmlPredalMapa extends ListItemAction {
  IdEpm: number = -1;
  IdEmp: number = -1;
  ImeMape: string = '';
  NazivMape: string = '';
}
