import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";


import { MarketingTrainingService } from '../../../../../services/marketing/marketing-training.service';

declare var $: any;

@Component({
  selector: 'app-marketing-training-presentation',
  templateUrl: './marketing-training-presentation.component.html',
  styleUrls: ['./marketing-training-presentation.component.css']
})
export class MarketingTrainingPresentationComponent implements OnInit {
  private powerPointLists: any;
  private videoLists: any;
  private selectedVideoName: any = "";
  private selectedFilePath: any = "";
  private boolPPT: boolean = false;
  private boolVideo: boolean = false;
  private pptLink: string = "";

  constructor(private domSanitizer: DomSanitizer, private marketingTrainingService: MarketingTrainingService) { }

  ngOnInit() {
    this.getVideoLists();
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
  private getVideoLists() {
    this.marketingTrainingService.getVideoLists().subscribe(
      (videoLists) => {
        this.videoLists = (videoLists);
        //console.log(this.videoLists);
      },
      (error) => {

      }
    )
  }

  private getPowerPointLists() {
    this.marketingTrainingService.getPowerPointLists().subscribe(
      (powerPointLists) => {
        this.powerPointLists = (powerPointLists);
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

    if (substring == "pptx") {
      // var src1 = "https://view.officeapps.live.com/op/view.aspx?src=http://www.moparser.com/shared/imi-cms/MSER/presentations/";

      this.pptLink = `https://view.officeapps.live.com/op/view.aspx?src=http://www.moparser.com/shared/imi-cms/MSER/presentations/${this.selectedFilePath}`
      //this.pptLink = src1.concat(this.selectedFilePath);
      this.boolPPT = true;
      this.boolVideo = false;

      // alert("ppt" + " " + this.boolPPT);
      // alert("vid" + " " + this.boolVideo);
    } else {
      this.boolPPT = false;
      this.boolVideo = true;
      // alert("ppt" + " " + this.boolPPT);
      // alert("vid" + " " + this.boolVideo);
    }
    // alert(videoName);
    // alert(filePath);
    //location.reload();

  }

}
