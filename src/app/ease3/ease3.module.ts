import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PrimeNgModule } from '../primeng.module';

import { Ease3RoutingModule } from './ease3-routing.module';
import { PIndicatorComponent } from '../p-indicator/p-indicator.component';
// import { AwBreakupComponent } from '../aw-breakup/aw-breakup.component';
// import { ApwBreakupComponent } from '../apw-breakup/apw-breakup.component';
// import { PowtMetricsComponent } from '../powt-metrics/powt-metrics.component';
import { EaseComponent } from '../ease/ease.component';
import { NavigationComponent } from '../navigation/navigation.component';

@NgModule({
  declarations: [
    PIndicatorComponent,EaseComponent, NavigationComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    FormsModule,
    Ease3RoutingModule,
  ]
})
export class Ease3Module { }
