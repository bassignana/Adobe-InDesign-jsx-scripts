var df = app.activeDocument.fonts.everyItem().name;
writeText(Folder.desktop + "/" + app.activeDocument.name + "_fontlist.txt", 'Document Fonts: \r' + df.toString().replace(/,/g, '\r'))


/**
* Write a text file 
* @ param the file path 
* @ param the text 
*/

function writeText(p,s){
    var file = new File(p);
    file.encoding = 'UTF-8';
    file.open('w');
    file.write(s);
    file.close();
}


