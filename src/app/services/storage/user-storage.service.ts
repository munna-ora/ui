import { Injectable } from '@angular/core';
import { CryptoProvider } from '../crypto/crypto.service';
/**
 * This file is responsible to manages localstorage for user information
 *
 * @export
 * @class UserStorageProvider
 * @author Arvind Kushawaha
 */
@Injectable({
    providedIn: 'root'
  })

export class UserStorageProvider {
    /** User Information storage key name */
    private storageName: string;
    /**
     * This is constructor method automatically invoked at the time of class intialization
     * and set the default properties values.
     */
    constructor(
        private crypto: CryptoProvider
    ) {
        this.storageName = 'USER_INFO';
    }
    /**
     * This method set user information into localstorage. Encrypted.
     * @param userInfo the user information JSON object
     */
    set(userInfo: any) {
        const encUserInfo = this.crypto.encryptObj(userInfo);
        localStorage.setItem(this.storageName, encUserInfo);
    }
    /**
     * This method retuns the user information from localstorage. Decrypted.
     * @return the user information JSON object or undefined if data not avilabe into localstorage
     */
    get(): any {
        let userInfo;
        const encUserInfo = localStorage.getItem(this.storageName);
        if (encUserInfo) {
            userInfo = this.crypto.decryptObj(localStorage.getItem(this.storageName));
        }
        return userInfo;
    }
    /**
     * This method remove the user information from localstorage.
     */
    clear() {
        localStorage.removeItem(this.storageName);
    }
}
