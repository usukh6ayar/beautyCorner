export const Theme = {
  colors: {
    light: {
      primary: "#7C73E6", // Зөөлөн ягаан-цэнхэр
      secondary: "#FF8A7A", // Уян хатан корал
      tertiary: "#2EB8AC", // Тайван ногоон-цэнхэр
      screenBackground: "#F8F9FA",
      cardBackground: "#FFFFFF",
      text: "#2D3748", // Хар саарал
      textSecondary: "#718096",
      border: "#E2E8F0",
      success: "#38A169", // Байгалийн ногоон
      warning: "#DD6B20", // Жигд улбар шар
      error: "#C53030", // Зөөлөн улаан
      info: "#4299E1", // Цэнхэр тэнгэр
    },
    dark: {
      primary: "#948CE6", // Цайвар ягаан-цэнхэр
      secondary: "#FF9F8E", // Цайвар корал
      tertiary: "#4FD1C5", // Цайвар циан
      screenBackground: "#1A202C",
      cardBackground: "#2D3748",
      text: "#E2E8F0", // Цайвар саарал
      textSecondary: "#A0AEC0",
      border: "#4A5568",
      success: "#48BB78", // Цайвар ногоон
      warning: "#ED8936", // Цайвар улбар шар
      error: "#FC8181", // Цайвар улаан
      info: "#63B3ED", // Цайвар цэнхэр
    },
    common: {
      white: "#FFFFFF",
      black: "#1A202C",
      disabled: "#CBD5E0", // Зөөлөн саарал
      pressed: "rgba(124, 115, 230, 0.1)", // Primary 10% opacity
    },
  },
  spacing: {
    base: 4,
    0: 0,
    1: 4, // xs
    2: 8, // sm
    3: 12, // md
    4: 16, // lg
    5: 24, // xl
    6: 32, // xxl
    7: 48, // 3xl
    8: 64, // 4xl
  },
  borderRadius: {
    none: 0, // 0px
    xs: 2, // 2px - жижиг элементүүдэд
    sm: 4, // 4px - toggle, tag
    base: 8, // 8px - кнопк, карт
    md: 12, // 12px - модал, том карт
    lg: 16, // 16px - их радиустай элементүүд
    xl: 24, // 24px - онцгой дугуй хэлбэр
    full: 9999, // Бүтэн дугуй хэлбэр
  },
  typography: {
    h1: {
      fontSize: 28,
      lineHeight: 36,
      fontWeight: "700",
      letterSpacing: -0.8,
    },
    h2: {
      fontSize: 24,
      lineHeight: 32,
      fontWeight: "600",
      letterSpacing: -0.6,
    },
    h3: { fontSize: 20, lineHeight: 28, fontWeight: "600" },
    bodyLg: { fontSize: 18, lineHeight: 26, fontWeight: "400" },
    body: { fontSize: 16, lineHeight: 24, fontWeight: "400" },
    caption: { fontSize: 14, lineHeight: 20, fontWeight: "400" },
    overline: {
      fontSize: 12,
      lineHeight: 16,
      fontWeight: "500",
      letterSpacing: 0.8,
    },
    weights: {
      light: "300",
      regular: "400",
      medium: "500",
      semiBold: "600",
      bold: "700",
    },
  },
  shadows: {
    xs: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    sm: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    md: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 4,
    },
    lg: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 6,
    },
  },
};
