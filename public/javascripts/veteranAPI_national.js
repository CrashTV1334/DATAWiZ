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

var scoreSum = 0;
var sampleSum = 0;
var den = 882;

function worldGraph(arr) {
    var facilityArr = arr.data;
    for (var i = 1; i < facilityArr.length; i++) {
        var sc = facilityArr[i][19];
        var sam = facilityArr[i][20];
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
                display: true,
            },
        }

    });
}