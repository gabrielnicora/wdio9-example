import Page from '../page.js';

/**
 * Componente del Menú Lateral (Sidebar)
 * Ahora con selectores scoped para evitar colisiones.
 */
class MenuComponent extends Page {
    
    /**
     * El contenedor principal del menú.
     */
    get menuContainer() { 
        return $('~Recycler view for menu'); 
    }

    /**
     * Selectores hijos. 
     * Usamos el contenedor para restringir la búsqueda.
     */
    get itemCatalog() { 
        return this.menuContainer.$('~Catalog'); 
    }

    get itemLogin() { 
        return this.menuContainer.$('~Login Menu Item'); 
    }

    get itemLogout() { 
        return this.menuContainer.$('~Logout Menu Item'); 
    }


    get itemResetState() {
        return this.menuContainer.$('~Reset App State');
    }

    /**
     * Navega a la pantalla de Login.
     */
    async selectLoginOption() {
        // Primero esperamos que el contenedor sea visible
        await this.waitForElement(this.menuContainer);
        
        // Luego interactuamos con el hijo
        const loginBtn = await this.itemLogin;
        await loginBtn.click();
    }

    async selectLogoutOption() {
        // Primero esperamos que el contenedor sea visible
        await this.waitForElement(this.menuContainer);
        
        // Luego interactuamos con el hijo
        const logoutBtn = await this.itemLogout;
        await logoutBtn.click();
    }
    /**
     * Método genérico ultra seguro.
     * Busca cualquier opción dentro del Recycler View.
     */
    async selectOptionByText(optionText: string) {
        await this.waitForElement(this.menuContainer);
        const option = await this.menuContainer.$(`~${optionText}`);
        await option.click();
    }
}

export default new MenuComponent();