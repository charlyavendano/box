import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent {
  copySuccess = false;
  showPreAlertModal = false;

  copyAddress() {
    const address = `Name: Carlos Avendano (BXS-994433)
6601 Hillcroft Ave, Suite 135
Houston, TX 77081
Phone: 832-461-5774`;

    navigator.clipboard.writeText(address).then(() => {
      this.copySuccess = true;
      setTimeout(() => this.copySuccess = false, 2000);
    });
  }

  openPreAlert() {
    this.showPreAlertModal = true;
  }

  closePreAlert() {
    this.showPreAlertModal = false;
  }
}
