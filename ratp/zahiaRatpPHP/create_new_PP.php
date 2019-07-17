<?php 

if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}

require "connexion.php";

$data = file_get_contents("php://input");
$request = json_decode($data);

$matricule_agents = isset($request->matricule_agents)?$request->matricule_agents:null;
$matricule_agents = mysqli_real_escape_string($con, $matricule_agents);
$matricule_agents = stripslashes($matricule_agents);

$date_ouverture_PP = isset($request->date_ouverture_PP)?$request->date_ouverture_PP:null;
$date_ouverture_PP = mysqli_real_escape_string($con, $date_ouverture_PP);
$date_ouverture_PP = stripslashes($date_ouverture_PP);

$date_cloture_PP = isset($request->date_cloture_PP)?$request->date_cloture_PP:null;
$date_cloture_PP = mysqli_real_escape_string($con, $date_cloture_PP);
$date_cloture_PP = stripslashes($date_cloture_PP);

$commentaire_PP = isset($request->commentaire_PP)?$request->commentaire_PP:null;
$commentaire_PP = mysqli_real_escape_string($con, $commentaire_PP);
$commentaire_PP = stripslashes($commentaire_PP);

/*
$tab = array();
$tab['matricule_agents'] = $matricule_agents;
$tab['date_ouverture_PP'] = $date_ouverture_PP;
$tab['date_cloture_PP'] = $date_cloture_PP;
$tab['commentaire_PP'] = $commentaire_PP;
*/

$sql = "INSERT INTO `plan_de_progres` (date_ouverture_PP, date_cloture_PP, commentaire_PP, matricule_agents) VALUES (?,?,?,?)";

$ret = array();
if($query = $con->prepare($sql)){
    $query->bind_param('sssi', $date_ouverture_PP, $date_cloture_PP, $commentaire_PP, $matricule_agents);

    if ($result = $query->execute()){
        $ret['err'] = false;
        $query->free_result();
    
    }
    else {
        $ret['err'] = true;
        $ret['msg'] = $query->error;
    }
    $query->close();

}else{
   var_dump($con->error);
}


mysqli_close($con);

echo json_encode($ret);