var xmlhttp = new XMLHttpRequest();
var url = "https://api.covid19india.org/data.json";

xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        myFunction(myArr);
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

var recoveryRate = [];
var recoveryRate1 = [];
var deathRate = [];
var deathRate1 = [];
var conditionID = [];
var low_DR = 0;
var high_DR = 0;
var low_RR = 0;
var high_RR = 0;

function myFunction(arr) {
    var stateArr = arr.statewise;
    for (var i = 1; i < stateArr.length - 1; i++) {
        var tc = stateArr[i].confirmed;
        var tr = stateArr[i].recovered;
        var td = stateArr[i].deaths;
        rr = ((tr / tc) * 100);
        dr = ((td / tc) * 100);
        recoveryRate.push(parseInt(rr));
        recoveryRate1.push(rr.toFixed(2));
        deathRate.push(parseInt(dr));
        deathRate1.push(dr.toFixed(2));
    }

    findRROutliers(recoveryRate);
    findDROutliers(deathRate);
}


function findRROutliers(recoveryRate) {
    var sortedRecoveryRate = recoveryRate.sort(function (a, b) {
        return a - b;
    });
    var sortedRecoveryRate1 = recoveryRate1.sort(function (a, b) {
        return a - b;
    });

    var median = (sortedRecoveryRate[17] + sortedRecoveryRate[18]) / 2;
    var q1 = sortedRecoveryRate[9];
    var q2 = sortedRecoveryRate[26];
    var iqr = q2 - q1;
    var l = parseInt(median - ((1.5) * iqr));
    var r = parseInt(median + ((1.5) * iqr));
    var lowOutliers = [];
    var highOutliers = [];
    var data = [];
    for (var i = 0; i < 36; i++) {

        if (parseInt(sortedRecoveryRate[i]) < l) {
            lowOutliers.push(sortedRecoveryRate1[i]);
        } else if (parseInt(sortedRecoveryRate[i]) > r) {
            highOutliers.push(sortedRecoveryRate1[i]);
        } else if (parseInt(sortedRecoveryRate[i]) >= l && parseInt(sortedRecoveryRate[i]) <= r)
            data.push(sortedRecoveryRate1[i]);
    }

    var label = ['Low Outliers', 'Normal Data', 'High Outliers'];
    var lowOutliersData = [{}];
    var normalData = [{}];
    var highOutliersData = [{}];
    var xi = 1;
    var lowColor = [];
    var highColor = [];
    var normalColor = [];
    low_RR = lowOutliers.length;
    high_RR = highOutliers.length;
    $('#lo_RR').text(low_RR);
    $('#hi_RR').text(high_RR);

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
    createBubbleGraph(normalData, lowOutliersData, highOutliersData, label, 'bubbleChart', '#recoveryRateOutliersGraph', lowColor, normalColor, highColor);
}

function findDROutliers(deathRate) {
    var sortedDeathRate = deathRate.sort(function (a, b) {
        return a - b;
    });
    var sortedDeathRate1 = deathRate1.sort(function (a, b) {
        return a - b;
    });

    var median = (sortedDeathRate[17] + sortedDeathRate[18]) / 2;
    var q1 = sortedDeathRate[9];
    var q2 = sortedDeathRate[26];
    var iqr = q2 - q1;
    var l = parseInt(median - ((1.5) * iqr));
    var r = parseInt(median + ((1.5) * iqr));


    var lowOutliers = [];
    var highOutliers = [];
    var data = [];
    for (var i = 0; i < 37; i++) {

        if (parseInt(sortedDeathRate[i]) < l) {
            lowOutliers.push(sortedDeathRate1[i]);
        } else if (parseInt(sortedDeathRate[i]) > r) {
            highOutliers.push(sortedDeathRate1[i]);
        } else if (parseInt(sortedDeathRate[i]) >= l && parseInt(sortedDeathRate[i]) <= r)
            data.push(sortedDeathRate1[i]);
    }

    var label = ['Low Outliers', 'Normal Data', 'High Outliers'];
    var lowOutliersData = [{}];
    var normalData = [{}];
    var highOutliersData = [{}];
    var xi = 1;
    var lowColor = [];
    var highColor = [];
    var normalColor = [];
    low_DR = lowOutliers.length;
    high_DR = highOutliers.length;

    $('#lo_DR').text(low_DR);
    $('#hi_DR').text(high_DR);

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
    createBubbleGraph(normalData, lowOutliersData, highOutliersData, label, 'BbubbleChart', '#deathRateOutliersGraph', lowColor, normalColor, highColor);
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