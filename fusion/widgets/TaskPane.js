/**
 * Fusion.Widget.TaskPane
 *
 * $Id: TaskPane.js 2579 2012-09-07 09:20:12Z jng $
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
 * Class: Fusion.Widget.TaskPane
 *
 * A utility widget that holds output from other widgets.
 * 
 * Inherits from:
 *  - <Fusion.Widget>
 ****************************************************************************/
 
Fusion.Event.TASK_PANE_LOADED = Fusion.Event.lastEventId++;

Fusion.Widget.TaskPane = OpenLayers.Class(Fusion.Widget, {
    aExecutedTasks: null,   //array of URLs for tasks execcuted in the TaskPane
    nCurrentTask: -1,
    nTasks: 0,
    
    initializeWidget: function(widgetTag){
        this.aExecutedTasks = [];
        var url = Fusion.getFusionURL();
        var homeIcon =  url + widgetTag.location + 'TaskPane/taskpane.png';
        var homeClass = 'TaskPane_home';
        var prevIcon =  url + widgetTag.location + 'TaskPane/taskpane.png';
        var prevClass = 'TaskPane_back';
        var nextIcon =  url + widgetTag.location + 'TaskPane/taskpane.png';
        var nextClass = 'TaskPane_forward';
        var taskIcon =  url + widgetTag.location + 'TaskPane/taskpane.png';
        var taskClass = 'TaskPane_tasks';
        var initialTask = widgetTag.location + 'TaskPane/TaskPane.html';
              
        var json = widgetTag.extension;
        
        if (json.InitialTask) {
            initialTask = taskURL = json.InitialTask[0];
        } else {
            initialTask = url + initialTask;
        }
        
        homeIcon  = json.HomeIcon  ? json.HomeIcon[0]  : homeIcon;
        homeClass = json.HomeClass ? json.HomeClass[0] : homeClass;
        prevIcon  = json.PreviousIcon  ? json.PreviousIcon[0]  : prevIcon;
        prevClass = json.PreviousClass ? json.PreviousClass[0] : prevClass;
        nextIcon  = json.NextIcon  ? json.NextIcon[0]  : nextIcon;
        nextClass = json.NextClass ? json.NextClass[0] : nextClass;
        taskIcon  = json.TaskIcon  ? json.TaskIcon[0]  : taskIcon;
        taskClass = json.TaskClass ? json.TaskClass[0] : taskClass;
        
        if (json.MenuContainer) {
            this.menuName = json.MenuContainer[0];
        }
        
        this.toolbar = new Jx.Toolbar();

        this.homeButton = new Jx.Button({
            image: homeIcon, 
            imageClass: homeClass,
            tooltip: OpenLayers.i18n('taskHome'),
            onClick: OpenLayers.Function.bind(this.goHome, this)
        });
        this.prevButton = new Jx.Button({
            image: prevIcon, 
            imageClass: prevClass,
            tooltip: OpenLayers.i18n('prevTask'),
            onClick: OpenLayers.Function.bind(this.gotoPrevTask, this)
        });
        this.nextButton = new Jx.Button({
            image: nextIcon, 
            imageClass: nextClass,
            tooltip: OpenLayers.i18n('nextTask'),
            onClick: OpenLayers.Function.bind(this.gotoNextTask, this)
        });
        this.toolbar.add(
            this.homeButton,
            this.prevButton,
            this.nextButton
        );

        this.taskMenu = new Jx.Menu({
            image: taskIcon,
            imageClass: taskClass,
            label: OpenLayers.i18n('taskList'), 
            right:0
        });
        $(this.taskMenu.domObj).addClass('taskMenu');
        $(this.taskMenu.button.domObj).addClass('jxButtonContentLeft');
        this.toolbar.add(this.taskMenu);
        
        var iframeName = this.name+'_IFRAME';
        this.iframe = document.createElement('iframe');
        new Jx.Layout(this.iframe);
        this.iframe.setAttribute('name', iframeName);
        this.iframe.setAttribute('id', iframeName);
        this.iframe.setAttribute('frameborder', 0);
        this.iframe.style.border = '0px solid #fff';
        this.oTaskPane = new Jx.Panel({
            toolbars: [this.toolbar], 
            hideTitle: true,
            content: this.iframe
        });
        $(this.domObj).addClass('taskPanePanel');
        Fusion.addWidgetStyleSheet(widgetTag.location + 'TaskPane/TaskPane.css');
        
        this.domObj.appendChild(this.oTaskPane.domObj);
        //we need to trigger an initial resize after the panel
        //is added to the DOM
        this.oTaskPane.domObj.resize();
        
        Fusion.registerEventID(Fusion.Event.TASK_PANE_LOADED);
        Fusion.registerForEvent(Fusion.Event.FUSION_INITIALIZED, OpenLayers.Function.bind(this.setTaskMenu, this));
        this.getMap().registerForEvent(Fusion.Event.MAP_LOADED, OpenLayers.Function.bind(this.setInitialContent, this, initialTask));
    },
    
    updateButtons: function() {
        this.prevButton.setEnabled(this.nCurrentTask > 0);
        this.nextButton.setEnabled(this.nCurrentTask < this.aExecutedTasks.length - 1);
    },
    
    gotoPrevTask: function() {
        this.nCurrentTask = this.nCurrentTask>0 ? --this.nCurrentTask : 0;
        var url = this.aExecutedTasks[this.nCurrentTask];
        this.loadFrame(url);
    },

    gotoNextTask: function() {
        this.nCurrentTask = this.nCurrentTask<this.aExecutedTasks.length-1 ? 
                          ++this.nCurrentTask : this.aExecutedTasks.length-1;
        var url = this.aExecutedTasks[this.nCurrentTask];
        this.loadFrame(url);
    },

    goHome: function() {
        this.nCurrentTask = 0;
        var url = this.aExecutedTasks[this.nCurrentTask];
        this.loadFrame(url);
    },

    setInitialContent: function(url) {
        this.aExecutedTasks = [];
        this.nCurrentTask = -1;
        this.setContent(url);
    },


    addCommonParams:function(url){
        //add in some common parameters if they aren't supplied already
        var baseUrl = url.split("?");
        var params = OpenLayers.Util.getParameters(url);
        var widgetLayer = this.getMapLayer();
        if (!params["LOCALE"] && !params["locale"]) {
          params["locale"] = Fusion.locale;
        }
        if (!params["SESSION"] && !params["session"]) {
          params["session"] = widgetLayer.getSessionID();
        }
        if (!params["MAPNAME"] && !params["mapname"]) {
          params["mapname"] = widgetLayer.getMapName();
        }
        var newUrl = baseUrl[0] + "?" + OpenLayers.Util.getParameterString(params);
        return newUrl;
    },
    
    isSameWithLast:function(url){
        return this.aExecutedTasks[this.aExecutedTasks.length-1] == this.addCommonParams(url) ;
    },
    
    setContent: function(url) {
        Fusion.triggerEvent(Fusion.Event.TASK_PANE_LOADED);
        
        var newUrl = this.addCommonParams(url);
        this.aExecutedTasks.push(newUrl);
        ++this.nCurrentTask;
        this.loadFrame(newUrl);
    },
    
    loadFrame: function(url) {
        this.iframe.src = url;
        this.iframe.taskPaneId = this.widgetTag.name;
        this.updateButtons();
    },

    /**
     * Creates a list of tasks to be included in the task menu, once all widgets 
     * have been created.
     *
     */
    setTaskMenu: function() {
        if (this.menuName) {
            var container = this.getMap().widgetSet.getContainerByName(this.menuName);
            if (container) {
                container.createWidgets(this.getMap().widgetSet, this.taskMenu);
            }
        }
    }
   
});
