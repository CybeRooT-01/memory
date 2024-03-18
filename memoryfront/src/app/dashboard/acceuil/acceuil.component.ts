import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js/auto';
import { Evenement } from 'src/app/Interfaces/Evenement';
import { LoggedUser } from 'src/app/Interfaces/LoggedUser';
import { AuthService } from 'src/app/services/auth.service';
import { EvenementService } from 'src/app/services/evenement.service';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css'],
})
export class AcceuilComponent implements OnInit {
  @ViewChild('myChart') myChart!: ElementRef;
  @ViewChild('myChart2') myChart2!: ElementRef;
  userLogged: LoggedUser = {};
  constructor(
    private evenementservice: EvenementService,
    private authservice: AuthService
  ) {}

  ngOnInit(): void {
    let evenements: Evenement[] = [];
    this.evenementservice.All().subscribe((response: Evenement[]) => {
      const events = response;
      evenements = response;
      const dates = events.map((event: any) => event.date);
      const counts = dates.reduce((acc: any, date: any) => {
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});
      // console.log(counts);
      const chartData = {
        labels: Object.keys(counts),
        datasets: [
          {
            label: "Nombre d'événements par date",
            data: Object.values(counts),
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      };
      const ctx = this.myChart.nativeElement.getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Nombre d'événements",
              },
            },
            x: {
              title: {
                display: true,
                text: 'Date',
              },
            },
          },
        },
      });
    });
    this.authservice.getCurrentUser().subscribe((response: LoggedUser) => {
      const ctx = this.myChart.nativeElement.getContext('2d');
      // console.log(response.data);
      let userId = response.data?.id;
      this.userLogged = response;
      console.log(userId);
      console.log(evenements);
      const events = evenements.filter(
        (event: any) => event.createur.id === userId
      );
      console.log(events);
      const totalEvents: number = evenements.length;
      console.log(totalEvents);

      const userEventData: number = events.length;
      const otherEventsData: number = totalEvents - userEventData;
      console.log(otherEventsData);
      const chartData2 = {
        labels: ["Événements de l'utilisateur", 'Autres événements'],
        datasets: [
          {
            label: "Nombre d'événements",
            data: [userEventData, otherEventsData],
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
            ],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
            borderWidth: 1,
          },
        ],
      };
      const ctx2 = this.myChart2.nativeElement.getContext('2d');
      new Chart(ctx2, {
        type: 'pie',
        data: chartData2,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Répartition des événements',
              padding: 20,
              font: {
                size: 16,
              },
            },
          },
        },
      });
    });
  }
}
