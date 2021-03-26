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

var scannedAC = [];
var scannedRC = [];
var scannedDTH = [];
var scannedLabels = [];
var ttc, ttr, ttd, tta, rr, dr;

var stateMap1 = new Map();
stateMap1.set("Total", 0);
var stateMap2 = new Map();
stateMap2.set("Total", 0);
var label = ["Total Confirmed", "Total Recovered", "Total Deceased", "Total Active"]
var label1 = ["Recovery Rate", "Death Rate"];

function myFunction(arr) {
    var stateArr = arr.statewise;
    var stateSel1 = document.querySelector("#stateSel1");
    stateSel1.length = 1;
    var stateSel2 = document.querySelector("#stateSel2");
    stateSel2.length = 1;

    ttc = stateArr[0].confirmed;
    ttr = stateArr[0].recovered;
    ttd = stateArr[0].deaths;
    tta = stateArr[0].active;
    rr = ((ttr / ttc) * 100).toFixed(2);
    dr = ((ttd / ttc) * 100).toFixed(2);
    setParameters(ttc, ttr, ttd, tta, rr, dr, '1');
    setParameters(ttc, ttr, ttd, tta, rr, dr, '2');
    for (var i = 1; i < stateArr.length; i++) {
        stateSel1.options[stateSel1.options.length] = new Option(stateArr[i].state, stateArr[i].state);
        stateMap1.set(stateArr[i].state, i);
    }
    for (var i = 1; i < stateArr.length; i++) {
        stateSel2.options[stateSel2.options.length] = new Option(stateArr[i].state, stateArr[i].state);
        stateMap2.set(stateArr[i].state, i);
    }
    stateSel1.onchange = function () {
        var selected_state = document.querySelector("#stateSel1").value;
        var indx = stateMap1.get(selected_state);

        try {
            var tc = stateArr[indx].confirmed;
            var tr = stateArr[indx].recovered;
            var td = stateArr[indx].deaths;
            var ta = stateArr[indx].active;
            ttc = tc;
            ttr = tr;
            ttd = td;
            tta = ta;
            rr = ((ttr / ttc) * 100).toFixed(2);
            dr = ((ttd / ttc) * 100).toFixed(2);
            setParameters(ttc, ttr, ttd, tta, rr, dr, '1');

        } catch (error) {
            try {
                var tc = stateArr[0].confirmed;
                var tr = stateArr[0].recovered;
                var td = stateArr[0].deaths;
                var ta = stateArr[0].active;
                ttc = tc;
                ttr = tr;
                ttd = td;
                tta = ta;
                rr = ((ttr / ttc) * 100).toFixed(2);
                dr = ((ttd / ttc) * 100).toFixed(2);
                setParameters(ttc, ttr, ttd, tta, rr, dr, '1');
            } catch (error) {
                ttc = 0;
                ttr = 0;
                ttd = 0;
                tta = 0;
                rr = ((ttr / ttc) * 100).toFixed(2);
                dr = ((ttd / ttc) * 100).toFixed(2);
                setParameters(ttc, ttr, ttd, tta, rr, dr, '1');
            }

        }
        stateSel2.onchange = function () {
            var selected_state = document.querySelector("#stateSel2").value;
            var indx = stateMap2.get(selected_state);

            try {
                var tc = stateArr[indx].confirmed;
                var tr = stateArr[indx].recovered;
                var td = stateArr[indx].deaths;
                var ta = stateArr[indx].active;
                ttc = tc;
                ttr = tr;
                ttd = td;
                tta = ta;
                rr = ((ttr / ttc) * 100).toFixed(2);
                dr = ((ttd / ttc) * 100).toFixed(2);
                setParameters(ttc, ttr, ttd, tta, rr, dr, '2');

            } catch (error) {
                try {
                    var tc = stateArr[0].confirmed;
                    var tr = stateArr[0].recovered;
                    var td = stateArr[0].deaths;
                    var ta = stateArr[0].active;
                    ttc = tc;
                    ttr = tr;
                    ttd = td;
                    tta = ta;
                    rr = ((ttr / ttc) * 100).toFixed(2);
                    dr = ((ttd / ttc) * 100).toFixed(2);
                    setParameters(ttc, ttr, ttd, tta, rr, dr, '2');
                } catch (error) {
                    ttc = 0;
                    ttr = 0;
                    ttd = 0;
                    tta = 0;
                    rr = ((ttr / ttc) * 100).toFixed(2);
                    dr = ((ttd / ttc) * 100).toFixed(2);
                    setParameters(ttc, ttr, ttd, tta, rr, dr, '2');
                }

            }
        }

    }
}

function setParameters(ttc, ttr, ttd, tta, rr, dr, offset) {
    var TC = document.querySelector("#confirmCs" + offset);
    var RC = document.querySelector("#recoveries" + offset);
    var DC = document.querySelector("#deaths" + offset);
    var AC = document.querySelector("#activeCs" + offset);
    var DR = document.querySelector("#DeathRt" + offset);
    var RR = document.querySelector("#RecovRt" + offset);
    TC.textContent = ttc;
    RC.textContent = ttr;
    DC.textContent = ttd;
    AC.textContent = tta;
    DR.textContent = dr + " %";
    RR.textContent = rr + " %";
    // createGraph([ttc, ttr, ttd, tta], label);
    // createBarGraph([rr, dr], label1);
}

var pt = 0;

function createGraph(dat, label) {
    var variable = '<canvas id="pieChart">< /canvas>';
    $('#pieChart').remove();
    $('#totalChart').append(variable);
    var ctx = document.getElementById('pieChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: dat,
                borderWidth: 1,
                backgroundColor: [
                    'orange',
                    'green',
                    'red',
                    'yellow',
                ],
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

function createBarGraph(dat1, label1) {
    var variable = '<canvas id="barChart">< /canvas>';
    $('#barChart').remove();
    $('#rateChart').append(variable);
    var ctx = document.getElementById('barChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            datasets: [{
                data: dat1,
                borderWidth: 1,
                backgroundColor: [
                    'green',
                    'red',
                ],
            }],
            labels: label1,
        },
        options: {
            title: {
                display: true,
                text: 'Rates',
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