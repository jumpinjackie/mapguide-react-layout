# Generalize map comparison beyond swipe

We will model paired-map comparison as a general **Comparison pair** with one active **Comparison mode** rather than treating swipe as the umbrella concept. ApplicationDefinition authoring will use `Comparison*` keys, and the viewer will expose **Swipe mode** and **Spy mode** as two mutually exclusive renderers over the same primary/secondary pair. We chose this because swipe-specific naming became misleading as soon as spy was introduced, and this is still early enough in the dev cycle to prefer a clean shared model over compatibility layers.
