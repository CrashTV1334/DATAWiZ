var xmlhttp = new XMLHttpRequest();
var url = "https://data.medicare.gov/api/views/6qxe-iqz8/rows.json?accessType=DOWNLOAD";

var downArr = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" /></svg>';
var upArr = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/></svg>';

xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        myFunction(myArr);
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

var country, state, city, cond, mes, sample1, sample2, score1, score2;
var dtc, dtr, dtd, facility1, facility2;
var data1 = [];
var data2 = [];
var label = ['A', 'B'];

var facilityMap1 = new Map();
facilityMap1.set("--Select--", -1);
var facilityMap2 = new Map();
facilityMap2.set("--Select--", -1);

function myFunction(arr) {
    var facilityArr = arr.data;

    // console.log(facilityArr);

    var facilitySel1 = document.querySelector("#facilitySel1");
    facilitySel1.length = 1;
    var facilitySel2 = document.querySelector("#facilitySel2");
    facilitySel2.length = 1;

    for (var i = 1; i < facilityArr.length; i++) {
        facilitySel1.options[facilitySel1.options.length] = new Option(facilityArr[i][9], facilityArr[i][9]);
        facilityMap1.set(facilityArr[i][9], i);
    }
    for (var i = 1; i < facilityArr.length; i++) {
        facilitySel2.options[facilitySel2.options.length] = new Option(facilityArr[i][9], facilityArr[i][9]);
        facilityMap2.set(facilityArr[i][9], i);
    }
    facilitySel1.onchange = function () {
        var selected_facility = document.querySelector("#facilitySel1").value;
        facility1 = selected_facility;
        var indx = facilityMap1.get(selected_facility);
        label[0] = selected_facility;
        try {
            var cont = facilityArr[indx][14]; // country
            var st = facilityArr[indx][12]; // state
            var cit = facilityArr[indx][11]; // city
            var cond = facilityArr[indx][16]; //condtion
            var mes = facilityArr[indx][18]; //measure
            var sam = facilityArr[indx][20]; //samples 
            var sc = facilityArr[indx][19]; //score
            country = cont;
            state = st;
            city = cit;
            condition = cond;
            measure = mes;
            samples1 = sam;
            score1 = sc;
            sample1 = sam;

            if (sample1 > sample2) {
                var diff = sample1 - sample2;
                $("#sampleInference").html(facility1 + " has " + "<span id='sam111'>" + diff + " " + upArr + '</span>' + " more samples than " + facility2);
                $("#sam111").removeClass("green");
                $("#sam111").addClass("green");

            } else {
                var diff = sample2 - sample1;
                $("#sampleInference").html(facility2 + " has " + "<span id='sam111'>" + diff + "% " + upArr + '</span>' + " more samples than " + facility1);
                $("#sam111").removeClass("green");
                $("#sam111").addClass("green");
            }
            if (score1 > score2) {
                var diff = score1 - score2;
                $("#scoreInference").html(facility1 + " is " + "<span id='scr111'>" + diff + "% " + upArr + '</span>' + " better rated than " + facility2);
                $("#scr111").removeClass("green");
                $("#scr111").addClass("red");
            } else {
                var diff = score2 - score1;
                $("#scoreInference").html(facility2 + " is " + "<span id='scr111'>" + diff + "% " + upArr + '</span>' + " better rated than " + facility1);
                $("#scr111").removeClass("green");
                $("#scr111").addClass("green");
            }

            setParameters('1');

        } catch (error) {
            try {
                var cont = facilityArr[0][14]; // country
                var st = facilityArr[0][12]; // state
                var cit = facilityArr[0][11]; // city
                var cond = facilityArr[0][16]; //condtion
                var mes = facilityArr[0][18]; //measure
                var sam = facilityArr[0][20]; //samples 
                var sc = facilityArr[0][19]; //score
                country = cont;
                state = st;
                city = cit;
                condition = cond;
                measure = mes;
                samples1 = sam;
                score1 = sc;
                sample1 = sam;

                if (sample1 > sample2) {
                    var diff = sample1 - sample2;
                    $("#sampleInference").html(facility1 + " has " + "<span id='sam111'>" + diff + " " + upArr + '</span>' + " more samples than " + facility2);
                    $("#sam111").removeClass("green");
                    $("#sam111").addClass("green");
                } else {
                    var diff = sample2 - sample1;
                    $("#sampleInference").html(facility2 + " has " + "<span id='sam111'>" + diff + "% " + upArr + '</span>' + " more samples than " + facility1);
                    $("#sam111").removeClass("green");
                    $("#sam111").addClass("green");
                }
                if (score1 > score2) {
                    var diff = score1 - score2;
                    $("#scoreInference").html(facility1 + " is " + "<span id='scr111'>" + diff + "% " + upArr + '</span>' + " better rated than " + facility2);
                    $("#scr111").removeClass("green");
                    $("#scr111").addClass("green");
                } else {
                    var diff = score2 - score1;
                    $("#scoreInference").html(facility2 + " is " + "<span id='scr111'>" + diff + "% " + upArr + '</span>' + " better rated than " + facility1);
                    $("#scr111").removeClass("green");
                    $("#scr111").addClass("green");
                }

                setParameters('1');
            } catch (error) {
                country = 0;
                state = 0;
                city = 0;
                condition = 0;
                measure = 0;
                samples1 = 0;
                score1 = 0;
                sample1 = 0;

                if (sample1 > sample2) {
                    var diff = sample1 - sample2;
                    $("#sampleInference").html(facility1 + " has " + "<span id='sam111'>" + diff + " " + upArr + '</span>' + " more samples than " + facility2);
                    $("#sam111").removeClass("green");
                    $("#sam111").addClass("green");
                } else {
                    var diff = sample2 - sample1;
                    $("#sampleInference").html(facility2 + " has " + "<span id='sam111'>" + diff + "% " + upArr + '</span>' + " more samples than " + facility1);
                    $("#sam111").removeClass("green");
                    $("#sam111").addClass("green");
                }
                if (score1 > score2) {
                    var diff = score1 - score2;
                    $("#scoreInference").html(facility1 + " is " + "<span id='scr111'>" + diff + "% " + upArr + '</span>' + " better rated than " + facility2);
                    $("#scr111").removeClass("green");
                    $("#scr111").addClass("green");
                } else {
                    var diff = score2 - score1;
                    $("#scoreInference").html(facility2 + " is " + "<span id='scr111'>" + diff + "% " + upArr + '</span>' + " better rated than " + facility1);
                    $("#scr111").removeClass("green");
                    $("#scr111").addClass("green");
                }

                setParameters('1');
            }

        }
        facilitySel2.onchange = function () {
            var selected_facility = document.querySelector("#facilitySel2").value;
            facility2 = selected_facility;
            var indx = facilityMap2.get(selected_facility);
            label[1] = selected_facility;
            try {
                var cont = facilityArr[indx][14]; // country
                var st = facilityArr[indx][12]; // state
                var cit = facilityArr[indx][11]; // city
                var cond = facilityArr[indx][16]; //condtion
                var mes = facilityArr[indx][18]; //measure
                var sam = facilityArr[indx][20]; //samples 
                var sc = facilityArr[indx][19]; //score
                country = cont;
                state = st;
                city = cit;
                condition = cond;
                measure = mes;
                samples2 = sam;
                score2 = sc;
                sample2 = sam;

                if (sample1 > sample2) {
                    var diff = sample1 - sample2;
                    $("#sampleInference").html(facility1 + " has " + "<span id='sam222'>" + diff + " " + upArr + '</span>' + " more samples than " + facility2);
                    $("#sam222").removeClass("green");
                    $("#sam222").addClass("green");
                } else {
                    var diff = sample2 - sample1;
                    $("#sampleInference").html(facility2 + " has " + "<span id='sam222'>" + diff + " " + upArr + '</span>' + " more samples than " + facility1);
                    $("#sam222").removeClass("green");
                    $("#sam222").addClass("green");
                }
                if (score1 > score2) {
                    var diff = score1 - score2;
                    $("#scoreInference").html(facility1 + " is " + "<span id='scr222'>" + diff + "% " + upArr + '</span>' + " better rated than " + facility2);
                    $("#scr222").removeClass("green");
                    $("#scr222").addClass("green");
                } else {
                    var diff = score2 - score1;
                    $("#scoreInference").html(facility2 + " is " + "<span id='scr222'>" + diff + "% " + upArr + '</span>' + " better rated than " + facility1);
                    $("#scr222").removeClass("green");
                    $("#scr222").addClass("green");
                }

                setParameters('2');

            } catch (error) {
                try {
                    var cont = facilityArr[0][14]; // country
                    var st = facilityArr[0][12]; // state
                    var cit = facilityArr[0][11]; // city
                    var cond = facilityArr[0][16]; //condtion
                    var mes = facilityArr[0][18]; //measure
                    var sam = facilityArr[0][20]; //samples 
                    var sc = facilityArr[0][19]; //score
                    country = cont;
                    state = st;
                    city = cit;
                    condition = cond;
                    measure = mes;
                    samples2 = sam;
                    score2 = sc;
                    sample2 = sam;

                    if (sample1 > sample2) {
                        var diff = sample1 - sample2;
                        $("#sampleInference").html(facility1 + " has " + "<span id='sam222'>" + diff + " " + upArr + '</span>' + " more samples than " + facility2);
                        $("#sam222").removeClass("green");
                        $("#sam222").addClass("green");
                    } else {
                        var diff = sample2 - sample1;
                        $("#sampleInference").html(facility2 + " has " + "<span id='sam222'>" + diff + " " + upArr + '</span>' + " more samples than " + facility1);
                        $("#sam222").removeClass("green");
                        $("#sam222").addClass("green");
                    }
                    if (score1 > score2) {
                        var diff = score1 - score2;
                        $("#scoreInference").html(facility1 + " is " + "<span id='scr222'>" + diff + "% " + upArr + '</span>' + " better rated than " + facility2);
                        $("#scr222").removeClass("green");
                        $("#scr222").addClass("green");
                    } else {
                        var diff = score2 - score1;
                        $("#scoreInference").html(facility2 + " is " + "<span id='scr222'>" + diff + "% " + upArr + '</span>' + " better rated than " + facility1);
                        $("#scr222").removeClass("green");
                        $("#scr222").addClass("green");
                    }

                    setParameters('2');
                } catch (error) {
                    country = 0;
                    state = 0;
                    city = 0;
                    condition = 0;
                    measure = 0;
                    samples2 = 0;
                    score2 = 0;
                    sample2 = 0;

                    if (sample1 > sample2) {
                        var diff = sample1 - sample2;
                        $("#sampleInference").html(facility1 + " has " + "<span id='sam222'>" + diff + " " + upArr + '</span>' + " more samples than " + facility2);
                        $("#sam222").removeClass("green");
                        $("#sam222").addClass("green");
                    } else {
                        var diff = sample2 - sample1;
                        $("#sampleInference").html(facility2 + " has " + "<span id='sam222'>" + diff + " " + upArr + '</span>' + " more samples than " + facility1);
                        $("#sam222").removeClass("green");
                        $("#sam222").addClass("green");
                    }
                    if (score1 > score2) {
                        var diff = score1 - score2;
                        $("#scoreInference").html(facility1 + " is " + "<span id='scr222'>" + diff + "% " + upArr + '</span>' + " better rated than " + facility2);
                        $("#scr222").removeClass("green");
                        $("#scr222").addClass("green");
                    } else {
                        var diff = score2 - score1;
                        $("#scoreInference").html(facility2 + " is " + "<span id='scr222'>" + diff + "% " + upArr + '</span>' + " better rated than " + facility1);
                        $("#scr222").removeClass("green");
                        $("#scr222").addClass("green");
                    }

                    setParameters('2');
                }

            }
        }

    }
}

function setParameters(offset) {
    RC = document.querySelector("#state" + offset);
    DC = document.querySelector("#city" + offset);
    AC = document.querySelector("#condition" + offset);
    DR = document.querySelector("#measure" + offset);

    RC.textContent = state;
    DC.textContent = city;
    AC.textContent = condition;
    DR.textContent = measure;

    data1 = [sample1, sample2];
    data2 = [score1, score2];
    createBarGraph(data1, 'barChart1', '#samples', 'Samples');
    createBarGraph(data2, 'barChart2', '#score', 'Score');
}

function createBarGraph(dat, id1, id2, title) {
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
                    'rgba(247,92,30,0.3)',
                    'rgba(232,150,15,0.3)',
                ],
            }],
            labels: ['facility 1', 'facility 2'],
        },
        options: {
            title: {
                display: true,
                text: title,
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