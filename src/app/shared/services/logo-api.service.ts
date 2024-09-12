import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogoApiService {
  private baseUrl: string = 'https://logo.clearbit.com/';

  constructor() { }

  getUrlToLogo(source: any){
    return `${this.baseUrl}${new URL(source.url).hostname}`;
  }
}
