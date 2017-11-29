/**
 * Fusion.Widget.ExtentHistory
 *
 * $Id: ExtentHistory.js 2579 2012-09-07 09:20:12Z jng $
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
 * Class: Fusion.Widget.ExtentHistory
 *
 * Maintain and navigate through a history of extents
 * 
 *  Inherits from:
 *  - <Fusion.Widget>
 * **********************************************************************/

Fusion.Event.HISTORY_CHANGED = Fusion.Event.lastEventId++;

Fusion.Widget.ExtentHistory = OpenLayers.Class(Fusion.Widget, {
    uiClass: Jx.Button,
    events: [],
    aHistory: [],
    sDirection: null,
    EPS: 0.00000001,  //percentage difference allowed in bounds values for test for equal
    initializeWidget: function(widgetTag) {
        var json = widgetTag.extension;
        var sDirection = json.Direction ? json.Direction[0].toLowerCase() : 'previous';
        if (sDirection != 'previous' && sDirection != 'next') {
            this.sDirection = 'previous';
        } else {
            this.sDirection = sDirection;
        }
        
        if (!this.aHistory['history']) {
            this.aHistory['history'] = [];
            this.aHistory['index'] = -1;
            this.getMap().registerForEvent(Fusion.Event.MAP_EXTENTS_CHANGED, 
                          OpenLayers.Function.bind(this.extentsChanged, this));
            this.getMap().registerForEvent(Fusion.Event.MAP_LOADED, 
                          OpenLayers.Function.bind(this.reset, this));
            
        }
        this.enable = Fusion.Widget.ExtentHistory.prototype.historyChanged;
        
        this.disable = Fusion.Widget.ExtentHistory.prototype.historyChanged;
        
        this.registerEventID(Fusion.Event.HISTORY_CHANGED);
        
        this.registerForEvent(Fusion.Event.HISTORY_CHANGED, 
                          OpenLayers.Function.bind(this.historyChanged, this));
        //console.log(this.events[Fusion.Event.HISTORY_CHANGED].length);
        this.disable();
    },
    
    reset: function() {
        if (this.getMap().isMapLoaded()) {
            this.aHistory['history'] = [this.getMap().getCurrentExtents()];
            this.aHistory['index'] = 0;
        } else {
            this.aHistory['history'] = [];
            this.aHistory['index'] = -1;
        }
        this.historyChanged();
    },
    
    extentsChanged: function() {
        var extents = this.getMap().getCurrentExtents();
        if (this.aHistory['history'].length == 0) {
            this.aHistory['history'].push(extents);
            this.aHistory['index'] = 0;
        } else {
            var aExtents = this.aHistory['history'][this.aHistory['index']];
            if (this.boundsEqual(extents, aExtents)) {
                return;
            }
            //clear forward history if we zoom to a different extent than contained in the history
            if (this.aHistory['index'] != (this.aHistory['history'].length - 1)) {
                this.aHistory['history'] = this.aHistory['history'].slice(0, this.aHistory['index'] + 1);
            }
            this.aHistory['history'].push(extents);
            this.aHistory['index'] = this.aHistory['history'].length - 1;
        }
        this.triggerEvent(Fusion.Event.HISTORY_CHANGED);
    },
    
    historyChanged: function() {
        if (this.sDirection == 'previous') {
            if (this.aHistory['index'] > 0) {
                Fusion.Widget.prototype.enable.apply(this,[]);
            } else {
                Fusion.Widget.prototype.disable.apply(this,[]);
            }
        } else {
            if (this.aHistory['index'] < (this.aHistory['history'].length - 1)) {
                Fusion.Widget.prototype.enable.apply(this,[]);
            } else {
                Fusion.Widget.prototype.disable.apply(this,[]);
            }
        }
    },

    activate: function() {
        if (this.sDirection == 'previous') {
            if (this.aHistory['index'] > 0) {
                this.aHistory['index'] --;
                this.getMap().setExtents(this.aHistory['history'][this.aHistory['index']]);
                this.triggerEvent(Fusion.Event.HISTORY_CHANGED);
            }
        } else {
            if (this.aHistory['index'] < (this.aHistory['history'].length - 1)) {
                this.aHistory['index'] ++;
                this.getMap().setExtents(this.aHistory['history'][this.aHistory['index']]);
                this.triggerEvent(Fusion.Event.HISTORY_CHANGED);
            }
        }
    },
    
    /* 
      * test if 2 OpenLayers.Bounds objects are equal to within some precision
      */
    boundsEqual: function(b1, b2) {
      var equal = false;
      
      //prevent divide by 0 errors
      var offset = 100;
      if (b2.top == 0) {
        b1.top += offset;
        b2.top += offset;
      }
      if (b2.bottom == 0) {
        b1.bottom += offset;
        b2.bottom += offset;
      }
      if (b2.left == 0) {
        b1.left += offset;
        b2.left += offset;
      }
      if (b2.right == 0) {
        b1.right += offset;
        b2.right += offset;
      }
      //calculate difference as percentage so all ranges of coordinates can be accommodated
      equal = (Math.abs((b1.top - b2.top) / b2.top) < this.EPS &&
               Math.abs((b1.bottom - b2.bottom) / b2.bottom) < this.EPS &&
               Math.abs((b1.left - b2.left) / b2.left) < this.EPS &&
               Math.abs((b1.right - b2.right) / b2.right) < this.EPS);
      return equal;
    }
});

