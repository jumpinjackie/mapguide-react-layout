/**
 * Fusion.Widget.SaveSession
 *
 * $Id: SaveSession.js 455 2011-05-17 17:24:43Z madair $
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

 /*****************************************************************************
 * Class: Fusion.Widget.SaveSession
 *
 * A Widget that saves the session folder and returns an unique id 
 * 
 * Inherits from:
 *  - <Fusion.Widget>
 ****************************************************************************/
Fusion.Event.SAVE_SESSION_FINISHED = Fusion.Event.lastEventId++;

Fusion.Widget.SaveSession = OpenLayers.Class(Fusion.Widget, {
    oSessionName: null,
    oInputURL: null,
    oSaveSessionLink: null,
    oSaveSessionShare: null,
    oEmail: null,
    oFacebook: null,
    oTwitter: null,
    oDialog: null,
    bDrawn: false,
    
    initializeWidget: function(widgetTag){
        var arch = this.getMapLayer().arch;
        var lang = Fusion.getScriptLanguage();
        this.script = 'layers/' + arch + '/' + lang + '/SaveSession.' + lang;

        this.getMap().registerEventID(Fusion.Event.SAVE_SESSION_FINISHED);
        this.oDialog  = new Jx.Dialog({
            id: 'saveSessionDialog',
            label: 'Save Session',
            modal: false,
            resize: true,
            width: 500,
            height: 150
        });
        
    },
    
    activate: function(){
        this.oDialog.open();
        this.drawSaving();
        this.save();
    },
    
    drawSaving: function() {   
      this.oDialog.content.empty();
      var info = document.createElement('div');
      info.innerHTML = "Saving session, please wait...";
      info.addClass('sheetTip');
      this.oDialog.content.adopt(info);
    },
    
    drawForm: function() {
      this.oDialog.content.empty();
      
      this.form = new Jx.Form({
        name: 'testForm',
        formClass: 'jxFormBlock'
      }).addTo(this.oDialog.content);
      
      this.oInputURL = new Jx.Field.Text({
        id: 'sessionUrl',
        name: 'sessionUrl',
        label: 'Session URL',
        width: 400
      }).addTo(this.form);
      
      var info = document.createElement('div');
      info.innerHTML = "Copy and paste the URL above to restore this session";
      info.addClass('sheetTip');
      this.oDialog.content.adopt(info);
      
    },
    
    save: function(){
        var that = this;
        var mapWidget = this.getMap();
        var mapLayer = this.getMapLayer();

        var aMapExtents  = [];
        aMapExtents[0] = parseFloat(mapWidget._oCurrentExtents.left);
        aMapExtents[1] = parseFloat(mapWidget._oCurrentExtents.bottom);
        aMapExtents[2] = parseFloat(mapWidget._oCurrentExtents.right);
        aMapExtents[3] = parseFloat(mapWidget._oCurrentExtents.top);


        var params = {
                parameters: OpenLayers.Util.getParameterString({
                    command: 'save',
                    extents: aMapExtents,
                    layers: mapLayer.aVisibleLayers,
                    session: mapLayer.getSessionID(),
                    mapname: mapLayer.getMapName()
                }),
                onComplete: function(xhr) {
                    var o = Fusion.parseJSON(xhr.responseText);
                    that.saveCallBack(o);
                }
        };
        if (mapLayer.hasSelection()) {
            params.parameters += "&queryfile=" + mapLayer._sQueryfile;
        }
        Fusion.ajaxRequest(this.script,params);
    },
    
    saveCallBack: function(oKey){
        if(oKey.error){
            alert(oKey.error);
        }
        if(oKey.sessionKey){
            this.drawForm();
            var restoreURI = new URI(window.location.href);
            restoreURI.setData({restoreState:oKey.sessionKey},true,'query');

            this.oInputURL.setValue(restoreURI.toString());
            /*
            this.oFacebook.href = "http://www.facebook.com/share.php?u="+escape(this.oInputURL.value)+"&t="+escape(this.oSessionName.value);
            this.oFacebook.target = "_blank";
            this.oTwitter.href = "http://twitter.com/home?status="+escape(this.oSessionName.value)+" :"+escape(this.oInputURL.value);
            this.oTwitter.target = "_blank";
            this.oEmail.href="mailto:?subject="+this.oSessionName.value+"&body="+escape("Here is a link to a map that I found interesting ")+this.oInputURL.value;
            
            //mailto:you@yourdomain.com?subject=Your Subject&body=Message for the body.
            this.showDiv(this.oSaveSessionShare);
            */
            //this.showDiv(this.oSaveSessionLink);
            this.oInputURL.field.focus();
            this.oInputURL.field.select();
        }
    }
    
});
