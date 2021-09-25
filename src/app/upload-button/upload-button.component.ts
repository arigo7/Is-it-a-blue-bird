// UploadButton component
// When the user chooses a file using the file upload dialog, an event of type change will be emitted - event will contain the list of files that the user selected on the target.files property
// change event gets triggered - file is not automatically uploaded to the "backend" by the browser
// need to trigger an HTTP request, in response to the change event

import { Component } from '@angular/core';

import { Injectable } from '@angular/core'; 
import { UploadService } from './upload.service';

// probably don't need injectable here anymore since I moved service??
//  can a component be injected or just a service because I want button analyze to show up when image uploads
@Injectable()
@Component({
  selector: 'app-upload-button',
  templateUrl: './upload-button.component.html',
  styleUrls: ['./upload-button.component.scss']
})
export class UploadButtonComponent {

  fileName: string = '';
  uploadedFile?: File = undefined;
  message = 'Only images are supported';
  url: string | ArrayBuffer | null = '';
  constructor(
    // http type service (analyze)
    private analyzeService: UploadService, 
    // example a resolver / routing - here you would get the route to activate it and subscribe data
    ) { }

  // event listener - will contain the list of files that the user selected on the target.files property
  // EVent is better because having correct type
  onFileSelected(event: any) {
    console.log(event)
    const file:File = event.target.files[0];
    if (file) {
      // This is to check only image type - make sure Vision API uses same type?
      const mimeType = file.type;
      if (mimeType.match(/image\/*/) == null) {
        console.log(this.message);
        // maybe I can do an alert here instead?
        this.fileName = this.message;
        return;
      }
      this.fileName = file.name;
      this.uploadedFile = file;
  

      // So image uploads and shows up right away
      const reader = new FileReader();

      reader.readAsDataURL(file);

      // wrap this into an observable
      reader.onload = (_event) => {
        this.url = reader.result;
        // console.log(reader.

        // bound to image tag
        return this.url;
      };
    }


  }

  analyze(event: any){
    if(this.uploadedFile){
      this.analyzeService.analyzeVision(this.uploadedFile)?.subscribe(
        result => null
      )
    }
  }

}
