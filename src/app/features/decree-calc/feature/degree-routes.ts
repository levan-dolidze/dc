import { Routes } from "@angular/router";
import { LayoutComponent } from "../../../shared/components/layout/layout.component";
import { DecreeCalcComponent } from "./decree-calc.component";

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: DecreeCalcComponent,
            },
        ]
    },

]