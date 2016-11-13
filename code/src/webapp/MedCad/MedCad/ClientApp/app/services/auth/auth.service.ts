import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

let Auth0Lock = require('auth0-lock').default;

let options = {
    languageDictionary: {
        emailInputPlaceholder: "email@email.com",
        title: "WebCad"
    },
    theme: {
        logo: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/47e1c322329083.56310816f1004.png'
    },
};

@Injectable()
export class Auth {
    // Configure Auth0
    lock = new Auth0Lock('wFZh1IypbUquG9MyaG1nvWLeB2kzwiU5', 'aridlife.auth0.com', options);

    userProfile: Object;

    constructor() {
        // Set userProfile attribute of already saved profile
        this.userProfile = JSON.parse(localStorage.getItem('profile'));
        // Add callback for lock `authenticated` event
        this.lock.on("authenticated", (authResult) => {
            localStorage.setItem('id_token', authResult.idToken);

            this.lock.getProfile(authResult.idToken, (error, profile) => {
                if (error) {
                    // Handle error
                    alert(error);
                    return;
                }

                localStorage.setItem('profile', JSON.stringify(profile));
                this.userProfile = profile;
            });
        });
    }

    public login() {
        // Call the show method to display the widget.
        this.lock.show();
    };

    public authenticated() {
        // Check if there's an unexpired JWT
        // This searches for an item in localStorage with key == 'id_token'
        return tokenNotExpired();
    };

    public logout() {
        // Remove token from localStorage
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
        this.userProfile = undefined;
    };
}