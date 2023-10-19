var myDoc = app.activeDocument;

var sTypeList = [
"Paragraph",
"Character",
"Object",
"Table",
"Cell"
];
var sTypes = [
{stype: "paragraph", wtitle: "paragraph styles"},
{stype: "character", wtitle: "character styles"},
{stype: "object", wtitle: "object styles"},
{stype: "table", wtitle: "table styles"},
{stype: "cell", wtitle: "cell styles"}
];

var w1 = new Window('dialog','Styles of what type You want to compare?');
w1.alignChildren = "left";
var stlist = w1.add("dropdownlist",undefined,sTypeList);
stlist.selection = 0;

var g1 = w1.add("group");
g1.add("button",undefined,"OK");
g1.add("button",undefined,"Cancel");
w1.onShow = function(){
	stlist.size.width = g1.size.width;
	}
if (w1.show() != 1) exit();

var stylesType = sTypes[stlist.selection.index].stype;


var sNames = getStylesList(stylesType);

var w = new Window ('dialog','Compare '+sTypes[stlist.selection.index].wtitle);
w.alignChildren = 'left';
w.orientation = 'column';
w.maximumSize.width = 500;
w.maximumSize.height = 460;
var maingroup = w.add('group');
var pan = maingroup.add('panel', undefined, 'Select Styles:');
pan.alignChildren = 'left';
var cBox = [];
for (i = 0; i < sNames.length; i++){
    cBox[i] = pan.add('checkbox',undefined,sNames[i]);
    cBox[i].helpTip = sNames[i];
    }
var sb = maingroup.add('scrollbar {stepdelta: 26, jumpdelta: 78}');
sb.onChanging = function(){
    for (p = 0; p < cBox.length; p++){
        cBox[p].location.y = -1 * this.value + 26 * p + 13;
        }
    }
var myIfFindPGroup = w.add('group');
var myIfFindP = myIfFindPGroup.add("checkbox",undefined,"Search On Pages");
if (stlist.selection.index >= 2) myIfFindP.visible = false;
var butgroup = w.add('group');
var myCAll = butgroup.add('button',undefined,'Select All');
myCAll.onClick = function(){
	for (z=0;z<cBox.length;z++){if (cBox[z].enabled){cBox[z].value=true;}}
	}

var myUnCAll = butgroup.add('button',undefined,'Deselect All');
myUnCAll.onClick = function(){
	for (z=0;z<cBox.length;z++){if (cBox[z].enabled){cBox[z].value=false;}}
	}

var myButOK = butgroup.add('button',undefined,'OK');

var myCRGroup = w.add('group');
var myCR = myCRGroup.add('statictext',undefined,'(c) Eugenyus, 2009-2021, v3.1, Eugenyusbudantsev@gmail.com');
	
w.onShow = function(){
    maingroup.size.height = w.size.height - 130;
    maingroup.size.width = w.size.width - 20;
    pan.size.height = maingroup.size.height;
    pan.size.width = maingroup.size.width - 50;
    sb.size.height = maingroup.size.height - 13;
    sb.size.width = 20;
    sb.location = [maingroup.size.width - 30, 10];
    sb.maxvalue = cBox.length * 26 - pan.size.height + 26;
	myIfFindPGroup.size.width = w.size.width - 20;
	myIfFindPGroup.location = [20, w.size.height - 100];
    butgroup.size.width = w.size.width - 20;
    butgroup.location = [20, w.size.height - 75];
	myCRGroup.size.width = w.size.width - 20;
	myCRGroup.location = [20, w.size.height - 40];
    }
	
if (w.show() != 1) exit();

var myStyles = getSelectedStyles(cBox, stylesType);
runCompareStyles(myStyles,myIfFindP.value);

function runCompareStyles(myStyles,myIfFindP){
	var pstyles = "";
	var s = myStyles[0];
	var res = "name";
	for (var i = 0; i < myStyles.length; i++){res += "\t" + myStyles[i].name;}
	res += "\r";
	for (var obj in s){
		res += obj;
		for (i=0;i<myStyles.length;i++){
			try{var v = myStyles[i][obj];}catch(e){v = "undefined";}
			try{
				if (String(v).match("\\[")){
					v = v.name;
					}
				res += "\t"+String(v).replace("\t"," ");
				}
			catch(e){}
			}
		res+="\r";
		}
	// Поиск на страницах
	if (myIfFindP){
		var myMaximumValue = 400;
		var myProgressBarWidth = 400;
		myCreateProgressPanel(400, 400, "Starting...");
		myProgressPanel.show();
		
		res += "FOUND ON PAGES:"
		var myPages = "";
		var curP = new Array();
		app.findChangeTextOptions.includeMasterPages = true;
		
		for (k = 0; k<myStyles.length; k++){  //Цикл по стилям
			var stepCount = 0;
			app.findTextPreferences = app.changeTextPreferences = null;
			var mySt = myStyles[k];
			if (stylesType == 'character') {
				app.findTextPreferences.appliedCharacterStyle = mySt;
				}
			else{
				app.findTextPreferences.appliedParagraphStyle = mySt;
				}
			var myF = myDoc.findText();
			res += "\t" ;
			myPages ="";
			curP[0] = "";
			curP[1] = "";
			for (ft=0;ft<myF.length;ft++){  //Цикл по найденным объектам: определение страницы
				stepCount++; 
				myProgressPanel.text = 'Search In Document: ' + mySt.name;
				myProgressPanel.myProgressBar.value = 400*stepCount/myF.length;
				
				var prr = 0;
				try{var myPg = myF[ft].parentTextFrames[0].parentPage.name;}catch(e){myPg = "undefined";}
				curP[0] = curP[1];
				curP[1] = myPg;
				if (!myPages.match(curP[1]+",")) {myPages += curP[1]+", "};
				}  //Цикл по найденным объектам: определение страницы
			myPages = myPages.slice(0,-2); //Выкинули последнюю запятую с пробелом для красоты
			res += myPages;
			} //Цикл по стилям
		myProgressPanel.hide();
		} // IF myIfFindP
	showRes(res);
	}

