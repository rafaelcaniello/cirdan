import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { firstValueFrom, Observable, Subject } from 'rxjs';
import { Ticket, TicketSummary } from '../core/ticket.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public search$: Subject<void> = new Subject();
  public isLoading = signal<boolean>(true);
  private apiKey = '47c36c7c-adef-4375-920a-a5b783c20207';
  private baseUrl = '/api/public/v1/tickets';

  constructor(
    private readonly http: HttpClient
  ) {}

  public async search(): Promise<[TicketSummary]> {
    try {
      const data = await firstValueFrom(this.getTickets());
      return data;
    } catch (err) {
      console.error('Erro na requisição: ', err);
      throw err;
    }
  }

  public refresh(): void {
    this.isLoading.set(true);
    this.search$.next();
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  private buildUrl(params: string): string {
    return `${this.baseUrl}?token=${this.apiKey}${params}`;
  }

  public getTickets(params?: { status?: string, category?: string }): Observable<[TicketSummary]> {
    if (!params) {
      params = {
        status: "'Sustentação'",
        category: "'Falhas'"
      };
    }

    const queryParams = `&$select=id,protocol,type,subject,category,urgency,status,justification,createdDate,customFieldValues&$filter=status eq ${params.status} and category eq ${params.category}`;
    const url = this.buildUrl(queryParams);

    console.log('url: ', url);

    return this.http.get<[TicketSummary]>(url, { headers: this.getHeaders() });
  }

  public getTicketById(id: string): Observable<any> {
    const url = this.buildUrl(`&id=${id}`);
    console.log('url: ', url);

    return this.http.get<any>(url, { headers: this.getHeaders() });
  }

  public getTicketByProtocol(protocol: string): Observable<Ticket> {
    const url = this.buildUrl(`&protocol=${protocol}`);
    console.log('url: ', url);

    return this.http.get<Ticket>(url, { headers: this.getHeaders() });
  }
}
