/**
* @OnlyCurrentDoc
*/
function onOpen() {
  DocumentApp.getUi().createAddonMenu().addItem('Equation Editor ++', 'showSidebar').addToUi();
}
function onInstall() {
  DocumentApp.getUi().createAddonMenu().addItem('Equation Editor ++', 'showSidebar').addToUi();
  //onOpen();
}

function showSidebar() {
  //var html =HtmlService.createTemplateFromFile("EquationEditor++.html").evaluate().setTitle("Equation Editor ++");
  var html = EQPPCommon.gethtmlSideBar();
  DocumentApp.getUi().showSidebar(html);
}

function findImage() {
  var selection = DocumentApp.getActiveDocument().getSelection();
  if (selection) {
    var elements = selection.getSelectedElements();
    for (var i = 0; i < elements.length; i++) {
      if (elements[i].getElement().getType() == DocumentApp.ElementType.INLINE_IMAGE) {
        return elements[i].getElement().asInlineImage();
      }
    }
  }
  DocumentApp.getUi().alert('No equation found in selection.');
  return ("CantFindImage");
}
function locate(element) {
  par = element.getParent();
  var prev = element.getPreviousSibling();
  var i = 0;
  while (prev) {
    i++;
    prev = prev.getPreviousSibling();
  }
  return DocumentApp.getActiveDocument().newPosition(par, i);
}

function insertEquation(img_data, equation_metadata, replace) {
  var pos;
  if (replace) {
    var oldimg = findImage();
    EQPPCommon.deleteEquationMetadata(oldimg.getAltDescription());

    pos = locate(oldimg);
    oldimg.removeFromParent();
  }
  else {
    cursor = DocumentApp.getActiveDocument().getCursor();
    if (cursor) {
      pos = cursor;
    } else {
      DocumentApp.getUi().alert('Cannot find a location to insert the equation. Place your cursor in the desired location and try again.');
    }
  }
  EQPPCommon.setEquationMetadata(equation_metadata);
  pos.insertInlineImage(EQPPCommon.getImage(img_data)).setAltDescription(EQPPCommon.getEquationAltDescription(equation_metadata));
}

function getImageTex() {
  let md = EQPPCommon.getEquationMetadata(findImage().getAltDescription());
  return md;
}