import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";


import { MarketingTrainingService } from '../../../services/marketing/marketing-training.service';

declare var $: any;

@Component({
  selector: 'mvp',
  templateUrl: './uconnect-video.html'
  //styleUrls: ['./marketing-training-presentation.component.css']
})
export class UconnectComponent implements OnInit {

  private powerPointLists: any;
  private videoLists: any = [{
    "videoName": "",
    "filePath": "",
    "createdDate": "",
    "videoImageName": "",
    "videoTitle": "",
    "seqno": 0,
    "ipadFilePath": null,
    "program": null,
    "status": ""
  }];
  private selectedVideoName: any = "";
  private selectedFilePath: any = "";
  private boolPPT: boolean = false;
  private boolVideo: boolean = false;
  private pptLink: string = "";

  constructor(private domSanitizer: DomSanitizer, private marketingTrainingService: MarketingTrainingService) { }

  ngOnInit() {
    this.getVideoLists("Ucon");
    // $(document).ready(function () {
    //   var selVideo = '${fn:replace(fn:substring(filePath,4, fn:length(filePath)), "." , "")}';
    //   $('#' + selVideo).attr('class', 'selectedVideo');
    //   $('#' + selVideo).focus();
    // })

    // ("player", "https://www.moparser.com/mser/themes/mser/flash/player.Container-3.2.16.swf", {
    //         clip: {
    //             provider:'rtmp',
    //             baseUrl: ''                
    //         },
    //         plugins: {
    //             rtmp: {
    //                 url: 'https://www.moparser.com/mser/themes/mser/flash/player.stream.rtmp-3.2.12.swf',

    //                 // Replace STREAMING-DISTRIBUTION-DOMAIN-NAME with the domain name of your
    //                 // CloudFront streaming distribution, for example, s5c39gqb8ow64r.cloudfront.net.
    //                 netConnectionUrl: 'rtmp://s1dyl1mb4e8k0v.cloudfront.net/cfx/st'
    //             }
    //         }

    //     })
  }
  openPPTLink() {
    // alert(this.pptLink);
    //   return "https://view.officeapps.live.com/op/view.aspx?src=http://www.moparser.com/shared/imi-cms/MSER/presentations/2015MoparServiceExcellenceRewardsModule5ExpressLane.pptx";
    // return this.pptLink;
    return this.domSanitizer.bypassSecurityTrustResourceUrl(this.pptLink);
  }
  private returnValue() {
    var value = `config={&quot;clip&quot;:{&quot;provider&quot;:&quot;rtmp&quot;,&quot;baseUrl&quot;:&quot;&quot;,&quot;url&quot;:&quot;${this.selectedFilePath}&quot;},&quot;plugins&quot;:{&quot;rtmp&quot;:{&quot;url&quot;:&quot;https://www.moparser.com/mser/themes/mser/flash/player.stream.rtmp-3.2.12.swf&quot;,&quot;netConnectionUrl&quot;:&quot;rtmp://s1dyl1mb4e8k0v.cloudfront.net/cfx/st&quot;}},&quot;playerId&quot;:&quot;player&quot;,&quot;playlist&quot;:[{&quot;provider&quot;:&quot;rtmp&quot;,&quot;baseUrl&quot;:&quot;&quot;,&quot;url&quot;:&quot;${this.selectedFilePath}&quot;}]}`
    var value1 = `config={&quot;clip&quot;:{&quot;provider&quot;:&quot;rtmp&quot;,&quot;baseUrl&quot;:&quot;&quot;,&quot;url&quot;:&quot;mp4:AlanDAgostini&quot;},&quot;plugins&quot;:{&quot;rtmp&quot;:{&quot;url&quot;:&quot;https://www.moparser.com/mser/themes/mser/flash/player.stream.rtmp-3.2.12.swf&quot;,&quot;netConnectionUrl&quot;:&quot;rtmp://s1dyl1mb4e8k0v.cloudfront.net/cfx/st&quot;}},&quot;playerId&quot;:&quot;player&quot;,&quot;playlist&quot;:[{&quot;provider&quot;:&quot;rtmp&quot;,&quot;baseUrl&quot;:&quot;&quot;,&quot;url&quot;:&quot;mp4:AlanDAgostini&quot;}]}`;
    console.log(value1);

    return this.domSanitizer.bypassSecurityTrustResourceUrl(value1);
  }
  private getVideoLists(program: string) {
    this.marketingTrainingService.getVideoLists(program).subscribe(
      (videoLists) => {
        this.videoLists = (videoLists);
        // this.selectedFilePath = this.videoLists[0].filePath;
        // this.selectedVideoName = this.videoLists[0].videoName;
        // this.selectVideo(this.selectedVideoName, this.selectedFilePath);
        //  alert(this.videoLists[0].filePath);
        //console.log(this.videoLists[0]);
        //console.log(this.selectedFilePath);

      },
      (error) => {

      }
    )
  }

  private getPowerPointLists() {
    this.marketingTrainingService.getPowerPointLists().subscribe(
      (powerPointLists) => {
        this.powerPointLists = (powerPointLists);
        console.log(powerPointLists);
      },
      (error) => {

      }
    )
  }

  private selectVideo(videoName: string, filePath: string) {
    this.selectedVideoName = videoName;
    this.selectedFilePath = filePath;
    var substring = this.selectedFilePath.substr(-4);
    // alert(substring);


    var self = this

    if (substring == "pptx") {
      // var src1 = "https://view.officeapps.live.com/op/view.aspx?src=http://www.moparser.com/shared/imi-cms/MSER/presentations/";

      this.pptLink = `https://view.officeapps.live.com/op/view.aspx?src=http://www.moparser.com/shared/imi-cms/MSER/presentations/${this.selectedFilePath}`
      //this.pptLink = src1.concat(this.selectedFilePath);


      this.boolPPT = false;
      this.boolVideo = false;

      setTimeout(function () {
        self.boolPPT = true;
        self.boolVideo = false;
      }, 1000)
      // alert("ppt" + " " + this.boolPPT);
      // alert("vid" + " " + this.boolVideo);
    } else {

      this.boolPPT = false;
      this.boolVideo = false;

      setTimeout(function () {
        self.boolPPT = false;
        self.boolVideo = true;
      }, 1000)


      // alert("ppt" + " " + this.boolPPT);
      // alert("vid" + " " + this.boolVideo);
    }
    // alert(videoName);
    // alert(filePath);
    //location.reload();

  }

}
