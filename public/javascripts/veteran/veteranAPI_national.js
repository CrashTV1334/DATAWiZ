var scoreSum = 0;
var sampleSum = 0;
var score = [];
var sample = [];
var conditionID = [];
var den = 822;

var scoreMap = new Map();
var conditionMap = new Map();

$.getJSON("/javascripts/veteran/veteran-dataset.json", function (myArr) {
    worldGraph(myArr);
});


function worldGraph(arr) {
    var facilityArr = arr;

    for (var i = 0; i < facilityArr.length; i++) {
        conditionID.push(facilityArr[i]['Measure ID']); // condtion ID
        if (facilityArr[i]['Score'] == 'Not Available')
            score.push(0);
        else
            score.push(parseInt(facilityArr[i]['Score'])); //score
        if (facilityArr[i]['Sample'] == 'Not Available')
            sample.push(0);
        else
            sample.push(parseInt(facilityArr[i]['Sample']));
    }
    for (var i = 1; i < facilityArr.length; i++) {
        var sc = facilityArr[i]['Score'];
        var sam = facilityArr[i]['Sample'];
        if (sc != "Not Available") {
            scoreSum = scoreSum + parseInt(sc);
        }
        if (sam != "Not Available") {
            sampleSum = sampleSum + parseInt(sam);
        }
    }
    var avgScore = (scoreSum / den).toFixed(0);
    var avgSample = (sampleSum / den).toFixed(0);
    var label = ['', 'Average Score'];
    data = [100 - avgScore, avgScore];
    var AS = document.querySelector("#avgSamples");
    AS.textContent = avgSample;

    createPieGraph(data, label, 'index-pieChart', '#avgGraph');

    var uniqueScore = score.filter((v, i, a) => a.indexOf(v) === i);
    var uniqueConditionID = conditionID.filter((v, i, a) => a.indexOf(v) === i);

    for (var i = 0; i < uniqueScore.length; i++) {
        scoreMap.set(uniqueScore[i], 0);
    }
    for (var i = 0; i < uniqueConditionID.length; i++) {
        conditionMap.set(uniqueConditionID[i], 0);
    }
    populateMaps(score, sample, facilityArr);
    var label1 = [];
    var data1 = [];
    for (var i = 0; i <= 100; i++)
        label1.push(i);
    for (var i = 0; i <= 100; i++)
        data1.push(scoreMap.get(i));

    var data2 = [];
    var label2 = ["HBIPS-3", "SUB_2", "HBIPS-2", "SUB_3", "TOB_2", "HBIPS-5"]
    for (var i = 0; i < 6; i++) {
        data2.push(conditionMap.get(label2[i]));
    }
    data1.reverse();
    label1.reverse();
    createHorizontalBarGraph(data1, label1, "horiChart", "#scoreHoriGraph", 'value', 'score', 'Score Analysis');
    createHorizontalBarGraph(data2, label2, "HhoriChart", "#conditionGraph", 'samples', 'condition', 'Condition - Sample Analysis');
}

function populateMaps(score, sample, facilityArr) {
    for (var i = 1; i < facilityArr.length; i++) {
        var con = facilityArr[i]['Measure ID'];
        var sam = conditionMap.get(con);

        if (sample[i] != undefined)
            conditionMap.set(con, (sam + sample[i]));

        var sc = score[i];
        var val = scoreMap.get(sc);
        scoreMap.set(sc, val + 1)
    }
}

function createPieGraph(data, label, id1, id2) {
    var variable = '<canvas id="' + id1 + '"> < /canvas>';
    $('#' + id1).remove();
    $(id2).append(variable);
    var ctx = document.getElementById(id1).getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: data,
                borderWidth: 1,
                backgroundColor: [
                    'transparent',
                    'rgba(11,89,4,0.3)',
                ],
                borderColor: [
                    'grey',
                    'grey'
                ]
            }],
            labels: label,
        },
        options: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Average Score'
            },
        }

    });
}

function createHorizontalBarGraph(data, label, id1, id2, xlabel, ylabel, title) {
    var variable = '<canvas id="' + id1 + '"> < /canvas>';
    $('#' + id1).remove();
    $(id2).append(variable);
    var ctx = document.getElementById(id1).getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            datasets: [{
                data: data,
                borderWidth: 1,
                // backgroundColor: [
                //     'rgba(232,168,76,0.3)',
                //     'rgba(232,168,76,0.3)',
                //     'rgba(232,168,76,0.3)',
                //     'rgba(232,168,76,0.3)',
                //     'rgba(232,168,76,0.3)',
                //     'rgba(232,168,76,0.3)'
                // ]
            }],
            labels: label,
        },
        options: {
            maintainAspectRatio: false,
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: title
            },
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: ylabel
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: xlabel
                    }
                }]
            }
        }

    });
}