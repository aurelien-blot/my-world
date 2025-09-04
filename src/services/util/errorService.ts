export const errorService = {

    showErrorInAlert(error :  Error)  {
        console.log('Error:', error);
        alert('Erreur rencontrée : '+ error.message);
    }
};