import { HttpClientModule } from '@angular/common/http';
import {ChangeDetectionStrategy, Component, signal} from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl:'./home.component.html',
  providers: [
    HttpClientModule
  ],
  styleUrl: './home.component.css'

})
export class HomeComponent {
  
}
