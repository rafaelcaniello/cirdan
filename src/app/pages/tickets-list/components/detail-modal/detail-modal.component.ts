import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Ticket, TicketJustificationEnum, TicketTypeEnum, TicketUrgencyEnum } from '../../../../core/ticket.interface';
import { HttpService } from '../../../../services/http.service';

@Component({
  selector: 'app-detail-modal',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule, FormsModule],
  templateUrl: './detail-modal.component.html',
  styleUrl: './detail-modal.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class DetailModalComponent implements OnInit {
  public ticket = signal<Ticket | undefined>(undefined);
  public ticketTypes = Object.keys(TicketTypeEnum).filter(key => isNaN(Number(key)));
  public ticketUrgencies = Object.keys(TicketUrgencyEnum).filter(key => isNaN(Number(key)));
  public ticketJustifications = Object.keys(TicketJustificationEnum).filter(key => isNaN(Number(key)));
  
  public constructor(
    @Inject(MAT_DIALOG_DATA) public data: { ticketId: string },
    private readonly httpService: HttpService,
    private readonly matDialog: MatDialog,
  ) {}

  public async ngOnInit(): Promise<void> {
    await this.searchTicket(this.data.ticketId);
  }

  private async searchTicket(ticketId: string): Promise<void> {
    this.httpService.getTicketById(ticketId).subscribe(ticket => {
      const mappedTicket = {
        ...ticket,
        type: TicketTypeEnum[ticket.type]
      };
      this.ticket.set(mappedTicket);
      console.log('Ticket: ', mappedTicket);
    });
  }

  public async closeDetailModal(): Promise<void> {
    const dialogRef = this.matDialog.closeAll();
  }
}