function () {

    var myFiles = File.openDialog ("Please select file or files", "*.psd", true);
    if (!myFiles){
        $.writeln("it's not a file")
        retrun;
    }
 
    for(var i = 0 ;i < myFiles.length;i++) {
        var doc = open(myFiles[i]);
        doc.rotateCanvas(180);
        var basePath = doc.path;
        goTextExport2(doc, "", basePath)
        doc.rotateCanvas(180);
        doc.close(SaveOptions.DONOTSAVECHANGES);
    }
    
}

function goTextExport2(doc,  path, basePath) 
{
	
	 var layers = doc.layers;
     var layerSetCounter =doc.layerSets.length;	
    
	for (var layerIndex = layers.length; layerIndex > 0; layerIndex--)
	{
		
		// curentLayer ref
		var currentLayer = layers[layerIndex-1];

        var language = currentLayer.name.substring(0, 1);
        var language_is_big_letter = currentLayer.name.substring(0, 2);

        if (language.localeCompare("1")==0){
         
                disable_other_layers(doc, layers, currentLayer);
                save_doc_to_BMP(doc, "przyciski", basePath);
        }
        else if (language.localeCompare("2")==0){
      
                disable_other_layers(doc, layers, currentLayer);
                save_doc_to_BMP(doc, "przyciski", basePath);
        }
	}	
}

function save_doc_to_BMP(doc, directory, basePath){

	var newFileName;
	var exportPath = basePath + '\\BMP\\' ;
    
    var options = new BMPSaveOptions;
    options.depth = BMPDepthType.BMP_R5G6B5;
    newFileName = doc.name.replace('psd', 'bmp');
    myPath = exportPath + directory +'\\'+ newFileName;
    $.writeln(myPath);
    var bmpFile = new File(myPath);
    try {
        doc.saveAs(bmpFile, options, true, Extension.LOWERCASE);
    }
    catch(err) {
        $.writeln("can't create file");
    }
}

function disable_other_layers(doc, layers, currentLayer){

    for (var layerIndex = layers.length; layerIndex > 0; layerIndex--)
    {
        var currentLayer2 = layers[layerIndex-1];

        if(currentLayer2.name.localeCompare("Tło")==0){
            currentLayer2.visible = true;
        }
    else{
            currentLayer2.visible = false;
      }
    }
    currentLayer.visible = true;
}