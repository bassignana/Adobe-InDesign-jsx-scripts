// To avoid conflicts when two book are open at the same moment
//if (app.books.length != 1)
//{
//   alert ("Please make sure you only have exactly one book open. Thank you.");
//   exit();
//}

// Change [High Quality Print] to the name of the preset you want to use
// var myPDFExportPreset = app.pdfExportPresets.item("[High Quality Print]");

// var myDoc = app.activeBook; for exporting the whole book
var myDoc = app.activeDocument;
var myFolderName = "~/Desktop/IdPDFCompare"

// Apply a name to the PDF file based on the INDD file, but without the .indd extension
var myDocumentName =  myDoc.name.slice (0, -5);
var myFilePath = myFolderName + "/" + myDocumentName + "_prima.pdf";
var myFile = new File(myFilePath);

// Do not open the PDF Export dialog box. Set "false" to "true" if you want the dialog box.
myDoc.exportFile(ExportFormat.pdfType, myFile, false)//, myPDFExportPreset);
