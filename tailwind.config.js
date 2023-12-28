/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        cardPrimary: "var(--card-bg-primary-color)",
        cardSecondary: "var(--card-bg-secondary-color)",
        borderPrimary: "var(--border-primary)",
        textPrimary: "var(--text-primary)",
        iconsPrimary: "var(--icons-primary)",
        textSecondary: "var(--text-secondary)",
        borderSecondary: "var(--border-secondary)",
        cardBorder: "var(--card-border-color)",
        textLabel: "var(--text-label-color)",
        borderBottomPrimary: "var(--border-bottom-primary)",
        profileBgColor:"var(--profile-bg-color)",
        cardShadowSecondary:"var(--card-shadow-secondary)",
        buttonBgPrimaryColor:"var(--button-bg-primary-color)",
        buttonTextPrimaryColor:"var(--button-text-primary-color)",
        borderSubCard:"var(--border-subCard)",
        labelTextColor:"var(--text-label-color)",
        bioTextColor:"var (--bio-text-color)",
        professionalHeaderTextColor:"var(--professional-header-text-color)",
        primaryBlue:"var(--primary-blue)",
        profileAvatarBorder:"var(--profile-avatar-border)",
        loadingBtnBgColor:"var(--loading-btn-bg-color)",
        sidebarBgColor:"var(--sidebar-bg-color)",
        connectionBtnBgColor:"var(--connection-btn-bg-color)"
      },
    },
  },
  plugins: [],
};
