function ParseStringAsArray(str) {
    return str.split(",").map((x) => x.trim());
}

module.exports = ParseStringAsArray;
