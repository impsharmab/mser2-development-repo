import { Component, OnInit, ChangeDetectorRef, ApplicationRef } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

import { MarketingTrainingService } from '../../../../../services/marketing/marketing-training.service';

declare var $: any;
declare var $f: any;

@Component({
  selector: 'app-marketing-training-presentation',
  templateUrl: './marketing-training-presentation.component.html'
  // templateUrl: './new-video-poc.html' 

})
export class MarketingTrainingPresentationComponent implements OnInit {
  public powerPointLists: any;
  public videoLists: any = [{
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
  public selectedVideoName: any = "";
  public selectedFilePath: any = "";
  public boolPPT: boolean = false;
  public boolVideo: boolean = false;
  public pptLink: string = "";

  constructor(
    private domSanitizer: DomSanitizer,
    private marketingTrainingService: MarketingTrainingService,
    private chRef: ChangeDetectorRef,
    private applicationRef : ApplicationRef ) { }

  ngOnInit() {
    this.getVideoLists();
  }

  openPPTLink() {
    console.log(this.pptLink);
    return this.domSanitizer.bypassSecurityTrustResourceUrl(this.pptLink);
  }
  
  public getVideoLists() {
    this.marketingTrainingService.getVideoLists("").subscribe(
      (videoLists) => {
        this.videoLists = (videoLists);
        this.chRef.detectChanges();
      },
      (error) => {
      }
    )
  }

  public getPowerPointLists() {
    this.marketingTrainingService.getPowerPointLists().subscribe(
      (powerPointLists) => {
        this.powerPointLists = (powerPointLists);
        console.log(powerPointLists);
      },
      (error) => {

      }
    )
  }

  public selectVideo(videoName: string, filePath: string) {
    this.domSanitizer.bypassSecurityTrustResourceUrl(filePath);
    this.selectedVideoName = videoName;
    this.selectedFilePath = filePath;
    var substring = this.selectedFilePath.substr(-4);

    if (substring == "pptx") {
      this.pptLink = `https://view.officeapps.live.com/op/view.aspx?src=https://www.moparser.com/shared/imi-cms/MSER/presentations/${this.selectedFilePath}`
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.pptLink);
      this.boolVideo = false;
      this.boolPPT = true;
      this.chRef.detectChanges();
    } else {
      this.boolPPT = false;
      this.boolVideo = true;
      this.chRef.detectChanges();
      this.doJquery();
      this.chRef.detectChanges();
    }
  }

  public doJquery() {
    // var selVideo = '${fn:replace(fn:substring(filePath,4, fn:length(filePath)), "."," ")}';
    //$('#' + selVideo).attr('class', 'selectedVideo');
    //$('#' + selVideo).focus();
    $f("player", "https://releases.flowplayer.org/swf/flowplayer-3.2.18.swf", {
      clip: {
        provider: 'rtmp',
        baseUrl: ''
      },
      plugins: {
        rtmp: {
          url: 'https://releases.flowplayer.org/swf/flowplayer.rtmp-3.2.13.swf',
          netConnectionUrl: 'rtmp://s1dyl1mb4e8k0v.cloudfront.net/cfx/st'
        }
      }
    })
  }
}
