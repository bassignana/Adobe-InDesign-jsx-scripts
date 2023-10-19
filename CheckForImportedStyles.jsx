// Check if we're running inside Adobe InDesign
var desktopPath = Folder.desktop.fsName;
alert(desktopPath);

var doc = app.activeDocument;
var characterStyles = getCharacterStyles(doc);

//alert(doc.characterStyles.everyItem().name)

//alert(doc)
//for (g = 0; g < doc.characterStyleGroups.length; g++) {
//  alert(doc.characterStyleGroups[g].name);
//}

if (characterStyles.length === 0) {
  alert("No character styles found in the document.");
} else {
  var stylesText = characterStyles.join(", \n");
  var file = new File(desktopPath + "/character_styles.txt");
  file.open("w");
  file.write(stylesText);
  file.close();
  alert("Character styles have been saved to a file on your Desktop.");
}
  

// Function to retrieve all character styles in the document, including styles within folders
function getCharacterStyles(doc) {
  var characterStyles = [];
  for (g = 0; g < doc.characterStyleGroups.length; g++) {
    for (s = 0; s < doc.characterStyleGroups[g].characterStyles.length; s++) {
      characterStyles.push(doc.characterStyleGroups[g].name + '_' + doc.characterStyleGroups[g].characterStyles[s].name);
    }
  }

  // add character styles that are not in a group
  for (s = 0; s < doc.characterStyles.length; s++) {
    characterStyles.push(doc.characterStyles[s].name);
  }
  return characterStyles;
}

// to add - function to see if the style is used in the chapter
