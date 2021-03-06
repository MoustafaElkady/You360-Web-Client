import {Component, EventEmitter, OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {Router, ActivatedRoute} from '@angular/router';

import {Config} from '../../../app.constants';
import {Page} from '../../../helpers/page';

import {Category} from '../../../models/category';
import {CategoriesService} from '../../../services/categories.service';

import {Video} from '../../../models/video';
import {VideosService} from '../../../services/videos.service';

import {AlertService} from '../../../services/alert.service';

const URL = Config.API_ENDPOINT + '/api/videos/upload';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})

export class UploadComponent implements OnInit, OnDestroy {
  model: any = {tags: []};
  tmp = {tags: []};
  loading = false;
  imagePreview = '';

  public uploader: FileUploader = new FileUploader(
    {
      url: URL,
      authToken: localStorage.getItem('token'),
      itemAlias: 'video'
    }
  );
  public uploading: boolean = false;
  public currentProgress: number = 0;

  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;

  public categoriesList = [];

  constructor(private detector: ChangeDetectorRef,
              private router: Router,
              private route: ActivatedRoute,
              private _alert: AlertService,
              private _categories: CategoriesService,
              private _videos: VideosService) {

    this.uploader.onAfterAddingFile = (fileItem) => {
      this.model.name = fileItem.file.name;
      this.uploader.uploadAll();
      this.uploading = true;
    };
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    };
    this.uploader.onProgressAll = (progress: any) => this.detector.detectChanges();

    this.uploader.onCompleteItem = (item, json, status) => {
      const response = JSON.parse(json);
      this.model.filename = response.filename;
    };
  }

  public selected(value: any): void {
    this.model.category = value.id;
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public setImage(image) {
    this.model.thumb = image;
  }

  public ngOnInit() {
    let page = new Page();
    page.size = 100;
    page.pageNumber = 0;

    this._categories.list(page).subscribe(pagedData => {
      for (let i = 0; i < pagedData.data.length; i++) {
        this.categoriesList.push(new Category(pagedData.data[i]).toSelectItem());
      }
    });
  }

  public publish() {
    for (let i = 0; i < this.tmp.tags.length; i++) {
      this.model.tags.push(this.tmp.tags[i].value);
    }
    console.log(this.model)
    this._videos.add(this.model).subscribe(
      data => {
        this.router.navigate(['']);
      },
      error => {
        this._alert.error(error.json());
        this.loading = false;
      }
    );
  }

  public ngOnDestroy() {

  }

}
