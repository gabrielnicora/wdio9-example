import { $ } from '@wdio/globals'
import Page from './page.js'

class CartPage extends Page {
    /**
     * Selectores del Carrito
     */
    // El contenedor de la lista de productos seleccionados
    get cartListContainer() { 
        return $('~Displays list of selected products'); 
    }

    // El título del producto dentro del carrito (usando el ID que vimos en la imagen)
    get txtProductTitle() { 
        return $('id:com.saucelabs.mydemoapp.android:id/titleTV'); 
    }

    // El texto que indica el total de items en la parte inferior (ej: "3 Items")
    get txtTotalItems() { 
        return $('id:com.saucelabs.mydemoapp.android:id/itemsTV'); 
    }

    // El botón para proceder al pago
    get btnProceedToCheckout() { 
        return $('~Confirms products for checkout'); 
    }

    /**
     * Acción: Espera a que la página del carrito cargue.
     */
    async waitForPageLoad() {
        await this.waitForElement(this.cartListContainer);
    }

    /**
     * Acción: Obtiene el nombre del primer producto en el carrito.
     */
    async getFirstItemName(): Promise<string> {
        await this.waitForElement(this.txtProductTitle);
        return await this.txtProductTitle.getText();
    }

    /**
     * Acción: Procede al checkout.
     */
    async proceedToCheckout() {
        await this.waitForElement(this.btnProceedToCheckout);
        await this.btnProceedToCheckout.click();
    }
}

export default new CartPage();