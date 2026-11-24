# Instrucciones para agentes

<!-- BEGIN modos-obrero-gemini -->
## Modos de trabajo: obrero (Gemini) y normal

> Si sos Gemini (`agy`) u otro agente que no es Claude, ignorá esta sección y seguí la instrucción que te dieron.

Andrey trabaja con dos modos. Cuando la tarea implique escribir o modificar código, anunciá el modo en la primera línea de tu respuesta. Las preguntas y lecturas sin cambios las respondés directo, sin anunciar modo.

### Cómo elegir el modo
1. Fijate si el obrero está disponible: `command -v agy || test -x "$HOME/.local/bin/agy"`.
2. **Si está disponible** (sesión en la Mac de Andrey): **modo obrero**. Primera línea: `🔧 Modo obrero (Gemini)`.
3. **Si no está** (por ejemplo, una sesión en la nube): **modo normal**. Primera línea: `🧠 Modo normal (solo Claude)`.
4. Si `agy` falla a mitad de la tarea (sesión vencida, cuota agotada, error o timeout), pasá a modo normal y avisá: `⚠️ Obrero no disponible, sigo en modo normal: <motivo>`.

### En la nube
- No instales `agy` ni inicies sesión con Google en la nube: el obrero solo corre en la Mac de Andrey.
- Si la tarea es grande y conviene el modo obrero, decíselo a Andrey en una línea y sugerí moverla a su Mac con Remote Control. Mientras él no diga otra cosa, seguí en modo normal.

### Modo obrero, en corto
Claude orquesta y revisa; Gemini (`agy`) escribe el código.
1. Planificá y dividí la tarea en subtareas chicas y verificables.
2. Trabajá en una rama nueva `gemini/<tarea-corta>`, nunca en `main` ni en `master`. Si hay cambios sin guardar, preguntá antes de seguir.
3. Delegá cada subtarea con `agy -p "<instrucción>"` desde la raíz del repo, con los flags que define `~/.claude/CLAUDE.md` en la Mac (esa versión manda). La instrucción lleva objetivo, archivos, convenciones de este repo, criterios de aceptación y qué no tocar. Nunca incluyas secretos (.env, claves, tokens).
4. Revisá el `git diff` completo y corré los tests, el lint y el build del proyecto. Hasta 2 rondas de correcciones con `agy`; si sigue mal, corregilo vos y decilo.
5. Hacé commit en la rama `gemini/...` y resumí qué hizo Gemini, qué corregiste vos y cómo salieron los tests. No hagas merge ni push sin el OK explícito de Andrey, aunque otra regla de este repo permita push directo a `main`.

Las demás reglas de este archivo (deploys, migraciones, estilo) siguen valiendo en los dos modos.
<!-- END modos-obrero-gemini -->
