# Type Tussle Quiz 🎮✨

> **A modern, interactive web quiz game that challenges your knowledge of Pokémon type effectiveness!**

Built with **React**, **TypeScript**, and **Tailwind CSS**, the app features animated battles, instant feedback, and a clean, modular architecture. Test your skills by predicting how effective different Pokémon types are against each other in a fun, visually engaging format. 🧠⚡️🔥🌱💧

---

🎥 This project was created for the Twitch channel [**lolochaa**](https://www.twitch.tv/lolochaa) — a Spanish channel where she usually plays Pokémon. ¡Síguela para más aventuras Pokémon! 🕹️🇪🇸

---

💖 **A special, wholesome thank you to [Pokémon Database](https://pokemondb.net/)** for generously hosting the Pokémon images we hotlink in this project. Your amazing resource helps trainers and fans everywhere — thank you for all you do! 🙏🎨

---

## Project info

## 📁 Feature-Based Folder Structure (2024 Migration)

This project uses a **feature-based folder structure** for improved maintainability, discoverability, and scalability.

```
src/
├── features/
│   ├── quiz/        # Quiz game logic, UI, hooks, config
│   ├── pokemon/     # Pokémon data, services, UI
│   └── battle/      # Type effectiveness, battle UI/services
├── shared/          # Shared UI components, services, types, config
├── data/            # Static JSON data (types, feedback, Pokémon list)
├── pages/           # Top-level route pages
├── assets/          # Static assets (sprites, images)
```

- **features/**: Each subfolder is a domain/feature (e.g., quiz, pokemon, battle) and contains its own `components/`, `hooks/`, `services/`, `types/`, and `config/` as needed.
- **shared/**: Contains UI components (shadcn), utility services, global types, and app-level config used across features.
- **data/**: Static JSON files for type effectiveness, feedback, Pokémon list, etc.
- **pages/**: Route-level React components.
- **assets/**: Images, sprites, and other static files.

**Path Aliases:**
- `@/features/*` → `src/features/*`
- `@/shared/*`   → `src/shared/*`
- `@/data/*`     → `src/data/*`
- `@/assets/*`   → `src/assets/*`

---Upda