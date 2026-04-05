import { driver, $ } from '@wdio/globals'
import type { ChainablePromiseElement } from 'webdriverio'

/**
* Clase base para Mobile Page Objects
* Contiene utilidades compartidas para la interacción con Android/iOS
*/
export default class Page { 
    /**
    * Espera genérica para elementos en React Native.
    * Recibe un elemento de tipo ChainablePromiseElement (lo que devuelve $(...))
    */
    async waitForElement(element: ChainablePromiseElement) {
        await element.waitForDisplayed({ 
            timeout: 10000, 
            reverse: false, 
            timeoutMsg: `El elemento no apareció tras 10s` 
        });
    }

    /**
    * Oculta el teclado si está abierto.
    * Crucial en formularios de React Native para evitar que el teclado tape botones.
    */
    async hideKeyboard() {
        try {
            if (await driver.isKeyboardShown()) {
                await driver.hideKeyboard();
            }
        } catch (error) {
            console.log('Teclado ya cerrado o no disponible');
        }
    }

    /**
    * Scroll nativo de Android usando UiScrollable.
    * Es mucho más robusto que el scroll por coordenadas.
    */
    async scrollToText(text: string) {
        const selector = `android=new UiScrollable(new UiSelector().scrollable(true)).scrollTextIntoView("${text}")`;
        await $(selector);
    }

    async scrollToAccessibilityId(id: string) {
        const selector = `android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().description("${id}"))`;
        await $(selector);
    }

    /**
     * Manejo de permisos nativos de Android (Notificaciones, etc.)
     */
    async acceptPermission() {
        const allowButton = $('android=new UiSelector().resourceId("com.android.permissioncontroller:id/permission_allow_button")');
        const allowForegroundButton = $('android=new UiSelector().resourceId("com.android.permissioncontroller:id/permission_allow_foreground_only_button")');

        if (await allowForegroundButton.isExisting()) {
            await allowForegroundButton.click();
        } else if (await allowButton.isExisting()) {
            await allowButton.click();
        }
    }

    async denyPermission() {
        const denyButton = $('android=new UiSelector().resourceId("com.android.permissioncontroller:id/permission_deny_button")');
        if (await denyButton.isExisting()) {
            await denyButton.click();
        }
    }

    async isAlertPresent() {
        return await driver.isAlertOpen();
    }
    
    get btnConfirmLogout() { 
        return $('id:android:id/button1'); 
    }

    async confirmAction() {
        await this.btnConfirmLogout.waitForDisplayed({ timeout: 3000 });
        await this.btnConfirmLogout.click();
    }
}