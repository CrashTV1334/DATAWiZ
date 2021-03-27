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
var deathRate = [];
var conditionID = [];
var lowOutliers = [];
var highOutliers = [];

function myFunction(arr) {
    var stateArr = arr.statewise;

    for (var i = 0; i < stateArr.length; i++) {
        var tc = stateArr[i].confirmed;
        var tr = stateArr[i].recovered;
        var td = stateArr[i].deaths;
        var ta = stateArr[i].active;
        rr = ((tr / tc) * 100).toFixed(2);
        dr = ((td / tc) * 100).toFixed(2);
        recoveryRate.push(rr);
        deathRate.push(dr);
    }

    findRROutliers(recoveryRate);
    // findSampleOutliers(sample);
}


function findRROutliers(recoveryRate) {
    var sortedRecoveryRate = recoveryRate.sort(function (a, b) {
        return a - b;
    });
    var n = sortedRecoveryRate.length;
    console.log(n);
    // var median = (sortedScore[440] + sortedScore[441]) / 2;
    // var l = median - ((1.5) * sortedScore[220]);
    // var r = median + ((1.5) * sortedScore[661]);
    // var data = [];
    // for (var i = 0; i < sortedScore.length; i++) {
    //     if (sortedScore[i] < l)
    //         lowOutliers.push(sortedScore[i]);
    //     if (sortedScore[i] > r)
    //         highOutliers.push(sortedScore[i]);
    //     if (sortedScore[i] <= r && sortedScore[i] >= l)
    //         data.push(sortedScore[i]);
    // }
    // var label = ['Low Outliers', 'Normal Data', 'High Outliers'];
    // var lowOutliersData = [{}];
    // var normalData = [{}];
    // var highOutliersData = [{}];
    // var xi = 1;
    // var lowColor = [];
    // var highColor = [];
    // var normalColor = [];

    // for (var i = 0; i < lowOutliers.length; i++) {
    //     var temp = {
    //         x: xi,
    //         y: lowOutliers[i],
    //         r: 5
    //     }
    //     xi = xi + 1;
    //     lowOutliersData.push(temp);
    //     lowColor.push('rgba(232,168,76,0.3)');
    // }
    // for (var i = 0; i < data.length; i++) {
    //     var temp = {
    //         x: xi,
    //         y: data[i],
    //         r: 5
    //     }
    //     xi = xi + 1;
    //     normalData.push(temp);
    //     normalColor.push('rgba(233,236,239,0.753)');
    // }
    // for (var i = 0; i < highOutliers.length; i++) {
    //     var temp = {
    //         x: xi,
    //         y: highOutliers[i],
    //         r: 5
    //     }
    //     xi = xi + 1;
    //     highOutliersData.push(temp);
    //     highColor.push('rgba(247,46,77,0.3)');
    // }
    // createBubbleGraph(normalData, lowOutliersData, highOutliersData, label, 'bubbleChart', '#scoreOutliersGraph', lowColor, normalColor, highColor);
}

function findSampleOutliers(sample) {
    var sortedSample = sample.sort(function (a, b) {
        return a - b;
    });

    var median = (sortedSample[440] + sortedSample[441]) / 2;
    var l = median - ((1.5) * sortedSample[220]);
    var r = median + ((1.5) * sortedSample[661]);
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
    var lowOutliersData = [{}];
    var normalData = [{}];
    var highOutliersData = [{}];
    var xi = 1;
    var lowColor = [];
    var highColor = [];
    var normalColor = [];

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