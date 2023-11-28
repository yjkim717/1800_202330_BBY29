<a name="readme-top"></a>

[![Contributors](https://img.shields.io/github/contributors/yjkim717/1800_202330_BBY29.svg?style=for-the-badge)](https://github.com/yjkim717/1800_202330_BBY29/graphs/contributors)
[![GitHub Forks](https://img.shields.io/github/forks/yjkim717/1800_202330_BBY29.svg?style=for-the-badge)](https://github.com/yjkim717/1800_202330_BBY29/network/members)
[![GitHub Issues](https://img.shields.io/github/issues/yjkim717/1800_202330_BBY29.svg?style=for-the-badge)](https://github.com/yjkim717/1800_202330_BBY29/issues)

<br />
<div align="center">
  <a href="https://github.com/yjkim717/1800_202330_BBY29">
    <img src="/public/img/logo.jpg" alt="Logo" width="180" height="80">
  </a>

<h3 align="center">Line Up</h3>

  <p align="center">
    This is BBY29's LineUp project for CST1800
    <br />
    <a href="https://github.com/yjkim717/1800_202330_BBY29"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/yjkim717/1800_202330_BBY29/issues">Report Bug</a>
    ·
    <a href="https://github.com/yjkim717/1800_202330_BBY29/issues">Request Feature</a>
  </p>
</div>

## About The Project
<div align="center">
  <img src="/public/img/readme.png" alt="Product Name Screen Shot" height="500" align="center">
</div>


## Coding Standards:
-camelCase





## CapWise

* [General info](#general-info)
* [Technologies](#technologies)
* [Contents](#content)

## General Info
“Line Up” is a web application that helps busy customers and fast-casual restaurant owners systemize the line up reservation process

## Technologies
Technologies used for this project:
* [![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow.svg?style=for-the-badge&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [![HTML](https://img.shields.io/badge/HTML-5-orange.svg?style=for-the-badge&logo=html5)](https://developer.mozilla.org/en-US/docs/Web/HTML)
* [![CSS](https://img.shields.io/badge/CSS-3-blue.svg?style=for-the-badge&logo=css3)](https://developer.mozilla.org/en-US/docs/Web/CSS)
* [![DOM](https://img.shields.io/badge/DOM-API-green.svg?style=for-the-badge&logo=dom)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
* [![Bootstrap](https://img.shields.io/badge/Bootstrap-5-purple.svg?style=for-the-badge&logo=bootstrap)](https://getbootstrap.com/)
* [![Firebase](https://img.shields.io/badge/Firebase-8.0.0-yellow.svg?style=for-the-badge&logo=firebase)](https://firebase.google.com/)


## Content
Content of the project folder:

```
 Top level of project folder: 
 ├── .gitignore               # Git ignore file
 ├── package-lock.json        # dependencies and some metadata
 ├── package.json             # dependencies project requires the "express" package with a version equal to or higher than 4.18.2
 ├── app.js                   # establishes an Express.js server with path-specific route handlers, serves static files for virtual paths, and dynamically routes based on the htmlAlias object.
 └── README.md                # documentation and information about LineUp.

It has the following subfolders and files:
├── .idea                     # Folder for ?????????
├── app                             # Folder for dynamically rendered files that are "server owned"
        /html
            /entry.html
            /index.html
            /map.html
            /status.html
            /team.html
            /template.html
        /js
            /authentication.js
            /client.js
            /firebaseAPI.js
            /global.js
            /map.js
            /pages.js
        
├── public                          # Folder for static files for clients
        /components
            /footer.html
            /login.html
            /navbar.html
            /restaurantList.html
            /signup.html
        /css
            /components                 # 
                /footer.css
                /login.css
                /navbar.css
                /restaurantList.css
                /signup.css
            /pages.css                  # 
                /entry.css
                /index.css
                /map.css
                /team.css
            /global.css
        /font
            /Pacifico-Regular.ttf
        /img

```

## Limitations
- known bugs

## Resources
- In-app icons from Feather v4.28.0 (Open Source https://feathericons.com/)
- Logo homemade!

## Contact
* John Smith - jsmith@my.bcit.ca
* ...

## Acknowledgements
    -Use window.location.href when synchronously reloading an entire page (redirecting to different page)
    -Use http request when asynchronously rendering a component
    -Use fontawesome for icons in team.html
* <a href="https://fontawesome.com/">Font Awesome</a>
* <a href="https://fonts.adobe.com/">Adobe Fonts</a>
* <a href="https://fonts.google.com/">Google Fonts</a>
* <a href="https://stock.adobe.com/images">Adobe Stock Images</a>
* <a href="https://getbootstrap.com/">Bootstrap</a>


