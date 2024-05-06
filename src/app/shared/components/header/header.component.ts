import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, RouterLink],
  template: `
  <div class="header-cont">


<!-- <div tiptxt="home" [routerLink]="['/home']">მთავარი</div> -->
<div tiptxt="employees" [routerLink]="['/decree-calc']" routerLinkActive="active">დეკრეტულის გამოთვლა</div>




</div>
  `,
  styles: `
  
  .header-cont{
    display: flex;
    padding: 20px;
    background-color: blueviolet;
    justify-content: center;
    gap: 20px;
    
}

.activeRoute {
    color: white;
  }

  
  `

})
export class HeaderComponent {

}
