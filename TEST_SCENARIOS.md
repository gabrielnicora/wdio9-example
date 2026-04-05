# Test Scenarios
> End-to-end test coverage for saucelab demo application

📦 Catalog
| Screen / Feature      | Scenario description                                                                                               | Type        | Priority                                                                               |
| --------------------- | ------------------------------------------------------------------------------------------------------------------ | ----------- | -------------------------------------------------------------------------------------- |
| Catalog / Sorting     | Cliente logueado ordena productos por Nombre (A-Z / Z-A) y Precio (Asc/Desc).                                      | Functional  | High: El ordenamiento es una función crítica para la navegación en catálogos extensos. |
| Catalog / Ranking     | Cliente (logueado/deslogueado) califica un producto y puede editar su valoración posterior.                        | Functional  | Medium: Importante para el feedback del usuario, aunque no bloquea la compra.          |
| Catalog / Navigation  | Scroll vertical fluido hasta el final de página para visualizar Términos, Condiciones y Privacidad.                | UI/UX       | Medium: Necesario para cumplimiento legal y transparencia de la plataforma.            |
| Catalog / Lifecycle   | Minimizar la app mediante gestos de swipe (izquierda/derecha) tras navegar por 3 páginas distintas.                | Functional  | Low: Comportamiento esperado del sistema operativo, menor impacto en negocio.          |
| Catalog / Auth        | Flujo de Login y Logout completo utilizando el menú lateral (hamburguesa).                                         | Functional  | High: Control de acceso y seguridad de la cuenta del usuario.                          |
| Catalog / Cart Icon   | Visualización del contador de items en el icono del carrito y acceso a la vista del carrito (con o sin productos). | UI/UX       | High: Es el puente principal hacia el proceso de pago.                                 |
| Catalog / Layout      | Visualización de galería en 2 columnas incluyendo precio, ranking, título e imagen por artículo.                   | UI/UX       | Medium: Impacta en la percepción de calidad y facilidad de uso de la app.              |
| Catalog / Performance | La transición a la página de detalle del producto debe demorar menos de 1 segundo.                                 | Performance | Medium: Crucial para evitar el abandono del usuario por lentitud.                      |

🔎 Detail
| Screen / Feature     | Scenario description                                                                              | Type       | Priority                                                                  |
| -------------------- | ------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------- |
| Detail / Add to Cart | Presionar "Add to Cart" agrega el item correctamente (cliente logueado y deslogueado).            | Functional | High: Funcionalidad principal para generar ventas.                        |
| Detail / Quantity    | Incrementar y decrementar la cantidad de artículos (con límite mínimo de 1).                      | Functional | High: Permite al usuario ajustar su pedido antes de ir al carrito.        |
| Detail / Inventory   | Agregar múltiples artículos iguales, de distinto color o sumar unidades a un pedido ya existente. | Functional | High: Valida la correcta gestión de variantes y persistencia del carrito. |
| Detail / Navigation  | Regreso a la Home mediante gesto de swipe o menú, con carga menor a 1 segundo.                    | UI/UX      | Medium: Garantiza una navegación fluida y sin fricciones.                 |
| Detail / UI          | Validación de visibilidad de la sección "Product Highlights" tras realizar scroll.                | UI/UX      | Medium: Asegura que la información relevante del producto sea accesible.  |

🛒 Cart
| Screen / Feature   | Scenario description                                                                                           | Type       | Priority                                                            |
| ------------------ | -------------------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------- |
| Cart / Edit Items  | Modificar cantidades o eliminar productos específicos (incluso variantes de color) directamente en el carrito. | Functional | High: El usuario debe poder corregir su orden antes del checkout.   |
| Cart / Layout      | El botón "Proceed To Checkout" debe permanecer fijo (sticky) al final de la pantalla durante el scroll.        | UI/UX      | Medium: Mantiene el Call-to-Action siempre visible para el usuario. |
| Cart / Empty State | Visualización de estado vacío cuando el carrito no tiene productos.                                            | UI/UX      | Low: Mejora la experiencia de usuario informando que no hay items.  |
| Cart / Auth Bridge | Cliente deslogueado presiona "Proceed to Checkout" y es redirigido a Login para continuar.                     | Functional | High: Valida el flujo de conversión de usuario invitado a cliente.  |

🚚 Checkout
| Screen / Feature      | Scenario description                                                                               | Type       | Priority                                                              |
| --------------------- | -------------------------------------------------------------------------------------------------- | ---------- | --------------------------------------------------------------------- |
| Shipping / Validation | Validación de campos obligatorios (Name, Address, City, Zip, Country) con mensajes de error.       | Negative   | High: Evita errores en la logística de entrega por datos incompletos. |
| Shipping / Data       | Aceptación de caracteres especiales en nombres y validación de campos puramente numéricos.         | Edge Case  | Medium: Asegura la integridad de los datos de contacto y envío.       |
| Payment / Security    | Bloqueo de avance por fecha de vencimiento expirada, CVV incorrecto o falta de campos.             | Negative   | High: Protege la transacción y asegura datos de cobro válidos.        |
| Payment / Billing     | Lógica de "Misma dirección de facturación" (habilitar/deshabilitar formulario adicional).          | Functional | Medium: Simplifica el flujo para el usuario recurrente.               |
| Review / Integrity    | Verificación de que el producto, cantidad y dirección en el resumen coincidan con lo seleccionado. | Functional | High: Último control de calidad antes de procesar el pago.            |
| Complete / Success    | Visualización de "Checkout Complete" y vaciado automático del carrito tras la compra.              | Functional | High: Confirmación final de éxito de la operación comercial.          |
| Complete / Error      | Visualización de mensaje de error amigable en caso de falla técnica en el procesamiento.           | Negative   | Medium: Crucial para la atención al cliente y soporte técnico.        |
