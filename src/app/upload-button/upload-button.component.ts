// UploadButton component
// When the user chooses a file using the file upload dialog, an event of type change will be emitted - event will contain the list of files that the user selected on the target.files property
// change event gets triggered - file is not automatically uploaded to the backend by the browser
// need to trigger an HTTP request ourselves, in response to the change event

import { Component } from '@angular/core';
// tutorial adds it but not indicated yet if I'll use this later
import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; // same as above

 @Injectable()
@Component({
  selector: 'app-upload-button',
  templateUrl: './upload-button.component.html',
  styleUrls: ['./upload-button.component.scss']
})
export class UploadButtonComponent {

  fileName = '';

  constructor(
    private http: HttpClient
    ) { }

  // event will contain the list of files that the user selected on the target.files property
  onFileSelected(event: any) {
    console.log(event)
    const file:File = event.target.files[0];

    //  Prob need to check if type is of image here too, not just file
    if (file) {
      this.fileName = file.name;
      // const formData = new FormData();
      // formData.append("thumbnail", file);

      // API VISION? here later

    const upload$ = this.http.post("/api/thumbnail-upload", file);
    // const upload$ = this.http.post("/api/thumbnail-upload", formData);


    upload$.subscribe()
    }
  }

}
