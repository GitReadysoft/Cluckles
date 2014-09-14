	/**
	 * Allows modification of the Blockquote component in Bootstrap.
	 * 
	 * @class Blockquote
	 * @extends ThemeModifier
	 * 
	 * @param {ClucklesEditor} editor instance which manages the less modifications.
	 * 
	 * @property {object} smallColor    The @blockquote-color variable which controls the Small Color of the Blockquote Component.
	 * @property {object} fontSize      The @blockquote-font-size variable which controls the Font Size of the Blockquote Component.
	 * @property {object} borderColor   The @blockquote-border-color variable which controls the Border Color of the Blockquote Component.
	 * 
	 * @returns {Blockquote}
	 */
	var Blockquote = function (editor) {
		ThemeModifier.call(this, editor); // Call parent constructor

        this.subscriberDataAttribute = 'data-cluckles-blockquote';

        // Configure the Modifiers
		this.smallColor = {
			variable:           '@blockquote-small-color',
            subscribeProperty:  'small-color',
            changeFn:           this.setSmallColor.bind(this),
            subscribers:        [],
			_value:             null
        };
		this.fontSize = {
			variable:           '@blockquote-font-size',
            subscribeProperty:  'font-size',
            changeFn:           this.setFontSize.bind(this),
            subscribers:        [],
			_value:             null
		};
		this.borderColor = {
			variable:           '@blockquote-border-color',
            subscribeProperty:  'border-color',
            changeFn:           this.setBorderColor.bind(this),
            subscribers:        [],
			_value:             null
		};

        Object.defineProperty(this.fontSize, 'value', {
            get: function () { return this._value; },
            set: function (val) {
                this._value = val + 'px';
                editor.queueModifications();

                this.subscribers.forEach(function (subscriber) {
                    subscriber.value = val;
                });
            } 
        });
		
        // Configure the modifiers so they can be extracted easier
        this.modifiers = {
            smallColor:     this.smallColor,
            fontSize:       this.fontSize,
            borderColor:    this.borderColor
        };

        this.setupDataBinding();
	};
	
	// Inherit from parent Prototype and preserve constructor
	Blockquote.prototype                = Object.create(ThemeModifier.prototype);
	Blockquote.prototype.constructor    = Blockquote;

    /**
	 * Gets the Small Color of the Blockquote Component.
	 * 
	 * @returns {string}
	 */
	Blockquote.prototype.getSmallColor = function () {
		return this.modifiers.smallColor.value;
	};

	/**
	 * Sets the Small Color of the Blockquote Component.
	 * 
	 * @param {string} smallColor The Blockquote Small Color to set.
	 * 
	 * @returns {undefined}
	 */
	Blockquote.prototype.setSmallColor = function (smallColor) {
		this.modifiers.smallColor.value = smallColor;
	};

    /**
     * Gets the Font Size of the Blockquote Component.
     * 
     * @returns {string}
     */
    Blockquote.prototype.getFontSize = function () {
        return this.modifiers.fontSize.value;
    };

    /**
     * Sets the Font Size of the Blockquote Component.
     * 
     * @param {string} fontSize The Blockquote Font Size to set.
     * 
     * @returns {undefined}
     */
    Blockquote.prototype.setFontSize = function (fontSize) {
        this.modifiers.fontSize.value = fontSize;
    };

    /**
     * Gets the Border Color of the Blockquote Component.
     * 
     * @returns {string}
     */
    Blockquote.prototype.getBorderColor = function () {
        return this.modifiers.borderColor.value;
    };

    /**
     * Sets the Border Color of the Blockquote Component.
     * 
     * @param {string} borderColor The Blockquote Border Color to set.
     * 
     * @returns {undefined}
     */
    Blockquote.prototype.setBorderColor = function (borderColor) {
        this.modifiers.borderColor.value = borderColor;
    };