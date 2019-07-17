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

$dates_validation_AC = isset($request->dates_validation_AC)?$request->dates_validation_AC:null;
$dates_validation_AC = mysqli_real_escape_string($con, $dates_validation_AC);
$dates_validation_AC = stripslashes($dates_validation_AC);

$commentaire_AC = isset($request->commentaire_AC)?$request->commentaire_AC:null;
$commentaire_AC = mysqli_real_escape_string($con, $commentaire_AC);
$commentaire_AC = stripslashes($commentaire_AC);

/*
$tab = array();
$tab['matricule_agents'] = $matricule_agents;
$tab['dates_validation_AC'] = $dates_validation_AC;
$tab['commentaire_AC'] = $commentaire_AC;
*/

$sql = "INSERT INTO `ambition_clients` (dates_validation_AC, commentaire_AC, matricule_agents) VALUES (?,?,?)";

$ret = array();
if($query = $con->prepare($sql)){
    $query->bind_param('ssi', $dates_validation_AC, $commentaire_AC, $matricule_agents);

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