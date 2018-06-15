var jsonObj;
fetch('res.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
    var i=0;
    $.each(myJson, function( k, v ) {
      //$('#menu').append('<li><div>'+ k +'</div></li>');
      if (i==0) {
        $('#dateTab').append('<li class="active"><a href="#tab_'+k+'" data-toggle="pill">'+k+'</a></li>');
      } else {
        $('#dateTab').append('<li><a href="#tab_'+k+'" data-toggle="pill">'+k+'</a></li>');
      }
      i++;
      $('#dateCont').append('<div class="tab-pane" id="tab_'+k+'"><ul class="nav nav-pills" id="matchTab'+k+'"><div class="tab-content" id="matchCont'+k+'"></div></ul></div>');
      var j=0;
      $.each(v.pronos, function( a, b ) {
        if (j==0) {
          $('#matchTab'+k+'').append('<li class="active"><a data-toggle="pill" href="#'+a+'">'+a+'</a></li>');

        } else {
          $('#matchTab'+k+'').append('<li><a data-toggle="pill" href="#'+a+'">'+a+'</a></li>');
        }
        j++;
        $('#matchCont'+k+'').append('<div id="'+a+'" class="tab-pane fade"><h3>'+a+'</h3><p></p></div>');
        $.each(b,function(index, c) {
          $('#'+a+'').append('<div>'+c.username+':'+c.but1+':'+c.but2+'</div>');
        });
      });
    });
  });
