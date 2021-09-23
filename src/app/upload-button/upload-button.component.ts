// UploadButton component
// When the user chooses a file using the file upload dialog, an event of type change will be emitted - event will contain the list of files that the user selected on the target.files property
// change event gets triggered - file is not automatically uploaded to the "backend" by the browser
// need to trigger an HTTP request, in response to the change event

import { Component } from '@angular/core';
// Angular tutorial adds it but not indicated yet if I'll use this later
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
  // Only messages are supported
  message = 'Only images are supported';
  // variable for imagePath which I don't use but might use for vision API later
  imagePath: string | null = ''; 
  // GIVES ME ERROR WITHOUT THIS, it doesn't like url = ''
  url: string | ArrayBuffer | null = '';

  constructor(
    private http: HttpClient
    ) { }

  // event listener - will contain the list of files that the user selected on the target.files property
  onFileSelected(event: any) {
    console.log(event)
    const file:File = event.target.files[0];

    // This is to check only image type - make sure Vision API uses same type?
    const mimeType = file.type;
    // let message:String - don't declare here
    if (mimeType.match(/image\/*/) == null) {
      console.log(this.message);
      // maybe I can do an alert here instead?
      this.fileName = this.message;
      return 
    }

    //  Prob need to check if type is of image here too, not just file
    if (file) {
      this.fileName = file.name;
      //
      // // API VISION here or in new button Analyze!
      // const imageURL = "https://www.allaboutbirds.org/guide/assets/photo/297087301-1280px.jpg";

      // So image uploads and shows up right away
      const reader = new FileReader();
      // this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.url = reader.result;
      }


      const formData = new FormData();
      formData.append("thumbnail", file);


      // was file 
    // const upload$ = this.http.post("/api/thumbnail-upload", file);

    const upload$ = this.http.post("/api/thumbnail-upload", formData);

    upload$.subscribe()
    }
  }

}
