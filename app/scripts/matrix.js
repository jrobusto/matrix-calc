function addRow(){
  var coefficientsElem = document.querySelector('#coefficients');
    coefficientsElem.dataset.rows += 1;

  var rows = coefficientsElem.querySelectorAll('paper-listbox');
  var newRow = rows[0].cloneNode(true);
  coefficientsElem.appendChild(newRow);

  var solutionVector = document.querySelector('#solution-vector>paper-listbox');
  var values = solutionVector.querySelectorAll('paper-textarea');
  var newValue = values[0].cloneNode(true);
  solutionVector.appendChild(newValue);

  if (coefficientsElem.dataset.rows == 2){
    document.getElementById('removeRow').removeAttribute('disabled');
  }
}

function removeRow(){
  var coefficientsElem = document.querySelector('#coefficients');
  if (coefficientsElem.dataset.rows > 1){
    coefficientsElem.dataset.rows -= 1;
    var rows = coefficientsElem.querySelectorAll('paper-listbox');

    var lastRow = rows[rows.length - 1];
    lastRow.remove();

    var solutionVector = document.querySelector('#solution-vector>paper-listbox');
    var values = solutionVector.querySelectorAll('paper-textarea');
    var lastValue = values[values.length - 1];
    lastValue.remove();

    if (coefficientsElem.dataset.rows == 1){
      document.getElementById('removeRow').setAttribute('disabled', 'disabled');
    }
  }
}

function addColumn(){
  var coefficientsElem = document.querySelector('#coefficients');
  coefficientsElem.dataset.columns += 1;

  var rows = coefficientsElem.querySelectorAll('paper-listbox');
  for (var i = 0; i < rows.length; i++){
    var newCell = rows[i].querySelector('paper-textarea').cloneNode(true);
    rows[i].appendChild(newCell);
  }
  if (coefficientsElem.dataset.columns == 2){
    document.getElementById('removeColumn').removeAttribute('disabled');
  }
}

function removeColumn(){
  var coefficientsElem = document.querySelector('#coefficients');
  if (coefficientsElem.dataset.columns > 1){
    coefficientsElem.dataset.columns -= 1;
    var rows = coefficientsElem.querySelectorAll('paper-listbox');
    for (var i = 0; i < rows.length; i++){
      var cells = rows[i].querySelectorAll('paper-textarea');
      var lastCell = cells[cells.length - 1];
      lastCell.remove();
    }

    if (coefficientsElem.dataset.columns == 1){
      document.getElementById('removeColumn').setAttribute('disabled', 'disabled');
    }
  }
}

function submitMatrix(){
  var augmented = retrieveAugmentedMatrix();
  console.table(augmented);
  // console.table(swapRows(augmented, 0, 1));
  // console.log(augmented);
  // console.table(multiplyRow(augmented, 0, 3));
  //console.table(addMultipliedRow(augmented, 0, 2, 1));
}

function retrieveMatrixRepresentation(){
  var representation = {};
  var calc = document.querySelector('#calc');
  var coefficientsElem = document.querySelector('#coefficients');
  var rows = coefficientsElem.querySelectorAll('paper-listbox');
  var matrix = [];
  for (var i = 0; i < rows.length; i++){
    var row = [];
    var cells = rows[i].querySelectorAll('paper-textarea');
    for (var j = 0; j < cells.length; j++){
      row.push(parseFloat(cells[j].value));
    }
    matrix.push(row);
  }
  representation.coefficients = matrix;
  var solutionVector = document.querySelector('#solution-vector');
  var values = solutionVector.querySelectorAll('paper-textarea');
  var solutions = [];
  for (i = 0; i < values.length; i++){
    solutions.push(parseFloat(values[i].value));
  }
  representation.solution = solutions;
  return representation;
}

function retrieveAugmentedMatrix(){
  var augmented = [];
  var calc = document.querySelector('#calc');

  var coefficientsElem = document.querySelector('#coefficients');
  var rows = coefficientsElem.querySelectorAll('paper-listbox');

  var solutionVector = document.querySelector('#solution-vector');
  var values = solutionVector.querySelectorAll('paper-textarea');

  var matrix = [];
  for (var i = 0; i < rows.length; i++){
    var row = [];
    var cells = rows[i].querySelectorAll('paper-textarea');
    for (var j = 0; j < cells.length; j++){
      row.push(parseFloat(cells[j].value));
    }
    row.push(parseFloat(values[i].value));
    matrix.push(row);
  }

  return matrix;
}

function replaceMatrix(augmented){
  var coefficientsElem = document.querySelector('#coefficients');
  var rows = coefficientsElem.querySelectorAll('paper-listbox');

  var solutionVector = document.querySelector('#solution-vector');
  var values = solutionVector.querySelectorAll('paper-textarea');

  for (var i = 0; i < augmented.length; i++){
    var cells = rows[i].querySelectorAll('paper-textarea');
    for (var j = 0; j < cells.length; j++){
      cells[j].updateValueAndPreserveCaret(augmented[i][j]);
    }
    values[i].updateValueAndPreserveCaret(augmented[i][cells.length]);
  }
}
