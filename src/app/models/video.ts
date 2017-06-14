import {Config} from '../app.constants';

import {User} from './user';
import {Category} from './category';
import {Comment} from './comment';

export class Video {
  public _id: string;
  public name: string;
  public description: string;
  public thumb: string;
  public views: number;
  public stream: string;

  public owner: User;
  public category: Category;
  public comments: Array<Comment> = [];

  public createdAt: string;


  public constructor(data: any = {}) {
    this._id = data._id || '';
    this.name = data.name || '';
    this.description = data.description || '';
    this.thumb = data.thumb || '';
    this.views = data.views || '';
    this.stream = data.stream || '';
    this.owner = new User(data.owner);
    this.category = new Category(data.category);

    const comments = data.comments || [];
    for (let i in comments) {
      this.comments[i] = new Comment(data.comments[i]);
    }

    this.createdAt = data.createdAt || '';
  }

  public getID() {
    return this._id;
  }

  public getThumb() {
    // return (this.thumb !== '') ? Config.API_UPLOADS_ENDPOINT + '/uploads/' + this.thumb : '';
    return (this.thumb !== '') ? this.thumb : '';
  }
}
