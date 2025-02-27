"use client";

import * as msal from "@azure/msal-browser";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PublicClientApplication, AccountInfo } from "@azure/msal-browser";
import { msalConfig, loginRequest } from "./msalConfig";

// Initialize the PublicClientApplication instance with the MSAL configuration
const msalInstance = await PublicClientApplication.createPublicClientApplication(msalConfig);

console.log(msalConfig);

export default function Home() {
  // State to hold the authenticated account information
  const [account, setAccount] = useState<AccountInfo | null>(null);

  // useEffect hook to initialize MSAL and check for existing accounts on component mount
  useEffect(() => {
    const initializeMsal = async () => {
      const accounts = msalInstance.getAllAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        console.log("User is already logged in");
      } else {
        console.log("User is not logged in, initiating login");
        try {
          const response = await msalInstance.loginPopup(loginRequest);
          setAccount(response.account);
        } catch (e) {
          console.error(e);
        }
      }
    };

    initializeMsal().catch((e) => {
      console.error(e);
    });
  }, []);

  // Function to handle login
  const handleLogin = () => {
    if (!msalInstance) {
      console.log("MSAL instance is not initialized");
    }
    else {
      msalInstance.loginPopup(loginRequest).then((response) => {
        setAccount(response.account);
      }).catch((e) => {
        console.error(e);
      });
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    msalInstance.logoutPopup().then(() => {
      msalInstance.setActiveAccount(null);
    }).catch((e) => {
      console.error(e);
    });
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <h1 id="message" className="text-4xl font-extrabold tracking-tight text-center sm:text-left">
          {account ? `Welcome, ${account.name}` : "Click the login button to authenticate with Microsoft Entra ID."}
        </h1>
        {account ? (
          // Render logout button if the user is authenticated
          <button onClick={handleLogout}>Logout</button>
        ) : (
          // Render login button if the user is not authenticated
          <button onClick={handleLogin}>Login</button>
        )}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
