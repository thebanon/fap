<?php
$data['params'] = $params; 
$data['query'] = $query; 
if($params > 0) {  
    if($query[0] == "freaks") {
        $data["DIR"] = $dir = __DIR__."/../../../bux/json";
        $glob = array_slice(scandir($dir.'/video'),2);
        $arr = [];
        $data["freaks"] = [];
        foreach($glob as $file) {
            $id = str_replace('.json','',$file);  
            $rows = json_decode(str_replace('http:','https:',file_get_contents($dir.'/video/'.$file)),true);
            $freaks = $rows["freaks"];
            foreach($freaks as $key=>$freak) {
                $freak = str_replace("%20","_",$freak);
                $rows["id"] = (int)$id;
                if(array_key_exists($freak, $data["freaks"])) { array_push($data["freaks"][$freak], $rows); } 
                else { $data["freaks"][$freak] = [$rows];  }
            }
            $data["files"][$freak]["videos"] = $data["freaks"][$freak];
            file_put_contents($dir.'/freak/'.$freak.'.json',json_encode($data["files"][$freak],JSON_PRETTY_PRINT));
        }
    }
    if($query[0] == "videos") {
        $data["DIR"] = $dir = __DIR__."/../../../bux/json";
        $data["glob"] = $glob = array_slice(scandir($dir.'/video'),2);
        $arr = [];
        foreach($glob as $file) {
            $data["rows"][str_replace('.json','',$file)] = json_decode(str_replace('http:','https:',file_get_contents($dir.'/video/'.$file)));
        }
        $data["contents"] = $contents = json_encode($data["rows"],JSON_PRETTY_PRINT);
        file_put_contents($dir.'/videos.json', $contents);
    }
} else {
    http_response_code(404);
    $data['error'] = ["code" => 404, "message" => "Unauthorized"];
    die();
}
?>