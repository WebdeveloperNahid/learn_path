export const COLORS = {
  oceanDark: "#0B3D3B",
  ocean: "#0E7C7B",
  oceanLight: "#14A39D",
  ocean50: "#EAF5F4",
  coral: "#F4623A",
  coralDark: "#DD4F2B",
  gold: "#F4A340",
  sand: "#FFF9F2",
  ink: "#1F2A2E",
  inkMuted: "#5B6B6E",
} as const;

export type ThemeColor = keyof typeof COLORS;