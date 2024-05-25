import i18n from "i18next";                      
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next)
  .init({
    lng: "de",
    fallbackLng: "en",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          cat_salary: "Salary",
          cat_savings: "Savings",
          cat_account_savings: "Account savings",
          cat_debt: "Debt",
          cat_living: "Living expenses",
          cat_housing: "Housing",
          cat_kids: "Kids",
          cat_insurance: "Insurances",
          cat_car: "Car",
          cat_communication: "Communication",
          cat_various: "Various",
          cat_unknown: "Unknown",
          total_amount: "Total",
          open_files: "Open files",
          opened: "opened",
          no_time_range: "no time range available",
          title_options: "Options",
          title_records: "Transactions"
        },
      },
      de: {
        translation: {
            cat_salary: "Gehalt",
            cat_savings: "Sparen",
            cat_account_savings: "Kontosparen",
            cat_debt: "Schulden",
            cat_living: "Lebenshaltung",
            cat_housing: "Nebenkosten",
            cat_kids: "Kinder",
            cat_insurance: "Versicherungen",
            cat_car: "Auto",
            cat_communication: "Kommunikation",
            cat_various: "Sonstiges",
            cat_unknown: "Nicht zugeordnet",
            total_amount: "Summe",
            open_files: "Dateien öffnen",
            opened: "geöffnet",
            no_time_range: "keine Datumsinformationen geladen",
            title_options: "Optionen",
            title_records: "Buchungen"
        },
      },
    },
  });

export default i18n;