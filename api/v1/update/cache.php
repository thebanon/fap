<?php
$data['params'] = $params; 
$data['query'] = $query; 
if($params > 0) {  
    if($query[0] == "videos") {
        $data["DIR"] = $dir = __DIR__."/../../../bux/json";
        $data["glob"] = $glob = array_slice(scandir($dir.'/video'),2);
        $arr = [];
        foreach($glob as $file) {
            $data["rows"][str_replace('.json','',$file)] = json_decode(file_get_contents($dir.'/video/'.$file));
        }
        file_put_contents($dir.'/videos.json', json_encode($data["rows"],JSON_PRETTY_PRINT));
    }
} else {
    http_response_code(404);
    $data['error'] = ["code" => 404, "message" => "Unauthorized"];
    die();
}
?>