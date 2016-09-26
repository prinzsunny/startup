

$(document).ready(function(){
$("[cms=on]").bind({
  click: function() {
      $(this).colorbox( getTemplate($(this)) );
  },
  mouseover : function() {
      $(this).addClass('border');
  },
  mouseout : function() {
      $(this).removeClass('border');
  },
  
})

var form = document.getElementById('the-form');
form.onsubmit = function() {
  var formData = new FormData(form);
  var xhr = new XMLHttpRequest();
  // Add any event handlers here...
  xhr.open('POST', form.getAttribute('action'), true);
  xhr.send(formData);

  return false; // To avoid actual submission of the form
}

});


function getTemplate(element){
    
    if(element[0].tagName.toLowerCase() === "h1" ){
        
        var elemId = ['cms_', element.attr('id')].join('');
        console.log(elemId);
        var template = [ 
                         '<b>Text value:</b>',
                         '<input id= ', elemId,' type= "textbox" value="', element.text() , '">',
                         '<br/>',
                         '<b>id:</b>',
                          element.attr('id'),
                         '<br/>',
                         '<b>Element type:</b>',
                          element[0].tagName, 
                         '<br/>',
                         '<button class="btn btn-success" id="submit" onclick="saveContent(\'',
                          elemId,
                         '\')">submit</button>'                
                       ].join('');
        
        
        
        return {html : template };
    }   
    
    if(element[0].tagName.toLowerCase() === "img" ){
       
        var template = [ 
                         '<form onsubmit="test()" id = "cmsImage"  enctype="multipart/form-data">',
                         '<b>Current Image:</b>',
                         '<img id="editcms" src="', element.attr('src') , '" style="', element.attr('style'),                                                '"/>',
                         '<br/>',
                         '<b>id:</b>',
                          element.attr('id'),
                         '<br/>',
                         '<b>Element type:</b>',
                          element[0].tagName, 
                         '<br/>',
                         '<input name="upl" type = "file"/>',
                         '<input name="id" value="test" type = "hidden"/>',
                         '<input id="savetocms" type = "submit"/>',
                         '</form>'
                       ].join('');
        
        return {html : template };
    }  
}


function test(){
        var form = document.getElementById('cmsImage');
        var formData = new FormData(form);
        formData.append('test',getCurrentPageContent());
        var xhr = new XMLHttpRequest();
        // Add any event handlers here...
        xhr.open('POST', '/upload', true);
        xhr.send(formData);
        return false; // To avoid actual submission of the form
}
function getCurrentPageContent(){
    
        var pageContent = generatePageID();
        var contentElements = $("[cms=on]");
        if (contentElements.length !== 0){
             contentElements.each(function(){
                 
                 var id         = $(this).attr('id');
                 var elemType   = $(this)[0].tagName;
                 var content;
                 
                 if(elemType.toLowerCase() === 'h1'){
                     
                     content   = $(this).text();
                     
                 } else if (elemType.toLowerCase() === 'img') {
                     
                     content   = $(this).attr('src');   
                 
                }
                 pageContent[id] = content;
             })
    }
    
    return pageContent;
}

function generatePageContent(element){
    
         var elementPredicate = ['[id=', element, ']'].join('');
         var newValue = $(elementPredicate).val();
         var elementId = element.split('_')[1];
         console.log($(elementPredicate).val(), " " , elementId );
         var pageContent = getCurrentPageContent();
         console.log("========Old Value============");
         console.log(pageContent);
         pageContent[elementId] = newValue;
         console.log("========New Value============");
         console.log(pageContent);
         return pageContent;
    
}

function mergeObjectes(object1 , object2){
    $.extend( object1, object2 );
}

function generatePageID(){
 
     return {
         appid : 1234567,
         href : window.location.href,
         pathName : window.location.pathname,
         basePath : window.location.hostname,
         port: window.location.hash,
         origin : window.location.origin
     }
    
}


function saveContent(elemId){
        $.ajax({
        type: "POST",
        url: "/content",
        data: generatePageContent(elemId),
        success: function(msg){
            console.log(msg);
         },
        error: function(){
            alert("failure");
        }
       });
    
}

