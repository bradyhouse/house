/**
 * This class defines a single style in the current workbook. This element is optional,
 * but is required to perform any custom formatting.
 *
 *
 * A style can be either standalone or based on one other style (this is called the parent style), in which case,
 * all base properties are first inherited from the parent, then the properties in the style are treated as overrides.
 * Parent styles must be specified before they are first referenced.
 *
 */
Ext.define('Ext.exporter.file.excel.Style', {
    extend: 'Ext.exporter.file.Base',

    config: {
        /**
         * @cfg {String} id
         * A unique name within this XML document that identifies this style. This string can be any valid
         * identifier and there is no notion of order. The special value of "Default" indicates that this style
         * represents the default formatting for this workbook.
         *
         */

        /**
         * @cfg {String} parentId
         *
         * Presence of this element indicates that this style should first inherit it's default formatting settings
         * from the specified parent style. Then, after the parent settings are inherited, we apply the settings in
         * this style as overrides. This attribute refers to a predefined style ID.
         *
         */
        parentId: null,
        /**
         * @cfg {String} name
         *
         * This property identifies this style as a named style that was created in Excel using the Style
         * command (Format menu). Duplicate names are illegal.
         *
         */
        name: null,
        /**
         * @cfg {Object} protection Defines the protection properties that should be used in cells referencing this style.
         * This element exists as a short-hand way to apply protection to an entire table, row, or column, by simply adding it to a style.
         *
         * Following keys are allowed on this object and are all optional:
         *
         * - **Protected** (Boolean): This attribute indicates whether or not this cell is protected. When the worksheet is
         * unprotected, cell-level protection has no effect. When a cell is protected, it will not allow the user to
         * enter information into it. Defaults to `true`.
         *
         * - **HideFormula** (Boolean): This attribute indicates whether or not this cell's formula should be hidden when
         * worksheet protection is enabled. Defaults to `false`.
         *
         */
        protection: null,
        /**
         * @cfg {Object} alignment
         *
         * Following keys are allowed on this object and are all optional:
         *
         * - **Horizontal** (String): specifies the left-to-right alignment of text within a cell. The Spreadsheet component
         * does not support `CenterAcrossSelection`, `Fill`, `Justify`, `Distributed`, and `JustifyDistributed`.
         * Possible values: `Automatic`, `Left`, `Center`, `Right`, `Fill`, `Justify`, `CenterAcrossSelection`, `Distributed`,
         * and `JustifyDistributed`. Default is `Automatic`.
         *
         * - **Indent** (Integer): specifies the number of indents. This attribute is not supported by the Spreadsheet component.
         * Defaults to `0`.
         *
         * - **ReadingOrder** (String): specifies the default right-to-left text entry mode for a cell. The Spreadsheet component
         * does not support `Context`. Possible values: `RightToLeft`, `LeftToRight`, and `Context`. Defaults to `Context`.
         *
         * - **Rotate** (Double): Specifies the rotation of the text within the cell. `90` is straight up, `0` is horizontal,
         * and `-90` is straight down. The Spreadsheet component does not support this attribute. Defaults to `0`.
         *
         * - **ShrinkToFit** (Boolean): `true` means that the text size should be shrunk so that all of the text fits within the cell.
         * `false` means that the font within the cell should behave normally. The Spreadsheet component does not support this attribute.
         * Defaults to `false`.
         *
         * - **Vertical** (String): specifies the top-to-bottom alignment of text within a cell. `Distributed` and
         * `JustifyDistributed` are only legitimate values when **VerticalText** is `1`. The Spreadsheet component does
         * not support `Justify`, `Distributed`, or `JustifyDistributed`. Possible values: `Automatic`, `Top`, `Bottom`,
         * `Center`, `Justify`, `Distributed`, and `JustifyDistributed`. Defaults to `Automatic`.
         *
         * - **VerticalText** (Boolean): `true` specifies whether the text is drawn "downwards", whereby each letter is drawn horizontally,
         * one above the other. The Spreadsheet component does not support this attribute. Defaults to `false`.
         *
         * - **WrapText** (Boolean): specifies whether the text in this cell should wrap at the cell boundary. `false` means that
         * text either spills or gets truncated at the cell boundary (depending on whether the adjacent cell(s) have content).
         * The Spreadsheet component does not support this attribute. Defaults to `false`.
         *
         */
        alignment: null,
        /**
         * @cfg {Object} font Defines the font attributes to use in this style. Each attribute that is specified is
         * considered an override from the default.
         *
         *
         * Following keys are allowed on this object:
         *
         * - **Bold** (Boolean): Specifies the bold state of the font. If the parent style has **Bold**: `true` and the child style wants
         * to override the setting, it must explicitly set the value to **Bold**: `false`. If this attribute is not specified
         * within an element, the default is assumed. Defaults to `false`.
         *
         * - **Color** (String): Specifies the color of the font. This value can be either a 6-hexadecimal digit number
         * in "#rrggbb" format or it can be any of the Internet Explorer named colors (including the named Windows colors).
         * This string can also be special value of `Automatic`. This string is case insensitive. If this attribute is not
         * specified within an element, the default is assumed. Defaults to `Automatic`.
         *
         * - **FontName** (String): Specifies the name of the font. This string is case insensitive. If this attribute is
         * not specified within an element, the default is assumed. Defaults to `Arial`.
         *
         * - **Italic** (Boolean): Similar to **Bold** in behavior, this attribute specifies the italic state of the font.
         * If this attribute is not specified within an element, the default is assumed. Defaults to `false`.
         *
         * - **Outline** (Boolean): Similar to **Bold** in behavior, this attribute specifies whether the font is rendered as an
         * outline. This property originates in Macintosh Office, and is not used on Windows. If this attribute is not
         * specified within an element, the default is assumed. The Spreadsheet component does not support this attribute.
         * Defaults to `false`.
         *
         * - **Shadow** (Boolean): Similar to **Bold** in behavior, this attribute specifies whether the font is shadowed.
         * This property originates in Macintosh Office, and is not used on Windows. If this attribute is not
         * specified within an element, the default is assumed. The Spreadsheet component does not support this attribute.
         * Defaults to `false`.
         *
         * - **Size** (Number): Specifies the size of the font in points. This value must be strictly greater than 0.
         * If this attribute is not specified within an element, the default is assumed. Defaults to `10`.
         *
         * - **StrikeThrough** (Boolean): Similar to **Bold** in behavior, this attribute specifies the strike-through state
         * of the font. If this attribute is not specified within an element, the default is assumed. The Spreadsheet
         * component does not support this attribute. Defaults to `false`.
         *
         * - **Underline** (String): Specifies the underline state of the font. If the parent style is something other than
         * None and a child style wants to override the value, it must explicitly reset the value. If this attribute is
         * not specified within an element, the default is assumed. Possible values: `None`, `Single`, `Double`,
         * `SingleAccounting`, and `DoubleAccounting`. Defaults to `None`.
         *
         * - **VerticalAlign** (String): This attribute specifies the subscript or superscript state of the font. If this
         * attribute is not specified within an element, the default is assumed. The Spreadsheet component does not
         * support this attribute. Possible values: `None`, `Subscript`, and `Superscript`. Defaults to `None`.
         *
         * - **CharSet** (Number): Win32-dependent character set value. Defaults to `0`.
         *
         * - **Family** (String): Win32-dependent font family. Possible values: `Automatic`, `Decorative`, `Modern`,
         * `Roman`, `Script`, and `Swiss`. Defaults to `Automatic`.
         *
         */
        font: null,
        /**
         * @cfg {Object} interior Defines the fill properties to use in this style. Each attribute that is specified is
         * considered an override from the default.
         *
         * Following keys are allowed on this object:
         *
         * - **Color** (String): Specifies the fill color of the cell. This value can be either a 6-hexadecimal digit
         * number in "#rrggbb" format or it can be any of the Internet Explorer named colors (including the named
         * Windows colors). This string can also be special value of `Automatic`. This string is case insensitive.
         * If **Pattern**: "Solid", this value is the fill color of the cell. Otherwise, the cell is filled with a blend of
         * **Color** and **PatternColor**, with the **Pattern** attribute choosing the appearance.
         *
         * - **Pattern** (String): Specifies the fill pattern in the cell. The fill pattern determines how to blend the
         * **Color** and **PatternColor** attributes to produce the cell's appearance. The Spreadsheet component does not
         * support this attribute. Possible values: `None`, `Solid`, `Gray75`, `Gray50`, `Gray25`, `Gray125`, `Gray0625`,
         * `HorzStripe`, `VertStripe`, `ReverseDiagStripe`, `DiagStripe`, `DiagCross`, `ThickDiagCross`,
         * `ThinHorzStripe`, `ThinVertStripe`, `ThinReverseDiagStripe`, `ThinDiagStripe`, `ThinHorzCross`, and
         * `ThinDiagCross`. Defaults to `None`.
         *
         * - **PatternColor** (String): Specifies the secondary fill color of the cell when **Pattern** does not equal `Solid`.
         * The Spreadsheet component does not support this attribute. Defaults to `Automatic`.
         *
         */
        interior: null,
        /**
         * @cfg {String} format
         *
         * A number format code in the Excel number format syntax. This can also be one of the following values:
         * `General`, `General Number`, `General Date`, `Long Date`, `Medium Date`, `Short Date`, `Long Time`, `Medium Time`,
         * `Short Time`, `Currency`, `Euro Currency`, `Fixed`, `Standard`, `Percent`, `Scientific`, `Yes/No`,
         * `True/False`, or `On/Off`. All special values are the same as the HTML number formats, with the exception
         * of `Currency` and `Euro Currency`.
         *
         * `Currency` is the currency format with two decimal places and red text with parenthesis for negative values.
         *
         * `Euro Currency` is the same as `Currency` using the Euro currency symbol instead.
         *
         */
        format: null,
        /**
         * @cfg {Object[]} borders
         *
         * Array of border objects. Following keys are allowed for border objects:
         *
         * - **Position** (String): Specifies which of the six possible borders this element represents. Duplicate
         * borders are not permitted and are considered invalid. The Spreadsheet component does not support
         * `DiagonalLeft` or `DiagonalRight`. Possible values: `Left`, `Top`, `Right`, `Bottom`, `DiagonalLeft`, and
         * `DiagonalRight`
         *
         * - **Color** (String): Specifies the color of this border. This value can be either a 6-hexadecimal digit
         * number in "#rrggbb" format or it can be any of the Microsoft® Internet Explorer named colors
         * (including the named Microsoft Windows® colors). This string can also be the special value of `Automatic`.
         * This string is case insensitive.
         *
         * - **LineStyle** (String): Specifies the appearance of this border. The Spreadsheet component does
         * not support `SlantDashDot` and `Double`. Possible values: `None`, `Continuous`, `Dash`, `Dot`, `DashDot`,
         * `DashDotDot`, `SlantDashDot`, and `Double`.
         *
         * - **Weight** (Number): Specifies the weight (or thickness) of this border. This measurement is specified in points,
         * and the following values map to Excel: `0`—Hairline, `1`—Thin, `2`—Medium, `3`—Thick.
         *
         */
        borders: null
    },

    statics: {
        // used to validate the provided values
        checks: {
            alignment: {
                Horizontal: ['Automatic', 'Left', 'Center', 'Right', 'Fill', 'Justify', 'CenterAcrossSelection',
                    'Distributed', 'JustifyDistributed'],
                Indent: null,
                ReadingOrder: ['LeftToRight', 'RightToLeft', 'Context'],
                Rotate: null,
                ShrinkToFit: [true, false],
                Vertical: ['Automatic', 'Top', 'Bottom', 'Center', 'Justify', 'Distributed', 'JustifyDistributed'],
                VerticalText: [true, false],
                WrapText: [true, false]
            },
            font: {
                Bold: [true, false],
                CharSet: null,
                Color: null,
                FontName: null, // this means that all font names are allowed
                Family: ['Automatic', 'Decorative', 'Modern', 'Roman', 'Script', 'Swiss'],
                Italic: [true, false],
                Outline: [true, false],
                Shadow: [true, false],
                Size: null, // all sizes allowed
                StrikeThrough: [true, false],
                Underline: ['None', 'Single', 'Double', 'SingleAccounting', 'DoubleAccounting'],
                VerticalAlign: ['None', 'Subscript', 'Superscript']
            },
            border: {
                Position: ['Left', 'Top', 'Right', 'Bottom', 'DiagonalLeft', 'DiagonalRight'],
                Color: null,
                LineStyle: ['None', 'Continuous', 'Dash', 'Dot', 'DashDot', 'DashDotDot', 'SlantDashDot', 'Double'],
                Weight: [0, 1, 2, 3]
            },
            interior: {
                Color: null,
                Pattern: ['None', 'Solid', 'Gray75', 'Gray50', 'Gray25', 'Gray125', 'Gray0625', 'HorzStripe',
                    'VertStripe', 'ReverseDiagStripe', 'DiagStripe', 'DiagCross', 'ThickDiagCross', 'ThinHorzStripe',
                    'ThinVertStripe', 'ThinReverseDiagStripe', 'ThinDiagStripe', 'ThinHorzCross', 'ThinDiagCross'],
                PatternColor: null
            },
            protection: {
                Protected: [true, false],
                HideFormula: [true, false]
            }
        }
    },

    tpl: [
        '       <Style ss:ID="{id}"',
        '<tpl if="this.exists(parentId)"> ss:Parent="{parentId}"</tpl>',
        '<tpl if="this.exists(name)"> ss:Name="{name}"</tpl>',
        '>\n',
        '<tpl if="this.exists(alignment)">           <Alignment{[this.getAttributes(values.alignment, "alignment")]}/>\n</tpl>',
        '<tpl if="this.exists(borders)">',
        '           <Borders>\n',
        '<tpl for="borders">               <Border{[this.getAttributes(values, "border")]}/>\n</tpl>',
        '           </Borders>\n',
        '</tpl>',
        '<tpl if="this.exists(font)">           <Font{[this.getAttributes(values.font, "font")]}/>\n</tpl>',
        '<tpl if="this.exists(interior)">           <Interior{[this.getAttributes(values.interior, "interior")]}/>\n</tpl>',
        '<tpl if="this.exists(format)">           <NumberFormat ss:Format="{format}"/>\n</tpl>',
        '<tpl if="this.exists(protection)">           <Protection{[this.getAttributes(values.protection, "protection")]}/>\n</tpl>',
        '       </Style>\n',
        {
            exists: function(value){
                return !Ext.isEmpty(value);
            },
            getAttributes: function(obj, checkName){
                var template = ' ss:{0}="{1}"',
                    checks = this.owner.self.checks,
                    keys = Ext.Object.getKeys(obj || {}),
                    len = keys.length,
                    s = '',
                    i, arr, key;

                if(checks[checkName]) {
                    for (i = 0; i < len; i++) {
                        key = keys[i];
                        arr = checks[checkName][key];
                        // add the key/value pair if the provided value exists
                        if (Ext.isEmpty(arr) || Ext.Array.indexOf(arr, obj[key]) >= 0) {
                            s += Ext.String.format(template, key, Ext.isBoolean(obj[key]) ? Number(obj[key]) : obj[key]);
                        }
                        //<debug>
                        else{
                            Ext.raise(Ext.String.format('Invalid key (%0) or value (%1) provided for Style!', key, obj[key]));
                        }
                        //</debug>
                    }
                }

                return s;
            }
        }
    ]

});
