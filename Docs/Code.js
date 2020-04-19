/**
 * @OnlyCurrentDoc
 */
function onInstall(){
  onOpen();
}
function onOpen() {
  DocumentApp.getUi().createAddonMenu().addItem('Equation Editor ++', 'showSidebar').addToUi();
}
function showSidebar(){
  var html =HtmlService.createTemplateFromFile("EquationEditor++.html").evaluate().setTitle("Equation Editor ++");
  DocumentApp.getUi().showSidebar(html);
}

function findImage(){
  var selection = DocumentApp.getActiveDocument().getSelection();
  if (selection) {
    var elements = selection.getSelectedElements();
    for(var i = 0; i < elements.length; i++){
      if (elements[i].getElement().getType()== DocumentApp.ElementType.INLINE_IMAGE){
        return elements[i].getElement().asInlineImage();
      }  
    }
  }
  DocumentApp.getUi().alert('No equation found in selection.');
  return("CantFindImage");
}
function locate(element){
  par = element.getParent();
  var prev = element.getPreviousSibling();
  var i = 0;
  while(prev){
    i++;
    prev=prev.getPreviousSibling();
  }
  return DocumentApp.getActiveDocument().newPosition(par, i);
}

function insertEquation(URL,teX,replace){
  var pos;
  if (replace){
    var oldimg = findImage();

    pos = locate(oldimg);
    oldimg.removeFromParent();
  }
  else{
    cursor = DocumentApp.getActiveDocument().getCursor();
    if (cursor){
      pos=cursor;
    } else{
      DocumentApp.getUi().alert('Cannot find a location to insert the equation. Place your cursor in the desired location and try again.');
    }
  }
      var image = UrlFetchApp.fetch(URL)
      pos.insertInlineImage(image).setAltDescription(teX);
}

function getImageTex(){
  return findImage().getAltDescription();
}