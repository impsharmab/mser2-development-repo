import { Component, OnInit } from '@angular/core';

import { MarketingTrainingService } from '../../services/marketing/marketing-training.service';

declare var $: any;

@Component({
  selector: 'mvp',
  templateUrl: './mvp.html'
  //styleUrls: ['./marketing-training-presentation.component.css']
})
export class MVPComponent implements OnInit {
 
  private videoLists: any;
  private selectedVideoName: any = "";
  private selectedFilePath: any = "";
  

  constructor(private marketingTrainingService: MarketingTrainingService) { }

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

  private getVideoLists() {
    this.marketingTrainingService.getMVPVideoLists().subscribe(
      (videoLists) => {
        this.videoLists = (videoLists);
        //console.log(this.videoLists);
      },
      (error) => {

      }
    )
  }

  private selectVideo(videoName: string, filePath: string) {
    this.selectedVideoName = videoName;
    this.selectedFilePath = filePath;
    var substring = this.selectedFilePath.substr(-4);
    
  }

}
