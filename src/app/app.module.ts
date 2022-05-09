import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { SquareComponent } from './components/square/square.component';
import { ChunkPipe } from './pipes/chunk.pipe';

@NgModule({
  declarations: [AppComponent, BoardComponent, SquareComponent, ChunkPipe],
  imports: [BrowserModule, ReactiveFormsModule, AppRoutingModule],
  providers: [ChunkPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
