function addScore(level, name, score) {
    if (name === null || name.length === 0) {
        return;
    }

    var currentScore = localStorage.getItem('hs_' + level);
    if (currentScore === null) {
        var obj = {};
    } else {
        var obj = JSON.parse(currentScore);
    }

    obj[name] = score;
    localStorage.setItem('hs_' + level, JSON.stringify(obj));
}

function getTop10(level) {
    var currentScore = localStorage.getItem('hs_' + level);
    var result = [];
    if (currentScore !== null) {
        var obj = JSON.parse(currentScore);
        for (var property in obj) {
            result.push([property, obj[property]])
        }
    }

    result.sort((f, s) => f[1] < s[1]);
    return result.slice(0, 10);
}

// addScore(1, 'pesho', 1)
// addScore(1, 'gosho', 6)
// addScore(1, 'sggf', 5)
// addScore(2, 'tosho', 5)
// addScore(2, 'sasdas', 6)
// addScore(2, 'rrr', 1)
// console.log(getTop10(1));
// console.log(getTop10(2));