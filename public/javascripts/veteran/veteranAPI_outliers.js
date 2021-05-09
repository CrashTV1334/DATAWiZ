var score = [];
var sample = [];
var conditionID = [];
var den = 822;

var scoreMap = new Map();
var conditionMap = new Map();

$.getJSON("/javascripts/veteran/veteran-dataset.json", function (myArr) {
    myFunction(myArr);
});

function myFunction(arr) {
    var facilityArr = arr;

    for (var i = 0; i < facilityArr.length; i++) {
        conditionID.push(facilityArr[i]["Measure ID"]); // condtion ID
        if (facilityArr[i]["Score"] == 'Not Available')
            score.push(0);
        else
            score.push(parseInt(facilityArr[i]["Score"])); //score
        if (facilityArr[i]["Sample"] == 'Not Available')
            sample.push(0);
        else
            sample.push(parseInt(facilityArr[i]["Sample"]));
    }
    var uniqueScore = score.filter((v, i, a) => a.indexOf(v) === i);
    var uniqueConditionID = conditionID.filter((v, i, a) => a.indexOf(v) === i);

    for (var i = 0; i < uniqueScore.length; i++) {
        scoreMap.set(uniqueScore[i], 0);
    }
    for (var i = 0; i < uniqueConditionID.length; i++) {
        conditionMap.set(uniqueConditionID[i], 0);
    }

    populateMaps(score, sample, facilityArr);
    findScoreOutliers(score);
    findSampleOutliers(sample);
}

function populateMaps(score, sample, facilityArr) {
    for (var i = 1; i < facilityArr.length; i++) {
        var con = facilityArr[i]["Measure ID"];
        var sam = conditionMap.get(con);

        if (sample[i] != undefined)
            conditionMap.set(con, (sam + sample[i]));

        var sc = score[i];
        var val = scoreMap.get(sc);
        scoreMap.set(sc, val + 1)
    }
}

function findScoreOutliers(score) {
    var lowOutliers = [];
    var highOutliers = [];
    var sortedScore = score.sort(function (a, b) {
        return a - b;
    });

    var median = (sortedScore[411] + sortedScore[412]) / 2;
    var q1 = sortedScore[205];
    var q2 = sortedScore[618];
    var iqr = q2 - q1;
    var l = median - ((1.5) * iqr);
    var r = median + ((1.5) * iqr);

    var data = [];
    for (var i = 0; i < sortedScore.length; i++) {
        if (sortedScore[i] < l)
            lowOutliers.push(sortedScore[i]);
        if (sortedScore[i] > r)
            highOutliers.push(sortedScore[i]);
        if (sortedScore[i] <= r && sortedScore[i] >= l)
            data.push(sortedScore[i]);
    }
    var label = ['Low Outliers', 'Normal Data', 'High Outliers'];
    var lowOutliersData = [];
    var normalData = [];
    var highOutliersData = [];
    var xi = 1;
    var lowColor = [];
    var highColor = [];
    var normalColor = [];

    $('#lo_sc').text(lowOutliers.length);
    $('#hi_sc').text(highOutliers.length);

    for (var i = 0; i < lowOutliers.length; i++) {
        var temp = {
            x: xi,
            y: lowOutliers[i],
            r: 5
        }
        xi = xi + 1;
        lowOutliersData.push(temp);
        lowColor.push('rgba(232,168,76,0.3)');
    }
    lowColor.push('rgba(232,168,76,0.3)');

    for (var i = 0; i < data.length; i++) {
        var temp = {
            x: xi,
            y: data[i],
            r: 5
        }
        xi = xi + 1;
        normalData.push(temp);
        normalColor.push('rgba(233,236,239,0.753)');
    }
    normalColor.push('rgba(233,236,239,0.753)');

    for (var i = 0; i < highOutliers.length; i++) {
        var temp = {
            x: xi,
            y: highOutliers[i],
            r: 5
        }
        xi = xi + 1;
        highOutliersData.push(temp);
        highColor.push('rgba(247,46,77,0.3)');
    }
    highColor.push('rgba(247,46,77,0.3)');

    createBubbleGraph(normalData, lowOutliersData, highOutliersData, label, 'bubbleChart', '#scoreOutliersGraph', lowColor, normalColor, highColor);
}

function findSampleOutliers(sample) {
    var lowOutliers = [];
    var highOutliers = [];
    var sortedSample = sample.sort(function (a, b) {
        return a - b;
    });

    var median = (sortedSample[411] + sortedSample[412]) / 2;
    var q1 = sortedSample[205];
    var q2 = sortedSample[618];
    var iqr = q2 - q1;
    var l = median - ((1.5) * iqr);
    var r = median + ((1.5) * iqr);
    var data = [];
    for (var i = 0; i < sortedSample.length; i++) {
        if (sortedSample[i] < l)
            lowOutliers.push(sortedSample[i]);
        if (sortedSample[i] > r)
            highOutliers.push(sortedSample[i]);
        if (sortedSample[i] <= r && sortedSample[i] >= l)
            data.push(sortedSample[i]);
    }
    var label = ['Low Outliers', 'Normal Data', 'High Outliers'];
    var lowOutliersData = [];
    var normalData = [];
    var highOutliersData = [];
    var xi = 1;
    var lowColor = [];
    var highColor = [];
    var normalColor = [];

    $('#lo_sm').text(lowOutliers.length);
    $('#hi_sm').text(highOutliers.length);

    for (var i = 0; i < lowOutliers.length; i++) {
        var temp = {
            x: xi,
            y: lowOutliers[i],
            r: 5
        }
        xi = xi + 1;
        lowOutliersData.push(temp);
        lowColor.push('rgba(232,168,76,0.3)');
    }
    lowColor.push('rgba(232,168,76,0.3)');

    for (var i = 0; i < data.length; i++) {
        var temp = {
            x: xi,
            y: data[i],
            r: 5
        }
        xi = xi + 1;
        normalData.push(temp);
        normalColor.push('rgba(233,236,239,0.753)');
    }
    normalColor.push('rgba(233,236,239,0.753)');

    for (var i = 0; i < highOutliers.length; i++) {
        var temp = {
            x: xi,
            y: highOutliers[i],
            r: 5
        }
        xi = xi + 1;
        highOutliersData.push(temp);
        highColor.push('rgba(247,46,77,0.3)');
    }
    highColor.push('rgba(247,46,77,0.3)');

    // console.log(normalData.length + lowOutliers.length + highOutliers.length);
    createBubbleGraph(normalData, lowOutliersData, highOutliersData, label, 'BbubbleChart', '#sampleOutliersGraph', lowColor, normalColor, highColor);
}


function createBubbleGraph(normalData, lowOutliersData, highOutliersData, label, id1, id2, lowColor, normalColor, highColor) {
    var variable = '<canvas id="' + id1 + '"> < /canvas>';
    $('#' + id1).remove();
    $(id2).append(variable);
    var ctx = document.getElementById(id1).getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bubble',
        data: {
            datasets: [{
                label: label[0],
                data: lowOutliersData,
                borderWidth: 1,
                backgroundColor: lowColor
            }, {
                label: label[1],
                data: normalData,
                borderWidth: 1,
                backgroundColor: normalColor
            }, {
                label: label[2],
                data: highOutliersData,
                borderWidth: 1,
                backgroundColor: highColor
            }],
        },
        options: {
            legend: {
                display: true,
            },
        }

    });
}