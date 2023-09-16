import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-payment',
  templateUrl: './success-payment.component.html',
  styleUrls: ['./success-payment.component.scss']
})
export class SuccessPaymentComponent implements OnInit{
  countdown: number = 5;
  constructor(private router:Router){}
  ngOnInit(): void {
     // Start the countdown timer
     this.startCountdown();
    setTimeout(() => {
      this.router.navigate(['/order-history']);
    }, 5000); // 5,000 milliseconds = 5 second
  }
  startCountdown() {
    const countdownInterval = setInterval(() => {
      this.countdown--;

      // If the countdown reaches 0, clear the interval
      if (this.countdown === 0) {
        clearInterval(countdownInterval);
      }
    }, 1000); // Update countdown every 1 second (1000 milliseconds)
  }
}
