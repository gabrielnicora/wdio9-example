import { $ } from '@wdio/globals'
import Page from './page.js'

class CheckoutPage extends Page {
    /**
     * Selectores de la pantalla de Checkout
     */
    get lblShippingAddress() { 
        return $('id:com.saucelabs.mydemoapp.android:id/enterShippingAddressTV'); 
    }

    get inputFullName() { 
        return $('id:com.saucelabs.mydemoapp.android:id/fullNameET'); 
    }

    get inputAddressLine1() { 
        return $('id:com.saucelabs.mydemoapp.android:id/address1ET'); 
    }

    get inputCity() { 
        return $('id:com.saucelabs.mydemoapp.android:id/cityET'); 
    }

    get inputZipCode() { 
        return $('id:com.saucelabs.mydemoapp.android:id/zipET'); 
    }

    get inputCountry() { 
        return $('id:com.saucelabs.mydemoapp.android:id/countryET'); 
    }

    get btnPayment() { 
        return $('~Saves user info for checkout'); 
    }

    /**
     * Acción: Completa el formulario de envío.
     */
    async fillShippingForm(data: { name: string, addr1: string, city: string, zip: string, country: string }) {
        // Validar que el texto de la sección existe
        await this.waitForElement(this.lblShippingAddress);
        
        // Completar campos
        await this.inputFullName.setValue(data.name);
        await this.inputAddressLine1.setValue(data.addr1);
        await this.inputCity.setValue(data.city);
        await this.inputZipCode.setValue(data.zip);
        await this.inputCountry.setValue(data.country);

        // Ocultar teclado para visualizar el botón de pago si fuera necesario
        await this.hideKeyboard();
    }

    async goToPayment() {
        await this.scrollToAccessibilityId('Saves user info for checkout');

        await this.btnPayment.click();
    }
}

export default new CheckoutPage();