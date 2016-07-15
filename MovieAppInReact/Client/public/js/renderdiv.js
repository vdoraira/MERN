$.ajax({
    url:'/services/getjson',
    datatype:'json',
    type:'get',
    cache:false,
    success:function(data){

     //var data = $.parseJSON(data);
     console.log(data[0]._id);
     var out = "";
     //var i=0;

   $.each(data, function(index, value) {//height="300px" width="200px"
      console.log(data[index].Poster);
      out+='<div class="col-md-4">'+'<img id="bgposter"  alt="Bootstrap Image Preview" src="'+ data[index].Poster +'" class="img-rounded center-block"></div><div class="col-md-8"><h3>'
      +data[index].Title+'</h3><h4>Year :'+data[index].Year +'</h4><h4>Actors :'+data[index].Actors+'</h4><h4>Director :'+data[index].Director+'</h4><h4>Description :'+data[index].Plot+'</h4>'+
      '<h4>Language :'+data[index].Language+'</h4><h4>Country :'+data[index].Country+'</h4><h4>Released on :'+data[index].Released+'</h4><h4>ImdbRating :'+data[index].imdbRating+'</h4><h4>Awards :'+data[index].Awards+'</h4>'+

      '<button class="btn btn-warning update" type="button" id="'+value._id+"|"+value.Title
          +"|"+value.Year+"|"+value.Actors+"|"+value.Director+"|"+value.Plot+"|"+value.Poster+"|"+value.imdbRating+"|"+value.Awards+"|"+value.Released+"|"+value.Language+"|"+value.Country+'" data-toggle="modal" data-target="#myModalHorizontal">Update</button> '+

              '&nbsp;<a data-toggle="modal" data-target="#myModalDeleteAlert" class="btn btn-danger btn-md buttonDelete" id="'+value._id+'" type="button"><em class="glyphicon glyphicon-delete"></em> Delete'+
        '</a><br/><br/><br/></div>';

      });


document.getElementById("id01").innerHTML = out;

$("#addMovie").click(function(){

 $('#add_details').show();
 $('#update_details').hide();
 $('#title').val('');
// $('#title').attr("readonly","false");
 $('#year').val('');
 $('#actors').val('');
 $('#director').val('');
 $('#plot').val('');
 $('#poster').val('');
 $('#imdbRating').val('');
 $('#awards').val('');
 $('#released').val('');
 $('#language').val('');
 $('#country').val('');
  $('#myModalLabel').html('Add Movie');
});



$(".update").click(function(){

 $('#add_details').hide();
 $('#update_details').show();
 var data1=$(this).attr('id');
 var values=data1.split('|');
 $("#id").val(values[0]);
 $('#title').val(values[1]);
 $('#title').attr("readonly","readonly");
 $('#year').val(values[2]);
 $('#actors').val(values[3]);
 $('#director').val(values[4]);
 $('#plot').val(values[5]);
 $('#poster').val(values[6]);
 $('#imdbRating').val(values[7]);
 $('#awards').val(values[8]);
 $('#released').val(values[9]);
 $('#language').val(values[10]);
 $('#country').val(values[11]);
 $('#myModalLabel').html('Update Movie Details');
});

$(".buttonDelete").click(function(){
  var id=$(this).attr('id');
  //alert(title);
  $('#idDelete').val(id);
});

}
});
