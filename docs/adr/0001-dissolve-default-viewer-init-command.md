# Dissolve DefaultViewerInitCommand into free functions

`DefaultViewerInitCommand` was a class that orchestrated the init payload stage — creating runtime maps, building WebLayout/AppDef payloads, registering projections, and restoring selections on session reuse. It held three instance fields (`client`, `options`, `dispatch`) and three `protected` override points (`isArbitraryCoordSys`, `establishInitialMapNameAndSession`, `setupMaps`).

We dissolved it because:

1. All three instance fields were implicit parameter threading — the class was created, used once, and discarded. No field was meaningful state that persisted across calls.
2. The `protected` extension surface was vestigial — no subclass exists anywhere in the codebase and `@override` was present on methods that were never overridden.
3. The class boundary caused a circular import (`init.ts` → `init-mapguide.ts` → `init.ts`) that is eliminated when the class is removed.
4. The sole caller of `buildInitPayloadFromDocument` (the bridge function between the class and its consumers) was `initAppFromDocument`, a Redux thunk. The thunk already has `dispatch` in its closure and constructs `client` immediately before the call, making the bridge function unnecessary.

**Considered and rejected:** retaining the class with a local `IInitPayloadContext` data-bag to group the three threading values. This would have made the threading explicit without dissolving the class, but it would still have left the circular dependency and the vestigial `protected` surface, while providing no benefit over plain free functions.

**Outcome:** `DefaultViewerInitCommand` and `buildInitPayloadFromDocument` are removed. The init payload stage is implemented as module-level functions in `init-mapguide.ts`. `initAppFromDocument` in `init.ts` calls them directly, with `dispatch` from the thunk closure and `client` as a local variable.
