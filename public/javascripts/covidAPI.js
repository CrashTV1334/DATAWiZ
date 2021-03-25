var confirmCases = "# Total Cases";
var recoveredCases = "# Recoveries";
var deaths = "# Deaths";

if ($(window).width() < 496) {
    confirmCases = "# TC";
    recoveredCases = "# RC";
    deaths = "# Dths";
}

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

function worldGraph(arr) {
    var national = arr.cases_time_series;

    for (var i = 0; i < national.length; i++) {
        scannedAC.push(national[i].dailyconfirmed);
        scannedRC.push(national[i].dailyrecovered);
        scannedDTH.push(national[i].dailydeceased);
        scannedLabels.push(national[i].dateymd);
    }

    createGraph('ACLineChart', 'ACTIVE CASES', '#activeCasesGraph', scannedLabels, scannedAC);
    createGraph('RCLineChart', 'RECOVERED CASES', '#recoveredCasesGraph', scannedLabels, scannedRC);
    createGraph('DTHLineChart', 'DECEASED CASES', '#deceasedCasesGraph', scannedLabels, scannedDTH);
    // myFunction(arr);
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