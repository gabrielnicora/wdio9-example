import Page from './page.js';
import HomePage from './home.page.js'; // Importamos la Home para la espera

/**
 * Page Object para la pantalla de Login de MyDemoApp
 */
class LoginPage extends Page {
    /**
     * Selectores combinando Resource ID para inputs 
     * y Accessibility ID para el botón de acción.
     */
    get inputUsername() { 
        return $('id:com.saucelabs.mydemoapp.android:id/nameET'); 
    }

    get inputPassword() { 
        return $('id:com.saucelabs.mydemoapp.android:id/passwordET'); 
    }

    get btnLogin() { 
        // Usamos el selector ~ para Accessibility ID
        return $('~Tap to login with given credentials'); 
    }

    /**
     * Realiza el flujo de login completo.
     * @param user Nombre de usuario
     * @param pass Contraseña
     */
    async login(user: string, pass: string) {
        // 1. Aseguramos que la pantalla cargó esperando al input
        await this.waitForElement(this.inputUsername);
        
        // 2. Cargamos los datos
        await this.inputUsername.setValue(user);
        await this.inputPassword.setValue(pass);
        
        // 3. Ocultamos el teclado para que no interfiera con el click
        // (Muy importante en dispositivos con pantallas pequeñas)
        await this.hideKeyboard(); 
        
        // 4. Click en el botón de login
        await this.btnLogin.click();

        await HomePage.waitForPageLoad();

    }

    /**
     * Método de utilidad para el challenge:
     * Verifica si el botón de login sigue visible (útil para aserciones)
     */
    async isDisplayed(): Promise<boolean> {
        await this.btnLogin.waitForDisplayed({ timeout: 5000 });
        return await this.btnLogin.isDisplayed();
    }
}

export default new LoginPage();