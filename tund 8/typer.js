function restartGame(){
    $('#submitName').click(startGame);
    $(document).keypress((e)=>startGamewithEnter(e.keyCode));
}

restartGame();


function startGamewithEnter(keypressed){
    console.log('startGamewithEnter', keypressed)
    if(keypressed == 13){
        $(document).off('keypress');
        startGame();
    }
}

const letters = (() => {
    const caps = [...Array(26)].map((val, i) => String.fromCharCode(i + 65));
    return caps.map(letter => letter.toLowerCase());
  })();

  console.log(letters);

function startGame(){
    $('#submitName').off('click');
    let name = $('#name').val();
    let level = parseFloat($('#level').val());
    let startingLength = parseFloat($('#startingLength').val());
    $('#nameContainer').hide();
    let typer = new Typer(name, level, startingLength); //Käivitab rakenduse. 
}


class Typer{
    constructor(name, level, startingLength){
        this.name = name; //mängija nimi, mille võtame alguses promptiga sisse
        this.wordsInGame = level; //mitu sõna on mängus
        this.startingWordLength = startingLength; //kui pikk on esimene sõna, millega mängu alustame
        this.wordsTyped = 0; //mitu sõna on trükitud
        this.words = []; //kõik sõnad
        this.typeWords = []; //Ühel mängkorral trükkimist vajavad sõnad
        this.word = "sõna"; //sõna, mis on vaja trükkida
        this.startTime = 0; //mängu alguseaeg
        this.endTime = 0; //mängu lõpuaeg
        this.results = JSON.parse(localStorage.getItem("score")) || []; //tulemused localStorage'ist või tühi massiiv. 

        this.init();
    }

    init(){
        $.get("lemmad2013.txt", (data)=>this.getWords(data)); //Laeme failist sõnad sisse ja saadame getWords meetodisse ning annan kaasa failist saadud andmed (data).
        $('#show-results').on('click', ()=>this.showResults()); //paneme divile id-ga "show-results" külge klikkimise kuulamise. Kui sinna peale klikitakse, siis paneme käima meetodis showResults.
    }

    showResults(){
        $('#results').fadeToggle(); //show-results klikkimise peale kuvame või peidame div'i id-ga "results"
        $('#results').html(""); //teeme div'i id-ga "results" tühjaks. 

        //Käin for-tsükliga läbi 15 esimest tulemust ja panene (appendin) need div'i "results" sisse.
        for(let i = 0; i<15; i++){
            $('#results').append((i+1)+ ". " + this.results[i].name +" "+ this.results[i].time + "<br>");
        }
    }

    getWords(data){
        //võan vastu failist saadud andmed ja panen teen splitiga reavahetuse kohalt data osadeks - osada paigutatakse massiivi. 
        const dataFromFile = data.split('\n');
        console.log(dataFromFile);
        this.separteWordsByLength(dataFromFile); //Saadan andmed separteWordsByLength meetodisse, et jagada sõnad pikkuse järgi massiividesse.
    }

    separteWordsByLength(data){
        //for-tsükkel kus luuakse iga sõna pikkuse kohta eraldi massiiv ning paigutatakse vastava pikkusega sõnad sinna massiivi sisse. 
        for(let i = 0; i < data.length; i++){
            const wordLength = data[i].length;
            if(this.words[wordLength] === undefined){
                this.words[wordLength] = [];
            }

            this.words[wordLength].push(data[i]);
        }
        console.log(this.words);
        this.startTyper(); //alustan mäng loogikaga.
    }

    startTyper(){
        this.generateWords(); //panen tööle generateWords meetodi, et valida sõnad, mida mängija peab trükkima hakkama.
        this.startTime = performance.now(); //määran ära mängu alguse aja. 
        $(document).on('keypress', (e)=>this.shortenWord(e.key)); //panen lehe külge nupule vajutuste kuulamise, et selle peale panna tööle shortenWord meetod. Võtan evendist kaasa nupu, mida vajutati. 
    }