function showRes(res){
	var myDoc2 = app.documents.add();
	myDoc2.documentPreferences.facingPages=false;
	myDoc2.layoutWindows[0].screenMode = 1936552048;
	var myTextFrame = myDoc2.textFrames.add ();
	var mySwatch = myDoc2.colors.add({colorValue:[0,0,50,0],name:"MarkDifferences"});
	var myGSwatch = myDoc2.colors.add({colorValue:[0,0,0,20],name:"ParamGroup"});
	myTextFrame.geometricBounds = myDoc2.pages[0].bounds;
	myTextFrame.contents = res;
	var myText = myTextFrame.parentStory.texts[0];
	try{myText.appliedFont = "Arial";}catch(e){}
	myText.pointSize = "9 pt";
	var myTable = myText.convertToTable ();
	
	with (myTable.rows[0]){
		rowType = 1162375799;
		fillColor = "Black";
		}
	with (myTable.rows[0].cells.everyItem().texts[0]){
		fillColor = "Paper";
		justification = 1667591796;
		pointSize = "12 pt";
		fontStyle = "Bold";
		}
	myTable.columns[0].cells.everyItem().texts[0].fontStyle = "Bold";
	
	//Выделим отличия
	for (rCount = 1;rCount<myTable.rows.length;rCount++){
		for (cCount = 1; cCount<myTable.rows[rCount].cells.length-1;cCount++){
			if (myTable.rows[rCount].cells[cCount].texts[0].contents != myTable.rows[rCount].cells[cCount+1].texts[0].contents){
				myTable.rows[rCount].cells.everyItem().fillColor = "MarkDifferences";
				}
			}
		}
	
	//Поверстаем...
	while (myTextFrame.overflows){
		var myPrTextFrame = myTextFrame;
		var myPage = myDoc2.pages.add ();
		var myTextFrame=myPage.textFrames.add ();
		myTextFrame.geometricBounds = myDoc2.pages[0].bounds;
		myTextFrame.previousTextFrame=myPrTextFrame;
		}
	app.activeWindow.activePage = myDoc2.pages[0];
	}

function myCreateProgressPanel(myMaximumValue, myProgressBarWidth, myComment){
	myProgressPanel = new Window('window', myComment);
	with(myProgressPanel){
		myProgressPanel.myProgressBar = add('progressbar', [12, 12,myProgressBarWidth, 24], 0, myMaximumValue);
		myProgressPanel.text = myComment;
		}
	}


function getStylesList(stylesType){
    var doc = app.activeDocument;
    var curStyleName = stylesType + "Styles";
    var curStyleGroupName = stylesType + "StyleGroups";
    var curScript = "var curStyles = doc." + curStyleName + ";\n";
    curScript += "var curStyleGroups = doc." + curStyleGroupName+";\n";
    app.doScript(curScript);
    var styleList = [];
    for (var i = 1; i < curStyles.length; i++){
        styleList.push(curStyles[i].name);
        }
    for (var i = 0; i < curStyleGroups.length; i++){
        curScript = "var curStylesInGroup = curStyleGroups[i]." + curStyleName + ";";
        app.doScript(curScript);
        for (var j = 0; j < curStylesInGroup.length; j++){
            styleList.push("(" + curStyleGroups[i].name + ") " + curStylesInGroup[j].name);
            }
        }
    return styleList;
    }

function getSelectedStyles(cBox, stylesType){
    var selStyles = [];
    for (var i = 0; i < cBox.length; i++){
        if (cBox[i].value){
            var nm = cBox[i].text.split(") ");
            if (nm.length == 1){
                var s = "selStyles.push(app.activeDocument." + stylesType + "Styles.itemByName(nm[0]));";
                }
            else{
                nm[0] = nm[0].substring(1);
                var s = "selStyles.push(app.activeDocument." + stylesType + "StyleGroups.itemByName(nm[0])." + stylesType + "Styles.itemByName(nm[1]));";
                }
            app.doScript(s);
            }
        }
    return selStyles;
    }