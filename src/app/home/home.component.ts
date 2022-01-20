import { Component, OnDestroy, OnInit } from "@angular/core";
import { interval, Observable, Subscription } from "rxjs";
import { map, filter } from "rxjs/operators";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription: Subscription;
  private customIntervalObservable: Subscription;
  constructor() {}

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe((count) => {
    //   console.log(count);
    // });
    let count = 0;
    const customIntervalObservable = new Observable((observer) => {
      setInterval(() => {
        observer.next(count);
        if (count === 2) {
          observer.complete();
          // observerable completes after count is 2
        }
        if (count > 3) {
          observer.error(new Error("Count greater than 3"));
        }
        count++;
      }, 1000);
    });
    let pipeTrail = customIntervalObservable.pipe(
      map((data: number) => {
        return "Round" + (data + 1);
      })
    );
    // this.firstObsSubscription =
    this.firstObsSubscription = pipeTrail.subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
        alert(error);
      },
      () => {
        console.log("completed");
      }
    );
  }
  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }
}
