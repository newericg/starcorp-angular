import { Injectable } from "@angular/core";

export interface ToastInfo {
    header: string;
    body: string;
    delay?: number;
    classList?: string
  }
  
  @Injectable({ providedIn: 'root' })
  export class AppToastService {
    toasts: ToastInfo[] = [];
    
  
    show(header: string, body: string, classList: string) {
      this.toasts.push({ header, body, classList });
    }

    remove(toast: ToastInfo) {
        this.toasts = this.toasts.filter(t => t != toast);
      }
  }