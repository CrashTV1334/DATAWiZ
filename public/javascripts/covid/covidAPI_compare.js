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

var upArr = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/></svg>';
var ttc, ttr, ttd, tta, rr1, dr1, rr2, dr2, fr1, fr2, fd1, fd2;
var dtc, dtr, dtd, state1, state2;
var data1 = [];
var data2 = [];
var data11 = [];
var data22 = [];
var data111 = [];
var data222 = [];
var label = ["Total Confirmed", "Total Recovered", "Total Deceased", "Total Active"];
var label1 = ["Delta Confirmed", "Delta Recovered", "Delta Deceased"];

var stateMap1 = new Map();
stateMap1.set("Total", 0);
var stateMap2 = new Map();
stateMap2.set("Total", 0);

function myFunction(arr) {



    var stateArr = arr.statewise;
    var stateSel1 = document.querySelector("#stateSel1");
    stateSel1.length = 1;
    var stateSel2 = document.querySelector("#stateSel2");
    stateSel2.length = 1;
    state1 = "Total";
    state2 = "Total"

    ttc = stateArr[0].confirmed;
    ttr = stateArr[0].recovered;
    ttd = stateArr[0].deaths;
    tta = stateArr[0].active;
    dtc = stateArr[0].deltaconfirmed;
    dtd = stateArr[0].deltadeaths;
    dtr = stateArr[0].deltarecovered;
    rr1 = ((ttr / ttc) * 100).toFixed(2);
    dr1 = ((ttd / ttc) * 100).toFixed(2);
    rr2 = ((ttr / ttc) * 100).toFixed(2);
    dr2 = ((ttd / ttc) * 100).toFixed(2);

    data1 = [ttc, ttr, ttd, tta];
    data2 = [ttc, ttr, ttd, tta];
    data11 = [dtc, dtr, dtd];
    data22 = [dtc, dtr, dtd];
    data111 = [rr1, dr1];
    data222 = [rr2, dr2];

    fr1 = parseFloat(rr1);
    fd1 = parseFloat(dr1);
    fr2 = parseFloat(rr2);
    fd2 = parseFloat(dr2);

    if (fr1 > fr2) {
        var diff = (fr1 - fr2).toFixed(2);
        $("#recoveryInference").html(state1 + " has " + diff + "% better recovery rate than " + state2);
    } else {
        var diff = (fr2 - fr1).toFixed(2);
        $("#recoveryInference").html(state2 + " has " + diff + "% better recovery rate than " + state1);
    }
    if (fd1 > fd2) {
        var diff = (fd1 - fd2).toFixed(2);
        $("#deathInference").html(state2 + " has " + diff + "% lesser death rate than " + state1);
    } else {
        var diff = (fd2 - fd1).toFixed(2);
        $("#deathInference").html(state1 + " has " + diff + "% lesser death rate than " + state2);
    }

    setParameters(ttc, ttr, ttd, tta, rr1, dr1, '1', 'Total', 'Total');
    setParameters(ttc, ttr, ttd, tta, rr2, dr2, '2', 'Total', 'Total');
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
            state1 = stateArr[indx].state;
            ttc = tc;
            ttr = tr;
            ttd = td;
            tta = ta;
            dtc = stateArr[indx].deltaconfirmed;
            dtd = stateArr[indx].deltadeaths;
            dtr = stateArr[indx].deltarecovered;
            rr1 = ((ttr / ttc) * 100).toFixed(2);
            dr1 = ((ttd / ttc) * 100).toFixed(2);
            data1 = [ttc, ttr, ttd, tta];
            data11 = [dtc, dtr, dtd];
            data111 = [rr1, dr1];

            fr1 = parseFloat(rr1);
            fd1 = parseFloat(dr1);

            if (fr1 > fr2) {
                var diff = (fr1 - fr2).toFixed(2);
                $("#recoveryInference").html(state1 + " has " + "<span id='st1'>" + diff + "% " + upArr + '</span>' + " better recovery rate than " + state2);
                $("#st1").removeClass("green");
                $("#st1").addClass("green");
            } else {
                var diff = (fr2 - fr1).toFixed(2);
                $("#recoveryInference").html(state2 + " has " + "<span id='st1'>" + diff + "% " + upArr + '</span>' + " better recovery rate than " + state1);
                $("#st1").removeClass("green");
                $("#st1").addClass("green");
            }
            if (fd1 > fd2) {
                var diff = (fd1 - fd2).toFixed(2);
                $("#deathInference").html(state2 + " has " + "<span id='st2'>" + diff + "% " + upArr + '</span>' + " lesser death rate than " + state1);
                $("#st2").removeClass("green");
                $("#st2").addClass("green");
            } else {
                var diff = (fd2 - fd1).toFixed(2);
                $("#deathInference").html(state1 + " has " + "<span id='st2'>" + diff + "% " + upArr + '</span>' + " lesser death rate than " + state2);
                $("#st2").removeClass("green");
                $("#st2").addClass("green");
            }

            setParameters(ttc, ttr, ttd, tta, rr1, dr1, '1', state1, state2);

        } catch (error) {
            try {
                var tc = stateArr[0].confirmed;
                var tr = stateArr[0].recovered;
                var td = stateArr[0].deaths;
                var ta = stateArr[0].active;
                state1 = stateArr[0].state;
                ttc = tc;
                ttr = tr;
                ttd = td;
                tta = ta;
                dtc = stateArr[0].deltaconfirmed;
                dtd = stateArr[0].deltadeaths;
                dtr = stateArr[0].deltarecovered;
                rr1 = ((ttr / ttc) * 100).toFixed(2);
                dr1 = ((ttd / ttc) * 100).toFixed(2);
                data1 = [ttc, ttr, ttd, tta];
                data11 = [dtc, dtr, dtd];
                data111 = [rr1, dr1];

                fr1 = parseFloat(rr1);
                fd1 = parseFloat(dr1);

                if (fr1 > fr2) {
                    var diff = (fr1 - fr2).toFixed(2);
                    $("#recoveryInference").html(state1 + " has " + "<span id='st1'>" + diff + "% " + upArr + '</span>' + " better recovery rate than " + state2);
                    $("#st1").removeClass("green");
                    $("#st1").addClass("green");
                } else {
                    var diff = (fr2 - fr1).toFixed(2);
                    $("#recoveryInference").html(state2 + " has " + "<span id='st1'>" + diff + "% " + upArr + '</span>' + " better recovery rate than " + state1);
                    $("#st1").removeClass("green");
                    $("#st1").addClass("green");
                }
                if (fd1 > fd2) {
                    var diff = (fd1 - fd2).toFixed(2);
                    $("#deathInference").html(state2 + " has " + "<span id='st2'>" + diff + "% " + upArr + '</span>' + " lesser death rate than " + state1);
                    $("#st2").removeClass("green");
                    $("#st2").addClass("green");
                } else {
                    var diff = (fd2 - fd1).toFixed(2);
                    $("#deathInference").html(state1 + " has " + "<span id='st2'>" + diff + "% " + upArr + '</span>' + " lesser death rate than " + state2);
                    $("#st2").removeClass("green");
                    $("#st2").addClass("green");
                }

                setParameters(ttc, ttr, ttd, tta, rr1, dr1, '1', state1, state2);
            } catch (error) {
                ttc = 0;
                ttr = 0;
                ttd = 0;
                tta = 0;
                dtc = 0;
                dtd = 0;
                dtr = 0;
                rr1 = ((ttr / ttc) * 100).toFixed(2);
                dr1 = ((ttd / ttc) * 100).toFixed(2);
                data1 = [ttc, ttr, ttd, tta];
                data11 = [dtc, dtr, dtd];
                data111 = [rr1, dr1];

                fr1 = parseFloat(rr1);
                fd1 = parseFloat(dr1);

                if (fr1 > fr2) {
                    var diff = (fr1 - fr2).toFixed(2);
                    $("#recoveryInference").html(state1 + " has " + "<span id='st1'>" + diff + "% " + upArr + '</span>' + " better recovery rate than " + state2);
                    $("#st1").removeClass("green");
                    $("#st1").addClass("green");
                } else {
                    var diff = (fr2 - fr1).toFixed(2);
                    $("#recoveryInference").html(state2 + " has " + "<span id='st1'>" + diff + "% " + upArr + '</span>' + " better recovery rate than " + state1);
                    $("#st1").removeClass("green");
                    $("#st1").addClass("green");
                }
                if (fd1 > fd2) {
                    var diff = (fd1 - fd2).toFixed(2);
                    $("#deathInference").html(state2 + " has " + "<span id='st2'>" + diff + "% " + upArr + '</span>' + " lesser death rate than " + state1);
                    $("#st2").removeClass("green");
                    $("#st2").addClass("green");
                } else {
                    var diff = (fd2 - fd1).toFixed(2);
                    $("#deathInference").html(state1 + " has " + "<span id='st2'>" + diff + "% " + upArr + '</span>' + " lesser death rate than " + state2);
                    $("#st2").removeClass("green");
                    $("#st2").addClass("green");
                }

                setParameters(ttc, ttr, ttd, tta, rr1, dr1, '1', 'state', 'state');
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
                state2 = stateArr[indx].state;
                ttc = tc;
                ttr = tr;
                ttd = td;
                tta = ta;
                dtc = stateArr[indx].deltaconfirmed;
                dtd = stateArr[indx].deltadeaths;
                dtr = stateArr[indx].deltarecovered;
                rr2 = ((ttr / ttc) * 100).toFixed(2);
                dr2 = ((ttd / ttc) * 100).toFixed(2);
                data2 = [ttc, ttr, ttd, tta];
                data22 = [dtc, dtr, dtd];
                data222 = [rr2, dr2];

                fr2 = parseFloat(rr2);
                fd2 = parseFloat(dr2);

                if (fr1 > fr2) {
                    var diff = (fr1 - fr2).toFixed(2);
                    $("#recoveryInference").html(state1 + " has " + "<span id='st1'>" + diff + "% " + upArr + '</span>' + " better recovery rate than " + state2);
                    $("#st1").removeClass("green");
                    $("#st1").addClass("green");
                } else {
                    var diff = (fr2 - fr1).toFixed(2);
                    $("#recoveryInference").html(state2 + " has " + "<span id='st1'>" + diff + "% " + upArr + '</span>' + " better recovery rate than " + state1);
                    $("#st1").removeClass("green");
                    $("#st1").addClass("green");
                }
                if (fd1 > fd2) {
                    var diff = (fd1 - fd2).toFixed(2);
                    $("#deathInference").html(state2 + " has " + "<span id='st2'>" + diff + "% " + upArr + '</span>' + " lesser death rate than " + state1);
                    $("#st2").removeClass("green");
                    $("#st2").addClass("green");
                } else {
                    var diff = (fd2 - fd1).toFixed(2);
                    $("#deathInference").html(state1 + " has " + "<span id='st2'>" + diff + "% " + upArr + '</span>' + " lesser death rate than " + state2);
                    $("#st2").removeClass("green");
                    $("#st2").addClass("green");
                }

                setParameters(ttc, ttr, ttd, tta, rr2, dr2, '2', state1, state2);

            } catch (error) {
                try {
                    var tc = stateArr[0].confirmed;
                    var tr = stateArr[0].recovered;
                    var td = stateArr[0].deaths;
                    var ta = stateArr[0].active;
                    state2 = stateArr[0].state;
                    ttc = tc;
                    ttr = tr;
                    ttd = td;
                    tta = ta;
                    dtc = stateArr[0].deltaconfirmed;
                    dtd = stateArr[0].deltadeaths;
                    dtr = stateArr[0].deltarecovered;
                    rr2 = ((ttr / ttc) * 100).toFixed(2);
                    dr2 = ((ttd / ttc) * 100).toFixed(2);
                    data2 = [ttc, ttr, ttd, tta];
                    data22 = [dtc, dtr, dtd];
                    data222 = [rr2, dr2];

                    fr2 = parseFloat(rr2);
                    fd2 = parseFloat(dr2);

                    if (fr1 > fr2) {
                        var diff = (fr1 - fr2).toFixed(2);
                        $("#recoveryInference").html(state1 + " has " + "<span id='st1'>" + diff + "% " + upArr + '</span>' + " better recovery rate than " + state2);
                        $("#st1").removeClass("green");
                        $("#st1").addClass("green");
                    } else {
                        var diff = (fr2 - fr1).toFixed(2);
                        $("#recoveryInference").html(state2 + " has " + "<span id='st1'>" + diff + "% " + upArr + '</span>' + " better recovery rate than " + state1);
                        $("#st1").removeClass("green");
                        $("#st1").addClass("green");
                    }
                    if (fd1 > fd2) {
                        var diff = (fd1 - fd2).toFixed(2);
                        $("#deathInference").html(state2 + " has " + "<span id='st2'>" + diff + "% " + upArr + '</span>' + " lesser death rate than " + state1);
                        $("#st2").removeClass("green");
                        $("#st2").addClass("green");
                    } else {
                        var diff = (fd2 - fd1).toFixed(2);
                        $("#deathInference").html(state1 + " has " + "<span id='st2'>" + diff + "% " + upArr + '</span>' + " lesser death rate than " + state2);
                        $("#st2").removeClass("green");
                        $("#st2").addClass("green");
                    }

                    setParameters(ttc, ttr, ttd, tta, rr2, dr2, '2', state1, state2);
                } catch (error) {
                    ttc = 0;
                    ttr = 0;
                    ttd = 0;
                    tta = 0;
                    dtc = 0;
                    dtd = 0;
                    dtr = 0;
                    var state = stateArr[0].state;
                    rr2 = ((ttr / ttc) * 100).toFixed(2);
                    dr2 = ((ttd / ttc) * 100).toFixed(2);
                    data2 = [ttc, ttr, ttd, tta];
                    data22 = [dtc, dtr, dtd];
                    data222 = [rr2, dr2];

                    fr2 = parseFloat(rr2);
                    fd2 = parseFloat(dr2);

                    if (fr1 > fr2) {
                        var diff = (fr1 - fr2).toFixed(2);
                        $("#recoveryInference").html(state1 + " has " + "<span id='st1'>" + diff + "% " + upArr + '</span>' + " better recovery rate than " + state2);
                        $("#st1").removeClass("green");
                        $("#st1").addClass("green");
                    } else {
                        var diff = (fr2 - fr1).toFixed(2);
                        $("#recoveryInference").html(state2 + " has " + "<span id='st1'>" + diff + "% " + upArr + '</span>' + " better recovery rate than " + state1);
                        $("#st1").removeClass("green");
                        $("#st1").addClass("green");
                    }
                    if (fd1 > fd2) {
                        var diff = (fd1 - fd2).toFixed(2);
                        $("#deathInference").html(state2 + " has " + "<span id='st2'>" + diff + "% " + upArr + '</span>' + " lesser death rate than " + state1);
                        $("#st2").removeClass("green");
                        $("#st2").addClass("green");
                    } else {
                        var diff = (fd2 - fd1).toFixed(2);
                        $("#deathInference").html(state1 + " has " + "<span id='st2'>" + diff + "% " + upArr + '</span>' + " lesser death rate than " + state2);
                        $("#st2").removeClass("green");
                        $("#st2").addClass("green");
                    }

                    setParameters(ttc, ttr, ttd, tta, rr2, dr2, '2', 'state', 'state');
                }

            }
        }

    }
}

