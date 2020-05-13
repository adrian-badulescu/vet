import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { CookieService } from '../services/cookie.service';
import { User } from '../models/auth.models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    user: User;
    apiBase = environment.server.url;
    constructor(private http: HttpClient, private cookieService: CookieService) {
    }

    /**
     * Returns the current user
     */
    public currentUser(): User {
        if (!this.user) {
            this.user = JSON.parse(this.cookieService.getCookie('currentUser'));
        }
        return this.user;
    }

    /**
     * Performs the auth
     * @param email email of user
     * @param password password of user
     */
    login(email: string, password: string) {
        return this.http.post<any>(this.apiBase + `/api/login`, { email, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    this.user = user;
                    // store user details and jwt in cookie
                    this.cookieService.setCookie('currentUser', JSON.stringify(user), 1);
                }
                return user;
            }));
    }

    signUp(userBody: object){
        return this.http.post<any>(this.apiBase + `/api/register`, userBody)
            .pipe(map(user => {
                console.log(user);
                // register successful if there's user object
                return user;
            }));
    }

    /**
     * Logout the user
     */
    logout() {
        // remove user from local storage to log user out
        this.cookieService.deleteCookie('currentUser');
        this.user = null;
    }

    reqResetPass(email: string){
        return this.http.get<any>(this.apiBase + `/api/users/reset-password/` + email)
            .pipe(map(user => {
                // register successful if there's user object
                return user;
            }));
    }

    createNewPass(token: number, body: object){
        return this.http.post<any>(this.apiBase + `/api/users/reset-password/verify/` + token, body)
            .pipe(map(user => {
                // register successful if there's user object
                return user;
            }));
    }

    getAllUsers(){
        return this.http.get<any>(this.apiBase + `/api/users/`)
            .pipe(map(users => {
                // register successful if there's user object
                return users;
            }));
    }

    updateUser(id: string, user:object){
        return this.http.put<any>(this.apiBase + `/api/users/` + id, user)
            .pipe(map(users => {
                // register successful if there's user object
                return users;
            }));
    }
}

