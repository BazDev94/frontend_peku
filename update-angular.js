const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Funzione per eseguire comandi nella shell
function execCommand(command) {
    try {
        console.log(`Esecuzione: ${command}`);
        const output = execSync(command, { encoding: 'utf-8' });
        console.log(output);
    } catch (error) {
        console.error(`Errore durante l'esecuzione di: ${command}`);
        console.error(error.message);
        process.exit(1);
    }
}

// Funzione per controllare la versione corrente di Angular CLI
function checkCurrentVersion() {
    try {
        const version = execSync('ng --version', { encoding: 'utf-8' });
        console.log('Versione corrente di Angular CLI:\n', version);
    } catch (error) {
        console.error('Non è stato possibile ottenere la versione corrente di Angular CLI. Assicurati che Angular CLI sia installato e accessibile.');
        console.error(error.message);
        process.exit(1);
    }
}

// Funzione per chiedere all'utente quale versione aggiornare
function askForVersion(callback) {
    console.log('Seleziona la versione di Angular a cui aggiornare (14-17):');
    console.log('1. Angular 14');
    console.log('2. Angular 15');
    console.log('3. Angular 16');
    console.log('4. Angular 17');
    rl.question('Inserisci il numero corrispondente alla versione: ', (answer) => {
        let version;
        switch (answer.trim()) {
            case '1':
                version = '14';
                break;
            case '2':
                version = '15';
                break;
            case '3':
                version = '16';
                break;
            case '4':
                version = '17';
                break;
            default:
                console.log('Scelta non valida.');
                rl.close();
                process.exit(1);
        }
        callback(version);
    });
}

// Funzione per aggiornare Angular versione per versione
function updateAngular(version) {
    const versions = ['14', '15', '16', '17'];
    const currentVersionIndex = versions.indexOf(version);
    
    if (currentVersionIndex === -1) {
        console.log('Versione non trovata.');
        rl.close();
        process.exit(1);
    }

    for (let i = 0; i <= currentVersionIndex; i++) {
        const ver = versions[i];
        console.log(`Aggiornamento a Angular ${ver}...`);
        execCommand(`npm install -g @angular/cli@${ver}`);
        execCommand(`ng update @angular/cli@${ver} @angular/core@${ver}`);
    }

    console.log('Aggiornamento completato.');
    rl.close();
}

// Esegui lo script
checkCurrentVersion();
askForVersion(updateAngular);
