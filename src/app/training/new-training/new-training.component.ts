import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, Subscription } from 'rxjs';
// import { map} from 'rxjs/operators'
import 'rxjs/add/operator/map';
import { UiService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  
  // ngOnDestroy(): void {
  // this.exerciseSubscription.unsubscribe(); 
  // }

  @Output() trainingStart = new EventEmitter<void>();
   exercises:Exercise[];
   exerciseSubscription:Subscription;
  exercisesFeteched: boolean;
  //exercises: Observable<any>;
  constructor(private trainingService: TrainingService, private dB: AngularFirestore
    , private uiSerivice : UiService) { }

  ngOnInit() {
    // this.exercises=this.trainingService.getAvailableExercises();
    // now we will use angular firebase
    // this.exercises =

    this.dB.collection('AvailableExercises')
      .valueChanges().subscribe(
        (success:Exercise[])=>{
          this.exercisesFeteched = true;
          this.exercises=success;
          console.log(success);
        },
         (error)=>{
           let msg = 'Some error fetching the exercises from FireStore';
           this.uiSerivice.showSnackBar(msg , null , 3000);
           this.exercisesFeteched = false;
         }
        );
  //    this.exerciseSubscription= this.trainingService.exericesLoaded.subscribe(
  //    (success:Exercise[])=>{
  //      this.exercises=success;
  //    }
  //  );
  //  this.trainingService.fetchAvailableExercise();
  //  console.log(this.exercises);
  //  console.log('<><><<><><');

    // .map(docArray=>{
    //    return docArray.map(doc=>{
    //      return{
    //        id:doc.payload.doc.id, 
    //        name:doc.payload.doc.data().name,
    //        duration:doc.payload.doc.data().duration,
    //        calories:doc.payload.doc.data().calories 
    //      }
    //    })
    //  })
    //  .subscribe(
    //    (result)=>{
    //      for(const res of result){
    //       console.log(res.payload.doc.data());
    //      }
    //      console.log(result);
    //    }
    //  );
  }
  onStartTraining(form: NgForm) {
    // this.trainingStart.emit();
    console.log(form);
    this.trainingService.startExercise(form.value.train);

  }
}
