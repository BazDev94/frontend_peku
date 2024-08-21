import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { PekuService } from 'src/app/services/peku.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  @Input() collapsed = false;
  @Input() screenWidth = 0;

  canShowSearchAsOverlay = false;

  userItem = [
    {
      icon:'fa fa-user',
      label: 'Profile',
    },
    {
      icon:'fa fa-cog',
      label: 'Settings',
    },
    {
      icon:'fa fa-unlock-alt',
      label: 'Lock Screen',
    },
    {
      icon:'fa fa-power-off',
      label: 'Logout',
    },
  ]
  notifications = [
    {
    icon: 'fas fa-cloud-download',
    subject: 'Your file is ready to download',
    description: 'We have created a new report for you to download'
  },
  {
    icon: 'fas fa-cloud-download',
    subject: 'Your file is ready to download',
    description: 'We have created a new report for you to download'
  },
  {
    icon: 'fas fa-cloud-upload',
    subject: 'Upload your files',
    description: 'You have uploaded 3 files to your account'
  },
  {
    icon: 'fas fa-trash',
    subject: 'Delete 3 files from your account',
    description: 'You have deleted 3 files from your account'
  },

]
  constructor(public pekuService:PekuService,public utils:UtilsService){}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkCanShowSearchAsOverlay(window.innerWidth);
  }

  ngOnInit(): void {
    this.getAllCategories();
    this.checkCanShowSearchAsOverlay(window.innerWidth);

    console.log("init header",window.innerWidth);  
  }

  getHeaderClass(): string {
    let styleClass = '';
    if(this.collapsed && this.screenWidth > 768) {
      styleClass = 'head-trimmed';
    } else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'head-md-screen'
    }
    return styleClass;
  }


  checkCanShowSearchAsOverlay(innerWidh:number){
    if(innerWidh <= 845) {
      this.canShowSearchAsOverlay = true;
    } else {
      this.canShowSearchAsOverlay = false;
    }
  }


  getAllCategories(){
    this.pekuService.getCategories().subscribe(
      data => {
        this.utils.aCat = data;
        console.log("Categories",  data);
      },
      error => {
        console.error("Error fetching Categories", error);
      }
    );
  }
}
