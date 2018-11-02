import { Action } from 'redux'
import { ActionsObservable, ofType } from 'redux-observable'
import { map } from 'rxjs/operators'

const enum ActionTypes {
  One = 'ACTION_ONE',
  Two = 'ACTION_TWO',
}

const doOne = (myStr: string): One => ({ type: ActionTypes.One, myStr })

const doTwo = (myBool: boolean): Two => ({ type: ActionTypes.Two, myBool })

interface One extends Action {
  type: ActionTypes.One
  myStr: string
}

interface Two extends Action {
  type: ActionTypes.Two
  myBool: boolean
}

type Actions = One | Two

const epic = (action$: ActionsObservable<Actions>) =>
  action$.pipe(
    ofType<Actions, One>(ActionTypes.One),
    map((action) => ({
        type: ActionTypes.Two,
        myBool: action.myStr === 'Hello, world!'
    }))
  )
