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
  var html = EQPPCommon.gethtmlSideBar();
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

function insertEquation(img_data,equation_metadata,replace){
  var pos;
  let new_image = EQPPCommon.getImage(img_data);
  EQPPCommon.setEquationMetadata(equation_metadata);
  if (replace){
    var oldimg = findImage();
    EQPPCommon.deleteEquationMetadata(oldimg.getAltDescription());
    oldimg.replace(new_image);
    oldimg.setDescription(EQPPCommon.getEquationAltDescription(equation_metadata));
  }
  else{
    pos = SlidesApp.getActivePresentation().getSelection().getCurrentPage();
    pos.insertImage(new_image).setDescription(EQPPCommon.getEquationAltDescription(equation_metadata));
  }
}

function getImageTex(){
  let md = EQPPCommon.getEquationMetadata(findImage().getDescription());
  return md;
}