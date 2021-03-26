var xmlhttp = new XMLHttpRequest();
var url = "https://data.medicare.gov/api/views/6qxe-iqz8/rows.json?accessType=DOWNLOAD";

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

                setParameters('1');
            } catch (error) {
                country = 0;
                state = 0;
                city = 0;
                condition = 0;
                measure = 0;
                samples1 = 0;
                score1 = 0;

                setParameters('1');
            }

        }
        facilitySel2.onchange = function () {
            var selected_facility = document.querySelector("#facilitySel2").value;
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

                    setParameters('2');
                } catch (error) {
                    country = 0;
                    state = 0;
                    city = 0;
                    condition = 0;
                    measure = 0;
                    samples2 = 0;
                    score2 = 0;

                    setParameters('2');
                }

            }
        }

    }
}

function setParameters(offset) {
    TC = document.querySelector("#country" + offset);
    RC = document.querySelector("#state" + offset);
    DC = document.querySelector("#city" + offset);
    AC = document.querySelector("#condition" + offset);
    DR = document.querySelector("#measure" + offset);
    SM = document.querySelector("#samples" + offset);
    TC.textContent = country;
    RC.textContent = state;
    DC.textContent = city;
    AC.textContent = condition;
    DR.textContent = measure;
    if (offset == '1')
        SM.textContent = samples1;
    else
        SM.textContent = samples2;
    data1 = [samples1, samples2];
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