import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SkillDetailComponent } from './skill-detail/skill-detail.component';
import {BusFactorListComponent} from './bus-factor-list/bus-factor-list.component';
import { MessagesComponent } from './messages/messages.component';
import {AppRoutingModule} from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { SkillSearchComponent } from './skill-search/skill-search.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavigationItemComponent } from './navigation-item/navigation-item.component';
import { EmployeeItemComponent } from './employee-item/employee-item.component';
import { PluralizePipe } from './shared/pipes/pluralize.pipe';
import { SkillItemComponent } from './skill-item/skill-item.component';

@NgModule({
  declarations: [
    AppComponent,
    BusFactorListComponent,
    SkillDetailComponent,
    EmployeeDetailComponent,
    MessagesComponent,
    DashboardComponent,
    SkillSearchComponent,
    HeaderComponent,
    SidebarComponent,
    NavigationItemComponent,
    EmployeeItemComponent,
    PluralizePipe,
    SkillItemComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
