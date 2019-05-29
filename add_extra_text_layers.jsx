(function () {
    //var basePath = Folder.selectDialog( "Please select source folder");  
    var basePath = 'D:\\scripts_for_photoshop'
    var folder = new Folder(basePath);
    if(!folder) {
        return;
    } 
    var fileList = folder.getFiles(/\.(psd)$/i)


    $.writeln("Files to process ..." + fileList.length)
    for(var i = 0 ;i < fileList.length;i++) {
        $.writeln(i + "Files left")
        var doc = open(fileList[i]);
        goTextExport2(doc,doc,"")
        doc.close(SaveOptions.SAVECHANGES);
    }

})();

function goTextExport2(el, fileOut, path) 
{
			
	// Get the layers
	 var layers = el.layers;
     var layerSetCounter = el.layerSets.length;
     $.writeln("There is " + layerSetCounter + "layerSet");		
    
    $.writeln(el.layerSets[0].layers[0].kind == LayerKind.TEXT)
    el.layerSets[0].layers[0].textItem.contents = "dupa"
	for (var layerIndex = layers.length; layerIndex > 0; layerIndex--)
	{
		
		// curentLayer ref
		var currentLayer = layers[layerIndex-1];

		// Layer is visible and Text --> we can haz copy paste!
		//if (currentLayer.layerSets == /^LayerSet/) {
			//$.writeln("Folder")
			// goTextExport2(currentLayer, fileOut, path + currentLayer.name + '/');
		
		// currentLayer is not a LayerSet
		//else{	
            if ( (currentLayer.visible) && (currentLayer.kind == LayerKind.TEXT) )
            {
                currentLayer.textItem.contents = "Agnieszka";
                $.writeln(currentLayer.textItem.contents)
            }
       // }
	}	
}

// function goTextExport2(el, fileOut, path) 
// {
			
// 	// Get the layers
// 	var layers = el.layers;
			
// 	// Loop 'm
// 	for (var layerIndex = layers.length; layerIndex > 0; layerIndex--)
// 	{
		
// 		// curentLayer ref
// 		var currentLayer = layers[layerIndex-1];
		
// 		// currentLayer is a LayerSet
// 		if (currentLayer.typename == "LayerSet") {
		
// 			goTextExport2(currentLayer, fileOut, path + currentLayer.name + '/');
		
// 		// currentLayer is not a LayerSet
// 		} else {

// 			// Layer is visible and Text --> we can haz copy paste!
// 			if ( (currentLayer.visible) && (currentLayer.kind == LayerKind.TEXT) )
// 			{
// 				// fileOut.writeln(separator);
// 				// fileOut.writeln('');
// 				// fileOut.writeln('LayerPath: ' + path);
// 				// fileOut.writeln('LayerName: ' + currentLayer.name);
// 				// fileOut.writeln('');
// 				// fileOut.writeln('LayerContent:');
// 				// fileOut.writeln(currentLayer.textItem.contents);
// 				// fileOut.writeln('');
// 				$.writeln("in if")
// 			}
// 		}
		
		
// 	}
	

// }

