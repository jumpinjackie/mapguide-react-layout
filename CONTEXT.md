# MapGuide React Layout

This context describes the viewer initialization language used to turn a fetched layout document into a ready-to-run viewer state.

## Language

**Init document**:
A layout document consumed by initialization, represented as either ApplicationDefinition or WebLayout.
_Avoid_: appdef only, raw layout, init payload

**Document fetch stage**:
The stage that obtains an init document and session metadata before payload construction.
_Avoid_: init command, monolithic init

**Init payload stage**:
The stage that transforms an init document into the INIT_APP payload shape.
_Avoid_: document fetch, session bootstrap

**Session reuse**:
Initialization metadata indicating that an existing MapGuide session was reused instead of creating a new one.
_Avoid_: warm start, cached login

## Relationships

- A **Document fetch stage** produces one **Init document** and one **Session reuse** flag
- An **Init payload stage** consumes one **Init document** and emits one INIT_APP payload

## Example dialogue

> **Dev:** "Can we skip de-arrayification for newer servers without changing payload behavior?"
> **Domain expert:** "Yes, because the **Document fetch stage** may vary normalization, while the **Init payload stage** must always produce the same INIT_APP payload shape."

## Flagged ambiguities

- "init" was used to mean both fetching documents and building payloads — resolved: split into **Document fetch stage** and **Init payload stage**.
- "DefaultViewerInitCommand class" was used to describe the init payload stage implementation — resolved: the class holds no meaningful state (all three fields are implicit parameter threading); the `protected` extension surface has no subclasses; the class boundary causes a circular dependency between `init.ts` and `init-mapguide.ts`. The **Init payload stage** is implemented as free functions in `init-mapguide.ts` orchestrated directly from the `initAppFromDocument` thunk in `init.ts`, using the thunk closure for `dispatch` and `client`.
