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

var scannedAC = [];
var scannedRC = [];
var scannedDTH = [];
var scannedLabels = [];

var facilityMap = new Map();
facilityMap.set("--Select--", -1);

function worldGraph(arr) {
    var national = arr.data;
    var facilitySel = document.querySelector("#facilitySel");
    facilitySel.length = 1;
    var facilityArr = arr.data;
    // console.log(facilityArr);
    for (var i = 1; i < facilityArr.length; i++) {
        facilitySel.options[facilitySel.options.length] = new Option(facilityArr[i][10], facilityArr[i][10]);
        facilityMap.set(facilityArr[i][10], i);
    }
}



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