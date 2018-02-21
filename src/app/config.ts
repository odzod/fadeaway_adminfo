import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/retry'; // don't forget the imports

@Injectable()
export class ConfigService {
    constructor(private _http: HttpClient) { }

    urlString = "http://api.fadeaway.fr/index.php/";

    httpGET(url,params){

        return this._http.get(this.urlString+url);

    }



}