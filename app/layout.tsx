import './globals.css';
import { Inter } from 'next/font/google';
import Button from './components/button';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="sticky top-0 z-50 flex h-auto w-full shrink-0 items-center justify-between border-b bg-background px-4 py-2 backdrop-blur-sm">
          <a href="/">
            <div className="font-bold text-lg flex gap-x-0.5">
              Chatbot
              <svg viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 inline mr-0 w-4 w-5 mb-0.5">
                <path d="M7.73047 16.2559C7.81836 16.2559 7.88916 16.2266 7.94287 16.168C8.00146 16.1143 8.03809 16.0435 8.05273 15.9556C8.15039 15.1841 8.25781 14.5347 8.375 14.0073C8.49707 13.48 8.6582 13.0479 8.8584 12.7109C9.05859 12.374 9.32471 12.1055 9.65674 11.9053C9.98877 11.7051 10.4136 11.5513 10.9312 11.4438C11.4536 11.3315 12.0933 11.2339 12.8501 11.1509C12.9429 11.1411 13.0161 11.1069 13.0698 11.0483C13.1284 10.9897 13.1577 10.9165 13.1577 10.8286C13.1577 10.7407 13.1284 10.6675 13.0698 10.6089C13.0161 10.5503 12.9429 10.5161 12.8501 10.5063C12.0933 10.4233 11.4536 10.3281 10.9312 10.2207C10.4136 10.1084 9.98877 9.95215 9.65674 9.75195C9.32471 9.55176 9.05859 9.2832 8.8584 8.94629C8.6582 8.60938 8.49707 8.17725 8.375 7.6499C8.25781 7.12256 8.15039 6.4707 8.05273 5.69434C8.03809 5.61133 8.00146 5.54297 7.94287 5.48926C7.88916 5.43066 7.81836 5.40137 7.73047 5.40137C7.64258 5.40137 7.56934 5.43066 7.51074 5.48926C7.45703 5.54297 7.42285 5.61133 7.4082 5.69434C7.31543 6.4707 7.20801 7.12256 7.08594 7.6499C6.96875 8.17725 6.80762 8.60938 6.60254 8.94629C6.40234 9.2832 6.13623 9.55176 5.8042 9.75195C5.47217 9.95215 5.04736 10.1084 4.52979 10.2207C4.01221 10.3281 3.37256 10.4233 2.61084 10.5063C2.51807 10.5161 2.44238 10.5503 2.38379 10.6089C2.3252 10.6675 2.2959 10.7407 2.2959 10.8286C2.2959 10.9165 2.3252 10.9897 2.38379 11.0483C2.44238 11.1069 2.51807 11.1411 2.61084 11.1509C3.36768 11.2485 4.00488 11.3584 4.52246 11.4805C5.04004 11.5977 5.4624 11.7539 5.78955 11.9492C6.12158 12.1445 6.3877 12.4082 6.58789 12.7402C6.78809 13.0674 6.94922 13.4922 7.07129 14.0146C7.19336 14.5371 7.30566 15.1841 7.4082 15.9556C7.42285 16.0435 7.45703 16.1143 7.51074 16.168C7.56934 16.2266 7.64258 16.2559 7.73047 16.2559ZM3.03564 8.57275C3.09424 8.57275 3.14307 8.55322 3.18213 8.51416C3.22119 8.4751 3.24316 8.42871 3.24805 8.375C3.31152 7.91113 3.375 7.55225 3.43848 7.29834C3.50195 7.03955 3.60205 6.84668 3.73877 6.71973C3.87549 6.58789 4.07812 6.48535 4.34668 6.41211C4.61523 6.33887 4.98877 6.25586 5.46729 6.16309C5.59424 6.14355 5.65771 6.07275 5.65771 5.95068C5.65771 5.89209 5.63818 5.8457 5.59912 5.81152C5.56494 5.77246 5.521 5.74805 5.46729 5.73828C4.98877 5.66992 4.61279 5.604 4.33936 5.54053C4.0708 5.47217 3.86816 5.37207 3.73145 5.24023C3.59961 5.10352 3.50195 4.90332 3.43848 4.63965C3.375 4.37109 3.31152 4.00244 3.24805 3.53369C3.2334 3.40186 3.1626 3.33594 3.03564 3.33594C2.90869 3.33594 2.83545 3.4043 2.81592 3.54102C2.76221 4 2.70361 4.35889 2.64014 4.61768C2.57666 4.87646 2.47656 5.07178 2.33984 5.20361C2.20312 5.33057 1.99805 5.43066 1.72461 5.50391C1.45605 5.57227 1.08252 5.65039 0.604004 5.73828C0.477051 5.7627 0.413574 5.8335 0.413574 5.95068C0.413574 6.07275 0.486816 6.14355 0.633301 6.16309C1.10205 6.24609 1.4707 6.32178 1.73926 6.39014C2.0127 6.4585 2.21533 6.55859 2.34717 6.69043C2.479 6.82227 2.57666 7.02002 2.64014 7.28369C2.70361 7.54248 2.76221 7.90381 2.81592 8.36768C2.83545 8.50439 2.90869 8.57275 3.03564 8.57275ZM6.40479 3.82666C6.48291 3.82666 6.53174 3.78271 6.55127 3.69482C6.61475 3.32861 6.67578 3.06006 6.73438 2.88916C6.79297 2.71338 6.90771 2.58887 7.07861 2.51562C7.24951 2.44238 7.5376 2.37158 7.94287 2.30322C8.03076 2.28369 8.07471 2.23486 8.07471 2.15674C8.07471 2.06885 8.03076 2.02002 7.94287 2.01025C7.5376 1.93701 7.24951 1.86621 7.07861 1.79785C6.90771 1.72461 6.79297 1.60254 6.73438 1.43164C6.67578 1.25586 6.61475 0.982422 6.55127 0.611328C6.53174 0.523438 6.48291 0.479492 6.40479 0.479492C6.31689 0.479492 6.26807 0.523438 6.2583 0.611328C6.18994 0.982422 6.12646 1.25586 6.06787 1.43164C6.01416 1.60254 5.89941 1.72461 5.72363 1.79785C5.55273 1.86621 5.26465 1.93701 4.85938 2.01025C4.77148 2.02002 4.72754 2.06885 4.72754 2.15674C4.72754 2.23486 4.77148 2.28369 4.85938 2.30322C5.26465 2.37158 5.55273 2.44238 5.72363 2.51562C5.89941 2.58887 6.01416 2.71338 6.06787 2.88916C6.12646 3.06006 6.18994 3.32861 6.2583 3.69482C6.26807 3.78271 6.31689 3.82666 6.40479 3.82666Z" fill="currentColor">
                </path>
              </svg>
            </div>
          </a>
          <div className="flex items-center justify-end space-x-2">
            <Button href="https://www.buymeacoffee.com/aranbc">Buy me a coffee</Button>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
