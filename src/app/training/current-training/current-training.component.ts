import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  constructor(private dialog: MatDialog, private trainingService: TrainingService) { }
  progress = 0;
  timer:number;
  // @Output() trainingExit = new EventEmitter();
  ngOnInit() {
    this.startOrResumeTimer();
    }
    onStop(){
      clearInterval(this.timer);

      const dialogRef = this.dialog.open(StopTrainingComponent,{
        width:'400px',
        height:'200px',
        data:{
          progress:this.progress
        }

      });

      dialogRef.afterClosed().subscribe(
        (result)=>{
          console.log(result);
          if(result){
            // this.trainingExit.emit();
            this.trainingService.cancelExercise(this.progress);
            
          }else{
            this.startOrResumeTimer();
          }
        }
      );
    }
    startOrResumeTimer(){
      const step = ((this.trainingService.getRunningExercise().duration)/100)*1000;
      this.timer=setInterval(()=>{
        this.progress+=1;
        if(this.progress>=100){
          clearInterval(this.timer);
          this.trainingService.completeExercise();
        }
        },step)
    }
  }
