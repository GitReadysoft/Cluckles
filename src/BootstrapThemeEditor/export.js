(function(window) {
    "use strict";

    /**
     * Manages the Exporting of the Theme data, in JSON (modifications only)/Compiled CSS format,
     * aswell as creating the Download Blob's and the Links/Buttons to trigger the download.
     * 
     * @class Editor
     * 
     * Export Options:
     * - target: Optional General DOM Element target, to append Export links to (Body if undefined).
     * - json: Json Export link options.
     *   - target: DOM Element target to append json Export link, (export.target if undefined).
     *   - id: ID attribute to set on the json Export link.
     *   - text: Text content for the json Export link.
     * - css: Css Export link options.
     *   - target: DOM Element target to append css Export link, (export.target if undefined).
     *   - id: ID attribute to set on the css Export link.
     *   - text: Text content for the css Export link.
     * - save: External JSON save request.
     *   - target: DOM Element target to append save Export link, (export.target if undefined).
     *   - method: HTTP method for the save request.
     *   - url: (Required) URL to send the modified theme changes (JSON format).
     *   - callback: Optional success save callback.
     *   - id: ID attribute to set on the save Export link.
     *   - text: Text content for the save Export link.
     * 
	 * @extends ThemeModifiers
	 * 
	 * @param {ThemeEditor} editor instance which manages the less modifications.
     * 
     * @returns {Editor}
     */
    var Export = function (editor, options) {
        this.editor     = editor;
        this.options    = options;

        this.jsonLink  = null;
        this.saveLink   = null;
        this.cssLink    = null;

        // If the download option was provided
        if (options.hasOwnProperty('json')) {
            this.jsonLink = this.createExportLink('json', options.json);
        }

        // If the Save option was provided
        if (options.hasOwnProperty('save')) {
            this.createSaveLink();
        }

        if (options.hasOwnProperty('css')) {
            this.cssLink = this.createExportLink('css', options.css);
        }
    };
    
    /**
     * Creates and returns a Primary Bootstrap Anchor tag link.
     * 
     * @returns {Element}
     */
    Export.prototype.createBsButton = function () {
        var button = document.createElement('a'); // Create link

        // Add Primary BS classes
        button.classList.add('btn');
        button.classList.add('btn-primary');

        return button;
    };

    /**
     * Finds the Export DOM element target, to append an export button to.
     * 
     * @param {object} linkOptions Specific options for this export button.
     * 
     * @returns {string}
     */
    Export.prototype.findExportTarget = function (linkOptions) {
        if (this.options.hasOwnProperty('target')) {
            // Specific target or General target
            // e.g.
            // export: {
            //  target: '#my-id', // this.options.target
            //  json: {
            //   append: '#specific-target' // linkOptions.target
            //  }
            // }
            return linkOptions.target || this.options.target;
        }

        return linkOptions.target || "body";
    };
    
    /**
     * Creates an Export button (for the current exportType e.g. "css" or "json") and appends it to the element provided by the destination.
     * 
     * Download Options:
     * - id:    {string} The id to set for the download button (E.g. "download_css_link" || "download_json_link").
     * - text:  {string} The text content of the download button (E.g. "Download Json" || "Download Css").
     * 
     * @returns {Element}
     */
    Export.prototype.createExportLink = function (exportType, options) {
        var downloadBtn = this.createBsButton(),
            dest = this.findExportTarget(options), // Find the Append Target
            firstCharUpper = exportType.slice(0, 1).toUpperCase();

        downloadBtn.textContent = options.text || 'Download ' + firstCharUpper + exportType.slice(1);
        downloadBtn.setAttribute('id', options.id || 'download_' + exportType + '_link');

        // Download attribute allows the button to provided a file to download on click
        // The generateDownloadBlob function provides the file contents
        downloadBtn.setAttribute('download', 'theme.' + exportType);

        // Append the Download button to the document
        document.querySelector(dest).appendChild(downloadBtn);

        return downloadBtn;
    };
    
    /**
     * Creates a Save button and appends it to the element provided by the destination.
     * 
     * Save Options:
     * - id:    {string} The id to set for the save button (Default "save_theme_link").
     * - text:  {string} The text content of the button (Default "Save Theme").
     * 
     * @param {string} destination The destination element selector (Default "body").
     * 
     * @returns {undefined}
     */
    Export.prototype.createSaveLink = function () {
        var saveOptions = this.options.save,
            saveLink = this.createBsButton(), // Create a button
            dest = this.findExportTarget(saveOptions); // Body or custom parent

        // Set the text and id of the Save button
        saveLink.textContent = saveOptions.text || 'Save Theme';
        saveLink.setAttribute('id', saveOptions.id || 'save_theme_link');

        // Append the Save button to the document
        document.querySelector(dest).appendChild(saveLink);

        // Add a click handler which calls the sendThemeData function
        saveLink.addEventListener('click', this.sendThemeData.bind(this), false);

        return saveLink;
    };
    
    /**
     * Generates a Download Blob to export the Theme modifications in JSON format.
     * 
     * @returns {undefined}
     */
    Export.prototype.generateJsonBlob = function () {
        // Update the href of the download link, this now points to the JSON data
        this.jsonLink.setAttribute('href', this.generateBlob(this.editor.getJSON));
    };

    /**
     * Generates a Download Blob to export the Compiled Theme in Css format (including modifications).
     * 
     * @param {string} css The Compiled Css from Less#postProcess.
     * 
     * @returns {undefined}
     */
    Export.prototype.generateCssBlob = function (css) {
        // Update the href of the download link, this now points to the CSS data
        this.cssLink.setAttribute('href', this.generateBlob(css));
    };

    /**
     * Generates a New Blob and ObjectURL with the given contents.
     * 
     * @param {string} contents The text contents to blobify.
     * @returns {unresolved}
     */
    Export.prototype.generateBlob = function (contents) {
        var blob = new Blob([contents]); // Create a Blob with the contents

        return window.URL.createObjectURL(blob); // Create an URL with the blob
    };

    /**
     * Sends the Theme Data to the URL provided by the "save" option to ThemeEditor(options.export).
     * 
     * Save options:
     * - method:    {string}    The HTTP method for the save request. Default "POST".
     * - url:       {string}    The URL to send the JSON data.
     * - callback:  {Function}  A callback function to execute on success.
     * 
     * @returns {undefined}
     */
    Export.prototype.sendThemeData = function () {
        var options = this.options.save,
            method = options.method || 'POST', // Default to "POST"
            saveXHR;

        // Throw an error if the URL option was not provided or was not a string
        if (typeof options.url !== 'string') {
            throw new TypeError('ThemeEditor.export.sendThemeData: The save url was not provided, or was not a string');
        }

        // Create an XMLHttpRequest to send the Theme json to the server
        saveXHR = new XMLHttpRequest();
        saveXHR.open(method.toUpperCase(), options.url, true); // Open the URL, call uppercase on 
        saveXHR.setRequestHeader('Content-Type', 'application/json; charset=UTF-8'); // Set the Content-Type header to JSON.

        // If a callback function is provided
        if (options.hasOwnProperty('callback')) {
            if (typeof options.callback === 'function') {
                // Wait for the XHR to finish (4) and be succesfull (200)
                saveXHR.onreadystatechange = function () {
                    if (this.readyState === 4 && this.status === 200) {
                        // Call the callback function
                        options.callback();
                    }
                };
            }
        }

        // Send the JSON to the server
        saveXHR.send(this.editor.getJSON());
    };

    window.Export = Export;
})(window);