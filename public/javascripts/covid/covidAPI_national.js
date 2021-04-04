var xmlhttp = new XMLHttpRequest();
var url = "https://api.covid19india.org/data.json";

xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        worldGraph(myArr);
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

var scannedAC = [];
var scannedRC = [];
var scannedDTH = [];
var scannedLabels = [];
var acChange;
var rcChange;
var dcChange;
var downArr = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" /></svg>';
var upArr = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/></svg>';

function worldGraph(arr) {
    var national = arr.cases_time_series;

    for (var i = 0; i < national.length; i++) {
        scannedAC.push(national[i].dailyconfirmed);
        scannedRC.push(national[i].dailyrecovered);
        scannedDTH.push(national[i].dailydeceased);
        scannedLabels.push(national[i].dateymd);
    }

    var a = scannedAC[scannedAC.length - 1] - scannedAC[scannedAC.length - 2];
    acChange = parseFloat(((a / scannedAC[scannedAC.length - 2]) * 100).toFixed(2));

    if (acChange < 0) {
        $("#activeInference").html(Math.abs(acChange) + " % " + downArr);
        $("#activeInference").addClass("green");
        $("#activeInference").removeClass("red");
    } else {
        $("#activeInference").html(Math.abs(acChange) + " % " + upArr);
        $("#activeInference").addClass("red");
        $("#activeInference").removeClass("green");
    }

    var r = scannedRC[scannedRC.length - 1] - scannedRC[scannedRC.length - 2];
    rcChange = parseFloat(((r / scannedRC[scannedRC.length - 2]) * 100).toFixed(2));

    if (rcChange < 0) {
        $("#recoveredInference").html(Math.abs(rcChange) + " % " + downArr);
        $("#recoveredInference").addClass("red");
        $("#recoveredInference").removeClass("green");
    } else {
        $("#recoveredInference").html(Math.abs(rcChange) + " % " + upArr);
        $("#recoveredInference").addClass("green");
        $("#recoveredInference").removeClass("red");
    }

    var d = scannedDTH[scannedDTH.length - 1] - scannedDTH[scannedDTH.length - 2];
    dcChange = parseFloat(((d / scannedDTH[scannedDTH.length - 2]) * 100).toFixed(2));

    if (dcChange < 0) {
        $("#deathInference").html(Math.abs(dcChange) + " % " + downArr);
        $("#deathInference").addClass("green");
        $("#deathInference").removeClass("red");
    } else {
        $("#deathInference").html(Math.abs(dcChange) + " % " + upArr);
        $("#deathInference").addClass("red");
        $("#deathInference").removeClass("green");
    }

    console.log(a);
    console.log(acChange);
    createGraph('ACLineChart', 'ACTIVE CASES', '#activeCasesGraph', scannedLabels, scannedAC);
    createGraph('RCLineChart', 'RECOVERED CASES', '#recoveredCasesGraph', scannedLabels, scannedRC);
    createGraph('DTHLineChart', 'DECEASED CASES', '#deceasedCasesGraph', scannedLabels, scannedDTH);
}
var countryMap = new Map();
countryMap.set("Worldwide", -1);


var pt = 0;

function createGraph(id, label, id2, scannedLabels, scannedData) {
    var variable = '<canvas id="' + id + '"> < /canvas>';
    $('#' + id).remove();
    $(id2).append(variable);
    var ctx = document.getElementById(id).getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: scannedLabels,
            datasets: [{
                data: scannedData,
                borderWidth: 1,
            }]
        },
        options: {
            title: {
                display: true,
                text: label,
            },
            legend: {
                display: false,
            },

            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        fontColor: "grey",
                        fontSize: "18",
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontColor: "grey",
                        fontSize: "18",
                    }
                }]
            }
        }

    });

}