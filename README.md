
This is BBY29's LineUP project for CST1800 

Coding Standards:
-camelCase

Libraries:
    DOM = built-in
    Frontend = bootstrap

Folder Structure:
-app (dynamically rendered files that are "server owned")
    -data(json, xml, etc.)
    -pages
    -js
        -client.js (fetch)
        -pages (render components)
-public (Static files for clients)
    -components
    -css
    -img
    -font
    -js
    
ChatGPT definition of app and public:

### `public` Folder:

- **Components (HTML):** Individual HTML files representing reusable components or parts of your UI might be stored in the `public` folder.
- **Static Assets:** Other publicly accessible static files like images, fonts, or global CSS might also reside here.

### `app` Folder:

- **Main Application Logic:** The main HTML file that serves as the entry point of your application and orchestrates the rendering of components might reside in the `app` folder.
- **Rendering Logic:** JavaScript code that handles the rendering of components, fetches data, and manipulates the DOM might also reside here.
- **Dynamic Templating:** If your application uses a templating engine or framework, the main HTML file might include placeholders for components that get replaced or rendered dynamically.
- **Routing Logic:** In some applications, the routing configuration or logic might be part of the `app` folder to navigate between different views or components.

### Considerations:

- **Separation of Concerns:** The `public` folder typically holds static, standalone assets, while the `app` folder contains more dynamic logic, templates, and application-specific code.
- **Reusability:** By keeping components in the `public` folder, they might be reused across different pages or sections of your application.
- **Main Entry Point:** The main HTML file in the `app` folder is often responsible for initializing the application, rendering components, and managing overall application behavior.

This separation allows for a clear distinction between static, reusable components and the dynamic logic responsible for composing those components into a functional application. Adjust this structure based on the needs and architecture of your specific application.