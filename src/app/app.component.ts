import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'moviemanager';
  userData:any;

  ngOnInit() {
   
    let userDataInStorage = localStorage.getItem('userData');
    this.userData = userDataInStorage!=null?JSON.parse(userDataInStorage):{};
  }
}
