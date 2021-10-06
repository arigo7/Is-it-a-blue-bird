// UploadButton component
// When the user chooses a file using the file upload dialog, an event of type change will be emitted - event will contain the list of files that the user selected on the target.files property
// change event gets triggered - file is not automatically uploaded to the "backend" by the browser
// need to trigger an HTTP request, in response to the change event

import { Component } from '@angular/core';
import { Injectable } from '@angular/core'; 
import { UploadService } from './upload.service';
// import { ImageAnnotatorClient } from '@google-cloud/vision';

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
  outputMessage: string = ""

  // Creates a client
  
  // private analyzeService parameter of type UploadService to constructor - could call analyzeVision() in constructor but it's not best practice -- see TOH
  // private analyzeService is the dependency injection token (toinject class - aka class dependency)
  constructor(
    // http type service (analyze)
    private analyzeService: UploadService, 
    // example a resolver / routing - here you would get the route to activate it and subscribe data
    ) { }

  // do I need an ngOnInit() {} here?
  
  // event listener - will contain the list of files that the user selected on the target.files property
  // Event is the correct type
  onFileSelected(event: any) {
    console.log(event)
    const file:File = event.target.files[0];
    if (file) {
      // This is to check only image type 
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
  
      // Image uploads and shows up on webpage
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.url = reader.result;
        console.log(reader.result)
        
        // include only buffer of image not path 
        // strip off the data: url prefix to get just the base64-encoded bytes
        if (typeof this.url === "string") {
          this.encodedFile = (this.url).replace(/^data:image\/\w+;base64,/, "");
          console.log(this.encodedFile)
          console.log("type of this.encoded file is:")
          console.log(typeof(this.encodedFile))
          return this.encodedFile
        }
        else {
          return "cannot extract encoded bytes"
        }
        return this.encodedFile;
        // return this.url;
      };
      
    }
  }

  // POST https://vision.googleapis.com/v1/images:annotate?key=YOUR_API_KEY
  analyze(event: any){

    if(this.encodedFile){
      this.analyzeService.analyzeVision(this.encodedFile)?.subscribe(
        (result:any) =>  
        // console.log(result)

        // {if label Annotations contains the word blue or bird is a blue bird - variable true or false => both true is a blue bird
          // }
          {
            let isBlue: boolean = false
            let isBird: boolean = false
            // let responseMessage: string = ""
            console.log(result)

            // result.responses[""]
            let responseAnotation = result.responses[0]["labelAnnotations"]// {..., description: blah }
            const descriptions = responseAnotation
                .map((annotation: any) => annotation.description.toLowerCase())
            console.log(descriptions)

            for (let word of descriptions) {
              if ( word.includes('bird')) {
                isBird = true
              }
              if ( word.includes('blue')) {
                isBlue = true
              }
            }
            if (isBlue && isBird ) {
              console.log("It's a blue bird")
              this.outputMessage = "It's a blue bird"
              
            }
            else {
              console.log("it's not a blue bird")
              this.outputMessage = "It's NOT blue bird"
            }
          }
      )
    }
  }

}
