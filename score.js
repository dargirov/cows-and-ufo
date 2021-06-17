function add(level, name, score) {
    var currentScore = sessionStorage.getItem('hs_' + level);
    if (currentScore === null) {
        var obj = {};
    } else {
        var obj = JSON.parse(currentScore);
    }

    obj[name] = score;
    sessionStorage.setItem('hs_' + level, JSON.stringify(obj));
}

function getTop10(level) {
    var currentScore = sessionStorage.getItem('hs_' + level);
    var result = [];
    if (currentScore !== null) {
        var obj = JSON.parse(currentScore);
        for (var property in obj) {
            result.push([property, obj[property]])
        }
    }

    result.sort((f, s) => f[1] < s[1]);
    return result;
}

// add(1, 'pesho', 1)
// add(1, 'gosho', 6)
// add(1, 'sggf', 5)
// add(2, 'tosho', 5)
// add(2, 'sasdas', 6)
// add(2, 'rrr', 1)
// console.log(getTop10(1));
// console.log(getTop10(2));