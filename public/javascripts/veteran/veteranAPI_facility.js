var xmlhttp = new XMLHttpRequest();
var url = "https://data.medicare.gov/api/views/6qxe-iqz8/rows.json?accessType=DOWNLOAD";

var downArr = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" /></svg>';
var upArr = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/></svg>';

xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        facilityGraph(myArr);
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

var country, state, city, condition, measure, samples, score;
var avgScr = 40;
var avgSam = 1878;

var facilityMap = new Map();
facilityMap.set("--Select--", -1);

function facilityGraph(arr) {
    var facilitySel = document.querySelector("#facilitySel");
    facilitySel.length = 1;
    var facilityArr = arr.data;
    for (var i = 1; i < facilityArr.length; i++) {
        facilitySel.options[facilitySel.options.length] = new Option(facilityArr[i][9], facilityArr[i][9]);
        facilityMap.set(facilityArr[i][9], i);
    }

    facilitySel.onchange = function () {
        var selected_facility = document.querySelector("#facilitySel").value;
        var indx = facilityMap.get(selected_facility);
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
            samples = sam;
            score = sc;

            if (score > avgScr) {
                var diff = score - avgScr;
                $("#scoreInference").html("The score is " + "<span id='scr1'>" + diff + "% " + upArr + '</span>' + " above the average score");
                $("#scr1").addClass("green");
                $("#scr1").removeClass("red");
            } else {
                var diff = avgScr - score;
                $("#scoreInference").html("The score is " + "<span id='scr1'>" + diff + "% " + downArr + '</span>' + " lower than the average score");
                $("#scr1").addClass("red");
                $("#scr1").removeClass("green");
            }
            if (samples > avgSam) {
                var diff = samples - avgSam;
                $("#sampleInference").html("Facility has excess " + "<span id='sam1'>" + diff + " " + upArr + '</span>' + " than average samples");
                $("#sam1").addClass("green");
                $("#sampleInference").removeClass("red");
            } else {
                var diff = avgSam - samples;
                $("#sampleInference").html("Facility has " + "<span id='sam1'>" + diff + " " + downArr + '</span>' + " samples less than average samples");
                $("#sam1").addClass("red");
                $("#sam1").removeClass("green");
            }

            setParameters();

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
                samples = sam;
                score = sc;

                if (score > avgScr) {
                    var diff = score - avgScr;
                    $("#scoreInference").html("The score is " + "<span id='scr1'>" + diff + "% " + upArr + '</span>' + " above the average score");
                    $("#scr1").addClass("green");
                    $("#scr1").removeClass("red");
                } else {
                    var diff = avgScr - score;
                    $("#scoreInference").html("The score is " + "<span id='scr1'>" + diff + "% " + downArr + '</span>' + " lower than the average score");
                    $("#scr1").addClass("red");
                    $("#scr1").removeClass("green");
                }
                if (samples > avgSam) {
                    var diff = samples - avgSam;
                    $("#sampleInference").html("Facility has excess " + "<span id='sam1'>" + diff + " " + upArr + '</span>' + " than average samples");
                    $("#sam1").addClass("green");
                    $("#sampleInference").removeClass("red");
                } else {
                    var diff = avgSam - samples;
                    $("#sampleInference").html("Facility has " + "<span id='sam1'>" + diff + " " + downArr + '</span>' + " samples less than average samples");
                    $("#sam1").addClass("red");
                    $("#sam1").removeClass("green");
                }

                setParameters();
            } catch (error) {
                country = 0;
                state = 0;
                city = 0;
                condition = 0;
                measure = 0;
                samples = 0;
                score = 0;

                if (score > avgScr) {
                    var diff = score - avgScr;
                    $("#scoreInference").html("The score is " + "<span id='scr1'>" + diff + "% " + upArr + '</span>' + " above the average score");
                    $("#scr1").addClass("green");
                    $("#scr1").removeClass("red");
                } else {
                    var diff = avgScr - score;
                    $("#scoreInference").html("The score is " + "<span id='scr1'>" + diff + "% " + downArr + '</span>' + " lower than the average score");
                    $("#scr1").addClass("red");
                    $("#scr1").removeClass("green");
                }
                if (samples > avgSam) {
                    var diff = samples - avgSam;
                    $("#sampleInference").html("Facility has excess " + "<span id='sam1'>" + diff + " " + upArr + '</span>' + " than average samples");
                    $("#sam1").addClass("green");
                    $("#sampleInference").removeClass("red");
                } else {
                    var diff = avgSam - samples;
                    $("#sampleInference").html("Facility has " + "<span id='sam1'>" + diff + " " + downArr + '</span>' + " samples less than average samples");
                    $("#sam1").addClass("red");
                    $("#sam1").removeClass("green");
                }

                setParameters();
            }

        }
    }
}

function setParameters() {
    TC = document.querySelector("#country");
    RC = document.querySelector("#state");
    DC = document.querySelector("#city");
    AC = document.querySelector("#condition");
    DR = document.querySelector("#measure");
    TC.textContent = country;
    RC.textContent = state;
    DC.textContent = city;
    AC.textContent = condition;
    DR.textContent = measure;
    createPieGraph([100 - score, score], ['', 'Score'], 'analyse-pieChart', '#scoreGraph');
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