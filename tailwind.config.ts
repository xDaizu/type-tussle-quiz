import type { Config } from "tailwindcss";

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
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'bounce-in': 'bounce-in 0.6s ease-out',
				'slide-in': 'slide-in 0.5s ease-out',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
	safelist: [
		// Base classes
		'from-normal', 'from-fire', 'from-water', 'from-grass', 'from-electric', 'from-ice', 'from-fighting', 'from-poison', 'from-ground', 'from-flying', 'from-psychic', 'from-bug', 'from-rock', 'from-ghost', 'from-dragon', 'from-dark', 'from-steel', 'from-fairy',
		'to-normal', 'to-fire', 'to-water', 'to-grass', 'to-electric', 'to-ice', 'to-fighting', 'to-poison', 'to-ground', 'to-flying', 'to-psychic', 'to-bug', 'to-rock', 'to-ghost', 'to-dragon', 'to-dark', 'to-steel', 'to-fairy',
		'text-normal', 'text-fire', 'text-water', 'text-grass', 'text-electric', 'text-ice', 'text-fighting', 'text-poison', 'text-ground', 'text-flying', 'text-psychic', 'text-bug', 'text-rock', 'text-ghost', 'text-dragon', 'text-dark', 'text-steel', 'text-fairy',
		// Opacity variants
		'from-normal/80', 'from-fire/80', 'from-water/80', 'from-grass/80', 'from-electric/80', 'from-ice/80', 'from-fighting/80', 'from-poison/80', 'from-ground/80', 'from-flying/80', 'from-psychic/80', 'from-bug/80', 'from-rock/80', 'from-ghost/80', 'from-dragon/80', 'from-dark/80', 'from-steel/80', 'from-fairy/80',
		'to-normal/80', 'to-fire/80', 'to-water/80', 'to-grass/80', 'to-electric/80', 'to-ice/80', 'to-fighting/80', 'to-poison/80', 'to-ground/80', 'to-flying/80', 'to-psychic/80', 'to-bug/80', 'to-rock/80', 'to-ghost/80', 'to-dragon/80', 'to-dark/80', 'to-steel/80', 'to-fairy/80',
		'from-normal/60', 'from-fire/60', 'from-water/60', 'from-grass/60', 'from-electric/60', 'from-ice/60', 'from-fighting/60', 'from-poison/60', 'from-ground/60', 'from-flying/60', 'from-psychic/60', 'from-bug/60', 'from-rock/60', 'from-ghost/60', 'from-dragon/60', 'from-dark/60', 'from-steel/60', 'from-fairy/60',
		'to-normal/60', 'to-fire/60', 'to-water/60', 'to-grass/60', 'to-electric/60', 'to-ice/60', 'to-fighting/60', 'to-poison/60', 'to-ground/60', 'to-flying/60', 'to-psychic/60', 'to-bug/60', 'to-rock/60', 'to-ghost/60', 'to-dragon/60', 'to-dark/60', 'to-steel/60', 'to-fairy/60',
		'from-normal/30', 'from-fire/30', 'from-water/30', 'from-grass/30', 'from-electric/30', 'from-ice/30', 'from-fighting/30', 'from-poison/30', 'from-ground/30', 'from-flying/30', 'from-psychic/30', 'from-bug/30', 'from-rock/30', 'from-ghost/30', 'from-dragon/30', 'from-dark/30', 'from-steel/30', 'from-fairy/30',
		'to-normal/30', 'to-fire/30', 'to-water/30', 'to-grass/30', 'to-electric/30', 'to-ice/30', 'to-fighting/30', 'to-poison/30', 'to-ground/30', 'to-flying/30', 'to-psychic/30', 'to-bug/30', 'to-rock/30', 'to-ghost/30', 'to-dragon/30', 'to-dark/30', 'to-steel/30', 'to-fairy/30',
		// bg-type classes
		'bg-normal', 'bg-fire', 'bg-water', 'bg-grass', 'bg-electric', 'bg-ice', 'bg-fighting', 'bg-poison', 'bg-ground', 'bg-flying', 'bg-psychic', 'bg-bug', 'bg-rock', 'bg-ghost', 'bg-dragon', 'bg-dark', 'bg-steel', 'bg-fairy',
		'bg-normal/80', 'bg-fire/80', 'bg-water/80', 'bg-grass/80', 'bg-electric/80', 'bg-ice/80', 'bg-fighting/80', 'bg-poison/80', 'bg-ground/80', 'bg-flying/80', 'bg-psychic/80', 'bg-bug/80', 'bg-rock/80', 'bg-ghost/80', 'bg-dragon/80', 'bg-dark/80', 'bg-steel/80', 'bg-fairy/80',
		'bg-normal/60', 'bg-fire/60', 'bg-water/60', 'bg-grass/60', 'bg-electric/60', 'bg-ice/60', 'bg-fighting/60', 'bg-poison/60', 'bg-ground/60', 'bg-flying/60', 'bg-psychic/60', 'bg-bug/60', 'bg-rock/60', 'bg-ghost/60', 'bg-dragon/60', 'bg-dark/60', 'bg-steel/60', 'bg-fairy/60',
		'bg-normal/30', 'bg-fire/30', 'bg-water/30', 'bg-grass/30', 'bg-electric/30', 'bg-ice/30', 'bg-fighting/30', 'bg-poison/30', 'bg-ground/30', 'bg-flying/30', 'bg-psychic/30', 'bg-bug/30', 'bg-rock/30', 'bg-ghost/30', 'bg-dragon/30', 'bg-dark/30', 'bg-steel/30', 'bg-fairy/30',
	],
} satisfies Config;
