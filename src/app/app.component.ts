import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from './common/base.component';
import { DemoService } from './demo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BaseComponent implements OnInit {
  constructor(private demoService: DemoService, private http: HttpClient) {
    super();
  }

  ngOnInit(): void {

      this.demoService.getProcesses().subscribe(res => {

        console.log(res);
      });

    this.demoService
      .getProcessById('fe0b9425-5bf4-eb11-814b-005056b3b3f1')
      // .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res) => {
          console.log(res)
        },
        (err) => {
          console.log(err);
        }
      );

    // this.demoService
    // .createProcess({
    //   userId: 0,
    //   parentAreaId: "string",
    //   name: "string",
    //   description: "string"
    // })
  }
  title = 'AngularDemo';
}
