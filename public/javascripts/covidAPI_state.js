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

var stateMap = new Map();
stateMap.set("Total", 0);

function myFunction(arr) {
    // createGraph('DTHLineChart', 'DECEASED CASES', '#deceasedCasesGraph', scannedLabels, scannedDTH);
    var stateSel = document.querySelector("#stateSel");
    stateSel.length = 1;
    var stateArr = arr.statewise

    var label = ["Total Confirmed", "Total Recovered", "Total Deceased", "Total Active"]
    ttc = stateArr[0].confirmed;
    ttr = stateArr[0].recovered;
    ttd = stateArr[0].deaths;
    tta = stateArr[0].active;
    rr = ((ttr / ttc) * 100).toFixed(2);
    dr = ((ttd / ttc) * 100).toFixed(2);
    var TC = document.querySelector("#confirmCs");
    var RC = document.querySelector("#recoveries");
    var DC = document.querySelector("#deaths");
    var AC = document.querySelector("#activeCs");
    var DR = document.querySelector("#DeathRt");
    var RR = document.querySelector("#RecovRt");
    TC.textContent = ttc;
    RC.textContent = ttr;
    DC.textContent = ttd;
    AC.textContent = tta;
    DR.textContent = dr + " %";
    RR.textContent = rr + " %";
    createGraph([ttc, ttr, ttd, tta], label);

    for (var i = 1; i < stateArr.length; i++) {
        stateSel.options[stateSel.options.length] = new Option(stateArr[i].state, stateArr[i].state);
        stateMap.set(stateArr[i].state, i);
    }
    stateSel.onchange = function () {
        var selected_state = document.querySelector("#stateSel").value;
        var indx = stateMap.get(selected_state);

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
            TC = document.querySelector("#confirmCs");
            RC = document.querySelector("#recoveries");
            DC = document.querySelector("#deaths");
            AC = document.querySelector("#activeCs");
            DR = document.querySelector("#DeathRt");
            RR = document.querySelector("#RecovRt");
            TC.textContent = ttc;
            RC.textContent = ttr;
            DC.textContent = ttd;
            AC.textContent = tta;
            DR.textContent = dr + " %";
            RR.textContent = rr + " %";
            var dat = [tc, tr, td, ta];
            createGraph(dat, label);

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
                TC = document.querySelector("#confirmCs");
                RC = document.querySelector("#recoveries");
                DC = document.querySelector("#deaths");
                AC = document.querySelector("#activeCs");
                DR = document.querySelector("#DeathRt");
                RR = document.querySelector("#RecovRt");
                TC.textContent = ttc;
                RC.textContent = ttr;
                DC.textContent = ttd;
                AC.textContent = tta;
                DR.textContent = dr + " %";
                RR.textContent = rr + " %";
                var dat = [tc, tr, td, ta];
                createGraph(dat, label);

            } catch (error) {
                ttc = 0;
                ttr = 0;
                ttd = 0;
                tta = 0;
                rr = ((ttr / ttc) * 100).toFixed(2);
                dr = ((ttd / ttc) * 100).toFixed(2);
                TC = document.querySelector("#confirmCs");
                RC = document.querySelector("#recoveries");
                DC = document.querySelector("#deaths");
                AC = document.querySelector("#activeCs");
                DR = document.querySelector("#DeathRt");
                RR = document.querySelector("#RecovRt");
                TC.textContent = ttc;
                RC.textContent = ttr;
                DC.textContent = ttd;
                AC.textContent = tta;
                DR.textContent = dr + " %";
                RR.textContent = rr + " %";
                var dat = [tc, tr, td, ta];
                createGraph(dat, label);
            }

        }
    }

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