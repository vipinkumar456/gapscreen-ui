import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { ApwBreakupComponent } from '../apw-breakup/apw-breakup.component';
// import { AwBreakupComponent } from '../aw-breakup/aw-breakup.component';
import { EaseComponent } from '../ease/ease.component';
import { PIndicatorComponent } from '../p-indicator/p-indicator.component';
// import { PowtMetricsComponent } from '../powt-metrics/powt-metrics.component';


const routes: Routes = [
  // {path:"",component:EaseComponent},
  {
    path: "", component: EaseComponent,
    children: [
      { path: ":id", component: PIndicatorComponent }

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Ease3RoutingModule { }
