function onOpen() {
    var ui = SpreadsheetApp.getUi();
    ui.createMenu('Custom Menu')
        .addItem('Import CSV Data', 'showImportCSVDialog')
        .addToUi();
  }
  
  function showImportCSVDialog() {
    var htmlOutput = HtmlService.createHtmlOutputFromFile('index')
        .setTitle('Import CSV Data')
        .setWidth(400)
        .setHeight(200);
    SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Import CSV Data');
  }
  
  function doGet() {
    var htmlOutput = HtmlService.createHtmlOutputFromFile('index')
      .setTitle('Import CSV Data')
      .setWidth(400)
      .setHeight(200);
    return htmlOutput;
  }
  
  function importCSVFromURL(csvUrl) {
    try {
      var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
      var response = UrlFetchApp.fetch(csvUrl);
      var csvData = response.getContentText();
      var csvArray = Utilities.parseCsv(csvData);
  
      if (csvArray.length > 0) {
        writeToSheet(sheet, csvArray);
        return 'success';
      } else {
        return 'No data found in the CSV.';
      }
    } catch (error) {
      return 'Error: ' + error.toString();
    }
  }
  
  function importCSV(csvData) {
    try {
      var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
      var csvArray = Utilities.parseCsv(csvData);
  
      if (csvArray.length > 0) {
        writeToSheet(sheet, csvArray);
        return 'success';
      } else {
        return 'No data found in the CSV.';
      }
    } catch (error) {
      return 'Error: ' + error.toString();
    }
  }
  
  
  function writeToSheet(sheet, data) {
    var batchSize = 1000; // Adjust this batch size as needed.
    var numRows = data.length;
  
    for (var i = 0; i < numRows; i += batchSize) {
      var batch = data.slice(i, i + batchSize);
      sheet.getRange(i + 1, 1, batch.length, batch[0].length).setValues(batch);
    }
  }
  