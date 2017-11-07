import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

import { MarketingTrainingService } from '../../../../../services/marketing/marketing-training.service';

declare var $: any;

@Component({
  selector: 'app-marketing-training-presentation',
  templateUrl: './marketing-training-presentation.component.html'
  // templateUrl: './video-poc.html'

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
    private chRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.getVideoLists();


  }


  // http://releases.flowplayer.org/swf/flowplayer-3.2.18.swf 
  // http://releases.flowplayer.org/swf/flowplayer.rtmp-3.2.13.swf 





  openPPTLink() {
    console.log(this.pptLink);
    return this.domSanitizer.bypassSecurityTrustResourceUrl(this.pptLink);
  }
  public returnValue() {
    var value = `config={&quot;clip&quot;:{&quot;provider&quot;:&quot;rtmp&quot;,&quot;baseUrl&quot;:&quot;&quot;,&quot;url&quot;:&quot;${this.selectedFilePath}&quot;},&quot;plugins&quot;:{&quot;rtmp&quot;:{&quot;url&quot;:&quot;http://releases.flowplayer.org/swf/flowplayer.rtmp-3.2.13.swf&quot;,&quot;netConnectionUrl&quot;:&quot;rtmp://s1dyl1mb4e8k0v.cloudfront.net/cfx/st&quot;}},&quot;playerId&quot;:&quot;player&quot;,&quot;playlist&quot;:[{&quot;provider&quot;:&quot;rtmp&quot;,&quot;baseUrl&quot;:&quot;&quot;,&quot;url&quot;:&quot;${this.selectedFilePath}&quot;}]}`;
    var value1 = `config={&quot;clip&quot;:{&quot;provider&quot;:&quot;rtmp&quot;,&quot;baseUrl&quot;:&quot;&quot;,&quot;url&quot;:&quot;mp4:AlanDAgostini&quot;},&quot;plugins&quot;:{&quot;rtmp&quot;:{&quot;url&quot;:&quot;http://releases.flowplayer.org/swf/flowplayer.rtmp-3.2.13.swf&quot;,&quot;netConnectionUrl&quot;:&quot;rtmp://s1dyl1mb4e8k0v.cloudfront.net/cfx/st&quot;}},&quot;playerId&quot;:&quot;player&quot;,&quot;playlist&quot;:[{&quot;provider&quot;:&quot;rtmp&quot;,&quot;baseUrl&quot;:&quot;&quot;,&quot;url&quot;:&quot;mp4:AlanDAgostini&quot;}]}`;
    console.log(value1);
    this.chRef.detectChanges();
    return this.domSanitizer.bypassSecurityTrustResourceUrl(value1);
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
    this.selectedVideoName = videoName;
    this.selectedFilePath = filePath;
    var substring = this.selectedFilePath.substr(-4);

    var self = this

    if (substring == "pptx") {
      this.pptLink = `https://view.officeapps.live.com/op/view.aspx?src=http://www.moparser.com/shared/imi-cms/MSER/presentations/${this.selectedFilePath}`
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.pptLink);
      this.boolPPT = false;
      this.boolVideo = false;

      setTimeout(function () {
        self.boolPPT = true;
        self.boolVideo = false;
        self.chRef.detectChanges();
      }, 1000)

    } else {
      this.boolPPT = false;
      this.boolVideo = false;
      this.sanitizeUrl();
      self.chRef.detectChanges();
      setTimeout(function () {
        self.boolPPT = false;
        self.boolVideo = true;
        self.chRef.detectChanges();
      }, 1000)
    }

  }

  public sanitizedURL: string = ""
  public sanitizeUrl() {
    this.sanitizedURL = 'config={&quot;clip&quot;:{&quot;provider&quot;:&quot;rtmp&quot;,&quot;baseUrl&quot;:&quot;&quot;,&quot;url&quot;:&quot;' + this.selectedFilePath + '&quot;},&quot;plugins&quot;:{&quot;rtmp&quot;:{&quot;url&quot;:&quot;http://releases.flowplayer.org/swf/flowplayer.rtmp-3.2.13.swf&quot;,&quot;netConnectionUrl&quot;:&quot;rtmp://s1dyl1mb4e8k0v.cloudfront.net/cfx/st&quot;}},&quot;playerId&quot;:&quot;player&quot;,&quot;playlist&quot;:[{&quot;provider&quot;:&quot;rtmp&quot;,&quot;baseUrl&quot;:&quot;&quot;,&quot;url&quot;:&quot;' + this.selectedFilePath + '&quot;}]}'

    // this.domSanitizer.bypassSecurityTrustResourceUrl(this.sanitizedURL);
  }
}
