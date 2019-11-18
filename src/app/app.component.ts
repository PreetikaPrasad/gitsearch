import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'github-profileviewer';
  name: any;
  location: any;
  data: any;
  img: any;
  dataLoading: any;
  noDataFound: any;
  link: any;
  searchForm = new FormGroup({
    searchName: new FormControl('')
  });
 // tslint:disable-next-line: variable-name
 constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }



  onSubmit() {
    const localData = localStorage.getItem(this.searchForm.value.searchName)
    if (localData) {
      this.data = JSON.parse(localData);
      this.dataLoading = false;
      this.noDataFound = false;
      this.name = this.data.name;
      this.img = this.data.avatar_url;
      this.location = this.data.location;
      this.link = this.data.html_url;

    } else {
      this.dataLoading = true;
      this.addUserDetails(this.searchForm.value.searchName).subscribe(response => {
        this.dataLoading = false;
        this.noDataFound = false;
        this.data = response;
        localStorage.setItem(this.searchForm.value.searchName, JSON.stringify(this.data));
        this.name = this.data.name;
        this.img = this.data.avatar_url;
        this.location = this.data.location;
        this.link = this.data.html_url;

        console.log(this.data);
      },
        err => {
          this.noDataFound = true;
          this.data = '';
          this.dataLoading = false;
          this.openSnackBar('not found', 'close');

        });
    }

  }

  addUserDetails(userName) {
    return this.http.get('https://api.github.com/users/' + userName + '?access_token=beba3c150021bfb49769385927dfa59fac2cdf04');
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }



}
