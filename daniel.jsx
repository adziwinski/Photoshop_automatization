(function () {
    var basePath = "D:\\test";
    var folder = new Folder(basePath);
    if(!folder) {
        return;
    } 
    var fileList = folder.getFiles(/\.(psd)$/i)
    $.writeln("Files to process ..." + fileList.length)
    for(var i = 0 ;i < fileList.length;i++) {
        $.writeln(i)
        var doc = open(fileList[i]);
        var options = new BMPSaveOptions;
        options.depth = BMPDepthType.BMP_R5G6B5;
        var path = basePath + '\\' + doc.name.replace('psd', 'bmp');
        $.writeln(path)
        var bmpFile = new File(path);
        try {
            doc.saveAs(bmpFile, options, true, Extension.LOWERCASE);
        }
        catch(err) {
            $.writeln("error")
        }
        finally {
            doc.close(SaveOptions.DONOTSAVECHANGES)
        } 

    }
})();