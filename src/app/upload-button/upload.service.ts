import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //
import { Observable, of } from 'rxjs';

// pulling env variables 
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  fileName = '';
  message = 'Only images are supported';

  // variable for imagePath which I don't use but might use for vision API later
  imagePath: string | null = '';

  // gives me error without this, it doesn't like only url = ''
  url: string | ArrayBuffer | null = '';

  constructor(private httpService: HttpClient) {}
  // file is this.url
  analyzeVision(file: string | ArrayBuffer | null): Observable<object> | null | undefined {


  //  Call vision api code
    
  
  const requestBody = {
    "requests": [
      {
        "image": file,
        "features": [
          {
            "type": "LABEL_DETECTION",
            "maxResults": 3
          },
          {
            "type": "IMAGE PROPERTIES",
            "maxResults": 10
          }
        ]
      }
    ]
  }
  // environment.VISION_API_KEY
    // POST https://vision.googleapis.com/v1/images:annotate?key=YOUR_API_KEY
    // return null;
    console.log(requestBody)
    console.log(environment.VISION_API_KEY)
    return this.httpService.post(`https://vision.googleapis.com/v1/images:annotate?key=${environment.VISION_API_KEY}`, requestBody)
    
    
  }
}
