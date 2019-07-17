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

$nom_agents = isset($request->nom_agents)?$request->nom_agents:null;
$nom_agents = mysqli_real_escape_string($con, $nom_agents);
$nom_agents = stripslashes($nom_agents);

$date_validite_permis = isset($request->date_validite_permis)?$request->date_validite_permis:null;
$date_validite_permis = mysqli_real_escape_string($con, $date_validite_permis);
$date_validite_permis = stripslashes($date_validite_permis);

$date_validite_FCO = isset($request->date_validite_FCO)?$request->date_validite_FCO:null;
$date_validite_FCO = mysqli_real_escape_string($con, $date_validite_FCO);
$date_validite_FCO = stripslashes($date_validite_FCO);

$matricule_REL = isset($request->matricule_REL)?$request->matricule_REL:null;
$matricule_REL = mysqli_real_escape_string($con, $matricule_REL);
$matricule_REL = stripslashes($matricule_REL);

$nom_site = isset($request->nom_site)?$request->nom_site:null;
$nom_site = mysqli_real_escape_string($con, $nom_site);
$nom_site = stripslashes($nom_site);


/*
$tab = array();
$tab['matricule_agents'] = $matricule_agents;
$tab['nom_agents'] = $nom_agents;
$tab['date_validite_permis'] = $date_validite_permis;
$tab['date_validite_FCO'] = $date_validite_FCO;
$tab['matricule_REL'] = $matricule_REL;
$tab['nom_site'] = $nom_site;
*/

$stmt = $con->prepare("INSERT INTO `agents` (matricule_agents, nom_agents, date_validite_permis, date_validite_FCO, matricule_REL, nom_site) VALUES (?,?,?,?,?,?)");

$stmt->bind_param('isssis', $matricule_agents, $nom_agents, $date_validite_permis, $date_validite_FCO, $matricule_REL, $nom_site);

$ret = array();
if ($result = $stmt->execute()){
    $ret['err'] = true;
    $stmt->free_result();

}
else {
    $ret['err'] = false;
}
$stmt->close();

mysqli_close($con);

echo json_encode($ret);