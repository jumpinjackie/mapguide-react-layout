# MapGuide React Layout

This context describes the viewer initialization and map comparison language used to turn a fetched layout document into a ready-to-run viewer state and to describe how paired maps are visually compared.

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

### Map comparison

**Comparison pair**:
A primary map and secondary map that are intentionally compared within one viewer interaction.
_Avoid_: swipe pair when the concept is not specific to swipe

**Comparison mode**:
The active rendering mode used for a **Comparison pair**.
_Avoid_: swipe state, compare flag

**Swipe mode**:
A comparison mode that reveals the secondary map on one side of a movable divider while the primary map remains on the other side.
_Avoid_: generic compare mode, spy mode

**Spy mode**:
A comparison mode that shows the primary map normally and reveals the secondary map only inside a movable spy cursor.
_Avoid_: swipe mode, overlay mode

**Spy cursor**:
The movable circular reveal area used by **Spy mode** to show the secondary map over the primary map.
_Avoid_: divider, swipe handle

**Spy cursor radius**:
The size of the **Spy cursor** measured from its center to the edge of the circular reveal area.
_Avoid_: swipe position, divider position

## Relationships

- A **Document fetch stage** produces one **Init document** and one **Session reuse** flag
- An **Init payload stage** consumes one **Init document** and emits one INIT_APP payload
- A **Comparison pair** contains exactly one primary map and one secondary map
- A **Comparison pair** may be rendered using **Swipe mode** or **Spy mode**
- Exactly one **Comparison mode** may be active at a time
- **Spy mode** uses exactly one **Spy cursor**
- A **Spy cursor** has exactly one **Spy cursor radius**

## Example dialogue

> **Dev:** "Can we skip de-arrayification for newer servers without changing payload behavior?"
> **Domain expert:** "Yes, because the **Document fetch stage** may vary normalization, while the **Init payload stage** must always produce the same INIT_APP payload shape."

> **Dev:** "Does this map support swipe and spy?"
> **Domain expert:** "It supports a **Comparison pair**. **Swipe mode** and **Spy mode** are just two ways to render that same pair."

## Flagged ambiguities

- "init" was used to mean both fetching documents and building payloads — resolved: split into **Document fetch stage** and **Init payload stage**.
- "DefaultViewerInitCommand class" was used to describe the init payload stage implementation — resolved: the class holds no meaningful state (all three fields are implicit parameter threading); the `protected` extension surface has no subclasses; the class boundary causes a circular dependency between `init.ts` and `init-mapguide.ts`. The **Init payload stage** is implemented as free functions in `init-mapguide.ts` orchestrated directly from the `initAppFromDocument` thunk in `init.ts`, using the thunk closure for `dispatch` and `client`.
- "swipe pair" was used to mean both the paired-map relationship and the side-by-side rendering style — resolved: the paired-map relationship is a **Comparison pair**; **Swipe mode** and **Spy mode** are rendering modes over that pair.
