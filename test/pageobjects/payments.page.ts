import { $ } from '@wdio/globals'
import Page from './page.js'

class PaymentPage extends Page {
    /**
     * Selectores de la pantalla de Método de Pago
     */
    get lblPaymentMethod() { 
        return $('id:com.saucelabs.mydemoapp.android:id/enterPaymentMethodTV'); 
    }

    get inputFullName() { 
        return $('id:com.saucelabs.mydemoapp.android:id/nameET'); 
    }

    get inputCardNumber() { 
        return $('id:com.saucelabs.mydemoapp.android:id/cardNumberET'); 
    }

    get inputExpirationDate() { 
        return $('id:com.saucelabs.mydemoapp.android:id/expirationDateET'); 
    }

    get inputSecurityCode() { 
        // El ID según el DOM es securityCodeET
        return $('id:com.saucelabs.mydemoapp.android:id/securityCodeET'); 
    }

    get btnReviewOrder() { 
        return $('~Saves payment info and launches screen to review checkout data'); 
    }

    /**
     * Acción: Completa el formulario de pago.
     */
    async fillPaymentForm(data: { name: string, card: string, exp: string, cvv: string }) {
        // Validar que el texto de la sección existe
        await this.waitForElement(this.lblPaymentMethod);
        
        // Completar campos utilizando los IDs identificados
        await this.inputFullName.setValue(data.name);
        await this.inputCardNumber.setValue(data.card);
        await this.inputExpirationDate.setValue(data.exp);
        await this.inputSecurityCode.setValue(data.cvv);

        // Ocultamos teclado para asegurar que el botón de Review sea visible
        await this.hideKeyboard();
    }

    async submitReviewOrder() {
        await this.btnReviewOrder.click();
    }
}

export default new PaymentPage();