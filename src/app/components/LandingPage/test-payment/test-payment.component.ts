import { Component,HostListener  } from '@angular/core';
declare var Razorpay: any;
@Component({
  selector: 'app-test-payment',
  templateUrl: './test-payment.component.html',
  styleUrls: ['./test-payment.component.scss'],
})
export class TestPaymentComponent {
  paymentId: any;
  error: any = '';
  message:any;

  options = {
    key: 'rzp_test_rctEhk9DkJO7hU',
    amount: '200',
    currency:'INR',
    name: 'Testing ',
    description: 'dewood Testing',
    image: '../../../assets/images/dashboard/logo2.png',
    order_id: '',
    handler: function (response: any) {
      var event = new CustomEvent('payment.success', {
        detail: response,
        bubbles: true,
        cancelable: true,
      });
      window.dispatchEvent(event);
    },
    prefill: {
      name: '',
      email: '',
      contact: '',
    },
    notes: {
      address: '',
    },
    theme: {
      color: '#3399cc',
    },
  };

  paynow() {
    this.paymentId = '';
    this.error = '';
    this.options.amount = '200'; //paise
    this.options.prefill.name = 'Tester';
    this.options.prefill.email = 'tester@gmail.com';
    this.options.prefill.contact = '1234567890';
    var rzp1 = new Razorpay(this.options);
    rzp1.open();
    rzp1.on('payment.failed', function (response: any) {
      //this.message = "Payment Failed";
      // Todo - store this information in the server
      console.log(response.error.code);
      console.log(response.error.description);
      console.log(response.error.source);
      console.log(response.error.step);
      console.log(response.error.reason);
      console.log(response.error.metadata.order_id);
      console.log(response.error.metadata.payment_id);
      //this.error = response.error.reason;
    });
  }
  @HostListener('window:payment.success', ['$event'])
  onPaymentSuccess(event: any): void {
    this.message = "Success Payment";
  }
}
