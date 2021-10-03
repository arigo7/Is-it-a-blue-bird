import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //
import { Observable, of } from 'rxjs';

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

  analyzeVision(file: File): Observable<string> | null | undefined {


  //  Call vision api code
    
    
    
    return null;
    
    
  }
}
