export class Category {
  public _id: string;
  public name: string;
  public description: string;

  public constructor(data: any = {}) {
    this._id = data._id || '';
    this.name = data.name || '';
    this.description = data.description || '';
  }

  public getID() {
    return this._id;
  }

  public toSelectItem() {
    return {id: this._id, text: this.name};
  }

}
