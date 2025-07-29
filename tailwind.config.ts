import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import { generatePokemonTypeSafelist } from "./src/shared/config/tailwindSafelist";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Pokemon type colors
				fire: 'hsl(var(--fire))',
				water: 'hsl(var(--water))',
				grass: 'hsl(var(--grass))',
				electric: 'hsl(var(--electric))',
				steel: 'hsl(var(--steel))',
				rock: 'hsl(var(--rock))',
				psychic: 'hsl(var(--psychic))',
				poison: 'hsl(var(--poison))',
				normal: 'hsl(var(--normal))',
				ice: 'hsl(var(--ice))',
				ground: 'hsl(var(--ground))',
				ghost: 'hsl(var(--ghost))',
				flying: 'hsl(var(--flying))',
				bug: 'hsl(var(--bug))',
				dark: 'hsl(var(--dark))',
				dragon: 'hsl(var(--dragon))',
				fairy: 'hsl(var(--fairy))',
				fighting: 'hsl(var(--fighting))',
				// Effectiveness colors
				'super-effective': 'hsl(var(--super-effective))',
				'not-very-effective': 'hsl(var(--not-very-effective))',
				'no-effect': 'hsl(var(--no-effect))',
				'normal-effective': 'hsl(var(--normal-effective))',
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			backgroundImage: {
				'arena-gradient': 'var(--arena-gradient)',
			},
			boxShadow: {
				'card': 'var(--card-shadow)',
				'card-inset': 'var(--card-shadow-inset)',
				'pokemon-glow': 'var(--pokemon-glow)',
				'button': 'var(--button-shadow)',
				'button-pressed': 'var(--button-shadow-pressed)',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'bounce-in': {
					'0%': { transform: 'scale(0.8)', opacity: '0' },
					'50%': { transform: 'scale(1.1)', opacity: '0.8' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'slide-in': {
					'0%': { transform: 'translateX(-100%)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				'pulse-glow': {
					'0%, 100%': { boxShadow: '0 0 20px hsl(var(--accent) / 0.3)' },
					'50%': { boxShadow: '0 0 30px hsl(var(--accent) / 0.6)' }
				},
				'shake': {
					'0%, 100%': { transform: 'translateX(0) rotate(0deg)' },
					'15%': { transform: 'translateX(-10px) rotate(-4deg)' },
					'30%': { transform: 'translateX(-18px) rotate(-8deg)' },
					'60%': { transform: 'translateX(14px) rotate(6deg)' },
					'72%': { transform: 'translateX(6px) rotate(2deg)' },
					'75%': { transform: 'translateX(-12px) rotate(-6deg)' },
					'85%': { transform: 'translateX(-4px) rotate(-2deg)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'bounce-in': 'bounce-in 0.6s ease-out',
				'slide-in': 'slide-in 0.5s ease-out',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'shake': 'shake 2s ease-in-out both'
			}
		}
	},
	plugins: [tailwindcssAnimate],
	safelist: [
		...generatePokemonTypeSafelist(),
		// Add any additional classes that need to be safelisted here
		'other-class',
		'another-class',
		// Add more classes as needed...
	],
} satisfies Config;
