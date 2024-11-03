import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { HttpService } from '../../services/http.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DetailModalComponent } from './components/detail-modal/detail-modal.component';
import { firstValueFrom } from 'rxjs';

export interface Ticket {
  id: string;
  protocol: string;
  subject: string;
  urgency: string;
  category: string;
  status: string;
  type: number; 
}


@Component({
  selector: 'app-tickets-list',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatDialog],
  templateUrl: './tickets-list.component.html',
  styleUrl: './tickets-list.component.scss'
})
export class TicketsListComponent implements OnInit {
  displayedColumns: string[] = ['protocol', 'subject', 'urgency', 'category', 'status', 'type', 'action'];
  dataSource: Ticket[] = [];

  constructor(
    private readonly httpService: HttpService,
    private readonly matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.httpService.getTickets().subscribe((tickets: Ticket[]) => {
      console.log('Tickets: ', tickets);
      this.dataSource = tickets;
      console.log('DataSource: ', this.dataSource);
    });
  }
  
  public async edit(ticketId: string): Promise<void> {
    const result = await this.openDetailModal(ticketId);
  }

  private async openDetailModal(ticket: any): Promise<void> {
    const dialogRef = this.matDialog.open(DetailModalComponent, {
      position: {
        top: '0',
        right: '0'
      },
      data: ticket,
      panelClass: ['animate-slide-in-right', 'no-rounded-container'],
      autoFocus:false
    });

    return firstValueFrom(dialogRef.afterClosed());
  }

  // private mapItemsToTableDataSource(items: Ticket[]): Ticket[] {
  //   return items.map((item) => {
  //     return {
  //       protocol: {
  //         value: item.protocol,
  //         type: 'TEXT'
  //       },
  //       subject: {
  //         value: item.subject,
  //         type: 'TEXT'
  //       },
  //       urgency: {
  //         value: item.urgency,
  //         type: 'TEXT'
  //       },
  //       category: {
  //         value: item.category,
  //         type: 'TEXT'
  //       },
  //       status: {
  //         value: item.status,
  //         type: 'TEXT',
  //       },
  //       type: {
  //         value: item.type,
  //         type: 'STATUS',
  //         label: item.type === 1 ? 'Público' : 'Interno'
  //       },
  //       action: {
  //         value: item.id,
  //         type: 'ACTION',
  //         action: this.editTicket.bind(this)
  //       }
  //     };
  //   });
  // }
}

