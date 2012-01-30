/**
 * @class 
 * @constructor
 * @description The FlamingoVectorLayer class. In flamingo also known as EditMap. 
 **/

Ext.define("viewer.viewercontroller.flamingo.FlamingoVectorLayer",{
    extend: "viewer.viewercontroller.flamingo.FlamingoLayer",
    layerName: "layer1",
    constructor: function(config){
        viewer.viewercontroller.flamingo.FlamingoVectorLayer.superclass.constructor.call(this, config);
        this.initConfig(config);
        return this;
    },
    
    toXML : function(){
    
        return "";
    },

    getLayerName : function(){
        return this.layerName;
    },

    /**
     * Removes all the features from this vectorlayer
     */
    removeAllFeatures : function(){
        var flamingoObj = viewerController.wmc.viewerObject;//this.getFrameworkLayer();
        flamingoObj.callMethod(this.getId(),'removeAllFeatures');
    },


    /**
     * Gets the active feature from this vector layer
     * @return The active - generic type - feature from this vector layer.
     */
    getActiveFeature : function(){
        var flamingoObj = viewerController.wmc.viewerObject;//this.getFrameworkLayer();
        var flaFeature = flamingoObj.callMethod(this.id,'getActiveFeature');

        /* als er geen tekenobject op scherm staat is flaFeature null */
        if(flaFeature == null){
            return null;
        }

        var featureObj = new viewer.viewercontroller.controller.Feature();
        var feature = featureObj.fromFlamingoFeature(flaFeature);

        return feature;
    },

    /**
     * Get the feature on the given index
     * @param index The index of the feature.
     * @return The generic feature type on index
     */
    getFeature : function(index){
        return this.getAllFeatures()[index];
    },

    /**
     * Add a feature to this vector layer.
     * @param feature The generic feature to be added to this vector layer.
     */
    addFeature : function(feature){
        var flamingoObj = viewerController.wmc.viewerObject;//this.getFrameworkLayer();
        flamingoObj.callMethod(this.getId(),'addFeature',this.getLayerName(),feature.toFlamingoFeature());
    },

    /**
     * Gets all features on this vector layer
     * @return Array of generic features.
     */
    getAllFeatures : function(){
        var flamingoObj = viewerController.wmc.viewerObject;//this.getFrameworkLayer();
        var flamingoFeatures = flamingoObj.callMethod(this.getId(),"getAllFeaturesAsObject");
        var features = new Array();
        var featureObj = new viewer.viewercontroller.controller.Feature();
        for(var i = 0 ; i< flamingoFeatures.length ; i++){
            var flFeature = flamingoFeatures[i];
            var feature = featureObj.fromFlamingoFeature(flFeature);
            features.push(feature);
        }
        return features;
    },

    drawFeature : function(type){
        
       // viewerController.wmc.viewerObject;//this.getFrameworkLayer().callMethod(this.getId(),"editMapDrawNewGeometry",this.getLayerName(),type );
        viewerController.wmc.viewerObject.callMethod(this.getId(),"editMapDrawNewGeometry",this.getLayerName(),type );
    },

    /* stop editing */
    stopDrawDrawFeature : function(){
        //this.getFrameworkLayer().callMethod(this.getId(),"removeEditMapCreateGeometry",this.getLayerName());
        viewerController.wmc.viewerObject.callMethod(this.getId(),"removeEditMapCreateGeometry",this.getLayerName());
    }
    
    
});
