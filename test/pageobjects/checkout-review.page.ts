import { $ } from '@wdio/globals'
import Page from './page.js'

class CheckoutReviewPage extends Page {
    /**
     * Selectores de Revisión y Éxito
     */
    get lblReviewOrder() { 
        return $('id:com.saucelabs.mydemoapp.android:id/enterShippingAddressTV'); 
    }

    get txtProductTitle() { 
        return $('id:com.saucelabs.mydemoapp.android:id/titleTV'); 
    }

    get sectionDeliveryAddress() { 
        return $('android=new UiSelector().text("Deliver Address")'); 
    }

    get sectionPaymentMethod() { 
        return $('android=new UiSelector().text("Payment Method")'); 
    }

    get btnPlaceOrder() { 
        return $('~Completes the process of checkout'); 
    }

    // Elementos de la pantalla de éxito
    get lblCheckoutComplete() { 
        return $('id:com.saucelabs.mydemoapp.android:id/completeTV'); 
    }

    /**
     * Acción: Valida los datos de la orden y finaliza la compra.
     */
    async verifyAndPlaceOrder(expectedProductName: string) {
        // 1. Validar texto "Review your order" (usando el ID del label correspondiente)
        await this.waitForElement(this.lblReviewOrder);
        
        // 2. Confirmar que el título del artículo es el correcto
        const actualName = await this.txtProductTitle.getText();
        if (actualName !== expectedProductName) {
            throw new Error(`Error de integridad: Se esperaba ${expectedProductName} pero se ve ${actualName}`);
        }

        // 3. Scroll hasta secciones de Address y Payment para asegurar visibilidad
        await this.scrollToText('Deliver Address');
        await this.scrollToText('Payment Method');

        // 4. Click en Place Order
        await this.btnPlaceOrder.click();
    }

    /**
     * Acción: Valida el mensaje de éxito final.
     */
    async isCheckoutComplete(): Promise<boolean> {
        await this.waitForElement(this.lblCheckoutComplete);
        const successText = await this.lblCheckoutComplete.getText();
        return successText === 'Checkout Complete';
    }
}

export default new CheckoutReviewPage();