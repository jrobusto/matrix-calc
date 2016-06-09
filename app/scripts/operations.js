/*
  Row Operation 1: Ri ↔ Rj
  Swaps the locations of two rows, i and j
*/
function swapRows(matrix, i, j){
  var result = matrix.slice();
  result[i] = matrix[j];
  result[j] = matrix[i];
  return result;
}

/*
  Row Operation 2: Ri = aRi
  Multiply row i by non-zero scalar a
*/
function multiplyRow(matrix, i, a){
  var result = matrix.slice();
  result[i] = multiply(result[i], a);
  return result;
}

/*
  Row Operation 3: Rj = aRi+Rj
  Multiply row i by scalar a and add to row j
*/
function addMultipliedRow(matrix, i, a, j){
  var result = matrix.slice();
  var operand = multiply(result[i], a);
  for (var i = 0; i < matrix[j].length; i++){
    result[j][i] = result[j][i] + operand[i];
  }
  return result;
}

/* Utility function for multiplying rows */
function multiply(row, a){
  return row.map(function(n){ return n * a});
}
