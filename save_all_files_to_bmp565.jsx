(function () {
    //var basePath = Folder.selectDialog( "Please select source folder");  
    var basePath = 'D:\\scripts_for_photoshop'
    var folder = new Folder(basePath);
    if(!folder) {
        return;
    } 
    var fileList = folder.getFiles(/\.(psd)$/i)
	const DIRS =['POLSKIE', 'ANGIELSKIE', 'NIEMIECKIE', 'ROSYJSKIE', 'UKRAINSKIE', 'FRANCUSKIE', 'HISZPANSKIE', 'WLOSKIE' ]
	var newFileName;
	var exportPath = basePath + '\\BMP\\' ;

    $.writeln("Files to process ..." + fileList.length)
    for(var i = 0 ;i < fileList.length;i++) {
        $.writeln(i)
        var doc = open(fileList[i]);
        var options = new BMPSaveOptions;
        options.depth = BMPDepthType.BMP_R5G6B5;
        doc.rotateCanvas(180);
        newFileName = doc.name.replace('psd', 'bmp');

        for(element in DIRS){
            myPath = exportPath + DIRS[element] +'\\'+ newFileName;
            $.writeln(myPath);
            var bmpFile = new File(myPath);
            try {
                doc.saveAs(bmpFile, options, true, Extension.LOWERCASE);
            }
            catch(err) {
                $.writeln("can't create file");
            }
        }
        doc.close(SaveOptions.DONOTSAVECHANGES);
    }
})();