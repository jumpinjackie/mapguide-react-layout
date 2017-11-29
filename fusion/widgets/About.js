/**
 * Fusion.Widget.About
 *
 * $Id: About.js 2585 2012-09-07 14:01:25Z jng $
 *
 * Copyright (c) 2007, DM Solutions Group Inc.
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

/********************************************************************
* Class: Fusion.Widget.About
*
* About widget to display a pop-up window about the application.  The contents
* of the page are come from an HTML page set as the AboutUrl extension property.
*
* Inherits from:
*  - <Fusion.Widget>
* **********************************************************************/

Fusion.Widget.About = OpenLayers.Class(Fusion.Widget, {
    uiClass: Jx.Button,
    _nWidth: 500,
    _nHeight: 400,
    
    /* the url to open.  If specified, it is relative to the
     * application, not fusion
     */
     _sAboutUrl: null,
     
    /* the default url 
     */
    _sDefaultUrl: 'widgets/About/About.html',

    initializeWidget: function(widgetTag) {
        var json = widgetTag.extension;
        this._sAboutUrl = (json.AboutURL) ? json.AboutURL[0] : this._sDefaultUrl;
        
        if (this._sAboutUrl == this._sDefaultUrl) {
          this._sAboutUrl = Fusion.getFusionURL() + this._sAboutUrl;
        }
        
        this.enable();
    },

    /**
     * Function: activate
     *
     * opens a pop-up window with the about information when invoked
     * 
     */
    activate: function() {
      //console.log('About.execute');

      var sFeatures = 'menubar=no,location=no,resizable=no,status=no';
      sFeatures += ',width=' + this._nWidth;
      sFeatures += ',height=' + this._nHeight;
      window.open(this._sAboutUrl, 'AboutPopup', sFeatures);
    }
});
