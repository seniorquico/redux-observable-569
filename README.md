A simple project that demonstrate a redux-observable problem when used with RxJS 6.3.3 and TypeScript's `strict` compiler option.

https://github.com/redux-observable/redux-observable/issues/569

The examples are copied from the (Troubleshooting guide)[https://redux-observable.js.org/docs/Troubleshooting.html].

I tested using:

```bash
$ yarn install
$ yarn run test-pass
$ yarn run test-fail
$ yarn run test-fail-nostrict
```

As discussed on the issue, explicitly defining the `T` and `R` generic type arguments when calling `ofType` succeeds when the `strict` compiler option is enabled:

```bash
$ yarn run test-pass
Done in 1.00s.
```

However, leaving the Troubleshooting guide's example as-is (only defining the `T` generic type argument) fails when the `strict` compiler option is enabled:

```bash
$ yarn run test-fail
test-fail.ts:28:5 - error TS2345: Argument of type '(source: Observable<One>) => Observable<One>' is not assignable to parameter of type 'OperatorFunction<Actions, One>'.
  Types of parameters 'source' and 'source' are incompatible.
    Type 'Observable<Actions>' is not assignable to type 'Observable<One>'.
      Type 'Actions' is not assignable to type 'One'.
        Type 'Two' is not assignable to type 'One'.
          Property 'myStr' is missing in type 'Two'.

28     ofType<One>(ActionTypes.One),
       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

The Troubleshooting guide's example succeeds when the `strict` compiler option is disabled:

```bash
$ yarn run test-fail-nostrict
Done in 1.00s
```
