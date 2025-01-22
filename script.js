class Reseau {
    constructor(ip, cidr) {
        this.ip = ip;
        this.cidr = cidr;
    }

    calculReseau(monip, moncidr) {
        console.log("Calcul du réseau avec IP:", monip, "et CIDR:", moncidr);
        if (this.testIp(monip) && this.testCidr(moncidr)) {
            this.calculAdresseReseau(monip, moncidr);
            this.calculBroadcast(monip, moncidr);
            this.calculAdresseMin(monip, moncidr);
            this.calculAdresseMax(monip, moncidr);
        } else {
            alert("L'adresse IP ou le CIDR sont incorrects.");
        }
    }

    testIp(monip) {
        let valide = monip.split('.');
        if (valide.length === 4) {
            for (let i = 0; i < 4; i++) {
                let octet = parseInt(valide[i]);
                if (octet < 0 || octet > 255) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }

    testCidr(moncidr) {
        let intcidr = parseInt(moncidr);
        return intcidr >= 1 && intcidr <= 32;
    }

    ipToBinary(monip) {
        let octets = monip.split('.');
        return octets.map(octet => parseInt(octet).toString(2).padStart(8, '0')).join('');
    }

    binaryToIp(binary) {
        let octets = [];
        for (let i = 0; i < 32; i += 8) {
            let segment = binary.slice(i, i + 8);
            octets.push(parseInt(segment, 2));
        }
        return octets.join('.');
    }

    calculeMasqueBinaire(moncidr) {
        let masque = ''.padStart(moncidr, '1').padEnd(32, '0');
        return masque;
    }

    calculAdresseReseau(monip, moncidr) {
        let binIp = this.ipToBinary(monip);
        let binMask = this.calculeMasqueBinaire(moncidr);
        let reseauBinaire = '';

        for (let i = 0; i < 32; i++) {
            reseauBinaire += (binIp[i] === '1' && binMask[i] === '1') ? '1' : '0';
        }

        let adresseReseau = this.binaryToIp(reseauBinaire);
        this.ajouterResultat("Adresse réseau", adresseReseau);
        return adresseReseau;
    }

    calculBroadcast(monip, moncidr) {
        let binIp = this.ipToBinary(monip);
        let binMask = this.calculeMasqueBinaire(moncidr);
        let hostMask = '';
        let broadcastBinaire = '';

        for (let i = 0; i < 32; i++) {
            hostMask += binMask[i] === '1' ? '0' : '1';
        }

        for (let i = 0; i < 32; i++) {
            broadcastBinaire += (binIp[i] === '1' || hostMask[i] === '1') ? '1' : '0';
        }

        let adresseBroadcast = this.binaryToIp(broadcastBinaire);
        this.ajouterResultat("Adresse de broadcast", adresseBroadcast);
    }

    calculAdresseMin(monip, moncidr) {
        let adresseReseau = this.calculAdresseReseau(monip, moncidr);
        let adresseMin = adresseReseau.split('.').map(Number);
        adresseMin[3] += 1;
        if (adresseMin[3] > 255) {
            adresseMin[3] = 0;
            adresseMin[2] += 1;
        }
        let minIp = adresseMin.join('.');
        this.ajouterResultat("Adresse minimale", minIp);
        return minIp;
    }

    calculAdresseMax(monip, moncidr) {
        let adresseBroadcast = this.calculBroadcast(monip, moncidr);
        let adresseMax = adresseBroadcast.split('.').map(Number);
        adresseMax[3] -= 1;
        if (adresseMax[3] < 0) {
            adresseMax[3] = 255;
            adresseMax[2] -= 1;
        }
        let maxIp = adresseMax.join('.');
        this.ajouterResultat("Adresse maximale", maxIp);
        return maxIp;
    }

    ajouterResultat(nomFonction, resultat) {
        const tableau = document.querySelector("table tbody");
        const nouvelleLigne = tableau.insertRow();
        const celluleNom = nouvelleLigne.insertCell(0);
        const celluleResultat = nouvelleLigne.insertCell(1);
        celluleNom.textContent = nomFonction;
        celluleResultat.textContent = resultat;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        let monip = document.getElementById("ip").value;
        let moncidr = document.getElementById("cidr").value;

        const reseau = new Reseau(monip, moncidr);
        reseau.calculReseau(monip, moncidr);
    });
});
