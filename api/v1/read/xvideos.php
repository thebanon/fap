<?php
if($params > 0) {
    //$data['query'] = $query;   
    if($params > 1 && $query[0] == "freak") {
        $data["url"] = $url = 'https://'.explode('https://',$request_uri)[1];
        $html = file_get_contents($url);
        $dom = new DOMDocument();
        libxml_use_internal_errors(true);
        if(!empty($html)){
            $dom->loadHTML($html);
            libxml_clear_errors();
            $xpath = new DOMXPath($dom);
            
            $url = $xpath->query("//meta[@property='og:url']");
            $id = (int)explode('/',explode('xvideos.com/video',$url->item(0)->getAttribute('content'))[1])[0];
            
            $data["response"][$id] = [];

            $thumbnail = $xpath->query("//meta[@property='og:image']");
            $data["response"][$id]["thumbnail"] = $thumbnail->item(0)->getAttribute('content');
            
            $title = $xpath->query("//meta[@property='og:title']");
            $data["response"][$id]["title"] = $title->item(0)->getAttribute('content');
        }     
    }
    else if($params > 1 && $query[0] == "id") {
        $data["id"] = $id = $query[1];
        $url = 'https://www.xvideos.com/video'.$id.'/';
        $html = file_get_contents($url);
        $dom = new DOMDocument();
        libxml_use_internal_errors(true);
        if(!empty($html)){
            $dom->loadHTML($html);
            libxml_clear_errors();	
            $xpath = new DOMXPath($dom);
            $data["title"] = $title = $xpath->query('//h2[contains(@)]');
        }     
    }   
    else if($params > 1 && $query[0] == "video") {
        $data["url"] = $url = 'https://'.explode('https://',$request_uri)[1];
        $html = file_get_contents($url);
        $dom = new DOMDocument();
        libxml_use_internal_errors(true);
        if(!empty($html)){
            $dom->loadHTML($html);
            libxml_clear_errors();
            $xpath = new DOMXPath($dom);
            
            $url = $xpath->query("//meta[@property='og:url']");
            $data["response"]["id"] = (int)explode('/',explode('xvideos.com/video',$url->item(0)->getAttribute('content'))[1])[0];

            $thumbnail = $xpath->query("//meta[@property='og:image']");
            $data["response"]["thumbnail"] = $thumbnail->item(0)->getAttribute('content');
            
            $title = $xpath->query("//meta[@property='og:title']");
            $data["response"]["title"] = $title->item(0)->getAttribute('content');
        }     
    }
} else {
    http_response_code(404);
    $data['error'] = ["code" => 404, "message" => "Unauthorized"];
    die();
}
?>