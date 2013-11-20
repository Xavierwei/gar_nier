/*
 * HTML5的拖拽上传组件
 *
 */
!!(function( $ ){
    if (!window.FileReader && !$.browser.safari) return;
        var isImage = function(type) { // 判断是否图片
            switch (type) {
                case 'image/jpeg':
                case 'image/png':
                case 'image/gif':
                case 'image/bmp':
                case 'image/jpg':
                    return true;
                default:
                    return false;
            }
        },
        config = {
            url     : ''
            , multi : false
            , name  : 'file'
            , filesize  : 5 // unit M
            , 'break'   : false // 是否不需要连续处理上传，如果是multi=true 并且break=true，则需要通过continue来继续处理上传过程
            , fileType  : 1 // 取值 [0,1] 0是不限，1是图片
            , autoUpload    : true
            // event
            , onDragStart   : null
            , onDragOver    : null 
            , onDrop        : null 
            , onDragLeave   : null 
            , onFileTypeError: null 
            , onFileSizeError: null 
            , onUploading   : null 
            , onComplete    : null 
        },
        DragUpload = function( $dom , cfg ){
            this.config = $.extend( config , cfg || {} );
            this.$dom = $dom;
            var t = this , o = t.config;
            var isOver = false;
            $dom.bind('dragover', function(ev){
                if( isOver ) return false;
                isOver = true;
                o.onDragOver && o.onDragOver.call( $dom , ev );
                return false;
            }).bind('drop' , function(ev){
                isOver = false;
                o.onDrop && o.onDrop.call( $dom , ev , ev.originalEvent.dataTransfer.files );
                if( o.autoUpload ){
                    t.files = Array.prototype.slice.call(ev.originalEvent.dataTransfer.files);
                    t.uploads(t.files);
                }
                return false;
            }).bind('dragleave' , function(ev){
                isOver = false;
                o.onDragLeave && o.onDragLeave.call( $dom , ev );
                return false;
            });

            var isDragStart = false;
            $(document.body).bind('drop' , function(ev){
                isDragStart = false;
                return false;
            })
            .bind('dragover' , function( ev ){
                if( !isDragStart ){
                    o.onDragStart.call( $dom , ev );
                    isDragStart = true;
                }
                return false;
            });
        };
    DragUpload.prototype = {
        uploads: function(files){
            var t = this , o = t.config;
            if(!o.multi || o['break'])
                files = [files[0]];
            for (var i = 0, f; f = files[i]; i++) {
                var type = f.type ? f.type : 'n/a',
                    fSize = f.fileSize || f.size,
                    isImg = isImage(type),
                    img;
                switch(o.fileType){
                    case 1:// 处理得到的图片
                        if (!isImg) {
                            if( o.onFileTypeError 
                                && o.onFileTypeError.call( this.$dom , f.fileName || f.name , '只能上传图片文件！' ) === false ) return;
                            continue;
                        }
                    case 0:
                }
                if( o.filesize && fSize > o.filesize * 1024 * 1024 ){
                    if( o.onFileSizeError 
                                && o.onFileSizeError.call( this.$dom , f.fileName || f.name , '上传图片超过' + ( o.filesize ) + 'M' ) === false ) return;
                    continue;
                }
                if(window.FileReader){
                    var reader = new FileReader();
                    reader.onload = (function (theFile) {
                        return function (e) {
                            t.upload(theFile);
                        };
                    })(f)
                    reader.readAsDataURL(f);
                }else{
                    t.upload(f);
                }
            }
        },
        'continue': function(){
            var t = this;
            t.files.shift();
            if(!t.files.length) return;
            t.uploads(t.files);
        },
        upload: function( file ){
            var t = this,
                o = this.config,
                guid = $.guid++,
                xhr = new XMLHttpRequest();
            // loading
            if( o.onUploading && o.onUploading.call( this.$dom , file.fileName || file.name , guid ) === false )
                return;
            xhr.open("post", o.url, true);
            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            xhr.upload.addEventListener("progress", function(e){
                
            }, false);
            xhr.addEventListener('readystatechange' ,  function(e) {
                if (xhr.readyState == 4) {  // If the request is finished
                    if (xhr.status == 200)  // If it was successful
                        var result = $.parseJSON( xhr.responseText );
                        o.onComplete && o.onComplete.call( this.$dom , file.fileName || file.name , result , guid );
                }
            }, false);

            var fd = new FormData();
            fd.append(o.name, file);
            xhr.send(fd);
        }
    }

    $.fn.dragUpload = function( cfg ){
        new DragUpload( this , cfg );
        return this;
    }
})( jQuery );