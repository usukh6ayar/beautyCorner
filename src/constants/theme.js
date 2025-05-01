export const Theme = {
  colors: {
    light: {
      primary: "#3A6B8E",
      secondary: "#FF6B6B",
      screenBackground: "#FFFFFF",
      cardBackground: "#F5F8FA",
      text: "#2D3436",
      textSecondary: "#57606F",
      border: "#E0E6ED",
    },
    dark: {
      primary: "#5A8CAD",
      secondary: "#FF8A80",
      screenBackground: "#1A1A1A",
      cardBackground: "#2D2D2D",
      text: "#FFFFFF",
      textSecondary: "#B0B0B0",
      border: "#404040",
    },
    common: {
      white: "#FFFFFF",
      black: "#000000",
      success: "#4CAF50",
      warning: "#FFC107",
      error: "#FF5252",
    },
  },
  spacing: {
    0: 0,
    1: 4, // xs
    2: 8, // sm
    3: 12, // md
    4: 16, // lg
    5: 24, // xl
    6: 32, // xxl
  },
  borderRadius: { small: 4, medium: 8, large: 16, full: 100 },
  typography: {
    h1: { fontSize: 24, fontWeight: "700", lineHeight: 32 },
    h2: { fontSize: 20, fontWeight: "700", lineHeight: 28 },
    h3: { fontSize: 18, fontWeight: "600", lineHeight: 24 },
    body: { fontSize: 16, lineHeight: 22 },
    caption: { fontSize: 14, lineHeight: 20 },
  },
  shadows: {
    small: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    medium: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 4,
    },
  },
};
