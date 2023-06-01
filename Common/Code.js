function gethtmlSideBar() {
  return HtmlService.createTemplateFromFile("EquationEditor++.html").evaluate().setTitle("Equation Editor ++");
}
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
    .getContent();
}

function getImage(data) {
  let decode = Utilities.base64Decode(data.replace("data:image/png;base64,", ""));
  return Utilities.newBlob(decode, "image/png");
}

function setEquationMetadata(equation_metadata) {
  const documentProperties = PropertiesService.getDocumentProperties();


  documentProperties.setProperty(equation_metadata["uuid"], JSON.stringify(equation_metadata))
}

function getUUIDFromDescription(description) {
  let description_lines = description.split('\n');
  return description_lines.at(-1).substr(1);
}

function getEquationMetadata(description) {
  const documentProperties = PropertiesService.getDocumentProperties();
  let uuid = getUUIDFromDescription(description);
  let md = documentProperties.getProperty(uuid);

  if (md) {
    return JSON.parse(md);
  } else {
    return {
      tex: description,
      format: null
    }
  }
}

function deleteEquationMetadata(description) {
  const documentProperties = PropertiesService.getDocumentProperties();

  let uuid = getUUIDFromDescription(description);
  documentProperties.deleteProperty(uuid);
}

function getEquationAltDescription(equation_metadata) {
  return equation_metadata["tex"] + "\n%" + equation_metadata["uuid"]
}