function setParameters(ttc, ttr, ttd, tta, rr, dr, offset, state1, state2) {
    var TC = document.querySelector("#confirmCs" + offset);
    var RC = document.querySelector("#recoveries" + offset);
    var DC = document.querySelector("#deaths" + offset);
    var AC = document.querySelector("#activeCs" + offset);
    TC.textContent = ttc;
    RC.textContent = ttr;
    DC.textContent = ttd;
    AC.textContent = tta;
    createRadarGraph(data1, data2, label, 'radarChart', '#totalChart', 'Overall');
    createRadarGraph(data11, data22, label1, 'RradarChart', '#deltaChart', 'Delta');
    createBarGraph(data111, 'bbarChart', '#rates1', state1);
    createBarGraph(data222, 'BbarChart', '#rates2', state2);
}

function createRadarGraph(data1, data2, Llabel, id1, id2, heading) {
    var variable = '<canvas id="' + id1 + '"></canvas>';
    $('#' + id1).remove();
    $(id2).append(variable);
    var ctx = document.getElementById(id1).getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'radar',
        data: {
            datasets: [{
                data: data1,
                backgroundColor: [
                    'rgba(49,118,177,0.3)',
                ],
            }, {
                data: data2,
                backgroundColor: [
                    'rgba(232,168,76,0.6)',
                ],
            }],
            labels: Llabel,
        },
        options: {
            title: {
                display: true,
                text: heading,
            },
            legend: {
                display: false,
            }
        }

    });

}

function createBarGraph(dat, id1, id2, state) {
    var variable = '<canvas id="' + id1 + '"></canvas>';
    $('#' + id1).remove();
    $(id2).append(variable);
    var ctx = document.getElementById(id1).getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            datasets: [{
                data: dat,
                borderWidth: 1,
                backgroundColor: [
                    'rgba(89,178,89,0.4)',
                    'rgba(210,80,77,0.4)',
                ],
            }],
            labels: ['Recovery Rate', 'Death Rate'],
        },
        options: {
            title: {
                display: true,
                text: state,
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