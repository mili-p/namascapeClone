import { Forum } from "next/font/google";
import "../../public/assets/iconFonts/font-style.scss";
import MyErrorBoundary from "./ErrorBoundry";
import ReduxProvider from "@/app/components/ReduxProvider/ReduxProvider";
import "./style/global.scss";
import "react-datepicker/dist/react-datepicker.css";
const forum = Forum({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Namascape",
  description: "Namascape",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="144x144" href="/favicon144.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/favicon114.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/favicon72.png" />
        <link rel="apple-touch-icon" href="/favicon64.png" />
        <link rel="shortcut icon" sizes="196x196" href="/favicon196.png" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/x-icon" href="/favicon32.png" />
        <link rel="apple-touch-icon" sizes="258x258" href="/favicon258.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-HBK6EQMSGB');`,
          }}
        />
      </head>
      <body className={forum.className}>
        <iframe
          src="https://www.googletagmanager.com/gtag/js?id=G-HBK6EQMSGB"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
        {/* <ErrorBoundary > */}
        <MyErrorBoundary>
          {/* <Provider store={store}>{children}</Provider> */}
          <ReduxProvider>{children} </ReduxProvider>
        </MyErrorBoundary>
        {/* </ErrorBoundary> */}
      </body>
    </html>
  );
}
