Bootstrap Theme Editor
=====================

Bootstrap Theme Editor allows live modification of Bootstrap themes so that you can customise them easily.
There is an example page provided (`build/example/index.html`) which makes it easy to see it in action!

There is also a Live demo which can be found at:
`http://demo.ilikeprograms.com`

The example demo page has a User Interface which has panels where you can change the different parts
of bootstrap by using color pickers to change the styling. Simple and Easy.

The included files can be distributed and used in other projects to provide live editing functionality for Bootstrap.

## Quick Start

- Download the Project by either `cloning` or `forking`. (Then CD into BootstrapThemeEditor)
- Install dependencies by running `npm install` and `bower install`
- Run `Grunt` to build the files and open the example demo page in the browser
- Take a look at the demo!

## What is Supported?

At the moment, the following Components can be styled directly:

- [x] Base Styles
- [x] Dropdowns
- [ ] Inputs/Forms
- [x] Links/Nav
- [x] Navbars
- [x] Breadcrumbs
- [ ] Pagination
- [ ] Labels
- [ ] Badges
- [x] Jumbotron
- [x] Page Header
- [ ] Thumbnails
- [x] Alerts
- [x] Progress Bars
- [x] List Groups
- [x] Panels
- [x] Wells
- [x] Headings
- [x] Body Text Color/Background

## Getting started

To begin, download the repository from Git either by using the *Clone in Desktop* button, or download from Github:

### Downloading

```shell
git clone https://github.com/ilikeprograms/BootstrapThemeEditor
cd BootstrapThemeEditor
```

### Installing the Dependencies

Now you can start to install the dependencies. `Grunt` is used for build the JS files, and `Bower` for the JS files it depends on.
This means that `Node.js` and `NPM` needs to be installed on your system. To get Grunt/Bower to work, run the following commands

```shell
npm install
bower install
```

### Build Files

There should be a *build* directory which contains the `bsThemeEditor-x.x.x.js` file which is the main distribution file.
This can be taken out from the project and will provide the live editing functionality.
It does however rely on the files in `build/js/lib` and `build/less`. The `build/js/lib` files however could be replaced with newer versions and should work ok.
If you have a dependency on a specific version of `jquery` for instance, just replace the file.

### Changing the Build

The files in `src` and `bower_components` directories are used in the Build process to create the files in the `build` directory.
If you change the source files in the `src` directory, you will need to rebuild. `Grunt` is used for the build.

To build the project files just run the `grunt` command from the main directory. This will then make grunt run the default task which will build the files.

It will also automatically host a localhost server at http://localhost:9000/example which will host `the build/example/index.html` page
and open a tab in the browser at the address. It will also watch for changes to the source file and automatically rebuild for you,
if any changes are made.

### Changing/Viewing Docs Files

The docs are powered by `jekyll` and `Github pages`. When the project is build, the dist files are copied to the docs folder, that the build files can be used in the Live demo.  

To preview the Live demo to test them, run the following command from the command line:

```shell
jekyll --serve --base-url=
```

Then go to the browser and go to the url:  
`http://localhost:4000`

## Theme Editor Options

There are options that can be provided when a ThemeEditor instance is created and are as follows:

### Misc

Miscellaneous Options

{:.table .table-bordered .table-striped .default}
| Field   | Type     | Default            | Desc                                       |
| -----   |:--------:| ------------------ | ------------------------------------------ |
| delay   | `number` | 750 (milliseconds) | Milliseconds delay between refresh updates |

### Theme

Location to find the theme file to start editing (If editing existing theme).

{:.table .table-bordered .table-striped .default}
| Field | Type     | Default | Desc                         |
| ----- |:--------:| ------- | ---------------------------- |
| url   | `string` |         | URL to locate the theme file |


### Export

An export object can be provided to control the exporting options.

| Field  | Type     | Default | Desc                                                           |
| ------ |:--------:| ------- | -------------------------------------------------------------- |
| target | `string` | 'body'  | Optional General DOM Element target, to append Export links to |

### Export Json

The export.json object can be provided to configure the options for Downloading the theme modifications in JSON format.  
The DOM node to append the export as json link, the id and the text of the link can be customised.

| Field  | Type     | Default              | Desc                                          |
| ------ |:--------:| -------------------- | --------------------------------------------- |
| target | `string` | export.target        | DOM Element target to append json Export link |
| id     | `string` | 'download_json_link' | ID attribute to set on the json Export link   |
| text   | `string` | 'Download Json'      | Text content for the json Export link         |

### Export Css

The export.css object can be provided to configure the options for Downloading the Compiled Theme in Css format. See `ThemeEditor#setupPostProcessor`  
The DOM node to append the export as css link, the id and the text of the link can be customised.

| Field  | Type     | Default             | Desc                                         |
| ------ |:--------:| ------------------- | -------------------------------------------- |
| target | `string` | export.target       | DOM Element target to append css Export link |
| id     | `string` | 'download_css_link' | ID attribute to set on the css Export link   |
| text   | `string` | 'Download Css'      | Text content for the css Export link         |

#### Export Save

The export.save object can be provided to configure the options for Saving the theme
modifications (as JSON) to an external URL.

The DOM node to append the save link, the id and the text of the link can be customised.  

The url and method can be provided to alter the HTTP method and the location the changes are send.  

An optional success callback can also be provided to fire when the changes have been successfully received by the remote URL.

| Field          | Type       | Default           | Desc                                          |
| -------------- |:----------:| ----------------- | --------------------------------------------- |
| target         | `string`   | export.target     | DOM Element target to append save Export link |
| url (required) | `string`   |                   | URL to send the modified theme changes        |
| method         | `string`   | `POST`            | HTTP method for the save request              |
| callback       | `function` |                   | Optional success save callback                |
| id             | `string`   | 'save_theme_link' | ID attribute to set on the save Export link   |
| text           | `string`   | 'Save Theme'      | Text content for the save Export link         |

#### Example

```javascript
<!-- Load our Fancy live editing ThemeEditor -->
<script src="../bsThemeEditor-0.2.0.min.js"></script>
<script>
  var themeEditor = new ThemeEditor(less, {
    theme: {
      src: 'theme.json'
    },
    export: {
      target: '#download-panel-footer',   // Fallback/General Target
      json: {
        target: '#download-panel-footer', // Custom Target
        id: 'download-theme-json',        // Custom Id
        text: 'Download Json'             // Custom Text
      },
      css: {}, // Blank Object provided makes the Css download button appear
      save: {
        url: "http://localhost:9000/example/",
        callback: function () {
          alert('Theme modifications have been saved');
        }
      }
    }
  });
</script>
```

## Contributing

I will happily accept contributions in any form, even if its just suggestions and I will have to work on them! Feel free to fork and submit a pull request.

## Licence

This project is licenced under the GPL-3.0+ Licence. The reason being is that I would prefer for people to contribute upstream so everyone can benefit from improvements.</p>