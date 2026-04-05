import { expect } from '@wdio/globals'
import HomePage from '../pageobjects/home.page'
import MenuComponent from '../pageobjects/components/menu'
import LoginPage from '../pageobjects/login.page'
import ProductDetailPage from '../pageobjects/product-detail.page'
import CartPage from '../pageobjects/cart.page'
import CheckoutPage from '../pageobjects/checkout.page'
import PaymentPage from '../pageobjects/payments.page'
import CheckoutReviewPage from '../pageobjects/checkout-review.page'

describe('Sauce Labs My Demo App - Full E2E Purchase Flow', () => {

    it('Cliente puede comprar y completar el checkout con exito', async () => {
        // --- PASO 1: LOGIN Y NAVEGACIÓN ---
        console.log('Iniciando flujo de Login...');
        await HomePage.openNavigationMenu();
        await MenuComponent.selectLoginOption();
        
        // El método login ya incluye el waitForPageLoad de la Home
        await LoginPage.login('bob@example.com', '10203040');

        // --- PASO 2: SELECCIÓN DE PRODUCTO EN HOME ---
        
        // Capturamos el nombre (ej: "Sauce Labs Backpack") y clickeamos la imagen
        const expectedProductName = await HomePage.selectFirstProduct();

        // --- PASO 3: DETALLE DEL PRODUCTO ---
        await ProductDetailPage.waitForPageLoad();

        // Validamos que el título en el detalle sea el mismo que en la Home
        await expect(ProductDetailPage.txtProductTitle).toHaveText(expectedProductName);

        // Aumentamos la cantidad a 3
        await ProductDetailPage.increaseQuantity(2);
        
        // Verificamos que el contador interno marque 3
        await expect(ProductDetailPage.txtQuantityNumber).toHaveText('3');

        // Scroll al botón "Add to Cart" y click
        await ProductDetailPage.addProductToCart();

        // --- PASO 4: CARRITO Y VALIDACIÓN FINAL ---        
        // Click en el icono del carrito (Accessibility ID del header)
        const btnCartHeader = await $('~Displays number of items in your cart');
        await btnCartHeader.click();

        // Esperamos a que la lista del carrito sea visible
        await CartPage.waitForPageLoad();

        // VALIDACIÓN A: El nombre del producto en el carrito debe coincidir con la Home
        const productNameInCart = await CartPage.getFirstItemName();
        expect(productNameInCart).toBe(expectedProductName);

        // VALIDACIÓN B: La "pastilla" de total debe decir "3 Items"
        await expect(CartPage.txtTotalItems).toHaveText('3 Items');

        // --- PASO 5: CHECKOUT ---
        await CartPage.proceedToCheckout();

        await CheckoutPage.fillShippingForm({
            name: 'PEDRO TOMSON',
            addr1: 'Manantiales 145',
            city: 'CABA',
            zip: '1224',
            country: 'ARGENTINA'
        });
        
        await expect(CheckoutPage.inputFullName).toHaveText('PEDRO TOMSON');
        
        await CheckoutPage.goToPayment();
        
        // --- PASO 6: CHECKOUT - PAYMENT METHOD ---

        await PaymentPage.fillPaymentForm({
            name: 'PEDRO TOMSON',
            card: '3258 1256 7568 9999',
            exp: '0325',
            cvv: '123'
        });

        // Validación opcional de que el botón Review Order está habilitado
        await expect(PaymentPage.btnReviewOrder).toBeDisplayed();

        await PaymentPage.submitReviewOrder();

        // ---- PASO 7. Review: Validación final de la orden y scroll
        await CheckoutReviewPage.verifyAndPlaceOrder(expectedProductName);

        // ---- PASO 8. Éxito: Validar mensaje "Checkout Complete"
        const isSuccess = await CheckoutReviewPage.isCheckoutComplete();
        expect(isSuccess).toBe(true);

        await HomePage.openNavigationMenu();
        await MenuComponent.selectLogoutOption();
        
        await HomePage.confirmAction();

        await expect(LoginPage.isDisplayed());
        console.log('Sesión cerrada correctamente.');
    });
});