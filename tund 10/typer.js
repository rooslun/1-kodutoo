$('.menu-item').click(function(){
    $('.menu-item').removeClass('active');
    //console.log($(this));
    $(this).addClass('active');
    $('.menu').toggleClass('menu-active');
    selectContent();
});

$('.mobile-nav').click(function(){
    $(this).toggleClass('active');
    $('.menu').toggleClass('menu-active');
});

function selectContent(){
    if($('[data-menu-game]').hasClass('active')){
        console.log('game menu active');
    } else if($('[data-menu-results]').hasClass('active')){

    }else if($('[data-menu-tutorial]').hasClass('active')){

    }else if($('[data-menu-setting]').hasClass('active')){

    }
}



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
    let typer = new Typer(name, level, startingLength); //KÃ¤ivitab rakenduse. 
}


class Typer{
    constructor(name, level, startingLength){
        this.name = name; //mÃ¤ngija nimi, mille vÃµtame alguses promptiga sisse
        this.wordsInGame = level; //mitu sÃµna on mÃ¤ngus
        this.startingWordLength = startingLength; //kui pikk on esimene sÃµna, millega mÃ¤ngu alustame
        this.wordsTyped = 0; //mitu sÃµna on trÃ¼kitud
        this.words = []; //kÃµik sÃµnad
        this.typeWords = []; //Ãœhel mÃ¤ngkorral trÃ¼kkimist vajavad sÃµnad
        this.word = "sÃµna"; //sÃµna, mis on vaja trÃ¼kkida
        this.startTime = 0; //mÃ¤ngu alguseaeg
        this.endTime = 0; //mÃ¤ngu lÃµpuaeg
        this.results = [];
        this.loadFromFile();
         //tulemused localStorage'ist vÃµi tÃ¼hi massiiv. 

        
    }

    loadFromFile(){
        $.get('database.txt', function(data){
                let content = JSON.parse(data).content;
                console.log(content);
                localStorage.setItem("score", JSON.stringify(content));
            }).done(
                this.init()
        );
    }

    init(){
        $.get("lemmad2013.txt", (data)=>this.getWords(data)); //Laeme failist sÃµnad sisse ja saadame getWords meetodisse ning annan kaasa failist saadud andmed (data).
        $('#show-results').on('click', ()=>this.showResults()); //paneme divile id-ga "show-results" kÃ¼lge klikkimise kuulamise. Kui sinna peale klikitakse, siis paneme kÃ¤ima meetodis showResults.
        this.results = JSON.parse(localStorage.getItem("score"));
    }

    showResults(){
        $('#results').fadeToggle(); //show-results klikkimise peale kuvame vÃµi peidame div'i id-ga "results"
        $('#results').html(""); //teeme div'i id-ga "results" tÃ¼hjaks. 
        if($('#show-results').html() == "TOP 15"){
            $('#show-results').html("X");
        } else {
            $('#show-results').html("TOP 15");
        }
        

        //KÃ¤in for-tsÃ¼kliga lÃ¤bi 15 esimest tulemust ja panene (appendin) need div'i "results" sisse.
        for(let i = 0; i<this.results.length; i++){
            $('#results').append((i+1)+ ". " + this.results[i].name +" "+ this.results[i].time + "<br>");
        }
    }

    getWords(data){
        //vÃµan vastu failist saadud andmed ja panen teen splitiga reavahetuse kohalt data osadeks - osada paigutatakse massiivi. 
        const dataFromFile = data.split('\n');
        console.log(dataFromFile);
        this.separteWordsByLength(dataFromFile); //Saadan andmed separteWordsByLength meetodisse, et jagada sÃµnad pikkuse jÃ¤rgi massiividesse.
    }

    separteWordsByLength(data){
        //for-tsÃ¼kkel kus luuakse iga sÃµna pikkuse kohta eraldi massiiv ning paigutatakse vastava pikkusega sÃµnad sinna massiivi sisse. 
        for(let i = 0; i < data.length; i++){
            const wordLength = data[i].length;
            if(this.words[wordLength] === undefined){
                this.words[wordLength] = [];
            }

            this.words[wordLength].push(data[i]);
        }
        console.log(this.words);
        this.startTyper(); //alustan mÃ¤ng loogikaga.
    }

    startTyper(){
        this.generateWords(); //panen tÃ¶Ã¶le generateWords meetodi, et valida sÃµnad, mida mÃ¤ngija peab trÃ¼kkima hakkama.
        this.startTime = performance.now(); //mÃ¤Ã¤ran Ã¤ra mÃ¤ngu alguse aja. 
        $(document).on('keypress', (e)=>this.shortenWord(e.key)); //panen lehe kÃ¼lge nupule vajutuste kuulamise, et selle peale panna tÃ¶Ã¶le shortenWord meetod. VÃµtan evendist kaasa nupu, mida vajutati. 
    }

