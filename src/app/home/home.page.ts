import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  moodForm: FormGroup;
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
    try {
      const res = await this.http.get(tmdbUrl).toPromise();
      this.movie = res.results[0];
    } catch (err) {
      console.error(err);
    }
  }
}