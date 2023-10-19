// To avoid conflicts when two book are open at the same moment
if (app.books.length != 1)
{
   alert ("Please make sure you only have exactly one book open. Thank you.");
   exit();
}

// Change [High Quality Print] to the name of the preset you want to use
// var myPDFExportPreset = app.pdfExportPresets.item("[High Quality Print]");

var myDoc = app.activeBook;
var myFolderName = "~/Desktop/IdPDFCompare" // myDoc.filePath; 

// Apply a name to the PDF file based on the INDD file, but without the .indd extension
var myDocumentName =  myDoc.name.slice (0, -5);

// get the current time as a string
var currentTime = new Date();

var myFilePath = myFolderName + "/" + myDocumentName + "_dopo.pdf";
var myFile = new File(myFilePath);

// Do not open the PDF Export dialog box. Set "false" to "true" if you want the dialog box.
myDoc.exportFile(ExportFormat.pdfType, myFile, false)//, myPDFExportPreset);
