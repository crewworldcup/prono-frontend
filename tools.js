var rankEndFileName = "_rank.json";
fetch('res.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (myJson) {
        var i = 0;
        var pronosByDate = {};
        $.each(myJson, function (date, pronos) {
            pronosByDate[date] = pronos;
        });
        pronosByDate = sortOnKeys(pronosByDate);
        for (var date in pronosByDate) {
            console.log(date+rankEndFileName);
            var dateActive = "";
            if (i == 0) {
                dateActive = "active";
            }
            $('#dateTab').append('<li class="'+dateActive+'"><a href="#tab_' + date + '" data-toggle="pill">' + date + '</a></li>');
            $('#dateCont').append('<div class="tab-pane '+dateActive+'" id="tab_'+date+'"><div id="tab_match'+date+'"><span><ul class="nav nav-pills" id="matchTab'+date+'"><div class="tab-content" id="matchCont'+date+'"></div></ul></span><span id="class_'+date+'"></span></div></div>');

            var j = 0;
            var pronos = pronosByDate[date];
            $.each(pronos.pronos, function (a, b) {
                var matchNameKey = a.trim().replace(/\s/g,'');
                var matchActif = "";
                if (j == 0) {
                    matchActif = "active in";
                }
                $('#matchTab' + date + '').append('<li class="'+matchActif+'"><a data-toggle="pill" href="#' + matchNameKey + '">' + a + '</a></li>');
                j++;

                $('#matchCont' + date + '').append('<div id="' + matchNameKey + '" class="tab-pane fade '+matchActif+'"><h3>' + a + '</h3><p></p></div>');
                var str = a;
                var splitStr = str.split("-");
                $('#' + matchNameKey + '').append('<div class="table-responsive"><table class="table" style="width:auto"><thead><tr><th width="33%"></th><th width="33%">' + splitStr[0] + '</th><th width="33%">' + splitStr[1] + '</th></tr></thead><tbody id="body' + matchNameKey + '"></tbody></table></div>');

                $.each(b, function (index, c) {
                    var team1 = '';
                    var team2 = '';
                    if (c.but1 > c.but2) {
                        team1 = 'win';
                        team2 = 'lost';
                    } else if (c.but2 > c.but1) {
                        team1 = 'lost';
                        team2 = 'win';
                    } else {
                        team1 = 'equal';
                        team2 = 'equal';
                    }
                    $('#body' + matchNameKey + '').append('<tr><td>' + c.username + '</td><td class="score '+team1+'">' + c.but1 + '</td>' +
                        '<td class="score '+team2+'">' + c.but2 + '</td></tr>');
                });

            });

            i++;
        }
        for (var date in pronosByDate) {
            appendClassement(date);
        }
    });

function sortOnKeys(dict) {

    var sorted = [];
    for (var key in dict) {
        sorted[sorted.length] = key;
    }
    sorted.sort();

    var tempDict = {};
    for (var i = 0; i < sorted.length; i++) {
        tempDict[sorted[i]] = dict[sorted[i]];
    }

    return tempDict;
};

function appendClassement(dDay) {
  try {
    fetch(dDay+rankEndFileName)
      .then(function(response) {
        return response.json();
      })
      .then(function(classementJson) {
        $('#class_' + dDay + '').append('<table class="table" style="width:auto"><thead><tr><th width="33%">Classement</th><th width="33%">Joueur</th><th width="33%">Points</th><th width="33%">Gain Pt</th><th width="33%">Gain Rg</th></thead><tbody id="classBody_'+dDay+'"></tbody></table>');
        $.each(classementJson, function(num, c) {
            $('#classBody_' + dDay + '').append('<tr><td>'+c.r+'</td><td>'+c.username+'</td><td>'+c.nbPoint+'</td><td>'+c.evolPoint+'</td><td>'+c.evolRank+'</td></tr>');
            console.log(c.username);
        });
      });
  }
  catch(err) {
    $('#class_' + dDay + '').append('<p>Pas encore de classement</p>');
    console.log("pas de fichier classement pour "+dDay);
  }
};
