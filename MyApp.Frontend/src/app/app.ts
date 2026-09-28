import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [JsonPipe, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private readonly http = inject(HttpClient);

  result = signal<unknown>(null);
  loading = signal(true);
  error = signal('');

  logout(): void {
    window.location.href = 'https://localhost:7180/logout';
  }

  ngOnInit(): void {
    this.http.get<unknown>('https://localhost:7180/api/mydata').subscribe({
      next: (result) => {
        this.result.set(result);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Unable to load data.');
        this.loading.set(false);
      }
    });
  }
}