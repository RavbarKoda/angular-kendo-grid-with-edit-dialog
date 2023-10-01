export class Product {
  public ProductID: number;
  public ProductName = '';
  public Discontinued? = false;
  public UnitsInStock?: number;
  public UnitPrice = 0;
  public Category = {
    CategoryID: 0,
    CategoryName: '',
  };
}

export class Order {
  public OrderID: number;
  public CustomerID: string;
  public EmployeeID: number;
  public OrderDate: Date;
  public RequiredDate: Date;
  public ShippedDate: Date;
  public ShipVia: number;
  public Freight: number;
  public ShipName: string;
  public ShipAddress: string;
  public ShipCity: string;
  public ShipRegion: string;
  public ShipPostalCode: string;
  public ShipCountry: string;
}

export class Customer {
  public Id = '';
  public CompanyName = '';
  public ContactName = '';
  public ContactTitle = '';
  public Address?: string = '';
  public City = '';
  public PostalCode? = '';
  public Country? = '';
  public Phone? = '';
  public Fax? = '';
}

export class Category {
  public CategoryID?: number;
  public CategoryName?: string;
  public Description?: string;
}

export default class Comparator {
  equals(item, otherItem) {
    if (typeof item !== typeof otherItem) {
      return false;
    }

    const objectCache = [];
    const otherObjectCache = [];
    const getIndexFromCache = (compareObject, cacheArray) =>
      cacheArray.findIndex((item) => item === compareObject);

    switch (true) {
      case item === otherItem:
        return true;
      case typeof item !== 'object':
        return item === otherItem;
      case item === null || otherItem === null:
        return item === null && otherItem === null;
      case Object.keys(item).length !== Object.keys(otherItem).length:
        return false;
      default:
        const object = item;
        const otherObject = otherItem;

        return Object.keys(object).every((key) => {
          const hasKeyInOtherObject = Object.prototype.hasOwnProperty.call(
            otherItem,
            key
          );

          if (!hasKeyInOtherObject) {
            return false;
          }

          const cacheObjectIndex = getIndexFromCache(object[key], objectCache);
          const cacheOtherObjectIndex = getIndexFromCache(
            otherObject[key],
            otherObjectCache
          );

          if (cacheObjectIndex !== cacheOtherObjectIndex) {
            return false;
          }

          const isEqualsCacheObjects =
            cacheObjectIndex !== -1 &&
            cacheOtherObjectIndex !== -1 &&
            cacheObjectIndex === cacheOtherObjectIndex;

          if (isEqualsCacheObjects) {
            return true;
          }

          objectCache.push(object[key]);
          otherObjectCache.push(otherObject[key]);

          return new Comparator().equals(object[key], otherObject[key]);
        });
    }
  }
}
