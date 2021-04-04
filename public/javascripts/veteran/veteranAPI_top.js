var xmlhttp = new XMLHttpRequest();
var url = "https://data.medicare.gov/api/views/6qxe-iqz8/rows.json?accessType=DOWNLOAD";

xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        worldGraph(myArr);
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

// var st = facilityArr[indx][12]; // state
// var sam = facilityArr[indx][20]; //samples 
// var sc = facilityArr[indx][19]; //score


var facilityMap = new Map();
facilityMap.set("--Select--", -1);

function worldGraph(arr) {
    var facilityArr = arr.data;

    var facilitySel = document.querySelector("#facilitySel");
    facilitySel.length = 1;
    var facilityArr = arr.data;
    var stateList = [];
    for (var i = 1; i < facilityArr.length; i++) {
        stateList.push(facilityArr[i][12]);
    }
    stateList = stateList.filter((v, i, a) => a.indexOf(v) === i)

    for (var i = 1; i < stateList.length; i++) {
        facilitySel.options[facilitySel.options.length] = new Option(stateList[i], stateList[i]);
        facilityMap.set(stateList[i], i);
    }

    var st = "--Select--"; // state

    facilitySel.onchange = function () {
        var selected_facility = document.querySelector("#facilitySel").value;
        var indx = facilityMap.get(selected_facility);
        try {
            st = stateList[indx]; // state
            calculate(facilityArr, st);
        } catch (error) {
            try {
                st = stateList[indx]; // state
                calculate(facilityArr, st);
            } catch (error) {
                st = "--Select--"; // state
                calculate(facilityArr, st);
            }

        }
    }

}

function calculate(facilityArr, st) {

    var scoreData = [];
    var sampleData = [];

    for (var i = 1; i < facilityArr.length; i++) {
        if (facilityArr[i][12] == st) {
            var nm = facilityArr[i][9] + " - " + facilityArr[i][14] + "(" + facilityArr[i][17] + ")";
            var sc1 = parseInt(facilityArr[i][19]);
            var sm1 = parseInt(facilityArr[i][20]);
            if (Number.isNaN(sc1)) {
                sc1 = 0;
            }
            if (Number.isNaN(sm1)) {
                sm1 = 0;
            }
            var temp1 = {
                name: nm,
                score: sc1
            };
            var temp2 = {
                name: nm,
                sample: sm1
            };
            scoreData.push(temp1);
            sampleData.push(temp2);
        }
    }

    var dataScr = [];
    var labelScr = [];
    var dataSam = [];
    var labelSam = [];

    var sortedScr = scoreData.sort(function (a, b) {
        if (a.score <= b.score) return 1;
        if (a.score > b.score) return -1;
        return 0;
    });

    for (var i = 0; i < sortedScr.length; i++) {
        dataScr.push(sortedScr[i].score);
        labelScr.push(sortedScr[i].name);
    }

    var sortedSam = sampleData.sort(function (a, b) {
        if (a.sample <= b.sample) return 1;
        if (a.sample > b.sample) return -1;
        return 0;
    });

    for (var i = 0; i < sampleData.length; i++) {
        dataSam.push(sortedSam[i].sample);
        labelSam.push(sortedSam[i].name);
    }

    createHorizontalBarGraph(dataScr, labelScr, "horiChart2", "#scoreGraph", 'Facility - Score', 'Facility Name', 'Top Facilities - Scores');
    createHorizontalBarGraph(dataSam, labelSam, "HhoriChart2", "#sampleHoriGraph", 'Facility - Samples', 'Facility Name', 'Top Facilities - Samples');
}

function createHorizontalBarGraph(data, label, id1, id2, xlabel, ylabel, title) {
    var variable = '<canvas id="' + id1 + '"> < /canvas>';
    console.log(data.length);
    $('#' + id1).remove();
    $(id2).append(variable);
    var ctx = document.getElementById(id1).getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            datasets: [{
                data: data,
                borderWidth: 1,
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