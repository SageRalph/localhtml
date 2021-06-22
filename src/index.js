/* 
localhtml setup and custom scripts
*/

import "./styles.css";
import "localhtml-lib";
import pkg from "../package.json";

/**
 * Return a suggested filename when saving the sheet.
 * @param {Object} data The sheet data object with keys for each named form input
 * @returns {String} The suggested filename (without extension)
 */
function customSheetName(data) {
  // Put your custom file naming logic here.
  // If the return value is falsy, config.DEFAULT_SHEET_NAME is used instead.
  return data["fileNameField"];
}

/**
 * Modify the data object to comply with any format changes when importing.
 * @param {Object} data The old sheet data object with keys for each named form input
 * @returns {Object} The data object in the format used by this version
 */
function migrations(data) {
  // versionBefore is a utility function for checking how old the data format is.
  // It compares the semantic version of data object to the string provided.
  //
  // If the version cannot be migrated, you can throw an error here

  if (localhtml.api.versionBefore(data, "1.0.0")) {
    console.log("RUNNING MIGRATION: Updating from pre-release!");
    // data['newFieldName'] = data['oldFieldName']
  }
  return data;
}

/**
 * Called whenever the contents of the sheet is changed.
 */
function dataChangedAction() {
  console.log("Data changed");
  // Prevent accidental navigation
  window.onbeforeunload = function () {
    return true;
  };
}

new localhtml({
  // The semver version of the sheet - Required for automatic updates
  version: pkg.version,

  // The document editor will be injected here
  documentContainer: "#documentContainer",

  // The menu will be injected here
  menuContainer: "#menuContainer",

  // The info frame will be injected here
  infoContainer: "#infoContainer",

  // Only forms matching this selector will have data persisted
  formSelector: "form",

  // event handler for changes to the sheet data
  dataChangedAction: dataChangedAction,

  // Cooldown for the change event handler
  dataChangedCooldown: 3000,

  // Function to be run when importing data
  migrations: migrations,

  // Suggested filename if customSheetName is unset or returns something invalid
  defaultSheetName: "localhtml document",

  // Function for determining the suggested filename when saving
  customSheetName: customSheetName,

  // Default URL for Browser widgets. A non-string value will disable them.
  infoURL: "https://example.com",

  // URL of the latest version of the sheet - Required for automatic updates
  latestVersionURL: "https://davidralph.github.io/localhtml/",

  // If true, ctrl+s will prompt saving the sheet
  hotkeysEnabled: true,

  // Function for logging
  log: console.log,
});

/**
 * These are some example of how you can get and modify the sheet data.
 * You can modify values by modifying the form controls with jQuery.
 */
$("#myButton").on("click", doTheThing);
function doTheThing(e) {
  e.preventDefault();
  var textField1Value = $("[name=textField1]").val();
  $("[name=textField2]").val(textField1Value);
}

$("[name=textField3]").on("change", doTheOtherThing);
$("[name=textField4]").on("change", doTheOtherThing);
function doTheOtherThing(e) {
  e.preventDefault();
  // getData returns the sheet data object with keys for each named form input
  // This may be slower then just querying what you need with jQuery
  var data = localhtml.api.getData();
  $("[name=textField3]").val(data["textField4"]);
  $("[name=textField4]").val(data["textField3"]);
}

// Example custom menu button
$("#myMenuButton").on("click", function () {
  alert("Custom menu button clicked!");
});
