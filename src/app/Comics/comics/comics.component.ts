import { Component, OnInit, signal, ElementRef, HostListener } from '@angular/core';
import { MarvelService } from '../../Service/comics.service';
import { Event } from '../../interface/interface';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
/*import { HeaderComponent } from "../Header/header.component";*/
import {RouterLink,RouterLinkActive,RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-Comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.css'],
  standalone: true,
  imports: [RouterLink,RouterLinkActive,RouterOutlet],
})




export class MarvelListComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  characters: any[] = [];
  page = 1; // Página actual de datos
  loading = false;

  marvelList = signal<Event[] | null>(null);

  error?: string;

  constructor(private marvelService: MarvelService, private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.getMarvelList();
  }

  getMarvelList(): void {
    //this.loading = true;
    this.marvelService.getMarvelList()?.subscribe(
      (data) => {
        this.marvelList.set(data.data.results);
        this.loading = false;
      },
    );
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    const scrollPosition = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const eightyPercent = maxScroll * 0.9;

    if (!this.loading && scrollPosition >= eightyPercent) {
      this.loadMoreCharacters();
    }
  }
  loadMoreCharacters(): void {
   
    this.marvelService.getNewsMarvelList()?.subscribe(
      (data) => {
        
       this.marvelList.update((previo)=>{
          if (previo===null) return data.data.results;
          return [...previo,...data.data.results]
       })
      
      },
    );
  }
}



