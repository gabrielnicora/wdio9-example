import { $ } from '@wdio/globals'
import Page from './page.js'

class HomePage extends Page {
    get btnOpenMenu() { return $('~View menu'); }
    get btnOpenCart() { return $('~View cart'); }
    get catalogContainer() { return $('~Displays all products of catalog'); }
    
    /**
     * Selector de los contenedores de cada producto.
     * En tu captura image_54521c.png se ve que cada item es un ViewGroup 
     * dentro del RecyclerView.
     */
    get productItems() {
        return this.catalogContainer.$$('android.view.ViewGroup');
    }

    async openNavigationMenu() {
        await this.waitForElement(this.btnOpenMenu);
        await this.btnOpenMenu.click();
    }

    async openNavigationCart() {
        await this.waitForElement(this.btnOpenCart);
        await this.btnOpenCart.click();
    }

    /**
     * Estrategia de Componente:
     * Obtenemos el primer item y buscamos sus hijos específicos.
     */
    async selectFirstProduct(): Promise<string> {
        await this.waitForElement(this.catalogContainer);
        
        // FIX 1: Refinamos el selector para ir directo a los ViewGroups que son hijos del RV
        // Esto evita capturar contenedores extra que rompen el índice [0]
        const products = await this.catalogContainer.$$('android.view.ViewGroup');
        const count = await products.length
        
        if (count === 0) throw new Error('No se encontraron productos en el catálogo.');

        // Buscamos la primera tarjeta que realmente contenga una imagen de producto
        let firstProduct;
        for (const item of products) {
            const img = await item.$('~Product Image');
            if (await img.isExisting()) {
                firstProduct = item;
                break;
            }
        }

        if (!firstProduct) throw new Error('No se encontró una tarjeta de producto válida.');

        // FIX 2: Para el nombre, en Android el 'getText()' a veces falla en elementos de accesibilidad.
        // Usamos una combinación para asegurar que obtenemos el string.
        const titleElement = await firstProduct.$('~Product Title');
        const productName = await titleElement.getAttribute('text') || await titleElement.getText();
        
        console.log(`>>> Seleccionando producto: ${productName}`);

        // FIX 3: Click en la imagen (es el target más seguro para navegar)
        const imageElement = await firstProduct.$('~Product Image');
        await imageElement.click();

        return productName;
    }

    /**
     * Espera explícita para asegurar que el login fue exitoso 
     * y el catálogo es visible.
     */
    async waitForPageLoad() {
        await this.waitForElement(this.catalogContainer);
    }
}

export default new HomePage();