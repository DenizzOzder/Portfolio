import path from "path";

export const pathAliases = {
  "@": path.resolve(__dirname, "./src"),
  "@components": path.resolve(__dirname, "./src/components"),
  "@ui": path.resolve(__dirname, "./src/components/ui"),
  "@effects": path.resolve(__dirname, "./src/components/effects"),
  "@icons": path.resolve(__dirname, "./src/components/icons"),
  "@hooks": path.resolve(__dirname, "./src/hooks"),
  "@utils": path.resolve(__dirname, "./src/utils"),
  "@types": path.resolve(__dirname, "./src/types"),
  "@store": path.resolve(__dirname, "./src/store"),
  "@assets": path.resolve(__dirname, "./src/assets"),
  "@layouts": path.resolve(__dirname, "./src/layouts"),
};
