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

$login = isset($request->login)?$request->login:null;
$login = mysqli_real_escape_string($con, $login);
$login = stripslashes($login);

$sql = "SELECT a.matricule_agents,a.nom_agents,a.date_validite_permis,a.date_validite_FCO,a.nom_site, s.dates_suivi, s.prochaine_date_suivi, s.commentaire_suivi, eap.derniere_date_EAP, eap.prochaine_date_EAP, eap.commentaire_EAP, ac.dates_validation_AC, ac.commentaire_AC, pp.date_ouverture_PP, pp.date_cloture_PP, pp.commentaire_PP, re.total_jours_absences, re.jour_reaccueil, re.commentaire_reaccueil
from agents a 
inner join responsables_equipe_de_ligne rel on a.matricule_REL = rel.matricule_REL 
inner join suivi s on a.matricule_agents = s.matricule_agents 
inner join entretien_appreciation_professionnelle eap on a.matricule_agents = eap.matricule_agents 
inner join ambition_clients ac on a.matricule_agents = ac.matricule_agents
inner join plan_de_progres pp on a.matricule_agents = pp.matricule_agents
inner join re_accueil re on a.matricule_agents = re.matricule_agents 
where rel.login =?";

$result = mysqli_query($con, $sql);

$response = array();
$ret = array();
if($query = $con->prepare($sql)){
    $query->bind_param('s', $login);

    if ($result = $query->execute()){
        $data = $query->get_result();

        while($row = mysqli_fetch_array($data)){
                array_push($response, array("matricule_agents"=>$row['matricule_agents'],
                "nom_agents"=>$row["nom_agents"],
                "date_validite_permis"=>$row["date_validite_permis"],
                "date_validite_FCO"=>$row["date_validite_FCO"],
                "nom_site"=>$row["nom_site"],

                "dates_suivi"=>$row["dates_suivi"],
                "prochaine_date_suivi"=>$row["prochaine_date_suivi"],
                "commentaire_suivi"=>$row["commentaire_suivi"],

                "derniere_date_EAP"=>$row["derniere_date_EAP"],
                "prochaine_date_EAP"=>$row["prochaine_date_EAP"],
                "commentaire_EAP"=>$row["commentaire_EAP"],
                
                "dates_validation_AC"=>$row["dates_validation_AC"],
                "commentaire_AC"=>$row["commentaire_AC"],
                
                "date_ouverture_PP"=>$row["date_ouverture_PP"],
                "date_cloture_PP"=>$row["date_cloture_PP"],
                "commentaire_PP"=>$row["commentaire_PP"],

                "total_jours_absences"=>$row["total_jours_absences"],
                "jour_reaccueil"=>$row["jour_reaccueil"],
                "commentaire_reaccueil"=>$row["commentaire_reaccueil"],
                ));                                        
            }
            



        $ret['err'] = false;
        $ret['data'] = $response;
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

echo json_encode($response);


?>