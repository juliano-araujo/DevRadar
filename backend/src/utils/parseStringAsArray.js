module.exports = function(ArrayAsString) {
  return ArrayAsString.split(',').map(item => item.trim());
}