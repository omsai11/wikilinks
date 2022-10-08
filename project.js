var searchStr = "";
var beginHtml = "<div class='contents'>";
var endHtml = "</div>";
var htmlStr;

console.log("link")
function FetchQuery(el){
  console.log(el)
    el.preventDefault();
    $('#holder').html('<b style="color:white;">Loading...</b>');
    var querStr =  encodeURIComponent(searchStr);
    var endpoint = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + querStr + "&prop=info&inprop=url&utf8=&format=json";
       
    $.ajax({
        type:'GET',
        url: endpoint,
        dataType:'jsonp',
        async: 'true',
        success: function(data){
            if(Number(data.query.searchinfo.totalhits) > 0){
                var dataArr = data.query.search;
                htmlStr = '';
                $('#holder').html('');
                var linkstart = '<a class = "col-10 panels" ';
                for(var i in dataArr){
                    var pageHref = 'href="https://en.wikipedia.org/wiki/'+dataArr[i].title.replace(/\s/g,'_')+'" '+'target="_blank">';
                    var actLink = linkstart+pageHref;
                    htmlStr += actLink+beginHtml+"<h3>"+dataArr[i].title+"</h3>"+"<p>"+dataArr[i].snippet+"</p>"+endHtml+"</a>";
                }
                $('#holder').append(htmlStr);
            }
            else{
                $('#holder').html('');
                $('#holder').html('<b style="color:#fff;">Sorry, no results found. why not try a different keyword instead?</b>');
            }
        },
        error: function(){
            $('#holder').html('');
            $('#holder').html('<b style="color:#fff;">ERROR: Could not retrieve data at this moment.</b>');
        }
    });
}

$(document).ready(function(){
    $('#btn').click(function(e){
       
            searchStr = $('#query').val();
  
        if(!!searchStr){
            FetchQuery(e);
            searchStr ="";
        }
    });
});


$(document).ready(function(){
    $('#query').keypress(function(e){
        if(e.which == '13'){
            searchStr = $('#query').val();
        }
        if(!!searchStr){
            FetchQuery(e);
            searchStr ="";
        }
    });
});