    shortenWord(keypressed){
        if(this.word.length > 1 && this.word.charAt(0) == keypressed){
            //Kui sõna pikkus on suurem kui 1 tähemärk ja nupp, mida vajutati on õige siis teen seda.
            this.word = this.word.slice(1); //Võtame sõnalt esimese tähe ära
            this.drawWord(this.word); //kuvame sõna uuesti ilma esimese täheta
        } else if(this.word.length == 1 && this.word.charAt(0) == keypressed && this.wordsTyped != this.wordsInGame-1){
            //Kui sõna pikkus on suurem kui 1 tähemärk ja nupp, mida vajutati on õige ja sõna ei ole viimane mängus, siis teen seda
            this.wordsTyped++; //suurendame trükitud sõnade hulka
            this.selectWord(); //Võtame järgmise sõna.
        } else if(this.word.length == 1 && this.word.charAt(0) == keypressed && this.wordsTyped == this.wordsInGame-1){
            //Kui sõna pikkus on suurem kui 1 tähemärk ja nupp, mida vajutati on õige ja sõna ei ole viimane mängus, siis teen seda
            console.log("viimane sõna");
            this.endTime = performance.now(); //määrame mängu lõpuaja.
            $('#score').html(this.name + " sinu aeg oli " + ((this.endTime - this.startTime)/1000)); //Kuvame mängijale palju kulus aega trükkimiseks sekundites. 
            this.wordsTyped++; //suurendame trükitud sõnade väärust, et see oleks võrdne sõnadega mängus. 
            this.showInfo(); //Kuvan info uuesti
            this.saveResult(); //salvestan tulemused
            $('#wordDiv').html("Vajuta enterit, et uuesti alustada"); //kuvan teate, et enter peale saab uuesti mängu alustada.
            $(document).off('keypress'); // Võtan maha kuulaja, et nupulevajutuste peale pannakse tööle "shortenWord" meetod. 
            $(document).on('keypress', (e)=>this.startNewGame(e.key)); //panen uue kuulaja, et saaks alustada uut mängu. 
        } else if (this.word.charAt(0) != keypressed){
            $('#container').addClass('error');
            setTimeout(function(){
                $('#container').removeClass('error');
            }, 100);
            this.word = this.word + letters[Math.floor(Math.random()*letters.length)];
            this.drawWord(this.word);

           /* $('#container').css('background-color', 'red');
            setTimeout(function(){
                $('#container').css('background-color', 'white');
            }, 100);*/
        }

    }

    saveResult(){
        //Teenu tulemusest objekti, kuhu salvetan mängijanime ja aja.
        let result = {
            name: this.name,
            time: ((this.endTime - this.startTime)/1000)
        }

        this.results.push(result); //panen tulemuse massiivi
        this.results.sort((a, b) => parseFloat(a.time) - parseFloat(b.time)); //sorteerin massiivi aja järgi - kõige kiirem aeg enne. 
        localStorage.setItem("score", JSON.stringify(this.results)); //salvestan tulemused localStorage'isse. 
    }

    startNewGame(keypressed){
        //Kui vajutati nuppu "Enter", siis alustan uut mängu
        if(keypressed == "Enter"){
            this.wordsTyped = 0;
            $(document).off('keypress');
            $('#show-results').off('click');
            $('#score').html("");
            $('#nameContainer').show();
            restartGame();
        }
    }

    generateWords(){
        //Valin for-tsükliga randomilt nii palju sõnasid, kui alguses defineerisime, et neid mängus on. Iga sõna on järgmisest pikem ühe võrra pikem. 
        for(let i = 0; i < this.wordsInGame; i++){
            const wordLength = this.startingWordLength + i;
            const randomWord = Math.round(Math.random()*this.words[wordLength].length);
            this.typeWords[i] = this.words[wordLength][randomWord];
        }

        console.log(this.typeWords);
        this.selectWord(); //Valin esimese sõna
    }

    selectWord(){
        this.showInfo(); //Uundan infot selle kohta, et üks sõna sai veel trükitud.
        this.word = this.typeWords[this.wordsTyped]; //Valin massiivist järgmise sõna. 
        this.drawWord(this.word); //Panene tööle drawWord meetodi, et kuvataks uut sõna. 
    }

    drawWord(word){
        $('#wordDiv').html(word); //Kuvan sõna
    }

    showInfo(){
        $('#info').html(this.wordsTyped+"/"+this.wordsInGame); //kuvan vasakul üleval nurgas infona mitu sõna mitmest on trükitud. 
    }
}