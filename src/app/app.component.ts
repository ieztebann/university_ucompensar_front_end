import { Component,NgModule, ViewChild, ElementRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild('chatboxmsg') chatboxmsg!: ElementRef<HTMLDivElement>;

  scrollToTop() {
    if (this.chatboxmsg) {
      // Obtiene el elemento nativo del contenedor de scroll
      const containerElement = this.chatboxmsg.nativeElement;
      containerElement.scrollTop = (containerElement.scrollHeight);
    }
  }
  title = 'chatbot';
  chatMessages: string[] = [];
  message: string = '';

  sendMessage() {
    const data = this.message.trim();
    if (data !== '') {
      this.chatMessages.push(data);
      this.message = '';
      this.scrollToTop();
    }
  }

  scrollToBottom(): void {
    try {
      this.chatboxmsg.nativeElement.scrollTop = this.chatboxmsg.nativeElement.scrollHeight;
    } catch(err) {
      console.error(err);
    }
  }
  handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }

  ngOnInit(): void {
    if (typeof document !== 'undefined') {
      const animate = document.querySelectorAll(".animate");
      this.start_animation(animate);
    }    
  }

  start_animation(animate: NodeListOf<Element>) {
    for (let i = 0; i < animate.length; i++) {
      setTimeout(function () {
        animate[i].classList.add("animated");
      }, 300 * i + 400
      );
    }
  }
}
