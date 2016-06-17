(function ($) {
    $.jqPage= function (el,arr,start) {
        if(!(this instanceof $.jqPage)){
            return new $.jqPage(el,arr,start);
        }

        var self = this;

        self.$container = $(el);

        var options ={
            'i' : 0,
            'j' : 1,
            'content' : ''
        };
        self.init = function () {
            self.getPages();
            $('.page').first().addClass('active');
            self.setStatus();
            self.bindEvents();
        };

        self.setStatus = function () {
            var start = $('.page').first().data('num');
            var end = $('.page').last().data('num');
            var count = 0;
            var count1 = 0;
            var length = arr.length;
            if (start === 0) {
                $('.prev',self.$container).addClass('disabled');
                $('.first',self.$container).addClass('disabled');
            }
            if (end === length) {
                $('.next',self.$container).addClass('disabled');
                $('.last',self.$container).addClass('disabled');
            }

            //判断是否能往前翻页
            for (var i = start - 1; i >= 0; i--) {
                if (arr[i] === 1) {
                    $('.prev',self.$container).removeClass('disabled');
                    count++;
                }
                if (count >= 5) break;
            }
            if (count >= 5) { 
                $('.first',self.$container).removeClass('disabled');
            }else if (count == 0) {
                $('.prev',self.$container).addClass('disabled');
                $('.first',self.$container).addClass('disabled');
            }else{
                $('.prev',self.$container).removeClass('disabled');
                $('.first',self.$container).addClass('disabled');
            }

            //判断是否能往后翻页
            for (var i = end + 1 ; i < length; i++) {
                if (arr[i] === 1) {
                    $('.next',self.$container).removeClass('disabled');
                    count1++;
                }
                if (count1 >= 5) break;
            }
            if (count1 >= 5) { 
                $('.last',self.$container).removeClass('disabled');
            }else if (count1 == 0) {
                $('.next',self.$container).addClass('disabled');
                $('.last',self.$container).addClass('disabled');
            }else{
                $('.next',self.$container).removeClass('disabled');
                $('.last',self.$container).addClass('disabled');
            }
        }

        self.getPages = function(type,i){
            var length = arr.length;
            var content = '';
            var count = 0;
            if (typeof i == 'undefined') {
                i = options.i;
            }
            if (typeof start != 'undefined') {
                for (var j = start ; j < arr.length; j++) {
                    if(arr[j] == 1){
                        count++;
                        content += '<li class="page" data-num='+j+'><span>'+(j * 5 + 1)+'-'+(j + 1) * 5+'</span></li>';
                    }
                    if (count>=5) {break;}
                }
                $('.prev').after(content);
                start = undefined;
            }else{
                for (var j = 0; j < length; j++) {
                    if (arr[j] == 1)  count++;
                    if (count >= 5) break;
                }
                if (count >= 5) {
                    if (type == 'first') {
                        $('.page').remove();
                        for ( i; i >= 0; i--) {
                            var num = i;
                            if (arr[i] == 1) {
                                var temp = '<li class="page" data-num='+num+'><span>'+(num * 5 + 1)+'-'+(num + 1) * 5+'</span></li>';
                                content = temp + content;
                                options.j++;
                            }
                            if (options.j >= 6) {
                                $('.prev').after(content);
                                options.j = 1;
                                break;
                            }
                        }
                    }else{
                        for ( i ; i < length; i++) {
                            var num = i;
                            $('.page').remove();
                            if (arr[i] == 1) {
                                content += '<li class="page" data-num='+i+'><span>'+(num * 5 + 1)+'-'+(num + 1) * 5+'</span></li>';
                                options.j++;
                            }
                            if (options.j >= 6) {
                                $('.prev').after(content);
                                options.j = 1;
                                break;
                            }
                        }
                    }
                }else{
                    for (var j = 0 ; j < length; j++) {
                        var num = j;
                        $('.page').remove();
                        if (pages[j] == 1) {
                            content += '<li class="page" data-num='+j+'><span>'+(num * 5 + 1)+'-'+(num + 1) * 5+'</span></li>';
                            options.j++;
                        }
                        $('.prev').after(content);
                    }
                }
            }
        }

        self.switchChange = function(type){
            var num = 0;
            var length = arr.length;
            if (type == 'next') {
                num = $('.page').last().data('num');
                for ( num = num + 1 ; num < length; num++) {
                    if (arr[num] == 1) {
                        options.content = '<li class="page" data-num='+num+'><span>'+(num * 5 + 1)+'-'+(num + 1) * 5+'</span></li>'
                        $('.next').before(options.content);
                        $('.page').first().remove();
                        break;
                    }
                    
                }

            }
            if (type == 'prev') {
               
                num = $('.page').first().data('num');
                // var content = '';
                for (num= num - 1 ; num >= 0; num --) {
                    if (arr[num] == 1) {
                        var content = '<li class="page"data-num='+num+'><span>'+(num * 5 + 1)+'-'+(num + 1) * 5+'</span></li>'
                        $('.prev').after(content);
                        var len = $('.pagination .page').length;
                        if (len > 5) {
                            $('.page').last().remove();
                        }
                        break;
                    }

                }
            }
                
            if (type == 'last') {
                num = $('.page').last().data('num');
                var count = 0;
                for (var i = num + 1; i < length; i++) {
                    if (arr[i] == 1) { 
                        count++; 
                        if (count >= 5) {
                            break;
                        }
                    }
                }
                if (count >= 5) {
                    self.getPages('last',num + 1);
                }
                
            }
            if (type == 'first') {
                num = $('.page').first().data('num');
                var count = 0;
                for (var i = num - 1; i >= 0; i--) {
                    if (arr[i] == 1) {
                        count++;
                        if (count >= 5) { break; }
                    }
                }
                if (count >= 5) {
                    self.getPages('first',num - 1);
                }
            }
            self.setStatus();
            self.bindEvents();
        }

        self.bindEvents = function(){
            $('.page, .next, .prev, .last, .first').off();
            $('.page').on('click',function () {
                if ($(this).hasClass('disabled') || $(this).hasClass('active')) {
                    return;
                }
                $(this).addClass('active');
                $(this).siblings('li').removeClass('active');
            })
            $('.next').on('click',function(){
                if ($(this).hasClass('disabled')) {
                    return;
                }
                self.switchChange('next');
            });
            $('.prev').on('click',function(){
                if ($(this).hasClass('disabled')) {
                    return;
                }
                self.switchChange('prev');
            });
            $('.last').on('click',function(){
                if ($(this).hasClass('disabled')) {
                    return;
                }
                self.switchChange('last');
            });
            $('.first').on('click',function(){
                if ($(this).hasClass('disabled')) {
                    return;
                }
                self.switchChange('first');
            });
        }
        self.init();
        return self.$container;
        $.fn.jqPage = function(){
            return new $.jqPage(this,arr,start);
        }

    }    

})(jQuery);