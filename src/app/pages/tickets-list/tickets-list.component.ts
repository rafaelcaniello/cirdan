import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { firstValueFrom } from 'rxjs';
import { TicketSummary, TicketTypeEnum } from '../../core/ticket.interface';
import { HttpService } from '../../services/http.service';
import { DetailModalComponent } from './components/detail-modal/detail-modal.component';

@Component({
  selector: 'app-tickets-list',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatDialogModule, CommonModule, MatRippleModule],
  templateUrl: './tickets-list.component.html',
  styleUrl: './tickets-list.component.scss'
})
export class TicketsListComponent implements OnInit {
  displayedColumns: string[] = ['protocol', 'subject', 'urgency', 'category', 'status', 'type', 'justification', 'createdDate', 'action'];
  dataSource: TicketSummary[] = [];

  constructor(
    private readonly httpService: HttpService,
    private readonly matDialog: MatDialog
  ) {}

   ngOnInit(): void {
    this.httpService.getTickets().subscribe((tickets: TicketSummary[]) => {
      console.log('Tickets: ', tickets);
      this.dataSource = tickets.map(ticket => ({
        ...ticket,
        type: TicketTypeEnum[ticket.type as unknown as keyof typeof TicketTypeEnum]
      }));
      console.log('DataSource: ', this.dataSource);
    });
  }
  public async edit(ticketId: string): Promise<void> {
    const result = await this.openDetailModal(ticketId);
  }

  private async openDetailModal(ticketId: string): Promise<void> {
    const dialogRef = this.matDialog.open(DetailModalComponent, {
      height: '100%',
      width: '600px',
      position: {
        top: '0',
        right: '0'
      },
      data: { ticketId },
      panelClass: 'no-rounded-container',
      autoFocus:false
    });

    return firstValueFrom(dialogRef.afterClosed());
  }
}

