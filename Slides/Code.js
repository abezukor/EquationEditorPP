/**
 * @OnlyCurrentDoc
 */
function onOpen() {
  SlidesApp.getUi().createAddonMenu().addItem('Equation Editor ++', 'showSidebar').addToUi();
}
function onInstall(){
  onOpen();
}
function showSidebar(){
  var html =HtmlService.createTemplateFromFile("EquationEditor++.html").evaluate().setTitle("Equation Editor ++");
  SlidesApp.getUi().showSidebar(html);
}

function findImage(){
  var elements = SlidesApp.getActivePresentation().getSelection().getPageElementRange().getPageElements();
  if (elements) {
    for(var i = 0; i < elements.length; i++){
      if (elements[i].getPageElementType() == SlidesApp.PageElementType.IMAGE){
        return elements[i].asImage();
      }  
    }
  }
  SlidesApp.getUi().alert('No equation found in selection.');
  return("CantFindImage");
}

function insertEquation(URL,teX,replace){
  var pos;
  if (replace){
    var oldimg = findImage();
    oldimg.replace(URL);
    oldimg.setDescription(teX);
    
  }
  else{
    pos = SlidesApp.getActivePresentation().getSelection().getCurrentPage();
      var image = UrlFetchApp.fetch(URL)
      pos.insertImage(image).setDescription(teX);
  }
}

function getImageTex(){
  return findImage().getDescription();
}