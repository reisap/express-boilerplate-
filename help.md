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

### 1. Interface segregation principle

-   memecah semua metode menjadi lebih kecil
-   inheritance vs composition (create new class)
-   Examine a class from the viewpoint of collaborators
-   For each collaborator :
    -   "what methods and attributes does this collaborator require ?"

> How can the Interface Segregation Principle (ISP) improve a design?
>
> ISP minimizes the interface upon which other components depend.
> When interfaces are minimized, it permits changes that won't have a disastrous impact elsewhere in the software.

### 2. Liskov Substitution Principle

    The Liskov Substitution Principle (LSP) assures that a superclass can be replaced by any of its subclasses.
    Liskov Substitution requires that a subclass be able to replace a superclass. The subclass may add features, but it cannot remove features.

-   Strong behavioral subtyping
-   Abstract Class
-   Contoh ketika kita ingin parsing sebuah file json, csv, dan xml. kita membuat sebuah class yang terpisah untuk tiap-tiap reader, sehingga di superclass hanya panggil yang diperlukan. terpisah dari superclass
-   Be sure every subclass can replace its superclass
-   **Duck typing principles kebalikannya dari liskov**

```
class X:
    def meth(self, a):
        return 2*a

class Y:
    def meth(self, a):
        return a+a
```

These two classes have the same interface, and can be used interchangeably, but they don't have a common superclass.

### 3. Open/Closed Principle

-   "Open to extension means adding subclasses as needed
-   "Closed to modification" avoid tweaking the code to handle new situations

### 4. Dependecy Inversion Principle

-   A direct dependecy on a concrete class needs to be inverted to be indirect
-   Depend on abstract classes or interfaces
-   Avoid concrete class name dependencies


