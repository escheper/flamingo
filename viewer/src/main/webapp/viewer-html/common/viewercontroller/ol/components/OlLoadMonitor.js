/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define ("viewer.viewercontroller.ol.components.OlLoadMonitor",{
    extend: "viewer.viewercontroller.ol.OlComponent",    
    config:{
        top:null,
        left:null,
        timeout:null
    },
    
    constructor: function (conf){    
        viewer.viewercontroller.ol.components.OlLoadMonitor.superclass.constructor.call(this, conf);
        // Make the control and add it to the openlayersmap
        var map = this.config.viewerController.mapComponent.getMap().getFrameworkMap();

        this.frameworkObject = new ol.control.LoadingPanel({
            timeOut: this.config.timeout,
            left:this.config.left,
            top:this.config.top
        });
        map.addControl(this.frameworkObject);
        this.config.viewerController.addListener(viewer.viewercontroller.controller.Event.ON_SELECTEDCONTENT_CHANGE,function(){
            this.frameworkObject.registerLayersLoadEvents_();
        },this);
       
        
        return this;
    },
 
    getExtComponents: function() {
        return [];
    }
    
});