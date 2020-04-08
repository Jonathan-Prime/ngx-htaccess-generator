# ngx-htaccess-generator

The goal of this project is to create a easy-to-use generator that creates .htaccess files for individual Angular applications. You can find the web-application here: https://julianpoemp.github.io/ngx-htaccess-generator/.

<div style="text-align: center">
<img src="https://raw.githubusercontent.com/julianpoemp/ngx-htaccess-generator/master/screenshots/ngxHtaccessGeneratorScreenshot.png" alt="screenshot" style="border:1px solid gray; box-shadow: lightgray;"/>
</div>
## Why?

Because an Angular app that uses the PathLocationStrategy can't be served on a web server without an .htaccess file installed. Without this .htaccess file the web server does not know how to handle paths generated by Angular e.g. on reload. That also happens when you try to laod your app's URL directly e.g. www.myapp.test/page1/section1. This would lead to a page not found exception.
The solution is an .htaccess file: It redirects the requests to your app's index.html where your app is initialized. After that angular reads the request and outputs the content. With the reloading issue is fixed.

## Features

- Fix for the reloading issue in productive environments
- Fix of the browser caching issue
- HTTP to HTTPS redirection
- Option to add exclusions of subdirectories, e.g. for blogs, API

## Contribution
Feel free to contribute!

1. Fork this repository.
2. Make your changes.
3. Make a pull request to this repository.
4. I'll check it and if everything is O.K. I'll merge your changes

## Development

1. Go to the folder of the cloned repository via Terminal. Call `npm install` to install all dependencies.
2. Call `npm start` in order to serve this web-application on http://localhost:4200

## Translations
You can translate this web application to another language or you found typos? You want to contribute translations? That's pretty cool! :smile: Just do this:

1. Fork this repository.
2. Clone it and open the folder `src/assets/i18n/`.
3. Duplicate the en.json file and rename it to the new locale.
4. Open the file and translate all values. Please don't touch the attributes/keys.
5. Save the file and do a commit & push.
6. Create a pull request to this repository.
