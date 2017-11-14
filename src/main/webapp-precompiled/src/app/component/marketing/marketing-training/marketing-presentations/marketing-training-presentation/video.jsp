<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ page import="java.util.*"%>
<title>MSER Training Videos</title>

<div id="main-content" style="height: 470px;padding-left: 3%">    
    <script src="http://cdn.jquerytools.org/1.2.6/all/jquery.tools.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="themes/mser/js/flowplayer.playlist-3.2.10.js" type="text/javascript"></script>
    <script src="themes/mser/js/flowplayer-3.2.12.min.js" type="text/javascript"></script>
    <%-- <script type="text/javascript" src="themes/mser/js/flowplayer.ipad-3.2.12.js"></script> --%>

    <script type="text/javascript">
        if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))||(navigator.userAgent.match(/iPad/i))) {
            if (document.cookie.indexOf("iphone_redirect=false") == -1){
                window.location="playVideo.do?page=ipad";
            }
        }
        IS_IPAD = navigator.userAgent.match(/iPad/i) != null;
        IS_IPHONE = (navigator.userAgent.match(/iPhone/i) != null) || (navigator.userAgent.match(/iPod/i) != null);
        if (IS_IPAD) {
            IS_IPHONE = false;
        }
    </script>

    <style type="text/css">
        .selectedVideo{
            border : 1px solid black !important;
            background-image:url("/shared/imi-cms/MSER/images/webImages/back_images.jpg") !important;
        }

        .selectedVideo:hover {
            background-color:transparent !important;
        }
    </style>
    <%-- <c:choose>
    <c:when test="${sessionScope.user != null}"> --%>
    <h4 align="center" style="padding-left: 200px; margin-top: 40px">${videoTitle}</h4>

    <table style="width: 95%; height:auto; background-color: #EEE; border-collapse: collapse;">
        <tr>
            <td style="width: 260px;">
                <div id="playlist">
                    <c:forEach items="${videos}" var="video" varStatus="x">
                        <a href="playVideo.do?filePath=${video.filePath}&&videoTitle=${video.videoTitle}&&page=${program}" id="${fn:replace(fn:substring(video.filePath,4, fn:length(video.filePath)),'.','')}">
                            <img src="${video.videoImageName}" alt="videos"/>
                            <strong style="font-size: 11px;">${video.videoName}</strong>
                        </a>
                    </c:forEach>
                </div>
            </td>

            <td style="vertical-align: middle;" >
                <c:choose>
                    <c:when test="${fn:containsIgnoreCase(filePath, '.ppt')}">
                        <iframe src='https://view.officeapps.live.com/op/view.aspx?src=http://www.moparser.com/shared/imi-cms/MSER/presentations/${filePath}'
                                style="width:640px; height: 360px; display: block; margin: auto;" frameborder='0'></iframe>
                    </c:when>
                    <c:otherwise>
                        <div>
                            <a id="player" href="${filePath}" style="width:640px; height: 360px; display: block; margin: auto;"></a>
                        </div>
                    </c:otherwise>
                </c:choose>
            </td>
        </tr>
    </table>
    <%-- </c:when>
     <c:otherwise>
         <p>Please click <a class="selected" style="color: blue" href="<c:url value='/login.do'/>" id="registrationForward">here</a> to log in to the program website.</p>
     </c:otherwise>
 </c:choose> --%>
    <script type="text/javascript">
        $(document).ready(function(){
            var selVideo = '${fn:replace(fn:substring(filePath,4, fn:length(filePath)),'.','')}';
            $('#'+selVideo).attr('class', 'selectedVideo');
            $('#'+selVideo).focus();
        })


        $f("player", "themes/mser/flash/player.Container-3.2.16.swf", {
            clip: {
                provider:'rtmp',
                baseUrl: '',
                onStart: function() {
                    var videoName = $('#player').attr("href");
                    var d = new Date();
                    var starttime =d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+"."+d.getMilliseconds();
                    s=starttime;                    
                    $.ajax({
                        type: 'GET',
                        url: '<c:url value="/flowPlayer/init.do?videoName="/>'+videoName+'&&event=start&&starttime='+starttime,
                        dataType: "text",
                        cache:false ,
                        success: function(response) { },
                        error: function(jqXHR, exception) { }
                    })
                },

                onPause: function() {
                    var videoName = $('#player').attr("href");
                    var d = new Date();
                    var pausetime=d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+"."+d.getMilliseconds();
                    var duration=this.getTime();
                    $.ajax({
                        type: 'GET',
                        url: '<c:url value="/flowPlayer/init.do?videoName="/>'+videoName+'&&event=pause&&pausetime='+pausetime+'&&duration='+duration+'&&starttime='+s,
                        dataType: "text",
                        cache:false ,
                        success: function(response) { },
                        error: function(jqXHR, exception) { }
                    })
                },

                onFinish: function() {
                    var videoName = $('#player').attr("href");
                    this.unload();
                    var d = new Date();
                    var endtime=d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+"."+d.getMilliseconds();
                    var fullduration = this.getClip().fullDuration;
                    $.ajax({
                        type: 'GET',
                        url: '<c:url value="/flowPlayer/init.do?videoName="/>'+videoName+'&&event=end&&endtime='+endtime+'&&duration='+fullduration+'&&starttime='+s,
                        dataType: "text",
                        cache:false ,
                        success: function(response) { },
                        error: function(jqXHR, exception) { }
                    })

                }
            },
            plugins: {
                rtmp: {
                    url: 'themes/mser/flash/player.stream.rtmp-3.2.12.swf',

                    // Replace STREAMING-DISTRIBUTION-DOMAIN-NAME with the domain name of your
                    // CloudFront streaming distribution, for example, s5c39gqb8ow64r.cloudfront.net.
                    netConnectionUrl: 'rtmp://s1dyl1mb4e8k0v.cloudfront.net/cfx/st'
                }
            }

        })//.playlist("#playlist");

    </script>
</div>
<style type="text/css">

    #playlist {
        overflow-y:auto;
        overflow-x:hidden;
        border:1px solid #ccc;
        background-color:#efefef;
        /*        padding:0px 15px 0px 5px;*/
        height:400px;
        float:left;
        width: 100% !important;
    }

    #playlist a {
        display:block;
        width: 85%;
        height: 54px;
        padding:5px;
        background-color:#fff;
        border:1px solid #ccc;
        font:11px "bitstream vera sans", "lucida grande",verdana;
        text-decoration:none;
        margin:9px 0px 0px 10px;
        color:#666;
    }

    #playlist a:hover {
        background-color:#ffc;
    }

    #playlist a.progress {
        background-color:#efefef;
    }

    #playlist a.playing {
        border:1px solid #666;
        background-color:#ffc;
    }

    #playlist a.paused {
        border:1px solid #666;
        background-color:#ffc;
    }

    #playlist a img {
        border:0;
        float:left;
        margin-right:10px;
        width : 50px;
        height: 50px;
    }

    #playlist a strong {
        color:#000;
        padding-bottom:5px;
    }
</style>