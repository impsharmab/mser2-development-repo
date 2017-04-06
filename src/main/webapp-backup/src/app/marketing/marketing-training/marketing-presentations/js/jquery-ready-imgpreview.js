$(document).ready(function(){
    $('a.imgpreview').imgPreview({
        containerID: 'imgPreviewWithStyles',
        preloadImages: true,
        imgCSS: {
            width:300
        },
        // When container is shown:
        onShow: function(link){
            $('<div class="imgTitle">' + $(link).attr('title') + '</div>').appendTo(this);
        },
        // When container hides:
        onHide: function(link){
            $('div', this).remove();
        }
    });
});