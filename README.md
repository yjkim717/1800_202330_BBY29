
# This is BBY29's LineUP project for CST1800 

## Coding Standards:
-camelCase

## Libraries:
    DOM = built-in
    Frontend = bootstrap

Folder Structure:
- **app** (dynamically rendered files that are "server owned")
    - *data* (json, xml, etc.)
    - *pages*
    - *js*
        - *client.js* (fetch)
        - *pages* (render components)
- **public** (Static files for clients)
    - *components* 
    - *css* 
    - *img*
    - *font*
    - *js* 

Additional Notes:
    -Use window.location.href when synchronously reloading an entire page (redirecting to different page)
    -Use http request when asynchronously rendering a component
    
