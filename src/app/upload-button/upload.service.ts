import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //
import { Observable, of } from 'rxjs';

// pulling env variables 
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UploadService {

  constructor(private httpService: HttpClient) {}
  // analyzeVision - has an asynchronous signature with (Oservable<object>)
  // file = encoded (this.url)
  // file = encoded (this.encodedFile)

  analyzeVision(file: string | ArrayBuffer | null): Observable<object> | null | undefined {


  //  Call vision api request object
  const requestBody = {
    "requests": [
      {
        "image": {
          "content" : file
        },
        "features": [
          {
            "type": "LABEL_DETECTION",
            "maxResults": 20
          }
          // ,
          // {
          //   "type": "IMAGE_PROPERTIES",
          //   "maxResults": 4
          // }
        ]
      }
    ]
  }

 
  console.log(requestBody)
  // console.log(environment.VISION_API_KEY)

  // POST https://vision.googleapis.com/v1/images:annotate?key=YOUR_API_KEY
  // POST request to vision API
    return this.httpService.post(`https://vision.googleapis.com/v1/images:annotate?key=${environment.VISION_API_KEY_A}`, requestBody)
    // return null;
    
    
  }
}
