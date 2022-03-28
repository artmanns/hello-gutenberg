# hello-gutenberg

This is a basic setup for developing Gutenberg blocks. This setup is based on Ali Alaa's Gutenberg Course on Udemy.

## Usage

### Install all necessary npm packages

```bash
npm install
```

### Create a development build

You can create a development build either by

```bash
npm run dev
```

or continous rebuild

```bash
npm run watch
```

## Directory structure

All files either belong to

- scripts and styles which run in the Editor only,
- scripts and styles which run in the Editor and on the final website

### Scripts and Styles for the Editor only

- editor.js
- index.js
- edit.js
- save.js
- styles.editor.scss

### Scripts and Styles that are loaded in the Editor and on the Websites

- script.js
- styles.scss

## Package Versions

WordPress moves forward quite fast. The included `package.json` was tested with WordPress 5.9.1. You can check all dependencies against the versions used by WordPress on [Branches WordPress Core](https://core.trac.wordpress.org/browser/branches?order=name)

## Pragmas

WordPress defines it's own `createElement`as well as `Fragment`. Therefore the `webpack.config.js`contains

```javascript
"@babel/preset-react",
{
  pragma: "wp.element.createElement",
  pragmaFrag: "wp.element.Fragment",
  development: isDevelopment(),
},
```

## Externals

Gutenberg consists of many packages. All of them are loaded when WordPress is started.
You shall not include those libraries into your bundles.

If you want to use them within your favorite IDE e.g. for name completion as well as for linting, you have to include the as externals to your `webpack.config.js`

Here an example for some of the libraries

```javascript
externals: {
    react: "React",
    "react-dom": "ReactDOM",
    lodash: "lodash",
    "@wordpress/blocks": ["wp", "blocks"],
    "@wordpress/i18n": ["wp", "i18n"],
    "@wordpress/primitives": ["wp", "primitives"],
    "@wordpress/block-editor": ["wp", "blockEditor"],
    "@wordpress/block-library": ["wp", "blockLibrary"],
    "@wordpress/components": ["wp", "components"],
    "@wordpress/data": ["wp", "data"],
    "@wordpress/element": ["wp", "element"],
    "@wordpress/html-entities": ["wp", "htmlEntities"],
    "@wordpress/core-data": ["wp", "coreData"],
    "@wordpress/date": ["wp", "date"],
},
```

If you want to add other packages, note the change from kebab-case (key) to camelCase (value).

## Registering the bundles

To load all bundles of your blocks, you have to register scripts and styles by using `wp_register_style`as well as `wp_register_script`.
When registering the editor scripts, you have to add the dependencies of the previous defined `externals`.

```php
wp_register_script(
  'art-hello-gutenberg-editor-script',
   $plugin_dir_url . 'dist/art-hello-gutenberg-editor.bundle.js',
   array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-block-editor', 'wp-components', 'lodash', 'wp-blob', 'wp-data', 'wp-html-entities', 'wp-core-data','wp-compose', 'jquery'), $version
);
```

## Loading the bundles

The bundles are finally loaded by `register_block_type(__DIR__)`. You will find this inside the block directory within the file `index.php`.

```php
function artmanns_register_my_first_block() {
    register_block_type (__DIR__);
}

add_action('init', 'artmanns_register_my_first_block');
```

`register_block_type()` takes all scripts and styles to be loaded from the file `block.json`:

```json
{
  "$schema": "https://json.schemastore.org/block.json",
  "apiVersion": 2,
  "name": "artmanns/my-first-block",
  "title": "Willkommen Gutenberg",
  "category": "text",
  "icon": {
    "src": "admin-site"
  },
  "description": "Mein erster Block mit Gutenberg.",
  "keywords": ["hello", "sample"],
  "version": "1.0.0",
  "textdomain": "artmanns",
  "editorScript": "art-hello-gutenberg-editor-script",
  "script": "art-hello-gutenberg-script",
  "editorStyle": "art-hello-gutenberg-editor-style",
  "style": "art-hello-gutenberg-style",
  "attributes": {
    "simpleText": {
      "type": "number",
      "default": "Hello Gutenberg"
    }
  }
}
```

Note that the values of `editorScript`, `script`, `editorStyle` and `style` have to be the same as previous defined within the `wp_register_script()` functions.

## Adding your own blocks

If you want to add your own block e.g. named `my-second-block` you have to perform the following steps:

1. Create a new directory within `blocks` that is named `my-second-block`.
2. Within `my-second-block` edit the file `block.json` and adapt it to your needs. Change at least
   - `name`
   - `title`
   - `description`
3. Note that the values of `editorScript`, `script`, `editorStyle` and `style` are the same for all blocks. This enables us to load several blocks at once. If you have a lot of blocks, you may decide to create one bundle per block.
4. Within the directory `src` you have to
   - import the dirctory of your new block into `editor.js`, and
   - import the file `script.js` of your directory into `script.js`
5. Move a directory level up into the plugin directory. Add the file `index.php`of your new block into `artmanns-hello-gutenberg.php`by means of `require_once`.
6. Run `npm run dev` as well as `npm run prod` to create the bundles.

## Create a ZIP-Archive of your Plugin

Finally, after you finished the development, you may want to create a release version of your plugin.
You can do this by using `gulp`.
If you don't have installed `gulp`, install `gulp-cli` globally

```bash
sudo npm install --global gulp-cli
```

Afterwards add `gulp` as well as `gulp-zip` to your `devDependencies` by

```bash
npm install --save-dev gulp gulp-zip
```

To create the ZIP Archive simple run the following command

```bash
gulp
```

You will find the ZIP-Archive in the directory `bundled`.
