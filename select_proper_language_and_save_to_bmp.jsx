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
     $.writeln("There is " + layerSetCounter + " layerSet");		
    
	for (var layerIndex = layers.length; layerIndex > 0; layerIndex--)
	{
		
		// curentLayer ref
		var currentLayer = layers[layerIndex-1];

        var language = currentLayer.name.substring(0, 2);

        if (language.localeCompare("PL")==0){
                $.writeln("polski");
                disable_other_layers(el, layers, currentLayer);
                save_doc_to_BMP(el, "POLSKIE");
        }
        else if (language.localeCompare("EN")==0){
                $.writeln("angielski");
                disable_other_layers(el, layers, currentLayer);
                
                /*
                for (var layerIndex2 = layers.length; layerIndex2 > 0; layerIndex2--)
                {
                    var currentLayer2 = layers[layerIndex2-1];
                    currentLayer2.visible = false;
                }
                currentLayer.visible = true;*/
                save_doc_to_BMP(el, "ANGIELSKIE");
        }
	}	
}

function foo (layerSets){
	if(layesSets.el.layerSets.length)
}

function save_doc_to_BMP(doc, directory){
    var basePath = 'D:\\scripts_for_photoshop'
//	const DIRS =['POLSKIE', 'ANGIELSKIE', 'NIEMIECKIE', 'ROSYJSKIE', 'UKRAINSKIE', 'FRANCUSKIE', 'HISZPANSKIE', 'WLOSKIE' ]
	var newFileName;
	var exportPath = basePath + '\\BMP\\' ;
    
    var options = new BMPSaveOptions;
    options.depth = BMPDepthType.BMP_R5G6B5;
    doc.rotateCanvas(180);
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

    for (var layerIndex2 = layers.length; layerIndex2 > 0; layerIndex2--)
    {
        $.writeln(currentLayer2.name.substring(0))
        //if(currentLayer2.name.localeCompare("Tlo",'en', {sensitivity: 'base'}))==0){
     //   if(currentLayer2.name.localeCompare("Tlo")==0){
            var currentLayer2 = layers[layerIndex2-1];
            currentLayer2.visible = false;
     // }
    //else{
       // var currentLayer2 = layers[layerIndex2-1];
//currentLayer2.visible = true;
     //  }
    }
    currentLayer.visible = true;
}
