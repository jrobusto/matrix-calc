/*
  Row Operation 1: Ri ↔ Rj
  Swaps the locations of two rows, i and j
*/
function swapRows(matrix, i, j){
  console.log('Swap', i, j);
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
  console.log('Multiply', i, a);
  var result = matrix.slice();
  result[i] = multiply(result[i], a);
  return result;
}

/*
  Row Operation 3: Rj = aRi+Rj
  Multiply row i by scalar a and add to row j
*/
function addMultipliedRow(matrix, i, a, j){
  console.log('addMultiply', i, a, j);
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

/*
  Algorithm to reduce matrix to RREF, as described in
  http://linear.ups.edu/html/section-RREF.html
 */
function rowReduction(matrix){
  var m = matrix.length;
  var n = matrix[0].length;
  var r = -1;
  for (var j = 0; j < n; j++){
    var i = r + 1;
    while (i < m && matrix[i][j] == 0){
      i++;
    }
    if (i < m){
      r++;
      matrix = swapRows(matrix, i, r);
      var constant = 1.0 / matrix[r][j];
      matrix = multiplyRow(matrix, r, constant);
      for (var k = 0; k < m; k++){
        if (k != r){
          constant = matrix[k][j] * -1;
          matrix = addMultipliedRow(matrix, r, constant, k);
        }
      }
    }
  }
  return matrix;
}
