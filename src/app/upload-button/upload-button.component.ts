// When the user chooses a file using the file upload dialog, an event of type change will be emitted.

import { Component } from '@angular/core';
import { Injectable } from '@angular/core'; // tutorial adds it but not indicated yet if I'll use this later
import { HttpClient } from '@angular/common/http'; // same as above

// @Injectable() where will this go? https://angular.io/guide/http
@Component({
  selector: 'app-upload-button',
  templateUrl: './upload-button.component.html',
  styleUrls: ['./upload-button.component.scss']
})
export class UploadButtonComponent {

  fileName = '';

  constructor(
    // private http: HttpClient
    ) { }

  onFileSelected(event: any) {
    const file:File = event.target.files[0];

    //  Prob need to check if type is of image here too, not just file
    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("thumbnail", file);

      // API VISION? here later
      // const upload$ = this.http.post("/api/thumbnail-upload", formData);

      // upload$.subscribe()
    }
  }

}
