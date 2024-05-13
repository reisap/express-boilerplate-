# Command tools

```
npm i -g redis-commander
redis-commander --redis-port=7379 //view store data on redis
```

# SOLID Programming Principles

Prevent problems

> What can go wrong ?
>
> Will go wrong ?

## Five Core Principles

1. S - single responsibility
2. O - Open/closed
3. L - Liskov substitution
4. I - Interface segregation
5. D - Dependecy Inversion

## General priciples Object Oriented (OO):

1. DRY (dont repeat yourself)
2. GRASP ( General responsibility assignment software principles)
3. TDD (Test driven development)

## 1. Interface segregation principle

-   Classes depend on the smallest interface
-   Help design good classes
-   Help write unit test cases

## 2. Liskov Substitution Principle

-   Object of some superclass S can be replaced with objects of any subclass of S
-   Constrains subclass design
-   This help design good polymorphism

## 3. Open/Closed Principle

-   "Open to extension means adding subclasses as needed
-   "Closed to modification" avoid tweaking the code to handle new situations

## 4. Dependecy Inversion Principle

-   A direct dependecy on a concrete class needs to be inverted to be indirect
-   Depend on abstract classes or interfaces
-   Avoid concrete class name dependencies

## 5. Single Responsibility Principle

-   One responsibility per class
-   Follow up queastions :
    -   at what level of abstraction?
    -   how are the responsibilities counted ?
-   Sometimes stated as "a class should have only one reason to change"

---
