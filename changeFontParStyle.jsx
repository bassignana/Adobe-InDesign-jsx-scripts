// style = app.activeDocument.characterStyles.item("sansTT");

// alert the font propertie of the style
//alert(style.appliedFont);

// change the font of the style to "Arial"
// style.appliedFont = "Alright Sans (OTF)";

//alert(style.appliedFont); // NOTA: the alert is not updated, but the style is changed!

var docName = app.activeDocument.name.split(".indd")[0];
var docFolder = app.activeDocument.filePath + "/" + docName + ".txt";
var docFile = File(docFolder);

//alert("there are " + app.activeDocument.paragraphStyles.length + " styles outside any group")
for (var style = 0; style < app.activeDocument.paragraphStyles.length; style++) {
    styleFont = app.activeDocument.paragraphStyles[style].appliedFont.fontFamily
    styleName = app.activeDocument.paragraphStyles[style].name

    if (styleFont == "Alright Sans (TT)") {
            
        app.activeDocument.paragraphStyles[style].appliedFont = "Alright Sans (OTF)"
            
            // save the name of the style to the folder of the indesign document
            docFile.open("a");
            docFile.writeln(styleName);
            docFile.close();
        }
    }
alert("done paragraph styles outside groups");

//alert("there are " + app.activeDocument.paragraphStyleGroups.length + " groups of styles")
for (var group = 0; group < app.activeDocument.paragraphStyleGroups.length; group++) {
    parGroup = app.activeDocument.paragraphStyleGroups[group]

    //alert("there are " + parGroup.paragraphStyles.length + " styles in the current group")
    for (var style = 0; style < parGroup.paragraphStyles.length; style++) {
        styleFont = app.activeDocument.paragraphStyleGroups[group].paragraphStyles[style].appliedFont.fontFamily
        styleName = app.activeDocument.paragraphStyleGroups[group].paragraphStyles[style].name

        if (styleFont == "Alright Sans (TT)") {
            
            // NOTE: for assigning i have to reference the obj .appliedFont, for comparison i have to use .appliedFont.fontFamily!
            app.activeDocument.paragraphStyleGroups[group].paragraphStyles[style].appliedFont = "Alright Sans (OTF)"

            docFile.open("a");
            docFile.writeln(styleName);
            docFile.close();
        }
    }
}
alert("done paragraph styles inside groups");