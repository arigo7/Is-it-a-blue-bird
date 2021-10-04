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
  // error without the ?
  encodedFile?: string; 
  fileName: string = '';
  uploadedFile?: File = undefined;
  message = 'Only images are supported';
  url: string | ArrayBuffer | null = '';


  // private analyzeService parameter of type UploadService to constructor - could call analyzeVision() in constructor but it's not best practice -- see TOH
  // private analyzeService is the dependency injection token (toinject class - aka class dependency)
  constructor(
    // http type service (analyze)
    private analyzeService: UploadService, 
    // example a resolver / routing - here you would get the route to activate it and subscribe data
    ) { }

  // do I need an ngOnInit() {} here?
  
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
        // console.log(this.fileName)
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
        console.log(reader.result)
        
        // bound to image tag and encoded
        //  encode file
        return this.url;
      };
      
    }
  }

  // POST https://vision.googleapis.com/v1/images:annotate?key=YOUR_API_KEY

  analyze(event: any){
    
    // if(this.uploadedFile){
    //   this.analyzeService.analyzeVision(this.uploadedFile)?.subscribe(
    //     result => null
    //   )
    if(this.url){
      this.analyzeService.analyzeVision(this.url)?.subscribe(
        result => console.log(result)
      )
    }
  }

}
