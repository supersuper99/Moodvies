import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface TmdbResponse {
  results: any[];
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  moodForm!: FormGroup;
  moods = [
    'happy',
    'sad',
    'romantic',
    'adventurous',
    'exciting',
    'relaxing',
    'thought-provoking',
    'comedic',
    'dramatic',
    'action-packed',
  ];
  movie: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.moodForm = new FormGroup({
      mood: new FormControl('', Validators.required),
    });
  }

  async suggestMovie() {
    const mood = this.moodForm.value.mood;
    const tmdbApiKey = 'YOUR_TMDB_API_KEY';
    const tmdbUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${tmdbApiKey}&sort_by=popularity.desc&with_genres=${this.getGenreIdFromMood(mood)}`;
    this.http.get<TmdbResponse>(tmdbUrl).subscribe(
      (res: TmdbResponse) => {
        this.movie = res.results[0];
      },
      (err) => {
        console.error(err);
      }
    );
  }


  getGenreIdFromMood(mood: string) {
    switch (mood) {
      case 'happy':
        return 35; // Comedy
      case 'sad':
        return 18; // Drama
      case 'romantic':
        return 10749; // Romance
      case 'adventurous':
        return 12; // Adventure
      case 'exciting':
        return 28; // Action
      case 'relaxing':
        return 16; // Animation
      case 'thought-provoking':
        return 878; // Science Fiction
      case 'comedic':
        return 35; // Comedy
      case 'dramatic':
        return 18; // Drama
      case 'action-packed':
        return 28; // Action
      default:
        return 0;
    }
  }
}