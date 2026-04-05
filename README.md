# Sauce Labs Mobile Automation - WDIO & Appium

Este repositorio contiene un framework de automatización E2E para la aplicación móvil **Sauce Labs My Demo App** en Android. El proyecto utiliza **WebdriverIO** con **Appium**, siguiendo el patrón de diseño **Page Object Model (POM)**.

## 🚀 Requisitos Previos

Antes de clonar y ejecutar el proyecto, asegúrate de tener instalado lo siguiente:

### 1. Entorno de Node.js
* **Node.js**: Versión 22 o superior.
* **pnpm**: Este proyecto utiliza `pnpm` para la gestión de dependencias.
    ```bash
    npm install -g pnpm
    ```

### 2. Mobile Development (Android)
* **Android Studio**: Instalado y configurado.
* **Android SDK**: Incluyendo `Platform-tools` (para el comando `adb`).
* **Variables de Entorno**: Configura tu `PATH` en la Mac (`.zshrc` o `.bash_profile`):
    ```bash
    export ANDROID_HOME=$HOME/Library/Android/sdk
    export PATH=$PATH:$ANDROID_HOME/emulator
    export PATH=$PATH:$ANDROID_HOME/platform-tools
    ```

### 3. Appium Stack
* **Appium Server**: Versión 2.x preferentemente.
    ```bash
    pnpm install -g appium
    ```
* **UiAutomator2 Driver**: Necesario para interactuar con Android.
    ```bash
    appium driver install uiautomator2
    ```

## 🛠️ Instalación

1.  **Clonar el repositorio**:
    ```bash
    git clone git@github.com:gabrielnicora/wdio9-example.git
    cd wdio9-example
    ```

2.  **Instalar dependencias**:
    ```bash
    pnpm install
    ```

3.  **Configurar el APK**:
    Asegúrate de tener el archivo `.apk` de la aplicación en la carpeta especificada en el `wdio.conf.ts` (generalmente en `.test/assets/mda-2.2.0-25.apk`) o ajusta la ruta en las `capabilities`.

## 📂 Estructura del Proyecto

El framework utiliza el patrón **Page Object Model (POM)** con **TypeScript** y **Mocha**, organizado de la siguiente manera:

```text
WDIO-EXAMPLE/
├── test/
│   ├── assets/               # Binarios (.apk) de la aplicación
│   │   └── mda-2.2.0-25.apk
│   ├── pageobjects/          # Pantallas y lógica de elementos (POM)
│   │   ├── components/       # Componentes transversales
│   │   │   └── menu.ts       # Lógica del menú lateral (hamburguesa)
│   │   ├── cart.page.ts
│   │   ├── checkout.page.ts
│   │   ├── home.page.ts      # Catálogo principal
│   │   ├── login.page.ts
│   │   └── ...               # Resto de vistas (Payment, Review, etc.)
│   └── specs/                # Tests unitarios y E2E (Mocha)
│       └── test.e2e.ts       # Suite principal de pruebas
├── .gitignore                # Archivos y carpetas excluidos de Git
├── package.json              # Scripts y dependencias (pnpm)
├── README.md                 # Guía de uso y requisitos
├── TEST_SCENARIOS.md         # Documentación de escenarios de prueba
├── tsconfig.json             # Configuración de TypeScript
└── wdio.conf.ts              # Configuración de WDIO, Appium y Hooks

## 🏃 Ejecución de Tests

Para ejecutar la suite de pruebas completa:

```bash
pnpm wdio