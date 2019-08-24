var doc = app.activeDocument;
if (doc) {  
  var layers = doc.layers;  
  var arr = '[';    
  for (var i = 0; i < layers.length; i ++) {        
    var layer = layers[i];        
    for (var j = 0; j < layer.placedItems.length; j ++) {            
      var item = layer.placedItems[j];            
      var coords = getCoords(item);            
      var x = coords[0];            
      var y = coords[1];           
      arr += '\n{url: "' + item.name + '", x: ' + x + ', y: ' + y + '}';            
      if (j < layer.placedItems.length - 1) {                
        arr += ",";            
      }        
    }    
  }    
  arr += '\n]';    
  writeFile(doc.name, arr);
}
  
function writeFile(name, content) {        
  var filepath = "~/Desktop/" + name + ".json";        
  var write_file = File(filepath);        
  write_file.open('w', undefined, undefined);        
  write_file.encoding = "UTF-8";        
  write_file.lineFeed = "Unix"; //convert to UNIX lineFeed         
  write_file.writeln(content);        // always close files!        
  write_file.close(); 
}
function getCoords(item) {        
  var coords = doc.convertCoordinate (item.position, CoordinateSystem.DOCUMENTCOORDINATESYSTEM, CoordinateSystem.ARTBOARDCOORDINATESYSTEM);        
  //depends on if anchor is center or upper left        //
  coords[0]+= item.width * 0.5;        //
  coords[1] = Math.abs(coords[1] - (item.height * 0.5));        
  coords[1] = -coords[1];        
  return coords;
}

app;
