---
title: Geometric invariant theory
pubDate: 2020-09-05
description: This is a seminar on geometric invariant theory.
---

- **Organizers:** [Patrick Lei](index.html), Anna Abasheva  
- **When:** Friday 11am-12:30pm EDT  
- **Where:** math building or email Patrick for the link  
- [notes from the seminar](docs/notes/GIT.pdf)

Geometric invariant theory is an important tool in the study of moduli spaces in algebraic geometry. In particular, GIT is used to construct coarse moduli spaces. Some classical references are:

- **[MFK]** Mumford, Fogarty, Kirwan, *Geometric Invariant Theory*
- **[D]** Dolgachev, *Lectures on Invariant Theory*

Some more modern references with different perspectives that also discuss moduli theory are:

- **[H]** Hoskins, *Moduli Problems and Geometric Invariant Theory*
- **[T]** Tevelev, *Moduli Spaces and Invariant Theory*

The relationship between GIT and symplectic reduction is further expanded on in

- **[K]** Kirwan, *Cohomology of Quotients in Symplectic and Algebraic Geometry*

Classically, invariant theory focused on studying invariants of rings under group actions, for example

- **[N]** Nagata, *On the 14th Problem of Hilbert*

##### Schedule

| Date      | Speaker (Format)           | Title                                                         | Abstract |
|-----------|----------------------------|------------------------------------------------------------------------------|-----------------------|
| Sep 11    | Organizational Meeting     |                                                                              |                       |
| Sep 25    | Anna Abasheva (virtual)    | **Three approaches to GIT: overview and examples**                           | GIT rests on three pillars: invariant theory, the Hilbert-Mumford criterion, and symplectic reduction. They all serve one purpose, which is to construct the quotient of a variety by a group action. My goal is to give a short overview of the three approaches without giving complete proofs or even without giving them at all (we’ll be able to discuss all the proofs in detail later during the seminar). I’ll present several useful examples like toric varieties and moduli of finite sets of $n$ points in $\mathbb{P}^1$ for small $n$. They are nice to have in mind later when dealing with abstract concepts of GIT. During my talk, they will give us a taste of how the three pillars are related and in which cases their methods may be used in practice. |
| Oct 02    | Caleb Ji (board talk)      | **Preliminaries**                                                            | In this talk, I will present the basic definitions and properties of categorical quotients and geometric quotients as written in Chapter 0 of **[MFK]**. This material consists mainly of technical scheme-theoretic statements, some of which I will prove in detail and some of which I will illustrate with examples.  <br />*Reference: **[MFK]**, Chapter 0* |
| Oct 09    | Alex Xu (board talk)       | **Actions of Reductive Algebraic Groups**                                    | This week, we continue on to Chapter 1 of **[MFK]** with some fundamental theorems on the actions of reductive algebraic groups. In particular, we will find some criterion for existence of geometric and categorical quotients.  <br />*Reference: **[MFK]**, Chapter 1* |
| Oct 16    | Patrick Lei (board talk)   | **Stability**                                                                | We will present the Hilbert-Mumford stability criterion. Then we will briefly discuss Mumford’s “flag complex,” which is really the geometric realization of a Bruhat-Tits building. We conclude with a detailed discussion of two examples where we use the Hilbert-Mumford stability criterion to determine the set of (semi)stable points: the moduli space of $n$ points in $\mathbb{P}^1$ and the moduli space of plane cubics.  <br />*Reference: **[MFK]**, Chapter 2, **[H]**, Section 7* |
| Oct 23    | Nicolás Vilches (board talk) | **More Examples of Stability**                                              | During the previous sessions we have discussed the basic machinery needed to construct GIT quotients. We will study more examples, such as the action of matrices by conjugation, plane quartics and ordered tuples of points in projective space. When possible, we will discuss different approaches to find the semistable locus, such as computing the ring of invariant functions or applying the Hilbert-Mumford criterion. These examples will be as explicit as possible, which will give us insight on some features of the GIT (such as how the semistable locus depends on the line bundle).  <br />*Reference: **[D]**, **[T]**, **[MFK]**, Chapters 3, 4* |
| Oct 30    | Morena Porzio (board talk) | **GIT and Coarse Moduli Problems (Part 1)**                                  | The lecture will focus on one of the main motivations of GIT, which is to construct moduli spaces as quotients of schemes. After giving a brief introduction of what a moduli problem is and how GIT helps for fine moduli problems, we will clarify what objects are suitable for stating a coarse moduli problem. This leads to definitions like those of polarized schemes and (pre)stable curves. Examples will include the moduli space of elliptic curves $M_{1,1}$, the space $M_g$ of smooth curves of genus $g$, and the space $\overline{M}_g$ of stable curves of genus $g$. |
| Nov 06    | Morena Porzio (board talk) | **GIT and Coarse Moduli Problems (Part 2)**                                  | Let’s pick up where we left off, namely from the smooth and compactness conditions that arise from coarse moduli problems. We will prove that $M_g$ has a coarse moduli space by describing the connection between $M_g$ and the Hilbert scheme and reducing representability to a question of stability on Chow varieties. If there is time, we will mention the generalization of this method to the problem of moduli for abelian varieties. |
| Nov 13    | Kuan-Wen Chen (board talk) | **GIT and the Moment Map**                                                   | In this talk, I will first introduce the moment map in symplectic geometry and give several examples. Later I will discuss the relationship between the symplectic quotient and the GIT quotient. If time permits, we will also discuss how to apply equivariant Morse theory to compute the Betti numbers of the symplectic quotient. |
| Nov 20    | Alex Xu (board talk)       | **GIT Quotients of Symplectic Manifolds**                                    | We continue from last week on the relationship between symplectic and GIT quotients. We first consider the case for quotients of Kähler and hyperkähler manifolds, and show that the quotient of the properly stable locus carries a natural Kähler (or hyperkähler) structure. Afterwards, we switch gears and discuss desingularization of the quotient via blowups, and discuss differences between GIT and symplectic quotients. If time permits, we will discuss some Yang-Mills theory.  <br />*Reference: **[MFK]**, Chapter 8* |
| Nov 27    | No Seminar (Thanksgiving)  |                                                                              |                       |
| Dec 04    | Patrick Lei (board talk)   | **Everything you need to know about Morena’s lectures**                       | We will discuss stability of Chow points of curves in projective space and then construct a morphism between the Hilbert scheme and the Chow variety. This talk will largely fill in details left out of Morena’s lectures. Disclaimer: This talk will not cover everything discussed in Morena’s lectures. No stacks were harmed during the creation of this lecture.  <br />*Reference: **[MFK]**, Sections 4.6, 5.4* |
| Dec 11    | Nicolás Vilches (board talk) | **The moduli space of stable curves**                                       | In the previous weeks we have been working on the moduli space of smooth curves using GIT. This approach not only gives us a quasiprojective variety, but also a natural compactification. We will discuss on how this new space is not only a projective variety, but also a moduli space of stable curves. Then, we will consider stable reduction theorems, which allow us to compute stable limits of degenerations of curves. The discussion will be guided by some explicit examples, which will highlight the key elements of the proof. |
