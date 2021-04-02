var xmlhttp = new XMLHttpRequest();
var url = "https://data.medicare.gov/api/views/6qxe-iqz8/rows.json?accessType=DOWNLOAD";

xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        facilityGraph(myArr);
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

var country, state, city, condition, measure, samples, score;

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
                setParameters();
            } catch (error) {
                country = 0;
                state = 0;
                city = 0;
                condition = 0;
                measure = 0;
                samples = 0;
                score = 0;
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
    SM = document.querySelector("#samples");
    TC.textContent = country;
    RC.textContent = state;
    DC.textContent = city;
    AC.textContent = condition;
    DR.textContent = measure;
    SM.textContent = samples;
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