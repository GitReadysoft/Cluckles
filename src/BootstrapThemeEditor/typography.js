(function (window) {
	"use strict";

	/**
	 * Allows modification of the Typography component in Bootstrap.
	 * 
	 * @class Typography
	 * @extends ThemeModifier
	 * 
	 * @param {ThemeEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} fontFamilySansSerif The @font-family-sans-serif variable which controls the Font Family Sans Serif of the Typography component.
	 * @property {object} fontFamilySerif The @font-family-serif variable which controls the Font Family Serif of the Typography component.
	 * @property {object} fontFamilyMonospace The @font-family-serif variable which controls the Font Family Monospace of the Typography component.
	 * @property {object} fontSizeBase The @font-size-base variable which controls the Font Size Base of the Typography component.
	 * @property {object} headingsFontFamily The @headings-font-family variable which controls the Headings Font Family of the Typography component.
	 * @property {object} headingsFontWeight The @headings-font-weight variable which controls the Headings Font Weight of the Typography component.
	 * @property {object} headingsLineHeight The @headings-line-height variable which controls the Headings Line Height of the Typography component.
	 * @property {object} headingsColor The @headings-color variable which controls the Headings Color of the Typography component.
	 * 
	 * @returns {Typography}
	 */
	var Typography = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor

        // Configure the Modifiers
		this.fontFamilySansSerif = {
			variable: '@font-family-sans-serif',
			value: null
		};
		this.fontFamilySerif = {
			variable: '@font-family-serif',
			value: null
		};
		this.fontFamilyMonospace = {
			variable: '@font-family-monospace',
			value: null
		};
		this.fontSizeBase = {
			variable: '@font-size-base',
			value: null
		};
		this.headingsFontFamily = {
			variable: '@headings-font-family',
			value: null
		};
		this.headingsFontWeight = {
			variable: '@headings-font-weight',
			value: null
		};
		this.headingsLineHeight = {
			variable: '@headings-line-height',
			value: null
		};
		this.headingsColor = {
			variable: '@headings-color',
			value: null
		};
		
        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            fontFamilySansSerif:    this.fontFamilySansSerif,
            fontFamilySerif:        this.fontFamilySerif,
            fontFamilyMonospace:    this.fontFamilyMonospace,
            fontSizeBase:           this.fontSizeBase,
            headingsFontFamily:     this.headingsFontFamily,
            headingsFontWeight:     this.headingsFontWeight,
            headingsLineHeight:     this.headingsLineHeight,
            headingsColor:          this.headingsColor
        };
	};
	
	// Inherit from parent Prototype and preserve constructor
	Typography.prototype = Object.create(ThemeModifier.prototype);
	Typography.constructor = Typography;

    /**
     * Gets the Font Family Sans Serif of the Typography Component.
     * 
     * @returns {string}
     */
    Typography.prototype.getFontFamilySansSerif = function () {
        return this.modifiers.fontFamilySansSerif.value;
    };
    
    /**
     * Sets the Font Family Sans Serif of the Typography Component.
     * 
     * @param {string} fontFamilySansSerif Sets the Typography Font Family Sans Serif.
     * 
     * @returns {undefined}
     */
    Typography.prototype.setFontFamilySansSerif = function (fontFamilySansSerif) {
        this.modifiers.fontFamilySansSerif.value = fontFamilySansSerif;
        this.editor.queueModifications();
    };

    /**
     * Gets the Font Family Serif of the Typography Component.
     * 
     * @returns {string}
     */
    Typography.prototype.getFontFamilySerif = function () {
        return this.modifiers.fontFamilySerif.value;
    };
    
    /**
     * Sets the Font Family Serif of the Typography Component.
     * 
     * @param {string} fontFamilySerif Sets the Typography Font Family Serif.
     * 
     * @returns {undefined}
     */
    Typography.prototype.setFontFamilySerif = function (fontFamilySerif) {
        this.modifiers.fontFamilySerif.value = fontFamilySerif;
        this.editor.queueModifications();
    };

    /**
     * Gets the Font Family Monospace of the Typography Component.
     * 
     * @returns {string}
     */
    Typography.prototype.getFontFamilyMonospace = function () {
        return this.modifiers.fontFamilyMonospace.value;
    };
    
    /**
     * Sets the Font Family Monospace of the Typography Component.
     * 
     * @param {string} fontFamilyMonospace Sets the Typography Font Family Monospace.
     * 
     * @returns {undefined}
     */
    Typography.prototype.setFontFamilyMonospace = function (fontFamilyMonospace) {
        this.modifiers.fontFamilyMonospace.value = fontFamilyMonospace;
        this.editor.queueModifications();
    };

    /**
     * Gets the Font Size Base of the Typography Component.
     * 
     * @returns {string}
     */
    Typography.prototype.getFontSizeBase = function () {
        return this.modifiers.fontSizeBase.value;
    };

    /**
     * Sets the Font Size Base of the Typography Component.
     * 
     * @param {string} fontSizeBase Sets the Typography Font Size Base.
     * 
     * @returns {undefined}
     */
    Typography.prototype.setFontSizeBase = function (fontSizeBase) {
        this.modifiers.fontSizeBase.value = fontSizeBase + 'px';
        this.editor.queueModifications();
    };

    /**
     * Gets the Headings Font Family of the Typography Component.
     * 
     * @returns {string}
     */
    Typography.prototype.getHeadingsFontFamily = function () {
        return this.modifiers.headingsFontFamily.value;
    };

    /**
     * Sets the Headings Font Family of the Typography Component.
     * 
     * @param {string} headingsFontFamily Sets the Typography Headings Font Family.
     * 
     * @returns {undefined}
     */
    Typography.prototype.setHeadingsFontFamily = function (headingsFontFamily) {
        this.modifiers.headingsFontFamily.value = headingsFontFamily;
        this.editor.queueModifications();
    };

    /**
     * Gets the Headings Font Weight of the Typography Component.
     * 
     * @returns {string}
     */
    Typography.prototype.getHeadingsFontWeight = function () {
        return this.modifiers.headingsFontWeight.value;
    };

    /**
     * Sets the Headings Font Weight of the Typography Component.
     * 
     * @param {string} headingsFontWeight Sets the Typography Headings Font Weight.
     * 
     * @returns {undefined}
     */
    Typography.prototype.setHeadingsFontWeight = function (headingsFontWeight) {
        this.modifiers.headingsFontWeight.value = headingsFontWeight;
        this.editor.queueModifications();
    };

    /**
     * Gets the Headings Line Height of the Typography Component.
     * 
     * @returns {string}
     */
    Typography.prototype.getHeadingsLineHeight = function () {
        return this.modifiers.headingsLineHeight.value;
    };

    /**
     * Sets the Headings Line Height of the Typography Component.
     * 
     * @param {string} headingsLineHeight Sets the Typography Headings Line Height.
     * 
     * @returns {undefined}
     */
    Typography.prototype.setHeadingsLineHeight = function (headingsLineHeight) {
        this.modifiers.headingsLineHeight.value = headingsLineHeight;
        this.editor.queueModifications();
    };

    /**
     * Gets the Headings Color of the Typography Component.
     * 
     * @returns {string}
     */
    Typography.prototype.getHeadingsColor = function () {
        return this.modifiers.headingsColor.value;
    };

    /**
     * Sets the Headings Color of the Typography Component.
     * 
     * @param {string} headingsColor Sets the Typography Headings Color.
     * 
     * @returns {undefined}
     */
    Typography.prototype.setHeadingsColor = function (headingsColor) {
        this.modifiers.headingsColor.value = headingsColor;
        this.editor.queueModifications();
    };

	window.Typography = Typography;
})(window);