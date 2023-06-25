import { Chart } from 'chart.js';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ProdService } from '../Services/prod.service';
import 'chartjs-adapter-moment';
import 'chartjs-adapter-date-fns';

@Component({
  selector: 'app-mid',
  templateUrl: './mid.component.html',
  styleUrls: ['./mid.component.css']
})
export class MidComponent {
    productLabels: string[] = [];
    productPrices: number[] = [];
    constructor(private productService: ProdService) {}

    ngOnInit(): void {
        this.fetchProductData();
      }
    
      fetchProductData(): void {
        this.productService.showProducts().subscribe(
          products => {
            this.productLabels = products.map((product: { name: any; }) => product.name);
            this.productPrices = products.map((product: { price: any; }) => product.price);
            this.renderChart();
          },
          error => {
            console.log('Error fetching product data:', error);
          }
        );
      }
    
      ngAfterViewInit(): void {
        // Render the chart after the view has initialized
        this.renderChart();
      }
    
      renderChart(): void {
        // Check if the chart data is available before rendering
        if (this.productLabels.length === 0 || this.productPrices.length === 0) {
          return;
        }
      
        const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('productChart');
        const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
      
        if (ctx === null) {
          console.log('Unable to get canvas context');
          return;
        }
      
        const chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: this.productLabels,
            datasets: [{
              label: 'Product Prices',
              data: this.productPrices,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    }