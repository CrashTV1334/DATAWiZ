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

// var sortedScore = score.sort(function (a, b) {
//     return a - b;
// });

function comparePos(a, b) {
    if (a.active < b.active)
        return -1;
    else
        return 1;
}

function worldGraph(arr) {
    var stateArr = arr.statewise;
    var dataAct = [];
    var dataDec = [];

    for (var i = 1; i < stateArr.length - 1; i++) {
        var temp1 = {
            name: stateArr[i].state,
            active: parseInt(stateArr[i].active)
        }
        var temp2 = {
            name: stateArr[i].state,
            deaths: parseInt(stateArr[i].deaths)
        }
        dataAct.push(temp1);
        dataDec.push(temp2);
    }
    var dataActive = [];
    var labelActive = [];

    var sortedActive = dataAct.sort(function (a, b) {
        if (a.active <= b.active) return 1;
        if (a.active > b.active) return -1;
        return 0;
    });

    for (var i = 0; i < 10; i++) {
        dataActive.push(sortedActive[i].active);
        labelActive.push(sortedActive[i].name);
    }

    var sortedDeceased = dataDec.sort(function (a, b) {
        if (a.deaths <= b.deaths) return 1;
        if (a.deaths > b.deaths) return -1;
        return 0;
    });

    var dataDeceased = [];
    var labelDeceased = [];

    for (var i = 0; i < 10; i++) {
        dataDeceased.push(sortedDeceased[i].deaths);
        labelDeceased.push(sortedDeceased[i].name);
    }

    createHorizontalBarGraph(dataActive, labelActive, "horiChart1", "#activeGraph", 'State Names', 'Active Case Count', 'Top 10 States - Active Cases');
    createHorizontalBarGraph(dataDeceased, labelDeceased, "HhoriChart1", "#deceasedHoriGraph", 'State Names', 'Deceased Case Count', 'Top 10 States - Deceased Cases');

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