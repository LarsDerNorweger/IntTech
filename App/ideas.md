# Struktur

.
├── build.js                        # Konfiguration für Buildscript
├── css                             # Ablageort für Sass
│   └── main.sass                   
├── error.htm
├── index.htm                       # Einstiegspunkt
├── lib                             # genutzte Bibliotheken
│   └── pico-1.5.9                  # werden mit compiliert legal wegen MIT licence    
│       ├── LICENSE.md
│       ├── pico.css
│       └── pico.css.map
├── .out                            # Ausgabe für Typescript & Sass
│ 
├── .outTest                        # Ausgabe der Tests
│   
├── package.json                    # npm relevant
├── package-lock.json
├── sprites                         # Ablageort für interne Graphiken
│   ├── tux_sprite_front.png
│   ├── tux_sprite_rotated.png
│   └── windows_logo_sprite.png
├── src                             # Typescript
│   ├── commandList.ts
│   ├── content
│   │   ├── info.ts
│   │   └── settings.ts
│   ├── game
│   │   ├── Entity.ts
│   │   ├── Globals.ts
│   │   ├── interfaces.ts
│   │   ├── Manager.ts
│   │   ├── ObstacleManager.ts
│   │   ├── obstacle.ts
│   │   ├── PhysikalEntity.ts
│   │   ├── player.ts
│   │   └── scene.ts
│   ├── GameImplemenation.ts
│   ├── helpers                     # Alles ohne direkten Bezug zur implementierung
│   │   ├── Area.test.ts
│   │   ├── Area.ts
│   │   ├── Assert.test.ts
│   │   ├── Assert.ts
│   │   ├── Collision.test.ts
│   │   ├── Collision.ts
│   │   ├── dom.ts
│   │   ├── ImageBuffer.ts
│   │   ├── localStorage.ts
│   │   ├── picoCss.ts             # VEreinfacht bedienung von picocss
│   │   ├── SelectionManager.ts
│   │   └── Vektor.ts               
│   ├── main.ts
│   ├── page.ts
│   └── resources.ts
├── Todo.md
├── tsconfig.json                  # Konfiguration für Projekt 
├── tsconfig.test.json             # Konfiguration für Tests 
└── .vscode                        # VsCode Configuration
    ├── launch.json                # Konfiguriert Debugging
    ├── settings.json              
    └── tasks.json                 # KOnfiguriert automatisierte Aufgaben
