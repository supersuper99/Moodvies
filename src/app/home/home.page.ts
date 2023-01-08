import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoadingController, ToastController } from '@ionic/angular';

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
    'mysterious',
    'thrilling',
  ];
  movie: any;
  isLoading = false;

  constructor(
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.moodForm = new FormGroup({
      mood: new FormControl('', Validators.required),
    });
  }

  async suggestMovie() {
    this.isLoading = true;
    const loading = await this.loadingCtrl.create({
      message: 'Suggesting a movie...',
    });
    await loading.present();

    const mood = this.moodForm.value.mood;
    const tmdbApiKey = '1481c4774a185720f42198e8a1259e57';
    const tmdbUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${tmdbApiKey}&sort_by=popularity.desc&with_genres=${this.getGenreIdFromMood(mood)}`;
    this.http.get<TmdbResponse>(tmdbUrl).subscribe(
      (res: TmdbResponse) => {
        this.movie = res.results[Math.floor(Math.random() * res.results.length)];
        this.isLoading = false;
        loading.dismiss();
      },
      (err) => {
        console.error(err);
        this.isLoading = false;
        loading.dismiss();
        this.showErrorToast();
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
      case 'mysterious':
        return 9648; // Mystery
      case 'thrilling':
        return 53; // Thriller
      default:
        return 0;
    }
  }

  async showErrorToast() {
    const toast = await this.toastCtrl.create({
      message: 'Sorry, something went wrong. Please try again later.',
      duration: 3000,
      color: 'danger',
    });
    toast.present();
  }
}