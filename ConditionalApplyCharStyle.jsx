// testo formule: 
//      alfabeto piccolo -> corsivo dimensione piccola
//      alfabeto grande -> corsivo dimensione grande
//      numero -> regular dimenione numero
//      greek -> regular
//      math symbol -> regular stix
// apice formule:
//      alfabeto -> corsivo
//      numero -> regular
// pedice formule:
//      come apice

function isAlphabeticalLetter(character) {
  var characterList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
                       'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
                       'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
                       'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  for (var i = 0; i < characterList.length; i++) {
    if (characterList[i] === character) {
      return true;
    }
  }

  return false;

}

function isBigAlphabeticalLetter(character) {
  var characterList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
                       'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  for (var i = 0; i < characterList.length; i++) {
    if (characterList[i] === character) {
      return true;
    }
  }

  return false;

}

function isSmallAlphabeticalLetter(character) {
  var characterList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
                       'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',];

  for (var i = 0; i < characterList.length; i++) {
    if (characterList[i] === character) {
      return true;
    }
  }

  return false;

}

function isNum(character) {
  var characterList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

  for (var i = 0; i < characterList.length; i++) {
    if (characterList[i] === character) {
      return true;
    }
  }

  return false;

}

var doc = app.activeDocument;
var cg = doc.characterStyleGroups.item("010 Capitolo")
var selection = doc.selection[0];

for (var i = 0; i < selection.length; i++) {
  var c = selection.characters[i]
  var ch = c.contents;
  var chPosition = selection.characters[i].position
  var isAl = isAlphabeticalLetter(ch);

  if (chPosition === Position.SUBSCRIPT ) {
    if (isAl) {
        c.appliedCharacterStyle = cg.characterStyles.itemByName("10E formula txt pedice italic");
    } else {
        c.appliedCharacterStyle = cg.characterStyles.itemByName("10E formula txt pedice regular");
    }

  } else if (chPosition === Position.SUPERSCRIPT ) {
    if (isAl) {
        c.appliedCharacterStyle = cg.characterStyles.itemByName("10E formula txt apice italic");
    } else {
        c.appliedCharacterStyle = cg.characterStyles.itemByName("10E formula txt apice regular");
    }
  } else {

    if (isBigAlphabeticalLetter(ch)) {
       c.appliedCharacterStyle = cg.characterStyles.itemByName("10E formula txt big italic");       
    } else if (isSmallAlphabeticalLetter(ch)) {
        c.appliedCharacterStyle = cg.characterStyles.itemByName("10E formula txt italic");
    } else if (isNum(ch)) {
        c.appliedCharacterStyle = cg.characterStyles.itemByName("10E formula txt num regular");
    } else {
        c.appliedCharacterStyle = cg.characterStyles.itemByName("10E formula txt regular"); // symbols like greek and + / - etc etc
        } 
    }
}

