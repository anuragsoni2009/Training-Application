import { Exercise } from './exercise.model';
import { Subject } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { Inject } from '@angular/core';

export class TrainingService {

  
    exerciseChanged = new Subject<Exercise>();
    // exericesLoaded = new Subject<Exercise[]>();
    finishedExercisesChanged = new Subject<Exercise[]>();
    private availableExercises: Exercise[] =[];
    constructor( @Inject(AngularFirestore) private dB: AngularFirestore){}
    // = [
    //     { id: 123, name: 'Crunches', duration: 10, calories: 8 },
    //     { id: 12, name: 'Touch Toes', duration: 8, calories: 50 },
    //     { id: 4, name: 'Side Lunges', duration: 5, calories: 35 },
    //     { id: 7, name: 'Burpees', duration: 6, calories: 8 }
    // ]
    private runningExercise: Exercise;
    //private exercises: Exercise[] = [];
    getAvailableExercises() {
        return this.availableExercises.slice();
    }

    // fetchAvailableExercise(){
    //     this.dB.collection('AvailableExercises')
    //   .valueChanges().subscribe(
    //     (success:Exercise[])=>{
    //       this.availableExercises=success;
    //       console.log(success);
    //       this.exericesLoaded.next({...this.availableExercises});
    //     }
    //     );
        
    // }
    startExercise(selectedExercise: Exercise) {
        // this.runningExercise = this.availableExercises.find((ex) => {
        //     return ex.id === selectedId
        // });
        this.runningExercise = selectedExercise;
        this.exerciseChanged.next({
            ...this.runningExercise
        });
    }
    getRunningExercise() {
        return ({ ...this.runningExercise });
    }
    completeExercise() {
        this.addDataToDataBase({ ...this.runningExercise, date: new Date(), state: 'completed' });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }
    cancelExercise(progress: number) {
        this.addDataToDataBase({
            ...this.runningExercise, date: new Date(), state: 'cancelled',
            duration: this.runningExercise.duration * (progress / 100),
            calories: this.runningExercise.calories * (progress / 100)
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }
    // getCompletedAndCancelledExercises() {
    //     return this.exercises.slice();
    // }
    fetchCompletedAndCancelledExercises(){
        this.dB.collection('finishedExercises').valueChanges().subscribe(
            (exercises:Exercise[])=>{
                this.finishedExercisesChanged.next(exercises);
            }
        );
    }

    private addDataToDataBase(exercise:Exercise){
    this.dB.collection('finishedExercises').add(exercise);
    }
}
