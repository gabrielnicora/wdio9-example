import { $ } from '@wdio/globals'
import Page from './page.js'

class ProductDetailPage extends Page {
    // El contenedor que pediste validar para asegurar que la página cargó
    get detailContainer() { 
        return $('~Container for fragments'); 
    }
    
    // El ID específico para el título del producto en el detalle
    get txtProductTitle() { 
        return $('id:com.saucelabs.mydemoapp.android:id/productTV'); 
    }

    get lblProductHighlights() { 
        return $('id:com.saucelabs.mydemoapp.android:id/productHeightLightsTV'); 
    }
    
    get btnIncreaseQuantity() { 
        return $('~Increase item quantity'); 
    }

    get txtQuantityNumber() { 
        return $('id:com.saucelabs.mydemoapp.android:id/noTV'); 
    }

    get btnAddToCart() { 
        return $('~Tap to add product to cart'); 
    }

    /**
     * FIX: Agregamos el método que le faltaba a la clase.
     * Esto hace que el spec reconozca la propiedad.
     */
    async waitForPageLoad() {
        await this.waitForElement(this.detailContainer);
    }

    async increaseQuantity(times: number) {
        // 1. Scroll hasta el botón "+"
        await this.scrollToAccessibilityId('Increase item quantity');
     
        // 2. VALIDACIÓN: Verificar que "Product Highlights" es visible
        await this.lblProductHighlights.waitForDisplayed({ timeout: 3000 });
        
        // Opcional: Validar que el texto sea el correcto
        const highlightsText = await this.lblProductHighlights.getText();
        if (highlightsText !== 'Product Highlights') {
            throw new Error(`Se esperaba "Product Highlights" pero se encontró: ${highlightsText}`);
        }
        // 3. Click las veces necesarias
        for (let i = 0; i < times; i++) {
            await this.btnIncreaseQuantity.click();
        }
    }

    async addProductToCart() {
        // 1. Scroll hasta el botón "Add to cart"
        // (Aunque suelen estar cerca, esto asegura que el elemento sea clickable)
        await this.scrollToAccessibilityId('Tap to add product to cart');
        
        // 2. Click final
        await this.btnAddToCart.click();
    }
}

export default new ProductDetailPage();