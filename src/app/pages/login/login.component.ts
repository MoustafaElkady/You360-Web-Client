import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

  constructor(
    private router: Router
  ) {
  }

  public ngOnInit() {
    console.log(12);
  }
}
