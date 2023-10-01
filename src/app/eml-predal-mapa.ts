export class ListItemAction {
  constructor(public Action: string = 'None') {}
}
export class EmlPredalMapa extends ListItemAction {
  public IdEpm: number = -1;
  public IdEmp: number = -1;
  public ImeMape: string = '';
  public NazivMape: string = '';

  public static equalWithoutAction(
    object1: EmlPredalMapa,
    object2: EmlPredalMapa
  ): boolean {
    const isEqual =
      object1.IdEpm === object2.IdEpm &&
      object1.IdEmp === object2.IdEmp &&
      object1.ImeMape === object2.ImeMape &&
      object1.NazivMape === object2.NazivMape;
    return isEqual;
  }
}