    shortenWord(keypressed){
        if(this.word.length > 1 && this.word.charAt(0) == keypressed){
            //Kui sÃµna pikkus on suurem kui 1 tÃ¤hemÃ¤rk ja nupp, mida vajutati on Ãµige siis teen seda.
            this.word = this.word.slice(1); //VÃµtame sÃµnalt esimese tÃ¤he Ã¤ra
            this.drawWord(this.word); //kuvame sÃµna uuesti ilma esimese tÃ¤heta
        } else if(this.word.length == 1 && this.word.charAt(0) == keypressed && this.wordsTyped != this.wordsInGame-1){
            //Kui sÃµna pikkus on suurem kui 1 tÃ¤hemÃ¤rk ja nupp, mida vajutati on Ãµige ja sÃµna ei ole viimane mÃ¤ngus, siis teen seda
            this.wordsTyped++; //suurendame trÃ¼kitud sÃµnade hulka
            this.selectWord(); //VÃµtame jÃ¤rgmise sÃµna.
        } else if(this.word.length == 1 && this.word.charAt(0) == keypressed && this.wordsTyped == this.wordsInGame-1){
            //Kui sÃµna pikkus on suurem kui 1 tÃ¤hemÃ¤rk ja nupp, mida vajutati on Ãµige ja sÃµna ei ole viimane mÃ¤ngus, siis teen seda
            console.log("viimane sÃµna");
            this.endTime = performance.now(); //mÃ¤Ã¤rame mÃ¤ngu lÃµpuaja.
            $('#score').html(this.name + " sinu aeg oli " + ((this.endTime - this.startTime)/1000)); //Kuvame mÃ¤ngijale palju kulus aega trÃ¼kkimiseks sekundites. 
            this.wordsTyped++; //suurendame trÃ¼kitud sÃµnade vÃ¤Ã¤rust, et see oleks vÃµrdne sÃµnadega mÃ¤ngus. 
            this.showInfo(); //Kuvan info uuesti
            this.saveResult(); //salvestan tulemused
            $('#wordDiv').html("Vajuta enterit, et uuesti alustada"); //kuvan teate, et enter peale saab uuesti mÃ¤ngu alustada.
            $(document).off('keypress'); // VÃµtan maha kuulaja, et nupulevajutuste peale pannakse tÃ¶Ã¶le "shortenWord" meetod. 
            $(document).on('keypress', (e)=>this.startNewGame(e.key)); //panen uue kuulaja, et saaks alustada uut mÃ¤ngu. 
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
        //Teenu tulemusest objekti, kuhu salvetan mÃ¤ngijanime ja aja.
        let result = {
            name: this.name,
            time: ((this.endTime - this.startTime)/1000)
        }
        console.log("siin ei tohiks olla tÃ¼hi: " + this.results);
        this.results.push(result); //panen tulemuse massiivi
        console.log( " 1 tulemus juures " + this.results);
        this.results.sort((a, b) => parseFloat(a.time) - parseFloat(b.time)); //sorteerin massiivi aja jÃ¤rgi - kÃµige kiirem aeg enne. 
        localStorage.setItem("score", JSON.stringify(this.results)); //salvestan tulemused localStorage'isse. 

        $.post('server.php', {save: this.results}).done(function(){
            console.log('Success');
        }).fail(function(){
            alert('FAIL');
        }).always(function(){
            console.log('Tegime midagi AJAXiga');
        });
    }

    startNewGame(keypressed){
        //Kui vajutati nuppu "Enter", siis alustan uut mÃ¤ngu
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
        //Valin for-tsÃ¼kliga randomilt nii palju sÃµnasid, kui alguses defineerisime, et neid mÃ¤ngus on. Iga sÃµna on jÃ¤rgmisest pikem Ã¼he vÃµrra pikem. 
        for(let i = 0; i < this.wordsInGame; i++){
            const wordLength = this.startingWordLength + i;
            const randomWord = Math.round(Math.random()*this.words[wordLength].length);
            this.typeWords[i] = this.words[wordLength][randomWord];
        }

        console.log(this.typeWords);
        this.selectWord(); //Valin esimese sÃµna
    }

    selectWord(){
        this.showInfo(); //Uundan infot selle kohta, et Ã¼ks sÃµna sai veel trÃ¼kitud.
        this.word = this.typeWords[this.wordsTyped]; //Valin massiivist jÃ¤rgmise sÃµna. 
        this.drawWord(this.word); //Panene tÃ¶Ã¶le drawWord meetodi, et kuvataks uut sÃµna. 
    }

    drawWord(word){
        $('#wordDiv').html(word); //Kuvan sÃµna
    }

    showInfo(){
        $('#info').html(this.wordsTyped+"/"+this.wordsInGame); //kuvan vasakul Ã¼leval nurgas infona mitu sÃµna mitmest on trÃ¼kitud. 
    }
}