$(()=>{
    // const headline = $('h1');
    // headline.remove();
    // console.log(headline);
    
    const main = $('#main');
    const pl2 = $('.pl-2');
    //console.log(main, pl2);

    let myShinyNewDiv = $('<div class="w-full md:w-1/2 xl:w-1/3 p-6">');
    myShinyNewDiv.html('<div class="bg-gradient-to-b from-green-200 to-green-100 border-b-4 border-green-600 rounded-lg shadow-xl p-5"><ul><li>item</li><li class="secret">item</li><li>item</li></ul>');
    $('#content').append(myShinyNewDiv);

    $('#content ul li').each((index, liElement) => {
        $(liElement).append(`<span> number ${index}</span>`);
    });

    $('#content ul li').on('click', function() {
        $(this).addClass('uppercase')
        .find('span')
        .attr('title', 'hoovering list item');
    });

    const listItems = $('#content ul li');
    const secretListItem = $(listItems).filter('.secret');
    const notSecretListItems = $(listItems).not('.secret');
    const firstListItem = $(listItems).first();
    const nextListItem = $(firstListItem).next();
    const prevListItem = $(nextListItem).prev();
    

    const listChildren = $('#content ul li').children();
    const listChildrenParent = $(listChildren).parent();
    console.log(listChildrenParent);

    $(document).on('click', function(event) {
        $(event.target).closest('li').addClass('uppercase');
    });

    $('#main').on('mouseenter', function(){
        $(this).css('color', 'red');
    });

    $('#main').on('mouseleave', function(){
        $(this).css('color', 'blue');
    });

    const chuckText = $('#chuckdiv p');
    const chuckButton = $('#chuckbutton');

    chuckButton.on('click', function(){
        $.ajax({
            url: 'https://api.chucknorris.io/jokes/random',
            contentType: 'application/json',
            error: function(err) {
                console.log('something went horribly wrong', err);
            },
            success: function(result){
                chuckText.text(result.value);
            }
        });
    });
    


    /*
    uppgift
    lägg in en knapp i HTML-filen som ni sedan selectar med jQuery
    lägg in en eventhandler på knappen som kör en ajaxförfrågan till api:et och skriver ut svaret från result.value i ett annat html-element
    */

    // $.widget('chas.testwidget', {
    //     options: {
    //         someValue: 0
    //     },
    //     _create:function() {
    //         const someValue = `testing options: ${this.options.someValue}`
    //         this.element
    //         .addClass('testwidget')
    //         .find('p')
    //         .text(someValue);
    //     }
    // });
    // console.log($.chas);
    
    // $('#chuckdiv').testwidget();
    
   $.widget('chas.progressbar', {
        options: {
            value: 0
        },

        _create: function() {
            this.element.addClass('progressbar');
            this._update();
        },

        _setOption: function(key, value) {
            this.options[key] = value;
            this._update();
        },

        _update: function() {
            const progress = `${this.options.value} %`;
            this.element.text(progress);
            if (this.options.value === 100) {
                this._trigger("complete", null, {value:100});
            }
        },

        value: function(value) {
            if (value === undefined) {
                return this.options.value;
            } else {
                this.options.value = this._constrain(value);
                this._update();
            }
        },

        _constrain: function(value) {
            if (value > 100) {
                value = 100;
            }
            if (value < 0) {
                value = 0;
            }
            return value;
        },

        _destroy: function() {
            this.element
            .removeClass('progressbar')
            .text('');
        }
   }); 

   const bar = $('#chuckdiv p').progressbar({value:20});

   bar.progressbar('value', 50);

   bar.progressbar({
    complete: function(event, data) {
        alert("callback");
    }
   });

   bar.progressbar('value', 100);
});