import { Component } from '@angular/core';
import { CartService } from '../Services/cart.service';
import { AuthService } from '../Services/auth.service';
@Component({
    selector: 'app-order-history',
    templateUrl: './order-history.component.html',
    styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent {
orderHistory: any [] = []
filteredOrderHistory: any[] = [];
selectedDate: string = '';
    constructor(
        private crt: CartService,
        private auth: AuthService,
        ) {
    }
    showData() {
    this.crt.ordrHistory().subscribe(res => this.orderHistory = res,
    error => {
        if (error.status === 401) {
          this.auth.showPromptForLoginOrRegister();
        }
      }
    );
  }

    filterByDate(): void {
    if (this.selectedDate) {
      const filterDate = new Date(this.selectedDate);
      this.filteredOrderHistory = this.orderHistory.filter(item => {
        // Compare the date portion of the createdTime with the selected date
        const itemDate = new Date(item.createdTime).toDateString();
        const filterDateStr = filterDate.toDateString();
        return itemDate === filterDateStr;
      });
    } else {
      // If no date is selected, show all order history
      this.filteredOrderHistory = [...this.orderHistory];
    }
  }
}
