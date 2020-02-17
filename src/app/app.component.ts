import { Component } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { environment } from '../environments/environment';

@Component({
  selector: 'my-app',
  templateUrl: './html/startpage.html',
  styleUrls:["style/startpage.css"]
})

export class AppComponent  {
  deviceInfo = null;
    constructor(private deviceService: DeviceDetectorService) {
     
      this.deviceInfo = this.deviceService.getDeviceInfo();

      environment.mobile = false; //this.deviceService.isDesktop();
      if (this.deviceService.isMobile() || this.deviceService.isTablet()) 
      {
        environment.mobile = true;
        environment.nmessages = 12;
      }
    }
}
