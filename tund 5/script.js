$(document).ready(function(){
    $('img').css({'width':'20vw'});

    let firstPic = $('img.active').attr('src');
    let counter = 0;

    $('.big-image').html('<img src="'+ firstPic +'">');
    $('.big-image img').css({'width':'90vw'});

    $('#hide').click(hidePic);
    $('#next').click(picForward);
    $('#prev').click(picBackward);
    $(document).keydown(buttonPress);
    //$('#hide').click(changeButton);

    /*function changeButton(){
        if( counter % 2){
            $('#hide').html('Peida');
            counter = counter + 1;
            $('.big-image-container').fadeIn(1000);
        } else {
            $('#hide').html('Näita');
            counter = counter + 1;
        }
    }*/

    $('#picContainer img').click(function(){
        let currentPic = $('img.active');
        let selectedPic = $(this);

        selectedPic.addClass('active');
        currentPic.removeClass('active');

        $('.big-image').html('<img src="'+ selectedPic.attr('src') + '">').hide().slideDown(2000);
        $('.big-image img').css({'width':'90vw'});
    });

    function buttonPress(){
        console.log(event.keyCode);
        if(event.keyCode == 37){
            picBackward();
        }
        if(event.keyCode == 39){
            picForward();
        }
        if(event.keyCode == 72){
            hidePic();
        }
    }

    function picBackward(){
        let currentPic = $('img.active');
        let selectedPic = currentPic.prev();
        if(selectedPic.length == 0){
            selectedPic = $('#picContainer img').siblings().last();
        }
        selectedPic.addClass('active');
        currentPic.removeClass('active');

        $('.big-image').html('<img src="'+ selectedPic.attr('src') + '">').hide().fadeIn(2000);
        $('.big-image img').css({'width':'90vw'});
    }

    function picForward(){
        let currentPic = $('img.active');
        let selectedPic = currentPic.next();
        if(selectedPic.length == 0){
            selectedPic = $('#picContainer img').siblings().first();
        }
        selectedPic.addClass('active');
        currentPic.removeClass('active');

        $('.big-image').html('<img src="'+ selectedPic.attr('src') + '">').hide().slideDown(2000);
        $('.big-image img').css({'width':'90vw'});
    }

    function hidePic(){
        //$('.big-image-container').hide();
        //$('.big-image-container').toggle();
        //$('.big-image-container').fadeToggle(2000);
        //$('.big-image-container').slideToggle(2000);
        //$('.big-image-container').slideUp().slideDown(2000);

        $('.big-image-container').fadeOut(1000);

        if($('#hide').html() == "Peida"){
            $('#hide').html('Näita');
        } else {
            $('#hide').html('Peida');
            $('.big-image-container').fadeIn(1000);
        }
    }
});