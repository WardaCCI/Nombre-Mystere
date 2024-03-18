let hallOfFame = []; // Initialisation de la liste des meilleurs joueurs
let joueurActuel = null;// Initialisation du joueur actuel à null
// 
function commencerJeu() { // Fonction pour commencer un nouveau jeu
    joueurActuel = {  // Création d'un nouvel objet pour le joueur actuel
        nombreMystere: Math.floor(Math.random() * 10) + 1, // Génération d'un nombre mystère
        tentatives: 0, // Initialisation du nombre de tentatives à 0
        debutDuJeu: new Date() // Enregistrement de l'heure de début du jeu
    };
    document.getElementById('proposition').focus(); // Mise au point sur le champ de saisie de la proposition
}
// 
function verifier(event) { // Fonction pour vérifier la proposition du joueur
    // Si l'utilisateur appuie sur la touche Entrée
    if (event.key === 'Enter') {
        // Si le joueur a déjà fait 10 tentatives, le jeu est terminé
        if (joueurActuel.tentatives >= 10) {
            document.getElementById('message').innerText = "Le jeu est terminé après 10 tentatives. Veuillez commencer un nouveau jeu.";
            return;
        }
        // Récupération de la proposition du joueur
        let proposition = parseInt(document.getElementById('proposition').value);
        // Incrémentation du nombre de tentatives
        joueurActuel.tentatives++;
        // Vérification de la proposition du joueur
        if (proposition < joueurActuel.nombreMystere) {
            document.getElementById('message').innerText = "Proposition trop petite";
        } else if (proposition > joueurActuel.nombreMystere) {
            document.getElementById('message').innerText = "Proposition trop grande";
        } else {
            // Si la proposition est correcte
            let finDuJeu = new Date();
            let tempsEcoule = Math.round((finDuJeu - joueurActuel.debutDuJeu) / 1000);
            document.getElementById('message').innerText = "Bravo ! Vous avez trouvé le nombre mystère en " + joueurActuel.tentatives + " tentatives et " + tempsEcoule + " secondes.";
            joueurActuel.temps = tempsEcoule;
            hallOfFame.push(joueurActuel);
            hallOfFame.sort((a, b) => a.tentatives - b.tentatives || a.temps - b.temps); // je n'ai pas trop compris cette partie 
            hallOfFame = hallOfFame.slice(0, 10);
            afficherHallOfFame();
            document.getElementById('gagnant').style.display = 'block';
           
        }
        // Réinitialisation du champ de saisie de la proposition
        document.getElementById('proposition').value = '';
    }
}
// 
function ajouterGagnant(event) { // Fonction pour ajouter un gagnant au Hall of Fame
    // Si l'utilisateur appuie sur la touche Entrée
    if (event.key === 'Enter') {
        // Récupération du nom du gagnant
        let nom = document.getElementById('nom').value;
        // Ajout du nom du gagnant au Hall of Fame
        hallOfFame[0].nom = nom;
        // Affichage du Hall of Fame
        afficherHallOfFame();
        // // Masquage du champ de saisie du nom du gagnant
        document.getElementById('gagnant').style.display = 'none';
        // // Réinitialisation du champ de saisie du nom du gagnant
        document.getElementById('nom').value = '';
        // Commencement d'un nouveau jeu
        commencerJeu();
    }
}
// 
function afficherHallOfFame() { // Fonction pour afficher le Hall of Fame
    // Récupération du tableau du Hall of Fame
    let tableau = document.getElementById('hallOfFame');
    // Suppression de toutes les lignes du tableau sauf la première
    while (tableau.rows.length > 1) {
        tableau.deleteRow(1);
    }
   
    for (let i = 0; i < hallOfFame.length; i++) {   // Ajout de chaque joueur du Hall of Fame au tableau
        let ligne = tableau.insertRow(-1);
        ligne.insertCell(0).innerText = i + 1;
        ligne.insertCell(1).innerText = hallOfFame[i].nom;
        ligne.insertCell(2).innerText = hallOfFame[i].tentatives;
        ligne.insertCell(3).innerText = hallOfFame[i].temps;
    }
}
// Commencement du jeu
commencerJeu();
