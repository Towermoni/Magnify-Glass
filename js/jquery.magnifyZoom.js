;(function($, window, undefined) {
    
    $.MagnifyZoom = function(options, magnifyDiv) {
        
        this.$imageContainer = $(magnifyDiv);
        
        this._init(options);
        
    }
    
    $.MagnifyZoom.defaults = 
    {
        
        width : 300,
        height : 300,
        cornerRounding : '50%'
        
    };
    
    $.MagnifyZoom.prototype = {
        
        
        _init : function(options) {
            
        var imageObject = new Image();    
            
        imageObject.src = $('.small').attr('src');    
            
        this.options = $.extend($.MagnifyZoom.defaults, options);
            
        this.nativeWidth = imageObject.width;
            
        this.nativeHeight = imageObject.height;
            
        $glass = $('.large');
            
        $smallImage = $('.small');
            
        this._getLocation();
            
        },
        
        _getLocation :
        function(e) {
            
        var self = this;
          self.$imageContainer.mousemove(function(e) {
             
             $target = $(this);
             
              var magnifyOffset = $target.offset();
              
               self.mouseX = e.pageX - magnifyOffset.left;
               self.mouseY = e.pageY - magnifyOffset.top;
              
              self._zoom($target);
              
         })   
        
    },
        
        _zoom : function($target) {
       
            
            if (this.mouseX > 0 && this.mouseX < $target.width() && this.mouseY > 0 && this.mouseY < $target.height()) {
                $glass.fadeIn(100);
            } else {
               $glass.fadeOut(100); 
            }
                        
            if ($glass.is(":visible")) {
                var glassWidth = $glass.width(),
                glassHeight = $glass.height(),
                halfGlassWidth = glassWidth / 2,
                halfGlassHeight = glassHeight / 2;
                
                var rx = Math.round(this.mouseX / $smallImage.width() * this.nativeWidth - halfGlassWidth) * -1,
                ry = Math.round(this.mouseY / $smallImage.height() * this.nativeHeight - halfGlassHeight) * -1;
                   
                 var posX = this.mouseX - halfGlassWidth,
                posY = this.mouseY - halfGlassHeight;

                $glass.css({width: this.options.width, height: this.options.height, borderRadius: this.options.cornerRounding, top: posY, left: posX, backgroundPosition: rx + 'px ' + ry + "px"});
            }
            
        }
        
    };
    
      $.fn.MagnifyZoom = function (options) {
    
    if (typeof options === 'string') {
        
        
        
    } else {
        this.each(function() {
           var instance = $.data(this, 'MagnifyZoom');
            
            if (instance) {
                
                instance._init();
                
            } else {
                instance = $.data(this, 'MagnifyZoom', new $.MagnifyZoom(options, this));
            }
            
            
        });
    }
    
    return this
    
}
    
    
})(jQuery, window);