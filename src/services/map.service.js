const { default: axios } = require("axios");

async function openStreetMap(cep) {
    try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&postalcode=${cep}&country=Brazil&limit=1`);
        
        if (response.data && response.data.length > 0) {
            return response.data[0];
        } else {
            throw new Error('CEP não encontrado');
        }
    } catch (error) {
        console.error('Erro ao consultar o CEP:', error);
        throw error;
    }
}

async function linkGoogleMap(cep){
    try {
        const coordenadas = await openStreetMap(cep)

        if(coordenadas) {
            const link = `https://www.google.com/maps/search/?api=1&query=${coordenadas.lat},${coordenadas.lon}`
            return link
        } else {
            throw new Error('Não foi possível obter as coordeadas para este endereço.')
        }
    } catch (error) {
        throw error;
    }
}

module.exports = {openStreetMap, linkGoogleMap};
