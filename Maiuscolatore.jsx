/*ISTRUZIONI
Copiare lo script nella cartella Indesign 202* > Scripts > Scripts Panel
Posizionarsi sul documento aperto da modificare ( magari fare una copia? )
Aprire la finestra trova di indesign e impostare la ricerca su GREP
Inserire il pattern GREP \<[\u]{2,}\>  (va incollato così com'è, dal \ al >)
dal menu a tendina scegliere cerca in "documento"
Selezionare la casella "Includi note a piè di pagina"
Selezionare la casella "includi livelli nascosti"
Selezionare la casella "includi pagine principali"
eventualmente si può chiudere la finestra di ricerca, le impostazioni verranno lette correramente comunque dallo script
Lanciare lo script attraverso Finestra > Utility > SCRIPT poi aprire la finestra script > tasto destro su Maiuscolatore > esegui script

Una prima verifica della corretta esecuzione consiste nel lanciare la ricerca GREP
così come impostata in precedenza, e verificare NON venga trovata alcuna parola.
Infatti, lo script dovrebbe aver trasformato tutte le parole in minuscolo anche se le vediamo Maiuscole grazio allo stile.
In questo modo, per indesign, sono a tutti gli effetti parole minuscole. (almeno così ho capito io)

Per verificare i cambiamenti, è possibile lanciare una ricerca per lo stile ttm e le
varianti nome_stile_ttm. Attenzione: utilizzare il trova formato della finestra GREP,
in modo da essere sicuri di eseguire la ricerca sugli stessi elementi, pagine mastro, 
note piè di pagina, ecc. su cui è avvenuta la sostituzione.

NOTA: per facilitare la ricerca degli stili creati, essi vengono generati al di fuori
delle cartelle degli stili. Come procedura di controllo mi sono dato la regola di controllare 
i nuovi stili e poi spostarli a mano nelle relative cartelle, in modo da avere sempre un promemoria
delle modifiche controllate.
Se la cosa dovesse risultare scomoda, si può sempre modificare lo script in modo che gli stili
vengano creati direttamente nelle cartelle degli stili corrispondenti al numero.

FINE ISTRUZIONI
*/

var doc = app.activeDocument;

// check if the character style "ttm" exists and create it if not
if (doc.characterStyles.itemByName("ttm") == null) {
    doc.characterStyles.add({name: "ttm", capitalization: Capitalization.ALL_CAPS})
}

// name reference
// TtM
// nome_TtM

// doc not cleear, better with just one doc open at a time
// also REMEMBER to check the box "find/change across documents" in the find/change dialog
// and also the box "include locked layers" in the find/change dialog ETC ETC
// also i can try to set up the grep directly from the script
finds = app.documents[0].findGrep(); //\<[\u]{2,}\>

for (i=0;i<finds.length;i++) {
//for (i=0;i<5;i++) {
//alert(finds[i].contents)
finds[i].contents=finds[i].contents.toLowerCase();
//alert(finds[i].contents)

    for (ch=0; ch<finds[i].contents.length; ch++) {
    //for (ch=0; ch<2; ch++) {

        charStyleObj = finds[i].characters[ch].appliedCharacterStyle // returns [object CharacterStyle]
        charStyleName = charStyleObj.name // returns the name as a string
        
        //get the folder name where the character style is
        charStyleGroup = charStyleObj.parent.name // returns the name as a string

        charGroup = doc.characterStyleGroups.itemByName(charStyleGroup) // returns [object CharacterStyleGroup]

        newCharStyleName = charStyleName + "_ttm"
        newCharStyleFullName = charStyleGroup + ' ' + newCharStyleName
        //alert(newCharStyleFullName)

        if (charStyleName == "[Nessuno]") {
            //alert("character style is [Nessuno], applied generic ttm style")
            finds[i].characters[ch].appliedCharacterStyle = doc.characterStyles.itemByName("ttm")
        } else if (doc.characterStyles.itemByName(newCharStyleFullName) == null) {
            //alert("creating new character style")
            doc.characterStyles.add({name: newCharStyleFullName, basedOn: charStyleObj, capitalization: Capitalization.ALL_CAPS})
            finds[i].characters[ch].appliedCharacterStyle = doc.characterStyles.itemByName(newCharStyleFullName)
        } else {
            //alert("character style already exists")
            finds[i].characters[ch].appliedCharacterStyle = doc.characterStyles.itemByName(newCharStyleFullName)
        }


    //}
} //= doc.characterStyles.itemByName("ttm")
}

alert("correctly applied ttm style to " + finds.length + " words")



/* some study
// Get the active document
var doc = app.activeDocument;

// Clear the find dialog -- you never know what's left there
app.findTextPreferences = null;

app.findTextPreferences.findWhat = "Tra"; // non case sensitive

//TODO: try to open the find/change dialog

myFound = doc.findText();
alert(myFound.length);
alert(myFound[0]);
alert(myFound[0].contents);


//myFound is an array of everything that was found. To select the first item (assuming that any were found), do
myFound[0].select();

//And to display the page/spread on which the first item was found, use this:
// A spread is a set of pages viewed together, such as the two pages of a book.
//app.activeWindow.activeSpread = myFound[0].parentTextFrames[0].parent.parent;

*/




/* old version
// Define the character style to apply
//var targetStyle = doc.characterStyles.add({
//    name: "All Caps Style",
//    appliedFont: "Helvetica",
//    pointSize: 12, 
//    fontStyle: "Regular"
//});


// Define regular expression to find all-capital words
var pattern = /[A-Z]{2,}/g;

// Loop through each story in the document
for (var i = 0; i < doc.stories.length; i++) {
    var story = doc.stories[i];

    // Get the contents of the story
    var contents = story.contents;

    // Find all matches of the pattern in the contents
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match
    var matches = contents.match(pattern);

    if (matches) {
        //alert("Found " + matches.length + " matching STRINGS in story " + i);
        
        // Loop through the matches strings
        for (var j = 0; j < matches.length; j++) {
            var match = matches[j];
            //alert("Matched string number" + j + ": " + match);
            
            // select the match string
            var matchSelection = doc.findText();
            matchSelection.findWhat = match;
            alert("matchSelection: " + matchSelection);
            matchSelection.appliedCharacterStyle = doc.characterStyles.itemByName("All Caps Style");

            // Convert the all-capital match to all-lowercase
            var lowercaseMatch = match.toLowerCase();
            
            //alert("Lowercase match: " + lowercaseMatch);
            
            // Prompt the user if they want to perform the substitution
            //var userChoice = confirm("Replace: '" + match + "' with lowercase: " + lowercaseMatch, true);        
            //if (userChoice) {
              // match = lowercaseMatch;  
              // Apply the character style (highlight color)
              //match.appliedCharacterStyle = doc.characterStyles.itemByName("All Caps Style");
              //match.characters.appliedCharacterStyle = doc.characterStyles.itemByName("All Caps Style");
              
              //alert("style applied");
            //     exit();
            //}

            // exit the program here
            //alert("exit");
            //exit();
            //for (var k = 0; k < found.length; k++) {
            //    if (found[k].contents === match) {
            //        // Replace the text with the lowercase version
            //        found[k].contents = lowercaseMatch;
            //        
            //        // Apply the character style
            //        found[k].applyCharacterStyle(targetStyle);
            //    }
            //}
        }
    }
}

// Alert when the script is done
alert("All-capital words have been processed.");
*/