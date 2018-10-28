# JavaScript Airport Challenge - Makers Week 5

## Overview

This is the Maker's week 5 javascript testing challenge. It is based on the airport weekend challenge that we originally completed in week 1. The original challenge was implemented in Ruby using RSpec to test the code.

In this challenge, I reimplemented the Airport challenge from scratch in javascript using Jasmine as the testing framework.

I made good use of both feature and unit tests.

All javascript objects follow the single responsibility principle where each object has specific behaviour and state related to a single responsibility.

The code objects show high cohesion and low coupling. Dependencies are injected into objects that rely on other objects to function correctly.

I made good use of mocking and stubing when unit testing. e.g. all objects can be individually unit tested through mocking dependencies. The random behaviour of the weather object is overridden with a stub where appropriate.

## Get Started

- clone this repository
  - `git clone git@github.com:jonurry/airport-js.git`
- run the tests

  - `npm test`

  or

  - `open SpecRunner.html`

## Approach to testing

The feature and unit tests were implemented in Jasmine.

I used the red, green, refactor process whilst testing.

1. Test drive a feature
2. When this fails create a unit test for a class that matches the failure
3. Fix the failure by implementing code to pass the tests
4. It may require further unit tests and code to fully satisfy the feature test
5. Refactor
6. Try to complete each cycle in 15 mins
