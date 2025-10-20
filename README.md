# ⚡ CodePulse — AI-Powered Repository Health Analyzer

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![NextJS](https://img.shields.io/badge/NextJS-15-black?logo=nextdotjs)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?logo=tailwindcss)
![ShadcnUI](https://img.shields.io/badge/UI-shadcn/ui-9f7aea?logo=react)
![Clean Architecture](https://img.shields.io/badge/Architecture-Clean-green)
![Status](https://img.shields.io/badge/status-🚧_MVP_in_progress-orange)

> **CodePulse** es una herramienta impulsada por IA que analiza la **salud de tus repositorios** de GitHub: detecta code smells, evalúa la limpieza del código y propone mejoras estructurales.  
> Ideal para programadores que buscan mantener estándares de calidad en sus proyectos, desde **junior hasta senior**.

---

## 🧠 ¿Qué es CodePulse?

CodePulse nace con un objetivo claro:

> _Convertir el análisis de código en una experiencia inteligente, visual y accionable._

Con solo iniciar sesión mediante **GitHub OAuth**, puedes importar tus repositorios y obtener un **diagnóstico completo** del estado de tu código.  
Cada repositorio obtiene una **puntuación de salud (0 a 100)** basada en métricas objetivas y buenas prácticas de ingeniería de software.

---

## 🚀 Características principales

| Categoría                   | Descripción                                                                                           |
| --------------------------- | ----------------------------------------------------------------------------------------------------- |
| 🔍 **Análisis Inteligente** | La IA evalúa el código en busca de _code smells_, malas prácticas y estructuras complejas.            |
| 🧩 **Clean Code Score**     | Cada repositorio recibe una puntuación (0-100) basada en legibilidad, consistencia y arquitectura.    |
| 🧠 **Insights Accionables** | Sugerencias específicas para mejorar tu código, no solo métricas abstractas.                          |
| 🔐 **Login con GitHub**     | Integración directa con OAuth de GitHub: importa y analiza tus repos automáticamente.                 |
| 🧱 **Arquitectura Limpia**  | Separación clara en capas: UI & Infrastructure, Application, Domain.                                  |
| 🧑‍💻 **Interfaz moderna**     | Construida con **Next.js**, **TailwindCSS** y **Shadcn/UI**, priorizando rendimiento y accesibilidad. |

---

## 🧰 Stack Tecnológico

- **Frontend & Backend:** [Next.js 15](https://nextjs.org/)
- **UI:** [TailwindCSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Lógica de aplicación:** Clean Architecture (Domain, Application, Infrastructure)
- **Autenticación:** GitHub OAuth
- **Base de datos:** (en desarrollo — se prevé PostgreSQL o Supabase)
- **IA / Linter inteligente:** OpenAI API + reglas de análisis estático personalizadas
- **Despliegue:** Vercel / Railway (según entorno)
