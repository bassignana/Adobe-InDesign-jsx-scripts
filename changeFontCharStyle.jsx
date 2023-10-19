// sostituisce in tutti gli stili di carattere l'alright sans otf al posto della versione tt

// style = app.activeDocument.characterStyles.item("sansTT");

// alert the font propertie of the style
//alert(style.appliedFont);

// change the font of the style to "Arial"
// style.appliedFont = "Alright Sans (OTF)";

//alert(style.appliedFont); // NOTA: the alert is not updated, but the style is changed!

var docName = app.activeDocument.name.split(".indd")[0];
var docFolder = app.activeDocument.filePath + "/" + docName + ".txt";
var docFile = File(docFolder);

//alert("there are " + app.activeDocument.characterStyles.length + " styles outside any group")
for (var style = 0; style < app.activeDocument.characterStyles.length; style++) {
    styleFont = app.activeDocument.characterStyles[style].appliedFont.fontFamily
    styleName = app.activeDocument.characterStyles[style].name

    if (styleFont == "Alright Sans (TT)") {
            
        app.activeDocument.characterStyles[style].appliedFont = "Alright Sans (OTF)"
            
            // save the name of the style to the folder of the indesign document
            docFile.open("a");
            docFile.writeln(styleName);
            docFile.close();
        }
    }
alert("done character styles outside groups");

//alert("there are " + app.activeDocument.characterStyleGroups.length + " groups of styles")
for (var group = 0; group < app.activeDocument.characterStyleGroups.length; group++) {
    parGroup = app.activeDocument.characterStyleGroups[group]

    //alert("there are " + parGroup.characterStyles.length + " styles in the current group")
    for (var style = 0; style < parGroup.characterStyles.length; style++) {
        styleFont = app.activeDocument.characterStyleGroups[group].characterStyles[style].appliedFont.fontFamily
        styleName = app.activeDocument.characterStyleGroups[group].characterStyles[style].name

        if (styleFont == "Alright Sans (TT)") {
            
            // NOTE: for assigning i have to reference the obj .appliedFont, for comparison i have to use .appliedFont.fontFamily!
            app.activeDocument.characterStyleGroups[group].characterStyles[style].appliedFont = "Alright Sans (OTF)"

            docFile.open("a");
            docFile.writeln(styleName);
            docFile.close();
        }
    }
}
alert("done character styles inside groups");