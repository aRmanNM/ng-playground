import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ValidatorService {
    constructor(private httpClient: HttpClient) { }

    _reservedNames = ["arman", "ehsan", "saeed", "ali"];

    // replace this with a api call
    checkNameExists(name: string): Observable<boolean> {
        for (const element of this._reservedNames) {
            if (element.toUpperCase() == name.toUpperCase()) {
                return of(true);
            }
        }

        return of(false);
    }
}