/*
Uso:
creare un nuovo file indesign
copiare all'interno del file appena creato tutti gli oggetti aventi stili da sincronizzare
controllare che all'interno del doc ID vi siano solo gli stili da sincronizzare
usare lo script per sincronizzare
*/
// from https://indisnip.wordpress.com/2010/08/24/import-styles-from-file/
//get all import formats
var importFormat = Array(
    ["Character Styles", ImportFormat.CHARACTER_STYLES_FORMAT],
    ["Paragraph Styles", ImportFormat.PARAGRAPH_STYLES_FORMAT],
    ["Text Styles", ImportFormat.TEXT_STYLES_FORMAT],
    ["TOC Styles", ImportFormat.TOC_STYLES_FORMAT],
    ["Object Styles", ImportFormat.OBJECT_STYLES_FORMAT],
    ["Stroke Styles", ImportFormat.STROKE_STYLES_FORMAT],
    ["Table Styles", ImportFormat.TABLE_STYLES_FORMAT],
    ["Cell Styles", ImportFormat.CELL_STYLES_FORMAT],
    ["Table and Cell Styles", ImportFormat.TABLE_AND_CELL_STYLES_FORMAT]);
 
//get all import polices
var importPolicy = Array(
    ["Overwrite Styles with same name", GlobalClashResolutionStrategy.LOAD_ALL_WITH_OVERWRITE],
    ["Don't import Styles with same name", GlobalClashResolutionStrategy.DO_NOT_LOAD_THE_STYLE],
    ["Import all Styles but rename those with same name", GlobalClashResolutionStrategy.LOAD_ALL_WITH_RENAME]);
 
var importFormatD = Array();
for(var i = 0; i < importFormat.length; i++){
    importFormatD.push(importFormat[i][0]);
}
var importPolicyD = Array();
for(var i = 0; i < importPolicy.length; i++){
    importPolicyD.push(importPolicy[i][0]);
}
 
var styleImport = new Window('dialog', 'Adobe is lazy');
styleImport.alignChildren = 'center';
 
with(styleImport){
    styleImport.fontGroup = add('group');
    styleImport.fontGroup.orientation = 'column';
    styleImport.fontGroup.alignment = 'fill';
    styleImport.fontGroup.alignChildren = 'left';
    with(styleImport.fontGroup){
        styleImport.fontGroup.srcFileTxt = add('statictext', undefined, 'Source file:');
        styleImport.fontGroup.srcFile = add('edittext');
        styleImport.fontGroup.srcFile.enabled = false;
        styleImport.fontGroup.srcFile.alignment = 'fill';
        styleImport.fontGroup.btnBrowse = add('button', undefined, 'Browse');
        styleImport.fontGroup.btnBrowse.onClick = function(){
            var fileFilters = "InDesign:*.indd, All files:*.*";
            sourceFile = File.openDialog("choose file", fileFilters, false);
            if(sourceFile != null)styleImport.fontGroup.srcFile.text = sourceFile.fsName;
        }
    }
    styleImport.styleGrp = add('group');
    styleImport.styleGrp.orientation = 'column';
    styleImport.styleGrp.alignChildren = 'left';
    with(styleImport.styleGrp){
        styleImport.styleGrp.styleTxt = add('statictext', undefined, 'Import what?');
        styleImport.styleGrp.styleFormatDrop = add('dropdownlist', undefined, importFormatD);
        styleImport.styleGrp.styleFormatDrop.selection = 0;
        styleImport.styleGrp.styleTxt1 = add('statictext', undefined, 'Import Policy:');
        styleImport.styleGrp.stylePolicyDrop = add('dropdownlist', undefined, importPolicyD);
        styleImport.styleGrp.stylePolicyDrop.selection = 0;
        }
    styleImport.buttonGrp = add('group');
    styleImport.buttonGrp.orientation = 'row';
    with(styleImport.buttonGrp){
        styleImport.buttonGrp.btnOK = add('button', undefined, 'OK');
        styleImport.buttonGrp.btnCancel = add('button', undefined, 'Cancel');
        }
    };
 
styleImport.center();
var importDlg = styleImport.show();
 
if(importDlg == true && sourceFile != null){
    app.activeDocument.importStyles(importFormat[styleImport.styleGrp.styleFormatDrop.selection.index][1], sourceFile, importPolicy[styleImport.styleGrp.stylePolicyDrop.selection.index][1]);
    alert(importFormat[styleImport.styleGrp.styleFormatDrop.selection.index][0] + " successfully imported!");
}
